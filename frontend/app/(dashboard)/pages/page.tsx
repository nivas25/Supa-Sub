"use client";
import PagesHeader from "@/components/pages/PagesHeader";
import PagesList from "@/components/pages/PagesList";

export default function PagesDashboard() {
  // This is where we will eventually fetch REAL data from Supabase
  // For now, we mock a "Real" structure
  const myPages = [
    {
      id: "1",
      slug: "nivas",
      subscribers: 0,
      visits: 12,
      status: "active" as const,
    },
  ];

  return (
    <main
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}
    >
      <PagesHeader count={myPages.length} />
      <PagesList pages={myPages} />
    </main>
  );
}
