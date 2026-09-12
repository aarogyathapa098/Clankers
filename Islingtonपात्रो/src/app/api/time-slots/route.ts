import { NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";

export async function GET() {
  try {
    const timeslots = await dataRepository.getTimeslots();
    return NextResponse.json({ success: true, data: timeslots });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
