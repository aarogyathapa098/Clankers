import { AcademicSidebar } from "@/components/layout/AcademicSidebar";
import { TimetablePage as TimetablePlanner } from "@/components/timetable/TimetablePage";

export default function TimetablePage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <TimetablePlanner />
        </div>
      </main>
    </>
  );
}
