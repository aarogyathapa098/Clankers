}
"use client";
import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
type Session = {
  id: string;
  module_id: string;
  lecturer_id: string;
  room_id: string;
  time_slot_id: string;
  section_ids: string[];
  session_type: string;
  session_date: string;
  status: string;
  module?: { module_code: string; module_name: string };
  lecturer?: { first_name: string; last_name: string; department: string };
  room?: { room_code: string; room_name: string; building: string };
  timeslot?: { day_of_week: string; start_time: string; end_time: string };
};
type LookupTab = "faculty" | "cohort" | "room";
export default function LookupPage() {
  const [tab, setTab] = useState<LookupTab>("faculty");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  useEffect(() => {
    async function loadData() {
      try {
        const [sessRes, lecRes, roomRes, secRes] = await Promise.all([
          fetch("/api/sessions").then((r) => r.json()),
          fetch("/api/lecturers").then((r) => r.json()),
          fetch("/api/rooms").then((r) => r.json()),
          fetch("/api/sections").then((r) => r.json()),
        ]);