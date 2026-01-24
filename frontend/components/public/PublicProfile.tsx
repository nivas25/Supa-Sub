"use client";
import React, { useTransition, useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { joinCommunity } from "@/app/actions/join";
import { registerView } from "@/app/actions/analytics";
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
  RiExternalLinkLine,
  RiLoader4Fill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFileTextLine,
  RiPriceTag3Line,
} from "react-icons/ri";
import styles from "./PublicProfile.module.css";

interface PlatformDetails {
  enabled: boolean;
  link: string;
  title: string;
}

interface PriceOption {
  amount: number;
  interval: string;
}

interface PublicProfileProps {
  name: string;
  bio: string;
  prices: PriceOption[];
  handle: string;
  memberCount: number;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  platforms: {
    telegram: PlatformDetails;
    discord: PlatformDetails;
    whatsapp: PlatformDetails;
  };
  existingMembership?: {
    id: string;
    expires_at: string;
  } | null;
  groupId?: string;
  features?: string[];
  welcomeMessage?: string;
  terms?: string;
}

const formatInterval = (interval: string) => {
  if (interval === "weekly") return "Weekly";
  if (interval === "monthly") return "Monthly";
  if (interval === "yearly") return "Yearly";
  if (interval === "lifetime") return "Lifetime";
  return interval;
};

const SubStarterBranding = () => (
  <div className={styles.brandingArea}>
    <span className={styles.brandText}>Powered by</span>
    <div className={styles.footerBrand}>
      <span className={styles.wordSub}>Sub</span>
      <span className={styles.wordStarter}>Starter</span>
      <div className={styles.footerBolt}>
        <RiFlashlightFill />
      </div>
    </div>
  </div>
);

export default function PublicProfile({
  name,
  bio,
  prices,
  handle,
  memberCount,
  avatarUrl,
  bannerUrl,
  platforms,
  existingMembership,
  groupId,
  features = [],
  welcomeMessage,
  terms,
}: PublicProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (groupId) registerView(groupId);
  }, [groupId]);

  const daysRemaining = useMemo(() => {
    if (!existingMembership?.expires_at) return 30;
    const diff =
      new Date(existingMembership.expires_at).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  }, [existingMembership]);

  const activePlatforms = Object.entries(platforms).filter(
    ([_, d]) => d.enabled,
  );

  const currentPrice =
    prices && prices.length > 0
      ? prices[selectedPriceIdx]
      : { amount: 0, interval: "monthly" };

  const formatCount = (num: number) =>
    num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;

  const getIcon = (key: string) => {
    if (key === "telegram") return <RiTelegramFill />;
    if (key === "discord") return <RiDiscordFill />;
    if (key === "whatsapp") return <RiWhatsappFill />;
    return <RiGlobalLine />;
  };

  const handleJoin = () => {
    if (existingMembership) return;

    startTransition(async () => {
      try {
        const result = await joinCommunity(
          handle,
          Number(currentPrice.amount),
          currentPrice.interval,
        );

        if (result?.error) {
          alert(result.error);
        } else {
          router.refresh();
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    });
  };

  const toggleExpand = (key: string) => {
    if (!existingMembership) return;
    setExpandedPlatform(expandedPlatform === key ? null : key);
  };

  const handleOpenLink = (key: string, originalLink: string) => {
    // 1. Handle Telegram Logic
    if (key === "telegram") {
      const memId = existingMembership?.id;
      if (!memId) {
        alert("Please log in again to verify your membership.");
        return;
      }
      // Open Bot
      const botUrl = `https://t.me/mysubstarterbot?start=${memId}`;
      window.open(botUrl, "_blank");
      return;
    }

    // 2. Handle Other Platforms
    const finalLink = originalLink.startsWith("http")
      ? originalLink
      : `https://${originalLink}`;
    window.open(finalLink, "_blank");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* --- 1. IDENTITY --- */}
        <div className={styles.coverArea}>
          {bannerUrl ? (
            <Image
              src={bannerUrl}
              alt="Banner"
              fill
              className={styles.bannerImg}
              unoptimized
            />
          ) : (
            <div className={styles.defaultBanner} />
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
              <div className={styles.avatarFallback}>
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
              <span className={styles.statNum}>{formatCount(memberCount)}</span>
              <span className={styles.statLabel}>Members</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{activePlatforms.length}</span>
              <span className={styles.statLabel}>Channels</span>
            </div>
          </div>
        </div>

        {/* --- 2. MESSAGE (Optional) --- */}
        {welcomeMessage && (
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <RiChatQuoteLine color="#94a3b8" />
              <span className={styles.sectionLabel}>Message</span>
            </div>
            <div className={styles.messageCard}>{welcomeMessage}</div>
          </div>
        )}

        {/* --- 3. FEATURES (Optional) --- */}
        {features && features.length > 0 && (
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <RiShieldStarLine color="#94a3b8" />
              <span className={styles.sectionLabel}>What's Included</span>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feat, i) => (
                <div key={i} className={styles.featureRow}>
                  <RiCheckLine className={styles.checkIcon} />
                  <span className={styles.featureText}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 4. PRICING PLANS (New: Was Missing) --- */}
        {!existingMembership && prices && prices.length > 0 && (
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <RiPriceTag3Line color="#94a3b8" />
              <span className={styles.sectionLabel}>Select a Plan</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {prices.map((price, idx) => (
                <div
                  key={idx}
                  className={`${styles.planCard} ${
                    selectedPriceIdx === idx ? styles.activePlan : ""
                  }`}
                  onClick={() => setSelectedPriceIdx(idx)}
                >
                  <div className={styles.planInfo}>
                    <span className={styles.planName}>
                      {formatInterval(price.interval)}
                    </span>
                    <span className={styles.planCost}>
                      ${price.amount} / {price.interval}
                    </span>
                  </div>
                  <div className={styles.radioCircle}>
                    <div className={styles.radioDot} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 5. ACCESS (Restored) --- */}
        <div className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <RiLock2Line color={existingMembership ? "#25d366" : "#94a3b8"} />
            <span className={styles.sectionLabel}>
              {existingMembership ? "🎉 You have access" : "Community Access"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activePlatforms.length > 0 ? (
              activePlatforms.map(([key, data]) => {
                const isMember = !!existingMembership;
                const isExpanded = expandedPlatform === key;

                return (
                  <div
                    key={key}
                    className={`${styles.accessCard} ${
                      isMember ? styles.memberCard : ""
                    }`}
                  >
                    <div
                      className={styles.accessCardHeader}
                      onClick={() => toggleExpand(key)}
                    >
                      <div className={styles.accessIconBox}>{getIcon(key)}</div>
                      <div className={styles.accessDetails}>
                        <span className={styles.accessTitle}>{data.title}</span>
                        <span className={styles.accessSub}>
                          {isMember
                            ? isExpanded
                              ? "Click to close"
                              : "Click to view invite"
                            : `Private ${key} group`}
                        </span>
                      </div>
                      {isMember ? (
                        <div className={styles.statusIcon}>
                          {isExpanded ? (
                            <RiArrowUpSLine />
                          ) : (
                            <RiArrowDownSLine />
                          )}
                        </div>
                      ) : (
                        <RiLock2Line className={styles.statusIcon} />
                      )}
                    </div>

                    {isExpanded && isMember && (
                      <div className={styles.expandedContent}>
                        <div className={styles.inviteBox}>
                          <span className={styles.inviteLabel}>
                            {key === "telegram"
                              ? "Activate via Bot"
                              : "Your Invite Link"}
                          </span>
                          <button
                            onClick={() => handleOpenLink(key, data.link)}
                            className={styles.launchGroupBtn}
                          >
                            <RiExternalLinkLine />
                            {key === "telegram"
                              ? "Open Telegram Bot"
                              : `Join ${key} Group`}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  padding: 16,
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  background: "#f8fafc",
                  borderRadius: 12,
                }}
              >
                No active channels connected.
              </div>
            )}
          </div>
        </div>

        {/* --- 6. TERMS (Optional) --- */}
        {terms && (
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <RiFileTextLine color="#94a3b8" />
              <span className={styles.sectionLabel}>Terms & Conditions</span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              {terms}
            </p>
          </div>
        )}

        <SubStarterBranding />
      </div>

      {/* STICKY DOCK */}
      <div className={styles.stickyBar}>
        <div className={styles.dockContent}>
          {existingMembership ? (
            <div className={styles.memberStatus}>
              <div className={styles.pulseDot} />
              <span className={styles.activeText}>
                Active Member • Expires in {daysRemaining} days
              </span>
            </div>
          ) : (
            <>
              <div className={styles.priceDisplay}>
                <span className={styles.totalLabel}>
                  {currentPrice.interval} Total
                </span>
                <span className={styles.priceValue}>
                  ${currentPrice.amount}
                </span>
              </div>
              <button
                className={styles.joinBtn}
                onClick={handleJoin}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <RiLoader4Fill className="spin" /> Processing
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: 6 }}>Join Now</span>
                    <RiArrowRightLine />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
