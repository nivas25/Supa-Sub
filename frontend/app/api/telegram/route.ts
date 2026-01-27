import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Admin Client
const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
);

// --- HELPER: Send Message ---
async function sendMessage(chatId: number | string, text: string) {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
      },
    );
    if (!res.ok) console.error("Telegram Send Error:", await res.text());
  } catch (e) {
    console.error("Fetch Error:", e);
  }
}

// --- HELPER: Create Invite ---
async function createInviteLink(chatId: string, name: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/createChatInviteLink`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        member_limit: 1, // STRICT 1 USE LIMIT
        name: name,
        expire_date: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
      }),
    },
  );
  return await res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Safety check
    if (!body.message) return NextResponse.json({ ok: true });

    // 1. SILENT FIX: If Group ID changed, just update DB and stop.
    // (We don't try to send messages here to avoid loops)
    if (body.message.migrate_to_chat_id) {
      const oldChatId = body.message.chat.id.toString();
      const newChatId = body.message.migrate_to_chat_id.toString();

      await supabaseAdmin
        .from("page_telegram_config")
        .update({ chat_id: newChatId })
        .eq("chat_id", oldChatId);

      return NextResponse.json({ ok: true });
    }

    if (!body.message.text) return NextResponse.json({ ok: true });

    const { chat, text, from } = body.message;
    const chatId = chat.id;
    const chatType = chat.type;

    // --- COMMANDS ---
    if (text.startsWith("/start") || text.startsWith("/connect")) {
      const parts = text.split(" ");
      const payload = parts[1]?.trim();

      // A. NO ID PROVIDED
      if (!payload) {
        if (chatType === "private") {
          await sendMessage(
            chatId,
            "👋 **Hello Creator!**\n\nTo connect a group, go to your Dashboard and click **'Add Bot to Group'**.",
          );
        }
        return NextResponse.json({ ok: true });
      }

      // B. CREATOR SETUP (Connect Page)
      const { data: page } = await supabaseAdmin
        .from("pages")
        .select("id, name")
        .eq("id", payload)
        .single();

      if (page) {
        if (chatType === "private") {
          await sendMessage(
            chatId,
            "⚠️ **Wrong Place:** Please run this command inside your **Telegram Group**.",
          );
          return NextResponse.json({ ok: true });
        }

        // Upsert Group ID
        const { error } = await supabaseAdmin
          .from("page_telegram_config")
          .upsert(
            {
              page_id: payload,
              chat_id: chatId.toString(),
              is_enabled: true,
              title: chat.title || "Telegram Group",
            },
            { onConflict: "page_id" },
          );

        if (error) {
          await sendMessage(chatId, "❌ Database Error.");
        } else {
          await sendMessage(
            chatId,
            `✅ **Connected to ${page.name}!**\n\n👇 **REQUIRED:**\nPromote me to **Admin** (with 'Invite Users' permission) NOW.`,
          );
        }
        return NextResponse.json({ ok: true });
      }

      // C. SUBSCRIBER JOIN
      const { data: membership } = await supabaseAdmin
        .from("memberships")
        .select(`id, status, user_id, page_id, pages(name)`)
        .eq("id", payload)
        .single();

      if (membership) {
        if (membership.status !== "active") {
          await sendMessage(chatId, "⚠️ **Membership Inactive**");
          return NextResponse.json({ ok: true });
        }

        const { data: tgConfig } = await supabaseAdmin
          .from("page_telegram_config")
          .select("chat_id")
          .eq("page_id", membership.page_id)
          .single();

        if (!tgConfig || !tgConfig.chat_id) {
          await sendMessage(
            chatId,
            "❌ Creator has not connected a group yet.",
          );
          return NextResponse.json({ ok: true });
        }

        // Save User Info
        await supabaseAdmin
          .from("memberships")
          .update({
            telegram_user_id: from.id,
            telegram_username: from.username || "",
            telegram_name: from.first_name,
          })
          .eq("id", payload);

        // Generate Link
        const inviteResult = await createInviteLink(
          tgConfig.chat_id,
          `Member: ${payload.slice(0, 6)}`,
        );

        if (!inviteResult.ok) {
          // SIMPLE ERROR HANDLING (No Loops)
          const err = inviteResult.description || "";
          if (err.includes("chat not found")) {
            // If ID changed, we just tell them to reconnect. Much safer.
            await sendMessage(
              chatId,
              "⚠️ **System Update Required.**\nCreator: Please run `/connect` in the group again.",
            );
          } else {
            await sendMessage(
              chatId,
              "⚠️ **Permission Error.**\nCreator: Make sure I am an **Admin**.",
            );
          }
        } else {
          // SAFE PAGE NAME EXTRACTION
          const pagesData = membership.pages as any;
          const pageName = Array.isArray(pagesData)
            ? pagesData[0]?.name
            : pagesData?.name;

          await sendMessage(
            chatId,
            `🎉 **Welcome to ${pageName || "Community"}!**\n\nTap to join:\n${inviteResult.result.invite_link}`,
          );
        }
        return NextResponse.json({ ok: true });
      }

      await sendMessage(chatId, "❌ **Invalid ID.**");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Server Error:", err);
    // ALWAYS return OK so Telegram stops retrying
    return NextResponse.json({ ok: true });
  }
}
