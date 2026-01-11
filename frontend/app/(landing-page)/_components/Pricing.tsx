"use client";
import React from "react";
import styles from "./Pricing.module.css";
import {
  RiCheckLine,
  RiFlashlightLine,
  RiNodeTree,
  RiShieldFlashLine,
} from "react-icons/ri";

export default function Pricing() {
  const features = [
    "90% Revenue Share",
    "Zero-Leak Encryption",
    "Auto-Sync Groups",
    "Instant Payouts",
    "Analytics Dashboard",
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.statusLabel}>
            <span className={styles.pulse}></span>
            PROTOCOL_v1.0_READY
          </div>
          <h2 className={styles.title}>
            THE <span className={styles.outline}>PROFIT</span> ENGINE
          </h2>
        </div>

        <div className={styles.pricingCard}>
          {/* Top Section: The Big Number */}
          <div className={styles.revenueHero}>
            <div className={styles.splitWrapper}>
              <h3 className={styles.bigNumber}>90</h3>
              <div className={styles.splitDivider}>
                <span className={styles.percent}>%</span>
                <div className={styles.verticalLine}></div>
                <span className={styles.ten}>10</span>
              </div>
            </div>
            <p className={styles.heroText}>YOU KEEP THE LION&apos;S SHARE</p>
          </div>

          {/* Bottom Section: The Specs */}
          <div className={styles.detailsArea}>
            <div className={styles.featureList}>
              {features.map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <RiCheckLine className={styles.check} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button className={styles.ctaButton}>
              INITIALIZE_ENGINE
              <RiFlashlightLine />
            </button>

            <div className={styles.securityTag}>
              <RiShieldFlashLine />
              SECURE_PAYMENT_GATEWAY_ACTIVE
            </div>
          </div>

          {/* Hardware Corner Accents */}
          <div className={styles.cornerTL}></div>
          <div className={styles.cornerBR}></div>
        </div>

        <div className={styles.footerNote}>
          <RiNodeTree />
          SCALE_WITHOUT_LIMITS_2026
        </div>
      </div>
    </section>
  );
}
