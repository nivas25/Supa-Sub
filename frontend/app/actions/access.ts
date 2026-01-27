"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSecureDiscordInvite(pageId: string) {
  const supabase = await createClient();

  // 1. Check User Session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  // 2. Strict Membership Check
  const { data: membership } = await supabase
    .from("memberships")
    .select("status, expires_at")
    .eq("user_id", user.id)
    .eq("page_id", pageId)
    .eq("status", "active") // Ensure this matches your DB ('active' vs 'Active')
    .single();

  if (!membership) {
    return { error: "Access denied. Active membership not found." };
  }

  // Check Expiration
  if (membership.expires_at && new Date(membership.expires_at) < new Date()) {
    return { error: "Your membership has expired. Please renew." };
  }

  // 3. Get Discord Configuration (Specifically the Channel ID)
  const { data: config } = await supabase
    .from("page_discord_config")
    .select("channel_id, guild_id")
    .eq("page_id", pageId)
    .single();

  if (!config || !config.channel_id) {
    return {
      error:
        "Discord not fully connected. Creator must run /connect in a specific channel.",
    };
  }

  // 4. GENERATE 1-TIME LINK (The Secure Part)
  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${config.channel_id}/invites`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_age: 600, // Expires in 10 minutes
          max_uses: 1, // Works only ONCE
          unique: true, // Forces a new code every time
          temporary: false, // User stays in server after joining
        }),
      },
    );

    if (!response.ok) {
      console.error("Discord API Error:", await response.text());
      return {
        error:
          "Failed to generate invite. Bot may lack 'Create Invite' permissions.",
      };
    }

    const inviteData = await response.json();

    // 5. Return the secure URL
    return { url: `https://discord.gg/${inviteData.code}` };
  } catch (err) {
    console.error("Invite Generation Failed:", err);
    return { error: "Internal server error connecting to Discord." };
  }
}
