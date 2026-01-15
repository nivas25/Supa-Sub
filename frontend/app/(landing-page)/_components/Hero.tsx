"use client";
import React, { useState } from "react";
import styles from "./Hero.module.css";
import { RiArrowRightLine, RiFlashlightFill } from "react-icons/ri";

export default function Hero() {
  const [slug, setSlug] = useState("");

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        {/* Status Badge */}
        <div className={styles.badge}>
          <span className={styles.statusDot} />
          <span className={styles.badgeText}>
            PARTNER PROGRAM: 95/5 REVENUE SPLIT
          </span>
        </div>

        {/* Title with Multi-Colored Slider */}
        <h1 className={styles.mainTitle}>
          <span className={styles.lightText}>MONETIZE YOUR</span>

          <div className={styles.sliderContainer}>
            <div className={styles.wordSlider}>
              <div className={`${styles.word} ${styles.pink}`}>
                MASTERCLASSES
              </div>
              <div className={`${styles.word} ${styles.yellow}`}>COURSES</div>
              <div className={`${styles.word} ${styles.green}`}>RESOURCES</div>
              <div className={`${styles.word} ${styles.orange}`}>EXPERTISE</div>
              <div className={`${styles.word} ${styles.blue}`}>SOLUTIONS</div>
              <div className={`${styles.word} ${styles.red}`}>CONTENT</div>
              {/* Duplicate first word for seamless loop */}
              <div className={`${styles.word} ${styles.pink}`}>
                MASTERCLASSES
              </div>
            </div>
          </div>

          <span className={styles.boldText}>IN EASY WAY.</span>
        </h1>

        <p className={styles.description}>
          We deploy your full digital infrastructure.
          <span className={styles.highlight}> You keep 95% of every sale.</span>
        </p>

        {/* Unique Split-Design Input Bar */}
        <div className={styles.uniqueInputWrapper}>
          <div className={styles.liquidBar}>
            <div className={styles.inputSection}>
              <span className={styles.brandPrefix}>substarter.com/</span>
              <input
                type="text"
                placeholder="username"
                className={styles.cleanInput}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <button className={styles.actionButton}>
              <span className={styles.btnText}>Get started for free</span>
              <div className={styles.btnIcon}>
                <RiArrowRightLine />
              </div>
            </button>
          </div>

          <div className={styles.trustTags}>
            <span>
              <RiFlashlightFill /> No setup fees
            </span>
            <span className={styles.dot}>•</span>
            <span>Performance based</span>
          </div>
        </div>
      </div>
    </section>
  );
}
