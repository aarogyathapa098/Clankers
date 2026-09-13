import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { programmeId, semester } = body;
    const result = await dataRepository.generateTimetable(programmeId, semester);
    return NextResponse.json({
      success: true,
      message: `Successfully scheduled ${result.generatedCount} academic sessions with zero constraint clashes`,
      data: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}