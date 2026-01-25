import { NextResponse } from "next/server";
import {
  verifyKey,
  InteractionType,
  InteractionResponseType,
} from "discord-interactions";
import { createClient } from "@supabase/supabase-js";

// --- CONFIG ---
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!; // Get this from Discord Portal
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

export async function POST(req: Request) {
  // 1. Verify Request Signature (Security Requirement)
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");
  const bodyText = await req.text();

  if (!signature || !timestamp || !PUBLIC_KEY) {
    return NextResponse.json(
      { error: "Bad Request Signature" },
      { status: 401 },
    );
  }

  const isValidRequest = verifyKey(bodyText, signature, timestamp, PUBLIC_KEY);
  if (!isValidRequest) {
    return NextResponse.json(
      { error: "Bad Request Signature" },
      { status: 401 },
    );
  }

  const interaction = JSON.parse(bodyText);

  // 2. Handle PING (Discord checks if we are alive)
  if (interaction.type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  // 3. Handle COMMANDS (/connect)
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === "connect") {
      const pageId = interaction.data.options[0].value;
      const guildId = interaction.guild_id;
      const adminId = interaction.member.user.id;
      // Note: Discord API doesn't send guild_name in interaction usually,
      // but we store the ID. We can fetch name later or ignore for MVP.

      // Check Admin Perms (Bitflag check)
      const permissions = BigInt(interaction.member.permissions);
      const ADMIN_FLAG = BigInt(0x8); // 0x8 is Administrator
      if ((permissions & ADMIN_FLAG) !== ADMIN_FLAG) {
        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "❌ You need **Administrator** permissions.",
            flags: 64,
          }, // 64 = Ephemeral (Only user sees it)
        });
      }

      // UPDATE DATABASE
      const { data, error } = await supabase
        .from("page_discord_config")
        .update({
          guild_id: guildId,
          admin_id: adminId,
          connected_at: new Date().toISOString(),
          // We might not get guild_name easily here without another API call,
          // so for MVP we can set a placeholder or fetch it if needed.
          guild_name: "Connected Server",
        })
        .eq("page_id", pageId)
        .select();

      if (error || data.length === 0) {
        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: "❌ **Error:** Invalid Page ID or Database Error." },
        });
      }

      return NextResponse.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: `✅ **Success!** Linked to SubStarter Page.` },
      });
    }
  }

  return NextResponse.json({ error: "Unknown Command" }, { status: 400 });
}
