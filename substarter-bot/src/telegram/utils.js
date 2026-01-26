// src/telegram/utils.js
export async function sendMessage(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
}

export async function createOneTimeInvite(token, chatId, name) {
  const res = await fetch(
    `https://api.telegram.org/bot${token}/createChatInviteLink`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        member_limit: 1, // STRICT 1 USE LIMIT
        name: name,
        expire_date: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 Hour
      }),
    },
  );
  return await res.json();
}
