"use client";
import React from "react";
import styles from "./Pricing.module.css";
import {
  RiCheckLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiPieChart2Fill,
} from "react-icons/ri";

export default function Pricing() {
  const features = [
    "95% Revenue Share",
    "Automated Community Sync",
    "Private Access Protection",
    "Real-time Payouts",
    "Growth Analytics Dashboard",
  ];

  return (
    <section className={styles.wrapper}>
      {/* High-visibility background pattern */}
      <div className={styles.dotPattern} />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.statusLabel}>
            <span className={styles.pulse}></span>
            PARTNER_PROGRAM_ACTIVE
          </div>
          <h2 className={styles.title}>
            KEEP YOUR <span className={styles.stylishText}>REVENUE.</span>
          </h2>
          <p className={styles.subTitle}>We only make money when you do.</p>
        </div>

        <div className={styles.pricingCard}>
          {/* Revenue Split Hero */}
          <div className={styles.revenueHero}>
            <div className={styles.splitWrapper}>
              <h3 className={styles.bigNumber}>95</h3>
              <div className={styles.splitDivider}>
                <span className={styles.percent}>%</span>
                <div className={styles.verticalLine}></div>
                <span className={styles.fee}>5</span>
              </div>
            </div>
            <p className={styles.heroText}>YOUR PARTNER SHARE</p>
          </div>

          {/* Features and Action */}
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
              START SELLING NOW
              <RiArrowRightLine />
            </button>

            <div className={styles.securityTag}>
              <RiShieldCheckLine />
              NO MONTHLY FEES • NO SETUP COSTS
            </div>
          </div>
        </div>

        <div className={styles.footerNote}>
          <RiPieChart2Fill />
          TRANSPARENT_PRICING_MODEL_2026
        </div>
      </div>
    </section>
  );
}
