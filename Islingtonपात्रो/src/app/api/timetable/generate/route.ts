import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { programmeId, semester } = body;
    const result = await dataRepository.generateTimetable(programmeId, semester);
    const hasIssues = result.totalConflicts > 0;
    return NextResponse.json({
      success: true,
      message: hasIssues
        ? `Schedule generated with issues: ${result.totalScheduled} scheduled, ${result.unscheduled.length} unscheduled.`
        : `Schedule generated: ${result.totalScheduled} sessions scheduled with zero constraint clashes${result.generatedCount ? ` (${result.generatedCount} new)` : ""}.`,
      data: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
