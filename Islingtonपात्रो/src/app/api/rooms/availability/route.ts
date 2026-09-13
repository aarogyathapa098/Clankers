import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get("day") || undefined;
    const timeWindow = searchParams.get("timeWindow") || undefined;
    const minCapacity = parseInt(searchParams.get("minCapacity") || "0", 10);
    const result = await dataRepository.getRoomAvailability(day, timeWindow, minCapacity);
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}