import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const supabase = await createClient();
  const { code } = await params;

  // Verify the code exists and is valid
  const { data: invite } = await supabase
    .from("invite_codes")
    .select("*, memberships(*, groups(*))")
    .eq("code", code)
    .single();

  if (!invite) return notFound();

  const group = invite.memberships.groups;
  // This is the link we saved earlier (e.g., your Telegram invite link)
  const realTelegramLink = group.telegram_link;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🎉 You're In!</h1>
      <p>
        Welcome to <strong>{group.name}</strong>
      </p>

      <div
        style={{
          padding: "20px",
          background: "#f0f2f5",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "10px", color: "#666" }}>
          Your One-Time Access Code:
        </p>
        <h2 style={{ fontSize: "2rem", letterSpacing: "4px" }}>{code}</h2>
      </div>

      <p>Click below to join the Telegram group immediately:</p>

      <a
        href={realTelegramLink}
        target="_blank"
        style={{
          background: "#229ED9",
          color: "white",
          padding: "16px 32px",
          borderRadius: "100px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Open Telegram
      </a>

      <Link
        href="/viewer/subscriptions"
        style={{ marginTop: "20px", color: "#666" }}
      >
        Go to my Dashboard
      </Link>
    </div>
  );
}
