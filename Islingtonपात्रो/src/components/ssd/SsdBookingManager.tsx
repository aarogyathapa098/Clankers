"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Room = { id: string; room_code: string; room_name?: string; capacity: number };
type TimeSlot = { id: string; day_of_week: string; start_time: string; end_time: string };
type Session = { id: string; room_id: string; time_slot_id: string; status: string };
type Booking = {
  id: string;
  requester: string;
  requesterType: "Student" | "Faculty";
  roomId: string;
  timeSlotId: string;
  purpose: string;
};

const STORAGE_KEY = "islington-ssd-demo-bookings";

export function SsdBookingManager() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notice, setNotice] = useState<{ tone: "error" | "success"; message: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/rooms").then((response) => response.json()),
      fetch("/api/time-slots").then((response) => response.json()),
      fetch("/api/sessions").then((response) => response.json()),
    ]).then(([roomResult, slotResult, sessionResult]) => {
      setRooms(roomResult.data ?? []);
      setTimeSlots(slotResult.data ?? []);
      setSessions(sessionResult.data ?? []);
    });
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const bookingRows = useMemo(
    () =>
      bookings.map((booking) => ({
        ...booking,
        room: rooms.find((room) => room.id === booking.roomId),
        slot: timeSlots.find((slot) => slot.id === booking.timeSlotId),
      })),
    [bookings, rooms, timeSlots],
  );

  function saveBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const roomId = String(form.get("roomId"));
    const timeSlotId = String(form.get("timeSlotId"));
    const room = rooms.find((item) => item.id === roomId);
    const occupiedByClass = sessions.some(
      (session) =>
        session.status?.toLowerCase() !== "cancelled" &&
        session.room_id === roomId &&
        session.time_slot_id === timeSlotId,
    );
    const occupiedByBooking = bookings.some(
      (booking) => booking.roomId === roomId && booking.timeSlotId === timeSlotId,
    );

    if (occupiedByClass || occupiedByBooking) {
      setNotice({
        tone: "error",
        message: `${room?.room_code ?? "This room"} is already booked at this time. Choose another room or slot.`,
      });
      return;
    }

    const nextBooking: Booking = {
      id: `booking-${Date.now()}`,
      requester: String(form.get("requester")),
      requesterType: String(form.get("requesterType")) as Booking["requesterType"],
      roomId,
      timeSlotId,
      purpose: String(form.get("purpose")),
    };
    const nextBookings = [nextBooking, ...bookings];
    setBookings(nextBookings);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBookings));
    setNotice({
      tone: "success",
      message: `${room?.room_code ?? "Room"} was booked successfully with no timetable clash.`,
    });
    event.currentTarget.reset();
  }

  return (
    <div className="ssd-booking-grid">
      <section className="role-card">
        <div className="role-section-heading">
          <div>
            <span className="role-kicker">SSD booking desk</span>
            <h1>Create a room booking</h1>
            <p>Book on behalf of a student or faculty member. Timetable and SSD booking clashes are blocked.</p>
          </div>
          <span className="role-status">SSD only</span>
        </div>

        {notice && <div className={`role-toast ${notice.tone}`} role="status">{notice.message}</div>}

        <form className="ssd-booking-form" onSubmit={saveBooking}>
          <label>
            Requester type
            <select name="requesterType" defaultValue="Student">
              <option>Student</option>
              <option>Faculty</option>
            </select>
          </label>
          <label>
            Student or faculty ID
            <input name="requester" placeholder="e.g. 24012345" required />
          </label>
          <label>
            Room
            <select name="roomId" required>
              {rooms.map((room) => (
                <option value={room.id} key={room.id}>
                  {room.room_code} · {room.room_name} · {room.capacity} seats
                </option>
              ))}
            </select>
          </label>
          <label>
            Time slot
            <select name="timeSlotId" required>
              {timeSlots.map((slot) => (
                <option value={slot.id} key={slot.id}>
                  {slot.day_of_week} · {slot.start_time}–{slot.end_time}
                </option>
              ))}
            </select>
          </label>
          <label className="ssd-purpose">
            Purpose
            <textarea name="purpose" maxLength={240} placeholder="Student support, group meeting, assessment…" required />
          </label>
          <button className="role-primary-button" type="submit">Check conflicts &amp; book</button>
        </form>
      </section>

      <section className="role-card">
        <div className="role-section-heading">
          <div>
            <span className="role-kicker">This browser</span>
            <h2>Recent SSD bookings</h2>
            <p>Experimental bookings stay isolated from the existing database.</p>
          </div>
        </div>
        {bookingRows.length === 0 && <div className="role-empty">No SSD bookings have been created yet.</div>}
        {bookingRows.map((booking) => (
          <article className="ssd-booking-row" key={booking.id}>
            <div>
              <strong>{booking.room?.room_code ?? "Room"}</strong>
              <span>{booking.purpose}</span>
            </div>
            <div>
              <strong>{booking.slot?.day_of_week} {booking.slot?.start_time}</strong>
              <span>{booking.requesterType} · {booking.requester}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
