"use client";
import React from "react";
import styles from "./Identity.module.css";
import {
  RiCheckLine,
  RiPieChart2Fill,
  RiUserStarLine,
  RiWhatsappFill,
  RiDiscordFill,
  RiTelegramFill,
  RiShieldFlashLine,
} from "react-icons/ri";

export default function Identity() {
  return (
    <section className={styles.wrapper} id="identity">
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.textContent}>
            <div className={styles.statusBadge}>
              <RiShieldFlashLine /> <span>MONETIZATION ENGINE</span>
            </div>

            <h2 className={styles.title}>
              Automate your <br />
              <div className={styles.sliderWindow}>
                <div className={styles.wordSlider}>
                  <div className={`${styles.slideBox} ${styles.whatsapp}`}>
                    <RiWhatsappFill /> WHATSAPP
                  </div>
                  <div className={`${styles.slideBox} ${styles.telegram}`}>
                    <RiTelegramFill /> TELEGRAM
                  </div>
                  <div className={`${styles.slideBox} ${styles.discord}`}>
                    <RiDiscordFill /> DISCORD
                  </div>
                  <div className={`${styles.slideBox} ${styles.whatsapp}`}>
                    <RiWhatsappFill /> WHATSAPP
                  </div>
                </div>
              </div>
              <span className={styles.bottomText}>COMMUNITY.</span>
            </h2>

            <p className={styles.description}>
              Convert your social following into a recurring revenue stream. We
              provide the
              <strong> bot-automation and payment layers</strong> to run your
              private groups on autopilot.
            </p>

            <div className={styles.benefitList}>
              <div className={styles.benefitItem}>
                <div className={styles.iconCircle}>
                  <RiCheckLine />
                </div>
                <span>Sync payments directly to group access.</span>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.iconCircle}>
                  <RiCheckLine />
                </div>
                <span>Auto-remove members when subs expire.</span>
              </div>
            </div>
          </div>

          <div className={styles.modernCard}>
            <div className={styles.cardRibbon}>PARTNER PLAN</div>
            <div className={styles.statValue}>
              <span className={styles.number}>95</span>
              <span className={styles.percent}>%</span>
            </div>
            <div className={styles.statLabel}>
              <RiPieChart2Fill /> YOUR NET REVENUE
            </div>
            <p className={styles.statDetail}>
              Ditch the 30% platform tax. We take a <strong>5% flat fee</strong>{" "}
              so you can invest more back into your content.
            </p>
            <div className={styles.ownershipBadge}>
              <RiUserStarLine /> NO HIDDEN MONTHLY FEES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
