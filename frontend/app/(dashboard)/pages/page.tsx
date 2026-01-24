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

  // 2. Fetch Pages
  const { data: pagesData } = await supabase
    .from("pages")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  // 3. Transform Data
  // We use Promise.all to fetch member counts efficiently
  const realPages = await Promise.all(
    (pagesData || []).map(async (page) => {
      // Count subscribers
      const { count: memberCount } = await supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("page_id", page.id)
        .eq("status", "active");

      return {
        id: page.id,
        slug: page.slug,

        // --- THE FIX IS HERE ---
        name: page.name, // Send 'name' (not title)
        views: page.views || 0, // Send 'views' (not visits)
        subscribers: memberCount || 0,
        status: page.status,
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
