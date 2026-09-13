import { RoleGate } from "@/components/auth/RoleGate";
import { RolePageShell } from "@/components/role/RolePageShell";
import { ScheduleView } from "@/components/role/ScheduleView";

export default function StudentTimetablePage() {
  return <RolePageShell><RoleGate allow={["STUDENT"]}><ScheduleView role="STUDENT" /></RoleGate></RolePageShell>;
}
