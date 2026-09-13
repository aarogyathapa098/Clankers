"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ROLE_PROFILES, type AppRole } from "@/lib/roles";

type Session = {
  id: string;
  lecturer_id: string;
  section_ids: string[];
  status: string;
  module?: { module_code?: string; module_name?: string };
  room?: { room_code?: string };
  timeslot?: { day_of_week?: string; start_time?: string; end_time?: string };
};

type Room = { id: string; is_available?: boolean; status?: string };

const roleCopy: Record<Exclude<AppRole, "ADMIN">, { eyebrow: string; title: string; description: string }> = {
  STUDENT: {
    eyebrow: "Student portal",
    title: "Your week, clearly organised.",
    description: "See your cohort timetable and room information without administrative actions.",
  },
  FACULTY: {
    eyebrow: "Faculty portal",
    title: "Your teaching schedule at a glance.",
    description: "Review assigned classes, rooms, and times without access to admin controls.",
  },
  SSD: {
    eyebrow: "SSD operations",
    title: "Coordinate student services and rooms.",
    description: "Keep room availability and service-desk bookings separate from academic administration.",
  },
};

export function RoleHome({ role }: { role: "STUDENT" | "FACULTY" | "SSD" }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const profile = ROLE_PROFILES[role];
  const copy = roleCopy[role];

  useEffect(() => {
    Promise.all([
      fetch("/api/sessions").then((response) => response.json()),
      fetch("/api/rooms").then((response) => response.json()),
    ])
      .then(([sessionResult, roomResult]) => {
        setSessions(sessionResult.data ?? []);
        setRooms(roomResult.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const relevantSessions = useMemo(
    () =>
      sessions.filter((session) => {
        if (session.status?.toLowerCase() === "cancelled") return false;
        if (role === "STUDENT") return session.section_ids?.includes(profile.sectionId ?? "");
        if (role === "FACULTY") return session.lecturer_id === profile.lecturerId;
        return true;
      }),
    [profile.lecturerId, profile.sectionId, role, sessions],
  );
  const availableRooms = rooms.filter(
    (room) => room.is_available !== false && room.status?.toLowerCase() !== "inactive",
  ).length;
  const primaryHref =
    role === "STUDENT" ? "/student/timetable" : role === "FACULTY" ? "/faculty/schedule" : "/ssd/bookings";

  return (
    <>
      <section className={`role-hero ${role.toLowerCase()}`}>
        <div>
          <span className="role-kicker">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
        <div className="role-hero-badge">
          <span>{profile.initials}</span>
          <div>
            <strong>{profile.name}</strong>
            <small>{profile.subtitle}</small>
          </div>
        </div>
      </section>

      <section className="role-stat-grid">
        <article className="role-card role-stat">
          <span>{role === "SSD" ? "Scheduled classes" : "Assigned classes"}</span>
          <strong>{loading ? "—" : relevantSessions.length}</strong>
          <small>Active timetable entries</small>
        </article>
        <article className="role-card role-stat">
          <span>Available rooms</span>
          <strong>{loading ? "—" : `${availableRooms} / ${rooms.length}`}</strong>
          <small>Currently enabled resources</small>
        </article>
        <article className="role-card role-stat">
          <span>Access level</span>
          <strong className="role-stat-text">{role === "SSD" ? "Service desk" : "Read only"}</strong>
          <small>Admin controls are hidden</small>
        </article>
      </section>

      <section className="role-dashboard-grid">
        <article className="role-card role-focus-card">
          <span className="role-kicker">Primary workspace</span>
          <h2>{role === "SSD" ? "Room booking desk" : "Personal schedule"}</h2>
          <p>
            {role === "SSD"
              ? "Create service-desk bookings only after checking the room and time slot for clashes."
              : "Open a focused schedule containing only the classes relevant to this account."}
          </p>
          <Link className="role-primary-button" href={primaryHref}>
            {role === "SSD" ? "Manage bookings" : "Open my timetable"}
          </Link>
        </article>
        <article className="role-card role-next-card">
          <div className="role-section-heading">
            <div>
              <span className="role-kicker">Schedule preview</span>
              <h2>{role === "SSD" ? "Campus activity" : "Assigned sessions"}</h2>
            </div>
          </div>
          {relevantSessions.slice(0, 3).map((session) => (
            <div className="role-preview-row" key={session.id}>
              <div>
                <strong>{session.module?.module_code ?? "Academic session"}</strong>
                <span>{session.module?.module_name ?? session.status}</span>
              </div>
              <div>
                <strong>{session.timeslot?.day_of_week ?? "TBA"}</strong>
                <span>{session.timeslot?.start_time ?? "Time TBA"} · {session.room?.room_code ?? "Room TBA"}</span>
              </div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
