// src/index.js
import { handleDiscordRequest } from "./discord/handler.js";
import { handleTelegramRequest } from "./telegram/handler.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // --- ROUTE 1: DISCORD (/discord) ---
    if (request.method === "POST" && url.pathname === "/discord") {
      return await handleDiscordRequest(request, env);
    }

    // --- ROUTE 2: TELEGRAM (/telegram) ---
    if (request.method === "POST" && url.pathname === "/telegram") {
      return await handleTelegramRequest(request, env);
    }

    // --- 404 FOR ANYTHING ELSE ---
    return new Response("Not Found. Use /discord or /telegram endpoints.", {
      status: 404,
    });
  },
};
