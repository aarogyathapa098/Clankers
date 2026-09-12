import { NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";

export async function GET() {
  try {
    const lecturers = await dataRepository.getLecturers();
    return NextResponse.json({ success: true, data: lecturers });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
