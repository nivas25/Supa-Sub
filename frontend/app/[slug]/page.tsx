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

  // 1. Fetch Page
  const { data: page } = await supabase
    .from("pages")
    .select("*, owner:profiles(*)")
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

  // 3. Fetch Configs
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

  // 4. Check Membership (Fetch Discord/Telegram IDs)
  let existingMembership = null;
  if (user) {
    const { data: members } = await supabase
      .from("memberships")
      .select("*, discord_user_id, telegram_user_id") // Explicitly select these
      .eq("user_id", user.id)
      .eq("page_id", page.id)
      .eq("status", "active")
      .limit(1);
    if (members && members.length > 0) existingMembership = members[0];
  }

  // 5. Map Props
  const platforms = {
    telegram: {
      enabled: !!telegramConfig,
      title: telegramConfig?.title || "VIP Channel",
    },
    discord: {
      enabled: !!discordConfig,
      title: discordConfig?.title || "Community Server",
    },
    whatsapp: {
      enabled: !!whatsappConfig,
      link: whatsappConfig?.invite_link || "",
      title: whatsappConfig?.title || "Member Group",
    },
  };

  return (
    <main>
      <PublicProfile
        pageId={page.id}
        name={page.name}
        bio={page.description}
        handle={page.slug}
        avatarUrl={page.icon_url}
        bannerUrl={page.banner_url}
        features={page.features || []}
        welcomeMessage={page.welcome_message}
        terms={page.terms}
        themeColor={page.theme_color}
        buttonText={page.button_text}
        buttonStyle={page.button_style}
        fontStyle={page.font_style}
        socialLinks={page.social_links || []}
        prices={prices}
        platforms={platforms}
        existingMembership={existingMembership}
      />
    </main>
  );
}
