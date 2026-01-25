import { NextResponse } from "next/server";
import {
  verifyKey,
  InteractionType,
  InteractionResponseType,
} from "discord-interactions";

export async function POST(req: Request) {
  // 1. Log to Vercel (So we know if it reached the server)
  console.log("⚡️ Discord Interaction Received");

  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");
  const bodyText = await req.text();

  // 2. Check for missing Headers
  if (!signature || !timestamp) {
    console.error("❌ Missing Headers");
    return NextResponse.json({ error: "Missing Headers" }, { status: 401 });
  }

  // 3. Check for missing Env Var
  if (!process.env.DISCORD_PUBLIC_KEY) {
    console.error("❌ Missing DISCORD_PUBLIC_KEY in Vercel Env");
    return NextResponse.json({ error: "Server Config Error" }, { status: 500 });
  }

  // 4. Verify Signature
  const isValidRequest = verifyKey(
    bodyText,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY,
  );

  if (!isValidRequest) {
    console.error("❌ Invalid Signature (Check your Public Key)");
    return NextResponse.json(
      { error: "Bad Request Signature" },
      { status: 401 },
    );
  }

  const interaction = JSON.parse(bodyText);

  // 5. Handle PING (The part Discord cares about right now)
  if (interaction.type === InteractionType.PING) {
    console.log("✅ PING received! Responding PONG.");
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  // If we get here, the connection works!
  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "✅ Connection Verified! You can now restore the Database code.",
    },
  });
}
