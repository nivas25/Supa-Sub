"use client";
import React from "react";
import styles from "./Features.module.css";
import {
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiUserFollowLine,
  RiBarChart2Line,
  RiMoneyDollarCircleLine,
  RiLockPasswordLine,
} from "react-icons/ri";

export default function Features() {
  return (
    <section className={styles.wrapper}>
      {/* Subtle Dot Grid Pattern */}
      <div className={styles.dotPattern} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>
            Manage Your <span className={styles.purpleText}>Inner Circle.</span>
          </h2>
          <p className={styles.subText}>
            Automated management for modern communities.
          </p>
        </div>

        <div className={styles.compactGrid}>
          {/* Card 1: Automation */}
          <div className={`${styles.card} ${styles.purpleCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <RiUserFollowLine />
              </div>
              <div className={styles.platformIcons}>
                <RiTelegramFill /> <RiWhatsappFill /> <RiDiscordFill />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Auto-Member Sync</h3>
            <p className={styles.cardDesc}>
              Instantly add or remove members based on their payment status.
              Zero manual admin work required.
            </p>
          </div>

          {/* Card 2: 5% Commission */}
          <div className={`${styles.card} ${styles.yellowCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <RiMoneyDollarCircleLine />
              </div>
              <span className={styles.feeBadge}>5% FLAT FEE</span>
            </div>
            <h3 className={styles.cardTitle}>Global Revenue</h3>
            <p className={styles.cardDesc}>
              Keep 95% of your earnings. No monthly subscriptions or hidden
              platform taxes.
            </p>
          </div>

          {/* Card 3: Analytics */}
          <div className={`${styles.card} ${styles.redCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <RiBarChart2Line />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Real-time Insights</h3>
            <p className={styles.cardDesc}>
              Track your community growth, churn rates, and daily revenue
              through a simple dashboard.
            </p>
            <div className={styles.miniGraph}>
              <div className={styles.bar} style={{ height: "40%" }} />
              <div className={styles.bar} style={{ height: "70%" }} />
              <div className={styles.bar} style={{ height: "50%" }} />
              <div className={styles.bar} style={{ height: "90%" }} />
            </div>
          </div>

          {/* Card 4: Security */}
          <div className={`${styles.card} ${styles.darkCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <RiLockPasswordLine />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Access Shield</h3>
            <p className={styles.cardDesc}>
              Secure, non-sharable invite links and anti-leak technology to
              protect your premium content.
            </p>
            <div className={styles.secureTag}>ENCRYPTION_ACTIVE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
