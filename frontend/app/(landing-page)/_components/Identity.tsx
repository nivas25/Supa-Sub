"use client";
import React from "react";
import Image from "next/image";
import styles from "./Identity.module.css";
import {
  RiCheckLine,
  RiPieChart2Fill,
  RiUserStarLine,
  RiShieldFlashLine,
} from "react-icons/ri";

export default function Identity() {
  return (
    <section className={styles.wrapper} id="identity">
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left Text Content */}
          <div className={styles.textContent}>
            <div className={styles.statusBadge}>
              <RiShieldFlashLine /> <span>MONETIZATION ENGINE</span>
            </div>

            <h2 className={styles.title}>
              Easiest way to <br />
              monetize your
              <div className={styles.sliderWindow}>
                <div className={styles.wordSlider}>
                  <div className={`${styles.slideBox} ${styles.pink}`}>
                    COURSES
                  </div>
                  <div className={`${styles.slideBox} ${styles.yellow}`}>
                    RESOURCES
                  </div>
                  <div className={`${styles.slideBox} ${styles.green}`}>
                    EXPERTISE
                  </div>
                  <div className={`${styles.slideBox} ${styles.orange}`}>
                    CONTENT
                  </div>
                  <div className={`${styles.slideBox} ${styles.blue}`}>
                    SOLUTIONS
                  </div>
                  {/* Duplicate first item for smooth loop */}
                  <div className={`${styles.slideBox} ${styles.pink}`}>
                    COURSES
                  </div>
                </div>
              </div>
            </h2>

            <p className={styles.description}>
              Build your digital storefront in minutes. We handle the tech and
              payments. <strong>You focus on creating.</strong>
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

          {/* Right Card Content */}
          <div className={styles.modernCard}>
            <div className={styles.backgroundIcons}>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.brandLink} ${styles.linkDc}`}
              >
                <Image
                  src="/images/Landing_page/discord.png"
                  width={140}
                  height={140}
                  alt="Discord"
                  priority
                  quality={80}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.brandLink} ${styles.linkTg}`}
              >
                <Image
                  src="/images/Landing_page/telegram.png"
                  width={120}
                  height={120}
                  alt="Telegram"
                  priority
                  quality={80}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.brandLink} ${styles.linkWa}`}
              >
                <Image
                  src="/images/Landing_page/whatsapp.png"
                  width={130}
                  height={130}
                  alt="WhatsApp"
                  priority
                  quality={80}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardRibbon}>PARTNER PLAN</div>
              <div className={styles.statValue}>
                <span className={styles.number}>95</span>
                <span className={styles.percent}>%</span>
              </div>
              <div className={styles.statLabel}>
                <RiPieChart2Fill /> YOUR NET REVENUE
              </div>
              <p className={styles.statDetail}>
                Ditch the 30% platform tax. We take a{" "}
                <strong>5% flat fee</strong> so you can invest more back into
                your content.
              </p>
              <div className={styles.ownershipBadge}>
                <RiUserStarLine /> NO HIDDEN MONTHLY FEES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
