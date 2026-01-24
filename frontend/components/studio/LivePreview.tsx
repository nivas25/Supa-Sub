"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  RiVerifiedBadgeFill,
  RiUser3Line,
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiGlobalLine,
  RiLock2Line,
  RiArrowRightLine,
  RiCheckLine,
  RiFlashlightFill,
  RiShieldStarLine,
  RiChatQuoteLine,
} from "react-icons/ri";
import styles from "./LivePreview.module.css";

// --- Types ---
interface PlatformDetails {
  enabled: boolean;
  link: string;
  title: string;
}

interface PriceOption {
  amount: string;
  interval: string;
}

interface LivePreviewProps {
  name: string;
  bio: string;
  prices: PriceOption[];
  features?: string[];
  welcomeMessage?: string;
  terms?: string;
  handle: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  platforms: {
    telegram: PlatformDetails;
    discord: PlatformDetails;
    whatsapp: PlatformDetails;
  };
  viewMode?: "mobile" | "desktop";
}

const formatInterval = (interval: string) => {
  if (interval === "weekly") return "week";
  if (interval === "monthly") return "month";
  if (interval === "yearly") return "year";
  if (interval === "lifetime") return "forever";
  return interval;
};

const formatLabel = (interval: string) => {
  if (interval === "weekly") return "Weekly Access";
  if (interval === "monthly") return "Monthly Access";
  if (interval === "yearly") return "Annual Membership";
  if (interval === "lifetime") return "Lifetime Access";
  return "Membership";
};

// --- Branding Component ---
const SubStarterBranding = () => (
  <div className={styles.brandingArea}>
    <span className={styles.brandText}>Made with love in</span>
    <div className={styles.footerBrand}>
      <span className={styles.wordSub}>Sub</span>
      <span className={styles.wordStarter}>Starter</span>
      <div className={styles.footerBolt}>
        <RiFlashlightFill />
      </div>
    </div>
  </div>
);

// --- Content Component ---
const PreviewContent = ({
  name,
  bio,
  prices,
  features = [],
  welcomeMessage,
  terms,
  avatarUrl,
  bannerUrl,
  platforms,
  viewMode,
}: Omit<LivePreviewProps, "handle">) => {
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);

  useEffect(() => {
    setSelectedPriceIdx(0);
  }, [prices.length]);

  const currentPrice =
    prices && prices.length > 0
      ? prices[selectedPriceIdx]
      : { amount: "0", interval: "monthly" };

  const getIcon = (key: string) => {
    if (key === "telegram") return <RiTelegramFill />;
    if (key === "discord") return <RiDiscordFill />;
    if (key === "whatsapp") return <RiWhatsappFill />;
    return <RiGlobalLine />;
  };

  const activePlatforms = Object.entries(platforms).filter(
    ([_, data]) => data.enabled,
  );

  return (
    <>
      <div className={styles.screenContent}>
        {/* Desktop Container Wrapper */}
        <div className={viewMode === "desktop" ? styles.desktopContainer : ""}>
          {/* 1. IDENTITY SECTION */}
          <div className={styles.coverPhoto}>
            {bannerUrl ? (
              <Image
                src={bannerUrl}
                alt="Banner"
                fill
                className={styles.coverImg}
                unoptimized
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#f1f5f9",
                }}
              />
            )}
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.avatarBox}>
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill
                  className={styles.avatarImg}
                  unoptimized
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    color: "#94a3b8",
                  }}
                >
                  <RiUser3Line />
                </div>
              )}
            </div>
            <div className={styles.handle}>
              {name || "Creator Name"}
              <RiVerifiedBadgeFill className={styles.verified} />
            </div>
            <p className={styles.bio}>
              {bio || "Welcome to my exclusive community."}
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <span className={styles.statNum}>1.2K</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>
                  {activePlatforms.length > 0 ? activePlatforms.length : "-"}
                </span>
                <span className={styles.statLabel}>Channels</span>
              </div>
            </div>
          </div>

          {/* 2. CREATOR MESSAGE */}
          {welcomeMessage && (
            <div className={styles.contentSection}>
              <div className={styles.sectionHeader}>
                <RiChatQuoteLine color="#d4af37" />
                <span className={styles.sectionLabel}>From the Creator</span>
              </div>
              <div className={styles.messageCard}>{welcomeMessage}</div>
            </div>
          )}

          {/* 3. FEATURES */}
          {features.length > 0 && (
            <div className={styles.contentSection}>
              <div className={styles.sectionHeader}>
                <RiShieldStarLine color="#d4af37" />
                <span className={styles.sectionLabel}>What you get</span>
              </div>
              <div className={styles.featuresGrid}>
                {features.map((feat, idx) => (
                  <div key={idx} className={styles.featureRow}>
                    <RiCheckLine className={styles.checkIcon} />
                    <span className={styles.featureText}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. PRICING PLANS */}
          {prices.length > 0 && (
            <div className={styles.contentSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Select Plan</span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {prices.map((p, idx) => (
                  <div
                    key={idx}
                    className={`${styles.planCard} ${
                      selectedPriceIdx === idx ? styles.activePlan : ""
                    }`}
                    onClick={() => setSelectedPriceIdx(idx)}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div className={styles.radioCircle}>
                        <div className={styles.radioDot} />
                      </div>
                      <div className={styles.planInfo}>
                        <span className={styles.planName}>
                          {formatLabel(p.interval)}
                        </span>
                        <span className={styles.planCost}>
                          Billed every {formatInterval(p.interval)}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "#0f172a",
                      }}
                    >
                      ${p.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ACCESS (Platforms) */}
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <RiLock2Line color="#94a3b8" />
              <span className={styles.sectionLabel}>Unlock Access</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activePlatforms.length > 0 ? (
                activePlatforms.map(([key, data]) => (
                  <div key={key} className={styles.accessCard}>
                    <div className={styles.accessIconBox}>{getIcon(key)}</div>
                    <div className={styles.accessDetails}>
                      <span className={styles.accessTitle}>{data.title}</span>
                      <span className={styles.accessSub}>
                        Private {key} Group
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: 16,
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "#94a3b8",
                    border: "1px dashed #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  No channels connected yet.
                </div>
              )}
            </div>
          </div>

          {/* 6. TERMS */}
          {terms && (
            <div className={styles.contentSection}>
              <div className={styles.sectionHeader}>
                <span
                  className={styles.sectionLabel}
                  style={{ fontSize: "0.7rem" }}
                >
                  Terms & Conditions
                </span>
              </div>
              <div className={styles.termsBox}>{terms}</div>
            </div>
          )}

          {/* 7. FOOTER BRANDING (VISIBLE NOW) */}
          <SubStarterBranding />
        </div>
      </div>

      {/* 8. STICKY FOOTER */}
      <div className={styles.stickyBar}>
        <div className={styles.priceDisplay}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>${currentPrice.amount}</span>
        </div>
        <button className={styles.joinButton}>
          Join Now <RiArrowRightLine />
        </button>
      </div>
    </>
  );
};

export default function LivePreview(props: LivePreviewProps) {
  const { handle, viewMode = "mobile" } = props;

  return (
    <div className={styles.previewWrapper}>
      <div className={styles.dotPattern} />

      {viewMode === "mobile" ? (
        <div className={styles.mobileFrame}>
          <div className={styles.browserChrome}>
            <div className={styles.urlPill}>
              <RiLock2Line size={12} />
              substarter.com/{handle || "user"}
            </div>
          </div>
          <PreviewContent {...props} viewMode="mobile" />
        </div>
      ) : (
        <div className={styles.desktopFrame}>
          <div className={styles.browserChrome}>
            <div className={styles.urlPill}>
              <RiLock2Line size={12} />
              substarter.com/{handle || "user"}
            </div>
          </div>
          <PreviewContent {...props} viewMode="desktop" />
        </div>
      )}
    </div>
  );
}
