"use client";
import React, { CSSProperties } from "react";
import styles from "./Steps.module.css";
import {
  RiSettings4Line,
  RiStore2Line,
  RiRefreshLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

// Helper type to allow custom CSS variables in TypeScript
interface CustomStyle extends CSSProperties {
  "--index"?: number;
  "--accent"?: string;
}

export default function Steps() {
  const journey = [
    {
      id: "01",
      phase: "THE CONNECTION",
      title: "LINK YOUR COMMUNITY",
      desc: "Connect your Telegram, Discord, or WhatsApp. Our engine prepares to manage your members automatically.",
      benefit: "Zero setup fees. Start instantly.",
      color: "#f8f7ff",
      icon: <RiSettings4Line />,
    },
    {
      id: "02",
      phase: "THE STOREFRONT",
      title: "CLAIM YOUR BRAND",
      desc: "Get a professional, high-converting checkout page built specifically for your community brand.",
      benefit: "100% ownership of your customer data.",
      color: "#fffdf0",
      icon: <RiStore2Line />,
    },
    {
      id: "03",
      phase: "THE AUTOMATION",
      title: "ACTIVATE AUTO-SYNC",
      desc: "Our system automatically adds paid members and removes those who cancel. You never lift a finger.",
      benefit: "Scale to thousands with zero manual work.",
      color: "#fff5f5",
      icon: <RiRefreshLine />,
    },
    {
      id: "04",
      phase: "THE PAYOUT",
      title: "COLLECT 95% PROFIT",
      desc: "We only take a flat 5% fee when you sell. Secure, real-time payouts directly to your account.",
      benefit: "Keep the lion's share of your hard work.",
      color: "#f0fff5",
      icon: <RiMoneyDollarCircleLine />,
    },
  ];

  return (
    <section className={styles.wrapper}>
      {/* High-Visibility Dot Grid */}
      <div className={styles.dotPattern} />

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.stickyContent}>
            <h2 className={styles.giantTitle}>
              HOW TO <br /> <span className={styles.redHeading}>SCALE.</span>
            </h2>
            <p className={styles.subtext}>
              THE 4-STEP BLUEPRINT TO AUTOMATED GROWTH.
            </p>
          </div>
        </div>

        <div className={styles.rightSide}>
          {journey.map((step, i) => (
            <div
              key={i}
              className={styles.stepBlock}
              // CLEANER FIX: Use the custom interface instead of 'as any'
              style={{ "--index": i } as CustomStyle}
            >
              <div
                className={styles.card}
                // CLEANER FIX: Use the custom interface instead of 'as any'
                style={{ "--accent": step.color } as CustomStyle}
              >
                <div className={styles.cardTop}>
                  <div className={styles.numberArea}>
                    <span className={styles.num}>{step.id}</span>
                  </div>
                  <div className={styles.phaseArea}>
                    <span className={styles.phase}>{step.phase}</span>
                    <div className={styles.iconWrapper}>{step.icon}</div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.description}>{step.desc}</p>
                </div>

                <div className={styles.cardBottom}>
                  <div className={styles.profitBadge}>
                    <strong>BENEFIT:</strong> {step.benefit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
