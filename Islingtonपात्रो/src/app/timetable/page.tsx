import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

export default function TimetablePage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="panel">
            <h1>Master Timetable</h1>
            <p>The master timetable view will appear here.</p>
          </section>
        </div>
      </main>
    </>
  );
}
