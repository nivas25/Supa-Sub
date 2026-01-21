import HomeNavbar from "@/components/nav/HomeNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: "var(--font-outfit)", fontWeight: 400 }}>
      <HomeNavbar currentMode="creator" displayName="Reddy Sai Nivas C" />
      {children}
    </div>
  );
}
