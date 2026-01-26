// src/discord/utils.js
export async function verifyDiscordRequest(
  body,
  signature,
  timestamp,
  publicKey,
) {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      hexToUint8Array(publicKey),
      { name: "Ed25519" },
      false,
      ["verify"],
    );
    const encoder = new TextEncoder();
    const message = new Uint8Array(
      encoder.encode(timestamp).length + encoder.encode(body).length,
    );
    message.set(encoder.encode(timestamp));
    message.set(encoder.encode(body), encoder.encode(timestamp).length);
    return await crypto.subtle.verify(
      "Ed25519",
      key,
      hexToUint8Array(signature),
      message,
    );
  } catch {
    return false;
  }
}

function hexToUint8Array(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

export async function generateDiscordInvite(guildId, channelId, token) {
  try {
    const guildReq = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}`,
      { headers: { Authorization: `Bot ${token}` } },
    );
    const guildInfo = await guildReq.json();
    let inviteLink = null;
    if (channelId) {
      const inviteReq = await fetch(
        `https://discord.com/api/v10/channels/${channelId}/invites`,
        {
          method: "POST",
          headers: {
            Authorization: `Bot ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ max_age: 0, max_uses: 0, unique: false }),
        },
      );
      const inviteData = await inviteReq.json();
      if (inviteData.code) inviteLink = `https://discord.gg/${inviteData.code}`;
    }
    return { guildName: guildInfo.name, inviteLink };
  } catch (e) {
    return { guildName: null, inviteLink: null };
  }
}
