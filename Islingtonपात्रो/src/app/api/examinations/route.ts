import { NextResponse } from "next/server";
import { examSchedule } from "@/lib/examSchedule";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: examSchedule.filter((exam) => exam.status !== "cancelled"),
  });
}
