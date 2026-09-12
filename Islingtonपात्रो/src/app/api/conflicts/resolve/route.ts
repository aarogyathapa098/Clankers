import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("conflict_schedules")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await request.json();
    const conflicts: Array<{
      conflict_type: string;
      severity: string;
      related_session_id: string | null;
      description: string;
    }> = [];

    const { data: sessions, error } = await supabaseServer
      .from("session")
      .select("*")
      .eq("session_date", session.session_date)
      .eq("time_slot_id", session.time_slot_id)
      .eq("status", "scheduled");

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    for (const existing of sessions ?? []) {
      if (session.session_id && existing.session_id === session.session_id) {
        continue;
      }

      if (session.room_id && existing.room_id === session.room_id) {
        conflicts.push({
          conflict_type: "ROOM",
          severity: "critical",
          related_session_id: existing.session_id,
          description: "Room is already booked for this time slot.",
        });
      }

      if (session.lecturer_id === existing.lecturer_id) {
        conflicts.push({
          conflict_type: "LECTURER",
          severity: "critical",
          related_session_id: existing.session_id,
          description: "Lecturer is already assigned to another session.",
        });
      }

      const newSections: string[] = session.section_ids || [];
      const existingSections: string[] = existing.section_ids || [];
      const sectionOverlap = newSections.some((id: string) => existingSections.includes(id));

      if (sectionOverlap) {
        conflicts.push({
          conflict_type: "SECTION",
          severity: "critical",
          related_session_id: existing.session_id,
          description: "Section has another session at the same time.",
        });
      }
    }

    return NextResponse.json({
      success: true,
      has_conflict: conflicts.length > 0,
      conflicts,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
