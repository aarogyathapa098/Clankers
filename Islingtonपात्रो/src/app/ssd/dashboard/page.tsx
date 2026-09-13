import { RoleGate } from "@/components/auth/RoleGate";
import { RoleHome } from "@/components/role/RoleHome";
import { RolePageShell } from "@/components/role/RolePageShell";

export default function SsdDashboardPage() {
  return <RolePageShell><RoleGate allow={["SSD"]}><RoleHome role="SSD" /></RoleGate></RolePageShell>;
}
