// src/discord/handler.js
import { verifyDiscordRequest, generateDiscordInvite } from "./utils.js";
import { getSupabase } from "../db/supabase.js";

export async function handleDiscordRequest(request, env) {
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  const body = await request.text();

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

  // 1. PING
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. COMMAND: /connect
  if (interaction.type === 2 && interaction.data.name === "connect") {
    const pageId = interaction.data.options[0].value;
    const { guildName, inviteLink } = await generateDiscordInvite(
      interaction.guild_id,
      interaction.channel_id,
      env.DISCORD_BOT_TOKEN,
    );

    const supabase = getSupabase(env);
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

    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: "✅ **Success!** Linked to SubStarter." },
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ error: "Unknown" }), { status: 400 });
}
