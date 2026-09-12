// Centralized type exports for frontend consumption
// These align with the Supabase database schema in supabase/migrations/001_initial_schema.sql

export type ProgrammeStatus = "active" | "inactive";

export interface Programme {
  programme_id: string;
  programme_code: string;
  programme_name: string;
  duration_years: number;
  status: ProgrammeStatus;
  created_at: string;
}

export type ModuleStatus = "active" | "inactive";

export interface Module {
  module_id: string;
  module_code: string;
  module_name: string;
  programme_id: string;
  credit_hours: number;
  weekly_sessions: number;
  duration_minutes: number;
  status: ModuleStatus;
  created_at: string;
}

export type LecturerStatus = "active" | "inactive";

export interface Lecturer {
  lecturer_id: string;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  max_weekly_hours: number;
  status: LecturerStatus;
  created_at: string;
}

export type SectionStatus = "active" | "inactive";

export interface Section {
  section_id: string;
  section_code: string;
  programme_id: string;
  module_id: string;
  academic_year: string;
  semester: string;
  student_count: number;
  status: SectionStatus;
  created_at: string;
}

export type StudentStatus = "active" | "inactive";

export interface Student {
  student_id: string;
  student_number: string;
  first_name: string;
  last_name: string;
  email: string;
  programme_id: string;
  section_id: string;
  semester: string;
  status: StudentStatus;
  created_at: string;
}

export type RoomType = "classroom" | "lab" | "hall";
export type RoomStatus = "active" | "inactive";

export interface Room {
  room_id: string;
  room_code: string;
  building: string;
  floor: number;
  room_type: RoomType;
  capacity: number;
  exam_capacity: number;
  is_available: boolean;
  resources: Record<string, unknown>;
  status: RoomStatus;
  created_at: string;
}

export type SlotType = "class" | "exam";

export interface TimeSlot {
  time_slot_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_type: SlotType;
  is_available: boolean;
  created_at: string;
}

export type SessionType = "class" | "exam";
export type SessionStatus = "draft" | "scheduled" | "cancelled";

export interface Session {
  session_id: string;
  module_id: string;
  lecturer_id: string;
  section_ids: string[];
  room_id: string;
  time_slot_id: string;
  session_type: SessionType;
  session_date: string;
  duration_minutes: number;
  is_merged: boolean;
  status: SessionStatus;
  created_at: string;
}

export type ConflictType =
  | "ROOM"
  | "LECTURER"
  | "SECTION"
  | "CAPACITY"
  | "STUDENT_EXAM"
  | "INVIGILATOR";

export type ConflictSeverity = "warning" | "error" | "critical";

export interface ConflictSchedule {
  conflict_id: string;
  session_id: string;
  related_session_id: string | null;
  conflict_type: ConflictType;
  conflict_date: string;
  time_slot_id: string | null;
  severity: ConflictSeverity;
  description: string;
  is_resolved: boolean;
  resolved_at: string | null;
  created_at: string;
}

export type DutyRole = "chief" | "support";
export type InvigilatorStatus = "assigned" | "confirmed" | "cancelled";

export interface Invigilator {
  invigilator_id: string;
  lecturer_id: string;
  session_id: string;
  room_id: string;
  duty_role: DutyRole;
  status: InvigilatorStatus;
  created_at: string;
}

export type AllocationStatus = "allocated" | "unallocated";

export interface ExamSeatPlan {
  seat_plan_id: string;
  session_id: string;
  student_id: string;
  room_id: string;
  seat_number: string;
  row_number: number;
  column_number: number;
  allocation_status: AllocationStatus;
  created_at: string;
}
