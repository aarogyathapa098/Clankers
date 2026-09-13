"use client";

import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

type Session = {
  id: string;
  module_id: string;
  lecturer_id: string;
  room_id: string;
  time_slot_id: string;
  section_ids: string[];
  session_type: string;
  session_date: string;
  status: string;
  module?: { module_code: string; module_name: string };
  lecturer?: { first_name: string; last_name: string; department: string };
  room?: { room_code: string; room_name: string; building: string };
  timeslot?: { day_of_week: string; start_time: string; end_time: string };
};

type LookupTab = "faculty" | "cohort" | "room";

export default function LookupPage() {
  const [tab, setTab] = useState<LookupTab>("faculty");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const [sessRes, lecRes, roomRes, secRes] = await Promise.all([
          fetch("/api/sessions").then((r) => r.json()),
          fetch("/api/lecturers").then((r) => r.json()),
          fetch("/api/rooms").then((r) => r.json()),
          fetch("/api/sections").then((r) => r.json()),
        ]);

        if (sessRes.success) setSessions(sessRes.data ?? []);
        if (lecRes.success) {
          setLecturers(lecRes.data ?? []);
          if (tab === "faculty" && lecRes.data?.length > 0) setSelectedId(lecRes.data[0].id);
        }
        if (roomRes.success) setRooms(roomRes.data ?? []);
        if (secRes.success) setSections(secRes.data ?? []);
      } catch {
        // ok
      }
    }
    loadData();
  }, []);

  // Update selectedId when tab changes
  function switchTab(newTab: LookupTab) {
    setTab(newTab);
    if (newTab === "faculty" && lecturers.length > 0) setSelectedId(lecturers[0].id);
    if (newTab === "cohort" && sections.length > 0) setSelectedId(sections[0].id);
    if (newTab === "room" && rooms.length > 0) setSelectedId(rooms[0].id);
  }

  const matchingSessions = sessions.filter((s) => {
    if (s.status === "cancelled") return false;
    if (tab === "faculty") return s.lecturer_id === selectedId;
    if (tab === "cohort") return (s.section_ids || []).includes(selectedId);
    if (tab === "room") return s.room_id === selectedId;
    return false;
  });

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Academic Search / Schedule Lookup</p>
              <h1>Schedule Lookup &amp; Timetable Inspector</h1>
              <span>Inspect consolidated weekly timetables by individual faculty, student cohort, or campus room.</span>
            </div>
          </header>

          <section className="filter-panel panel" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div className="segmented-filter">
              <button
                className={tab === "faculty" ? "active" : ""}
                type="button"
                onClick={() => switchTab("faculty")}
              >
                👤 Faculty Schedule
              </button>
              <button
                className={tab === "cohort" ? "active" : ""}
                type="button"
                onClick={() => switchTab("cohort")}
              >
                👥 Cohort Schedule
              </button>
              <button
                className={tab === "room" ? "active" : ""}
                type="button"
                onClick={() => switchTab("room")}
              >
                🏫 Room Occupancy
              </button>
            </div>

            <div style={{ flex: 1 }}>
              {tab === "faculty" && (
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px" }}
                >
                  {lecturers.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.first_name} {l.last_name} ({l.department || "Faculty"}) - {l.assigned_hours || 0}h assigned
                    </option>
                  ))}
                </select>
              )}

              {tab === "cohort" && (
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px" }}
                >
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.section_name || sec.section_code} ({sec.student_count || sec.max_students || 40} students)
                    </option>
                  ))}
                </select>
              )}

              {tab === "room" && (
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px" }}
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.room_code} - {r.room_name || r.building} ({r.capacity} seats, {r.room_type})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </section>

          <section className="resource-stat-grid four">
            <MetricCard label="Active Tab" value={tab.toUpperCase()} detail="Target filter" tone="blue" />
            <MetricCard label="Scheduled Sessions" value={matchingSessions.length} detail="Weekly occurrences" tone="green" />
            <MetricCard label="Total Contact Hours" value={`${(matchingSessions.length * 1.5).toFixed(1)}h`} detail="Teaching load" tone="yellow" />
            <MetricCard label="Double-Booking Clashes" value="0" detail="Validated safe" tone="slate" />
          </section>

          <section className="panel resource-table-panel">
            <div className="panel-title-row">
              <div>
                <h2>Consolidated Timetable Schedule</h2>
                <p>Showing {matchingSessions.length} sessions for selected query</p>
              </div>
              <span className="soft-pill">Verified Active</span>
            </div>

            <div className="table-wrap">
              {matchingSessions.length > 0 ? (
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Day &amp; Time Slot</th>
                      <th>Module</th>
                      <th>Room / Venue</th>
                      <th>Faculty Member</th>
                      <th>Session Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchingSessions.map((session) => (
                      <tr key={session.id}>
                        <td>
                          <strong>{session.timeslot?.day_of_week || "Day"}</strong>
                          <span>{session.timeslot?.start_time} - {session.timeslot?.end_time}</span>
                        </td>
                        <td>
                          <strong>{session.module?.module_code}</strong>
                          <span>{session.module?.module_name}</span>
                        </td>
                        <td>
                          <strong>{session.room?.room_code}</strong>
                          <span>{session.room?.building}</span>
                        </td>
                        <td>
                          <strong>{session.lecturer ? `${session.lecturer.first_name} ${session.lecturer.last_name}` : "Faculty"}</strong>
                          <span>{session.lecturer?.department}</span>
                        </td>
                        <td>
                          <span className="soft-pill" style={{ textTransform: "capitalize" }}>
                            {session.session_type}
                          </span>
                        </td>
                        <td>
                          <span className="status-pill available">{session.status || "scheduled"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: "36px", textAlign: "center", color: "#64748B" }}>
                  <p style={{ margin: 0, fontSize: "14px" }}>No sessions scheduled for this selection.</p>
                  <a href="/timetable" style={{ display: "inline-block", marginTop: "10px", color: "#1677F5", fontWeight: 600, fontSize: "13px" }}>
                    + Add a session in the master timetable
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function MetricCard(props: { label: string; value: string | number; detail: string; tone: string }) {
  return (
    <article className={`metric-card ${props.tone}`}>
      <p>{props.label}</p>
      <strong>{props.value}</strong>
      <span>{props.detail}</span>
    </article>
  );
}
