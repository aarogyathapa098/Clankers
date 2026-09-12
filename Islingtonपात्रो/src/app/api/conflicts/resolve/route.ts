import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";
export async function POST(request: NextRequest) {
  try {
    const { conflictId } = await request.json();
    if (!conflictId) {
      return NextResponse.json({ success: false, message: "Missing conflictId" }, { status: 400 });
    }
    const resolved = await dataRepository.resolveConflict(conflictId);
    return NextResponse.json({
      success: true,
      resolved,
      message: resolved ? "Conflict resolved successfully" : "Conflict not found",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}