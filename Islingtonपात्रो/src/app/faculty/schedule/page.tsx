import { RoleGate } from "@/components/auth/RoleGate";
import { RolePageShell } from "@/components/role/RolePageShell";
import { ScheduleView } from "@/components/role/ScheduleView";

export default function FacultySchedulePage() {
  return <RolePageShell><RoleGate allow={["FACULTY"]}><ScheduleView role="FACULTY" /></RoleGate></RolePageShell>;
}
