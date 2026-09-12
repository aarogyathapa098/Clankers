import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { mockFaculty, mockModules } from "@/lib/mockData";

export default function ModulesPage() {
  const totalHours = mockModules.reduce((total, module) => total + module.hours, 0);
  const unscheduled = mockModules.filter((module) => module.scheduled === 0).length;
  const completed = mockModules.filter((module) => module.scheduled === module.totalSessions && module.totalSessions > 0).length;

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Faculty / Module Assignments</p>
              <h1>Module Teaching Assignments</h1>
              <span>Connect modules, faculty, cohorts, and weekly teaching hours before timetable scheduling.</span>
            </div>
            <div className="resource-actions">
              <button type="button">Bulk Allocate</button>
              <button className="primary" type="button">New Assignment</button>
            </div>
          </header>

          <section className="workflow-panel panel">
            <div>
              <span>1</span>
              <strong>Create module assignment</strong>
              <p>Choose module, faculty, cohort, and weekly contact hours.</p>
            </div>
            <div>
              <span>2</span>
              <strong>Schedule sessions</strong>
              <p>Assignments unlock timetable slot and room binding.</p>
            </div>
            <div>
              <span>3</span>
              <strong>Resolve gaps</strong>
              <p>Unscheduled sessions stay visible until assigned.</p>
            </div>
          </section>

          <section className="resource-stat-grid four">
            <MetricCard label="Assignments" value={mockModules.length} detail="Active module records" tone="blue" />
            <MetricCard label="Weekly Hours" value={totalHours.toFixed(1)} detail="Required hours" tone="slate" />
            <MetricCard label="Fully Scheduled" value={completed} detail="Ready for teaching" tone="green" />
            <MetricCard label="Unscheduled" value={unscheduled} detail="Need slot binding" tone="red" />
          </section>

          <section className="filter-panel panel">
            <input aria-label="Search assignments" placeholder="Filter by module code, faculty name, or cohort" />
            <select aria-label="Department">
              <option>All departments</option>
            </select>
            <select aria-label="Cohort">
              <option>All cohorts</option>
            </select>
            <select aria-label="Schedule status">
              <option>All statuses</option>
            </select>
          </section>

          <section className="panel resource-table-panel">
            <div className="panel-title-row">
              <div>
                <h2>Teaching Allocation Matrix</h2>
                <p>{mockModules.length} assignments recorded</p>
              </div>
              <span className="soft-pill">Code ascending</span>
            </div>

            <div className="table-wrap">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Faculty</th>
                    <th>Cohort</th>
                    <th>Weekly Hours</th>
                    <th>Sessions</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockModules.map((module) => {
                    const faculty = mockFaculty.find((item) => item.id === module.facultyId);
                    const isFullyScheduled = module.scheduled === module.totalSessions && module.totalSessions > 0;
                    const isPartial = module.scheduled < module.totalSessions && module.scheduled > 0;
                    const status = module.scheduled === 0 ? "unscheduled" : isPartial ? "partial" : "scheduled";

                    return (
                      <tr key={module.id}>
                        <td>
                          <strong>{module.code}</strong>
                          <span>{module.name}</span>
                        </td>
                        <td>
                          <div className="person-cell">
                            <span>{faculty?.name.split(" ").pop()?.[0]}</span>
                            <strong>{faculty?.name ?? "Unassigned"}</strong>
                          </div>
                        </td>
                        <td>{module.cohort}</td>
                        <td>{module.hours.toFixed(1)} h</td>
                        <td>{module.scheduled} / {module.totalSessions}</td>
                        <td>
                          <span className={`status-pill ${status}`}>
                            {isFullyScheduled ? "Scheduled" : isPartial ? "Partial" : "Unscheduled"}
                          </span>
                        </td>
                        <td>
                          <button className="table-action" type="button">
                            {module.scheduled === 0 ? "Schedule Slot" : "View Timetable"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
