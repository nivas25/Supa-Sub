import LandingNavbar from "./_components/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <main>{children}</main>
    </>
  );
}
