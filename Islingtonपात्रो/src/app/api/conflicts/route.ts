import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";

export async function GET() {
  try {
    const conflicts = await dataRepository.getConflicts();
    return NextResponse.json({ success: true, data: conflicts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await request.json();
    const result = await dataRepository.validateSession(session);

    return NextResponse.json({
      success: true,
      valid: result.valid,
      conflicts: result.conflicts,
      alternatives: result.alternatives,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
