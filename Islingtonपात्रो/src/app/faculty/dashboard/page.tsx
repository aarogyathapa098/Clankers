import { RoleGate } from "@/components/auth/RoleGate";
import { RoleHome } from "@/components/role/RoleHome";
import { RolePageShell } from "@/components/role/RolePageShell";

export default function FacultyDashboardPage() {
  return <RolePageShell><RoleGate allow={["FACULTY"]}><RoleHome role="FACULTY" /></RoleGate></RolePageShell>;
}
