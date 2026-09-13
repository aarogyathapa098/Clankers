import { NextRequest, NextResponse } from "next/server";
import {
  ROLE_COOKIE_NAME,
  ROLE_PROFILES,
  canAccessPath,
  isAppRole,
  type AppRole,
} from "@/lib/roles";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieRole = request.cookies.get(ROLE_COOKIE_NAME)?.value;
  const role: AppRole = isAppRole(cookieRole) ? cookieRole : "ADMIN";

  if (pathname.startsWith("/api/")) {
    const isMutation = !["GET", "HEAD", "OPTIONS"].includes(request.method);
    if (isMutation && role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Only administrators can change academic planning data.",
        },
        { status: 403 },
      );
    }
    return NextResponse.next();
  }

  if (!canAccessPath(role, pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/access-denied";
    redirectUrl.searchParams.set("from", pathname);
    redirectUrl.searchParams.set("home", ROLE_PROFILES[role].home);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
