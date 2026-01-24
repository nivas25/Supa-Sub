import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import SinglePageDashboard from "@/components/pages/SinglePageDashboard";

export default async function PageDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  // 1. Auth Check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // 2. Fetch Page Details & Price
  const { data: page } = await supabase
    .from("pages")
    .select(`*, page_prices(amount)`)
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (!page) return notFound();

  // 3. FETCH REAL MEMBERSHIP HISTORY (The Magic Step)
  // We get the creation date of every active member
  const { data: members } = await supabase
    .from("memberships")
    .select("created_at")
    .eq("page_id", id)
    .eq("status", "active")
    .order("created_at", { ascending: true });

  // 4. PROCESS HISTORY (Last 30 Days)
  const price = page.page_prices?.[0]?.amount || 0;
  const history = [];
  const today = new Date();

  // Create an array for the last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0]; // "2023-10-25"

    // Count how many members existed ON or BEFORE this specific date
    // (This creates a cumulative "Growth" chart)
    const countOnDay =
      members?.filter(
        (m) =>
          new Date(m.created_at) <= new Date(date.setHours(23, 59, 59, 999)),
      ).length || 0;

    history.push({
      day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), // "Oct 25"
      subscribers: countOnDay,
      revenue: countOnDay * price,
    });
  }

  // 5. Calculate Totals
  const totalMembers = members?.length || 0;
  const totalRevenue = totalMembers * price;

  // 6. Structure Data
  const stats = {
    id: page.id,
    name: page.name,
    slug: page.slug,
    iconUrl: page.icon_url,
    revenue: totalRevenue,
    subscribers: totalMembers,
    views: page.views || 0,
    retention: 100, // Placeholder until we track cancellations
    history: history, // <--- PASSING REAL GRAPH DATA
  };

  return <SinglePageDashboard stats={stats} />;
}
