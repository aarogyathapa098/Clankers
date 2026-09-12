import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";

export async function GET() {
  try {
    const sessions = await dataRepository.getSessions();
    return NextResponse.json({ success: true, data: sessions });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Perform constraint validation and save via repository
    const result = await dataRepository.createSession(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Academic scheduling conflict detected",
          conflicts: result.conflicts,
          alternatives: result.alternatives,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Timetable session scheduled successfully",
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing session ID" }, { status: 400 });
    }
    const deleted = await dataRepository.deleteSession(id);
    return NextResponse.json({ success: true, deleted });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
