"use client";

import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { useRole } from "@/components/auth/RoleProvider";
import { ROLE_PROFILES } from "@/lib/roles";

export function RolePageShell({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const identity = ROLE_PROFILES[role];

  return (
    <div className="role-shell">
      <AcademicSidebar />
      <div className="role-shell-main">
        <header className="role-topbar">
          <div>
            <strong>{identity.label} workspace</strong>
            <span>Role-aware academic planning</span>
          </div>
          <div className="role-topbar-profile">
            <span>{identity.initials}</span>
            <div>
              <strong>{identity.name}</strong>
              <small>{identity.subtitle}</small>
            </div>
          </div>
        </header>
        <main className="role-page">{children}</main>
      </div>
    </div>
  );
}
