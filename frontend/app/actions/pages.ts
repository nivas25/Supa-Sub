"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CREATE PAGE ---
export async function createPage(formData: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must be logged in");

  // 1. Insert Page Data
  const { data: page, error } = await supabase
    .from("pages")
    .insert({
      owner_id: user.id,
      slug: formData.slug,
      name: formData.name,
      description: formData.description,
      features: formData.features, // Assumes 'features' is a text[] column
      welcome_message: formData.welcome_message,
      terms: formData.terms,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 2. Insert Prices
  if (formData.prices && formData.prices.length > 0) {
    const prices = formData.prices.map((p: any) => ({
      page_id: page.id,
      amount: p.amount,
      interval: p.interval,
    }));
    await supabase.from("page_prices").insert(prices);
  }

  // 3. Initialize Platforms (Telegram, Discord, WhatsApp)
  await updatePlatformConfigs(supabase, page.id, formData.platforms);

  revalidatePath("/pages");
  return page.id; // Return ID so we can redirect
}

// --- UPDATE PAGE ---
export async function updatePage(pageId: string, formData: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // 1. Update Basic Info
  const { error } = await supabase
    .from("pages")
    .update({
      slug: formData.slug,
      name: formData.name,
      description: formData.description,
      features: formData.features,
      welcome_message: formData.welcome_message,
      terms: formData.terms,
    })
    .eq("id", pageId)
    .eq("owner_id", user.id);

  if (error) throw new Error(error.message);

  // 2. Update Prices (Delete old, Insert new for simplicity)
  // Note: In a real production app, you might want to "archive" old prices instead of deleting.
  await supabase.from("page_prices").delete().eq("page_id", pageId);

  if (formData.prices && formData.prices.length > 0) {
    const prices = formData.prices.map((p: any) => ({
      page_id: pageId,
      amount: p.amount,
      interval: p.interval,
    }));
    await supabase.from("page_prices").insert(prices);
  }

  // 3. Update Platforms
  await updatePlatformConfigs(supabase, pageId, formData.platforms);

  revalidatePath(`/editor/${pageId}`);
  revalidatePath(`/${formData.slug}`); // Update public page cache
}

// --- HELPER: Handle Platform Configs ---
async function updatePlatformConfigs(
  supabase: any,
  pageId: string,
  platforms: any,
) {
  // Telegram (Only update is_enabled, don't overwrite chat_id)
  await supabase.from("page_telegram_config").upsert(
    {
      page_id: pageId,
      is_enabled: platforms.telegram.enabled,
      // We do NOT update chat_id here (the bot does that)
    },
    { onConflict: "page_id" },
  );

  // Discord
  await supabase.from("page_discord_config").upsert(
    {
      page_id: pageId,
      is_enabled: platforms.discord.enabled,
      invite_link: platforms.discord.inviteLink || null,
    },
    { onConflict: "page_id" },
  );

  // WhatsApp
  await supabase.from("page_whatsapp_config").upsert(
    {
      page_id: pageId,
      is_enabled: platforms.whatsapp.enabled,
      invite_link: platforms.whatsapp.inviteLink || null,
    },
    { onConflict: "page_id" },
  );
}
