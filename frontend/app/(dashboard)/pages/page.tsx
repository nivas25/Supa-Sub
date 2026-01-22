import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PagesHeader from "@/components/pages/PagesHeader";
import PagesList from "@/components/pages/PagesList";

export default async function PagesDashboard() {
  const supabase = await createClient();

  // 1. Get User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // 2. Fetch Creator Profile (To get the Link/Username)
  const { data: creator } = await supabase
    .from("creators")
    .select("username")
    .eq("id", user.id)
    .single();

  // 3. Fetch Groups
  const { data: groups } = await supabase
    .from("groups")
    .select("*")
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false });

  // 4. GET REAL STATS (The Fix)
  // We use Promise.all to fetch the member count for EACH group in parallel
  const realPages = await Promise.all(
    (groups || []).map(async (group) => {
      // A. Count Active Memberships for this group
      const { count: memberCount } = await supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("group_id", group.id)
        .eq("status", "active");

      return {
        id: group.id,
        slug: creator?.username || "username",
        title: group.name,
        subscribers: memberCount || 0, // <--- REAL DATABASE COUNT
        visits: group.views || 0, // <--- NOW USING REAL DB DATA
        status: group.status as "active" | "draft",
      };
    }),
  );

  return (
    <main
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}
    >
      <PagesHeader count={realPages.length} />
      <PagesList pages={realPages} />
    </main>
  );
}
