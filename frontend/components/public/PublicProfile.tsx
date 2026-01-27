"use client";
import React, { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { joinCommunity } from "@/app/actions/join";
import { getSecureDiscordInvite } from "@/app/actions/access";
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
  RiErrorWarningLine,
  RiFileCopyLine,
  RiCheckDoubleLine,
  RiCloseLine,
  RiRefreshLine,
} from "react-icons/ri";
import styles from "./PublicProfile.module.css";

// --- FONT MAPPING ---
const FONT_MAP: Record<string, string> = {
  outfit: "'Outfit', sans-serif",
  space: "'Space Grotesk', sans-serif",
  syne: "'Syne', sans-serif",
  epilogue: "'Epilogue', sans-serif",
  dmserif: "'DM Serif Display', serif",
  playfair: "'Playfair Display', serif",
  libre: "'Libre Baskerville', serif",
  jetbrains: "'JetBrains Mono', monospace",
  oswald: "'Oswald', sans-serif",
  caveat: "'Caveat', cursive",
  inter: "'Inter', sans-serif",
};

// --- INTERFACES ---
interface PlatformStatus {
  enabled: boolean;
  title: string;
}
interface PriceOption {
  amount: number;
  interval: string;
}
interface PublicProfileProps {
  pageId: string;
  name: string;
  bio: string;
  prices: PriceOption[];
  handle: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  platforms: {
    telegram: PlatformStatus;
    discord: PlatformStatus;
    whatsapp: PlatformStatus & { link?: string };
  };
  existingMembership?: {
    id: string;
    expires_at: string;
    discord_user_id?: string | null;
    telegram_user_id?: number | null;
  } | null;
  features?: string[];
  welcomeMessage?: string;
  terms?: string;
  socialLinks?: { platform: string; url: string }[];
  themeColor?: string;
  buttonText?: string;
  buttonStyle?: string;
  fontStyle?: string;
}

// --- HELPERS ---
const formatInterval = (interval: string) => {
  switch (interval?.toLowerCase()) {
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
const formatPrice = (amount: number) => Number(amount).toLocaleString();
const getContrastColor = (hexColor: string) => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? "#000000" : "#ffffff";
};
const getSocialIcon = (platform: string) => {
  const clean = platform?.toLowerCase() || "";
  if (clean.includes("twitter") || clean.includes("x"))
    return <RiTwitterXFill />;
  if (clean.includes("instagram")) return <RiInstagramLine />;
  if (clean.includes("youtube")) return <RiYoutubeFill />;
  if (clean.includes("facebook")) return <RiFacebookCircleFill />;
  return <RiGlobalLine />;
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

// --- MAIN COMPONENT ---
export default function PublicProfile({
  pageId,
  name,
  bio,
  prices,
  handle,
  avatarUrl,
  bannerUrl,
  platforms,
  existingMembership,
  features = [],
  welcomeMessage,
  terms,
  socialLinks = [],
  themeColor = "#000000",
  buttonText = "Subscribe",
  buttonStyle = "pill",
  fontStyle = "outfit",
}: PublicProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [accessLoading, setAccessLoading] = useState<string | null>(null);

  // MODAL STATES
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (pageId) registerView(pageId);
  }, [pageId]);

  const currentPrice = prices?.[selectedPriceIdx] || {
    amount: 0,
    interval: "monthly",
  };
  const activePlatforms = Object.entries(platforms).filter(
    ([_, d]) => d.enabled,
  );
  const buttonRadius =
    buttonStyle === "pill"
      ? "100px"
      : buttonStyle === "rounded"
        ? "8px"
        : "0px";
  const buttonTextColor = getContrastColor(themeColor);
  const fontFamily = FONT_MAP[fontStyle] || "'Outfit', sans-serif";

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
        alert("Payment initialization failed.");
      }
    });
  };

  const handleCopyCommand = () => {
    const command = `/activate ${existingMembership?.id}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDiscord = async () => {
    setAccessLoading("discord");
    try {
      const response = await getSecureDiscordInvite(pageId);
      if (response.error) {
        alert(response.error);
      } else if (response.url) {
        // We open the Invite but DO NOT lock the button
        // The button only locks when the DB updates (user verifies)
        window.open(response.url, "_blank");
      }
    } catch (e) {
      alert("Security check failed.");
    } finally {
      setAccessLoading(null);
    }
  };

  const handleAccessPlatform = async (key: string, publicLink?: string) => {
    // 1. TELEGRAM
    if (key === "telegram" && existingMembership) {
      if (existingMembership.telegram_user_id) {
        alert("✅ You are already in the Telegram channel.");
        return;
      }
      window.open(
        `https://t.me/substarter_offical_bot?start=${existingMembership.id}`,
        "_blank",
      );
      return;
    }

    // 2. DISCORD (Trigger Modal)
    if (key === "discord") {
      if (existingMembership?.discord_user_id) {
        alert("✅ Access Active! You are already verified.");
        return;
      }
      setShowDiscordModal(true);
      return;
    }

    // 3. WHATSAPP
    if (publicLink) {
      window.open(
        publicLink.startsWith("http") ? publicLink : `https://${publicLink}`,
        "_blank",
      );
    }
  };

  return (
    <div className={styles.pageContainer} style={{ fontFamily }}>
      {/* --- DISCORD MODAL --- */}
      {showDiscordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowDiscordModal(false)}
            >
              <RiCloseLine size={24} />
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <RiDiscordFill size={32} color="#fff" />
              </div>
              <h3 className={styles.modalTitle}>Connect Discord</h3>
              <p className={styles.modalSub}>Unlock your channels in 2 steps</p>
            </div>

            <div className={styles.stepList}>
              <div className={styles.stepBox}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepContent}>
                  <p className={styles.stepText}>
                    Copy your activation command
                  </p>
                  <button
                    className={styles.copyCommandBtn}
                    onClick={handleCopyCommand}
                  >
                    {copied ? (
                      <RiCheckDoubleLine color="#22c55e" />
                    ) : (
                      <RiFileCopyLine />
                    )}
                    <span>{copied ? "Copied!" : "/activate ..."}</span>
                  </button>
                </div>
              </div>

              <div className={styles.stepBox}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepContent}>
                  <p className={styles.stepText}>
                    Join server and paste it in <b>#verify-here</b>
                  </p>
                </div>
              </div>
            </div>

            <button
              className={styles.modalActionBtn}
              onClick={handleOpenDiscord}
              disabled={accessLoading === "discord"}
            >
              {accessLoading === "discord" ? (
                <RiLoader4Fill className="spin" />
              ) : (
                "Open Discord Server"
              )}
            </button>

            <button
              className={styles.modalSecondaryBtn}
              onClick={() => router.refresh()}
            >
              <RiRefreshLine /> I've verified, refresh page
            </button>
          </div>
        </div>
      )}

      {/* ... (KEEP GLOBAL STYLES) ... */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=DM+Serif+Display&family=Epilogue:wght@500;700&family=JetBrains+Mono:wght@500&family=Libre+Baskerville:wght@400;700&family=Oswald:wght@500&family=Outfit:wght@400;600;800&family=Playfair+Display:wght@600&family=Space+Grotesk:wght@500;700&family=Syne:wght@600;800&display=swap");
      `}</style>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
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
              <h1 className={styles.name}>{name || "Creator"}</h1>
              <p className={styles.bio}>{bio || "Welcome to my community."}</p>
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

          {welcomeMessage && (
            <div className={styles.welcomeCard}>
              <div
                className={styles.welcomeIconWrapper}
                style={{ color: themeColor }}
              >
                <RiChatQuoteLine size={16} />
              </div>
              <p className={styles.welcomeText}>{welcomeMessage}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className={styles.featuresCard}>
              <span className={styles.sectionTitle}>
                <RiShieldCheckLine /> What's Included
              </span>
              <div className={styles.featureList}>
                {features.map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <RiCheckboxCircleFill
                      color={themeColor}
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

        <div className={styles.rightCol}>
          <div className={styles.purchaseCard}>
            {existingMembership ? (
              <>
                <span className={styles.sectionTitle}>
                  <RiLock2Fill style={{ color: "#22c55e" }} /> You Have Access
                </span>
                <div className={styles.accessGrid}>
                  {activePlatforms.map(([key, data]) => {
                    // CRITICAL: We only lock if the Database says they are verified
                    const isDiscordJoined =
                      key === "discord" && existingMembership?.discord_user_id;
                    const isTelegramJoined =
                      key === "telegram" &&
                      existingMembership?.telegram_user_id;
                    const isJoined = isDiscordJoined || isTelegramJoined;

                    return (
                      <div
                        key={key}
                        className={`${styles.accessCard} ${isJoined ? styles.disabledCard : ""}`}
                        onClick={() =>
                          !isJoined &&
                          handleAccessPlatform(key, (data as any).link)
                        }
                        style={
                          isJoined
                            ? {
                                opacity: 0.7,
                                cursor: "default",
                                background: "#f0fdf4",
                                borderColor: "#bbf7d0",
                              }
                            : {}
                        }
                      >
                        <div
                          className={styles.accessIconBox}
                          style={{
                            color: isJoined ? "#16a34a" : themeColor,
                            background: isJoined
                              ? "#dcfce7"
                              : `${themeColor}15`,
                          }}
                        >
                          {isJoined ? (
                            <RiCheckboxCircleFill />
                          ) : accessLoading === key ? (
                            <RiLoader4Fill className="spin" />
                          ) : (
                            getPlatformIcon(key)
                          )}
                        </div>
                        <div className={styles.accessMeta}>
                          <span className={styles.accessTitle}>
                            {data.title}
                          </span>
                          <span
                            className={styles.accessSub}
                            style={{ color: isJoined ? "#16a34a" : "#15803d" }}
                          >
                            {isJoined
                              ? "✅ Verified"
                              : accessLoading === key
                                ? "Processing..."
                                : "Click to Join"}
                            {!isJoined && (
                              <RiExternalLinkLine
                                style={{ marginBottom: -2, marginLeft: 4 }}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              // NON-MEMBER VIEW (Pricing)
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
                        <div
                          className={styles.accessIconBox}
                          style={{
                            color: themeColor,
                            background: `${themeColor}15`,
                          }}
                        >
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
                <div className={styles.pricingGrid}>
                  <span className={styles.sectionTitle}>Choose Plan</span>
                  {prices.length > 0 ? (
                    prices.map((p, i) => (
                      <div
                        key={i}
                        className={`${styles.priceCard} ${i === selectedPriceIdx ? styles.activePrice : ""}`}
                        onClick={() => setSelectedPriceIdx(i)}
                        style={
                          i === selectedPriceIdx
                            ? { borderColor: themeColor }
                            : {}
                        }
                      >
                        <div
                          className={styles.activeIndicator}
                          style={{ background: themeColor }}
                        ></div>
                        <div className={styles.intervalBadge}>
                          {formatInterval(p.interval)}{" "}
                          <span className={styles.intervalSub}>Recurring</span>
                        </div>
                        <div className={styles.priceTag}>
                          ${formatPrice(p.amount)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className={styles.priceCard}
                      style={{ borderColor: "#ef4444", background: "#fef2f2" }}
                    >
                      <div
                        className={styles.intervalBadge}
                        style={{ color: "#b91c1c" }}
                      >
                        Configuration Error
                      </div>
                      <RiErrorWarningLine color="#ef4444" size={24} />
                    </div>
                  )}
                </div>
                {terms && (
                  <div className={styles.termsBox}>
                    <p className={styles.termsText}>
                      By subscribing, you agree to the Terms & Conditions.
                    </p>
                  </div>
                )}
                {prices.length > 0 && (
                  <button
                    className={styles.desktopJoinBtn}
                    onClick={handleJoin}
                    disabled={isPending}
                    style={{
                      background: themeColor,
                      color: buttonTextColor,
                      borderRadius: buttonRadius,
                    }}
                  >
                    {isPending ? (
                      <>
                        <RiLoader4Fill className="spin" /> Processing
                      </>
                    ) : (
                      <>
                        {buttonText} <RiArrowRightLine />
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
          <SubStarterBranding />
        </div>
      </div>
      {!existingMembership && prices.length > 0 && (
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
            style={{
              background: themeColor,
              color: buttonTextColor,
              borderRadius: buttonRadius,
            }}
          >
            {isPending ? <RiLoader4Fill className="spin" /> : "Join Now"}{" "}
            <RiArrowRightLine />
          </button>
        </div>
      )}
    </div>
  );
}
