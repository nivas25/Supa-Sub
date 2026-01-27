// src/discord/handler.js
import {
  verifyDiscordRequest,
  generateDiscordInvite,
  addRoleToUser,
} from "./utils.js";
import { getSupabase } from "../db/supabase.js";

// Helper for JSON responses
const jsonResponse = (data) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

export async function handleDiscordRequest(request, env) {
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  const body = await request.text();

  // Security Check
  if (
    !signature ||
    !timestamp ||
    !(await verifyDiscordRequest(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY,
    ))
  ) {
    return new Response("Bad Request Signature", { status: 401 });
  }

  const interaction = JSON.parse(body);

  // 1. PING (Discord Check)
  if (interaction.type === 1) {
    return jsonResponse({ type: 1 });
  }

  const supabase = getSupabase(env);

  // 2. COMMAND: /connect (For Creators)
  if (interaction.type === 2 && interaction.data.name === "connect") {
    const pageId = interaction.data.options[0].value;

    // Get Invite Link
    const { guildName, inviteLink } = await generateDiscordInvite(
      interaction.guild_id,
      interaction.channel_id,
      env.DISCORD_BOT_TOKEN,
    );

    // Save to Database
    await supabase.from("page_discord_config").upsert(
      {
        page_id: pageId,
        guild_id: interaction.guild_id,
        admin_id: interaction.member.user.id,
        guild_name: guildName || "Discord Server",
        channel_id: interaction.channel_id,
        invite_link: inviteLink || null,
        connected_at: new Date().toISOString(),
      },
      { onConflict: "page_id" },
    );

    return jsonResponse({
      type: 4,
      data: { content: `✅ **Success!** Connected to **${guildName}**.` },
    });
  }

  // 3. COMMAND: /activate <MembershipID> (For Subscribers)
  if (interaction.type === 2 && interaction.data.name === "activate") {
    const membershipId = interaction.data.options[0].value;
    const discordUserId = interaction.member.user.id;
    const discordUsername = interaction.member.user.username;

    // A. Verify Membership
    const { data: membership, error } = await supabase
      .from("memberships")
      .select("id, status, page_id")
      .eq("id", membershipId)
      .single();

    if (!membership || membership.status !== "active") {
      return jsonResponse({
        type: 4,
        data: { content: "❌ **Error:** Invalid or expired membership ID." },
      });
    }

    // B. Save Discord User to Database
    await supabase
      .from("memberships")
      .update({
        discord_user_id: discordUserId,
        discord_username: discordUsername,
      })
      .eq("id", membershipId);

    // C. Get Role ID (from Config)
    const { data: config } = await supabase
      .from("page_discord_config")
      .select("role_id")
      .eq("page_id", membership.page_id)
      .single();

    // D. Assign Role
    if (config?.role_id) {
      const roleSuccess = await addRoleToUser(
        interaction.guild_id,
        discordUserId,
        config.role_id,
        env.DISCORD_BOT_TOKEN,
      );

      if (roleSuccess) {
        return jsonResponse({
          type: 4,
          data: { content: "✅ **Verified!** Access granted." },
        });
      } else {
        return jsonResponse({
          type: 4,
          data: {
            content:
              "⚠️ Verified, but I couldn't add the role. (Check Bot permissions)",
          },
        });
      }
    }

    return jsonResponse({
      type: 4,
      data: {
        content: "✅ **Verified!** (No role configured for this page yet).",
      },
    });
  }

  return new Response("Unknown Command", { status: 400 });
}
