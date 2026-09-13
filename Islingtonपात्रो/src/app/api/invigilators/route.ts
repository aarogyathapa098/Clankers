import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId") || undefined;
    const invigilators = await dataRepository.getInvigilators(sessionId);
    return NextResponse.json({ success: true, data: invigilators });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ success: false, message: "Missing sessionId" }, { status: 400 });
    }
    const allocations = await dataRepository.generateInvigilators(sessionId);
    return NextResponse.json({
      success: true,
      message: `Allocated ${allocations.length} invigilators for session`,
      data: allocations,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}