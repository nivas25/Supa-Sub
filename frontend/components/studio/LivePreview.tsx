"use client";
import React from "react";
import Image from "next/image";
import {
  RiVerifiedBadgeFill,
  RiLockFill,
  RiUser3Line,
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiGlobalLine,
  RiGroupLine,
  RiShieldStarLine,
} from "react-icons/ri";
import styles from "./LivePreview.module.css";

interface PlatformDetails {
  enabled: boolean;
  link: string;
  title: string;
}

interface LivePreviewProps {
  name: string;
  bio: string;
  price: string;
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

const PreviewContent = ({
  name,
  bio,
  price,
  avatarUrl,
  bannerUrl,
  platforms,
}: Omit<LivePreviewProps, "handle" | "viewMode">) => {
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
      <div className={styles.scrollContainer}>
        {/* Banner */}
        <div className={styles.coverArea}>
          {bannerUrl ? (
            <Image
              src={bannerUrl}
              alt="Banner"
              fill
              className={styles.bannerImg}
              unoptimized // <--- FIXES THE IMAGE ERROR
            />
          ) : (
            <div className={styles.defaultBanner} />
          )}
        </div>

        {/* Profile */}
        <div className={styles.profileBody}>
          <div className={styles.avatarWrapper}>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                fill
                className={styles.avatarImg}
                unoptimized // <--- FIXES THE IMAGE ERROR
              />
            ) : (
              <div className={styles.avatarFallback}>
                <RiUser3Line />
              </div>
            )}
          </div>

          <h3 className={styles.displayName}>
            {name || "Creator Name"}
            <RiVerifiedBadgeFill className={styles.verifiedIcon} />
          </h3>

          <p className={styles.bioText}>
            {bio || "Welcome to my exclusive community."}
          </p>

          <div className={styles.cleanStats}>
            <div className={styles.statPill}>
              <RiGroupLine /> <span>1.2k Members</span>
            </div>
            <div className={styles.statPill}>
              <RiShieldStarLine />{" "}
              <span>{activePlatforms.length} Channels</span>
            </div>
          </div>

          <div className={styles.accessList}>
            <div className={styles.listHeader}>Includes Access To</div>
            {activePlatforms.length > 0 ? (
              <div className={styles.platformGrid}>
                {activePlatforms.map(([key, data]) => (
                  <div key={key} className={styles.miniPlatformCard}>
                    <div className={styles.miniIconBox}>{getIcon(key)}</div>
                    <div className={styles.miniInfo}>
                      <span className={styles.miniTitle}>{data.title}</span>
                      <span className={styles.miniTag}>{key}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                No platforms connected yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className={styles.actionDock}>
        <div className={styles.priceContainer}>
          <span className={styles.priceValue}>${price || "0"}</span>
          <span className={styles.priceFrequency}>/ 30 days</span>
        </div>
        <button className={styles.joinButton}>Join</button>
      </div>
    </>
  );
};

export default function LivePreview(props: LivePreviewProps) {
  const { handle, viewMode = "mobile" } = props;

  return (
    <div className={styles.previewWrapper}>
      {viewMode === "mobile" ? (
        <div className={styles.mobileFrame}>
          {/* Enhanced Mobile Header */}
          <div className={styles.mobileHeader}>
            <div className={styles.addressPill}>
              <RiLockFill size={12} />
              <span>substarter.com/{handle || "username"}</span>
            </div>
          </div>
          <PreviewContent {...props} />
        </div>
      ) : (
        <div className={styles.desktopFrame}>
          <div className={styles.browserHeader}>
            <div className={styles.trafficLights}>
              <div className={`${styles.dot} ${styles.red}`} />
              <div className={`${styles.dot} ${styles.yellow}`} />
              <div className={`${styles.dot} ${styles.green}`} />
            </div>
            <div className={styles.urlBar}>
              <RiLockFill size={12} color="#94a3b8" />
              <span>substarter.com/{handle || "username"}</span>
            </div>
          </div>
          <div className={styles.desktopInner}>
            <PreviewContent {...props} />
          </div>
        </div>
      )}
    </div>
  );
}
