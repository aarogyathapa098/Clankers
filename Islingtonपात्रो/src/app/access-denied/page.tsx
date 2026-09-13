"use client";

import Link from "next/link";
import { useRole } from "@/components/auth/RoleProvider";
import { ROLE_PROFILES } from "@/lib/roles";

export default function AccessDeniedPage() {
  const { role } = useRole();
  const profile = ROLE_PROFILES[role];
  return (
    <main className="access-denied-page">
      <section className="role-card role-restricted">
        <span className="role-kicker">Access protected</span>
        <h1>{profile.label} users cannot open this page.</h1>
        <p>This route is outside the selected role&apos;s permitted workspace.</p>
        <Link className="role-primary-button" href={profile.home}>Return to {profile.label} dashboard</Link>
      </section>
    </main>
  );
}
