"use client";
import React, { useTransition, useMemo, useEffect } from "react";
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
  RiGroupLine,
  RiShieldStarLine,
  RiLoader4Fill,
  RiExternalLinkLine,
  RiCheckDoubleLine,
  RiTimeLine,
  RiFlashlightFill,
} from "react-icons/ri";
import styles from "./PublicProfile.module.css";

interface PlatformDetails {
  enabled: boolean;
  link: string;
  title: string;
}

interface PublicProfileProps {
  name: string;
  bio: string;
  price: string;
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
    expires_at: string;
  } | null;
  groupId?: string;
}

export default function PublicProfile({
  name,
  bio,
  price,
  handle,
  memberCount,
  avatarUrl,
  bannerUrl,
  platforms,
  existingMembership,
  groupId,
}: PublicProfileProps) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (groupId) {
      registerView(groupId);
    }
  }, [groupId]);

  const daysRemaining = useMemo(() => {
    if (!existingMembership?.expires_at) return 0;
    const diff =
      new Date(existingMembership.expires_at).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  }, [existingMembership]);

  const activePlatforms = Object.entries(platforms).filter(
    ([_, d]) => d.enabled,
  );

  const formatCount = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  const getIcon = (key: string) => {
    if (key === "telegram") return <RiTelegramFill size={28} color="#229ED9" />;
    if (key === "discord") return <RiDiscordFill size={28} color="#5865F2" />;
    if (key === "whatsapp") return <RiWhatsappFill size={28} color="#25D366" />;
    return <RiGlobalLine size={28} />;
  };

  const handleJoin = () => {
    if (existingMembership) return;
    startTransition(async () => {
      const result = await joinCommunity(handle, Number(price));
      if (result?.redirectUrl) window.location.href = result.redirectUrl;
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.coverArea}>
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt="Banner"
            fill
            className={styles.bannerImg}
            unoptimized // <--- FIXES IMAGE ERROR
          />
        ) : (
          <div className={styles.defaultBanner} />
        )}
      </div>

      <div className={styles.profileBody}>
        <div className={styles.avatarWrapper}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              fill
              className={styles.avatarImg}
              unoptimized // <--- FIXES IMAGE ERROR
            />
          ) : (
            <div className={styles.avatarFallback}>
              <RiUser3Line />
            </div>
          )}
        </div>

        <h1 className={styles.displayName}>
          {name || "Creator Name"}
          <RiVerifiedBadgeFill className={styles.verifiedIcon} />
        </h1>

        <p className={styles.bioText}>
          {bio || "Welcome to my exclusive community."}
        </p>

        <div className={styles.cleanStats}>
          <div className={styles.statPill}>
            <RiGroupLine /> {formatCount(memberCount)} Members
          </div>
          <div className={styles.statPill}>
            <RiShieldStarLine /> {activePlatforms.length} Channels
          </div>
        </div>

        <div className={styles.accessSection}>
          <div className={styles.sectionHeader}>
            {existingMembership ? "Your Access Links" : "Membership Includes"}
          </div>

          {activePlatforms.map(([key, data]) => {
            const isMember = !!existingMembership;
            const CardComponent = isMember ? "a" : "div";
            const hrefProps = isMember
              ? {
                  href: data.link.startsWith("http")
                    ? data.link
                    : `https://${data.link}`,
                  target: "_blank",
                }
              : {};

            return (
              <CardComponent
                key={key}
                className={`${styles.platformCard} ${
                  isMember ? styles.memberCard : ""
                }`}
                {...hrefProps}
              >
                <div className={styles.iconBox}>{getIcon(key)}</div>
                <div className={styles.platformInfo}>
                  <span className={styles.platformTitle}>{data.title}</span>
                  <span className={styles.platformMeta}>
                    {isMember ? "Click to open" : `Private ${key} group`}
                  </span>
                </div>
                {isMember ? (
                  <div className={styles.actionIcon}>
                    <RiExternalLinkLine />
                  </div>
                ) : (
                  <div className={styles.lockIcon}>
                    <RiCheckDoubleLine />
                  </div>
                )}
              </CardComponent>
            );
          })}
        </div>

        <div className={styles.brandingFooter}>
          <span className={styles.brandLabel}>Powered by</span>
          <div className={styles.brandLogo}>
            <div className={styles.brandIcon}>
              <RiFlashlightFill size={12} />
            </div>
            <span className={styles.brandName}>SubStarter</span>
          </div>
        </div>
      </div>

      <div className={styles.actionDock}>
        <div className={styles.dockContent}>
          {existingMembership ? (
            <>
              <div className={styles.memberStatus}>
                <div className={styles.pulseDot} />
                <span className={styles.activeText}>Active Member</span>
              </div>
              <div className={styles.expiryInfo}>
                <RiTimeLine className={styles.timeIcon} />
                <span>
                  {daysRemaining > 0
                    ? `${daysRemaining} days left`
                    : "Expiring"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.priceInfo}>
                <span className={styles.priceBig}>${price}</span>
                <span className={styles.priceSmall}>/ 30 days</span>
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
                  "Join Now"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
