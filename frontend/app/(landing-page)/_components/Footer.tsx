"use client";
import styles from "./Footer.module.css";
import {
  RiTelegramFill,
  RiTwitterXFill,
  RiGithubFill,
  RiPulseLine,
  RiArrowUpLine,
  RiArrowRightUpLine,
  RiMailLine,
  RiDiscordFill,
  RiFlashlightFill,
} from "react-icons/ri";

export default function Footer() {
  // Define content with specific vibrant colors for the marquee
  const marqueeItems = [
    { text: "KEEP 95% REVENUE", color: "#00f5a0" }, // Neon Green
    { text: "INSTANT PAYOUTS", color: "#00e5ff" }, // Cyan
    { text: "OWN YOUR DATA", color: "#ff0055" }, // Neon Red
    { text: "GLOBAL SCALE", color: "#ffeb3b" }, // Yellow
    { text: "ZERO LATENCY", color: "#bd00ff" }, // Purple
  ];

  return (
    <footer className={styles.wrapper}>
      {/* --- MULTI-COLOR HIGH-SPEED MARQUEE --- */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {/* Loop enough times to fill screen */}
          {[...Array(6)].map((_, trackIndex) => (
            <div key={trackIndex} className={styles.marqueeGroup}>
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className={styles.marqueeItem}
                  style={{ color: item.color }}
                >
                  {item.text} <span className={styles.dot}>•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* HERO CTA */}
        <div className={styles.preFooter}>
          <div className={styles.preHeader}>
            <RiFlashlightFill className={styles.flashIcon} />
            <span>READY TO LAUNCH?</span>
          </div>
          <h2 className={styles.megaTitle}>
            Start your <span className={styles.outlineText}>Empire.</span>
          </h2>
          <button className={styles.mainCta}>
            Get Started Free <RiArrowRightUpLine />
          </button>
        </div>

        {/* USEFUL BENTO GRID */}
        <div className={styles.bentoGrid}>
          {/* 1. Brand & Mission */}
          <div className={`${styles.card} ${styles.brandCard}`}>
            <div>
              <h2 className={styles.logo}>
                Sub<span className={styles.logoHighlight}>Launch.</span>
              </h2>
              <p className={styles.missionText}>
                The infrastructure layer for the next generation of digital
                communities. Built for scale, security, and ownership.
              </p>
            </div>
            <div className={styles.socialRow}>
              <a href="#" className={styles.socialIcon} aria-label="X">
                <RiTwitterXFill />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Telegram">
                <RiTelegramFill />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Discord">
                <RiDiscordFill />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Github">
                <RiGithubFill />
              </a>
            </div>
          </div>

          {/* 2. Useful Links - Product */}
          <div className={`${styles.card} ${styles.linksCard}`}>
            <h4 className={styles.colTitle}>Product</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
              <li>
                <a href="#">Changelog</a>
              </li>
              <li>
                <a href="#">API Docs</a>
              </li>
            </ul>
          </div>

          {/* 3. Useful Links - Company */}
          <div className={`${styles.card} ${styles.linksCard}`}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>{" "}
                <span className={styles.hiringBadge}>HIRING</span>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Legal</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* 4. Utility & Status */}
          <div className={`${styles.card} ${styles.utilityCard}`}>
            <div className={styles.newsletterBox}>
              <h4 className={styles.colTitle}>Dev Updates</h4>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="email@domain.com" />
                <button aria-label="Subscribe">
                  <RiMailLine />
                </button>
              </div>
            </div>

            <div className={styles.statusRow}>
              <div className={styles.statusItem}>
                <RiPulseLine className={styles.greenPulse} />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <span>© {new Date().getFullYear()} SubLaunch Inc.</span>
            <span className={styles.divider}>|</span>
            <a href="#">Privacy</a>
            <span className={styles.divider}>|</span>
            <a href="#">Terms</a>
          </div>

          <button
            className={styles.topBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            BACK TO TOP <RiArrowUpLine />
          </button>
        </div>
      </div>
    </footer>
  );
}
