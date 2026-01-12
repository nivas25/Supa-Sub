"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main style={shell}>Loading dashboard...</main>;
  }

  if (!session) {
    return (
      <main style={shell}>
        <div style={card}>
          <h1 style={title}>You are logged out</h1>
          <p style={text}>Head back to the home page.</p>
          <Link href="/" style={cta}>
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={shell}>
      <div style={card}>
        <h1 style={title}>Welcome, {session.user?.name || "Creator"}</h1>
        <p style={text}>Your account is active. Pick where to go next.</p>
        <div style={row}>
          <Link href="/" style={cta}>
            Go to Landing
          </Link>
          <button
            style={secondary}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

const shell: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0c0c0f 0%, #16161e 100%)",
  color: "#f5f5f5",
  padding: "32px",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 780,
  background: "#13131a",
  border: "1px solid #202030",
  borderRadius: 18,
  padding: "28px 32px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
};

const title: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 28,
  fontWeight: 800,
};

const text: React.CSSProperties = {
  margin: "0 0 20px",
  color: "#cfcfe0",
};

const row: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
};

const cta: React.CSSProperties = {
  background: "#f5f5f5",
  color: "#0c0c0f",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  textDecoration: "none",
  border: "2px solid #f5f5f5",
};

const secondary: React.CSSProperties = {
  background: "transparent",
  color: "#f5f5f5",
  padding: "12px 18px",
  borderRadius: 10,
  fontWeight: 800,
  textDecoration: "none",
  border: "2px solid #3a3a4a",
  cursor: "pointer",
};
