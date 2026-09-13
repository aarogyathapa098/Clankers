export const APP_ROLES = ["ADMIN", "STUDENT", "FACULTY", "SSD"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const ROLE_COOKIE_NAME = "academic-role";
export const ROLE_STORAGE_KEY = "academic-role";

export const ROLE_PROFILES: Record<
  AppRole,
  {
    label: string;
    name: string;
    subtitle: string;
    initials: string;
    home: string;
    lecturerId?: string;
    sectionId?: string;
  }
> = {
  ADMIN: {
    label: "Admin",
    name: "RTE Admin",
    subtitle: "Planning administrator",
    initials: "RA",
    home: "/dashboard",
  },
  STUDENT: {
    label: "Student",
    name: "Aarav Sharma",
    subtitle: "BSc Computing · Section A",
    initials: "AS",
    home: "/student/dashboard",
    sectionId: "sec-1",
  },
  FACULTY: {
    label: "Faculty",
    name: "Dr. Aarav Sharma",
    subtitle: "School of Computing",
    initials: "DS",
    home: "/faculty/dashboard",
    lecturerId: "lec-1",
  },
  SSD: {
    label: "SSD",
    name: "SSD Department",
    subtitle: "Student service desk",
    initials: "SD",
    home: "/ssd/dashboard",
  },
};

const ROLE_ROUTES: Record<Exclude<AppRole, "ADMIN">, string[]> = {
  STUDENT: ["/student", "/rooms/availability"],
  FACULTY: ["/faculty", "/rooms/availability"],
  SSD: ["/ssd", "/rooms", "/rooms/availability"],
};

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && APP_ROLES.includes(value as AppRole);
}

export function canAccessPath(role: AppRole, pathname: string) {
  if (pathname === "/" || pathname.startsWith("/access-denied")) return true;
  if (role === "ADMIN") return true;
  return ROLE_ROUTES[role].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
