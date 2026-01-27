// src/discord/utils.js

// 1. Verify Request Signature (Security for Cloudflare)
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
      { name: "NODE-ED25519", namedCurve: "NODE-ED25519" },
      false,
      ["verify"],
    );

    const encoder = new TextEncoder();
    const signatureData = hexToUint8Array(signature);
    const timestampData = encoder.encode(timestamp);
    const bodyData = encoder.encode(body);

    // Concatenate timestamp + body
    const message = new Uint8Array(timestampData.length + bodyData.length);
    message.set(timestampData);
    message.set(bodyData, timestampData.length);

    return await crypto.subtle.verify(
      "NODE-ED25519",
      key,
      signatureData,
      message,
    );
  } catch (e) {
    console.error("Signature verification failed:", e);
    return false;
  }
}

function hexToUint8Array(hex) {
  const match = hex.match(/.{1,2}/g);
  return new Uint8Array(match ? match.map((byte) => parseInt(byte, 16)) : []);
}

// 2. Generate Invite Link (Used in /connect)
export async function generateDiscordInvite(guildId, channelId, token) {
  try {
    // A. Get Guild Name
    const guildReq = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}`,
      { headers: { Authorization: `Bot ${token}` } },
    );
    const guildInfo = await guildReq.json();

    // B. Create Invite to Channel
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
    console.error("Error generating invite:", e);
    return { guildName: null, inviteLink: null };
  }
}

// 3. Add Role to User (Used in /activate)
export async function addRoleToUser(guildId, userId, roleId, botToken) {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bot ${botToken}` },
      },
    );
    // 204 means Success (No Content returned)
    return res.status === 204;
  } catch (e) {
    console.error("Role assignment error:", e);
    return false;
  }
}
