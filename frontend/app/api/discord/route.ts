import { NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";
import { createClient } from "@supabase/supabase-js";

// 1. FORCE NODE.JS RUNTIME (Critical for Discord Security)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 2. CONFIGURATION
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

export async function POST(req: Request) {
  try {
    // 3. READ HEADERS
    const signature = req.headers.get("X-Signature-Ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");

    // 4. READ BODY AS BUFFER (Fixes all verification errors)
    const blob = await req.arrayBuffer();
    const bodyBuffer = Buffer.from(blob);
    const bodyText = bodyBuffer.toString("utf-8");

    // 5. CHECK FOR MISSING KEYS
    if (!signature || !timestamp || !PUBLIC_KEY) {
      console.error("❌ Missing Config: Check Vercel Environment Variables");
      return NextResponse.json(
        { error: "Configuration Error" },
        { status: 401 },
      );
    }

    // 6. VERIFY SIGNATURE
    const isValidRequest = verifyKey(
      bodyBuffer,
      signature,
      timestamp,
      PUBLIC_KEY,
    );
    if (!isValidRequest) {
      console.error("❌ Invalid Signature: Key does not match");
      return NextResponse.json(
        { error: "Bad Request Signature" },
        { status: 401 },
      );
    }

    const interaction = JSON.parse(bodyText);

    // --- PING (Handshake) ---
    if (interaction.type === 1) {
      console.log("✅ PING received. Sending PONG.");
      return NextResponse.json({ type: 1 });
    }

    // --- COMMANDS (/connect) ---
    if (interaction.type === 2) {
      if (interaction.data.name === "connect") {
        const pageId = interaction.data.options?.[0]?.value;
        const guildId = interaction.guild_id;
        const adminId = interaction.member?.user?.id;

        console.log(`🔹 Linking Page ${pageId} to Guild ${guildId}`);

        // Update Database
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
          console.error("DB Error:", error);
          return NextResponse.json({
            type: 4,
            data: {
              content: "❌ **Error:** Database update failed. Check Page ID.",
            },
          });
        }

        if (!data || data.length === 0) {
          return NextResponse.json({
            type: 4,
            data: {
              content:
                "❌ **Page Not Found.** Generate an ID in Creator Studio first.",
            },
          });
        }

        return NextResponse.json({
          type: 4,
          data: {
            content:
              "✅ **Success!** This server is now linked to your SubStarter page.",
          },
        });
      }
    }

    return NextResponse.json({ error: "Unknown Command" }, { status: 400 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
