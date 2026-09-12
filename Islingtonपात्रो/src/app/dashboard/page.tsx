import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";

export default function DashboardPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <RoleDashboard />
        </div>
      </main>
    </>
  );
}
