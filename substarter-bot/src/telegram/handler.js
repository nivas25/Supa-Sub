// src/telegram/handler.js
import { sendMessage, createOneTimeInvite } from "./utils.js";
import { getSupabase } from "../db/supabase.js";

export async function handleTelegramRequest(request, env) {
  try {
    const body = await request.json();
    const supabase = getSupabase(env);

    // 1. AUTO-MIGRATION (If Group ID Changes)
    if (body.message?.migrate_to_chat_id) {
      const oldId = body.message.chat.id.toString();
      const newId = body.message.migrate_to_chat_id.toString();
      await supabase
        .from("page_telegram_config")
        .update({ chat_id: newId })
        .eq("chat_id", oldId);
      return new Response("OK");
    }

    if (!body.message?.text) return new Response("OK");

    const { chat, text, from } = body.message;
    const chatId = chat.id;

    // 2. COMMAND: /connect
    if (text.startsWith("/connect")) {
      const pageId = text.split(" ")[1];
      if (pageId) {
        const { data: page } = await supabase
          .from("pages")
          .select("name")
          .eq("id", pageId)
          .single();
        if (page) {
          if (chat.type === "private") {
            await sendMessage(
              env.TELEGRAM_BOT_TOKEN,
              chatId,
              "⚠️ Run this inside your **Group**, not here.",
            );
          } else {
            await supabase.from("page_telegram_config").upsert(
              {
                page_id: pageId,
                chat_id: chatId.toString(),
                is_enabled: true,
                title: chat.title,
              },
              { onConflict: "page_id" },
            );

            await sendMessage(
              env.TELEGRAM_BOT_TOKEN,
              chatId,
              `✅ **Connected to ${page.name}!**\nPromote me to **Admin** right now.`,
            );
          }
        }
      }
    }
    // 3. JOIN: /start
    else if (text.startsWith("/start")) {
      const membershipId = text.split(" ")[1];
      if (membershipId) {
        const { data: mem } = await supabase
          .from("memberships")
          .select("status, page_id, pages(name)")
          .eq("id", membershipId)
          .single();

        if (mem && mem.status === "active") {
          const { data: conf } = await supabase
            .from("page_telegram_config")
            .select("chat_id")
            .eq("page_id", mem.page_id)
            .single();

          if (conf?.chat_id) {
            await supabase
              .from("memberships")
              .update({
                telegram_user_id: from.id,
                telegram_username: from.username,
              })
              .eq("id", membershipId);

            const invite = await createOneTimeInvite(
              env.TELEGRAM_BOT_TOKEN,
              conf.chat_id,
              `Member: ${membershipId.slice(0, 5)}`,
            );

            if (invite.ok) {
              await sendMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                `🎉 **Welcome to ${mem.pages.name}!**\nLink: ${invite.result.invite_link}`,
              );
            } else {
              await sendMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                "❌ Error: Creator needs to promote me to Admin.",
              );
            }
          } else {
            await sendMessage(
              env.TELEGRAM_BOT_TOKEN,
              chatId,
              "❌ Group not connected.",
            );
          }
        }
      }
    }

    return new Response("OK");
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
