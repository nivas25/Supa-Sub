import { NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";

// Ensure Node runtime (discord-interactions uses Node crypto)
export const runtime = "nodejs";
// Avoid caching the route in Vercel edge cache
export const dynamic = "force-dynamic";
// Prefer the same region shown in Vercel logs (iad1) to reduce cold start
export const preferredRegion = ["iad1"];

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

export async function GET() {
  return new NextResponse("ok", { status: 200 });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

export async function POST(req: Request) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");

  if (!signature || !timestamp || !PUBLIC_KEY) {
    console.error("❌ Missing signature/timestamp/public key");
    return NextResponse.json({ error: "Bad Request" }, { status: 401 });
  }

  const bodyText = await req.text(); // raw body required for signature validation
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
