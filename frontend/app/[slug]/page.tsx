import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PublicProfile from "@/components/public/PublicProfile";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Fetch the Page (Product) by Slug
  const { data: page } = await supabase
    .from("pages")
    .select("*, owner:profiles(*)") // Fetch owner details if needed
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (!page) return notFound();

  // 2. Fetch Prices
  const { data: priceData } = await supabase
    .from("page_prices")
    .select("*")
    .eq("page_id", page.id);

  const prices = priceData || [];

  // 3. Fetch Platform Configs (To see what is enabled)
  const { data: telegramConfig } = await supabase
    .from("page_telegram_config")
    .select("*")
    .eq("page_id", page.id)
    .single();

  const { data: discordConfig } = await supabase
    .from("page_discord_config")
    .select("*")
    .eq("page_id", page.id)
    .single();

  const { data: whatsappConfig } = await supabase
    .from("page_whatsapp_config")
    .select("*")
    .eq("page_id", page.id)
    .single();

  // 4. Get Real Member Count
  const { count: realMemberCount } = await supabase
    .from("memberships")
    .select("*", { count: "exact", head: true })
    .eq("page_id", page.id)
    .eq("status", "active");

  // 5. Check if User is a Member
  let existingMembership = null;
  if (user) {
    const { data: members } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", user.id)
      .eq("page_id", page.id)
      .eq("status", "active")
      .limit(1);
    if (members && members.length > 0) existingMembership = members[0];
  }

  // 6. Map to UI Props
  const platforms = {
    telegram: {
      enabled: !!telegramConfig,
      link: telegramConfig?.invite_link || "", // Public link if available
      title: "VIP Channel",
    },
    discord: {
      enabled: !!discordConfig,
      link: discordConfig?.invite_link || "",
      title: "Community Server",
    },
    whatsapp: {
      enabled: !!whatsappConfig,
      link: whatsappConfig?.invite_link || "",
      title: "Member Group",
    },
  };

  return (
    <main>
      <PublicProfile
        // Identity
        name={page.name}
        bio={page.description}
        handle={page.slug}
        avatarUrl={page.icon_url}
        bannerUrl={page.banner_url}
        // Data
        prices={prices}
        memberCount={realMemberCount || 0}
        platforms={platforms}
        existingMembership={existingMembership}
        groupId={page.id} // We pass page.id as groupId for analytics
        // Content
        features={page.features || []}
        welcomeMessage={page.welcome_message}
        terms={page.terms}
      />
    </main>
  );
}
