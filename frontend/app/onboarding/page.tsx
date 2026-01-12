"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import styles from "./Onboarding.module.css";
import { RiUserStarLine, RiUserHeartLine } from "react-icons/ri";

const ROLES = [
  {
    id: "creator",
    label: "I AM A CREATOR",
    description: "Sell premium content, courses, or communities.",
    icon: RiUserStarLine,
  },
  {
    id: "subscriber",
    label: "I AM A SUBSCRIBER",
    description: "Follow and support your favorite creators.",
    icon: RiUserHeartLine,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.onboarded) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  const handleSelect = async (role: "creator" | "subscriber") => {
    setError(null);

    if (!session) {
      await signIn("google");
      return;
    }

    setLoadingRole(role);
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      setError("Could not save your choice. Please try again.");
      setLoadingRole(null);
      return;
    }

    await update({ onboarded: true, role });
    router.replace("/dashboard");
  };

  if (status === "loading") {
    return (
      <div className={styles.onboardingWrapper}>
        <div className={styles.content}>
          <p style={{ color: "#b3b3c7" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.onboardingWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            SIGN IN FIRST<span>.</span>
          </h1>
          <p className={styles.subtitle}>CREATE YOUR ACCOUNT WITH GOOGLE</p>
          <button
            onClick={() => signIn("google")}
            className={styles.roleCard}
            style={{
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3>CONTINUE WITH GOOGLE</h3>
            <p>Fast, secure, and trusted.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.onboardingWrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          ONE LAST STEP<span>.</span>
        </h1>
        <p className={styles.subtitle}>
          TELL US HOW YOU WANT TO USE THE NETWORK.
        </p>

        <div className={styles.options}>
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() =>
                  handleSelect(role.id as "creator" | "subscriber")
                }
                className={styles.roleCard}
                disabled={!!loadingRole}
              >
                <Icon className={styles.icon} />
                <h3>{role.label}</h3>
                <p>{role.description}</p>
                {loadingRole === role.id && (
                  <small style={{ color: "#5eead4", marginTop: "8px" }}>
                    Saving...
                  </small>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p
            style={{
              color: "#f87171",
              marginTop: "24px",
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
