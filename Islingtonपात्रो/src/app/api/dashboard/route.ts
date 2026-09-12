import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Count scheduled sessions today
    const { count: sessionsToday } = await supabaseServer
      .from("session")
      .select("*", { count: "exact", head: true })
      .eq("session_date", today)
      .eq("status", "scheduled");

    // Total rooms
    const { count: totalRooms } = await supabaseServer
      .from("room")
      .select("*", { count: "exact", head: true });

    // Available rooms
    const { count: availableRooms } = await supabaseServer
      .from("room")
      .select("*", { count: "exact", head: true })
      .eq("is_available", true)
      .eq("status", "active");

    // Active conflicts (unresolved)
    const { count: activeConflicts } = await supabaseServer
      .from("conflict_schedules")
      .select("*", { count: "exact", head: true })
      .eq("is_resolved", false);

    // Total lecturers
    const { count: totalLecturers } = await supabaseServer
      .from("lecturer")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Total modules
    const { count: totalModules } = await supabaseServer
      .from("module")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    return NextResponse.json({
      success: true,
      data: {
        sessions_today: sessionsToday ?? 0,
        total_rooms: totalRooms ?? 0,
        available_rooms: availableRooms ?? 0,
        active_conflicts: activeConflicts ?? 0,
        total_lecturers: totalLecturers ?? 0,
        total_modules: totalModules ?? 0,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}