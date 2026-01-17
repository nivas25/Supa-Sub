"use client";
import React from "react";
import styles from "./Footer.module.css";
import {
  RiTelegramFill,
  RiTwitterXFill,
  RiDiscordFill,
  RiGithubFill,
  RiArrowRightUpLine,
  RiFlashlightFill,
  RiMailSendLine,
} from "react-icons/ri";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        {/* TOP: LOGO & NEWSLETTER */}
        <div className={styles.topSection}>
          {/* Brand Mark */}
          <div className={styles.brandContainer}>
            <div className={styles.brandLogo}>
              <span className={styles.wordSub}>Sub</span>
              <span className={styles.wordStarter}>Starter</span>
              <div className={styles.boltCircle}>
                <RiFlashlightFill />
              </div>
            </div>
            <p className={styles.tagline}>
              The infrastructure for digital communities.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className={styles.newsletterBox}>
            <label className={styles.newsletterLabel}>
              <RiMailSendLine /> Product Updates
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="you@domain.com"
                className={styles.emailInput}
              />
              <button className={styles.subBtn} aria-label="Subscribe">
                <RiArrowRightUpLine size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM: LINKS & LEGAL */}
        <div className={styles.bottomSection}>
          {/* Navigation Grid */}
          <nav className={styles.nav}>
            <div className={styles.linkGroup}>
              <a href="#" className={styles.ctaLink}>
                Get started
              </a>
              <a href="#" className={styles.navLink}>
                Log in
              </a>
            </div>

            <div className={styles.linkGroup}>
              <a href="#" className={styles.navLink}>
                Playbook
              </a>
              <a href="#" className={styles.navLink}>
                Affiliate program
              </a>
              <a href="#" className={styles.navLink}>
                Help
              </a>
            </div>

            <div className={styles.linkGroup}>
              <a href="#" className={styles.navLink}>
                Terms
              </a>
              <a href="#" className={styles.navLink}>
                Privacy
              </a>
            </div>
          </nav>

          {/* Legal & Socials */}
          <div className={styles.legalCol}>
            <div className={styles.socialRow}>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <RiTwitterXFill />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Telegram">
                <RiTelegramFill />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Discord">
                <RiDiscordFill />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="GitHub">
                <RiGithubFill />
              </a>
            </div>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} SubStarter Inc.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
