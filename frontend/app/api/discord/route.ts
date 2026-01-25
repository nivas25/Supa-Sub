import { NextResponse } from "next/server";
import {
  verifyKey,
  InteractionType,
  InteractionResponseType,
} from "discord-interactions";
import { createClient } from "@supabase/supabase-js";

// --- CONFIG ---
// We use ! to tell TS these definitely exist (since we verified them)
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Init Supabase with Service Role (Admin Access)
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

export async function POST(req: Request) {
  // 1. Verify Request Signature (Critical Security Step)
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

  // 2. Handle PING (Keep this so Discord doesn't disconnect you)
  if (interaction.type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  // 3. Handle COMMANDS (/connect)
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === "connect") {
      const pageId = interaction.data.options[0].value;
      const guildId = interaction.guild_id;
      const adminId = interaction.member.user.id;

      // Check Admin Perms (Bitflag check)
      // 0x8 is the bit for ADMINISTRATOR
      const permissions = BigInt(interaction.member.permissions);
      const ADMIN_FLAG = BigInt(0x8);

      if ((permissions & ADMIN_FLAG) !== ADMIN_FLAG) {
        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content:
              "❌ **Permission Denied.** You need Administrator privileges to link this server.",
            flags: 64, // Ephemeral (Only user sees it)
          },
        });
      }

      // UPDATE DATABASE
      // We look for the row with this page_id and link the discord info to it
      const { data, error } = await supabase
        .from("page_discord_config")
        .update({
          guild_id: guildId,
          admin_id: adminId,
          connected_at: new Date().toISOString(),
          guild_name: "Connected Server", // Placeholder until we fetch real name, or bot can just say "Connected"
        })
        .eq("page_id", pageId)
        .select();

      if (error || data.length === 0) {
        console.error("DB Error:", error);
        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "❌ **Error:** Invalid Connection ID or Page not found.",
          },
        });
      }

      return NextResponse.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `✅ **Success!** This server is now linked to your SubStarter Page.`,
        },
      });
    }
  }

  return NextResponse.json({ error: "Unknown Command" }, { status: 400 });
}
