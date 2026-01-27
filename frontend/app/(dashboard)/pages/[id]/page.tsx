import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PublicProfile from "@/components/public/PublicProfile";

// This helps Next.js cache the page for better performance
export const revalidate = 60;

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;

  // 1. Fetch Page Details
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) return notFound();

  // 2. Register View (Increment View Count)
  // We do this lazily so it doesn't block the page load
  await supabase.rpc("increment_page_view", { page_id: page.id });

  // 3. Fetch Prices
  const { data: prices } = await supabase
    .from("page_prices")
    .select("amount, interval")
    .eq("page_id", page.id)
    .order("amount", { ascending: true });

  // 4. Fetch Platform Configs (To see what is enabled)
  const { data: telegram } = await supabase
    .from("page_telegram_config")
    .select("*")
    .eq("page_id", page.id)
    .single();
  const { data: discord } = await supabase
    .from("page_discord_config")
    .select("*")
    .eq("page_id", page.id)
    .single();
  const { data: whatsapp } = await supabase
    .from("page_whatsapp_config")
    .select("*")
    .eq("page_id", page.id)
    .single();

  // 5. Fetch Member Count
  const { count: memberCount } = await supabase
    .from("memberships")
    .select("*", { count: "exact", head: true })
    .eq("page_id", page.id)
    .eq("status", "active");

  // 6. Check if Current User is a Member (For "Access" view)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let existingMembership = null;

  if (user) {
    const { data: mem } = await supabase
      .from("memberships")
      .select("id, expires_at, status")
      .eq("user_id", user.id)
      .eq("page_id", page.id)
      .eq("status", "active")
      .single();
    existingMembership = mem;
  }

  // 7. Structure Data for Component
  const platformData = {
    telegram: {
      enabled: !!telegram, // If row exists, it's enabled
      link: "", // Telegram uses Bot logic, no static link
      title: "Telegram Group",
    },
    discord: {
      enabled: !!discord,
      link: discord?.invite_link || "",
      title: "Discord Server",
    },
    whatsapp: {
      enabled: !!whatsapp,
      link: whatsapp?.invite_link || "",
      title: "WhatsApp Group",
    },
  };

  return (
    <PublicProfile
      pageId={page.id}
      name={page.name}
      bio={page.description}
      handle={page.slug}
      avatarUrl={page.icon_url}
      bannerUrl={page.banner_url}
      prices={prices || []}
      platforms={platformData}
      existingMembership={existingMembership}
      features={page.features || []}
      welcomeMessage={page.welcome_message}
      terms={page.terms}
    />
  );
}
