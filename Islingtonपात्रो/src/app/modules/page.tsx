import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { mockModules, mockFaculty } from "@/lib/mockData";

export default function ModulesPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="muted" style={{ fontSize: '10px', letterSpacing: '1px', marginBottom: 4 }}>// FACULTY &gt; CURRICULUM TEACHING ALLOCATIONS <span style={{border: '1px solid #ccc', padding: '0 4px'}}>[SEC-20.4451G]</span></div>
              <h1>MODULE TEACHING ASSIGNMENTS</h1>
              <p className="muted">Define core teaching allocations (Module &gt; Faculty &gt; Cohort &gt; Weekly Hours) prior to timetable slot scheduling.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div className="muted" style={{ fontSize: '12px', marginRight: '16px' }}>ACADEMIC TERM: <strong>AY-2025 SEM-1I</strong> | TOTAL REQ: <strong>39.0 HRS/WK</strong></div>
              <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                [BULK ALLOCATE]
              </button>
              <button className="btn" style={{ background: '#000', color: '#fff', border: 'none' }}>
                + CREATE NEW ASSIGNMENT
              </button>
            </div>
          </header>

          <div className="panel" style={{ marginBottom: 24, padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>⚡ OPERATIONAL WORKFLOW PROTOCOL (Y22 &amp; Y23)</div>
              <div style={{ fontSize: '9px', border: '1px solid #cbd5e1', padding: '2px 6px', color: '#64748b' }}>STATUS: PRE-TIMETABLE</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ flex: 1, border: '1px solid #000', padding: '12px', background: '#fff', borderRadius: '4px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ background: '#000', color: '#fff', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', borderRadius: '2px' }}>1</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>CREATE MODULE ASSIGNMENT</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Req: [Module Code] + [Assigned Faculty] + [Target Cohort] = Defines weekly Contact Hours.</div>
                  </div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '20px' }}>→</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', width: '80px', borderBottom: '1px dashed #cbd5e1', paddingBottom: '4px' }}>UNLOCKS SLOT BINDING</div>
              <div style={{ color: '#94a3b8', fontSize: '20px' }}>→</div>
              <div style={{ flex: 1, border: '1px solid #e2e8f0', padding: '12px', background: '#fff', borderRadius: '4px' }}>
                <div style={{ display: 'flex', gap: '8px', opacity: 0.5 }}>
                  <div style={{ background: '#94a3b8', color: '#fff', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', borderRadius: '2px' }}>2</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>TIMETABLE SESSION SCHEDULING</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Slot assignments into Room x Time Grid. Unscheduled hours route into the draft pool.</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>Directive:</strong> Assignments establish compulsory weekly hours; unscheduled hours automatically flag the cohort/faculty in the schedule draft pool.</div>
              <div style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '2px' }}>DRAFT_POOL_REFS: 2</div>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '16px', padding: '12px', display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: '10px', top: '10px', fontSize: '12px', color: '#94a3b8' }}>🔍</span>
              <input type="text" className="input" placeholder="Filter by module code, faculty name, or cohort..." style={{ width: '100%', paddingLeft: '32px' }} />
            </div>
            <select className="select" style={{ width: '180px' }}>
              <option>ALL DEPARTMENTS</option>
            </select>
            <select className="select" style={{ width: '180px' }}>
              <option>ALL COHORTS</option>
            </select>
            <select className="select" style={{ width: '180px' }}>
              <option>SCHEDULE STATUS: ALL</option>
            </select>
            <button className="btn" style={{ fontWeight: 'bold' }}>RESET</button>
          </div>

          <section className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '2px solid #000', background: '#f8fafc' }}>
              <h2 style={{ fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>MASTER TEACHING ALLOCATIONS MATRIX <span className="muted" style={{fontWeight: 'normal', fontSize: '10px'}}>[ 7 ALLOCATIONS RECORDED ]</span></h2>
              <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div>SORT: <strong>CODE ASC</strong> ▾</div>
                <button className="btn" style={{ fontSize: '10px', padding: '2px 8px' }}>[EXPORT CSV/PRINT]</button>
              </div>
            </div>
            
            <div className="table-wrap">
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b' }}>MODULE CODE &amp;<br/>TITLE</th>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b' }}>ASSIGNED<br/>FACULTY</th>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b' }}>TARGET COHORT<br/>(SIZE)</th>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b' }}>EST.<br/>WEEKLY<br/>HRS</th>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b' }}>SCHEDULED<br/>SESSIONS</th>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b' }}>SCHEDULING<br/>STATUS</th>
                    <th style={{ padding: '12px 16px', fontSize: '10px', color: '#64748b', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockModules.map(module => {
                    const faculty = mockFaculty.find(f => f.id === module.facultyId);
                    const isFullyScheduled = module.scheduled === module.totalSessions && module.totalSessions > 0;
                    const isPartial = module.scheduled < module.totalSessions && module.scheduled > 0;
                    const isUnscheduled = module.scheduled === 0;
                    
                    let statusBox;
                    if (isUnscheduled) {
                      statusBox = <div style={{ border: '1px dashed #ef4444', color: '#ef4444', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block' }}>UNSCHEDULED<br/><span style={{fontSize: '9px', fontWeight: 'normal'}}>(DRAFT)</span></div>;
                    } else if (isPartial) {
                      statusBox = <div style={{ border: '1px solid #000', color: '#000', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block' }}>PARTIAL<br/><span style={{fontSize: '9px', fontWeight: 'normal'}}>({module.scheduled}/{module.totalSessions})</span></div>;
                    } else {
                      statusBox = <div style={{ border: '1px solid #cbd5e1', color: '#64748b', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block' }}>FULLY<br/>SCHEDULED</div>;
                    }
                    
                    return (
                      <tr key={module.id} style={{ borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                        <td style={{ padding: '16px' }}>
                          <strong style={{ fontSize: '14px' }}>{module.code}</strong><br/>
                          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{module.name.split(' ').slice(0, 2).join(' ')}</span><br/>
                          <span className="muted" style={{ fontSize: '10px' }}>[Core - 4 Credits]</span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                              {faculty?.name.split(' ').pop()?.[0]}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold' }}>{faculty?.name || 'Unassigned'}</div>
                              <div style={{ fontSize: '10px', color: '#64748b' }}>{faculty?.assignedHours.toFixed(1)} / {faculty?.maxHours.toFixed(1)}h</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: 'bold' }}>{module.cohort}</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>45 students<br/>registered</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{module.hours.toFixed(1)}</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>hrs/wk</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', color: isUnscheduled ? '#ef4444' : '#000' }}>{module.scheduled} / {module.totalSessions}</div>
                              <div style={{ fontSize: '10px', color: '#64748b' }}>sessions<br/>scheduled</div>
                            </div>
                            {isFullyScheduled && <div style={{ color: '#10b981', fontSize: '16px' }}>✔</div>}
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          {statusBox}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                            <button className="btn" style={{ fontSize: '10px', padding: '4px 8px' }}>[EDIT]</button>
                            {isUnscheduled ? (
                              <button className="btn" style={{ background: '#000', color: '#fff', fontSize: '10px', padding: '4px 8px', border: 'none' }}>[SCHEDULE SLOT]</button>
                            ) : (
                              <button className="btn" style={{ fontSize: '10px', padding: '4px 8px' }}>[VIEW TIMETABLE]</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '12px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '10px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <div>SCHEMA: [module_assignments (Prod-C)] | INDEXING: P-KEY, REGION_ID</div>
              <div>PAGE 1 OF 1 &lt; &gt;</div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
