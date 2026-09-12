import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { roomData } from "@/lib/roomData";

function roomTypeLabel(type: string) {
  return type.replace("_", " ");
}

export default function RoomsPage() {
  const stats = {
    total: roomData.length,
    lectureHalls: roomData.filter((room) => room.type === "EXAM_HALL").length,
    labs: roomData.filter((room) => room.type === "LAB").length,
    classrooms: roomData.filter((room) => room.type === "CLASSROOM").length,
    capacity: roomData.reduce((acc, room) => acc + room.capacity, 0),
  };

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Resources / Room Inventory</p>
              <h1>Campus Rooms & Facilities</h1>
              <span>Track rooms, capacity, facility type, and weekly occupancy from one planning view.</span>
            </div>
            <div className="resource-actions">
              <button type="button">Bulk Import</button>
              <button type="button">Export CSV</button>
              <button className="primary" type="button">Register Room</button>
            </div>
          </header>

          <section className="resource-stat-grid" aria-label="Room inventory summary">
            <MetricCard label="Total Rooms" value={stats.total} detail="Active locations" tone="blue" />
            <MetricCard label="Lecture Halls" value={stats.lectureHalls} detail="Exam-ready venues" tone="slate" />
            <MetricCard label="Tech Labs" value={stats.labs} detail="Specialist rooms" tone="green" />
            <MetricCard label="Classrooms" value={stats.classrooms} detail="General teaching" tone="yellow" />
            <MetricCard label="Total Capacity" value={stats.capacity} detail="Available seats" tone="blue" />
          </section>

          <section className="filter-panel panel">
            <input aria-label="Search rooms" placeholder="Filter rooms by name, building, or room code" />
            <select aria-label="Room type">
              <option>All room types</option>
              <option>Classroom</option>
              <option>Lab</option>
              <option>Exam hall</option>
            </select>
            <select aria-label="Capacity range">
              <option>All capacities</option>
              <option>30+ seats</option>
              <option>50+ seats</option>
              <option>100+ seats</option>
            </select>
          </section>

          <section className="resource-layout">
            <article className="panel resource-table-panel">
              <div className="panel-title-row">
                <div>
                  <h2>Room Directory</h2>
                  <p>Showing {roomData.length} facility records</p>
                </div>
                <span className="soft-pill">Code ascending</span>
              </div>

              <div className="table-wrap">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Type</th>
                      <th>Capacity</th>
                      <th>Occupancy</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomData.map((room) => (
                      <tr key={room.id}>
                        <td>
                          <strong>{room.name}</strong>
                          <span>{room.location}</span>
                        </td>
                        <td>
                          <span className="soft-pill">{roomTypeLabel(room.type)}</span>
                        </td>
                        <td>{room.capacity} seats</td>
                        <td>
                          <div className="progress-line">
                            <span>{room.occupancy}%</span>
                            <div>
                              <i style={{ width: `${Math.min(100, room.occupancy)}%` }} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-pill ${room.status}`}>{room.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="panel profile-panel">
              <span className="soft-pill blue">Selected Room</span>
              <h2>Room 404</h2>
              <p>Bldg 4 / FL 4</p>
              <div className="room-schematic">Capacity planning profile</div>
              <div className="profile-metrics">
                <div>
                  <span>Type</span>
                  <strong>Classroom</strong>
                </div>
                <div>
                  <span>Capacity</span>
                  <strong>40 seats</strong>
                </div>
                <div>
                  <span>Current Load</span>
                  <strong>88.2%</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>Available</strong>
                </div>
              </div>
              <div className="notice-card warning">
                Capacity is near the recommended threshold. Review large cohort assignments before booking.
              </div>
              <button className="wide-primary" type="button">Reserve Room Slot</button>
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
