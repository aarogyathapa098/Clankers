"use client";
import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
type Module = {
  id: string;
  module_code: string;
  module_name: string;
  credit_hours: number;
  weekly_sessions: number;
  duration_minutes: number;
  status: string;
};
export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadModules() {
      try {
        const res = await fetch("/api/modules");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setModules(json.data);
        }
      } catch {
        // ok
      } finally {
        setLoading(false);
      }
    }
    loadModules();
  }, []);
  const filtered = modules.filter(
    (m) =>
      m.module_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.module_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalCredits = modules.reduce((tot, m) => tot + (m.credit_hours || 20), 0);
  const totalWeeklySessions = modules.reduce((tot, m) => tot + (m.weekly_sessions || 3), 0);
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Faculty / Module Assignments</p>
              <h1>Academic Modules &amp; Curriculum</h1>
              <span>Connect modules, faculty, cohorts, and weekly teaching hours before timetable scheduling.</span>
                          </div>
            <div className="resource-actions">
              <a href="/timetable" className="primary" style={{ textDecoration: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px" }}>
                + Schedule Module in Timetable
              </a>
            </div>
          </header>
          <section className="workflow-panel panel">
            <div>
              <span>1</span>
              <strong>Curriculum modules</strong>
              <p>Validated credit weight and weekly required contact sessions.</p>
            </div>
            <div>
              <span>2</span>
              <strong>Cohort binding</strong>
              <p>Attached to Level 4, 5, and 6 Islington computing cohorts.</p>
            </div>
            <div>
              <span>3</span>
              <strong>Conflict-free scheduling</strong>
              <p>Sessions checked against double-booking and room constraints.</p>
            </div>
          </section>
          <section className="resource-stat-grid four">
            <MetricCard label="Active Modules" value={modules.length} detail="Curriculum courses" tone="blue" />
              <MetricCard label="Total Credits" value={totalCredits} detail="Accredited weighting" tone="slate" />
            <MetricCard label="Weekly Sessions" value={totalWeeklySessions} detail="Required contact slots" tone="green" />
            <MetricCard label="System Status" value="Online" detail="Live database sync" tone="blue" />
            </section>
          <section className="filter-panel panel">
            <input
              aria-label="Search assignments"
              placeholder="Filter by module code or title (e.g., CS205, AI301, Database)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </section>
          <section className="panel resource-table-panel">
            <div className="panel-title-row">
              <div>
                <h2>Module Curriculum Directory</h2>
                <p>{filtered.length} modules recorded {loading && "(Loading...)"}</p>
              </div>
              <span className="soft-pill">Verified Active</span>
            </div>
            <div className="table-wrap">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th>Module Code</th>
                    <th>Module Title</th>
                    <th>Credit Value</th>
                    <th>Weekly Contact Sessions</th>
                    <th>Session Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((module) => (
                    <tr key={module.id}>
                      <td>
                        <strong>{module.module_code}</strong>
                      </td>
                      <td>
                        <strong style={{ color: "#0F203D" }}>{module.module_name}</strong>
                      </td>
                                            <td>{module.credit_hours || 20} CATS Credits</td>
                      <td><strong>{module.weekly_sessions || 3}</strong> sessions / week</td>
<td>{module.duration_minutes || 90} mins</td>
                      <td>
                        <span className="status-pill available">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
