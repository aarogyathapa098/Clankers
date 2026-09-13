import { RoleGate } from "@/components/auth/RoleGate";
import { RolePageShell } from "@/components/role/RolePageShell";
import { SsdBookingManager } from "@/components/ssd/SsdBookingManager";

export default function SsdBookingsPage() {
  return <RolePageShell><RoleGate allow={["SSD"]}><SsdBookingManager /></RoleGate></RolePageShell>;
}
