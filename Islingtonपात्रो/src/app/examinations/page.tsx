"use client";
import { useEffect, useState } from "react";
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
    id: "sess-1",
    module: { module_code: "CS205", module_name: "Database Systems", credit_value: 20 },
    lecturer: { first_name: "Dr. John", last_name: "Smith", department: "Computer Science" },
    room: { room_code: "HALL-A", room_name: "Main Auditorium Hall A", building: "Block C", floor: "Ground", capacity: 180, exam_capacity: 120, room_type: "Exam Hall" },
    timeslot: { day_of_week: "Friday", start_time: "13:00", end_time: "16:00", slot_label: "Afternoon" },
    section: { section_code: "L4CG1", section_name: "BSc Level 4 Cohort 1", year_level: 1, max_students: 55 },
    status: "confirmed",
  },
  {
    id: "sess-2",
    module: { module_code: "AI301", module_name: "Artificial Intelligence", credit_value: 20 },
    lecturer: { first_name: "Dr. Alan", last_name: "Lee", department: "Artificial Intelligence" },
    room: { room_code: "LAB-1", room_name: "Computing & AI Lab 1", building: "Block B", floor: "2", capacity: 42, exam_capacity: 35, room_type: "Lab" },
    timeslot: { day_of_week: "Tuesday", start_time: "13:00", end_time: "16:00", slot_label: "Afternoon" },
    section: { section_code: "L4CG2", section_name: "BSc Level 4 Cohort 2", year_level: 1, max_students: 38 },
    status: "scheduled",
  },
  {
    id: "sess-3",
    module: { module_code: "WT201", module_name: "Web Technologies", credit_value: 15 },

