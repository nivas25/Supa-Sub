"use client";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        {/* Simplified Top Bar: Status Only */}
        <div className={styles.topRow}>
          <div className={styles.statusDot} />
          <span className={styles.pill}>90/10_PROFIT_SPLIT</span>
        </div>

        <h1 className={styles.mainTitle}>
          <div className={styles.titleLine}>
            <span className={styles.boldText}>MONETIZE YOUR</span>
            <div className={styles.revealContainer}>
              <div className={styles.revealWrapper}>
                <div className={styles.wordSlider}>
                  {/* Staggered Wordmap Nodes */}
                  <span
                    className={`${styles.word} ${styles.pink} ${styles.row1}`}
                  >
                    MASTERCLASSES
                  </span>
                  <span
                    className={`${styles.word} ${styles.yellow} ${styles.row2}`}
                  >
                    COURSES
                  </span>
                  <span
                    className={`${styles.word} ${styles.green} ${styles.row3}`}
                  >
                    RESOURCES
                  </span>
                  <span
                    className={`${styles.word} ${styles.orange} ${styles.row1}`}
                  >
                    EXPERTISE
                  </span>
                  <span
                    className={`${styles.word} ${styles.blue} ${styles.row2}`}
                  >
                    SOLUTIONS
                  </span>
                  <span
                    className={`${styles.word} ${styles.pink} ${styles.row3}`}
                  >
                    CONTENT
                  </span>
                  {/* Loop node for smooth transition */}
                  <span
                    className={`${styles.word} ${styles.pink} ${styles.row1}`}
                  >
                    MASTERCLASSES
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Static Suffix Line */}
          <span className={`${styles.staticLine} ${styles.staggeredSuffix}`}>
            IN <span className={styles.outline}>EASY</span> WAY.
          </span>
        </h1>

        {/* Increased vertical gap for the emphasis box */}
        <div className={styles.subtitleWrapper}>
          <p className={styles.subtitleEmphasis}>
            WE BUILD THE INFRASTRUCTURE. YOU OWN THE PROFIT.
          </p>
        </div>

        <div className={styles.ctaWrapper}>
          <a href="#" className={styles.magneticBtn}>
            INITIALIZE_MONETIZATION <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
