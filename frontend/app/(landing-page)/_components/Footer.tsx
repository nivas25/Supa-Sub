"use client";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import {
  RiTelegramFill,
  RiTwitterXFill,
  RiGithubFill,
  RiPulseLine,
  RiArrowUpLine,
  RiMailSendLine,
} from "react-icons/ri";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Ensuring time is only set on client to avoid hydration mismatch
    setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        {/* TOP STATUS BAR: SENSE OF REAL-TIME ACTIVITY */}
        <div className={styles.statusRow}>
          <div className={styles.statusItem}>
            <RiPulseLine className={styles.pulse} />
            <span>
              SYSTEM_STATUS: <span className={styles.green}>OPERATIONAL</span>
            </span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.dot}></span>
            <span>{time} UTC_ZONE</span>
          </div>
        </div>

        {/* MAIN FOOTER ENGINE */}
        <div className={styles.mainGrid}>
          <div className={styles.brandSide}>
            <h2 className={styles.logo}>
              Sub<span className={styles.outline}>Starter</span>
              <span className={styles.tm}>®</span>
            </h2>
            <p className={styles.tagline}>
              THE FAIR-TRADE PROTOCOL FOR <br /> DIGITAL ARCHITECTS.
            </p>
            <div className={styles.profitTag}>90/10_REVENUE_SPLIT</div>
          </div>

          <div className={styles.navGroups}>
            <div className={styles.linkCol}>
              <h4>FOR_CREATORS</h4>
              <a href="#">DASHBOARD</a>
              <a href="#">REVENUE_CALC</a>
              <a href="#">API_KEYS</a>
              <a href="#">BRAND_KIT</a>
            </div>
            <div className={styles.linkCol}>
              <h4>RESOURCES</h4>
              <a href="#">NETWORK_STATUS</a>
              <a href="#">HELP_CENTER</a>
              <a href="#">WHITE_PAPER</a>
              <a href="#">SECURITY</a>
            </div>
            <div className={styles.linkCol}>
              <h4>NEWSLETTER</h4>
              <div className={styles.newsletterBox}>
                <input
                  type="email"
                  placeholder="ENTER_EMAIL"
                  className={styles.input}
                />
                <button className={styles.sendBtn} aria-label="Subscribe">
                  <RiMailSendLine />
                </button>
              </div>
              <div className={styles.socialIcons}>
                <a href="#" aria-label="Telegram">
                  <RiTelegramFill />
                </a>
                <a href="#" aria-label="Twitter">
                  <RiTwitterXFill />
                </a>
                <a href="#" aria-label="GitHub">
                  <RiGithubFill />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LEGAL COMPLIANCE BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} SUBSTARTER_NETWORK. ALL RIGHTS
              RESERVED.
            </span>
            <div className={styles.legalLinks}>
              <a href="#">TERMS_OF_SERVICE</a>
              <a href="#">PRIVACY_POLICY</a>
              <a href="#">COOKIE_SETTINGS</a>
            </div>
          </div>
          <button
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            BACK_TO_TOP <RiArrowUpLine />
          </button>
        </div>
      </div>
    </footer>
  );
}
