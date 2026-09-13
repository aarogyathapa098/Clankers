"use client";

import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { useRole } from "@/components/auth/RoleProvider";

type Room = {
  id: string;
  room_code: string;
  room_name?: string;
  building: string;
  floor: number;
  room_type: string;
  capacity: number;
  is_available: boolean;
};

export default function RoomAvailabilityPage() {
  const { role, ready } = useRole();
  const [selectedDay, setSelectedDay] = useState("TUE");
  const [selectedWindow, setSelectedWindow] = useState("11:00");
  const [minCapacity, setMinCapacity] = useState(30);
  const [typeFilter, setTypeFilter] = useState("all");

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [totalRooms, setTotalRooms] = useState(10);
  const [allocatedCount, setAllocatedCount] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const canBook = ready && (role === "ADMIN" || role === "SSD");

  function bookingHref(roomId?: string) {
    const params = new URLSearchParams({
      day: selectedDay,
      start: selectedWindow,
    });
    if (roomId) params.set("roomId", roomId);
    if (role === "SSD") return `/ssd/bookings?${params.toString()}`;
    params.set("create", "1");
    return `/timetable?${params.toString()}`;
  }

  useEffect(() => {
    async function fetchAvailability() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/rooms/availability?day=${selectedDay}&timeWindow=${selectedWindow}&minCapacity=${minCapacity}`
        );
        const json = await res.json();
        if (json.success && json.data) {
          const rooms: Room[] = json.data.availableRooms ?? [];
          const filtered =
            typeFilter === "all"
              ? rooms
              : rooms.filter((r) => r.room_type.toLowerCase().includes(typeFilter.toLowerCase()));
          setAvailableRooms(filtered);
          setTotalRooms(json.data.total ?? 10);
          setAllocatedCount(json.data.allocatedCount ?? 0);
          if (filtered.length > 0 && !selectedRoom) {
            setSelectedRoom(filtered[0]);
          }
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, [selectedDay, selectedWindow, minCapacity, typeFilter]);

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Resources / Room Availability</p>
              <h1>Room Availability &amp; Slot Finder</h1>
              <span>Find open campus rooms, compare capacity, and confirm availability before sessions are assigned.</span>
            </div>
            {canBook && (
              <div className="resource-actions">
                <a href={bookingHref(selectedRoom?.id)} className="primary" style={{ textDecoration: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px" }}>
                  {role === "SSD" ? "+ Create Room Booking" : "+ Schedule in Timetable"}
                </a>
              </div>
            )}
          </header>

          <section className="filter-panel panel">
            <div className="day-selector">
              {["MON", "TUE", "WED", "THU", "FRI"].map((day) => (
                <button
                  className={day === selectedDay ? "active" : ""}
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <select
              aria-label="Time window"
              value={selectedWindow}
              onChange={(e) => setSelectedWindow(e.target.value)}
            >
              <option value="08:00">08:00 - 09:30</option>
              <option value="09:30">09:30 - 11:00</option>
              <option value="11:00">11:00 - 12:30</option>
              <option value="12:30">12:30 - 14:00</option>
              <option value="14:00">14:00 - 15:30</option>
            </select>

            <select
              aria-label="Capacity threshold"
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
            >
              <option value={0}>Any capacity</option>
              <option value={30}>&gt;= 30 seats</option>
              <option value={45}>&gt;= 45 seats</option>
              <option value={70}>&gt;= 70 seats</option>
            </select>

            <select
              aria-label="Room cluster"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All facility types</option>
              <option value="classroom">Classrooms</option>
              <option value="lab">Computing Labs</option>
              <option value="hall">Auditoriums / Halls</option>
            </select>
          </section>

          <section className="resource-stat-grid four">
            <MetricCard label="Target Window" value={`${selectedDay} ${selectedWindow}`} detail="Selected slot" tone="blue" />
            <MetricCard label="Total Rooms" value={totalRooms} detail="Accredited spaces" tone="slate" />
            <MetricCard label="Occupied in Slot" value={allocatedCount} detail="Currently scheduled" tone="yellow" />
            <MetricCard label="Available Rooms" value={availableRooms.length} detail="Open in selected slot" tone="green" />
          </section>

          <section className="availability-layout">
            <aside className="available-room-list">
              <div className="panel-title-row compact">
                <div>
                  <h2>Available Rooms</h2>
                  <p>{availableRooms.length} compatible spaces {loading && "(Searching...)"}</p>
                </div>
              </div>
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <article
                    className={`room-option panel ${selectedRoom?.id === room.id ? "selected" : ""}`}
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <strong>{room.room_code}</strong>
                      <span className="soft-pill" style={{ textTransform: "capitalize" }}>{room.room_type}</span>
                    </div>
                    <p>{room.capacity} seats / {room.building}</p>
                    <span>{room.room_type === "lab" ? "Specialist Lab hardware" : "Teaching-ready setup"}</span>
                    {canBook && (
                      <a
                        href={bookingHref(room.id)}
                        style={{
                          display: "inline-block",
                          marginTop: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#1677F5",
                          textDecoration: "none",
                        }}
                      >
                        {role === "SSD" ? "Book this room →" : "Schedule this room →"}
                      </a>
                    )}
                  </article>
                ))
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#64748B", fontSize: "13px" }}>
                  No available rooms match the selected criteria for this slot.
                </div>
              )}
            </aside>

            <article className="panel resource-table-panel">
              <div className="panel-title-row">
                <div>
                  <h2>Selected Room Details</h2>
                  <p>{selectedRoom ? `${selectedRoom.room_code} - ${selectedRoom.room_name || selectedRoom.building}` : "Select a room from the list"}</p>
                </div>
                {selectedRoom && <span className="soft-pill green">Verified Unoccupied</span>}
              </div>

              {selectedRoom ? (
                <div style={{ padding: "16px 0" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ backgroundColor: "#F8FAFC", padding: "14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "12px", color: "#64748B", display: "block" }}>Location</span>
                      <strong style={{ fontSize: "15px", color: "#0F203D" }}>{selectedRoom.building} (FL {selectedRoom.floor})</strong>
                    </div>
                    <div style={{ backgroundColor: "#F8FAFC", padding: "14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "12px", color: "#64748B", display: "block" }}>Seating Capacity</span>
                      <strong style={{ fontSize: "15px", color: "#0F203D" }}>{selectedRoom.capacity} seats</strong>
                    </div>
                    <div style={{ backgroundColor: "#F8FAFC", padding: "14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      <span style={{ fontSize: "12px", color: "#64748B", display: "block" }}>Facility Type</span>
                      <strong style={{ fontSize: "15px", color: "#0F203D", textTransform: "capitalize" }}>{selectedRoom.room_type}</strong>
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", padding: "14px", marginBottom: "16px" }}>
                    <strong style={{ color: "#1E40AF", display: "block", marginBottom: "4px" }}>Slot Verification Status:</strong>
                    <span style={{ color: "#1D4ED8", fontSize: "13px" }}>
                      ✓ {selectedRoom.room_code} has no active sessions assigned on {selectedDay} during {selectedWindow}.
                    </span>
                  </div>

                  {canBook && (
                    <a
                      href={bookingHref(selectedRoom.id)}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#1677F5",
                        color: "#FFFFFF",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        textDecoration: "none",
                        fontSize: "13px",
                      }}
                    >
                      {role === "SSD" ? `Book ${selectedRoom.room_code}` : `Schedule in ${selectedRoom.room_code}`}
                    </a>
                  )}
                </div>
              ) : (
                <p style={{ color: "#64748b", padding: "20px 0" }}>Select a room from the list on the left to review slot details.</p>
              )}
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

function MetricCard(props: { label: string; value: string | number; detail: string; tone: string }) {
  return (
    <article className={`metric-card ${props.tone}`}>
      <p>{props.label}</p>
      <strong>{props.value}</strong>
      <span>{props.detail}</span>
    </article>
  );
}
