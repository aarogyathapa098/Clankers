"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  TimetableRoom,
  TimetableSection,
  TimetableSessionInput,
} from "@/lib/timetable-conflicts";

type Module = {
  id: string;
  module_code: string;
  module_name: string;
};

type Lecturer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type Timeslot = {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
};

type Session = TimetableSessionInput & {
  module_id: string;
  academic_period_id: string;
  session_type: string;
  notes?: string | null;
};

type Toast = {
  id: number;
  type: "success" | "warning" | "error" | "info";
  message: string;
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const initialData = {
  modules: [
    { id: "mod-ai301", module_code: "AI301", module_name: "Artificial Intelligence" },
    { id: "mod-cs205", module_code: "CS205", module_name: "Database Systems" },
    { id: "mod-se220", module_code: "SE220", module_name: "Software Engineering" },
    { id: "mod-wt201", module_code: "WT201", module_name: "Web Technologies" },
    { id: "mod-db204", module_code: "DB204", module_name: "Data Modelling" },
  ] satisfies Module[],
  lecturers: [
    { id: "lec-lee", first_name: "Prof.", last_name: "Lee", email: "lee@example.edu" },
    { id: "lec-smith", first_name: "Dr.", last_name: "Smith", email: "smith@example.edu" },
    { id: "lec-kumar", first_name: "Dr.", last_name: "Kumar", email: "kumar@example.edu" },
  ] satisfies Lecturer[],
  rooms: [
    { id: "room-lab1", room_code: "LAB-1", room_name: "Lab 1", capacity: 40, room_type: "Lab" },
    { id: "room-201", room_code: "R-201", room_name: "Room 201", capacity: 45, room_type: "Lecture" },
    { id: "room-302", room_code: "R-302", room_name: "Room 302", capacity: 55, room_type: "Lecture" },
    { id: "room-401", room_code: "R-401", room_name: "Room 401", capacity: 65, room_type: "Lecture" },
  ] satisfies TimetableRoom[],
  sections: [
    { id: "sec-a", section_name: "Group A", section_code: "BSc-A", max_students: 60 },
    { id: "sec-b", section_name: "Group B", section_code: "BSc-B", max_students: 35 },
    { id: "sec-c", section_name: "Group C", section_code: "BSc-C", max_students: 42 },
  ] satisfies TimetableSection[],
  timeslots: [
    { id: "ts-mon-08", day_of_week: "Monday", start_time: "08:00", end_time: "09:30" },
    { id: "ts-mon-10", day_of_week: "Monday", start_time: "10:00", end_time: "11:30" },
    { id: "ts-mon-12", day_of_week: "Monday", start_time: "12:00", end_time: "13:30" },
    { id: "ts-tue-08", day_of_week: "Tuesday", start_time: "08:00", end_time: "09:30" },
    { id: "ts-tue-10", day_of_week: "Tuesday", start_time: "10:00", end_time: "11:30" },
    { id: "ts-tue-12", day_of_week: "Tuesday", start_time: "12:00", end_time: "13:30" },
    { id: "ts-wed-08", day_of_week: "Wednesday", start_time: "08:00", end_time: "09:30" },
    { id: "ts-wed-10", day_of_week: "Wednesday", start_time: "10:00", end_time: "11:30" },
    { id: "ts-wed-12", day_of_week: "Wednesday", start_time: "12:00", end_time: "13:30" },
    { id: "ts-thu-08", day_of_week: "Thursday", start_time: "08:00", end_time: "09:30" },
    { id: "ts-thu-10", day_of_week: "Thursday", start_time: "10:00", end_time: "11:30" },
    { id: "ts-thu-12", day_of_week: "Thursday", start_time: "12:00", end_time: "13:30" },
    { id: "ts-fri-08", day_of_week: "Friday", start_time: "08:00", end_time: "09:30" },
    { id: "ts-fri-10", day_of_week: "Friday", start_time: "10:00", end_time: "11:30" },
    { id: "ts-fri-12", day_of_week: "Friday", start_time: "12:00", end_time: "13:30" },
  ] satisfies Timeslot[],
  sessions: [
    {
      id: "session-1",
      module_id: "mod-cs205",
      lecturer_id: "lec-smith",
      room_id: "room-401",
      timeslot_id: "ts-mon-08",
      academic_period_id: "period-1",
      section_ids: ["sec-a"],
      session_type: "lecture",
      status: "confirmed",
    },
    {
      id: "session-2",
      module_id: "mod-ai301",
      lecturer_id: "lec-lee",
      room_id: "room-lab1",
      timeslot_id: "ts-tue-08",
      academic_period_id: "period-1",
      section_ids: ["sec-b"],
      session_type: "lab",
      status: "draft",
    },
    {
      id: "session-3",
      module_id: "mod-db204",
      lecturer_id: "lec-kumar",
      room_id: "room-302",
      timeslot_id: "ts-wed-10",
      academic_period_id: "period-1",
      section_ids: ["sec-a"],
      session_type: "tutorial",
      status: "confirmed",
    },
  ] satisfies Session[],
};

function lecturerName(lecturer?: Lecturer) {
  if (!lecturer) {
    return "Unassigned";
  }

  return `${lecturer.first_name} ${lecturer.last_name}`;
}

function timeLabel(timeslot?: Timeslot) {
  if (!timeslot) {
    return "";
  }

  return `${timeslot.start_time.slice(0, 5)} - ${timeslot.end_time.slice(0, 5)}`;
}

function cellTone(session: Session) {
  const tones: Record<string, string> = {
    "mod-ai301": "green",
    "mod-cs205": "blue",
    "mod-se220": "violet",
    "mod-wt201": "yellow",
    "mod-db204": "rose",
  };

  return tones[session.module_id] ?? "blue";
}

export function TimetablePage() {
  const [sessions, setSessions] = useState<Session[]>(initialData.sessions);
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedTimeslotId, setSelectedTimeslotId] = useState(initialData.timeslots[0].id);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const activeSessions = sessions.filter((session) => session.status?.toLowerCase() !== "cancelled");
  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const selectedTimeslot = initialData.timeslots.find((timeslot) => timeslot.id === selectedTimeslotId);

  const summary = useMemo(() => {
    const scheduledClassesToday = activeSessions.filter((session) => {
      const timeslot = initialData.timeslots.find((item) => item.id === session.timeslot_id);
      return timeslot?.day_of_week === currentDay;
    }).length;

    const occupiedRooms = new Set(
      activeSessions
        .filter((session) => session.timeslot_id === selectedTimeslotId)
        .map((session) => session.room_id),
    );

    return {
      scheduledClassesToday,
      totalRooms: initialData.rooms.length,
      availableRooms: initialData.rooms.length - occupiedRooms.size,
      activeSessions: activeSessions.length,
    };
  }, [activeSessions, currentDay, selectedTimeslotId]);

  function pushToast(type: Toast["type"], message: string) {
    const toast = { id: Date.now(), type, message };
    setToasts((items) => [toast, ...items].slice(0, 3));
  }

  function saveSession(form: FormEvent<HTMLFormElement>) {
    form.preventDefault();

    const data = new FormData(form.currentTarget);
    const sectionIds = data.getAll("section_ids").map(String);
    const draft: Session = {
      id: selectedSession?.id ?? crypto.randomUUID(),
      module_id: String(data.get("module_id")),
      lecturer_id: String(data.get("lecturer_id")),
      room_id: String(data.get("room_id")),
      timeslot_id: String(data.get("timeslot_id")),
      academic_period_id: "period-1",
      section_ids: sectionIds.length > 0 ? sectionIds : [initialData.sections[0].id],
      session_type: String(data.get("session_type") || "lecture"),
      status: String(data.get("status") || "draft"),
      notes: String(data.get("notes") || ""),
    };

    setSessions((items) => {
      const exists = items.some((item) => item.id === draft.id);
      return exists ? items.map((item) => (item.id === draft.id ? draft : item)) : [...items, draft];
    });
    setIsCreating(false);
    setSelectedSession(null);
    pushToast("success", "Timetable session saved successfully.");
  }

  const rowTimes = Array.from(
    new Set(initialData.timeslots.map((timeslot) => `${timeslot.start_time}-${timeslot.end_time}`)),
  );

  return (
    <>
      <header className="timetable-hero">
        <div>
          <p>Academic Timetable</p>
          <h1>Master Timetable</h1>
        </div>

        <div className="timetable-actions" aria-label="Timetable controls">
          <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
            <option>All</option>
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <select value={selectedTimeslotId} onChange={(event) => setSelectedTimeslotId(event.target.value)}>
            {initialData.timeslots.map((timeslot) => (
              <option key={timeslot.id} value={timeslot.id}>
                {timeslot.day_of_week} - {timeLabel(timeslot)}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => setIsCreating(true)}>
            New Session
          </button>
        </div>
      </header>

      <section className="timetable-summary" aria-label="Timetable summary">
        <TimetableStat label="Scheduled Today" value={summary.scheduledClassesToday} subtext={currentDay} />
        <TimetableStat label="Total Rooms" value={summary.totalRooms} subtext="Across all venues" />
        <TimetableStat
          label="Available Rooms"
          value={`${summary.availableRooms} / ${summary.totalRooms}`}
          subtext={selectedTimeslot ? `${selectedTimeslot.day_of_week} - ${timeLabel(selectedTimeslot)}` : ""}
        />
        <TimetableStat label="Active Sessions" value={summary.activeSessions} subtext="Confirmed and draft" />
      </section>

      <section className="timetable-board panel">
        <div className="timetable-board-header">
          <div>
            <h2>Weekly Schedule</h2>
            <p>Click any session to edit details.</p>
          </div>
          <span>{selectedDay === "All" ? "All weekdays" : selectedDay}</span>
        </div>

        <div className="timetable-grid-wrap">
          <div className="timetable-grid timetable-grid-head">
            <div>Time</div>
            {days.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="timetable-grid-body">
            {rowTimes.map((range) => {
              const [start, end] = range.split("-");

              return (
                <div className="timetable-grid timetable-grid-row" key={range}>
                  <div className="time-cell">
                    {start.slice(0, 5)}
                    <span>{end.slice(0, 5)}</span>
                  </div>

                  {days.map((day) => {
                    const timeslot = initialData.timeslots.find(
                      (item) => item.day_of_week === day && item.start_time === start && item.end_time === end,
                    );
                    const cellSessions = activeSessions.filter((session) => session.timeslot_id === timeslot?.id);
                    const visibleSessions = selectedDay === "All" || selectedDay === day ? cellSessions : [];

                    return (
                      <div className="schedule-cell" key={`${day}-${range}`}>
                        {visibleSessions.map((session) => (
                          <SessionCard
                            key={session.id}
                            onClick={() => setSelectedSession(session)}
                            session={session}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {toasts.length > 0 ? (
        <div className="toast-stack">
          {toasts.map((toast) => (
            <div className={`toast ${toast.type}`} key={toast.id}>
              {toast.message}
            </div>
          ))}
        </div>
      ) : null}

      {isCreating || selectedSession ? (
        <SessionModal
          onClose={() => {
            setIsCreating(false);
            setSelectedSession(null);
          }}
          onSave={saveSession}
          session={selectedSession}
        />
      ) : null}
    </>
  );
}

function TimetableStat(props: { label: string; value: string | number; subtext: string }) {
  return (
    <article className="timetable-stat-card">
      <p>{props.label}</p>
      <strong>{props.value}</strong>
      <span>{props.subtext}</span>
    </article>
  );
}

function SessionCard(props: {
  session: Session;
  onClick: () => void;
}) {
  const module = initialData.modules.find((item) => item.id === props.session.module_id);
  const room = initialData.rooms.find((item) => item.id === props.session.room_id);
  const sections = initialData.sections.filter((section) => props.session.section_ids.includes(section.id));
  const lecturer = initialData.lecturers.find((item) => item.id === props.session.lecturer_id);

  return (
    <button
      className={`session-card ${cellTone(props.session)}`}
      onClick={props.onClick}
      type="button"
    >
      <span className="session-card-top">
        <strong>{module?.module_code ?? "Module"}</strong>
        <em>{props.session.status}</em>
      </span>
      <span>{module?.module_name ?? "Untitled module"}</span>
      <span>{sections.map((section) => section.section_name).join(", ")}</span>
      <span>
        {lecturerName(lecturer)} - {room?.room_code}
      </span>
    </button>
  );
}

function SessionModal(props: {
  session: Session | null;
  onClose: () => void;
  onSave: (form: FormEvent<HTMLFormElement>) => void;
}) {
  const defaultTimeslot = props.session?.timeslot_id ?? initialData.timeslots[0].id;

  return (
    <div className="modal-backdrop">
      <form className="session-modal" onSubmit={props.onSave}>
        <div className="modal-header">
          <div>
            <p>Session Editor</p>
            <h2>{props.session ? "Session Details" : "Create Session"}</h2>
          </div>
          <button type="button" onClick={props.onClose}>
            Close
          </button>
        </div>

        <div className="modal-grid">
          <Select label="Module" name="module_id" defaultValue={props.session?.module_id}>
            {initialData.modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.module_code} - {module.module_name}
              </option>
            ))}
          </Select>

          <Select label="Lecturer" name="lecturer_id" defaultValue={props.session?.lecturer_id}>
            {initialData.lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturerName(lecturer)}
              </option>
            ))}
          </Select>

          <Select label="Room" name="room_id" defaultValue={props.session?.room_id}>
            {initialData.rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_code} - {room.capacity} seats
              </option>
            ))}
          </Select>

          <Select label="Time Slot" name="timeslot_id" defaultValue={defaultTimeslot}>
            {initialData.timeslots.map((timeslot) => (
              <option key={timeslot.id} value={timeslot.id}>
                {timeslot.day_of_week} - {timeLabel(timeslot)}
              </option>
            ))}
          </Select>

          <Select label="Session Type" name="session_type" defaultValue={props.session?.session_type ?? "lecture"}>
            <option value="lecture">Lecture</option>
            <option value="lab">Lab</option>
            <option value="tutorial">Tutorial</option>
          </Select>

          <Select label="Status" name="status" defaultValue={props.session?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        <fieldset className="section-picker">
          <legend>Sections</legend>
          <div>
            {initialData.sections.map((section) => (
              <label key={section.id}>
                <input
                  defaultChecked={props.session?.section_ids.includes(section.id) ?? section.id === initialData.sections[0].id}
                  name="section_ids"
                  type="checkbox"
                  value={section.id}
                />
                <span>
                  {section.section_name} - {section.max_students ?? 0} students
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field-label">
          Notes
          <textarea name="notes" defaultValue={props.session?.notes ?? ""} placeholder="Optional scheduling note" />
        </label>

        <div className="modal-footer">
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button type="submit">Save Session</button>
        </div>
      </form>
    </div>
  );
}

function Select(props: {
  label: string;
  name: string;
  defaultValue?: string;
  children: ReactNode;
}) {
  return (
    <label className="field-label">
      {props.label}
      <select name={props.name} defaultValue={props.defaultValue}>
        {props.children}
      </select>
    </label>
  );
}
