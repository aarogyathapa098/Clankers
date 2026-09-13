import { RoleGate } from "@/components/auth/RoleGate";
import { RolePageShell } from "@/components/role/RolePageShell";

const permissions = [
  { role: "Admin", dashboard: "Planning overview", timetable: "Manage", resources: "Manage", bookings: "View", users: "Manage" },
  { role: "Faculty", dashboard: "Personal", timetable: "Assigned only", resources: "Availability", bookings: "None", users: "None" },
  { role: "Student", dashboard: "Personal", timetable: "Cohort only", resources: "Availability", bookings: "None", users: "None" },
  { role: "SSD", dashboard: "Service desk", timetable: "None", resources: "Manage", bookings: "Manage", users: "None" },
];

export default function RolesPage() {
  return (
    <RolePageShell>
      <RoleGate allow={["ADMIN"]}>
        <section className="role-card">
          <div className="role-section-heading">
            <div>
              <span className="role-kicker">Administration</span>
              <h1>Roles &amp; access</h1>
              <p>Review the permission boundaries enforced in navigation, pages, routes, and write APIs.</p>
            </div>
            <span className="role-status">Admin only</span>
          </div>
          <div className="role-table-wrap">
            <table className="role-table">
              <thead><tr><th>Role</th><th>Dashboard</th><th>Timetable</th><th>Rooms</th><th>Bookings</th><th>Role management</th></tr></thead>
              <tbody>
                {permissions.map((item) => (
                  <tr key={item.role}>
                    <td><strong>{item.role}</strong></td><td>{item.dashboard}</td><td>{item.timetable}</td><td>{item.resources}</td><td>{item.bookings}</td><td>{item.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="role-note">
            The current project has no sign-in provider, so the role selector is an explicit hackathon demo identity. The same permission matrix is enforced by middleware and is ready to receive a trusted Supabase-auth role later.
          </div>
        </section>
      </RoleGate>
    </RolePageShell>
  );
}
