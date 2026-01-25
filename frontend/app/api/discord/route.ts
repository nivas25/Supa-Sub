import { NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;

export async function POST(req: Request) {
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");
  const bodyText = await req.text();

  console.log("⚡️ INCOMING REQUEST"); // Look for this in your VS Code Terminal

  if (!signature || !timestamp || !PUBLIC_KEY) {
    return NextResponse.json({ error: "Bad Request" }, { status: 401 });
  }

  const isValidRequest = verifyKey(bodyText, signature, timestamp, PUBLIC_KEY);
  if (!isValidRequest) {
    console.error("❌ Invalid Signature");
    return NextResponse.json(
      { error: "Bad Request Signature" },
      { status: 401 },
    );
  }

  const interaction = JSON.parse(bodyText);

  // 1. PING (Type 1)
  if (interaction.type === 1) {
    console.log("✅ PING (Type 1) - Returning PONG (Type 1)");
    return NextResponse.json({ type: 1 });
  }

  // 2. COMMAND (Type 2)
  if (interaction.type === 2) {
    if (interaction.data.name === "connect") {
      const pageId = interaction.data.options?.[0]?.value;

      console.log("✅ COMMAND (Type 2) - Page ID:", pageId);

      // Return Type 4 (CHANNEL_MESSAGE_WITH_SOURCE)
      return NextResponse.json({
        type: 4,
        data: {
          content: `👋 **It Works!**\nReceived ID: \`${pageId}\`\n(Database check skipped for test)`,
        },
      });
    }
  }

  return NextResponse.json({ error: "Unknown Command" }, { status: 400 });
}
