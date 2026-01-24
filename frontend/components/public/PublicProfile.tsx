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
    id: string; // THIS ID IS CRITICAL
    expires_at: string;
  } | null;
  groupId?: string;
  features?: string[];
  welcomeMessage?: string;
  terms?: string;
}

const formatInterval = (interval: string) => {
  if (interval === "weekly") return "Weekly Access";
  if (interval === "monthly") return "Monthly Access";
  if (interval === "yearly") return "Annual Membership";
  if (interval === "lifetime") return "Lifetime Access";
  return "Membership";
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

  // --- NEW: Smart Open Function (Debugs the Link) ---
  const handleOpenLink = (key: string, originalLink: string) => {
    // 1. Handle Telegram Logic
    if (key === "telegram") {
      const memId = existingMembership?.id;

      // DEBUG: Alert if ID is missing
      if (!memId) {
        alert(
          "DEBUG ERROR: Membership ID is missing!\nPlease refresh the page or try logging out and back in.",
        );
        console.error("Missing ID in membership object:", existingMembership);
        return;
      }

      // 2. Open Bot
      const botUrl = `https://t.me/substarter_offical_bot?start=${memId}`;
      window.open(botUrl, "_blank");
      return;
    }

    // 3. Handle Other Platforms
    const finalLink = originalLink.startsWith("http")
      ? originalLink
      : `https://${originalLink}`;
    window.open(finalLink, "_blank");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* IDENTITY */}
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

        {/* ACCESS (Interactive) */}
        <div className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <RiLock2Line color={existingMembership ? "#25d366" : "#94a3b8"} />
            <span className={styles.sectionLabel}>
              {existingMembership ? "🎉 You have access" : "Unlock Access"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activePlatforms.map(([key, data]) => {
              const isMember = !!existingMembership;
              const isExpanded = expandedPlatform === key;

              return (
                <div
                  key={key}
                  className={`${styles.accessCard} ${isMember ? styles.memberCard : ""}`}
                >
                  {/* Card Header */}
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
                        {isExpanded ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                      </div>
                    ) : (
                      <RiLock2Line className={styles.statusIcon} />
                    )}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && isMember && (
                    <div className={styles.expandedContent}>
                      <div className={styles.inviteBox}>
                        <span className={styles.inviteLabel}>
                          {key === "telegram"
                            ? "Activate via Bot"
                            : "Your Invite Link"}
                        </span>

                        {/* CHANGED TO BUTTON FOR BETTER DEBUGGING */}
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
            })}
          </div>
        </div>

        {/* OTHER SECTIONS OMITTED FOR BREVITY, THEY ARE UNCHANGED */}

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
                <span className={styles.totalLabel}>Total</span>
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
                    <RiLoader4Fill className={styles.spin} /> Processing
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
