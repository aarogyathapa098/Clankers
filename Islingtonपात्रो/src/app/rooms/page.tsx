"use client";

import { useEffect, useState } from "react";
import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

type RoomRecord = {
  id: string;
  room_id?: string;
  room_code: string;
  room_name?: string;
  building: string;
  floor: number;
  room_type: string;
  capacity: number;
  exam_capacity: number;
  is_available: boolean;
  resources?: Record<string, unknown>;
  status: string;
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomRecord[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("/api/rooms");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setRooms(json.data);
          if (json.data.length > 0) setSelectedRoom(json.data[0]);
        }
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.room_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.room_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.building.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" ||
      r.room_type.toLowerCase() === typeFilter.toLowerCase();

    let matchesCapacity = true;
    if (capacityFilter === "30+") matchesCapacity = r.capacity >= 30;
    if (capacityFilter === "50+") matchesCapacity = r.capacity >= 50;
    if (capacityFilter === "100+") matchesCapacity = r.capacity >= 100;

    return matchesSearch && matchesType && matchesCapacity;
  });

  const stats = {
    total: rooms.length,
    lectureHalls: rooms.filter((r) => r.room_type.includes("hall")).length,
    labs: rooms.filter((r) => r.room_type.includes("lab")).length,
    classrooms: rooms.filter((r) => r.room_type.includes("class")).length,
    capacity: rooms.reduce((acc, r) => acc + r.capacity, 0),
  };

  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="resource-page-header">
            <div>
              <p>Resources / Room Inventory</p>
              <h1>Campus Rooms &amp; Facilities</h1>
              <span>Track campus rooms, exam capacity, facility types, and availability from one live planning view.</span>
            </div>
            <div className="resource-actions">
              <a href="/rooms/availability" className="primary" style={{ textDecoration: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px" }}>
                🔍 Open Slot Finder
              </a>
            </div>
          </header>

          <section className="resource-stat-grid" aria-label="Room inventory summary">
            <MetricCard label="Total Rooms" value={stats.total} detail="Active campus locations" tone="blue" />
            <MetricCard label="Auditoriums & Halls" value={stats.lectureHalls} detail="Exam-ready venues" tone="slate" />
            <MetricCard label="Computing Labs" value={stats.labs} detail="Specialist tech setups" tone="green" />
            <MetricCard label="Classrooms" value={stats.classrooms} detail="General teaching" tone="yellow" />
            <MetricCard label="Total Campus Capacity" value={stats.capacity} detail="Available seats" tone="blue" />
          </section>

          <section className="filter-panel panel">
            <input
              aria-label="Search rooms"
              placeholder="Filter rooms by name, building, or room code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select aria-label="Room type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All room types</option>
              <option value="classroom">Classroom</option>
              <option value="lab">Computing Lab</option>
              <option value="hall">Exam Hall</option>
            </select>
            <select aria-label="Capacity range" value={capacityFilter} onChange={(e) => setCapacityFilter(e.target.value)}>
              <option value="All">All capacities</option>
              <option value="30+">30+ seats</option>
              <option value="50+">50+ seats</option>
              <option value="100+">100+ seats</option>
            </select>
          </section>

          <section className="resource-layout">
            <article className="panel resource-table-panel">
              <div className="panel-title-row">
                <div>
                  <h2>Room Directory</h2>
                  <p>Showing {filteredRooms.length} facility records {loading && "(Loading...)"}</p>
                </div>
                <span className="soft-pill">Verified Active</span>
              </div>

              <div className="table-wrap">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Type</th>
                      <th>Class Capacity</th>
                      <th>Exam Capacity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map((room) => {
                      const isSelected = selectedRoom?.id === room.id;
                      return (
                        <tr
                          key={room.id}
                          onClick={() => setSelectedRoom(room)}
                          style={{
                            cursor: "pointer",
                            backgroundColor: isSelected ? "#F0F7FF" : undefined,
                          }}
                        >
                          <td>
                            <strong>{room.room_code}</strong>
                            <span>{room.room_name || room.building} (Floor {room.floor})</span>
                          </td>
                          <td>
                            <span className="soft-pill" style={{ textTransform: "capitalize" }}>
                              {room.room_type}
                            </span>
                          </td>
                          <td><strong>{room.capacity}</strong> seats</td>
                          <td>{room.exam_capacity || Math.floor(room.capacity * 0.7)} seats</td>
                          <td>
                            <span className={`status-pill ${room.is_available ? "available" : "occupied"}`}>
                              {room.is_available ? "Available" : "In Maintenance"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>

            {selectedRoom && (
              <aside className="panel profile-panel">
                <span className="soft-pill blue">Venue Details</span>
                <h2>{selectedRoom.room_code}</h2>
                <p>{selectedRoom.room_name || selectedRoom.building}</p>
                <div className="room-schematic">{selectedRoom.building} - Floor {selectedRoom.floor}</div>
                <div className="profile-metrics">
                  <div>
                    <span>Room Type</span>
                    <strong style={{ textTransform: "capitalize" }}>{selectedRoom.room_type}</strong>
                  </div>
                  <div>
                    <span>Teaching Cap</span>
                    <strong>{selectedRoom.capacity} seats</strong>
                  </div>
                  <div>
                    <span>Exam Cap</span>
                    <strong>{selectedRoom.exam_capacity || Math.floor(selectedRoom.capacity * 0.7)} seats</strong>
                  </div>
                  <div>
                    <span>Operational</span>
                    <strong>{selectedRoom.is_available ? "Active" : "Inactive"}</strong>
                  </div>
                </div>
                <div className="notice-card info" style={{ marginTop: "12px" }}>
                  Equipped with projector, high-speed network connectivity, and climate control.
                </div>
                <a
                  href={`/timetable`}
                  className="wide-primary"
                  style={{ textDecoration: "none", textAlign: "center", display: "block", marginTop: "14px" }}
                >
                  Schedule Session in {selectedRoom.room_code}
                </a>
              </aside>
            )}
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
