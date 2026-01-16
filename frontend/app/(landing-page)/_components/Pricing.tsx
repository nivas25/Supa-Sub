"use client";
import React from "react";
import styles from "./Pricing.module.css";
import {
  RiCheckLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiSparklingFill,
  RiMoneyDollarCircleFill,
  RiCoinFill,
  RiStockFill,
  RiWallet3Fill,
  RiPercentFill,
  RiBankFill,
  RiSafe2Fill,
  RiGlobalLine,
} from "react-icons/ri";

export default function Pricing() {
  return (
    <section className={styles.wrapper}>
      {/* --- EXPANDED FLOATING BACKGROUND --- */}
      <div className={styles.bgShapes}>
        <div className={`${styles.shape} ${styles.shapeDollar}`}>
          <RiMoneyDollarCircleFill />
        </div>
        <div className={`${styles.shape} ${styles.shapeCoin}`}>
          <RiCoinFill />
        </div>
        <div className={`${styles.shape} ${styles.shapeChart}`}>
          <RiStockFill />
        </div>
        <div className={`${styles.shape} ${styles.shapeWallet}`}>
          <RiWallet3Fill />
        </div>
        {/* New Shapes for Desktop Density */}
        <div className={`${styles.shape} ${styles.shapePercent}`}>
          <RiPercentFill />
        </div>
        <div className={`${styles.shape} ${styles.shapeBank}`}>
          <RiBankFill />
        </div>
        <div className={`${styles.shape} ${styles.shapeSafe}`}>
          <RiSafe2Fill />
        </div>
        <div className={`${styles.shape} ${styles.shapeGlobal}`}>
          <RiGlobalLine />
        </div>
      </div>

      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.pill}>
            <RiSparklingFill /> <span>CREATOR FIRST MODEL</span>
          </div>
          <h2 className={styles.title}>
            Your Profit <span className={styles.gradientText}>Engine.</span>
          </h2>
        </div>

        <div className={styles.glassCard}>
          <div className={styles.splitHeader}>
            <div className={styles.splitLeft}>
              <span className={styles.bigPercent}>95%</span>
              <span className={styles.splitLabel}>YOUR REVENUE</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.splitRight}>
              <div className={styles.feeBadge}>5% FLAT FEE</div>
              <span className={styles.splitLabel}>PER TRANSACTION</span>
            </div>
          </div>

          <div className={styles.bodyContent}>
            <p className={styles.mainText}>
              When a subscriber joins, <strong>95% goes directly to you</strong>
              . We take a flat 5% fee for each subscription to keep your
              infrastructure running on autopilot.
            </p>

            <div className={styles.featureStack}>
              {[
                "Instant Payouts",
                "Automated Member Sync",
                "Anti-Fraud Protection",
                "Unlimited Growth",
              ].map((feat, i) => (
                <div key={i} className={styles.featItem}>
                  <div className={styles.checkCircle}>
                    <RiCheckLine />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button className={styles.glowButton}>
              START EARNING <RiArrowRightLine />
            </button>

            <div className={styles.footerNote}>
              <RiShieldCheckLine />{" "}
              <span>CANCEL ANYTIME • NO HIDDEN COSTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
