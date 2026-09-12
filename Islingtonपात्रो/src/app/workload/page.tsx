import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

export default function WorkloadPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="panel">
            <h1>Faculty Workload</h1>
            <p>Faculty workload planning will appear here.</p>
          </section>
        </div>
      </main>
    </>
  );
}
