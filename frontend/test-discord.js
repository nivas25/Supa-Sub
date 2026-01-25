// test-discord.js
require("dotenv").config({ path: ".env.local" });
const http = require("http");
const { verifyKey } = require("discord-interactions");

const PORT = 3001; // Different port to avoid Next.js conflicts
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

if (!PUBLIC_KEY) {
  console.error("❌ Error: DISCORD_PUBLIC_KEY is missing from .env.local");
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/discord") {
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];

    // Read Body
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const bodyBuffer = Buffer.concat(buffers);
    const bodyText = bodyBuffer.toString("utf-8");

    console.log("⚡️ [Node Server] Hit!");

    // Verify
    const isValid = verifyKey(bodyBuffer, signature, timestamp, PUBLIC_KEY);
    if (!isValid) {
      console.log("❌ [Node Server] Invalid Signature");
      res.writeHead(401);
      res.end("Bad Signature");
      return;
    }

    const interaction = JSON.parse(bodyText);

    if (interaction.type === 1) {
      console.log("✅ [Node Server] PING -> PONG");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ type: 1 }));
      return;
    }
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`\n🛡️  STANDALONE TEST SERVER RUNNING ON PORT ${PORT}`);
  console.log(`🔑 Using Key: ${PUBLIC_KEY.substring(0, 10)}...`);
});
