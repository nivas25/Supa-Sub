import LandingNavbar from "./_components/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <main style={{ paddingTop: "130px" }}>
        {" "}
        {/* Pushes content down past navbar */}
        {children}
      </main>
    </>
  );
}
