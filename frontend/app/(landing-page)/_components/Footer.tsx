"use client";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import {
  RiTelegramFill,
  RiTwitterXFill,
  RiGithubFill,
  RiPulseLine,
  RiArrowUpLine,
} from "react-icons/ri";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        {/* SYSTEM STATUS BAR */}
        <div className={styles.statusRow}>
          <div className={styles.statusItem}>
            <RiPulseLine className={styles.pulse} />
            <span>
              STATUS: <span className={styles.green}>OPERATIONAL</span>
            </span>
          </div>
          <div className={styles.statusItem}>
            <span>{time} UTC</span>
          </div>
        </div>

        {/* MAIN NAVIGATION BLOCK */}
        <div className={styles.mainGrid}>
          <div className={styles.brandSide}>
            <h2 className={styles.logo}>
              Sub<span className={styles.outline}>Starter</span>
            </h2>
            <div className={styles.profitTag}>90/10_REVENUE_PROTOCOL</div>
          </div>

          <div className={styles.navGroups}>
            <div className={styles.linkCol}>
              <h4>PROTOCOL</h4>
              <a href="#">NETWORK</a>
              <a href="#">VAULT</a>
              <a href="#">BLUEPRINT</a>
            </div>
            <div className={styles.linkCol}>
              <h4>SUPPORT</h4>
              <a href="#">DOCS</a>
              <a href="#">UPLINK</a>
              <a href="#">LOGS</a>
            </div>
            <div className={styles.linkCol}>
              <h4>SOCIAL</h4>
              <div className={styles.socialIcons}>
                <a href="#">
                  <RiTelegramFill />
                </a>
                <a href="#">
                  <RiTwitterXFill />
                </a>
                <a href="#">
                  <RiGithubFill />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <span>© 2026</span>
            <a href="#">TERMS</a>
            <a href="#">PRIVACY</a>
          </div>
          <button
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            TOP <RiArrowUpLine />
          </button>
        </div>
      </div>
    </footer>
  );
}
