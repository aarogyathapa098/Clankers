import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

export default function LookupPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="panel">
            <h1>Lookup</h1>
            <p>Search tools for academic planning will appear here.</p>
          </section>
        </div>
      </main>
    </>
  );
}
