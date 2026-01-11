"use client";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import {
  RiTelegramFill,
  RiTwitterXFill,
  RiGithubFill,
  RiPulseLine,
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
        {/* TOP ROW: SYSTEM METRICS */}
        <div className={styles.topRow}>
          <div className={styles.metric}>
            <RiPulseLine className={styles.pulseIcon} />
            <span>
              SYSTEM_STATUS: <span className={styles.online}>ONLINE</span>
            </span>
          </div>
          <div className={styles.metric}>
            <span>LOCAL_TIME: {time}</span>
          </div>
          <div className={styles.metric}>
            <span>UPLINK_v1.04</span>
          </div>
        </div>

        {/* MIDDLE ROW: MEGA NAVIGATION */}
        <div className={styles.mainGrid}>
          <div className={styles.brandSide}>
            <h2 className={styles.logo}>SUPASUB</h2>
            <p className={styles.tagline}>
              THE_ELITE_INFRASTRUCTURE_FOR_DIGITAL_CREATORS
            </p>
          </div>

          <div className={styles.linkColumn}>
            <h4>PROTOCOL</h4>
            <a href="#">MARKETPLACE</a>
            <a href="#">VIDEO_VAULT</a>
            <a href="#">FEATURES</a>
          </div>

          <div className={styles.linkColumn}>
            <h4>SUPPORT</h4>
            <a href="#">DOCUMENTATION</a>
            <a href="#">API_REF</a>
            <a href="#">SYSTEM_LOGS</a>
          </div>

          <div className={styles.socialSide}>
            <h4>CONNECT</h4>
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

        {/* BOTTOM ROW: LEGAL & COPYRIGHT */}
        <div className={styles.bottomRow}>
          <div className={styles.legal}>
            <span>© 2026 // ALL_SYSTEMS_GO</span>
            <a href="#">TERMS_OF_SERVICE</a>
            <a href="#">PRIVACY_POLICY</a>
          </div>
          <div
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            BACK_TO_TOP ↑
          </div>
        </div>
      </div>
    </footer>
  );
}
