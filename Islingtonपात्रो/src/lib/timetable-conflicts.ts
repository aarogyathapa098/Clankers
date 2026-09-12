export type ConflictCode =
  | "ROOM_CLASH"
  | "LECTURER_CLASH"
  | "SECTION_CLASH"
  | "CAPACITY_OVERFLOW";

export type Conflict = {
  code: ConflictCode;
  title: string;
  message: string;
  severity: "error" | "warning";
};

export type TimetableRoom = {
  id: string;
  room_code: string;
  room_name?: string | null;
  capacity: number;
  room_type?: string | null;
};

export type TimetableSection = {
  id: string;
  section_name: string;
  section_code: string;
  max_students?: number | null;
};

export type TimetableSessionInput = {
  id?: string;
  lecturer_id: string;
  room_id: string;
  timeslot_id: string;
  section_ids: string[];
  status?: string | null;
};

export function validateTimetableSession(args: {
  draft: TimetableSessionInput;
  sessions: TimetableSessionInput[];
  rooms: TimetableRoom[];
  sections: TimetableSection[];
}): Conflict[] {
  const { draft, sessions, rooms, sections } = args;
  const conflicts: Conflict[] = [];
  const activeSessions = sessions.filter(
    (session) => session.id !== draft.id && session.status?.toLowerCase() !== "cancelled",
  );

  const selectedRoom = rooms.find((room) => room.id === draft.room_id);
  const selectedSections = sections.filter((section) => draft.section_ids.includes(section.id));
  const selectedStudentCount = selectedSections.reduce(
    (total, section) => total + (section.max_students ?? 0),
    0,
  );

  if (selectedRoom && selectedStudentCount > selectedRoom.capacity) {
    conflicts.push({
      code: "CAPACITY_OVERFLOW",
      title: "Capacity Overflow",
      severity: "error",
      message: `${selectedRoom.room_code} only seats ${selectedRoom.capacity}, but the selected section load is ${selectedStudentCount}.`,
    });
  }

  const roomClash = activeSessions.find(
    (session) => session.room_id === draft.room_id && session.timeslot_id === draft.timeslot_id,
  );

  if (roomClash) {
    conflicts.push({
      code: "ROOM_CLASH",
      title: "Room Clash",
      severity: "error",
      message: `${selectedRoom?.room_code ?? "This room"} is already occupied during this time slot.`,
    });
  }

  const lecturerClash = activeSessions.find(
    (session) =>
      session.lecturer_id === draft.lecturer_id && session.timeslot_id === draft.timeslot_id,
  );

  if (lecturerClash) {
    conflicts.push({
      code: "LECTURER_CLASH",
      title: "Lecturer Clash",
      severity: "error",
      message: "This lecturer already has a class during the selected time slot.",
    });
  }

  const sectionClash = activeSessions.find(
    (session) =>
      session.timeslot_id === draft.timeslot_id &&
      session.section_ids.some((sectionId) => draft.section_ids.includes(sectionId)),
  );

  if (sectionClash) {
    conflicts.push({
      code: "SECTION_CLASH",
      title: "Section Clash",
      severity: "error",
      message: "One of the selected sections already has a class during this time slot.",
    });
  }

  return conflicts;
}
