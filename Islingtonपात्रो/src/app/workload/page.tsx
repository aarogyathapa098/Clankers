import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { mockFaculty, getUtilizationStatus } from "@/lib/mockData";

export default function WorkloadPage() {
  const stats = {
    total: mockFaculty.length,
    normal: mockFaculty.filter(f => getUtilizationStatus(f.assignedHours, f.maxHours).key === "normal").length,
    nearLimit: mockFaculty.filter(f => getUtilizationStatus(f.assignedHours, f.maxHours).key === "near").length,
    overloaded: mockFaculty.filter(f => getUtilizationStatus(f.assignedHours, f.maxHours).key === "overload").length,
  };

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="muted" style={{ fontSize: '10px', letterSpacing: '1px', marginBottom: 4 }}>// FACULTY &gt; CURRICULUM ALLOCATION &gt; WORKLOAD</div>
              <h1>Faculty Workload &amp; Hours Distribution</h1>
              <p className="muted">Monitor weekly assigned teaching hours against contractual maximums to prevent overload and scheduling conflicts.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div className="muted" style={{ fontSize: '12px', marginRight: '16px' }}>TERM: <strong>AY-2024-SEM-2</strong></div>
              <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '16px' }}>↓</span> EXPORT WORKLOAD REPORT
              </button>
              <button className="btn" style={{ background: '#000', color: '#fff', border: 'none' }}>
                ⚙ ADJUST MAX THRESHOLDS
              </button>
            </div>
          </header>

          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderLeft: '4px solid #ef4444', padding: '16px', borderRadius: '4px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: '#ef4444', fontSize: '24px', lineHeight: 1 }}>⚠</div>
              <div>
                <div style={{ color: '#991b1b', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>COMPLIANCE CRITICAL EXCEPTION: 1 OVERLOAD DETECTED</div>
                <div style={{ color: '#7f1d1d', fontSize: '14px' }}>Faculty member <strong>Dr. K. Chen</strong> is assigned 22.0h/wk against contractual limit of 20.0h/wk (+110%). Immediate rebalancing recommended.</div>
              </div>
            </div>
            <button className="btn" style={{ background: '#ef4444', color: '#fff', border: 'none', fontWeight: 'bold' }}>INSPECT OVERLOAD</button>
          </div>

          <div className="grid stats-grid" style={{ marginBottom: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div className="panel" style={{ padding: '16px' }}>
              <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>TOTAL ACTIVE FACULTY</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '8px' }}>28</div>
              <div className="muted" style={{ fontSize: '12px' }}>Instructors</div>
              <div className="muted" style={{ fontSize: '10px', marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '8px' }}>FTE ALLOCATION: 100% CATALOGED</div>
            </div>
            <div className="panel" style={{ padding: '16px', borderTop: '4px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>NORMAL THRESHOLD</div>
                <div style={{ fontSize: '10px', background: '#d1fae5', color: '#065f46', padding: '2px 6px', borderRadius: '10px' }}><span style={{color: '#10b981'}}>●</span> &lt;80%</div>
              </div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                22 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>78.6%</span>
              </div>
              <div className="muted" style={{ fontSize: '10px', marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '8px' }}><span style={{color: '#10b981'}}>●</span> Optimal workload capacity</div>
            </div>
            <div className="panel" style={{ padding: '16px', borderTop: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>NEAR LIMIT BAND</div>
                <div style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '10px' }}><span style={{color: '#f59e0b'}}>●</span> 80%-100%</div>
              </div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                05 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>17.9%</span>
              </div>
              <div className="muted" style={{ fontSize: '10px', marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '8px' }}>⭘ Capped for new modules</div>
            </div>
            <div className="panel" style={{ padding: '16px', background: '#0f172a', color: '#fff', borderTop: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8' }}>OVERLOADED</div>
                <div style={{ fontSize: '10px', background: '#7f1d1d', color: '#fca5a5', padding: '2px 6px', borderRadius: '10px' }}><span style={{color: '#ef4444'}}>●</span> &gt;100%</div>
              </div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                01 <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'normal' }}>3.5%</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '16px', borderTop: '1px solid #334155', paddingTop: '8px' }}>! Dr. K. Chen (+2.0h) RESOLVE</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
            <section className="panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
                <div>
                  <h2 style={{ fontSize: '14px', marginBottom: '8px' }}>FACULTY DIRECTORY <span className="muted" style={{fontWeight: 'normal', fontSize: '12px'}}>[SHOWING 7 RECORDS PROFILED]</span></h2>
                  <div className="toolbar" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="muted" style={{ fontSize: '10px', fontWeight: 'bold' }}>FILTER:</span>
                    <button className="btn" style={{ background: '#000', color: '#fff', fontSize: '10px', padding: '4px 12px', borderRadius: '12px', border: 'none' }}>ALL (7)</button>
                    <button className="btn" style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '12px' }}>OVERLOAD (1)</button>
                    <button className="btn" style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '12px' }}>NEAR LIMIT (5)</button>
                    <button className="btn" style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '12px' }}>NORMAL (1)</button>
                  </div>
                </div>
              </div>
              
              <div className="table-wrap">
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000' }}>
                      <th style={{ padding: '12px 8px', fontSize: '10px', color: '#64748b' }}>FACULTY<br/>MEMBER</th>
                      <th style={{ padding: '12px 8px', fontSize: '10px', color: '#64748b' }}>DEPARTMENT</th>
                      <th style={{ padding: '12px 8px', fontSize: '10px', color: '#64748b' }}>CONTRACT</th>
                      <th style={{ padding: '12px 8px', fontSize: '10px', color: '#64748b' }}>ASSIGNED</th>
                      <th style={{ padding: '12px 8px', fontSize: '10px', color: '#64748b', width: '200px' }}>UTILIZATION %</th>
                      <th style={{ padding: '12px 8px', fontSize: '10px', color: '#64748b' }}>ACTIVE MODULES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFaculty.map(faculty => {
                      const status = getUtilizationStatus(faculty.assignedHours, faculty.maxHours);
                      const percent = Math.min(100, Math.round((faculty.assignedHours / faculty.maxHours) * 100));
                      const isOverload = status.key === 'overload';
                      const bg = isOverload ? '#fef2f2' : 'transparent';
                      
                      return (
                        <tr key={faculty.id} style={{ borderBottom: '1px solid var(--card-border)', background: bg }}>
                          <td style={{ padding: '16px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '24px', height: '24px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{faculty.name.split(' ').pop()?.[0]}</div>
                              <div>
                                <strong style={{ color: isOverload ? '#ef4444' : '#000' }}>{faculty.name}</strong>
                                {isOverload && <div style={{ color: '#ef4444', fontSize: '9px', fontWeight: 'bold' }}>[! OVERLOAD]</div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px 8px', color: '#64748b' }}>{faculty.department}</td>
                          <td style={{ padding: '16px 8px' }}>{faculty.maxHours.toFixed(1)} h /<br/><span style={{fontSize: '10px', color: '#64748b'}}>wk</span></td>
                          <td style={{ padding: '16px 8px' }}>
                            <span style={{ color: isOverload ? '#ef4444' : '#000', fontWeight: 'bold', fontSize: '14px' }}>
                              {faculty.assignedHours.toFixed(1)} h
                            </span>
                          </td>
                          <td style={{ padding: '16px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: 'bold', color: isOverload ? '#ef4444' : '#000' }}>{((faculty.assignedHours / faculty.maxHours) * 100).toFixed(1)}%</span>
                              {isOverload && <span style={{ fontSize: '9px', background: '#ef4444', color: '#fff', padding: '2px 4px', borderRadius: '2px', fontWeight: 'bold' }}>OVERLOAD</span>}
                              {!isOverload && <span style={{ fontSize: '10px', color: '#64748b' }}>Max Capacity</span>}
                            </div>
                            <div className="progress" style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                              <div 
                                style={{ 
                                  width: `${percent}%`, 
                                  height: '100%', 
                                  background: isOverload ? '#ef4444' : status.key === 'near' ? '#f59e0b' : '#10b981' 
                                }} 
                              />
                            </div>
                          </td>
                          <td style={{ padding: '16px 8px', fontSize: '10px', color: '#64748b' }}>
                            <div>CS205 (4.5h)</div>
                            <div>AI301 (6.0h)</div>
                            <div>... (+1 more)</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0 0', fontSize: '10px', color: '#94a3b8' }}>
                <div>FORMULA: UTILIZATION % = (TOTAL_ASSIGNED_HOURS / CONTRACT_MAX_HOURS) * 100</div>
                <div>SYNC: 2S AGO | SHOWING 7 OF 28 PROFILES</div>
              </div>
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="panel" style={{ border: '2px solid #ef4444', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '14px' }}>⚲</span> WORKLOAD DEEP-DIVE
                    </div>
                    <h2 style={{ fontSize: '20px', margin: '4px 0 2px 0' }}>Dr. K. Chen</h2>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Artificial Intelligence<br/>Faculty</div>
                  </div>
                  <div style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', textAlign: 'center', borderRadius: '2px' }}>
                    OVERLOAD<br/>ALERT
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '4px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>WEEKLY TEACHING<br/>LOAD</div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>22.0h</span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}> / 20.0h</span>
                  </div>
                </div>

                <div style={{ background: '#fef2f2', border: '1px dashed #fca5a5', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#ef4444', display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span>⚠ 100% Limit (20h)</span>
                  <span>110% (+2h)</span>
                </div>

                <div className="muted" style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '12px' }}>ASSIGNED MODULES BREAKDOWN</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>AI301: Advanced Neural Nets</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>5.0h / wk</div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>LEC (2h) + LAB (2h) + TUT (1h)</div>
                  </div>
                  <div style={{ border: '2px solid #ef4444', borderRadius: '4px', padding: '12px', background: '#fff5f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444' }}>CV301: Computer Vision &amp; Robotics</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444' }}>8.0h / wk</div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#ef4444' }}>LEC (2h) + LAB (2h) + ...</div>
                    <div style={{ fontSize: '9px', background: '#ef4444', color: '#fff', padding: '2px 4px', display: 'inline-block', marginTop: '6px', borderRadius: '2px', fontWeight: 'bold' }}>TARGET REASSIGN</div>
                  </div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>ML201: Foundations of ML</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>5.0h / wk</div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>LEC (2h) + LAB (3h)</div>
                  </div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>DB102: Applied Python for Data</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>4.0h / wk</div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>LAB ONLY</div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderLeft: '4px solid #3b82f6', marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>♺ RECOMMENDED REBALANCE</div>
                  <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.4 }}>
                    Transfer <strong>CV301 Tutorial (3.0h)</strong> to Teaching Assistant or <strong>Dr. M. Vance</strong> (currently at 85% load with 3.0h available buffer).<br/><br/>
                    RESULTING LOAD: <strong>19.0h (95.0% CAPACITY)</strong>
                  </div>
                </div>

                <button className="btn" style={{ width: '100%', background: '#000', color: '#fff', fontWeight: 'bold', border: 'none', padding: '12px' }}>♺ EXECUTE REBALANCE</button>
                <button className="btn" style={{ width: '100%', marginTop: '8px', fontSize: '10px' }}>OVERRIDE WITH JUSTIFICATION</button>
              </div>
              
              <div className="panel" style={{ background: '#f1f5f9', border: 'none' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>ⓘ ACADEMIC UNION RULE 14G</div>
                <div style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.4 }}>
                  No instructor may exceed contracted contact hours without written dean approval and overtime remuneration authorization.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
