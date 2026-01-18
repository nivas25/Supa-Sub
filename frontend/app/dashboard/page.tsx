import DashboardNavbar from "./_components/DashboardNavbar";

export default function Dashboard() {
  return (
    <main>
      <DashboardNavbar />
      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to your creator dashboard</p>
      </div>
    </main>
  );
}
