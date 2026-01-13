"use client";
import React from "react";
import styles from "./Steps.module.css";
import {
  RiSettings4Line,
  RiShieldFlashLine,
  RiBarChartGroupedLine,
  RiRfidLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

export default function Steps() {
  const journey = [
    {
      id: "01",
      phase: "THE SETUP",
      title: "PLUG IN YOUR ENGINE",
      desc: "Connect your Telegram, Discord, or WhatsApp. Our system builds your storefront around your community in seconds.",
      profit: "Start with $0 upfront and no monthly overhead.",
      color: "#ff90e8",
      icon: <RiSettings4Line />,
    },
    {
      id: "02",
      phase: "THE DEPLOY",
      title: "UPLOAD & SECURE",
      desc: "Drop your videos, files, or courses into the Pro Vault. Every byte is encrypted with Zero Leak protection.",
      profit: "Protection justifies higher prices and secures your assets.",
      color: "#ffc900",
      icon: <RiShieldFlashLine />,
    },
    {
      id: "03",
      phase: "THE TRACK",
      title: "MASTER YOUR DATA",
      desc: "Enter the Creator Command Center. Track real-time conversion rates, fan retention, and regional revenue heatmaps.",
      profit: "Optimize your content based on what actually sells.",
      color: "#05ac72",
      icon: <RiBarChartGroupedLine />,
    },
    {
      id: "04",
      phase: "THE SCALE",
      title: "ACTIVATE AUTO-PILOT",
      desc: "Your fans buy, and Omni Sync handles the rest—adding them to groups and delivering files while you sleep.",
      profit: "Scale to 10k+ fans without increasing your workload.",
      color: "#ff4d00",
      icon: <RiRfidLine />,
    },
    {
      id: "05",
      phase: "THE HARVEST",
      title: "COLLECT YOUR WIN",
      desc: "We only take our 10% fee when you make a sale. Real-time payouts to your bank. No hidden costs.",
      profit: "Keep 90% of every dollar with zero tech headache.",
      color: "#0066ff",
      icon: <RiMoneyDollarCircleLine />,
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.stickyContent}>
            <h2 className={styles.giantTitle}>
              HOW TO <br /> <span className={styles.outline}>SCALE</span>
            </h2>
            <p className={styles.subtext}>
              A 5-STEP BLUEPRINT FOR THE MODERN CREATOR.
            </p>
          </div>
        </div>

        <div className={styles.rightSide}>
          {journey.map((step, i) => (
            <div
              key={i}
              className={styles.stepBlock}
              style={{ "--index": i } as any}
            >
              <div
                className={styles.card}
                style={{ "--accent": step.color } as any}
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
                    <strong>PROFIT_EDGE:</strong> {step.profit}
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
