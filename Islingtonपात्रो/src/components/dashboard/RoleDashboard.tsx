"use client";

import { useState } from "react";

type Role = "admin" | "student" | "staff";

const stats = [
  { label: "Scheduled Classes Today", value: "128", note: "Across all cohorts", color: "blue", icon: "C" },
  { label: "Total Rooms", value: "42", note: "Across all venues", color: "slate", icon: "R" },
  { label: "Available Rooms", value: "14 / 42", note: "Tue - 11:00 - 12:30", color: "green", icon: "A" },
  { label: "Active Clashes", value: "7", note: "Unresolved conflicts", color: "red", icon: "!" },
];

const rows = [
  ["08:00 - 09:30", "CS205\nGroup A\nR: 401", "AI301\nGroup B\nLab 1", "DB204\nGroup A\nR: 302", "WT201\nGroup C\nR: 201", "SE302\nGroup B\nLab 2"],
  ["09:30 - 11:00", "WT201\nGroup C\nR: 201", "CS205\nGroup A\nR: 401", "", "AI301\nGroup B\nLab 1", ""],
  ["11:00 - 12:30", "DB204\nGroup A\nR: 302", "", "ML301\nGroup C\nLab 3", "", "CV301\nGroup A\nR: 203"],
  ["12:30 - 14:00", "", "", "", "", ""],
  ["14:00 - 15:30", "", "", "", "CS205\nGroup A\nR: 401", ""],
  ["15:30 - 17:00", "AI301\nGroup B\nLab 1", "", "SE302\nGroup B\nLab 2", "", "ML301\nGroup C\nLab 3"],
];

const conflicts = [
  ["Faculty Clash", "Dr. Smith is assigned to multiple classes.", "AI301 | Tue 11:00 - 12:30 | R: 401"],
  ["Room Capacity Issue", "Room capacity is less than cohort size.", "DB204 | Mon 11:00 - 12:30 | R: 302"],
  ["Room Clash", "Room is already booked for another session.", "WT201 | Thu 08:00 - 09:30 | R: 201"],
  ["Cohort Clash", "Group A has another class at this time.", "CS205 | Tue 09:30 - 11:00 | R: 401"],
];

const roleCopy = {
  admin: {
    title: "Welcome back, Admin",
    description: "Manage academic schedules, resources, and teaching allocations.",
    badge: "Admin",
    initial: "A",
  },
  student: {
    title: "Student Dashboard",
    description: "Student academic planning workspace.",
    badge: "Student",
    initial: "S",
  },
  staff: {
    title: "Staff Dashboard",
    description: "Staff academic planning workspace.",
    badge: "Staff",
    initial: "T",
  },
};

function cardColor(index: number) {
  return ["", "green", "yellow", "pink"][index % 4];
}

export function RoleDashboard() {
  const [role, setRole] = useState<Role>("admin");
  const copy = roleCopy[role];

  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
        <div className="role-control">
          <label htmlFor="role-select">View as</label>
          <select
            id="role-select"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          <div className="admin-chip">
            <span className="admin-avatar">{copy.initial}</span>
            <span>{copy.badge}</span>
          </div>
        </div>
      </header>

      {role === "admin" ? <AdminDashboard /> : <BlankRoleDashboard role={role} />}
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <section className="stats-grid" aria-label="Dashboard statistics">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span className={`stat-icon ${stat.color}`} aria-hidden="true">
              {stat.icon}
            </span>
            <div>
              <h3>{stat.label}</h3>
              <p className="stat-value">{stat.value}</p>
              <p>{stat.note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <h2>Weekly Timetable</h2>
          <div className="timetable">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    <th>{row[0]}</th>
                    {row.slice(1).map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>
                        {cell ? (
                          <div className={`session-pill ${cardColor(index)}`}>
                            {cell.split("\n").map((line) => (
                              <div key={line}>{line}</div>
                            ))}
                          </div>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="panel">
          <h2>Scheduling Conflicts</h2>
          <div className="conflict-list">
            {conflicts.map(([title, body, meta]) => (
              <div className="conflict" key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
                <span>{meta}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}

function BlankRoleDashboard({ role }: { role: Exclude<Role, "admin"> }) {
  const title = role === "student" ? "Student View" : "Staff View";

  return (
    <section className="blank-role-panel panel">
      <span>{title}</span>
      <h2>{title} UI Coming Soon</h2>
      <p>
        This role is ready for a dedicated dashboard layout. The dropdown already switches the interface without a login flow.
      </p>
    </section>
  );
}
