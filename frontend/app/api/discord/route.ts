import { NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";

// 1. FORCE NODEJS (Critical)
export const runtime = "nodejs";

// 2. HARDCODE KEY (Paste your NEW key inside the quotes)
const PUBLIC_KEY =
  "f5c4e0efdac941e8f609a5d247ad54d4fc8285e2f9afe91278465ceabf023926";

export async function POST(req: Request) {
  // 3. FIX BUILD ERROR: Handle null headers safely
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");

  if (!signature || !timestamp) {
    return new Response("Missing Headers", { status: 401 });
  }

  const blob = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(blob);

  // 4. VERIFY
  const isValid = verifyKey(bodyBuffer, signature, timestamp, PUBLIC_KEY);
  if (!isValid) {
    return new Response("Bad Signature", { status: 401 });
  }

  const interaction = JSON.parse(bodyBuffer.toString("utf-8"));

  // 5. PING RESPONSE (Fastest possible JSON)
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("OK", { status: 200 });
}
