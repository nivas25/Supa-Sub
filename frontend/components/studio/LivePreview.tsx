"use client";
import React, { useState } from "react";
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
  RiLock2Fill,
  RiChatQuoteLine,
  RiShieldCheckLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import styles from "./LivePreview.module.css";

interface LivePreviewProps {
  name: string;
  bio: string;
  prices: Price[];
  features?: string[];
  handle: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  platforms: PlatformMap;
  buttonText: string;
  socialLinks: SocialLink[];
  themeColor: string;
  buttonTextColor?: string;
  buttonStyle: string;
  fontStyle: string;
  viewMode?: "mobile" | "desktop";
  welcomeMessage?: string;
  terms?: string;
}

interface Price {
  amount: string | number;
  interval: string;
}

interface PlatformMap {
  [key: string]: { enabled: boolean; title?: string };
}

interface SocialLink {
  url: string;
  platform: string;
}

// --- FONT MAPPING (Must match BrandingStep) ---
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

// --- HELPER FUNCTIONS ---
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

const formatPrice = (amount: string | number) => {
  if (!amount) return "0";
  return Number(amount).toLocaleString();
};

const getSocialIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
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

// --- SUB-COMPONENTS ---

const IdentitySection = ({
  name,
  bio,
  avatarUrl,
  bannerUrl,
  socialLinks,
  themeColor,
}: any) => (
  <div className={styles.identityCard}>
    <div className={styles.bannerFrame}>
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt="Banner"
          className={styles.bannerImg}
          loading="eager" // Force fast load
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
    </div>

    <div className={styles.profileContent}>
      <div className={styles.avatarWrapper}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className={styles.bannerImg} // Reusing cover style for fill
            loading="eager" // Force fast load
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiUser3Line size={32} color="#cbd5e1" />
          </div>
        )}
      </div>

      <div className={styles.nameRow}>
        <h1 className={styles.name}>{name || "Creator Name"}</h1>
      </div>

      <p className={styles.bio}>
        {bio ||
          "Join my exclusive community to get access to premium content, insights, and more."}
      </p>

      {socialLinks && socialLinks.length > 0 && (
        <div className={styles.socialRow}>
          {socialLinks.map((s: SocialLink, i: number) => (
            <a
              key={i}
              href={s.url}
              className={styles.socialBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getSocialIcon(s.platform)}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

const FeaturesList = ({ features, viewMode, themeColor }: any) => {
  if (!features || features.length === 0) return null;
  return (
    <div className={viewMode === "desktop" ? styles.featuresCard : ""}>
      <div className={styles.featureList}>
        <span className={styles.sectionTitle}>
          <RiShieldCheckLine /> What's Included
        </span>
        {features.map((feat: string, i: number) => (
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
  );
};

const CheckoutContent = ({
  activePlatforms,
  prices,
  selectedPriceIdx,
  terms,
  themeColor,
  onSelectPrice,
}: any) => {
  return (
    <>
      {activePlatforms.length > 0 && (
        <div className={styles.accessGrid}>
          <span className={styles.sectionTitle}>
            <RiLock2Fill /> Instant Access
          </span>
          {activePlatforms.map(([key, data]: any) => (
            <div key={key} className={styles.bigAccessCard}>
              <div
                className={styles.accessIconBox}
                style={{ color: themeColor, background: `${themeColor}15` }}
              >
                {getPlatformIcon(key)}
              </div>
              <div className={styles.accessMeta}>
                <span className={styles.accessTitle}>
                  {data.title || key + " Group"}
                </span>
                <span className={styles.accessSub}>Locked • Members Only</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {prices.length > 0 && (
        <div className={styles.pricingGrid}>
          <span className={styles.sectionTitle}>Choose Plan</span>
          {prices.map((p: Price, i: number) => {
            const isActive = i === selectedPriceIdx;
            return (
              <div
                key={i}
                className={`${styles.priceCard} ${isActive ? styles.activePrice : ""}`}
                onClick={() => onSelectPrice(i)}
              >
                <div className={styles.activeIndicator}></div>
                <div className={styles.intervalBadge}>
                  {formatInterval(p.interval)}
                  <span className={styles.intervalSub}>Recurring</span>
                </div>
                <div className={styles.priceTag}>${formatPrice(p.amount)}</div>
              </div>
            );
          })}
        </div>
      )}

      {terms && (
        <div className={styles.termsBox}>
          <p className={styles.termsText}>
            By subscribing, you agree to the{" "}
            <span className={styles.termsLink}>Terms & Conditions</span>.<br />
            <span style={{ opacity: 0.6, fontSize: "0.7rem" }}>
              {terms.slice(0, 50)}...
            </span>
          </p>
        </div>
      )}
    </>
  );
};

const StickyFooter = ({
  currentPrice,
  themeColor,
  buttonTextColor,
  buttonText,
  borderRadius,
}: any) => {
  const priceString = formatPrice(currentPrice.amount);
  const priceSizeClass =
    priceString.length > 6
      ? styles["text-sm"]
      : priceString.length > 4
        ? styles["text-md"]
        : styles["text-lg"];

  return (
    <div className={styles.stickyFooter}>
      <div className={styles.priceDisplay}>
        <span className={`${styles.footerAmount} ${priceSizeClass}`}>
          ${priceString}
        </span>
        <span className={styles.footerInterval}>
          / {formatInterval(currentPrice.interval)}
        </span>
      </div>
      <button
        className={styles.joinBtn}
        style={{
          background: themeColor,
          color: buttonTextColor,
          borderRadius: borderRadius,
        }}
      >
        {buttonText || "Join Now"} <RiArrowRightLine />
      </button>
    </div>
  );
};

export default function LivePreview({
  name,
  bio,
  prices,
  features = [],
  handle,
  avatarUrl,
  bannerUrl,
  platforms,
  buttonText,
  socialLinks,
  themeColor,
  buttonTextColor = "#ffffff",
  buttonStyle,
  fontStyle,
  viewMode = "desktop",
  welcomeMessage,
  terms,
}: LivePreviewProps) {
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);

  const currentPrice =
    prices && prices.length > 0
      ? prices[selectedPriceIdx]
      : { amount: "0", interval: "monthly" };

  const activePlatforms = Object.entries(platforms).filter(
    ([, data]) => data.enabled,
  );

  // --- BUTTON SHAPE LOGIC (Matches BrandingStep) ---
  const borderRadius =
    buttonStyle === "pill"
      ? "100px"
      : buttonStyle === "rounded"
        ? "8px" // Distinct Rounded Rectangle
        : "0px";

  // --- FONT LOGIC ---
  const fontFamily = FONT_MAP[fontStyle] || "'Outfit', sans-serif";

  const customStyle = {
    "--accent": themeColor || "#000000",
    fontFamily: fontFamily, // Applies dynamic font to entire wrapper
  } as React.CSSProperties;

  return (
    <div className={styles.previewWrapper} style={customStyle}>
      {/* Ensure Fonts Load in Preview */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=DM+Serif+Display&family=Epilogue:wght@500;700&family=JetBrains+Mono:wght@500&family=Libre+Baskerville:wght@400;700&family=Oswald:wght@500&family=Outfit:wght@400;600;800&family=Playfair+Display:wght@600&family=Space+Grotesk:wght@500;700&family=Syne:wght@600;800&display=swap");
      `}</style>

      <div
        className={
          viewMode === "mobile" ? styles.mobileFrame : styles.desktopFrame
        }
      >
        {viewMode === "desktop" && (
          <div className={styles.pageBackground}></div>
        )}

        <div className={styles.browserChrome}>
          {viewMode === "desktop" && (
            <div className={styles.windowControls}>
              <div className={`${styles.dot} ${styles.red}`}></div>
              <div className={`${styles.dot} ${styles.yellow}`}></div>
              <div className={`${styles.dot} ${styles.green}`}></div>
            </div>
          )}
          <div className={styles.urlPill}>
            <RiLock2Fill size={12} />
            substarter.com/{handle || "username"}
          </div>
          {viewMode === "desktop" && <div style={{ width: 40 }}></div>}
        </div>

        {viewMode === "desktop" ? (
          <div className={styles.scrollArea}>
            <div className={styles.desktopLayout}>
              <div className={styles.leftCol}>
                <IdentitySection
                  name={name}
                  bio={bio}
                  avatarUrl={avatarUrl}
                  bannerUrl={bannerUrl}
                  socialLinks={socialLinks}
                  themeColor={themeColor}
                />
                {welcomeMessage && (
                  <div className={styles.welcomeCard}>
                    <div className={styles.welcomeIconWrapper}>
                      <RiChatQuoteLine size={16} />
                    </div>
                    <p className={styles.welcomeText}>{welcomeMessage}</p>
                  </div>
                )}
                <FeaturesList
                  features={features}
                  viewMode={viewMode}
                  themeColor={themeColor}
                />
              </div>
              <div className={styles.rightCol}>
                <div className={styles.purchaseCardDesktop}>
                  <CheckoutContent
                    activePlatforms={activePlatforms}
                    prices={prices}
                    selectedPriceIdx={selectedPriceIdx}
                    terms={terms}
                    themeColor={themeColor}
                    onSelectPrice={setSelectedPriceIdx}
                  />
                  <button
                    className={styles.joinBtn}
                    style={{
                      width: "100%",
                      marginTop: 24,
                      justifyContent: "center",
                      background: themeColor,
                      color: buttonTextColor,
                      borderRadius: borderRadius,
                    }}
                  >
                    {buttonText || "Subscribe"} <RiArrowRightLine />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.scrollArea}>
              <div className={styles.mobileLayout}>
                <IdentitySection
                  name={name}
                  bio={bio}
                  avatarUrl={avatarUrl}
                  bannerUrl={bannerUrl}
                  socialLinks={socialLinks}
                  themeColor={themeColor}
                />
                <div className={styles.mobileContentStack}>
                  {welcomeMessage && (
                    <div className={styles.welcomeCard}>
                      <div className={styles.welcomeIconWrapper}>
                        <RiChatQuoteLine size={16} />
                      </div>
                      <p className={styles.welcomeText}>{welcomeMessage}</p>
                    </div>
                  )}
                  <FeaturesList
                    features={features}
                    viewMode={viewMode}
                    themeColor={themeColor}
                  />
                  <CheckoutContent
                    activePlatforms={activePlatforms}
                    prices={prices}
                    selectedPriceIdx={selectedPriceIdx}
                    terms={terms}
                    themeColor={themeColor}
                    onSelectPrice={setSelectedPriceIdx}
                  />
                </div>
              </div>
            </div>
            <StickyFooter
              currentPrice={currentPrice}
              themeColor={themeColor}
              buttonTextColor={buttonTextColor}
              buttonText={buttonText}
              borderRadius={borderRadius}
            />
          </>
        )}
      </div>
    </div>
  );
}
