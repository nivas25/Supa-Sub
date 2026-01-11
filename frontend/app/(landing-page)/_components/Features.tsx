"use client";
import React from "react";
import styles from "./Features.module.css";

export default function Features() {
  const modules = [
    {
      id: "CMD_01",
      title: "TELEGRAM\nCOMMAND",
      desc: "AUTO-MANAGE GROUPS, PAYMENTS, AND KICKS. YOUR TRIBE ON AUTOPILOT.",
      color: "#ff90e8",
      label: "BOT_ACTIVE",
      detail: "API_v4.2",
    },
    {
      id: "CMD_02",
      title: "VIDEO\nVAULT",
      desc: "SECURE HOSTING. NO LEAKS. HIGH-SPEED STREAMING FOR YOUR MASTERCLASS.",
      color: "#ffc900",
      label: "ENCRYPTED",
      detail: "HLS_STREAM",
    },
    {
      id: "CMD_03",
      title: "FILE\nDISPATCH",
      desc: "INSTANT DELIVERY FOR PDFS AND ASSETS. ONE LINK. ZERO FRICTION.",
      color: "#05ac72",
      label: "DISPATCHED",
      detail: "CDN_EDGE",
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.systemStatus}>
          <span className={styles.blink}></span> SYSTEM_OPERATIONAL
        </div>

        {/* Animated Reveal Title */}
        <div className={styles.revealWrapper}>
          <h2 className={styles.mainTitle}>THE_CORE</h2>
        </div>
      </div>

      <div className={styles.stickyStack}>
        {modules.map((m, i) => (
          <div
            key={i}
            className={styles.cardWrapper}
            style={{
              top: `${120 + i * 40}px`,
              zIndex: i,
            }}
          >
            <div
              className={styles.card}
              style={{ "--bg": m.color } as React.CSSProperties}
            >
              <div className={styles.scanline}></div>
              <div className={styles.content}>
                <div className={styles.topBar}>
                  <div className={styles.moduleTag}>{m.id}</div>
                  <div className={styles.detailTag}>{m.detail}</div>
                </div>

                <h3 className={styles.cardTitle}>{m.title}</h3>

                <div className={styles.middleSection}>
                  <p className={styles.desc}>{m.desc}</p>
                  <div className={styles.sideBadge}>{m.label}</div>
                </div>

                <div className={styles.footer}>
                  <div className={styles.terminal}>
                    <span>{`> INIT_START`}</span>
                    <span>{`> CONNECTION_SECURE`}</span>
                  </div>
                  <div className={styles.bigArrow}>→</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
