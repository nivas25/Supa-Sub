import { NextResponse } from "next/server";
import nacl from "tweetnacl"; // We will use this or pure crypto if installed, but let's stick to a raw buffer check first.

// 1. FORCE NODEJS & MUMBAI REGION OPTIMIZATION
export const runtime = "nodejs";

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;

export async function POST(req: Request) {
  // 2. TIMEOUT PROTECTION: Check if keys exist immediately
  if (!PUBLIC_KEY) {
    return new Response("Error: Missing Public Key", { status: 500 });
  }

  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");

  if (!signature || !timestamp) {
    return new Response("Error: Missing Headers", { status: 401 });
  }

  // 3. READ BODY RAW (Fastest method)
  const blob = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(blob);

  // 4. VERIFY USING PURE CRYPTO (No 'discord-interactions' dependency)
  // We need to import 'crypto' dynamically to avoid build errors
  const { webcrypto } = await import("node:crypto");

  // Custom Verification Logic to bypass library issues
  try {
    const isVerified = await verifyDiscordRequest(
      PUBLIC_KEY,
      signature,
      timestamp,
      bodyBuffer,
    );

    if (!isVerified) {
      return new Response("Invalid Signature", { status: 401 });
    }
  } catch (e) {
    return new Response("Crypto Error", { status: 401 });
  }

  const interaction = JSON.parse(bodyBuffer.toString("utf-8"));

  // 5. IMMEDIATE PONG (Handshake)
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 6. COMMANDS
  if (interaction.type === 2) {
    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: "✅ Connection Successful!" },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response("Unknown", { status: 400 });
}

// Helper: Pure Crypto Verification
async function verifyDiscordRequest(
  clientKey: string,
  signature: string,
  timestamp: string,
  body: Buffer,
) {
  const { webcrypto } = await import("node:crypto");
  // @ts-ignore
  const key = await webcrypto.subtle.importKey(
    "raw",
    Buffer.from(clientKey, "hex"),
    { name: "Ed25519" },
    false,
    ["verify"],
  );

  const signatureBuffer = Buffer.from(signature, "hex");
  const timestampBuffer = Buffer.from(timestamp, "utf-8");
  const data = Buffer.concat([timestampBuffer, body]);

  // @ts-ignore
  return await webcrypto.subtle.verify("Ed25519", key, signatureBuffer, data);
}
