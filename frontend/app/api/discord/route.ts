\import { NextResponse } from "next/server";
// REMOVED: import nacl ... (We don't need it!)

// 1. FORCE NODEJS RUNTIME
export const runtime = 'nodejs'; 

// 2. PASTE YOUR PUBLIC KEY HERE (Inside quotes)
const PUBLIC_KEY = "f5c4e0efdac941e8f609a5d247ad54d4fc8285e2f9afe91278465ceabf023926";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("X-Signature-Ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");

    if (!signature || !timestamp) {
      return new Response("Missing Headers", { status: 401 });
    }

    // 3. READ BODY
    const blob = await req.arrayBuffer();
    const bodyBuffer = Buffer.from(blob);

    // 4. VERIFY (Using Built-in Node Crypto)
    const isVerified = await verifyDiscordRequest(
      PUBLIC_KEY,
      signature,
      timestamp,
      bodyBuffer
    );

    if (!isVerified) {
      return new Response("Bad Signature", { status: 401 });
    }

    const interaction = JSON.parse(bodyBuffer.toString("utf-8"));

    // 5. PING (Handshake)
    if (interaction.type === 1) {
      return new Response(JSON.stringify({ type: 1 }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 6. COMMANDS
    if (interaction.type === 2) {
      return new Response(JSON.stringify({
        type: 4,
        data: { content: "✅ Connection Successful!" }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response("Server Error", { status: 500 });
  }
}

// --- HELPER: VERIFY SIGNATURE WITHOUT LIBRARIES ---
async function verifyDiscordRequest(clientKey: string, signature: string, timestamp: string, body: Buffer) {
  // Dynamic import avoids build errors
  const { webcrypto } = await import('node:crypto');
  
  // @ts-ignore
  const key = await webcrypto.subtle.importKey(
    "raw",
    Buffer.from(clientKey, "hex"),
    { name: "Ed25519" },
    false,
    ["verify"]
  );

  const signatureBuffer = Buffer.from(signature, "hex");
  const timestampBuffer = Buffer.from(timestamp, "utf-8");
  const data = Buffer.concat([timestampBuffer, body]);

  // @ts-ignore
  return await webcrypto.subtle.verify(
    "Ed25519",
    key,
    signatureBuffer,
    data
  );
}