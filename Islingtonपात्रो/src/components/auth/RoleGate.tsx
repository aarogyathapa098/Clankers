"use client";

import Link from "next/link";
import { useRole } from "./RoleProvider";
import { ROLE_PROFILES, type AppRole } from "@/lib/roles";

export function RoleGate({
  allow,
  children,
}: {
  allow: AppRole[];
  children: React.ReactNode;
}) {
  const { role, ready } = useRole();

  if (!ready) {
    return <div className="role-loading">Loading workspace…</div>;
  }

  if (allow.includes(role)) return children;

  return (
    <section className="role-restricted panel">
      <span className="role-kicker">Restricted workspace</span>
      <h1>This page is not available to {ROLE_PROFILES[role].label.toLowerCase()} users.</h1>
      <p>The navigation and route guard keep planning controls visible only to authorised roles.</p>
      <Link className="role-primary-button" href={ROLE_PROFILES[role].home}>
        Return to my dashboard
      </Link>
    </section>
  );
}
