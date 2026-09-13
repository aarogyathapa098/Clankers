"use client";

import { useEffect, useMemo, useState } from "react";
import { ROLE_PROFILES, type AppRole } from "@/lib/roles";

type ScheduleSession = {
  id: string;
  lecturer_id: string;
  room_id: string;
  time_slot_id: string;
  section_ids: string[];
  status: string;
  session_type: string;
  module?: { module_code?: string; module_name?: string };
  lecturer?: { first_name?: string; last_name?: string };
  room?: { room_code?: string; room_name?: string };
  timeslot?: { day_of_week?: string; start_time?: string; end_time?: string };
};

export function ScheduleView({ role }: { role: "STUDENT" | "FACULTY" }) {
  const [sessions, setSessions] = useState<ScheduleSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const profile = ROLE_PROFILES[role];

  useEffect(() => {
    fetch("/api/sessions")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to load schedule");
        setSessions(result.data ?? []);
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleSessions = useMemo(
    () =>
      sessions
        .filter((session) => session.status?.toLowerCase() !== "cancelled")
        .filter((session) =>
          role === "STUDENT"
            ? session.section_ids?.includes(profile.sectionId ?? "")
            : session.lecturer_id === profile.lecturerId,
        )
        .sort((a, b) => {
          const aKey = `${a.timeslot?.day_of_week}-${a.timeslot?.start_time}`;
          const bKey = `${b.timeslot?.day_of_week}-${b.timeslot?.start_time}`;
          return aKey.localeCompare(bKey);
        }),
    [profile.lecturerId, profile.sectionId, role, sessions],
  );

  return (
    <section className="role-card schedule-view">
      <div className="role-section-heading">
        <div>
          <span className="role-kicker">Read-only schedule</span>
          <h2>{role === "STUDENT" ? "My timetable" : "My assigned classes"}</h2>
          <p>
            {role === "STUDENT"
              ? "Classes for your cohort are shown without administrative controls."
              : "Only classes assigned to your faculty profile are shown."}
          </p>
        </div>
        <span className="role-status success">No edit access</span>
      </div>

      {loading && <div className="role-empty">Loading your schedule…</div>}
      {error && <div className="role-toast error">{error}</div>}
      {!loading && !error && visibleSessions.length === 0 && (
        <div className="role-empty">No assigned classes were found for this demo profile.</div>
      )}

      <div className="schedule-list">
        {visibleSessions.map((session) => (
          <article className="schedule-row" key={session.id}>
            <div className="schedule-time">
              <strong>{session.timeslot?.day_of_week ?? "Scheduled"}</strong>
              <span>
                {session.timeslot?.start_time ?? "TBA"} – {session.timeslot?.end_time ?? "TBA"}
              </span>
            </div>
            <div className="schedule-module">
              <strong>{session.module?.module_code ?? "Module"}</strong>
              <span>{session.module?.module_name ?? session.session_type}</span>
            </div>
            <div>
              <strong>{session.room?.room_code ?? "Room TBA"}</strong>
              <span>{session.room?.room_name ?? "Campus room"}</span>
            </div>
            <div>
              <strong>
                {session.lecturer
                  ? `${session.lecturer.first_name ?? ""} ${session.lecturer.last_name ?? ""}`.trim()
                  : "Faculty TBA"}
              </strong>
              <span>{session.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
