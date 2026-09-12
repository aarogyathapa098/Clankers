import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { roomData } from "@/lib/roomData";

const timeWindows = ["08:00", "09:30", "11:00", "12:30"];

export default function RoomAvailabilityPage() {
  const availableRooms = roomData.filter((room) => room.status === "available");

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Resources / Room Availability</p>
              <h1>Room Availability & Slot Finder</h1>
              <span>Find open rooms, compare capacity, and catch room clashes before sessions are assigned.</span>
            </div>
            <div className="resource-actions">
              <button type="button">Rulesets</button>
              <button className="primary" type="button">Find Rooms</button>
            </div>
          </header>

          <section className="filter-panel panel">
            <div className="day-selector">
              {["MON", "TUE", "WED", "THU", "FRI"].map((day) => (
                <button className={day === "TUE" ? "active" : ""} key={day} type="button">
                  {day}
                </button>
              ))}
            </div>
            <select aria-label="Time window">
              <option>11:00 - 12:30</option>
              <option>08:00 - 09:30</option>
              <option>09:30 - 11:00</option>
            </select>
            <input aria-label="Capacity" defaultValue=">= 30 seats" />
            <select aria-label="Room cluster">
              <option>All types</option>
              <option>Classrooms</option>
              <option>Labs</option>
            </select>
          </section>

          <section className="resource-stat-grid four">
            <MetricCard label="Target Window" value="TUE 11:00" detail="12:30 end time" tone="blue" />
            <MetricCard label="Total Rooms" value={roomData.length} detail="Accredited spaces" tone="slate" />
            <MetricCard label="Allocated" value={roomData.length - availableRooms.length} detail="Currently occupied" tone="yellow" />
            <MetricCard label="Available" value={availableRooms.length} detail="Ready to assign" tone="green" />
          </section>

          <section className="availability-layout">
            <aside className="available-room-list">
              <div className="panel-title-row compact">
                <div>
                  <h2>Available Rooms</h2>
                  <p>{availableRooms.length} compatible spaces</p>
                </div>
              </div>
              {availableRooms.map((room) => (
                <article className={`room-option panel ${room.id === "R404" ? "selected" : ""}`} key={room.id}>
                  <div>
                    <strong>{room.name}</strong>
                    <span className="soft-pill">{room.type.replace("_", " ")}</span>
                  </div>
                  <p>{room.capacity} seats / {room.location}</p>
                  <span>{room.type === "LAB" ? "Lab-ready hardware" : "Teaching-ready setup"}</span>
                  <button type="button">Quick Book</button>
                </article>
              ))}
            </aside>

            <article className="panel resource-table-panel">
              <div className="panel-title-row">
                <div>
                  <h2>Time-Slot Grid</h2>
                  <p>Target window is highlighted for fast room assignment.</p>
                </div>
                <span className="soft-pill blue">Tuesday</span>
              </div>

              <div className="table-wrap">
                <table className="resource-table availability-table">
                  <thead>
                    <tr>
                      <th>Room / Cap</th>
                      {timeWindows.map((window) => (
                        <th className={window === "11:00" ? "target" : ""} key={window}>{window}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roomData.map((room) => (
                      <tr key={room.id}>
                        <td>
                          <strong>{room.name}</strong>
                          <span>{room.capacity} seats / {room.type}</span>
                        </td>
                        {timeWindows.map((window) => {
                          const targetFree = window === "11:00" && room.status === "available";
                          const busy = room.status === "occupied" && window !== "12:30";

                          return (
                            <td key={`${room.id}-${window}`}>
                              <span className={`slot-pill ${targetFree ? "free" : busy ? "busy" : "open"}`}>
                                {targetFree ? "Free" : busy ? "Occupied" : "Open"}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>

          <div className="notice-card info">
            Room 404 meets the selected capacity requirement and has no clash in the 11:00 - 12:30 window.
          </div>
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
