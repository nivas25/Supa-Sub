"use client";
import React from "react";
import styles from "./Features.module.css";
import {
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiMoneyDollarCircleLine,
  RiShieldFlashLine,
  RiUserFollowLine,
  RiFlashlightLine,
} from "react-icons/ri";

export default function Features() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* iOS-Style Minimal Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <RiFlashlightLine /> <span>CAPABILITIES</span>
          </div>
          <h2 className={styles.mainTitle}>
            Designed for the <br />
            <span className={styles.highlight}>Modern Creator.</span>
          </h2>
        </div>

        <div className={styles.fusionGrid}>
          {/* FEATURE 1: SYNC */}
          <div className={styles.fusionCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <RiUserFollowLine />
              </div>
              <div className={styles.platformIcons}>
                <RiWhatsappFill className={styles.wa} />
                <RiTelegramFill className={styles.tg} />
                <RiDiscordFill className={styles.ds} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Autonomous Sync</h3>
            <p className={styles.cardDesc}>
              Instantly manage member access across all major platforms with
              zero manual effort.
            </p>
          </div>

          {/* FEATURE 2: REVENUE */}
          <div className={styles.fusionCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <RiMoneyDollarCircleLine />
              </div>
              <div className={styles.splitBadge}>95/5</div>
            </div>
            <h3 className={styles.cardTitle}>Revenue Engine</h3>
            <p className={styles.cardDesc}>
              Keep 95% of every transaction. High-performance payments with no
              hidden monthly taxes.
            </p>
          </div>

          {/* FEATURE 3: SECURITY */}
          <div className={styles.fusionCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <RiShieldFlashLine />
              </div>
              <div className={styles.statusLight}>LIVE</div>
            </div>
            <h3 className={styles.cardTitle}>Content Shield</h3>
            <p className={styles.cardDesc}>
              Anti-leak technology and secure links to protect your premium
              community content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
