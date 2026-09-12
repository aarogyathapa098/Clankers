import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

export default function GenerateSchedulePage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="panel">
            <h1>Generate Schedule</h1>
            <p>Schedule generation controls will appear here.</p>
          </section>
        </div>
      </main>
    </>
  );
}
