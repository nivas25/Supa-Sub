import { RiCompassDiscoverLine, RiLockPasswordLine } from "react-icons/ri";

export default function SubscriberView({ user }: { user: any }) {
  return (
    <section>
      <header style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            fontFamily: "var(--font-outfit)",
          }}
        >
          Your Subscriptions
        </h2>
        <p style={{ color: "#666" }}>
          Access your exclusive content and communities.
        </p>
      </header>

      <div
        style={{
          background: "#f9fafb",
          borderRadius: "32px",
          padding: "60px",
          textAlign: "center",
          border: "1.5px solid #eee",
        }}
      >
        <div
          style={{ fontSize: "2.5rem", color: "#ccc", marginBottom: "20px" }}
        >
          <RiLockPasswordLine />
        </div>
        <h3
          style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "12px" }}
        >
          Nothing here yet
        </h3>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          You haven't joined any paid groups yet.
        </p>
        <button
          style={{
            background: "#fff",
            color: "#000",
            padding: "14px 32px",
            borderRadius: "100px",
            fontWeight: 800,
            border: "2px solid #000",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <RiCompassDiscoverLine /> Explore Creators
        </button>
      </div>
    </section>
  );
}
