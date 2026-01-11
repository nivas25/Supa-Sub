"use client";
import styles from "./Hero.module.css";
import {
  RiTelegramFill,
  RiTwitterXFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiDiscordFill,
  RiWhatsappFill,
} from "react-icons/ri";

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      {/* DYNAMIC ORBITING SOCIAL ICONS */}
      <div className={styles.iconOverlay}>
        <div className={`${styles.iconCluster} ${styles.orbit1}`}>
          <RiTelegramFill /> <RiTwitterXFill />
        </div>
        <div className={`${styles.iconCluster} ${styles.orbit2}`}>
          <RiYoutubeFill /> <RiInstagramLine />
        </div>
        <div className={`${styles.iconCluster} ${styles.orbit3}`}>
          <RiDiscordFill /> <RiWhatsappFill />
        </div>
        <div className={`${styles.iconCluster} ${styles.orbit4}`}>
          <RiTwitterXFill /> <RiTelegramFill />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.topRow}>
          <span className={styles.terminalText}>THE CREATOR ENGINE</span>
          <div className={styles.statusDot}></div>
          <span className={styles.pill}>0% PLATFORM FEES</span>
        </div>

        <h1 className={styles.mainTitle}>
          SELL YOUR
          <div className={styles.slidingBox}>
            <div className={styles.wordSlider}>
              <span className={styles.word}>VIDEOS</span>
              <span className={styles.word}>SUBS</span>
              <span className={styles.word}>FILES</span>
              <span className={styles.word}>COURSES</span>
              <span className={styles.word}>VIDEOS</span>
            </div>
          </div>
          <br />
          DIRECT TO FANS.
        </h1>

        <p className={styles.subtitle}>
          Stop losing 10% to other platforms. SupaSub gives you the checkout,
          the hosting, and the tools. You just bring the content.
        </p>

        <div className={styles.ctaWrapper}>
          <a href="#" className={styles.magneticBtn}>
            <div className={styles.btnBackground}></div>
            <span className={styles.btnContent}>
              START_SELLING_FREE <span className={styles.arrow}>→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
