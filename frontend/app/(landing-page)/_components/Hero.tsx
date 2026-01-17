"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const [slug, setSlug] = useState("");

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.floatingElements}>
        {/* Existing Icons */}
        <div className={`${styles.iconWrapper} ${styles.pos1}`}>
          <Image
            src="/images/Landing_page/marketing-megaphone.png"
            alt="Marketing"
            width={100}
            height={100}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Blast your reach</span>
        </div>
        <div className={`${styles.iconWrapper} ${styles.pos2}`}>
          <Image
            src="/images/Landing_page/likee.png"
            alt="Engagement"
            width={80}
            height={80}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Fans love it</span>
        </div>
        <div className={`${styles.iconWrapper} ${styles.pos3}`}>
          <Image
            src="/images/Landing_page/reels-video.png"
            alt="Content"
            width={90}
            height={90}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Content that pays</span>
        </div>
        <div className={`${styles.iconWrapper} ${styles.pos4}`}>
          <Image
            src="/images/Landing_page/money-treasure.png"
            alt="Revenue"
            width={110}
            height={110}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Keep 95% Profit</span>
        </div>

        {/* New Middle Icons */}
        <div className={`${styles.iconWrapper} ${styles.pos5}`}>
          <Image
            src="/images/Landing_page/lightning.jpg"
            alt="Speed"
            width={85}
            height={85}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Instant Deploy</span>
        </div>
        <div className={`${styles.iconWrapper} ${styles.pos6}`}>
          <Image
            src="/images/Landing_page/chart.png"
            alt="Analytics"
            width={95}
            height={95}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Real-time Growth</span>
        </div>
        <div className={`${styles.iconWrapper} ${styles.pos7}`}>
          <Image
            src="/images/Landing_page/shield.png"
            alt="Security"
            width={90}
            height={90}
            priority
            quality={75}
          />
          <span className={styles.hoverMessage}>Secure Payments</span>
        </div>
      </div>

      <div className={styles.container}>
        {/* ... Rest of your container code (Badge, Headline, Input) ... */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>READY TO DEPLOY IN SECONDS</span>
        </div>

        <h1 className={styles.headline}>
          Easiest way to monetize your
          <div className={styles.rotatingBadgeWrapper}>
            <div className={styles.wordSlider}>
              <span className={`${styles.word} ${styles.pink}`}>COURSES</span>
              <span className={`${styles.word} ${styles.yellow}`}>
                RESOURCES
              </span>
              <span className={`${styles.word} ${styles.green}`}>
                EXPERTISE
              </span>
              <span className={`${styles.word} ${styles.orange}`}>CONTENT</span>
              <span className={`${styles.word} ${styles.blue}`}>SOLUTIONS</span>
              <span className={`${styles.word} ${styles.pink}`}>COURSES</span>
            </div>
          </div>
        </h1>

        <p className={styles.subheadline}>
          Build your digital storefront in minutes. We handle the tech and
          payments.
          <strong> You focus on creating.</strong>
        </p>

        <div className={styles.ctaContainer}>
          <div className={styles.pillInputContainer}>
            <div className={styles.inputInternal}>
              <span className={styles.prefix}>substarter.com/</span>
              <input
                type="text"
                placeholder="username"
                className={styles.inputField}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <button className={`${styles.pillButton} ${styles.claimButton}`}>
              Claim your link
            </button>
          </div>
          <p className={styles.inputHint}>
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
