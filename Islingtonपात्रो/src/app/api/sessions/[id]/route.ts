import { NextRequest, NextResponse } from "next/server";
import { dataRepository } from "@/lib/dataRepository";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
        const sessions = await dataRepository.getSessions();
    const session = sessions.find((s) => s.id === id || s.session_id === id);

    if (!session) {
      return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: session });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const res = await dataRepository.updateSession(id, body);
    if (!res.success) {
      return NextResponse.json({ success: false, message: res.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Session updated successfully", data: res.data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deleted = await dataRepository.deleteSession(id);
    return NextResponse.json({ success: true, deleted, message: "Session deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
