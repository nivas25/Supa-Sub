"use client";
import React from "react";
import styles from "./Identity.module.css";
import { RiCheckLine, RiPieChart2Fill, RiUserStarLine } from "react-icons/ri";

export default function Identity() {
  return (
    <section className={styles.wrapper} id="identity">
      {/* Modern background decorative elements */}
      <div className={styles.meshGradient} />

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Stop giving away{" "}
              <span className={styles.markerHighlight}>30%</span> of your hard
              work.
              <br />
              <span className={styles.highlight}>We build. You grow.</span>
            </h2>

            <p className={styles.description}>
              Most platforms act like a tax on your creativity. We flipped the
              model. We provide the full professional setup you need to sell
              your work under your <strong>own brand</strong>, not ours.
            </p>

            <div className={styles.benefitList}>
              <div className={styles.benefitItem}>
                <div className={styles.iconCircle}>
                  <RiCheckLine />
                </div>
                <span>Custom design & high-performance tech included.</span>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.iconCircle}>
                  <RiCheckLine />
                </div>
                <span>You own 100% of your customer data and content.</span>
              </div>
            </div>
          </div>

          <div className={styles.modernCard}>
            <div className={styles.statValue}>
              <span className={styles.number}>95</span>
              <span className={styles.percent}>%</span>
            </div>

            <div className={styles.statLabel}>
              <RiPieChart2Fill /> YOUR REVENUE SHARE
            </div>

            <p className={styles.statDetail}>
              We only take a <strong>5% flat commission.</strong> No monthly
              subscriptions, no hidden fees, and no tiered pricing traps.
            </p>

            <div className={styles.ownershipBadge}>
              <RiUserStarLine /> FULL OWNERSHIP MODEL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
