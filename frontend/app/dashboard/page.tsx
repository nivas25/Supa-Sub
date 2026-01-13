import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import styles from "./Dashboard.module.css";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  // This is the "Sync" logic using upsert
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id, // Links Clerk ID to Supabase ID
        username: user.username || user.firstName,
      },
      { onConflict: "id" }
    )
    .select();

  const profile = data?.[0];

  if (error) {
    console.error("Supabase Sync Error:", error.message);
  }

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.statusRow}>
            <div className={styles.statusDot} />
            <span className={styles.pill}>SYSTEM_ACTIVE</span>
          </div>
          <h1 className={styles.title}>
            WELCOME BACK, <br />
            <span className={styles.highlight}>
              {user.firstName?.toUpperCase()}
            </span>
          </h1>
          <p className={styles.subtitle}>
            Your infrastructure is ready. Time to monetize.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Profile Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Profile Status</h3>
              <span className={styles.cardIcon}>👤</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Username</span>
                <span className={styles.dataValue}>
                  {profile?.username || "Not Set"}
                </span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Creator Mode</span>
                <span className={styles.dataValue}>
                  {profile?.is_creator ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>User ID</span>
                <span
                  className={styles.dataValue}
                  style={{ fontSize: "0.7rem" }}
                >
                  {user.id.slice(0, 12)}...
                </span>
              </div>
            </div>
          </div>

          {/* Creator Setup Card */}
          <div className={`${styles.card} ${styles.actionCard}`}>
            <div className={styles.cardHeader}>
              <h3
                className={styles.cardTitle}
                style={{ color: "var(--background)" }}
              >
                {profile?.is_creator ? "Manage Content" : "Become a Creator"}
              </h3>
              <span className={styles.cardIcon}>🚀</span>
            </div>
            <div className={styles.cardContent}>
              <p style={{ marginBottom: "10px", fontSize: "0.85rem" }}>
                {profile?.is_creator
                  ? "Your creator profile is active. Start uploading content."
                  : "Start monetizing your expertise. Set up your creator profile now."}
              </p>
              <button className={styles.actionButton}>
                {profile?.is_creator ? "UPLOAD_CONTENT" : "ENABLE_CREATOR_MODE"}
              </button>
            </div>
          </div>

          {/* Earnings Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Earnings</h3>
              <span className={styles.cardIcon}>💰</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>This Month</span>
                <span className={styles.dataValue}>$0.00</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Total</span>
                <span className={styles.dataValue}>$0.00</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Profit Split</span>
                <span className={styles.dataValue}>90/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        {error && (
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              border: "2px solid red",
              borderRadius: "12px",
            }}
          >
            <p style={{ color: "red", fontFamily: "monospace" }}>
              Error: {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
