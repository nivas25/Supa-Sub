import SubscriptionsList from "@/components/viewer/SubscriptionsList";

export const metadata = {
  title: "My Subscriptions | SubStarter",
};

export default function SubscriptionsPage() {
  return (
    <main
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}
    >
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "8px" }}
        >
          Subscriptions<span style={{ color: "#25d366" }}>.</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Manage your active memberships
        </p>
      </div>
      <SubscriptionsList />
    </main>
  );
}
