"use client";
import React, { useTransition, useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { joinCommunity } from "@/app/actions/join";
import { registerView } from "@/app/actions/analytics";
import {
  RiUser3Line,
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiGlobalLine,
  RiArrowRightLine,
  RiTwitterXFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiFacebookCircleFill,
  RiCheckboxCircleFill,
  RiLock2Fill,
  RiChatQuoteLine,
  RiShieldCheckLine,
  RiFlashlightFill,
  RiLoader4Fill,
  RiExternalLinkLine,
} from "react-icons/ri";
import styles from "./PublicProfile.module.css";

// --- INTERFACES ---
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
  socialLinks?: { platform: string; url: string }[]; // Added support if DB has it
}

// --- HELPERS ---
const formatInterval = (interval: string) => {
  const clean = interval?.toLowerCase() || "";
  switch (clean) {
    case "weekly":
      return "7 days";
    case "monthly":
      return "30 days";
    case "yearly":
      return "365 days";
    case "lifetime":
      return "Lifetime";
    default:
      return "30 days";
  }
};

const formatPrice = (amount: number) => {
  return Number(amount).toLocaleString();
};

const getSocialIcon = (platform: string) => {
  const clean = platform?.toLowerCase() || "";
  switch (clean) {
    case "twitter":
      return <RiTwitterXFill />;
    case "instagram":
      return <RiInstagramLine />;
    case "youtube":
      return <RiYoutubeFill />;
    case "facebook":
      return <RiFacebookCircleFill />;
    default:
      return <RiGlobalLine />;
  }
};

const getPlatformIcon = (key: string) => {
  switch (key) {
    case "telegram":
      return <RiTelegramFill />;
    case "discord":
      return <RiDiscordFill />;
    case "whatsapp":
      return <RiWhatsappFill />;
    default:
      return <RiGlobalLine />;
  }
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

// --- COMPONENT ---
export default function PublicProfile({
  name,
  bio,
  prices,
  handle,
  avatarUrl,
  bannerUrl,
  platforms,
  existingMembership,
  groupId,
  features = [],
  welcomeMessage,
  terms,
  socialLinks = [], // Default empty if not passed
}: PublicProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);

  useEffect(() => {
    if (groupId) registerView(groupId);
  }, [groupId]);

  // Pricing Logic
  const currentPrice =
    prices && prices.length > 0
      ? prices[selectedPriceIdx]
      : { amount: 0, interval: "monthly" };

  // Active Platforms
  const activePlatforms = Object.entries(platforms).filter(
    ([_, d]) => d.enabled,
  );

  // --- ACTIONS ---
  const handleJoin = () => {
    if (existingMembership) return;
    startTransition(async () => {
      try {
        const result = await joinCommunity(
          handle,
          Number(currentPrice.amount),
          currentPrice.interval,
        );
        if (result?.error) alert(result.error);
        else router.refresh();
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    });
  };

  const handleOpenLink = (key: string, originalLink: string) => {
    if (key === "telegram" && existingMembership) {
      const botUrl = `https://t.me/mysubstarterbot?start=${existingMembership.id}`;
      window.open(botUrl, "_blank");
      return;
    }
    const finalLink = originalLink.startsWith("http")
      ? originalLink
      : `https://${originalLink}`;
    window.open(finalLink, "_blank");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainGrid}>
        {/* === LEFT COLUMN: Identity, Welcome, Features === */}
        <div className={styles.leftCol}>
          {/* 1. Identity Card */}
          <div className={styles.identityCard}>
            <div className={styles.bannerFrame}>
              {bannerUrl && (
                <Image
                  src={bannerUrl}
                  alt="Banner"
                  fill
                  className={styles.bannerImg}
                  unoptimized
                />
              )}
            </div>
            <div className={styles.profileContent}>
              <div className={styles.avatarWrapper}>
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
                    <RiUser3Line size={32} color="#cbd5e1" />
                  </div>
                )}
              </div>
              <div className={styles.nameRow}>
                <h1 className={styles.name}>{name || "Creator"}</h1>
              </div>
              <p className={styles.bio}>
                {bio || "Welcome to my exclusive community."}
              </p>

              {socialLinks.length > 0 && (
                <div className={styles.socialRow}>
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      className={styles.socialBtn}
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. Welcome Message */}
          {welcomeMessage && (
            <div className={styles.welcomeCard}>
              <div className={styles.welcomeIconWrapper}>
                <RiChatQuoteLine size={16} />
              </div>
              <p className={styles.welcomeText}>{welcomeMessage}</p>
            </div>
          )}

          {/* 3. Features */}
          {features && features.length > 0 && (
            <div className={styles.featuresCard}>
              <span className={styles.sectionTitle}>
                <RiShieldCheckLine /> What's Included
              </span>
              <div className={styles.featureList}>
                {features.map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <RiCheckboxCircleFill
                      color="#000"
                      size={22}
                      style={{ flexShrink: 0 }}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === RIGHT COLUMN: Checkout / Access === */}
        <div className={styles.rightCol}>
          <div className={styles.purchaseCard}>
            {/* If Member: Show Access */}
            {existingMembership ? (
              <>
                <span className={styles.sectionTitle}>
                  <RiLock2Fill style={{ color: "#22c55e" }} /> You Have Access
                </span>
                <div className={styles.accessGrid}>
                  {activePlatforms.map(([key, data]) => (
                    <div
                      key={key}
                      className={styles.accessCard}
                      onClick={() => handleOpenLink(key, data.link)}
                    >
                      <div className={styles.accessIconBox}>
                        {getPlatformIcon(key)}
                      </div>
                      <div className={styles.accessMeta}>
                        <span className={styles.accessTitle}>{data.title}</span>
                        <span
                          className={styles.accessSub}
                          style={{ color: "#15803d" }}
                        >
                          Click to Open{" "}
                          <RiExternalLinkLine style={{ marginBottom: -2 }} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* If Not Member: Show Pricing */
              <>
                {activePlatforms.length > 0 && (
                  <div className={styles.accessGrid}>
                    <span className={styles.sectionTitle}>
                      <RiLock2Fill /> Instant Access
                    </span>
                    {activePlatforms.map(([key, data]) => (
                      <div
                        key={key}
                        className={styles.accessCard}
                        style={{ cursor: "default" }}
                      >
                        <div className={styles.accessIconBox}>
                          {getPlatformIcon(key)}
                        </div>
                        <div className={styles.accessMeta}>
                          <span className={styles.accessTitle}>
                            {data.title}
                          </span>
                          <span className={styles.accessSub}>
                            Locked • Members Only
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {prices && prices.length > 0 && (
                  <div className={styles.pricingGrid}>
                    <span className={styles.sectionTitle}>Choose Plan</span>
                    {prices.map((p, i) => {
                      const isActive = i === selectedPriceIdx;
                      return (
                        <div
                          key={i}
                          className={`${styles.priceCard} ${isActive ? styles.activePrice : ""}`}
                          onClick={() => setSelectedPriceIdx(i)}
                        >
                          <div className={styles.activeIndicator}></div>
                          <div className={styles.intervalBadge}>
                            {formatInterval(p.interval)}
                            <span className={styles.intervalSub}>
                              Recurring
                            </span>
                          </div>
                          <div className={styles.priceTag}>
                            ${formatPrice(p.amount)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Terms */}
            {terms && !existingMembership && (
              <div className={styles.termsBox}>
                <p className={styles.termsText}>
                  By subscribing, you agree to the Terms & Conditions.
                </p>
              </div>
            )}

            {/* Desktop Join Button (Hidden on Mobile) */}
            {!existingMembership && (
              <button
                className={styles.desktopJoinBtn}
                onClick={handleJoin}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    {" "}
                    <RiLoader4Fill className="spin" /> Processing{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    Subscribe <RiArrowRightLine />{" "}
                  </>
                )}
              </button>
            )}
          </div>

          <SubStarterBranding />
        </div>
      </div>

      {/* === MOBILE STICKY FOOTER (Hidden on Desktop) === */}
      {!existingMembership && (
        <div className={styles.stickyFooter}>
          <div className={styles.priceDisplay}>
            <span className={styles.footerAmount}>
              ${formatPrice(currentPrice.amount)}
            </span>
            <span className={styles.footerInterval}>
              / {formatInterval(currentPrice.interval)}
            </span>
          </div>
          <button
            className={styles.mobileJoinBtn}
            onClick={handleJoin}
            disabled={isPending}
          >
            {isPending ? <RiLoader4Fill className="spin" /> : "Join Now"}{" "}
            <RiArrowRightLine />
          </button>
        </div>
      )}
    </div>
  );
}
