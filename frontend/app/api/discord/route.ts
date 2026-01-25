import { NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";

// 1. FORCE NODEJS RUNTIME
export const runtime = "nodejs";

// 2. HARDCODE THE *NEW* PUBLIC KEY HERE
// (Paste your key inside these quotes)
const PUBLIC_KEY = "YOUR_NEW_PUBLIC_KEY_HERE";

export async function POST(req: Request) {
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");

  // 3. READ BODY AS RAW BUFFER
  const blob = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(blob);

  // 🚨 TYPESCRIPT FIX: Check for missing headers BEFORE using them
  if (!signature || !timestamp) {
    return new Response("Missing Request Signatures", { status: 401 });
  }

  // 4. VERIFY (Now TypeScript knows 'signature' and 'timestamp' are definitely strings)
  const isValid = verifyKey(bodyBuffer, signature, timestamp, PUBLIC_KEY);

  if (!isValid) {
    return new Response("Bad Signature", { status: 401 });
  }

  const interaction = JSON.parse(bodyBuffer.toString("utf-8"));

  // 5. PING (Handshake)
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // COMMANDS
  if (interaction.type === 2) {
    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: "✅ It Works!" },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response("Unknown", { status: 400 });
}
