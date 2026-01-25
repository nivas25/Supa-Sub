import { NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";

// 1. FORCE NODEJS RUNTIME
export const runtime = "nodejs";

// 2. HARDCODE THE *NEW* PUBLIC KEY HERE
// Go to Discord Portal -> Copy "Public Key" -> Paste inside quotes
const PUBLIC_KEY = "YOUR_NEW_PUBLIC_KEY_HERE_PASTE_IT";

export async function POST(req: Request) {
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");

  // 3. READ BODY AS RAW BUFFER
  const blob = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(blob);

  // 4. VERIFY
  const isValid = verifyKey(bodyBuffer, signature, timestamp, PUBLIC_KEY);

  if (!isValid) {
    return new Response("Bad Signature", { status: 401 });
  }

  const interaction = JSON.parse(bodyBuffer.toString("utf-8"));

  // 5. PING (Handshake)
  if (interaction.type === 1) {
    // 6. RETURN RAW RESPONSE (No Next.js wrappers)
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
