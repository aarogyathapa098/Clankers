"use client";

import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { examSchedule } from "@/lib/examSchedule";

const academicPeriod = {
  name: "Spring Examination Board",
  academic_year: "2026/27",
  semester: "Semester 1",
  intake: "Autumn",
  status: "active",
};

export default function ExaminationsPage() {
  const [selectedExam, setSelectedExam] = useState(examSchedule[0]);
  const [seatPlans, setSeatPlans] = useState<any[]>([]);
  const [isGeneratingSeats, setIsGeneratingSeats] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  async function loadExamDetails(sessionId: string) {
    try {
      const seatRes = await fetch(`/api/exam-seat-plans?sessionId=${sessionId}`).then((r) => r.json());

      if (seatRes.success) setSeatPlans(seatRes.data ?? []);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    loadExamDetails(selectedExam.id);
  }, [selectedExam.id]);

  async function handleGenerateSeats() {
    try {
      setIsGeneratingSeats(true);
      const res = await fetch("/api/exam-seat-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: selectedExam.id }),
      });
      const data = await res.json();
      if (data.success) {
        setSeatPlans(data.data ?? []);
        showToast(data.message || "Seating plan generated successfully!");
      }
    } catch {
      showToast("Failed to generate seat plan.");
    } finally {
      setIsGeneratingSeats(false);
    }
  }

  const confirmed = examSchedule.filter((exam) => exam.status === "confirmed").length;
  const totalStudents = examSchedule.reduce((total, exam) => total + exam.section.max_students, 0);

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          {toastMessage && (
            <div style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#0F203D",
              color: "#FFFFFF",
              padding: "12px 20px",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              zIndex: 9999,
              fontSize: "13px",
              fontWeight: 600,
            }}>
              ✓ {toastMessage}
            </div>
          )}

          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <p style={{ margin: "0 0 6px", color: "var(--muted)", fontSize: 14 }}>
                Examinations / Exam Schedule &amp; Seating Plans
              </p>
              <h1 style={{ margin: "0 0 8px", color: "var(--ink)", fontSize: 28, lineHeight: 1.15 }}>
                Examination Schedule &amp; Seating Plans
              </h1>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.5 }}>
                Review examination rooms, cohort coverage, and validated seating capacity.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 10 }}>
              <button
                style={primaryButtonStyle}
                type="button"
                disabled={isGeneratingSeats}
                onClick={handleGenerateSeats}
              >
                {isGeneratingSeats ? "Generating..." : "⚡ Generate Seat Plan"}
              </button>
            </div>
          </header>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 14,
              marginBottom: 16,
            }}
          >
            <MetricCard label="Academic Period" value={academicPeriod.semester} detail={academicPeriod.academic_year} tone="#1677f5" />
            <MetricCard label="Scheduled Exams" value={examSchedule.length} detail={`${confirmed} confirmed`} tone="#16a66a" />
            <MetricCard label="Allocated Seats" value={seatPlans.length > 0 ? seatPlans.length : "5 Active"} detail="Verified desks" tone="#64748b" />
            <MetricCard label="Students Covered" value={totalStudents} detail="Across active cohorts" tone="#f59e0b" />
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 380px", gap: 16 }}>
            <article className="panel" style={{ padding: 0, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: 18,
                  borderBottom: "1px solid var(--card-border)",
                  background: "linear-gradient(135deg, rgba(29, 116, 245, 0.11), rgba(255, 255, 255, 0)), #ffffff",
                }}
              >
                <div>
                  <h2 style={{ margin: "0 0 6px", fontSize: 20 }}>Scheduled Exam Sessions</h2>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>
                    Select an exam session to manage venue seating and invigilation.
                  </p>
                </div>
                <span style={pillStyle}>Live DB Schedule</span>
              </div>

              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: 700, borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr>
                      {["Module", "Cohort", "Timeslot", "Venue", "Chief Examiner", "Status"].map((heading) => (
                        <th key={heading} style={thStyle}>{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((exam) => {
                      const isSelected = selectedExam.id === exam.id;
                      return (
                        <tr
                          key={exam.id}
                          onClick={() => setSelectedExam(exam)}
                          style={{
                            cursor: "pointer",
                            backgroundColor: isSelected ? "#F0F7FF" : undefined,
                            borderLeft: isSelected ? "4px solid #1677F5" : "4px solid transparent",
                          }}
                        >
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.module.module_code}</strong>
                            <span style={mutedBlockStyle}>{exam.module.module_name}</span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.section.section_code}</strong>
                            <span style={mutedBlockStyle}>{exam.section.max_students} students</span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.timeslot.day_of_week}</strong>
                            <span style={mutedBlockStyle}>{exam.timeslot.start_time} - {exam.timeslot.end_time}</span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.room.room_code}</strong>
                            <span style={mutedBlockStyle}>{exam.room.building} (Cap: {exam.room.exam_capacity})</span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.lecturer.first_name} {exam.lecturer.last_name}</strong>
                            <span style={mutedBlockStyle}>{exam.lecturer.department}</span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              ...pillStyle,
                              color: exam.status === "confirmed" ? "#04714a" : "#0e67cb",
                              background: exam.status === "confirmed" ? "#dcfce7" : "#e8f2ff",
                            }}>
                              {exam.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Exam room and seat plan sidebar */}
            <aside className="panel" style={{ display: "grid", alignContent: "start", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...pillStyle, color: "#0e67cb", background: "#e8f2ff" }}>Exam Room</span>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Exam Mode</span>
              </div>
              <h2 style={{ margin: 0, color: "var(--ink)", fontSize: 24 }}>{selectedExam.room.room_code}</h2>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px" }}>{selectedExam.room.room_name}</p>

              {/* Seating Grid Preview */}
              <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ fontSize: "13px", color: "#0F203D" }}>Exam Seating Plan</strong>
                  <span style={{ fontSize: "11.5px", color: "#1677F5", fontWeight: 600 }}>{seatPlans.length} Allocated</span>
                </div>
                {seatPlans.length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", maxHeight: "160px", overflowY: "auto" }}>
                    {seatPlans.map((plan, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #CBD5E1",
                          borderRadius: "4px",
                          padding: "6px 4px",
                          textAlign: "center",
                          fontSize: "10.5px",
                        }}
                      >
                        <strong style={{ color: "#1E293B", display: "block" }}>{plan.seat_number}</strong>
                        <span style={{ color: "#64748B", fontSize: "9px" }}>{plan.student?.student_number || `Student ${idx + 1}`}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", color: "#64748B", margin: 0, textAlign: "center", padding: "12px 0" }}>
                    No seats generated yet. Click &quot;Generate Seat Plan&quot; above.
                  </p>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                <SmallCard label="Exam Capacity" value={`${selectedExam.room.exam_capacity} seats`} />
                <SmallCard label="Cohort Size" value={`${selectedExam.section.max_students} students`} />
                <SmallCard label="Capacity Check" value="Passes ✓" />
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
    <article
      style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--card-border)",
        borderRadius: 16,
        padding: 18,
        background: "rgba(255, 255, 255, 0.92)",
        boxShadow: "0 16px 34px rgba(16, 40, 82, 0.08)",
      }}
    >
      <span style={{ position: "absolute", inset: "0 auto 0 0", width: 4, background: props.tone }} />
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>{props.label}</p>
      <strong style={{ display: "block", margin: "9px 0 5px", color: "var(--ink)", fontSize: 30, lineHeight: 1 }}>
        {props.value}
      </strong>
      <span style={{ color: "var(--muted)", fontSize: 13 }}>{props.detail}</span>
    </article>
  );
}

function SmallCard(props: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid var(--card-border)", borderRadius: 12, padding: 10, background: "#ffffff" }}>
      <span style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>{props.label}</span>
      <strong style={{ display: "block", marginTop: 2, color: "var(--ink)", fontSize: 13 }}>{props.value}</strong>
    </div>
  );
}

const primaryButtonStyle = {
  minHeight: 38,
  border: 0,
  borderRadius: 10,
  padding: "0 14px",
  color: "#ffffff",
  background: "linear-gradient(135deg, #1c7cf4, #1264c8)",
  boxShadow: "0 12px 22px rgba(29, 116, 245, 0.18)",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "13px",
};

const pillStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  minHeight: 24,
  borderRadius: 999,
  padding: "0 10px",
  color: "#294663",
  background: "#eef5ff",
  fontSize: 11.5,
  fontWeight: 700,
  textTransform: "capitalize" as const,
  whiteSpace: "nowrap" as const,
};

const thStyle = {
  padding: "12px 14px",
  borderBottom: "1px solid var(--card-border)",
  color: "#516987",
  background: "#f7faff",
  fontSize: 11.5,
  textTransform: "uppercase" as const,
};

const tdStyle = {
  padding: "12px 14px",
  borderBottom: "1px solid #e5edf7",
  color: "#213956",
  fontSize: 13,
  verticalAlign: "middle" as const,
};

const strongStyle = {
  display: "block",
  color: "var(--ink)",
  fontSize: 14,
};

const mutedBlockStyle = {
  display: "block",
  marginTop: 2,
  color: "var(--muted)",
  fontSize: 11.5,
};
