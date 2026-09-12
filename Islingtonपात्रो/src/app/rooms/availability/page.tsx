import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { mockRooms } from "@/lib/mockData";

export default function RoomAvailabilityPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="muted" style={{ fontSize: '10px', letterSpacing: '1px', marginBottom: 4 }}>// RESOURCES &gt; DYNAMIC AVAILABILITY ENGINE <span style={{border: '1px solid #ccc', padding: '0 4px'}}>[v2024.1_GL]</span></div>
              <h1>ROOM AVAILABILITY &amp; SLOT FINDER</h1>
              <p className="muted">Find free spaces, inspect time-slot availability, and verify capacity thresholds to prevent CLASS_CLASH anomalies across campus clusters.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '16px' }}>
                <span className="muted" style={{ fontSize: '9px', fontWeight: 'bold' }}>LOCK STATUS</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>REAL-TIME SYNC</span>
              </div>
              <button className="btn" style={{ background: '#1677f5', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>⚲</span> RULESETS
              </button>
            </div>
          </header>

          <section className="panel" style={{ marginBottom: 24, borderTop: '1px solid #E5ECF5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>▽ PARAMETERS_QUERY_CONFIG</div>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>AUTO-EVALUATE: ENABLED</div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
              <div>
                <label className="muted" style={{ fontSize: '10px', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>01 // TARGET DAY</label>
                <div style={{ display: 'flex' }}>
                  {['MON', 'TUE', 'WED', 'THU', 'FRI'].map(d => (
                    <button key={d} className={`btn ${d === 'TUE' ? 'primary' : ''}`} style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '6px', margin: 0, borderRight: d !== 'FRI' ? 'none' : '', background: d === 'TUE' ? '#0f203d' : '#fff', color: d === 'TUE' ? '#fff' : '#0f203d', fontWeight: 'bold' }}>{d}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="muted" style={{ fontSize: '10px', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>02 // TIME WINDOW</label>
                <select className="select" style={{ width: '100%', fontWeight: 'bold', fontSize: '12px' }}>
                  <option>11:00 - 12:30 (Target) ▾</option>
                </select>
              </div>
              <div>
                <label className="muted" style={{ fontSize: '10px', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>03 // CAPACITY</label>
                <input type="text" className="input" defaultValue=">= 30 seats" style={{ width: '120px', fontWeight: 'bold', fontSize: '12px' }} />
              </div>
              <div>
                <label className="muted" style={{ fontSize: '10px', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>04 // ROOM CLUSTER</label>
                <select className="select" style={{ width: '150px', fontWeight: 'bold', fontSize: '12px' }}>
                  <option>All Types ▾</option>
                </select>
              </div>
              <button className="btn primary" style={{ height: '38px', background: '#1677f5', color: '#ffffff', border: 'none', fontWeight: 'bold', padding: '0 24px' }}>+ FIND</button>
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
             <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '8px' }}>TARGET WINDOW SCAN</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ fontSize: '18px', fontWeight: 'bold' }}>TUE 11:00-12:30</div>
                 <div style={{ fontSize: '10px', border: '1px solid #cbd5e1', padding: '2px 6px', borderRadius: '6px' }}>ALGO</div>
               </div>
             </div>
             <div className="panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ fontSize: '40px', fontWeight: 'bold' }}>42</div>
               <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1.2 }}>TOTAL ACCREDITED<br/>ROOMS</div>
             </div>
             <div className="panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ fontSize: '40px', fontWeight: 'bold' }}>28</div>
               <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1.2 }}>
                 CURRENT ALLOCATIONS<br/>
                 <span style={{ color: '#0f203d' }}>66.7% OCCUPIED</span>
               </div>
             </div>
             <div className="panel" style={{ padding: '16px', borderLeft: '4px solid #1677f5', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ fontSize: '40px', fontWeight: 'bold' }}>14</div>
               <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1.2 }}>
                 AVAILABLE VACANCY<br/>
                 <span style={{ background: '#1677f5', color: '#fff', padding: '2px 4px', display: 'inline-block', marginTop: '4px' }}>33.3% FREE</span>
               </div>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
            <div className="stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5ECF5', paddingBottom: '8px' }}>
                <h2 style={{ fontSize: '12px', margin: 0 }}>▤ AVAILABLE ROOMS</h2>
                <div style={{ fontSize: '10px', background: '#E5ECF5', padding: '2px 6px', fontWeight: 'bold' }}>14 QUALIFIED</div>
              </div>
              
              {mockRooms.filter(r => r.status === 'available').map(room => (
                <div key={room.id} className="panel" style={{ padding: '16px', border: room.id === 'R404' ? '1px solid #E5ECF5' : '1px solid var(--card-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '14px' }}>{room.name}</strong> <span style={{ fontSize: '9px', border: '1px solid #cbd5e1', padding: '2px 4px', borderRadius: '6px', fontWeight: 'bold' }}>{room.type}</span>
                      {room.id === 'R404' && <span style={{ fontSize: '9px', background: '#1677f5', color: '#fff', padding: '2px 4px', marginLeft: '4px', borderRadius: '6px', fontWeight: 'bold' }}>SELECTED</span>}
                    </div>
                    <span style={{ fontSize: '10px', border: '1px solid #E5ECF5', padding: '2px 6px', fontWeight: 'bold' }}>[ FREE NOW ]</span>
                  </div>
                  
                  <div className="muted" style={{ fontSize: '10px', marginBottom: '8px' }}>
                    CAPACITY: {room.capacity} SEATS // {room.location.split(' / ')[0].toUpperCase()} WING L.{room.location.split(' / ')[1].replace(/[^0-9]/g, '') || 'G'}
                  </div>
                  
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '16px', lineHeight: 1.4 }}>
                    {room.type === 'CLASSROOM' ? 'Next Session: 14:00 (CS204). Customs: 12m from central wing.' : room.type === 'LAB' ? 'Availability: All afternoon. Hardware: 30 terminals open.' : 'Availability: Free full day. Acoustics: PA System + Mic set.'}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="muted" style={{ fontSize: '9px' }}>[{room.type === 'CLASSROOM' ? 'AV Projector + Dual Board' : room.type === 'LAB' ? 'Network Hubs + Patchbay' : 'Exam Partition Desks'}]</div>
                    <button className="btn" style={{ fontSize: '10px', padding: '6px 12px', background: room.id === 'R404' ? '#0f203d' : '#fff', color: room.id === 'R404' ? '#fff' : '#0f203d', fontWeight: 'bold', border: room.id === 'R404' ? 'none' : '1px solid #E5ECF5' }}>[ QUICK BOOK / ASSIGN ]</button>
                  </div>
                </div>
              ))}
              
              <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', padding: '8px', border: '1px dashed #cbd5e1' }}>
                SHOWING 3 OF 14 COMPATIBLE SPACES &nbsp;&nbsp;&nbsp;&nbsp; [NEXT ▾]
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #E5ECF5', background: '#ffffff' }}>
                  <h2 style={{ fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>☷ TIME-SLOT GRID MATRIX <span className="muted" style={{fontWeight: 'normal', fontSize: '10px'}}>[PRIMARY]</span></h2>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: '#0f203d' }}>●</span> OCCUPIED</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: '#cbd5e1', border: '1px solid #cbd5e1', borderRadius: '50%', width: '8px', height: '8px', display: 'inline-block' }}></span> FREE</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: '#ef4444' }}>●</span> CLASH</div>
                  </div>
                </div>
                
                <div className="table-wrap">
                  <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #E5ECF5', background: '#ffffff' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--card-border)', fontSize: '10px' }}>ROOM / CAP</th>
                        <th style={{ padding: '12px', borderRight: '1px solid var(--card-border)', fontSize: '10px' }}>08:00</th>
                        <th style={{ padding: '12px', borderRight: '1px solid var(--card-border)', fontSize: '10px' }}>09:30</th>
                        <th style={{ padding: '12px', background: '#1677f5', color: '#fff', borderRight: '1px solid var(--card-border)', fontSize: '10px' }}>11:00 (TARGET)</th>
                        <th style={{ padding: '12px', fontSize: '10px' }}>12:30</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRooms.map(room => (
                        <tr key={room.id} style={{ borderBottom: '1px solid var(--card-border)', background: '#ffffff' }}>
                          <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--card-border)' }}>
                            <strong style={{ fontSize: '12px' }}>{room.name}</strong><br/>
                            <span className="muted" style={{ fontSize: '9px' }}>Cap: {room.capacity} - {room.type.substring(0,3)}</span>
                          </td>
                          <td style={{ padding: '8px', borderRight: '1px solid var(--card-border)' }}>
                            {room.status === 'occupied' ? (
                              <div style={{ background: '#1677f5', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>CS101<br/>Sec A</div>
                            ) : (
                              <div style={{ color: '#94a3b8', fontSize: '10px', padding: '12px' }}>[FREE]</div>
                            )}
                          </td>
                          <td style={{ padding: '8px', borderRight: '1px solid var(--card-border)' }}>
                            {room.status === 'occupied' ? (
                              <div style={{ background: '#1677f5', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>CS101<br/>Sec A</div>
                            ) : room.id === 'L201' ? (
                              <div style={{ background: '#1677f5', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>SE302<br/>Terminals</div>
                            ) : (
                              <div style={{ color: '#94a3b8', fontSize: '10px', padding: '12px' }}>[FREE]</div>
                            )}
                          </td>
                          <td style={{ padding: '8px', borderRight: '1px solid var(--card-border)' }}>
                            {room.status === 'available' ? (
                              <div style={{ border: '1px solid #E5ECF5', color: '#0f203d', padding: '12px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>[FREE]<br/>Open</div>
                            ) : (
                              <div style={{ background: '#ef4444', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>⚠ CLASH ( 2 SEC )<br/>MA101 / MA104</div>
                            )}
                          </td>
                          <td style={{ padding: '8px' }}>
                            {room.id === 'R404' ? (
                              <div style={{ background: '#1677f5', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>CS204<br/>Lab Tut</div>
                            ) : (
                              <div style={{ color: '#94a3b8', fontSize: '10px', padding: '12px' }}>[FREE]</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: '12px 16px', background: '#ffffff', borderTop: '1px solid #e2e8f0', fontSize: '10px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                  <div>Target window column (11:00-12:30) evaluated under<br/>Constraint Set_2 [Anti-Clash Protocol]</div>
                  <div style={{ textAlign: 'right' }}>TOTAL CLUSTER: 42<br/>REGISTERED ROOMS</div>
                </div>
              </div>
              
              <div style={{ borderLeft: '4px solid #ef4444', background: '#ffffff', padding: '16px', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', borderRadius: '0 4px 4px 0' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px' }}>⚠</span> AUTOMATED CLASH DETECTION ALERTS (*ON COMPLIANCE)
                </div>
                <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.4, paddingLeft: '18px' }}>
                  <strong>Room 405</strong> exhibits a double-concurrent reservation for Tuesday 11:00 (CS108 vs SE101). Use the conflict triage desk or re-assign CS108 directly to qualified <strong>Room 404</strong> to clear the schedule alert flag.
                </div>
              </div>
              
              <div style={{ borderLeft: '4px solid #1677f5', background: '#ffffff', padding: '16px', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', borderRadius: '0 4px 4px 0' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px' }}>✔</span> CRITERIA VALIDATION SUCCESS
                </div>
                <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.4, paddingLeft: '18px', marginBottom: '12px' }}>
                  [1] <strong>Room 404</strong> selected: Capacity meets all CS205 cohort criteria (Cap 40 &gt;= Cohort 38). Zero spatial conflicts found for 11:00-12:30 slot.
                </div>
                <div style={{ paddingLeft: '18px', display: 'flex', gap: '8px' }}>
                  <button className="btn" style={{ background: '#1677f5', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '6px 16px', border: 'none' }}>CONFIRM ASSIGNMENT</button>
                  <button className="btn" style={{ fontSize: '10px', padding: '6px 16px', border: '1px solid #cbd5e1' }}>Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}



