"use client";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <span className={styles.terminalText}>THE CREATOR ENGINE</span>
          <div className={styles.statusDot} />
          <span className={styles.pill}>ZERO_UPFRONT_COST</span>
        </div>

        <h1 className={styles.mainTitle}>
          <span className={styles.staticLine}>SELL YOUR</span>
          <div className={styles.revealContainer}>
            <div className={styles.revealWrapper}>
              <div className={styles.wordSlider}>
                <span className={`${styles.word} ${styles.pink}`}>VIDEOS</span>
                <span className={`${styles.word} ${styles.yellow}`}>SUBS</span>
                <span className={`${styles.word} ${styles.green}`}>FILES</span>
                <span className={`${styles.word} ${styles.orange}`}>
                  COURSES
                </span>
                {/* Loop back to start */}
                <span className={`${styles.word} ${styles.pink}`}>VIDEOS</span>
              </div>
            </div>
          </div>
          <span className={styles.staticLine}>DIRECTLY TO FANS.</span>
        </h1>

        <div className={styles.subtitleWrapper}>
          <p className={styles.subtitleEmphasis}>
            LAUNCH FOR FREE. WE ONLY WIN WHEN YOU WIN.
          </p>
          <p className={styles.subtitleDetail}>
            A FLAT 10% ENGINE FEE FOR GLOBAL HOSTING, SECURITY, AND CHECKOUT.
          </p>
        </div>

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
