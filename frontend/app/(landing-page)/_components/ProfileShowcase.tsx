"use client";
import React from "react";
import styles from "./ProfileShowcase.module.css";
import {
  RiVerifiedBadgeFill,
  RiPulseFill,
  RiGlobalLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const CREATORS = [
  {
    id: "NODE_01",
    name: "AERO_VISUALS",
    niche: "3D_MOTION",
    members: "12.4K",
    rev: "92%",
    color: "#ff90e8",
  },
  {
    id: "NODE_02",
    name: "CRYPTO_CHASE",
    niche: "MARKET_DATA",
    members: "82.1K",
    rev: "88%",
    color: "#ffc900",
  },
  {
    id: "NODE_03",
    name: "DESIGN_OPS",
    niche: "MASTERCLASS",
    members: "9.2K",
    rev: "94%",
    color: "#05ac72",
  },
  {
    id: "NODE_04",
    name: "VFX_LAB",
    niche: "ASSET_PACKS",
    members: "24.5K",
    rev: "91%",
    color: "#ff4d00",
  },
  {
    id: "NODE_05",
    name: "SCALE_PRO",
    niche: "SAAS_ALGO",
    members: "105K",
    rev: "97%",
    color: "#0066ff",
  },
];

export default function ProfileShowcase() {
  return (
    <section className={styles.wrapper}>
      {/* Blueprint Grid with animated crosshairs */}
      <div className={styles.scannerOverlay}></div>

      <div className={styles.header}>
        <div className={styles.titleStack}>
          <span className={styles.outlineText}>NETWORK</span>
          <span className={styles.solidText}>TERMINAL</span>
        </div>
        <div className={styles.systemStatus}>
          <RiPulseFill className={styles.pulseIcon} />
          <span>LIVE_CREATOR_FEED_V2.0</span>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {[...CREATORS, ...CREATORS].map((creator, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ "--accent": creator.color } as any}
            >
              <div className={styles.cardHeader}>
                <div className={styles.idBadge}>{creator.id}</div>
                <RiArrowRightUpLine className={styles.expandIcon} />
              </div>

              <div className={styles.avatarSection}>
                <div className={styles.avatarPlaceholder}>
                  <div className={styles.crosshair}></div>
                </div>
                <RiVerifiedBadgeFill className={styles.verify} />
              </div>

              <div className={styles.cardBody}>
                <h4 className={styles.name}>{creator.name}</h4>
                <p className={styles.niche}>// {creator.niche}</p>
              </div>

              <div className={styles.techData}>
                <div className={styles.dataPoint}>
                  <span className={styles.label}>MEMBERSHIP</span>
                  <span className={styles.value}>{creator.members}</span>
                </div>
                <div className={styles.dataPoint}>
                  <span className={styles.label}>RETENTION</span>
                  <span className={styles.value}>{creator.rev}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.statusDot}></div>
                <span>ENCRYPTED_NODE</span>
              </div>

              {/* Corner Hardware Details */}
              <div className={styles.bracketTL}></div>
              <div className={styles.bracketBR}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
