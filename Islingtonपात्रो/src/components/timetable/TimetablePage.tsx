"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
  department?: string;
  assigned_hours?: number;
  max_weekly_hours?: number;
};

type Timeslot = {
  id: string;
  time_slot_id?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
};

type Session = TimetableSessionInput & {
  id: string;
  session_id?: string;
  module_id: string;
  lecturer_id: string;
  room_id: string;
  time_slot_id?: string;
  timeslot_id: string;
  academic_period_id?: string;
  section_ids: string[];
  session_type: string;
  session_date?: string;
  status?: string;
  notes?: string | null;
  module?: Module;
  lecturer?: Lecturer;
  room?: TimetableRoom;
  timeslot?: Timeslot;
};

type Toast = {
  id: number;
  type: "success" | "warning" | "error" | "info";
  message: string;
};

type ConflictDetails = {
  id?: string;
  conflict_type: string;
  severity: string;
  description: string;
};

type Recommendation = {
  type: string;
  title: string;
  description: string;
  recommended_room_id?: string;
  recommended_slot_id?: string;
};

type CreateDefaults = {
  moduleId?: string;
  roomId?: string;
  timeslotId?: string;
};

type GenerationResult = {
  totalSessions: number;
  totalScheduled: number;
  totalConflicts: number;
  capacityViolations: number;
  unscheduled: Array<{ module_id: string; section_id: string; reason: string }>;
  conflictDetails: string[];
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function TimetablePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [rooms, setRooms] = useState<TimetableRoom[]>([]);
  const [sections, setSections] = useState<TimetableSection[]>([]);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);

  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedTimeslotId, setSelectedTimeslotId] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [createDefaults, setCreateDefaults] = useState<CreateDefaults | null>(null);
  const handledCreateLink = useRef(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Conflict Modal State
  const [conflictState, setConflictState] = useState<{
    show: boolean;
    conflicts: ConflictDetails[];
    alternatives: Recommendation[];
    pendingDraft: any | null;
  }>({
    show: false,
    conflicts: [],
    alternatives: [],
    pendingDraft: null,
  });

  // Fetch all core academic data on mount
  async function loadData() {
    try {
      setLoading(true);
      const [sessRes, modRes, lecRes, roomRes, secRes, slotRes] = await Promise.allSettled([
        fetch("/api/sessions").then((r) => r.json()),
        fetch("/api/modules").then((r) => r.json()),
        fetch("/api/lecturers").then((r) => r.json()),
        fetch("/api/rooms").then((r) => r.json()),
        fetch("/api/sections").then((r) => r.json()),
        fetch("/api/time-slots").then((r) => r.json()),
      ]);

      if (sessRes.status === "fulfilled" && sessRes.value.success) {
        const mapped = (sessRes.value.data ?? []).map((s: any) => ({
          ...s,
          id: s.id || s.session_id,
          timeslot_id: s.time_slot_id || s.timeslot_id,
        }));
        setSessions(mapped);
      }

      if (modRes.status === "fulfilled" && modRes.value.success) {
        setModules(modRes.value.data ?? []);
      }

      if (lecRes.status === "fulfilled" && lecRes.value.success) {
        setLecturers(lecRes.value.data ?? []);
      }

      if (roomRes.status === "fulfilled" && roomRes.value.success) {
        const mappedRooms = (roomRes.value.data ?? []).map((r: any) => ({
          id: r.id || r.room_id,
          room_code: r.room_code,
          room_name: r.room_name || `Room ${r.room_code}`,
          capacity: r.capacity || 40,
          room_type: r.room_type || "classroom",
        }));
        setRooms(mappedRooms);
      }

      if (secRes.status === "fulfilled" && secRes.value.success) {
        const mappedSections = (secRes.value.data ?? []).map((sec: any) => ({
          id: sec.id || sec.section_id,
          section_code: sec.section_code,
          section_name: sec.section_name || sec.section_code,
          max_students: sec.student_count || sec.max_students || 40,
        }));
        setSections(mappedSections);
      }

      if (slotRes.status === "fulfilled" && slotRes.value.success) {
        const mappedSlots = (slotRes.value.data ?? []).map((sl: any) => ({
          id: sl.id || sl.time_slot_id,
          day_of_week: sl.day_of_week,
          start_time: sl.start_time,
          end_time: sl.end_time,
        }));
        setTimeslots(mappedSlots);
        if (mappedSlots.length > 0 && !selectedTimeslotId) {
          setSelectedTimeslotId(mappedSlots[0].id);
        }
      }
    } catch {
      pushToast("error", "Error loading academic timetable records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading || handledCreateLink.current || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("create") !== "1") return;

    const requestedDay = params.get("day");
    const requestedStart = params.get("start");
    const matchingSlot = timeslots.find(
      (slot) =>
        (!requestedDay || slot.day_of_week.toUpperCase().startsWith(requestedDay.toUpperCase())) &&
        (!requestedStart || slot.start_time.startsWith(requestedStart)),
    );
    const matchingDay = days.find((day) => requestedDay && day.toUpperCase().startsWith(requestedDay.toUpperCase()));

    setCreateDefaults({
      moduleId: params.get("moduleId") || undefined,
      roomId: params.get("roomId") || undefined,
      timeslotId: matchingSlot?.id,
    });
    if (matchingSlot) setSelectedTimeslotId(matchingSlot.id);
    if (matchingDay) setSelectedDay(matchingDay);
    setIsCreating(true);
    handledCreateLink.current = true;
  }, [loading, timeslots]);

  const activeSessions = sessions.filter((session) => session.status?.toLowerCase() !== "cancelled");
  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const selectedTimeslot = timeslots.find((timeslot) => timeslot.id === selectedTimeslotId);

  const summary = useMemo(() => {
    const scheduledClassesToday = activeSessions.filter((session) => {
      const timeslot = timeslots.find((item) => item.id === session.timeslot_id);
      return timeslot?.day_of_week === currentDay;
    }).length;

    const occupiedRooms = new Set(
      activeSessions
        .filter((session) => session.timeslot_id === selectedTimeslotId)
        .map((session) => session.room_id),
    );

    return {
      scheduledClassesToday,
      totalRooms: rooms.length,
      availableRooms: Math.max(0, rooms.length - occupiedRooms.size),
      activeSessions: activeSessions.length,
    };
  }, [activeSessions, currentDay, selectedTimeslotId, rooms.length, timeslots]);

  function pushToast(type: Toast["type"], message: string) {
    const toast = { id: Date.now(), type, message };
    setToasts((items) => [toast, ...items].slice(0, 4));
    setTimeout(() => {
      setToasts((items) => items.filter((t) => t.id !== toast.id));
    }, 4000);
  }

  async function handleGenerateSchedule() {
    try {
      setGenerating(true);
      setGenerationResult(null);
      const response = await fetch("/api/timetable/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        pushToast("error", json.message || "Schedule generation failed.");
        return;
      }

      setGenerationResult(json.data);
      pushToast(json.data.totalConflicts > 0 ? "warning" : "success", json.message);
      await loadData();
    } catch {
      pushToast("error", "Network error while generating the schedule.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSaveSession(draftPayload: any) {
    try {
      const isEditing = Boolean(draftPayload.id);
      const res = await fetch(isEditing ? `/api/sessions/${draftPayload.id}` : "/api/sessions", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftPayload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        pushToast("success", isEditing ? "Timetable session updated with no conflicts." : "Timetable session scheduled with no conflicts.");
        setIsCreating(false);
        setCreateDefaults(null);
        setSelectedSession(null);
        setConflictState({ show: false, conflicts: [], alternatives: [], pendingDraft: null });
        // Refresh sessions list
        const refresh = await fetch("/api/sessions").then((r) => r.json());
        if (refresh.success) {
          setSessions(
            (refresh.data ?? []).map((s: any) => ({
              ...s,
              id: s.id || s.session_id,
              timeslot_id: s.time_slot_id || s.timeslot_id,
            }))
          );
        }
      } else if (res.status === 409) {
        // Conflict detected by backend!
        setConflictState({
          show: true,
          conflicts: json.conflicts || [{ conflict_type: "SCHEDULE_CLASH", severity: "critical", description: json.message }],
          alternatives: json.alternatives || [],
          pendingDraft: draftPayload,
        });
        const exactMessage = (json.conflicts ?? [])
          .map((conflict: ConflictDetails) => conflict.description)
          .filter(Boolean)
          .join(" • ");
        pushToast("warning", exactMessage || json.message || "Scheduling clash detected. The session was not saved.");
      } else {
        pushToast("error", json.message || "Failed to schedule session.");
      }
    } catch {
      pushToast("error", "Network error when saving session.");
    }
  }

  function saveSession(form: FormEvent<HTMLFormElement>) {
    form.preventDefault();
    const data = new FormData(form.currentTarget);
    const sectionIds = data.getAll("section_ids").map(String);
    const chosenSlot = String(data.get("timeslot_id"));

    const draft = {
      id: selectedSession?.id,
      module_id: String(data.get("module_id")),
      lecturer_id: String(data.get("lecturer_id")),
      room_id: String(data.get("room_id")),
      time_slot_id: chosenSlot,
      timeslot_id: chosenSlot,
      section_ids: sectionIds.length > 0 ? sectionIds : [sections[0]?.id],
      session_type: String(data.get("session_type") || "lecture"),
      status: String(data.get("status") || "scheduled"),
      notes: String(data.get("notes") || ""),
    };

    handleSaveSession(draft);
  }

  async function handleDeleteSession(id: string) {
    try {
      const res = await fetch(`/api/sessions?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        pushToast("info", "Session removed from timetable.");
        setSelectedSession(null);
        setSessions((prev) => prev.filter((s) => s.id !== id && s.session_id !== id));
      } else {
        pushToast("error", json.message || "Could not delete session.");
      }
    } catch {
      pushToast("error", "Error communicating with server.");
    }
  }

  function applyRecommendation(alt: Recommendation) {
    if (!conflictState.pendingDraft) return;
    const updated = {
      ...conflictState.pendingDraft,
      room_id: alt.recommended_room_id || conflictState.pendingDraft.room_id,
      time_slot_id: alt.recommended_slot_id || conflictState.pendingDraft.time_slot_id,
      timeslot_id: alt.recommended_slot_id || conflictState.pendingDraft.timeslot_id,
    };
    handleSaveSession(updated);
  }

  const rowTimes = Array.from(
    new Set(timeslots.map((timeslot) => `${timeslot.start_time}-${timeslot.end_time}`)),
  );

  return (
    <>
      <header className="timetable-hero">
        <div>
          <p>Academic Timetable</p>
          <h1>Master Timetable</h1>
          <span>Live scheduling engine with active conflict prevention &amp; room allocation.</span>
        </div>

        <div className="timetable-actions" aria-label="Timetable controls">
          <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
            <option>All</option>
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <select value={selectedTimeslotId} onChange={(event) => setSelectedTimeslotId(event.target.value)}>
            {timeslots.map((timeslot) => (
              <option key={timeslot.id} value={timeslot.id}>
                {timeslot.day_of_week} - {timeslot.start_time} to {timeslot.end_time}
              </option>
            ))}
          </select>

          <button type="button" className="primary" onClick={() => { setCreateDefaults(null); setIsCreating(true); }}>
            + New Session
          </button>
          <button type="button" onClick={handleGenerateSchedule} disabled={generating || loading}>
            {generating ? "Generating..." : "Generate Schedule"}
          </button>
        </div>
      </header>

      <section className="timetable-summary" aria-label="Timetable summary">
        <TimetableStat label="Scheduled Today" value={summary.scheduledClassesToday} subtext={currentDay} />
        <TimetableStat label="Total Rooms" value={summary.totalRooms} subtext="Across campus buildings" />
        <TimetableStat
          label="Available Rooms"
          value={`${summary.availableRooms} / ${summary.totalRooms}`}
          subtext={selectedTimeslot ? `${selectedTimeslot.day_of_week} ${selectedTimeslot.start_time}` : "Active slot"}
        />
        <TimetableStat label="Active Sessions" value={summary.activeSessions} subtext="Validated without clash" />
      </section>

      {generationResult && (
        <section className="panel" style={{ marginBottom: "16px", padding: "14px 18px" }} aria-live="polite">
          <strong style={{ color: generationResult.totalConflicts ? "#b45309" : "#15803d" }}>
            {generationResult.totalConflicts ? "Schedule Generated With Issues" : "Schedule Generated"}
          </strong>
          <span style={{ display: "block", marginTop: "5px", color: "#475569", fontSize: "13px" }}>
            {generationResult.totalScheduled} of {generationResult.totalSessions} required sessions scheduled · {generationResult.totalConflicts} issues · {generationResult.capacityViolations} capacity violations
          </span>
          {generationResult.conflictDetails.length > 0 && (
            <ul style={{ margin: "8px 0 0", paddingLeft: "20px", color: "#7c2d12", fontSize: "12px" }}>
              {generationResult.conflictDetails.map((detail, index) => <li key={`${detail}-${index}`}>{detail}</li>)}
            </ul>
          )}
        </section>
      )}

      <section className="timetable-board panel">
        <div className="timetable-board-header">
          <div>
            <h2>Weekly Schedule</h2>
            <p>Click any session block to review allocation or modify timeslot.</p>
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
                    const timeslot = timeslots.find(
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
                            modules={modules}
                            rooms={rooms}
                            sections={sections}
                            lecturers={lecturers}
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

      {/* Conflict Resolution Modal */}
      {conflictState.show && (
        <div className="modal-backdrop">
          <div className="session-modal" style={{ maxWidth: "560px" }}>
            <div className="modal-header" style={{ borderBottom: "2px solid #fee2e2" }}>
              <div>
                <p style={{ color: "#b91c1c", fontWeight: 700, textTransform: "uppercase" }}>⚠️ Conflict Detected</p>
                <h2 style={{ color: "#991b1b" }}>Schedule Clash Warning</h2>
              </div>
              <button
                type="button"
                onClick={() => setConflictState({ show: false, conflicts: [], alternatives: [], pendingDraft: null })}
              >
                Dismiss
              </button>
            </div>

            <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "14px" }}>
                <strong style={{ color: "#991b1b", display: "block", marginBottom: "6px" }}>The selected booking cannot be saved:</strong>
                {conflictState.conflicts.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginTop: "4px" }}>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>✕</span>
                    <div>
                      <strong style={{ color: "#7f1d1d" }}>{c.conflict_type.replace("_", " ")}:</strong>
                      <span style={{ color: "#450a0a", marginLeft: "4px" }}>{c.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              {conflictState.alternatives.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", marginBottom: "8px" }}>
                    💡 Intelligent Recommendations
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {conflictState.alternatives.map((alt, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: "1px solid #bfdbfe",
                          backgroundColor: "#eff6ff",
                          borderRadius: "8px",
                          padding: "12px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <strong style={{ color: "#1e40af", display: "block", fontSize: "13px" }}>{alt.title}</strong>
                          <span style={{ color: "#3b82f6", fontSize: "12px" }}>{alt.description}</span>
                        </div>
                        <button
                          type="button"
                          className="primary"
                          style={{ fontSize: "12px", padding: "6px 12px", whiteSpace: "nowrap" }}
                          onClick={() => applyRecommendation(alt)}
                        >
                          Apply &amp; Save
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setConflictState({ show: false, conflicts: [], alternatives: [], pendingDraft: null })}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Stack */}
      {toasts.length > 0 && (
        <div className="toast-stack">
          {toasts.map((toast) => (
            <div className={`toast ${toast.type}`} key={toast.id}>
              {toast.message}
            </div>
          ))}
        </div>
      )}

      {/* Session Create/Edit Modal */}
      {(isCreating || selectedSession) && (
        <SessionModal
          onClose={() => {
            setIsCreating(false);
            setCreateDefaults(null);
            setSelectedSession(null);
          }}
          onSave={saveSession}
          onDelete={selectedSession ? () => handleDeleteSession(selectedSession.id) : undefined}
          session={selectedSession}
          modules={modules}
          lecturers={lecturers}
          rooms={rooms}
          sections={sections}
          timeslots={timeslots}
          defaults={createDefaults}
        />
      )}
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

function cellTone(session: Session) {
  const tones: Record<string, string> = {
    "mod-1": "blue",
    "mod-2": "green",
    "mod-3": "violet",
    "mod-4": "yellow",
    "mod-5": "rose",
    "mod-6": "cyan",
  };
  return tones[session.module_id] ?? "blue";
}

function SessionCard(props: {
  session: Session;
  onClick: () => void;
  modules: Module[];
  rooms: TimetableRoom[];
  sections: TimetableSection[];
  lecturers: Lecturer[];
}) {
  const module = props.modules.find((item) => item.id === props.session.module_id);
  const room = props.rooms.find((item) => item.id === props.session.room_id);
  const lecturer = props.lecturers.find((item) => item.id === props.session.lecturer_id);
  const secNames = props.sections
    .filter((sec) => (props.session.section_ids || []).includes(sec.id))
    .map((s) => s.section_name || s.section_code)
    .join(", ");

  return (
    <button
      className={`session-card ${cellTone(props.session)}`}
      onClick={props.onClick}
      type="button"
    >
      <span className="session-card-top">
        <strong>{module?.module_code ?? "Module"}</strong>
        <em>{props.session.status ?? "scheduled"}</em>
      </span>
      <span>{module?.module_name ?? "Scheduled Class"}</span>
      <span>{secNames || "Cohort Class"}</span>
      <span>
        {lecturer ? `${lecturer.first_name} ${lecturer.last_name}` : "Faculty"} - {room?.room_code ?? "Room"}
      </span>
    </button>
  );
}

function SessionModal(props: {
  session: Session | null;
  onClose: () => void;
  onSave: (form: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  modules: Module[];
  lecturers: Lecturer[];
  rooms: TimetableRoom[];
  sections: TimetableSection[];
  timeslots: Timeslot[];
  defaults?: CreateDefaults | null;
}) {
  const defaultTimeslot = props.session?.timeslot_id || props.defaults?.timeslotId || props.timeslots[0]?.id;

  return (
    <div className="modal-backdrop">
      <form className="session-modal" onSubmit={props.onSave}>
        <div className="modal-header">
          <div>
            <p>Academic Scheduler</p>
            <h2>{props.session ? "Edit Session" : "Schedule New Session"}</h2>
          </div>
          <button type="button" onClick={props.onClose}>
            Close
          </button>
        </div>

        <div className="modal-grid">
          <Select label="Module" name="module_id" defaultValue={props.session?.module_id || props.defaults?.moduleId}>
            {props.modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.module_code} - {module.module_name}
              </option>
            ))}
          </Select>

          <Select label="Faculty" name="lecturer_id" defaultValue={props.session?.lecturer_id}>
            {props.lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.first_name} {lecturer.last_name} ({lecturer.department || "IT"})
              </option>
            ))}
          </Select>

          <Select label="Room" name="room_id" defaultValue={props.session?.room_id || props.defaults?.roomId}>
            {props.rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_code} - {room.room_name} ({room.capacity} seats)
              </option>
            ))}
          </Select>

          <Select label="Time Slot" name="timeslot_id" defaultValue={defaultTimeslot}>
            {props.timeslots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.day_of_week} ({slot.start_time} - {slot.end_time})
              </option>
            ))}
          </Select>

          <Select label="Session Type" name="session_type" defaultValue={props.session?.session_type ?? "lecture"}>
            <option value="lecture">Lecture</option>
            <option value="lab">Lab Practical</option>
            <option value="tutorial">Tutorial</option>
            <option value="exam">Examination</option>
          </Select>

          <Select label="Status" name="status" defaultValue={props.session?.status ?? "scheduled"}>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="draft">Draft</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        <fieldset className="section-picker">
          <legend>Assigned Cohorts</legend>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {props.sections.map((section) => (
              <label key={section.id}>
                <input
                  defaultChecked={
                    props.session?.section_ids?.includes(section.id) ||
                    (!props.session && section.id === props.sections[0]?.id)
                  }
                  name="section_ids"
                  type="checkbox"
                  value={section.id}
                />
                <span>
                  {section.section_name || section.section_code} ({section.max_students} students)
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field-label">
          Scheduling Notes
          <textarea name="notes" defaultValue={props.session?.notes ?? ""} placeholder="Add equipment requests, cohort notes, or session focus..." />
        </label>

        <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {props.onDelete && (
              <button
                type="button"
                onClick={props.onDelete}
                style={{ color: "#ef4444", borderColor: "#fca5a5" }}
              >
                Delete Session
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" onClick={props.onClose}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Validate &amp; Save
            </button>
          </div>
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
