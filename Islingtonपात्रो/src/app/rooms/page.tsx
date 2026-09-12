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
<<<<<<< HEAD
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
=======
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn" style={{ fontSize: '12px' }}>↑ BULK IMPORT</button>
              <button className="btn" style={{ fontSize: '12px' }}>↓ EXPORT CSV</button>
              <button className="btn primary" style={{ background: '#1677f5', color: '#ffffff', border: 'none' }}>+ REGISTER NEW ROOM</button>
            </div>
          </header>

          <div className="grid stats-grid" style={{ marginBottom: 24, display: 'flex', gap: '16px' }}>
            <div className="panel" style={{ flex: 1, padding: '16px', borderLeft: '4px solid #1677f5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>TOTAL ROOMS</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                42 <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'normal' }}>LOCATIONS</span>
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>ACTIVE STATUS: 100%</div>
            </div>
            <div className="panel" style={{ flex: 1.2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>LECTURE HALLS</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>21</div>
              </div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                08 <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'normal' }}>MAIN CAM</span>
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>EXAM READY: 5 / 8</div>
            </div>
            <div className="panel" style={{ flex: 1.2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>TECH / SPEC LABS</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                16 <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'normal' }}>COMP / ENG</span>
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>GPU EQUIPPED: 11 UNITS</div>
            </div>
            <div className="panel" style={{ flex: 1.2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>CLASSROOMS</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                18 <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'normal' }}>GEN ED</span>
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>SMART BOARDS: 14 / 18</div>
            </div>
            <div className="panel" style={{ flex: 1.5, padding: '16px', borderTop: '4px solid #10b981', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                <span>TOTAL CAPACITY</span>
                <span>⚲</span>
              </div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                2,640 <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'normal' }}>SEATS</span>
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>OCCUPANCY:</span>
                <span style={{ fontWeight: 'bold', color: '#0f203d' }}>74.2% AV</span>
              </div>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '24px', padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: '10px', top: '10px', fontSize: '12px', color: '#94a3b8' }}>🔍</span>
                <input type="text" className="input" placeholder="Filter rooms by name, building..." style={{ width: '100%', paddingLeft: '32px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>LOC:</span>
                <select className="select" style={{ width: '220px', fontWeight: 'bold' }}>
                  <option>All Campuses / Buildings (All)</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
                <span className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>CAP RANGE:</span>
                <input type="text" className="input" defaultValue="00" style={{ width: '50px', textAlign: 'center' }} />
                <span>-</span>
                <input type="text" className="input" defaultValue="999" style={{ width: '50px', textAlign: 'center' }} />
                <span className="muted" style={{ fontSize: '10px' }}>SEATS</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn" style={{ background: '#1677f5', color: '#fff', fontSize: '10px', padding: '4px 12px', borderRadius: '4px', border: 'none' }}>ALL (42)</button>
                <button className="btn" style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '4px' }}>CLASSROOM (18)</button>
                <button className="btn" style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '4px' }}>LAB (16)</button>
                <button className="btn" style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '4px' }}>EXAM_HALL (8)</button>
              </div>
              <div className="muted" style={{ fontSize: '10px' }}>
                <span style={{ color: '#ef4444' }}>●</span> High Load (&gt;90%) <span style={{ color: '#10b981', marginLeft: '8px' }}>●</span> Nominal
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
            <section className="panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #E5ECF5', background: '#ffffff' }}>
                <h2 style={{ fontSize: '12px', margin: 0 }}>DATABASE TABLE: "ROOMS" <span className="muted" style={{fontWeight: 'normal', fontSize: '10px', border: '1px solid #cbd5e1', padding: '2px 4px', marginLeft: '8px'}}>[ 7 RECORD PREVIEW ]</span></h2>
                <div style={{ fontSize: '10px', color: '#64748b' }}>
                  SORT: <strong>CODE ASC</strong> ▾
>>>>>>> b3d7344690eb4620b7f4e95411c47b7d1d50fd24
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
<<<<<<< HEAD
                        <td>
                          <span className="soft-pill">{roomTypeLabel(room.type)}</span>
                        </td>
                        <td>{room.capacity} seats</td>
                        <td>
                          <div className="progress-line">
                            <span>{room.occupancy}%</span>
                            <div>
                              <i style={{ width: `${Math.min(100, room.occupancy)}%` }} />
=======
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ fontSize: '10px', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>{room.type}</span>
                        </td>
                        <td style={{ padding: '16px 12px', fontSize: '16px', fontWeight: 'bold' }}>{room.capacity} <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'normal' }}>seats</span></td>
                        <td style={{ padding: '16px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', minWidth: '30px' }}>{room.occupancy}%</span>
                            <div className="progress" style={{ width: '80px', height: '6px', background: '#E5ECF5', borderRadius: '6px', overflow: 'hidden' }}>
                              <div style={{ width: `\${room.occupancy}%`, height: '100%', background: room.occupancy > 85 ? '#ef4444' : '#10b981' }} />
>>>>>>> b3d7344690eb4620b7f4e95411c47b7d1d50fd24
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
<<<<<<< HEAD
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
=======
              <div style={{ padding: '12px 16px', background: '#ffffff', borderTop: '1px solid #e2e8f0', fontSize: '10px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>SHOWING 1 - 7 OF 42 FACILITY RECORDS</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="btn" style={{ padding: '2px 6px', fontSize: '10px' }}>&lt;&lt; PREV</button>
                  <button className="btn" style={{ padding: '2px 8px', fontSize: '10px', background: '#1677f5', color: '#ffffff', border: 'none' }}>1</button>
                  <button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }}>2</button>
                  <button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }}>3</button>
                  <button className="btn" style={{ padding: '2px 8px', fontSize: '10px' }}>4</button>
                  <button className="btn" style={{ padding: '2px 6px', fontSize: '10px' }}>NEXT &gt;&gt;</button>
                </div>
              </div>
            </section>
            
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="panel" style={{ border: '1px solid #E5ECF5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>// SELECTED ROOM PROFILE</div>
                  <div style={{ border: '1px solid #E5ECF5', fontSize: '9px', fontWeight: 'bold', padding: '2px 4px' }}>LIVE METADATA</div>
                </div>
                
                <h2 style={{ fontSize: '16px', margin: '0 0 2px 0' }}>ROOM PROFILE:</h2>
                <h1 style={{ fontSize: '32px', margin: '0 0 16px 0', fontWeight: 'bold' }}>ROOM 401</h1>
                <p className="muted" style={{ fontSize: '11px', marginBottom: '24px', lineHeight: 1.4 }}>Building B - Level 4 (Specialized STEM Computing Zone)</p>
                
                <div style={{ border: '1px dashed #cbd5e1', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', background: '#ffffff', color: '#94a3b8', fontSize: '10px', textAlign: 'center', padding: '16px' }}>
                  ARCHITECTURAL SCHEMATIC - DWG: 104<br/>(Floor Plan CAD Ref: FP-B-401-v2)
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ border: '1px solid var(--card-border)', padding: '12px', borderRadius: '4px', background: '#ffffff' }}>
                    <div className="muted" style={{ fontSize: '9px', fontWeight: 'bold' }}>ROOM TYPE:</div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>LAB</div>
                  </div>
                  <div style={{ border: '1px solid var(--card-border)', padding: '12px', borderRadius: '4px', background: '#ffffff' }}>
                    <div className="muted" style={{ fontSize: '9px', fontWeight: 'bold' }}>MAX CAPACITY:</div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>40 SEATS</div>
                  </div>
                  <div style={{ border: '1px solid var(--card-border)', padding: '12px', borderRadius: '4px', background: '#ffffff' }}>
                    <div className="muted" style={{ fontSize: '9px', fontWeight: 'bold' }}>CURRENT LOAD:</div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>88% ⚲</div>
                  </div>
                  <div style={{ border: '1px solid var(--card-border)', padding: '12px', borderRadius: '4px', background: '#ffffff' }}>
                    <div className="muted" style={{ fontSize: '9px', fontWeight: 'bold' }}>FACILITY STATUS:</div>
                    <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#10b981' }}>ONLINE /<br/>ACTIVE</div>
                  </div>
                </div>

                <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>EQUIPPED HARDWARE:</div>
                <div style={{ fontSize: '11px', color: '#334155', marginBottom: '24px', lineHeight: 1.4 }}>
                  Dual Projector, 40 Workstations, Audio Rack, Smart Air Ventilation Control.
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', padding: '12px', borderRadius: '4px', marginBottom: '24px' }}>
                  <div style={{ color: '#d97706', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⚠ CAPACITY CONSTRAINT FLAG
                  </div>
                  <div style={{ fontSize: '10px', color: '#92400e', lineHeight: 1.4 }}>
                    Warning triggers automatically if scheduling attempt exceeds 40 students. Cohort overflow routing is enforced by Timetable Engine.
                  </div>
                </div>

                <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>TODAY'S SCHEDULED SESSIONS - [REALTIME]:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '8px', fontSize: '10px', display: 'flex', justifyContent: 'space-between', background: '#ffffff' }}>
                    <strong>CS-205 Data Structures</strong>
                    <span className="muted">08:00 - 11:00</span>
                  </div>
                  <div style={{ border: '1px solid #e2e8f0', padding: '8px', fontSize: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <strong>CS-302 Operating System</strong>
                    <span className="muted">13:00 - 15:00</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn" style={{ background: '#1677f5', color: '#fff', fontSize: '10px', fontWeight: 'bold', border: 'none', padding: '12px', flex: 1 }}>RESERVE ROOM SLOT</button>
                  <button className="btn" style={{ fontSize: '10px', padding: '12px', flex: 1 }}>FULL AUDIT LOG</button>
                </div>
>>>>>>> b3d7344690eb4620b7f4e95411c47b7d1d50fd24
              </div>
              <button className="wide-primary" type="button">Reserve Room Slot</button>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}

<<<<<<< HEAD
function MetricCard(props: { label: string; value: string | number; detail: string; tone: string }) {
  return (
    <article className={`metric-card ${props.tone}`}>
      <p>{props.label}</p>
      <strong>{props.value}</strong>
      <span>{props.detail}</span>
    </article>
  );
}
=======


>>>>>>> b3d7344690eb4620b7f4e95411c47b7d1d50fd24
