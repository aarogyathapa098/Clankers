"use client";

import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

// --- Outline SVG Icons ---
function SearchIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BellIcon({ size = 20, color = "#1e293b" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BookIcon({ size = 24, color = "#1677f5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 2v20" />
    </svg>
  );
}

function BuildingIcon({ size = 24, color = "#1677f5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  );
}

function DoorIcon({ size = 24, color = "#1677f5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17" />
      <path d="M2 21h20" />
      <circle cx="14.5" cy="11.5" r="1" fill={color} />
    </svg>
  );
}

function CalendarIcon({ size = 18, color = "#1677f5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function UserIcon({ size = 18, color = "#1677f5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GridIcon({ size = 14, color = "#64748b" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

// --- Types ---
type DashboardStats = {
  sessions_today: number;
  total_rooms: number;
  available_rooms: number;
  total_lecturers: number;
  total_modules: number;
};

type LecturerRecord = {
  lecturer_id: string;
  first_name: string;
  last_name: string;
  max_weekly_hours: number;
  assigned_hours: number;
  department: string;
};

// --- Static Timetable Data (fallback until sessions API has real data) ---
const timeSlots = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00"];
const days = [
  { key: "mon", label: "Mon 13" },
  { key: "tue", label: "Tue 14" },
  { key: "wed", label: "Wed 15" },
  { key: "thu", label: "Thu 16" },
  { key: "fri", label: "Fri 17" },
];

type ScheduleCell = {
  code: string;
  group: string;
  room: string;
  type: "blue" | "green" | "lavender" | "yellow" | "pink" | "cyan";
};

const timetableData: Record<string, Record<string, ScheduleCell>> = {
  "08:00": {
    mon: { code: "CS205", group: "Group A", room: "R: 401", type: "blue" },
    tue: { code: "AI301", group: "Group B", room: "Lab 1", type: "green" },
    wed: { code: "DB204", group: "Group A", room: "R: 302", type: "yellow" },
    fri: { code: "SE302", group: "Group C", room: "R: 501", type: "pink" },
  },
  "09:30": {
    mon: { code: "WT201", group: "Group B", room: "R: 402", type: "blue" },
    tue: { code: "Networks", group: "Group A", room: "Lab 2", type: "lavender" },
    thu: { code: "AI301", group: "Group B", room: "Lab 3", type: "lavender" },
  },
  "11:00": {
    wed: { code: "ML301", group: "Group A", room: "R: 201", type: "cyan" },
    fri: { code: "CV301", group: "Group C", room: "Lab 4", type: "green" },
  },
  "12:30": {
    mon: { code: "DB204", group: "Group B", room: "R: 302", type: "yellow" },
    thu: { code: "CS205", group: "Group A", room: "R: 401", type: "blue" },
  },
  "14:00": {
    tue: { code: "SE302", group: "Group C", room: "Lab 1", type: "pink" },
    wed: { code: "WT201", group: "Group B", room: "R: 402", type: "blue" },
    fri: { code: "AI401", group: "Group A", room: "R: 501", type: "pink" },
  },
  "15:30": {},
  "17:00": {},
};

function getBlockStyle(type: ScheduleCell["type"]) {
  switch (type) {
    case "blue":
      return { bg: "#DCEBFA", border: "#C8DDF5", text: "#12335C" };
    case "green":
      return { bg: "#DCFCE7", border: "#BBF7D0", text: "#14532D" };
    case "lavender":
      return { bg: "#EDE9FE", border: "#DDD6FE", text: "#4C1D95" };
    case "yellow":
      return { bg: "#FEF3C7", border: "#FDE68A", text: "#78350F" };
    case "pink":
      return { bg: "#FFE4E6", border: "#FECDD3", text: "#881337" };
    case "cyan":
      return { bg: "#E0F2FE", border: "#BAE6FD", text: "#0369A1" };
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [lecturers, setLecturers] = useState<LecturerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendarView, setCalendarView] = useState<"Day" | "Week" | "Month">("Week");

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashRes, lecturerRes] = await Promise.allSettled([
          fetch("/api/dashboard").then((r) => r.json()),
          fetch("/api/lecturers").then((r) => r.json()),
        ]);

        if (dashRes.status === "fulfilled" && dashRes.value.success) {
          setStats(dashRes.value.data);
        }
        if (lecturerRes.status === "fulfilled" && lecturerRes.value.success) {
          setLecturers(lecturerRes.value.data ?? []);
        }
      } catch {
        // Silently use fallback data
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const today = new Date();
  const todayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][today.getDay()];
  const activeDashboardDays = calendarView === "Day"
    ? [days.find((day) => day.key === todayKey) ?? days[0]]
    : days;
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Derive display values
  const sessionsToday = stats?.sessions_today ?? 128;
  const totalRooms = stats?.total_rooms ?? 42;
  const availableRooms = stats?.available_rooms ?? 14;

  // Faculty workload from API or fallback
  const facultyWorkload = lecturers.length > 0
    ? lecturers.map((l) => {
        const pct = l.max_weekly_hours > 0 ? (l.assigned_hours / l.max_weekly_hours) * 100 : 0;
        const status = pct > 100 ? "Overload" : pct >= 80 ? "Near Limit" : "Normal";
        const color = pct > 100 ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#22c55e";
        return {
          faculty: `${l.first_name} ${l.last_name}`,
          assigned: Math.round(l.assigned_hours),
          max: l.max_weekly_hours,
          status,
          color,
        };
      })
    : [
        { faculty: "Dr. Smith", assigned: 16, max: 20, status: "Normal", color: "#22c55e" },
        { faculty: "Prof. Lee", assigned: 18, max: 20, status: "Near Limit", color: "#f59e0b" },
        { faculty: "Dr. Kumar", assigned: 22, max: 20, status: "Overload", color: "#ef4444" },
        { faculty: "Dr. Chen", assigned: 10, max: 20, status: "Normal", color: "#22c55e" },
      ];

  const recentAssignments = [
    { module: "CS205", faculty: "Dr. Smith", cohort: "Group A", hours: 3 },
    { module: "AI301", faculty: "Prof. Lee", cohort: "Group B", hours: 4 },
    { module: "DB204", faculty: "Dr. Kumar", cohort: "Group A", hours: 3 },
    { module: "SE302", faculty: "Dr. Chen", cohort: "Group C", hours: 4 },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F1F7FF", display: "flex" }}>
      {/* Sidebar */}
      <AcademicSidebar />

      {/* Main Area */}
      <div style={{ marginLeft: "258px", flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Top Header */}
        <header
          style={{
            height: "61px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5ECF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px 0 21px",
            boxSizing: "border-box",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", width: "467px", maxWidth: "100%" }}>
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <SearchIcon size={16} color="#64748B" />
            </div>
            <input
              type="text"
              placeholder="Search modules, faculty, cohorts, rooms..."
              style={{
                width: "100%",
                height: "35px",
                padding: "0 14px 0 36px",
                borderRadius: "7.5px",
                border: "1px solid #D8E2EE",
                outline: "none",
                fontSize: "12.5px",
                color: "#0F203D",
                backgroundColor: "#FFFFFF",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Right items: Notification & User profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            {/* Bell icon */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", cursor: "pointer" }}>
              <BellIcon size={20} color="#1E293B" />
            </div>

            {/* Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#0F203D",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                AR
              </div>
              <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#0F203D" }}>Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={{ padding: "20px 24px 40px 21px", boxSizing: "border-box" }}>
          {/* Greeting */}
          <div style={{ marginBottom: "18px" }}>
            <p style={{ margin: "0 0 3px 0", fontSize: "12px", fontWeight: 500, color: "#64748B" }}>
              {dateStr}
            </p>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#0F203D", letterSpacing: "-0.2px" }}>
              Here&apos;s today&apos;s planning overview.
            </h1>
          </div>

          {loading && (
            <div style={{ padding: "12px 0", fontSize: "13px", color: "#64748B" }}>
              Loading dashboard data...
            </div>
          )}

          {/* Planning KPI Cards */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginBottom: "18px",
            }}
          >
            {/* Card 1: Sessions Today */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "9px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15, 32, 61, 0.03)", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "10px", backgroundColor: "#EBF3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookIcon size={24} color="#1677F5" />
              </div>
              <div>
                <p style={{ margin: "0 0 2px 0", fontSize: "12.5px", fontWeight: 600, color: "#0F203D" }}>Scheduled Classes Today</p>
                <p style={{ margin: "0 0 2px 0", fontSize: "25px", fontWeight: 800, color: "#0F203D", lineHeight: 1.15 }}>{sessionsToday}</p>
                <p style={{ margin: 0, fontSize: "11.5px", color: "#64748B" }}>Across all cohorts</p>
              </div>
            </div>

            {/* Card 2: Total Rooms */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "9px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15, 32, 61, 0.03)", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "10px", backgroundColor: "#EBF3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BuildingIcon size={24} color="#1677F5" />
              </div>
              <div>
                <p style={{ margin: "0 0 2px 0", fontSize: "12.5px", fontWeight: 600, color: "#0F203D" }}>Total Rooms</p>
                <p style={{ margin: "0 0 2px 0", fontSize: "25px", fontWeight: 800, color: "#0F203D", lineHeight: 1.15 }}>{totalRooms}</p>
                <p style={{ margin: 0, fontSize: "11.5px", color: "#64748B" }}>Across all venues</p>
              </div>
            </div>

            {/* Card 3: Available Rooms */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "9px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15, 32, 61, 0.03)", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "10px", backgroundColor: "#EBF3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <DoorIcon size={24} color="#1677F5" />
              </div>
              <div>
                <p style={{ margin: "0 0 2px 0", fontSize: "12.5px", fontWeight: 600, color: "#0F203D" }}>Available Rooms</p>
                <p style={{ margin: "0 0 2px 0", fontSize: "25px", fontWeight: 800, color: "#0F203D", lineHeight: 1.15 }}>{availableRooms} / {totalRooms}</p>
                <p style={{ margin: 0, fontSize: "11.5px", color: "#64748B" }}>Currently available</p>
              </div>
            </div>

          </section>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", alignItems: "start" }}>
            {/* Left Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Weekly Timetable Card */}
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: "9px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15, 32, 61, 0.03)", padding: "16px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CalendarIcon size={18} color="#1677F5" />
                    <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0F203D" }}>{calendarView} Timetable</h2>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ backgroundColor: "#F1F5F9", borderRadius: "6px", padding: "2px", display: "flex", alignItems: "center" }}>
                      {(["Day", "Week", "Month"] as const).map((view) => {
                        const active = calendarView === view;
                        return (
                          <button
                            aria-pressed={active}
                            key={view}
                            onClick={() => setCalendarView(view)}
                            type="button"
                            style={{ border: "none", backgroundColor: active ? "#1677F5" : "transparent", color: active ? "#FFFFFF" : "#64748B", fontSize: "11.5px", fontWeight: active ? 600 : 500, padding: "4px 11px", borderRadius: "4px", cursor: "pointer" }}
                          >
                            {view}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ width: "26px", height: "26px", borderRadius: "5px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backgroundColor: "#FFFFFF" }}>
                      <GridIcon size={13} color="#64748B" />
                    </div>
                  </div>
                </div>

                {/* Grid Table */}
                <div style={{ border: "1px solid #E8EEF5", borderRadius: "7px", overflow: "hidden" }}>
                  {calendarView === "Month" ? (
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#F8FAFD", height: "32px" }}>
                          <th style={{ width: "90px", fontSize: "11.5px", color: "#0F203D" }}>Day</th>
                          {[1, 2, 3, 4].map((week) => (
                            <th key={week} style={{ borderLeft: "1px solid #E8EEF5", fontSize: "11.5px", fontWeight: 700, color: "#0F203D", textAlign: "center", padding: "6px 0" }}>
                              Week {week}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {days.map((day) => {
                          const recurringSessions = timeSlots
                            .map((time) => timetableData[time]?.[day.key])
                            .filter((cell): cell is ScheduleCell => Boolean(cell));
                          return (
                            <tr key={day.key} style={{ borderTop: "1px solid #E8EEF5", height: "58px" }}>
                              <td style={{ fontSize: "11px", fontWeight: 700, color: "#0F203D", textAlign: "center" }}>{day.label.split(" ")[0]}</td>
                              {[1, 2, 3, 4].map((week) => (
                                <td key={week} style={{ borderLeft: "1px solid #E8EEF5", padding: "6px", textAlign: "center", backgroundColor: "#FFFFFF" }}>
                                  <strong style={{ display: "block", fontSize: "12px", color: "#1677F5" }}>{recurringSessions.length} sessions</strong>
                                  <span style={{ fontSize: "9.5px", color: "#64748B" }}>{recurringSessions.slice(0, 2).map((cell) => cell.code).join(", ") || "Open"}</span>
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#F8FAFD", height: "32px" }}>
                        <th style={{ width: "62px" }}></th>
                        {activeDashboardDays.map((day) => (
                          <th key={day.key} style={{ borderLeft: "1px solid #E8EEF5", fontSize: "11.5px", fontWeight: 700, color: "#0F203D", textAlign: "center", padding: "6px 0" }}>
                            {day.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time) => (
                        <tr key={time} style={{ borderTop: "1px solid #E8EEF5", height: "52px" }}>
                          <td style={{ fontSize: "11px", fontWeight: 600, color: "#64748B", textAlign: "center", verticalAlign: "middle", padding: "4px", backgroundColor: "#FFFFFF" }}>
                            {time}
                          </td>
                          {activeDashboardDays.map((day) => {
                            const cell = timetableData[time]?.[day.key];
                            if (!cell) {
                              return <td key={day.key} style={{ borderLeft: "1px solid #E8EEF5", padding: "3px 4px", backgroundColor: "#FFFFFF" }} />;
                            }
                            const st = getBlockStyle(cell.type);
                            return (
                              <td key={day.key} style={{ borderLeft: "1px solid #E8EEF5", padding: "3px 4px", backgroundColor: "#FFFFFF", verticalAlign: "middle" }}>
                                <div style={{ backgroundColor: st.bg, border: `1px solid ${st.border}`, borderRadius: "6px", padding: "4px 6px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                  <div style={{ fontSize: "11px", fontWeight: 700, color: st.text, lineHeight: 1.2 }}>{cell.code}</div>
                                  <div style={{ fontSize: "9.5px", color: "#475569", lineHeight: 1.25 }}>{cell.group}</div>
                                  <div style={{ fontSize: "9.5px", color: "#475569", lineHeight: 1.25 }}>{cell.room}</div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>

              {/* Lower Left Two Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* Faculty Workload */}
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "9px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15, 32, 61, 0.03)", padding: "16px", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <UserIcon size={16} color="#1677F5" />
                      <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0F203D" }}>Faculty Workload</h3>
                    </div>
                    <a href="/workload" style={{ color: "#1677F5", fontSize: "11px", fontWeight: 600, textDecoration: "none" }}>View All →</a>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11.5px" }}>
                    <thead>
                      <tr style={{ color: "#64748B", borderBottom: "1px solid #E8EEF5", textAlign: "left" }}>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Faculty</th>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Assigned</th>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Max</th>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facultyWorkload.slice(0, 4).map((fw) => (
                        <tr key={fw.faculty} style={{ borderBottom: "1px solid #F4F7FA" }}>
                          <td style={{ padding: "8px 0", fontWeight: 600, color: "#0F203D" }}>{fw.faculty}</td>
                          <td style={{ padding: "8px 0", color: "#334155" }}>{fw.assigned}</td>
                          <td style={{ padding: "8px 0", color: "#334155" }}>{fw.max}</td>
                          <td style={{ padding: "8px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: fw.color, display: "inline-block" }} />
                              <span style={{ color: fw.status === "Normal" ? "#16A34A" : fw.status === "Near Limit" ? "#D97706" : "#DC2626", fontSize: "11px", fontWeight: 500 }}>
                                {fw.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Recent Assignments */}
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "9px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15, 32, 61, 0.03)", padding: "16px", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <BookIcon size={16} color="#1677F5" />
                      <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0F203D" }}>Recent Assignments</h3>
                    </div>
                    <a href="/modules" style={{ color: "#1677F5", fontSize: "11px", fontWeight: 600, textDecoration: "none" }}>View All →</a>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11.5px" }}>
                    <thead>
                      <tr style={{ color: "#64748B", borderBottom: "1px solid #E8EEF5", textAlign: "left" }}>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Module</th>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Faculty</th>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Cohort</th>
                        <th style={{ paddingBottom: "7px", fontWeight: 500 }}>Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAssignments.map((ra) => (
                        <tr key={ra.module} style={{ borderBottom: "1px solid #F4F7FA" }}>
                          <td style={{ padding: "8px 0", color: "#334155" }}>{ra.module}</td>
                          <td style={{ padding: "8px 0", color: "#334155" }}>{ra.faculty}</td>
                          <td style={{ padding: "8px 0", color: "#334155" }}>{ra.cohort}</td>
                          <td style={{ padding: "8px 0", color: "#334155" }}>{ra.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
