import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "./_components/DashboardNavbar";
import HistoryGuard from "./_components/HistoryGuard";
import {
  RiUserLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
  RiAddLine,
} from "react-icons/ri";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch creator data to see if they've claimed a handle
  const { data: creator } = await supabase
    .from("creators")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <HistoryGuard />
      <DashboardNavbar />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}
      >
        <header style={{ marginBottom: "48px" }}>
          <h1
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "2.5rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: "8px",
            }}
          >
            Creator Overview
          </h1>
          <p style={{ color: "#666", fontSize: "1.1rem", fontWeight: 500 }}>
            {creator ? `@${creator.username}` : user.email}
          </p>
        </header>

        {/* STATS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {[
            {
              label: "Active Members",
              value: "0",
              icon: <RiUserLine />,
              color: "#25d366",
            },
            {
              label: "Live Groups",
              value: "0",
              icon: <RiGroupLine />,
              color: "#000",
            },
            {
              label: "Total Earnings",
              value: "$0.00",
              icon: <RiMoneyDollarCircleLine />,
              color: "#25d366",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "32px",
                borderRadius: "24px",
                border: "1.5px solid #f3f4f6",
                background: "#fff",
                transition: "transform 0.2s",
                cursor: "default",
              }}
            >
              <div
                style={{
                  color: stat.color,
                  fontSize: "1.8rem",
                  marginBottom: "16px",
                  background: "#f9fafb",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  color: "#9ca3af",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  marginTop: "4px",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE / GROUP MANAGEMENT */}
        <div
          style={{
            background: "#f9fafb",
            borderRadius: "32px",
            padding: "80px 40px",
            textAlign: "center",
            border: "2px dashed #e5e7eb",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#fff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "2rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
            }}
          >
            <RiGroupLine />
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            No groups found
          </h2>
          <p
            style={{
              color: "#666",
              marginBottom: "32px",
              maxWidth: "400px",
              margin: "0 auto 32px",
            }}
          >
            Ready to monetize? Connect your first Telegram or Discord group to
            start accepting paid memberships.
          </p>
          <button
            style={{
              background: "#000",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "100px",
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
          >
            <RiAddLine size={20} />
            Create New Group
          </button>
        </div>
      </div>
    </main>
  );
}
