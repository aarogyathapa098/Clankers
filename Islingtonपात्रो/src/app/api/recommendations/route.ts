import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    // Get lecturers with their workload data
    const { data: lecturers, error: lecturerError } = await supabaseServer
      .from("lecturer")
      .select("*")
      .eq("status", "active")
      .order("first_name", { ascending: true });

    if (lecturerError) {
      return NextResponse.json({ success: false, message: lecturerError.message }, { status: 500 });
    }

    // Get session counts per lecturer for workload calculation
    const { data: sessions } = await supabaseServer
      .from("session")
      .select("lecturer_id, duration_minutes")
      .eq("status", "scheduled");

    // Calculate assigned hours per lecturer
    const lecturerHours: Record<string, number> = {};
    for (const session of sessions ?? []) {
      const hours = (session.duration_minutes ?? 60) / 60;
      lecturerHours[session.lecturer_id] = (lecturerHours[session.lecturer_id] ?? 0) + hours;
    }

    const enriched = (lecturers ?? []).map((lecturer) => ({
      ...lecturer,
      assigned_hours: lecturerHours[lecturer.lecturer_id] ?? 0,
    }));

    return NextResponse.json({ success: true, data: enriched });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
