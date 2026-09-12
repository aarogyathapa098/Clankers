import { AcademicSidebar } from "@/components/layout/AcademicSidebar";

export default function RoomsPage() {
  return (
    <>
      <AcademicSidebar />
      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="panel">
            <h1>Rooms</h1>
            <p>Room inventory and availability planning will appear here.</p>
          </section>
        </div>
      </main>
    </>
  );
}
