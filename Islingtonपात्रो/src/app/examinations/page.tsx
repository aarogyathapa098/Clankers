import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

const academicPeriod = {
  name: "Spring Examination Board",
  academic_year: "2026/27",
  semester: "Semester 1",
  intake: "Autumn",
  status: "active",
};

const examSchedule = [
  {
    id: "exam-1",
    module: { module_code: "CS205", module_name: "Database Systems", credit_value: 20 },
    lecturer: { first_name: "Dr.", last_name: "Smith", department: "Computer Science" },
    room: { room_code: "HALL-A", room_name: "Main Examination Hall", building: "Block C", floor: "Ground", capacity: 180, room_type: "Exam Hall" },
    timeslot: { day_of_week: "Monday", start_time: "09:00", end_time: "12:00", slot_label: "Morning" },
    section: { section_code: "BSC-CS-Y2-A", section_name: "Group A", year_level: 2, max_students: 96 },
    status: "confirmed",
  },
  {
    id: "exam-2",
    module: { module_code: "AI301", module_name: "Artificial Intelligence", credit_value: 20 },
    lecturer: { first_name: "Prof.", last_name: "Lee", department: "Artificial Intelligence" },
    room: { room_code: "R-401", room_name: "Room 401", building: "Block B", floor: "4", capacity: 72, room_type: "Classroom" },
    timeslot: { day_of_week: "Tuesday", start_time: "13:00", end_time: "16:00", slot_label: "Afternoon" },
    section: { section_code: "BSC-AI-Y3-B", section_name: "Group B", year_level: 3, max_students: 58 },
    status: "draft",
  },
  {
    id: "exam-3",
    module: { module_code: "WT201", module_name: "Web Technologies", credit_value: 15 },
    lecturer: { first_name: "Ms.", last_name: "Chen", department: "Software Engineering" },
    room: { room_code: "LAB-1", room_name: "Computing Lab 1", building: "Tech Wing", floor: "2", capacity: 42, room_type: "Lab" },
    timeslot: { day_of_week: "Thursday", start_time: "09:00", end_time: "11:00", slot_label: "Morning" },
    section: { section_code: "BSC-SE-Y2-C", section_name: "Group C", year_level: 2, max_students: 40 },
    status: "confirmed",
  },
  {
    id: "exam-4",
    module: { module_code: "DB204", module_name: "Data Modelling", credit_value: 20 },
    lecturer: { first_name: "Dr.", last_name: "Kumar", department: "Data Science" },
    room: { room_code: "HALL-B", room_name: "Secondary Hall", building: "Block C", floor: "1", capacity: 120, room_type: "Exam Hall" },
    timeslot: { day_of_week: "Friday", start_time: "13:00", end_time: "16:00", slot_label: "Afternoon" },
    section: { section_code: "BSC-DS-Y2-A", section_name: "Group A", year_level: 2, max_students: 118 },
    status: "review",
  },
];

const invigilators = [
  { name: "Dr. Smith", employee_number: "LEC-1021", room_code: "HALL-A", load: "2 exams" },
  { name: "Prof. Lee", employee_number: "LEC-1034", room_code: "R-401", load: "1 exam" },
  { name: "Ms. Chen", employee_number: "LEC-1048", room_code: "LAB-1", load: "2 exams" },
];

const rooms = examSchedule.map((exam) => exam.room);
const confirmed = examSchedule.filter((exam) => exam.status === "confirmed").length;
const totalStudents = examSchedule.reduce((total, exam) => total + exam.section.max_students, 0);

function statusColor(status: string) {
  if (status === "confirmed") {
    return { color: "#04714a", background: "#dcfce7" };
  }

  if (status === "review") {
    return { color: "#92400e", background: "#fef3c7" };
  }

  return { color: "#0e67cb", background: "#e8f2ff" };
}

export default function ExaminationsPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
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
                Examinations / Exam Schedule
              </p>
              <h1 style={{ margin: "0 0 8px", color: "var(--ink)", fontSize: 28, lineHeight: 1.15 }}>
                Examination Planning
              </h1>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.5 }}>
                Schedule exams against modules, academic periods, rooms, timeslots, sections, and lecturer invigilation.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 10 }}>
              <button style={secondaryButtonStyle} type="button">Export Schedule</button>
              <button style={primaryButtonStyle} type="button">Create Exam</button>
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
            <MetricCard label="Exam Venues" value={rooms.length} detail="Allocated rooms" tone="#64748b" />
            <MetricCard label="Students Covered" value={totalStudents} detail="Across active sections" tone="#f59e0b" />
          </section>

          <section className="panel" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 220px 220px", gap: 12, marginBottom: 16 }}>
            <input aria-label="Search examinations" placeholder="Search module, room, section, or lecturer" style={inputStyle} />
            <select aria-label="Academic period" style={inputStyle}>
              <option>{academicPeriod.name}</option>
            </select>
            <select aria-label="Exam status" style={inputStyle}>
              <option>All statuses</option>
              <option>Confirmed</option>
              <option>Draft</option>
              <option>Review</option>
            </select>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 16 }}>
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
                  <h2 style={{ margin: "0 0 6px", fontSize: 20 }}>Exam Schedule</h2>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
                    Built around the module, room, timeslot, academic period, lecturer, and section tables.
                  </p>
                </div>
                <span style={pillStyle}>Date ascending</span>
              </div>

              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: 920, borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr>
                      {["Module", "Section", "Timeslot", "Venue", "Lecturer", "Status"].map((heading) => (
                        <th key={heading} style={thStyle}>{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((exam) => {
                      const statusStyle = statusColor(exam.status);

                      return (
                        <tr key={exam.id}>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.module.module_code}</strong>
                            <span style={mutedBlockStyle}>{exam.module.module_name}</span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.section.section_code}</strong>
                            <span style={mutedBlockStyle}>
                              Year {exam.section.year_level} / {exam.section.max_students} students
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.timeslot.day_of_week}</strong>
                            <span style={mutedBlockStyle}>
                              {exam.timeslot.start_time} - {exam.timeslot.end_time} / {exam.timeslot.slot_label}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>{exam.room.room_code}</strong>
                            <span style={mutedBlockStyle}>
                              {exam.room.building}, Floor {exam.room.floor} / {exam.room.capacity} seats
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <strong style={strongStyle}>
                              {exam.lecturer.first_name} {exam.lecturer.last_name}
                            </strong>
                            <span style={mutedBlockStyle}>{exam.lecturer.department}</span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{ ...pillStyle, color: statusStyle.color, background: statusStyle.background }}>
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

            <aside className="panel" style={{ display: "grid", alignContent: "start", gap: 14 }}>
              <span style={{ ...pillStyle, color: "#0e67cb", background: "#e8f2ff" }}>Venue Allocation</span>
              <h2 style={{ margin: 0, color: "var(--ink)", fontSize: 28 }}>HALL-A</h2>
              <p style={{ margin: 0, color: "var(--muted)" }}>Main Examination Hall / Block C</p>

              <div
                style={{
                  display: "flex",
                  minHeight: 128,
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px dashed #b8c9de",
                  borderRadius: 14,
                  color: "#4b6787",
                  background: "#f7faff",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                Seat capacity profile
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                <SmallCard label="Capacity" value="180 seats" />
                <SmallCard label="Room Type" value="Exam Hall" />
                <SmallCard label="Floor" value="Ground" />
                <SmallCard label="Status" value="Confirmed" />
              </div>

              <div
                style={{
                  border: "1px solid #bfdbfe",
                  borderRadius: 14,
                  padding: "14px 16px",
                  color: "#1e40af",
                  background: "#eff6ff",
                }}
              >
                Venue capacity clears the assigned section size. No room overflow warning for CS205.
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <h3 style={{ margin: "4px 0 0", fontSize: 16 }}>Invigilators</h3>
                {invigilators.map((invigilator) => (
                  <div
                    key={invigilator.employee_number}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      border: "1px solid var(--card-border)",
                      borderRadius: 12,
                      padding: 12,
                      background: "#ffffff",
                    }}
                  >
                    <div>
                      <strong style={{ color: "var(--ink)", fontSize: 14 }}>{invigilator.name}</strong>
                      <span style={mutedBlockStyle}>{invigilator.employee_number}</span>
                    </div>
                    <span style={pillStyle}>{invigilator.load}</span>
                  </div>
                ))}
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
    <div style={{ border: "1px solid var(--card-border)", borderRadius: 12, padding: 12, background: "#ffffff" }}>
      <span style={{ display: "block", color: "var(--muted)", fontSize: 12 }}>{props.label}</span>
      <strong style={{ display: "block", marginTop: 4, color: "var(--ink)", fontSize: 14 }}>{props.value}</strong>
    </div>
  );
}

const primaryButtonStyle = {
  minHeight: 38,
  border: 0,
  borderRadius: 10,
  padding: "0 13px",
  color: "#ffffff",
  background: "linear-gradient(135deg, #1c7cf4, #1264c8)",
  boxShadow: "0 12px 22px rgba(29, 116, 245, 0.18)",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  minHeight: 38,
  border: "1px solid var(--card-border)",
  borderRadius: 10,
  padding: "0 13px",
  color: "#294663",
  background: "#ffffff",
  cursor: "pointer",
};

const inputStyle = {
  minWidth: 0,
  minHeight: 42,
  border: "1px solid var(--card-border)",
  borderRadius: 10,
  padding: "0 12px",
  color: "#10213d",
  background: "#ffffff",
  outline: "none",
  boxShadow: "0 8px 20px rgba(16, 40, 82, 0.05)",
};

const pillStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  minHeight: 26,
  borderRadius: 999,
  padding: "0 10px",
  color: "#294663",
  background: "#eef5ff",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "capitalize" as const,
  whiteSpace: "nowrap" as const,
};

const thStyle = {
  padding: "13px 16px",
  borderBottom: "1px solid var(--card-border)",
  color: "#516987",
  background: "#f7faff",
  fontSize: 12,
  textTransform: "uppercase" as const,
};

const tdStyle = {
  padding: "15px 16px",
  borderBottom: "1px solid #e5edf7",
  color: "#213956",
  fontSize: 14,
  verticalAlign: "middle" as const,
};

const strongStyle = {
  display: "block",
  color: "var(--ink)",
  fontSize: 15,
};

const mutedBlockStyle = {
  display: "block",
  marginTop: 3,
  color: "var(--muted)",
  fontSize: 12,
};
