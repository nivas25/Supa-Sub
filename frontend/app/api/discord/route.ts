import { NextResponse } from "next/server";
import {
  verifyKey,
  InteractionType,
  InteractionResponseType,
} from "discord-interactions";
import { createClient } from "@supabase/supabase-js";

// --- CONFIG ---
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("X-Signature-Ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");
    const bodyText = await req.text();

    if (!signature || !timestamp || !PUBLIC_KEY) {
      console.error("❌ Missing Headers or Public Key");
      return NextResponse.json({ error: "Bad Request" }, { status: 401 });
    }

    const isValidRequest = verifyKey(
      bodyText,
      signature,
      timestamp,
      PUBLIC_KEY,
    );
    if (!isValidRequest) {
      console.error("❌ Invalid Signature");
      return NextResponse.json(
        { error: "Bad Request Signature" },
        { status: 401 },
      );
    }

    const interaction = JSON.parse(bodyText);

    // --- 1. HANDLE PING (This allows you to Save in Discord Portal) ---
    if (interaction.type === InteractionType.PING) {
      console.log("✅ PING Received. Responding PONG.");
      return NextResponse.json({ type: InteractionResponseType.PONG });
    }

    // --- 2. HANDLE COMMANDS ---
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      if (interaction.data.name === "connect") {
        console.log("🔹 /connect command received");

        // Extract Data safely
        const pageId = interaction.data.options?.[0]?.value;
        const guildId = interaction.guild_id;
        const adminId = interaction.member?.user?.id;

        if (!pageId) {
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: "❌ Error: Missing Page ID." },
          });
        }

        // Database Update wrapped in Try/Catch
        try {
          const { data, error } = await supabase
            .from("page_discord_config")
            .update({
              guild_id: guildId,
              admin_id: adminId,
              connected_at: new Date().toISOString(),
              guild_name: "Connected Server",
            })
            .eq("page_id", pageId)
            .select();

          if (error) {
            console.error("❌ Supabase Error:", error);
            return NextResponse.json({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: { content: `❌ Database Error: ${error.message}` },
            });
          }

          if (!data || data.length === 0) {
            console.error("❌ No row found for page_id:", pageId);
            return NextResponse.json({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content:
                  "❌ **Page Not Found.** Did you generate the ID in Creator Studio?",
              },
            });
          }

          console.log("✅ Database Updated Successfully");
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: `✅ **Success!** Server linked.` },
          });
        } catch (dbErr) {
          console.error("❌ Critical DB Crash:", dbErr);
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: "❌ Internal Database Error." },
          });
        }
      }
    }

    return NextResponse.json({ error: "Unknown Command" }, { status: 400 });
  } catch (err) {
    console.error("❌ Global Crash:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
