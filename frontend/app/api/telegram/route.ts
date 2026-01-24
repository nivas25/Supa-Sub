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

// Helper: Send Message
async function sendMessage(chatId: number, text: string) {
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

// Helper: Create Invite
async function createInviteLink(chatId: string, name: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/createChatInviteLink`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, member_limit: 1, name: name }),
    },
  );
  return await res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message || !body.message.text)
      return NextResponse.json({ ok: true });

    const { chat, text, from } = body.message;
    const chatId = chat.id;
    const chatType = chat.type; // 'private', 'group', or 'supergroup'

    console.log(`[Telegram] ${chatType} msg from ${from.username}: ${text}`);

    // --- HANDLE /start OR /connect ---
    if (text.startsWith("/start") || text.startsWith("/connect")) {
      const parts = text.split(" ");
      const payload = parts[1]?.trim();

      // 1. NO ID PROVIDED?
      if (!payload) {
        if (chatType === "private") {
          await sendMessage(
            chatId,
            "👋 **Hello Creator!**\n\nTo connect a group, go to your Dashboard and click **'Add Bot to Group'**.\n\nTo join a community, use the link from the creator's page.",
          );
        }
        return NextResponse.json({ ok: true });
      }

      // 2. CHECK IF IT IS A PAGE (Creator Setup)
      const { data: page } = await supabaseAdmin
        .from("pages")
        .select("id, name")
        .eq("id", payload)
        .single();

      if (page) {
        if (chatType === "private") {
          await sendMessage(
            chatId,
            `👋 Hi! I see you want to connect **${page.name}**.\n\n⚠️ **You are in Private Chat.**\n\nPlease add me to the **Telegram Group** you want to use, and I will connect automatically.`,
          );
          return NextResponse.json({ ok: true });
        }

        // SUCCESS: Creator is in a Group
        const { error } = await supabaseAdmin
          .from("page_telegram_config")
          .upsert(
            {
              page_id: payload,
              chat_id: chatId.toString(),
              is_enabled: true,
            },
            { onConflict: "page_id" },
          );

        if (error) {
          await sendMessage(chatId, "❌ Database Error.");
        } else {
          await sendMessage(
            chatId,
            `✅ **Connected to ${page.name}!**\n\n👇 **REQUIRED:**\nPromote me to **Admin** (with 'Invite Users' permission) so I can let members in.`,
          );
        }
        return NextResponse.json({ ok: true });
      }

      // 3. CHECK IF IT IS A MEMBERSHIP (Subscriber Join)
      const { data: membership } = await supabaseAdmin
        .from("memberships")
        .select(`id, status, user_id, page_id, pages(name)`)
        .eq("id", payload)
        .single();

      if (membership) {
        if (membership.status !== "active") {
          await sendMessage(
            chatId,
            "⚠️ **Membership Inactive**\nYour subscription has expired or is invalid.",
          );
          return NextResponse.json({ ok: true });
        }

        // Get Group ID
        const { data: tgConfig } = await supabaseAdmin
          .from("page_telegram_config")
          .select("chat_id")
          .eq("page_id", membership.page_id)
          .single();

        if (!tgConfig) {
          await sendMessage(
            chatId,
            "❌ **Error:** This page has not connected a Telegram Group yet.",
          );
          return NextResponse.json({ ok: true });
        }

        // Save Telegram ID
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

        // --- FIX: SAFE PAGE NAME EXTRACTION ---
        // TypeScript Error Fix: Handle 'pages' as Array OR Object safely
        // @ts-ignore
        const pageName = Array.isArray(membership.pages)
          ? membership.pages[0]?.name
          : membership.pages?.name;

        if (!inviteResult.ok) {
          await sendMessage(
            chatId,
            "❌ **I cannot generate a link.**\n\n(Creators: Make sure I am an **Admin** in the group!)",
          );
        } else {
          await sendMessage(
            chatId,
            `🎉 **Welcome to ${pageName || "Community"}!**\n\nTap to join:\n${inviteResult.result.invite_link}`,
          );
        }
        return NextResponse.json({ ok: true });
      }

      // 4. NEITHER FOUND
      await sendMessage(
        chatId,
        "❌ **Invalid ID.**\nI could not find a Page or Membership with that ID.",
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
