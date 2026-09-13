import { RoleGate } from "@/components/auth/RoleGate";
import { RoleHome } from "@/components/role/RoleHome";
import { RolePageShell } from "@/components/role/RolePageShell";

export default function StudentDashboardPage() {
  return <RolePageShell><RoleGate allow={["STUDENT"]}><RoleHome role="STUDENT" /></RoleGate></RolePageShell>;
}
