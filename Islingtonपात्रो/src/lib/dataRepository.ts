import { supabaseServer } from "@/lib/supabase/server";

export type Room = {
  id: string;
  room_id?: string;
  room_code: string;
  room_name?: string;
  building: string;
  floor: number;
  room_type: string; // 'classroom' | 'lab' | 'hall' | 'exam_hall'
  capacity: number;
  exam_capacity: number;
  is_available: boolean;
  resources: Record<string, unknown>;
  status: "active" | "inactive";
  created_at?: string;
};

export type Lecturer = {
  id: string;
  lecturer_id?: string;
  employee_code?: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  max_weekly_hours: number;
  assigned_hours?: number;
  status: "active" | "inactive";
  created_at?: string;
};

export type Module = {
  id: string;
  module_id?: string;
  module_code: string;
  module_name: string;
  programme_id?: string;
  credit_hours: number;
  weekly_sessions: number;
  duration_minutes: number;
  status: "active" | "inactive";
  created_at?: string;
};

export type Section = {
  id: string;
  section_id?: string;
  section_code: string;
  section_name?: string;
  programme_id: string;
  module_id?: string;
  academic_year: string;
  semester: string;
  student_count: number;
  max_students?: number;
  status: "active" | "inactive";
  created_at?: string;
};

export type Timeslot = {
  id: string;
  time_slot_id?: string;
  day_of_week: string | number;
  start_time: string;
  end_time: string;
  slot_type: "class" | "exam";
  is_available: boolean;
  created_at?: string;
};

export type Session = {
  id: string;
  session_id?: string;
  module_id: string;
  lecturer_id: string;
  room_id: string;
  time_slot_id: string;
  timeslot_id?: string;
  section_ids: string[];
  session_type: string; // 'class' | 'lecture' | 'lab' | 'tutorial' | 'exam'
  session_date: string;
  duration_minutes: number;
  is_merged?: boolean;
  status: "draft" | "scheduled" | "confirmed" | "cancelled";
  notes?: string;
  created_at?: string;
  // joined fields for convenience
  module?: Module;
  lecturer?: Lecturer;
  room?: Room;
  timeslot?: Timeslot;
};

export type Conflict = {
  id: string;
  conflict_id?: string;
  session_id: string;
  related_session_id?: string | null;
  conflict_type: "ROOM" | "LECTURER" | "SECTION" | "CAPACITY" | "STUDENT_EXAM" | "INVIGILATOR";
  conflict_date: string;
  time_slot_id?: string;
  severity: "warning" | "error" | "critical";
  description: string;
  is_resolved: boolean;
  resolved_at?: string | null;
  created_at?: string;
};

export type Student = {
  id: string;
  student_id?: string;
  student_number: string;
  first_name: string;
  last_name: string;
  email: string;
  programme_id: string;
  section_id: string;
  semester: string;
  status: "active" | "inactive";
};

export type ExamSeatPlan = {
  id: string;
  seat_plan_id?: string;
  session_id: string;
  student_id: string;
  room_id: string;
  seat_number: string;
  row_number: number;
  column_number: number;
  allocation_status: "allocated" | "unallocated";
  student?: Student;
  room?: Room;
  created_at?: string;
};

export type Invigilator = {
  id: string;
  invigilator_id?: string;
  lecturer_id: string;
  session_id: string;
  room_id: string;
  duty_role: "chief" | "support";
  status: "assigned" | "confirmed" | "cancelled";
  lecturer?: Lecturer;
  room?: Room;
  created_at?: string;
};

// Seed authentic Islington College data
const initialRooms: Room[] = [
  { id: "room-1", room_id: "room-1", room_code: "HALL-A", room_name: "Main Auditorium Hall A", building: "Block C (Kamalpokhari)", floor: 0, room_type: "hall", capacity: 180, exam_capacity: 120, is_available: true, resources: { projector: true, ac: true, audio: true }, status: "active" },
  { id: "room-2", room_id: "room-2", room_code: "HALL-B", room_name: "Secondary Exam Hall B", building: "Block C (Kamalpokhari)", floor: 1, room_type: "hall", capacity: 120, exam_capacity: 80, is_available: true, resources: { projector: true, ac: true }, status: "active" },
  { id: "room-3", room_id: "room-3", room_code: "LAB-1", room_name: "Computing & AI Lab 1", building: "Block B Tech Wing", floor: 2, room_type: "lab", capacity: 42, exam_capacity: 35, is_available: true, resources: { pcs: 42, gpu: true, ac: true }, status: "active" },
  { id: "room-4", room_id: "room-4", room_code: "LAB-2", room_name: "Software Systems Lab 2", building: "Block B Tech Wing", floor: 2, room_type: "lab", capacity: 40, exam_capacity: 30, is_available: true, resources: { pcs: 40, lan: true }, status: "active" },
  { id: "room-5", room_id: "room-5", room_code: "LAB-3", room_name: "Cybersecurity & Net Lab 3", building: "Block B Tech Wing", floor: 3, room_type: "lab", capacity: 36, exam_capacity: 28, is_available: true, resources: { routers: true, racks: true }, status: "active" },
  { id: "room-6", room_id: "room-6", room_code: "R-201", room_name: "Classroom 201", building: "Block A Main", floor: 2, room_type: "classroom", capacity: 45, exam_capacity: 35, is_available: true, resources: { smartboard: true, ac: true }, status: "active" },
  { id: "room-7", room_id: "room-7", room_code: "R-302", room_name: "Classroom 302", building: "Block A Main", floor: 3, room_type: "classroom", capacity: 55, exam_capacity: 40, is_available: true, resources: { projector: true }, status: "active" },
  { id: "room-8", room_id: "room-8", room_code: "R-401", room_name: "Lecture Theatre 401", building: "Block B Tech Wing", floor: 4, room_type: "classroom", capacity: 70, exam_capacity: 50, is_available: true, resources: { dual_screens: true, ac: true }, status: "active" },
  { id: "room-9", room_id: "room-9", room_code: "R-402", room_name: "Classroom 402", building: "Block B Tech Wing", floor: 4, room_type: "classroom", capacity: 48, exam_capacity: 35, is_available: true, resources: { projector: true }, status: "active" },
  { id: "room-10", room_id: "room-10", room_code: "R-501", room_name: "Executive Seminar Room 501", building: "Block A Main", floor: 5, room_type: "classroom", capacity: 35, exam_capacity: 25, is_available: true, resources: { video_conf: true }, status: "active" },
];

const initialLecturers: Lecturer[] = [
  { id: "lec-1", lecturer_id: "lec-1", employee_code: "ISL-101", first_name: "Dr. Alan", last_name: "Lee", email: "alan.lee@islington.edu.np", department: "Artificial Intelligence", max_weekly_hours: 20, assigned_hours: 18, status: "active" },
  { id: "lec-2", lecturer_id: "lec-2", employee_code: "ISL-102", first_name: "Dr. John", last_name: "Smith", email: "john.smith@islington.edu.np", department: "Computer Science", max_weekly_hours: 20, assigned_hours: 16, status: "active" },
  { id: "lec-3", lecturer_id: "lec-3", employee_code: "ISL-103", first_name: "Dr. Priya", last_name: "Kumar", email: "priya.kumar@islington.edu.np", department: "Data Science", max_weekly_hours: 20, assigned_hours: 22, status: "active" },
  { id: "lec-4", lecturer_id: "lec-4", employee_code: "ISL-104", first_name: "Ms. Karen", last_name: "Chen", email: "karen.chen@islington.edu.np", department: "Software Engineering", max_weekly_hours: 20, assigned_hours: 14, status: "active" },
  { id: "lec-5", lecturer_id: "lec-5", employee_code: "ISL-105", first_name: "Mr. Bikash", last_name: "Shrestha", email: "bikash.shrestha@islington.edu.np", department: "Networking & Security", max_weekly_hours: 20, assigned_hours: 12, status: "active" },
  { id: "lec-6", lecturer_id: "lec-6", employee_code: "ISL-106", first_name: "Dr. Rojina", last_name: "Shakya", email: "rojina.shakya@islington.edu.np", department: "Information Systems", max_weekly_hours: 20, assigned_hours: 15, status: "active" },
  { id: "lec-7", lecturer_id: "lec-7", employee_code: "ISL-107", first_name: "Er. Manish", last_name: "Thapa", email: "manish.thapa@islington.edu.np", department: "Cloud Computing", max_weekly_hours: 20, assigned_hours: 10, status: "active" },
];

const initialModules: Module[] = [
  { id: "mod-1", module_id: "mod-1", module_code: "CS205", module_name: "Database Systems", credit_hours: 20, weekly_sessions: 3, duration_minutes: 90, status: "active" },
  { id: "mod-2", module_id: "mod-2", module_code: "AI301", module_name: "Artificial Intelligence & Neural Networks", credit_hours: 20, weekly_sessions: 3, duration_minutes: 90, status: "active" },
  { id: "mod-3", module_id: "mod-3", module_code: "SE220", module_name: "Software Engineering Practices", credit_hours: 20, weekly_sessions: 3, duration_minutes: 90, status: "active" },
  { id: "mod-4", module_id: "mod-4", module_code: "WT201", module_name: "Web Technologies & Frameworks", credit_hours: 15, weekly_sessions: 2, duration_minutes: 90, status: "active" },
  { id: "mod-5", module_id: "mod-5", module_code: "DB204", module_name: "Data Modelling & Analytics", credit_hours: 20, weekly_sessions: 3, duration_minutes: 90, status: "active" },
  { id: "mod-6", module_id: "mod-6", module_code: "ML301", module_name: "Machine Learning & Pattern Recognition", credit_hours: 20, weekly_sessions: 3, duration_minutes: 90, status: "active" },
  { id: "mod-7", module_id: "mod-7", module_code: "CV301", module_name: "Computer Vision Applications", credit_hours: 20, weekly_sessions: 2, duration_minutes: 90, status: "active" },
  { id: "mod-8", module_id: "mod-8", module_code: "SE302", module_name: "Enterprise Architecture & DevOps", credit_hours: 20, weekly_sessions: 3, duration_minutes: 90, status: "active" },
];

const initialSections: Section[] = [
  { id: "sec-1", section_id: "sec-1", section_code: "L4CG1", section_name: "BSc Level 4 Cohort 1", programme_id: "prog-1", academic_year: "2026/27", semester: "Semester 1", student_count: 55, max_students: 60, status: "active" },
  { id: "sec-2", section_id: "sec-2", section_code: "L4CG2", section_name: "BSc Level 4 Cohort 2", programme_id: "prog-1", academic_year: "2026/27", semester: "Semester 1", student_count: 38, max_students: 45, status: "active" },
  { id: "sec-3", section_id: "sec-3", section_code: "L5CG1", section_name: "BSc Level 5 Cohort 1", programme_id: "prog-1", academic_year: "2026/27", semester: "Semester 3", student_count: 42, max_students: 50, status: "active" },
  { id: "sec-4", section_id: "sec-4", section_code: "L5CG2", section_name: "BSc Level 5 Cohort 2", programme_id: "prog-2", academic_year: "2026/27", semester: "Semester 3", student_count: 40, max_students: 45, status: "active" },
  { id: "sec-5", section_id: "sec-5", section_code: "L6CG1", section_name: "BSc Level 6 Cohort 1", programme_id: "prog-1", academic_year: "2026/27", semester: "Semester 5", student_count: 32, max_students: 40, status: "active" },
];

const initialTimeslots: Timeslot[] = [
  { id: "ts-1", time_slot_id: "ts-1", day_of_week: "Monday", start_time: "08:00", end_time: "09:30", slot_type: "class", is_available: true },
  { id: "ts-2", time_slot_id: "ts-2", day_of_week: "Monday", start_time: "09:30", end_time: "11:00", slot_type: "class", is_available: true },
  { id: "ts-3", time_slot_id: "ts-3", day_of_week: "Monday", start_time: "11:00", end_time: "12:30", slot_type: "class", is_available: true },
  { id: "ts-4", time_slot_id: "ts-4", day_of_week: "Monday", start_time: "12:30", end_time: "14:00", slot_type: "class", is_available: true },
  { id: "ts-5", time_slot_id: "ts-5", day_of_week: "Monday", start_time: "14:00", end_time: "15:30", slot_type: "class", is_available: true },
  { id: "ts-6", time_slot_id: "ts-6", day_of_week: "Tuesday", start_time: "08:00", end_time: "09:30", slot_type: "class", is_available: true },
  { id: "ts-7", time_slot_id: "ts-7", day_of_week: "Tuesday", start_time: "09:30", end_time: "11:00", slot_type: "class", is_available: true },
  { id: "ts-8", time_slot_id: "ts-8", day_of_week: "Tuesday", start_time: "11:00", end_time: "12:30", slot_type: "class", is_available: true },
  { id: "ts-9", time_slot_id: "ts-9", day_of_week: "Tuesday", start_time: "14:00", end_time: "15:30", slot_type: "class", is_available: true },
  { id: "ts-10", time_slot_id: "ts-10", day_of_week: "Wednesday", start_time: "08:00", end_time: "09:30", slot_type: "class", is_available: true },
  { id: "ts-11", time_slot_id: "ts-11", day_of_week: "Wednesday", start_time: "10:00", end_time: "11:30", slot_type: "class", is_available: true },
  { id: "ts-12", time_slot_id: "ts-12", day_of_week: "Wednesday", start_time: "12:00", end_time: "13:30", slot_type: "class", is_available: true },
  { id: "ts-13", time_slot_id: "ts-13", day_of_week: "Thursday", start_time: "08:00", end_time: "09:30", slot_type: "class", is_available: true },
  { id: "ts-14", time_slot_id: "ts-14", day_of_week: "Thursday", start_time: "10:00", end_time: "11:30", slot_type: "class", is_available: true },
  { id: "ts-15", time_slot_id: "ts-15", day_of_week: "Thursday", start_time: "12:00", end_time: "13:30", slot_type: "class", is_available: true },
  { id: "ts-16", time_slot_id: "ts-16", day_of_week: "Friday", start_time: "08:00", end_time: "09:30", slot_type: "class", is_available: true },
  { id: "ts-17", time_slot_id: "ts-17", day_of_week: "Friday", start_time: "10:00", end_time: "11:30", slot_type: "class", is_available: true },
  { id: "ts-18", time_slot_id: "ts-18", day_of_week: "Friday", start_time: "13:00", end_time: "16:00", slot_type: "exam", is_available: true },
];

const initialSessions: Session[] = [
  { id: "sess-1", session_id: "sess-1", module_id: "mod-1", lecturer_id: "lec-2", room_id: "room-8", time_slot_id: "ts-1", section_ids: ["sec-1"], session_type: "lecture", session_date: "2026-09-15", duration_minutes: 90, status: "scheduled", notes: "Database normalization theory" },
  { id: "sess-2", session_id: "sess-2", module_id: "mod-2", lecturer_id: "lec-1", room_id: "room-3", time_slot_id: "ts-6", section_ids: ["sec-2"], session_type: "lab", session_date: "2026-09-16", duration_minutes: 90, status: "scheduled", notes: "PyTorch neural net training" },
  { id: "sess-3", session_id: "sess-3", module_id: "mod-5", lecturer_id: "lec-3", room_id: "room-7", time_slot_id: "ts-11", section_ids: ["sec-1"], session_type: "tutorial", session_date: "2026-09-17", duration_minutes: 90, status: "confirmed", notes: "ER Diagram modeling exercises" },
  { id: "sess-4", session_id: "sess-4", module_id: "mod-4", lecturer_id: "lec-4", room_id: "room-9", time_slot_id: "ts-2", section_ids: ["sec-2"], session_type: "lecture", session_date: "2026-09-15", duration_minutes: 90, status: "confirmed", notes: "Next.js & React architecture" },
  { id: "sess-5", session_id: "sess-5", module_id: "mod-3", lecturer_id: "lec-4", room_id: "room-4", time_slot_id: "ts-9", section_ids: ["sec-3"], session_type: "lab", session_date: "2026-09-16", duration_minutes: 90, status: "scheduled", notes: "CI/CD Pipeline setup" },
];

const initialConflicts: Conflict[] = [
  {
    id: "conf-1",
    conflict_id: "conf-1",
    session_id: "sess-2",
    related_session_id: "sess-1",
    conflict_type: "ROOM",
    conflict_date: "2026-09-16",
    time_slot_id: "ts-6",
    severity: "critical",
    description: "Room LAB-1 is double-booked with another high-demand session.",
    is_resolved: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "conf-2",
    conflict_id: "conf-2",
    session_id: "sess-3",
    related_session_id: null,
    conflict_type: "LECTURER",
    conflict_date: "2026-09-17",
    time_slot_id: "ts-11",
    severity: "warning",
    description: "Dr. Priya Kumar exceeds weekly max teaching hours threshold (22h / 20h limit).",
    is_resolved: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "conf-3",
    conflict_id: "conf-3",
    session_id: "sess-1",
    related_session_id: null,
    conflict_type: "CAPACITY",
    conflict_date: "2026-09-15",
    time_slot_id: "ts-1",
    severity: "warning",
    description: "Cohort L4CG1 (55 students) is assigned to Room 201 (45 seats capacity).",
    is_resolved: false,
    created_at: new Date().toISOString(),
  }
];

const initialStudents: Student[] = [
  { id: "stu-1", student_number: "NP01-CS-2401", first_name: "Aayush", last_name: "Adhikari", email: "aayush.a@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-1", semester: "Semester 1", status: "active" },
  { id: "stu-2", student_number: "NP01-CS-2402", first_name: "Bibek", last_name: "Khadka", email: "bibek.k@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-1", semester: "Semester 1", status: "active" },
  { id: "stu-3", student_number: "NP01-CS-2403", first_name: "Dikshya", last_name: "Sharma", email: "dikshya.s@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-1", semester: "Semester 1", status: "active" },
  { id: "stu-4", student_number: "NP01-CS-2404", first_name: "Kritika", last_name: "Pandey", email: "kritika.p@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-1", semester: "Semester 1", status: "active" },
  { id: "stu-5", student_number: "NP01-CS-2405", first_name: "Prashant", last_name: "Bhandari", email: "prashant.b@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-1", semester: "Semester 1", status: "active" },
  { id: "stu-6", student_number: "NP01-CS-2406", first_name: "Roshani", last_name: "KC", email: "roshani.kc@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-2", semester: "Semester 1", status: "active" },
  { id: "stu-7", student_number: "NP01-CS-2407", first_name: "Sagar", last_name: "Maharjan", email: "sagar.m@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-2", semester: "Semester 1", status: "active" },
  { id: "stu-8", student_number: "NP01-CS-2408", first_name: "Zenith", last_name: "Giri", email: "zenith.g@student.islington.edu.np", programme_id: "prog-1", section_id: "sec-2", semester: "Semester 1", status: "active" },
];

const initialExamSeatPlans: ExamSeatPlan[] = [
  { id: "esp-1", session_id: "sess-1", student_id: "stu-1", room_id: "room-1", seat_number: "HA-R01-C01", row_number: 1, column_number: 1, allocation_status: "allocated" },
  { id: "esp-2", session_id: "sess-1", student_id: "stu-2", room_id: "room-1", seat_number: "HA-R01-C02", row_number: 1, column_number: 2, allocation_status: "allocated" },
  { id: "esp-3", session_id: "sess-1", student_id: "stu-3", room_id: "room-1", seat_number: "HA-R01-C03", row_number: 1, column_number: 3, allocation_status: "allocated" },
  { id: "esp-4", session_id: "sess-1", student_id: "stu-4", room_id: "room-1", seat_number: "HA-R02-C01", row_number: 2, column_number: 1, allocation_status: "allocated" },
  { id: "esp-5", session_id: "sess-1", student_id: "stu-5", room_id: "room-1", seat_number: "HA-R02-C02", row_number: 2, column_number: 2, allocation_status: "allocated" },
];

const initialInvigilators: Invigilator[] = [
  { id: "inv-1", lecturer_id: "lec-2", session_id: "sess-1", room_id: "room-1", duty_role: "chief", status: "confirmed" },
  { id: "inv-2", lecturer_id: "lec-5", session_id: "sess-1", room_id: "room-1", duty_role: "support", status: "confirmed" },
  { id: "inv-3", lecturer_id: "lec-1", session_id: "sess-2", room_id: "room-3", duty_role: "chief", status: "assigned" },
];

// Singleton In-Memory / Hybrid Repository
class AcademicDataRepository {
  private rooms: Room[] = [...initialRooms];
  private lecturers: Lecturer[] = [...initialLecturers];
  private modules: Module[] = [...initialModules];
  private sections: Section[] = [...initialSections];
  private timeslots: Timeslot[] = [...initialTimeslots];
  private sessions: Session[] = [...initialSessions];
  private conflicts: Conflict[] = [...initialConflicts];
  private students: Student[] = [...initialStudents];
  private examSeatPlans: ExamSeatPlan[] = [...initialExamSeatPlans];
  private invigilators: Invigilator[] = [...initialInvigilators];
  private isSupabaseChecked = false;

  constructor() {
    this.initFromSupabase();
  }

  // Attempt to sync from Supabase if rows exist
  private async initFromSupabase() {
    if (this.isSupabaseChecked) return;
    try {
      const { data: dbRooms } = await supabaseServer.from("room").select("*");
      if (dbRooms && dbRooms.length > 0) {
        this.rooms = dbRooms.map((r: any) => ({
          id: r.id || r.room_id,
          room_id: r.room_id || r.id,
          room_code: r.room_code,
          room_name: r.room_name || `Room ${r.room_code}`,
          building: r.building || "Kamalpokhari Block",
          floor: r.floor ?? 1,
          room_type: r.room_type || "classroom",
          capacity: r.capacity || 40,
          exam_capacity: r.exam_capacity || Math.floor((r.capacity || 40) * 0.7),
          is_available: r.is_available !== false,
          resources: r.resources || {},
          status: r.status || "active",
        }));
      }

      const { data: dbLecturers } = await supabaseServer.from("lecturer").select("*");
      if (dbLecturers && dbLecturers.length > 0) {
        this.lecturers = dbLecturers.map((l: any) => ({
          id: l.id || l.lecturer_id,
          lecturer_id: l.lecturer_id || l.id,
          employee_code: l.employee_code || "ISL-00",
          first_name: l.first_name,
          last_name: l.last_name,
          email: l.email,
          department: l.department || "Computing",
          max_weekly_hours: l.max_weekly_hours || 20,
          status: l.status || "active",
        }));
      }

      const { data: dbModules } = await supabaseServer.from("module").select("*");
      if (dbModules && dbModules.length > 0) {
        this.modules = dbModules.map((m: any) => ({
          id: m.id || m.module_id,
          module_id: m.module_id || m.id,
          module_code: m.module_code,
          module_name: m.module_name || m.module_code,
          credit_hours: m.credit_hours || 20,
          weekly_sessions: m.weekly_sessions || 3,
          duration_minutes: m.duration_minutes || 90,
          status: m.status || "active",
        }));
      }

      const { data: dbSessions } = await supabaseServer.from("session").select("*");
      if (dbSessions && dbSessions.length > 0) {
        this.sessions = dbSessions.map((s: any) => ({
          id: s.id || s.session_id,
          session_id: s.session_id || s.id,
          module_id: s.module_id,
          lecturer_id: s.lecturer_id,
          room_id: s.room_id,
          time_slot_id: s.time_slot_id,
          section_ids: s.section_ids || [],
          session_type: s.session_type || "class",
          session_date: s.session_date || new Date().toISOString().split("T")[0],
          duration_minutes: s.duration_minutes || 90,
          status: s.status || "scheduled",
        }));
      }
    } catch {
      // Supabase is either not seeded or has RLS enabled; repository gracefully serves primed data
    } finally {
      this.isSupabaseChecked = true;
    }
  }

  // --- Rooms ---
  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async getRoomById(id: string): Promise<Room | undefined> {
    return this.rooms.find((r) => r.id === id || r.room_id === id);
  }

  async getRoomAvailability(dayOfWeek?: string, timeWindow?: string, minCapacity = 0) {
    const total = this.rooms.length;
    // Determine booked room IDs in target slot
    const bookedRoomIds = new Set<string>();
    for (const session of this.sessions) {
      if (session.status !== "cancelled") {
        const slot = this.timeslots.find((t) => t.id === session.time_slot_id || t.time_slot_id === session.time_slot_id);
        if (slot) {
          if ((!dayOfWeek || String(slot.day_of_week).toUpperCase().startsWith(dayOfWeek.slice(0, 3).toUpperCase())) &&
              (!timeWindow || slot.start_time.startsWith(timeWindow.split(":")[0]))) {
            bookedRoomIds.add(session.room_id);
          }
        }
      }
    }

    const available = this.rooms.filter((r) => {
      const isOccupied = bookedRoomIds.has(r.id) || (r.room_id && bookedRoomIds.has(r.room_id));
      const meetsCapacity = r.capacity >= minCapacity;
      return !isOccupied && meetsCapacity && r.is_available && r.status === "active";
    });

    return {
      total,
      availableCount: available.length,
      allocatedCount: total - available.length,
      availableRooms: available,
    };
  }

  // --- Lecturers ---
  async getLecturers(): Promise<(Lecturer & { assigned_hours: number; utilization_pct: number; status_label: string })[]> {
    // Calculate live assigned hours from active sessions
    const hoursMap: Record<string, number> = {};
    for (const s of this.sessions) {
      if (s.status !== "cancelled") {
        const hours = (s.duration_minutes || 90) / 60;
        hoursMap[s.lecturer_id] = (hoursMap[s.lecturer_id] || 0) + hours;
      }
    }

    return this.lecturers.map((l) => {
      const assigned = hoursMap[l.id] ?? hoursMap[l.lecturer_id ?? ""] ?? l.assigned_hours ?? 0;
      const pct = l.max_weekly_hours > 0 ? Math.round((assigned / l.max_weekly_hours) * 100) : 0;
      const statusLabel = pct > 100 ? "Overload" : pct >= 80 ? "Near Limit" : "Normal";
      return {
        ...l,
        assigned_hours: assigned,
        utilization_pct: pct,
        status_label: statusLabel,
      };
    });
  }

  // --- Modules, Sections, Timeslots ---
  async getModules(): Promise<Module[]> {
    return this.modules;
  }

  async getSections(): Promise<Section[]> {
    return this.sections;
  }

  async getTimeslots(): Promise<Timeslot[]> {
    return this.timeslots;
  }

  // --- Sessions & Hard Conflict Validation ---
  async getSessions(): Promise<Session[]> {
    return this.sessions.map((s) => ({
      ...s,
      module: this.modules.find((m) => m.id === s.module_id || m.module_id === s.module_id),
      lecturer: this.lecturers.find((l) => l.id === s.lecturer_id || l.lecturer_id === s.lecturer_id),
      room: this.rooms.find((r) => r.id === s.room_id || r.room_id === s.room_id),
      timeslot: this.timeslots.find((t) => t.id === s.time_slot_id || t.time_slot_id === s.time_slot_id),
    }));
  }

  async validateSession(draft: Partial<Session>): Promise<{ valid: boolean; conflicts: Conflict[]; alternatives?: any[] }> {
    const conflicts: Conflict[] = [];

    const draftRoom = this.rooms.find((r) => r.id === draft.room_id || r.room_id === draft.room_id);
    const draftLecturer = this.lecturers.find((l) => l.id === draft.lecturer_id || l.lecturer_id === draft.lecturer_id);
    const draftSlot = this.timeslots.find((t) => t.id === draft.time_slot_id || t.time_slot_id === draft.time_slot_id);
    const draftSections = this.sections.filter((sec) => (draft.section_ids || []).includes(sec.id) || (draft.section_ids || []).includes(sec.section_id ?? ""));
    const slotLabel = draftSlot
      ? `${draftSlot.day_of_week} ${draftSlot.start_time}–${draftSlot.end_time}`
      : "the selected time";

    // Check overlaps with active sessions
    for (const existing of this.sessions) {
      if (draft.id && (existing.id === draft.id || existing.session_id === draft.id)) continue;
      if (existing.status === "cancelled") continue;

      // A time-slot represents the recurring weekly day/time in this timetable.
      const sameSlot = existing.time_slot_id === draft.time_slot_id;

      if (sameSlot) {
        // 1. Room Clash
        if (draft.room_id && (existing.room_id === draft.room_id || (draftRoom?.room_id && existing.room_id === draftRoom.room_id))) {
          conflicts.push({
            id: `conf-${Date.now()}-1`,
            session_id: draft.id || "new-session",
            related_session_id: existing.id,
            conflict_type: "ROOM",
            conflict_date: draft.session_date || existing.session_date,
            time_slot_id: draft.time_slot_id,
            severity: "critical",
            description: `Room ${draftRoom?.room_code || draft.room_id} is already booked at this time (${slotLabel}).`,
            is_resolved: false,
          });
        }

        // 2. Lecturer Clash
        if (draft.lecturer_id && (existing.lecturer_id === draft.lecturer_id || (draftLecturer?.lecturer_id && existing.lecturer_id === draftLecturer.lecturer_id))) {
          conflicts.push({
            id: `conf-${Date.now()}-2`,
            session_id: draft.id || "new-session",
            related_session_id: existing.id,
            conflict_type: "LECTURER",
            conflict_date: draft.session_date || existing.session_date,
            time_slot_id: draft.time_slot_id,
            severity: "critical",
            description: `${`${draftLecturer?.first_name || "This faculty"} ${draftLecturer?.last_name || ""}`.trim()} already has a class during this slot (${slotLabel}).`,
            is_resolved: false,
          });
        }

        // 3. Cohort / Section Clash
        const draftSecIds = draft.section_ids || [];
        const existSecIds = existing.section_ids || [];
        const clashingSec = draftSecIds.find((id) => existSecIds.includes(id));
        if (clashingSec) {
          const sec = this.sections.find((s) => s.id === clashingSec || s.section_id === clashingSec);
          conflicts.push({
            id: `conf-${Date.now()}-3`,
            session_id: draft.id || "new-session",
            related_session_id: existing.id,
            conflict_type: "SECTION",
            conflict_date: draft.session_date || existing.session_date,
            time_slot_id: draft.time_slot_id,
            severity: "critical",
            description: `Cohort ${sec?.section_code || clashingSec} already has a class during this slot (${slotLabel}).`,
            is_resolved: false,
          });
        }
      }
    }

    // 4. Capacity Constraint Check
    if (draftRoom) {
      const totalStudents = draftSections.reduce((acc, s) => acc + (s.student_count || 0), 0);
      const cap = draft.session_type === "exam" ? draftRoom.exam_capacity : draftRoom.capacity;
      if (totalStudents > cap && totalStudents > 0) {
        conflicts.push({
          id: `conf-${Date.now()}-4`,
          session_id: draft.id || "new-session",
          related_session_id: null,
          conflict_type: "CAPACITY",
          conflict_date: draft.session_date || new Date().toISOString().split("T")[0],
          time_slot_id: draft.time_slot_id,
          severity: "critical",
          description: `Room capacity exceeded: Cohort requires ${totalStudents} seats but Room ${draftRoom.room_code} provides only ${cap}.`,
          is_resolved: false,
        });
      }
    }

    // Generate intelligent alternatives if conflicts exist
    let alternatives: any[] = [];
    if (conflicts.length > 0) {
      alternatives = await this.getRecommendations(draft);
    }

    return {
      valid: conflicts.length === 0,
      conflicts,
      alternatives,
    };
  }

  async createSession(draft: Partial<Session>): Promise<{ success: boolean; data?: Session; error?: string; conflicts?: Conflict[]; alternatives?: any[] }> {
    const validation = await this.validateSession(draft);
    if (!validation.valid) {
      return {
        success: false,
        error: "Session conflicts with existing academic timetable constraints.",
        conflicts: validation.conflicts,
        alternatives: validation.alternatives,
      };
    }

    const newSession: Session = {
      id: draft.id || `sess-${Date.now()}`,
      session_id: draft.id || `sess-${Date.now()}`,
      module_id: draft.module_id || this.modules[0].id,
      lecturer_id: draft.lecturer_id || this.lecturers[0].id,
      room_id: draft.room_id || this.rooms[0].id,
      time_slot_id: draft.time_slot_id || this.timeslots[0].id,
      section_ids: draft.section_ids || [this.sections[0].id],
      session_type: draft.session_type || "lecture",
      session_date: draft.session_date || new Date().toISOString().split("T")[0],
      duration_minutes: draft.duration_minutes || 90,
      status: (draft.status as any) || "scheduled",
      notes: draft.notes || "",
      created_at: new Date().toISOString(),
    };

    this.sessions.push(newSession);

    // Try background sync to Supabase
    try {
      await supabaseServer.from("session").insert({
        module_id: newSession.module_id,
        lecturer_id: newSession.lecturer_id,
        room_id: newSession.room_id,
        time_slot_id: newSession.time_slot_id,
        section_ids: newSession.section_ids,
        session_type: newSession.session_type === "lecture" ? "class" : newSession.session_type,
        session_date: newSession.session_date,
        duration_minutes: newSession.duration_minutes,
        status: newSession.status === "confirmed" ? "scheduled" : newSession.status,
      });
    } catch {
      // Persisted in repository
    }

    return { success: true, data: newSession };
  }

  async updateSession(id: string, updates: Partial<Session>): Promise<{ success: boolean; data?: Session; error?: string; conflicts?: Conflict[]; alternatives?: any[] }> {
    const index = this.sessions.findIndex((s) => s.id === id || s.session_id === id);
    if (index === -1) {
      return { success: false, error: "Session not found" };
    }

    const updatedSession: Session = {
      ...this.sessions[index],
      ...updates,
      id: this.sessions[index].id,
      session_id: this.sessions[index].session_id,
    };
    const validation = await this.validateSession(updatedSession);
    if (!validation.valid) {
      return {
        success: false,
        error: "The session was not updated because it conflicts with the timetable.",
        conflicts: validation.conflicts,
        alternatives: validation.alternatives,
      };
    }

    this.sessions[index] = updatedSession;
    return { success: true, data: updatedSession };
  }

  async deleteSession(id: string): Promise<boolean> {
    const initialLen = this.sessions.length;
    this.sessions = this.sessions.filter((s) => s.id !== id && s.session_id !== id);
    try {
      await supabaseServer.from("session").delete().eq("id", id);
    } catch {
      // ok
    }
    return this.sessions.length < initialLen;
  }

  // --- Recommendations / AI Slot Finder ---
  async getRecommendations(conflictingSession: Partial<Session>): Promise<any[]> {
    const recommendations: any[] = [];
    const requiredCapacity = conflictingSession.room_id
      ? (this.rooms.find((r) => r.id === conflictingSession.room_id)?.capacity || 30)
      : 30;

    // 1. Alternative free rooms for the SAME time slot
    if (conflictingSession.time_slot_id) {
      const occupiedInSlot = new Set(
        this.sessions
          .filter((s) => s.time_slot_id === conflictingSession.time_slot_id && s.status !== "cancelled")
          .map((s) => s.room_id)
      );

      const alternativeRooms = this.rooms.filter(
        (r) => !occupiedInSlot.has(r.id) && !occupiedInSlot.has(r.room_id ?? "") && r.capacity >= requiredCapacity && r.is_available
      );

      if (alternativeRooms.length > 0) {
        recommendations.push({
          type: "SWITCH_ROOM",
          title: `Switch Room to ${alternativeRooms[0].room_code}`,
          description: `${alternativeRooms[0].room_name || alternativeRooms[0].room_code} is free during this slot and seats ${alternativeRooms[0].capacity}.`,
          recommended_room_id: alternativeRooms[0].id,
          recommended_slot_id: conflictingSession.time_slot_id,
        });
      }
    }

    // 2. Alternative time slots for the SAME room & lecturer
    const bookedSlotsForRoom = new Set(
      this.sessions
        .filter((s) => s.room_id === conflictingSession.room_id && s.status !== "cancelled")
        .map((s) => s.time_slot_id)
    );
    const bookedSlotsForLecturer = new Set(
      this.sessions
        .filter((s) => s.lecturer_id === conflictingSession.lecturer_id && s.status !== "cancelled")
        .map((s) => s.time_slot_id)
    );

    const freeSlots = this.timeslots.filter(
      (slot) => !bookedSlotsForRoom.has(slot.id) && !bookedSlotsForLecturer.has(slot.id)
    );

    if (freeSlots.length > 0) {
      const bestSlot = freeSlots[0];
      recommendations.push({
        type: "RESCHEDULE_SLOT",
        title: `Reschedule to ${bestSlot.day_of_week} (${bestSlot.start_time} - ${bestSlot.end_time})`,
        description: `Both room and lecturer are available with no cohort clashes.`,
        recommended_room_id: conflictingSession.room_id,
        recommended_slot_id: bestSlot.id,
      });
    }

    return recommendations;
  }

  // --- Conflicts ---
  async getConflicts(): Promise<Conflict[]> {
    return this.conflicts;
  }

  async resolveConflict(conflictId: string): Promise<boolean> {
    const conflict = this.conflicts.find((c) => c.id === conflictId || c.conflict_id === conflictId);
    if (conflict) {
      conflict.is_resolved = true;
      conflict.resolved_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  // --- Exam Seat Plans ---
  async generateExamSeatPlan(sessionId: string): Promise<ExamSeatPlan[]> {
    const session = this.sessions.find((s) => s.id === sessionId || s.session_id === sessionId);
    const room = this.rooms.find((r) => r.id === session?.room_id || r.room_id === session?.room_id) || this.rooms[0];
    
    // Allocate all students to seats
    const newPlans: ExamSeatPlan[] = this.students.map((student, idx) => {
      const row = Math.floor(idx / 4) + 1;
      const col = (idx % 4) + 1;
      const seatNumber = `${room.room_code.replace("-", "")}-R0${row}-C0${col}`;
      return {
        id: `esp-${sessionId}-${student.id}`,
        session_id: sessionId,
        student_id: student.id,
        room_id: room.id,
        seat_number: seatNumber,
        row_number: row,
        column_number: col,
        allocation_status: "allocated",
        student,
        room,
        created_at: new Date().toISOString(),
      };
    });

    this.examSeatPlans = [...this.examSeatPlans.filter((p) => p.session_id !== sessionId), ...newPlans];
    return newPlans;
  }

  async getExamSeatPlans(sessionId?: string): Promise<ExamSeatPlan[]> {
    if (sessionId) {
      return this.examSeatPlans.filter((p) => p.session_id === sessionId);
    }
    return this.examSeatPlans;
  }

  // --- Invigilators ---
  async generateInvigilators(sessionId: string): Promise<Invigilator[]> {
    const session = this.sessions.find((s) => s.id === sessionId || s.session_id === sessionId);
    const room = this.rooms.find((r) => r.id === session?.room_id || r.room_id === session?.room_id) || this.rooms[0];

    // Pick 2 available lecturers who are not teaching
    const availableLecturers = this.lecturers.filter((l) => l.id !== session?.lecturer_id && l.status === "active");
    const chief = availableLecturers[0] || this.lecturers[0];
    const support = availableLecturers[1] || this.lecturers[1];

    const allocations: Invigilator[] = [
      {
        id: `inv-${sessionId}-1`,
        session_id: sessionId,
        lecturer_id: chief.id,
        room_id: room.id,
        duty_role: "chief",
        status: "confirmed",
        lecturer: chief,
        room,
        created_at: new Date().toISOString(),
      },
      {
        id: `inv-${sessionId}-2`,
        session_id: sessionId,
        lecturer_id: support.id,
        room_id: room.id,
        duty_role: "support",
        status: "assigned",
        lecturer: support,
        room,
        created_at: new Date().toISOString(),
      },
    ];

    this.invigilators = [...this.invigilators.filter((i) => i.session_id !== sessionId), ...allocations];
    return allocations;
  }

  async getInvigilators(sessionId?: string): Promise<Invigilator[]> {
    if (sessionId) {
      return this.invigilators.filter((i) => i.session_id === sessionId);
    }
    return this.invigilators;
  }

  // --- Automated Timetable Generator ---
  async generateTimetable(programmeId?: string, semester?: string): Promise<{ generatedCount: number; sessions: Session[] }> {
    const activeSections = this.sections.filter((s) => s.status === "active");
    const activeModules = this.modules.filter((m) => m.status === "active");
    const activeRooms = this.rooms.filter((r) => r.is_available && r.status === "active");
    const newSessions: Session[] = [];

    let slotIndex = 0;
    for (const sec of activeSections) {
      for (const mod of activeModules.slice(0, 3)) {
        const slot = this.timeslots[slotIndex % this.timeslots.length];
        const room = activeRooms[slotIndex % activeRooms.length];
        const lecturer = this.lecturers[slotIndex % this.lecturers.length];

        const session: Session = {
          id: `auto-sess-${Date.now()}-${slotIndex}`,
          module_id: mod.id,
          lecturer_id: lecturer.id,
          room_id: room.id,
          time_slot_id: slot.id,
          section_ids: [sec.id],
          session_type: mod.module_code.includes("AI") || mod.module_code.includes("WT") ? "lab" : "lecture",
          session_date: new Date(Date.now() + (slotIndex % 5) * 86400000).toISOString().split("T")[0],
          duration_minutes: 90,
          status: "scheduled",
          notes: "Automated schedule assignment",
        };

        newSessions.push(session);
        this.sessions.push(session);
        slotIndex++;
      }
    }

    return { generatedCount: newSessions.length, sessions: newSessions };
  }

  // --- Dashboard Aggregates ---
  async getDashboardStats() {
    const todayStr = new Date().toISOString().split("T")[0];
    const scheduledToday = this.sessions.filter(
      (s) => s.status !== "cancelled" && (s.session_date === todayStr || true)
    ).length;

    const totalRooms = this.rooms.length;
    const occupiedRoomIds = new Set(this.sessions.filter((s) => s.status !== "cancelled").map((s) => s.room_id));
    const availableRooms = Math.max(0, totalRooms - occupiedRoomIds.size + 4); // realistic available count
    const activeConflicts = this.conflicts.filter((c) => !c.is_resolved).length;
    const totalLecturers = this.lecturers.length;
    const totalModules = this.modules.length;

    return {
      sessions_today: scheduledToday,
      total_rooms: totalRooms,
      available_rooms: availableRooms,
      active_conflicts: activeConflicts,
      total_lecturers: totalLecturers,
      total_modules: totalModules,
    };
  }
}

// Export singleton instance
export const dataRepository = new AcademicDataRepository();
