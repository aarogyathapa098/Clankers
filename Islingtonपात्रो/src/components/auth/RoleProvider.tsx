"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ROLE_COOKIE_NAME,
  ROLE_PROFILES,
  ROLE_STORAGE_KEY,
  isAppRole,
  type AppRole,
} from "@/lib/roles";

type RoleContextValue = {
  role: AppRole;
  setRole: (role: AppRole) => void;
  ready: boolean;
};

const RoleContext = createContext<RoleContextValue | null>(null);

function readRoleCookie() {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${ROLE_COOKIE_NAME}=`))
    ?.split("=")[1];
  return value && isAppRole(value) ? value : null;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [role, setRoleState] = useState<AppRole>("ADMIN");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cookieRole = readRoleCookie();
    const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY);
    const initialRole = cookieRole ?? (isAppRole(storedRole) ? storedRole : "ADMIN");
    setRoleState(initialRole);
    document.cookie = `${ROLE_COOKIE_NAME}=${initialRole}; Path=/; SameSite=Lax; Max-Age=2592000`;
    setReady(true);
  }, []);

  function setRole(nextRole: AppRole) {
    setRoleState(nextRole);
    window.localStorage.setItem(ROLE_STORAGE_KEY, nextRole);
    document.cookie = `${ROLE_COOKIE_NAME}=${nextRole}; Path=/; SameSite=Lax; Max-Age=2592000`;
    router.push(ROLE_PROFILES[nextRole].home);
    router.refresh();
  }

  const value = useMemo(() => ({ role, setRole, ready }), [role, ready]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const value = useContext(RoleContext);
  if (!value) throw new Error("useRole must be used inside RoleProvider");
  return value;
}
