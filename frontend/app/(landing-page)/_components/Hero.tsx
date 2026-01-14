"use client";
import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        {/* Modern Status Badge */}
        <div className={styles.badge}>
          <span className={styles.statusDot} />
          <span className={styles.badgeText}>
            PARTNER_PROGRAM: 95/5_REVENUE_SPLIT
          </span>
        </div>

        <h1 className={styles.mainTitle}>
          <span className={styles.lightText}>MONETIZE YOUR</span>
          <div className={styles.slidingContainer}>
            <div className={styles.wordSlider}>
              <span className={`${styles.word} ${styles.pink}`}>
                MASTERCLASSES
              </span>
              <span className={`${styles.word} ${styles.yellow}`}>COURSES</span>
              <span className={`${styles.word} ${styles.green}`}>
                RESOURCES
              </span>
              <span className={`${styles.word} ${styles.orange}`}>
                EXPERTISE
              </span>
              <span className={`${styles.word} ${styles.blue}`}>SOLUTIONS</span>
              <span className={`${styles.word} ${styles.pink}`}>CONTENT</span>
              {/* Loop node */}
              <span className={`${styles.word} ${styles.pink}`}>
                MASTERCLASSES
              </span>
            </div>
          </div>
          <span className={styles.boldText}>IN EASY WAY.</span>
        </h1>

        <div className={styles.contentSection}>
          <p className={styles.description}>
            We deploy your full digital infrastructure.
            <strong> You keep 95% of every sale.</strong>
          </p>

          <div className={styles.ctaGroup}>
            <a href="#deploy" className={styles.primaryBtn}>
              INITIALIZE DEPLOYMENT
              <span className={styles.btnIcon}>→</span>
            </a>
            <span className={styles.trustLabel}>
              No setup fees • Performance based
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
