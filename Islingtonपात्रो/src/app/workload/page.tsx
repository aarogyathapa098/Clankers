import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { getUtilizationStatus, mockFaculty } from "@/lib/mockData";

export default function WorkloadPage() {
  const stats = {
    total: mockFaculty.length,
    normal: mockFaculty.filter((faculty) => getUtilizationStatus(faculty.assignedHours, faculty.maxHours).key === "normal").length,
    nearLimit: mockFaculty.filter((faculty) => getUtilizationStatus(faculty.assignedHours, faculty.maxHours).key === "near").length,
    overloaded: mockFaculty.filter((faculty) => getUtilizationStatus(faculty.assignedHours, faculty.maxHours).key === "overload").length,
  };

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Faculty / Workload</p>
              <h1>Faculty Workload & Hours</h1>
              <span>Monitor assigned teaching hours against weekly limits before scheduling sessions.</span>
            </div>
            <div className="resource-actions">
              <button type="button">Export Report</button>
              <button className="primary" type="button">Adjust Thresholds</button>
            </div>
          </header>

          <div className="notice-card danger">
            <strong>1 overload detected.</strong> Dr. K. Chen is assigned 22.0h against a 20.0h weekly limit.
          </div>

          <section className="resource-stat-grid four" aria-label="Faculty workload summary">
            <MetricCard label="Active Faculty" value={stats.total} detail="Instructor profiles" tone="blue" />
            <MetricCard label="Normal" value={stats.normal} detail="Below 80% utilization" tone="green" />
            <MetricCard label="Near Limit" value={stats.nearLimit} detail="80% to 100%" tone="yellow" />
            <MetricCard label="Overloaded" value={stats.overloaded} detail="Above weekly limit" tone="red" />
          </section>

          <section className="resource-layout">
            <article className="panel resource-table-panel">
              <div className="panel-title-row">
                <div>
                  <h2>Faculty Directory</h2>
                  <p>Showing {mockFaculty.length} workload records</p>
                </div>
                <div className="segmented-filter">
                  <button className="active" type="button">All</button>
                  <button type="button">Overload</button>
                  <button type="button">Near Limit</button>
                  <button type="button">Normal</button>
                </div>
              </div>

              <div className="table-wrap">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Faculty</th>
                      <th>Department</th>
                      <th>Contract</th>
                      <th>Assigned</th>
                      <th>Utilization</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFaculty.map((faculty) => {
                      const status = getUtilizationStatus(faculty.assignedHours, faculty.maxHours);
                      const percent = Math.round((faculty.assignedHours / faculty.maxHours) * 100);

                      return (
                        <tr key={faculty.id}>
                          <td>
                            <div className="person-cell">
                              <span>{faculty.name.split(" ").pop()?.[0]}</span>
                              <strong>{faculty.name}</strong>
                            </div>
                          </td>
                          <td>{faculty.department}</td>
                          <td>{faculty.maxHours.toFixed(1)} h/wk</td>
                          <td>{faculty.assignedHours.toFixed(1)} h</td>
                          <td>
                            <div className="progress-line">
                              <span>{percent}%</span>
                              <div>
                                <i className={status.cssClass} style={{ width: `${Math.min(100, percent)}%` }} />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`status-pill ${status.cssClass}`}>{status.label}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="panel profile-panel faculty-focus">
              <span className="soft-pill red">Workload Focus</span>
              <h2>Dr. K. Chen</h2>
              <p>Artificial Intelligence Faculty</p>
              <div className="load-meter">
                <span>Weekly teaching load</span>
                <strong>22.0h / 20.0h</strong>
                <div>
                  <i style={{ width: "100%" }} />
                </div>
              </div>
              <div className="assignment-list">
                <div>
                  <strong>AI301: Advanced Neural Nets</strong>
                  <span>5.0h / week</span>
                </div>
                <div className="alert">
                  <strong>CV301: Computer Vision</strong>
                  <span>8.0h / week</span>
                </div>
                <div>
                  <strong>ML201: Foundations of ML</strong>
                  <span>5.0h / week</span>
                </div>
              </div>
              <div className="notice-card info">
                Reassigning CV301 tutorial hours would bring the load back below contract limit.
              </div>
              <button className="wide-primary" type="button">Review Rebalance</button>
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
