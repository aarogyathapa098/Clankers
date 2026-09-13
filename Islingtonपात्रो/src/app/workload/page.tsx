"use client";

import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

type LecturerWorkload = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  max_weekly_hours: number;
  assigned_hours: number;
  utilization_pct: number;
  status_label: "Normal" | "Near Limit" | "Overload" | string;
};

export default function WorkloadPage() {
  const [facultyList, setFacultyList] = useState<LecturerWorkload[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaculty() {
      try {
        const res = await fetch("/api/lecturers");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setFacultyList(json.data);
        }
      } catch {
        // ok
      } finally {
        setLoading(false);
      }
    }
    loadFaculty();
  }, []);

  const stats = {
    total: facultyList.length,
    normal: facultyList.filter((f) => f.status_label === "Normal").length,
    nearLimit: facultyList.filter((f) => f.status_label === "Near Limit").length,
    overloaded: facultyList.filter((f) => f.status_label === "Overload").length,
  };

  const filteredFaculty = facultyList.filter((f) => {
    if (filter === "Overload") return f.status_label === "Overload";
    if (filter === "Near Limit") return f.status_label === "Near Limit";
    if (filter === "Normal") return f.status_label === "Normal";
    return true;
  });

  const overloadedFaculty = facultyList.find((f) => f.status_label === "Overload");

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Faculty / Workload Tracking</p>
              <h1>Faculty Workload &amp; Teaching Hours</h1>
              <span>Monitor assigned teaching hours against weekly contract limits before scheduling sessions.</span>
            </div>
            <div className="resource-actions">
              <a href="/timetable" className="primary" style={{ textDecoration: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px" }}>
                + Assign in Timetable
              </a>
            </div>
          </header>

          {overloadedFaculty && (
            <div className="notice-card danger" style={{ marginBottom: "16px" }}>
              <strong>1 overload detected.</strong> {overloadedFaculty.first_name} {overloadedFaculty.last_name} is assigned {overloadedFaculty.assigned_hours}h against a {overloadedFaculty.max_weekly_hours}h weekly limit.
            </div>
          )}

          <section className="resource-stat-grid four" aria-label="Faculty workload summary">
            <MetricCard label="Active Faculty" value={stats.total} detail="Instructor profiles" tone="blue" />
            <MetricCard label="Normal Load" value={stats.normal} detail="Below 80% utilization" tone="green" />
            <MetricCard label="Near Limit" value={stats.nearLimit} detail="80% to 100%" tone="yellow" />
            <MetricCard label="Overloaded" value={stats.overloaded} detail="Above weekly limit" tone="red" />
          </section>

          <section className="resource-layout">
            <article className="panel resource-table-panel">
              <div className="panel-title-row">
                <div>
                  <h2>Faculty Directory</h2>
                  <p>Showing {filteredFaculty.length} workload records {loading && "(Loading...)"}</p>
                </div>
                <div className="segmented-filter">
                  <button className={filter === "All" ? "active" : ""} type="button" onClick={() => setFilter("All")}>All</button>
                  <button className={filter === "Overload" ? "active" : ""} type="button" onClick={() => setFilter("Overload")}>Overload</button>
                  <button className={filter === "Near Limit" ? "active" : ""} type="button" onClick={() => setFilter("Near Limit")}>Near Limit</button>
                  <button className={filter === "Normal" ? "active" : ""} type="button" onClick={() => setFilter("Normal")}>Normal</button>
                </div>
              </div>

              <div className="table-wrap">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Faculty Member</th>
                      <th>Department</th>
                      <th>Contract Limit</th>
                      <th>Assigned Hours</th>
                      <th>Utilization</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFaculty.map((faculty) => {
                      const percent = faculty.utilization_pct || Math.round((faculty.assigned_hours / (faculty.max_weekly_hours || 20)) * 100);
                      const isOver = percent > 100;
                      const isNear = percent >= 80 && percent <= 100;

                      return (
                        <tr key={faculty.id}>
                          <td>
                            <strong>{faculty.first_name} {faculty.last_name}</strong>
                            <span>{faculty.email}</span>
                          </td>
                          <td>{faculty.department}</td>
                          <td>{faculty.max_weekly_hours}h / week</td>
                          <td><strong>{faculty.assigned_hours}h</strong></td>
                          <td>
                            <div className="progress-line">
                              <span>{percent}%</span>
                              <div>
                                <i
                                  style={{
                                    width: `${Math.min(100, percent)}%`,
                                    backgroundColor: isOver ? "#EF4444" : isNear ? "#F59E0B" : "#10B981",
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${
                                isOver ? "occupied" : isNear ? "maintenance" : "available"
                              }`}
                            >
                              {faculty.status_label || (isOver ? "Overload" : isNear ? "Near Limit" : "Normal")}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="panel profile-panel">
              <span className="soft-pill blue">Policy &amp; Rules</span>
              <h2>Workload Policy</h2>
              <p>Islington Academic Regulations</p>
              <div style={{ backgroundColor: "#F8FAFC", padding: "14px", borderRadius: "8px", border: "1px solid #E2E8F0", marginTop: "12px", fontSize: "13px", color: "#334155", lineHeight: 1.6 }}>
                <strong>Teaching Caps:</strong>
                <ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
                  <li>Max full-time faculty teaching: <strong>20.0h / week</strong></li>
                  <li>Soft warning threshold: <strong>16.0h (80%)</strong></li>
                  <li>Lecturer clash enforcement: Hard conflict error on double-booking</li>
                </ul>
              </div>
              <div className="notice-card warning" style={{ marginTop: "14px" }}>
                Scheduling sessions for faculty marked &quot;Near Limit&quot; requires RTE authorization.
              </div>
            </aside>
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
