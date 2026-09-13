export type Examination = {
  id: string;
  section_id: string;
  module: { module_code: string; module_name: string; credit_value: number };
  lecturer: { first_name: string; last_name: string; department: string };
  room: {
    room_code: string;
    room_name: string;
    building: string;
    floor: string;
    capacity: number;
    exam_capacity: number;
    room_type: string;
  };
  timeslot: { day_of_week: string; start_time: string; end_time: string; slot_label: string };
  section: { section_code: string; section_name: string; year_level: number; max_students: number };
  status: "scheduled" | "confirmed" | "cancelled";
};

export const examSchedule: Examination[] = [
  {
    id: "sess-1",
    section_id: "sec-1",
    module: { module_code: "CS205", module_name: "Database Systems", credit_value: 20 },
    lecturer: { first_name: "Dr. John", last_name: "Smith", department: "Computer Science" },
    room: { room_code: "HALL-A", room_name: "Main Auditorium Hall A", building: "Block C", floor: "Ground", capacity: 180, exam_capacity: 120, room_type: "Exam Hall" },
    timeslot: { day_of_week: "Friday", start_time: "13:00", end_time: "16:00", slot_label: "Afternoon" },
    section: { section_code: "L4CG1", section_name: "BSc Level 4 Cohort 1", year_level: 1, max_students: 55 },
    status: "confirmed",
  },
  {
    id: "sess-2",
    section_id: "sec-2",
    module: { module_code: "AI301", module_name: "Artificial Intelligence", credit_value: 20 },
    lecturer: { first_name: "Dr. Alan", last_name: "Lee", department: "Artificial Intelligence" },
    room: { room_code: "LAB-1", room_name: "Computing & AI Lab 1", building: "Block B", floor: "2", capacity: 42, exam_capacity: 35, room_type: "Lab" },
    timeslot: { day_of_week: "Tuesday", start_time: "13:00", end_time: "16:00", slot_label: "Afternoon" },
    section: { section_code: "L4CG2", section_name: "BSc Level 4 Cohort 2", year_level: 1, max_students: 38 },
    status: "scheduled",
  },
  {
    id: "sess-3",
    section_id: "sec-3",
    module: { module_code: "WT201", module_name: "Web Technologies", credit_value: 15 },
    lecturer: { first_name: "Ms. Karen", last_name: "Chen", department: "Software Engineering" },
    room: { room_code: "HALL-B", room_name: "Secondary Exam Hall B", building: "Block C", floor: "1", capacity: 120, exam_capacity: 80, room_type: "Exam Hall" },
    timeslot: { day_of_week: "Thursday", start_time: "09:00", end_time: "12:00", slot_label: "Morning" },
    section: { section_code: "L5CG1", section_name: "BSc Level 5 Cohort 1", year_level: 2, max_students: 42 },
    status: "confirmed",
  },
  {
    id: "sess-4",
    section_id: "sec-4",
    module: { module_code: "DB204", module_name: "Data Modelling & Analytics", credit_value: 20 },
    lecturer: { first_name: "Dr. Priya", last_name: "Kumar", department: "Data Science" },
    room: { room_code: "R-401", room_name: "Lecture Theatre 401", building: "Block B", floor: "4", capacity: 70, exam_capacity: 50, room_type: "Exam Hall" },
    timeslot: { day_of_week: "Friday", start_time: "09:00", end_time: "12:00", slot_label: "Morning" },
    section: { section_code: "L5CG2", section_name: "BSc Level 5 Cohort 2", year_level: 2, max_students: 40 },
    status: "scheduled",
  },
];
