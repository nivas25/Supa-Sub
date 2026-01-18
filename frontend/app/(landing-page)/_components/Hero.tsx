"use client";
import React, { useState } from "react";
import styles from "./Hero.module.css";
import {
  RiFlashlightFill,
  RiWhatsappFill,
  RiTelegramFill,
  RiDiscordFill,
} from "react-icons/ri";

export default function Hero() {
  const [slug, setSlug] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    setMousePos({ x, y });
  };

  const getTransform = (factor: number) => {
    const xMove = mousePos.x * factor;
    const yMove = mousePos.y * factor;
    return {
      transform: `translate(${xMove}px, ${yMove}px)`,
    };
  };

  return (
    <section className={styles.heroWrapper} onMouseMove={handleMouseMove}>
      {/* --- FLOATING COINS --- */}
      <div
        className={`${styles.coinWrapper} ${styles.pos1}`}
        style={getTransform(-0.02)}
      >
        <div
          className={`${styles.coinVisual} ${styles.coinPink} ${styles.angle1}`}
        >
          <RiFlashlightFill />
        </div>
      </div>
      <div
        className={`${styles.coinWrapper} ${styles.pos2}`}
        style={getTransform(-0.04)}
      >
        <div
          className={`${styles.coinVisual} ${styles.coinGreen} ${styles.angle2}`}
        >
          <RiFlashlightFill />
        </div>
      </div>
      <div
        className={`${styles.coinWrapper} ${styles.pos3}`}
        style={getTransform(0.025)}
      >
        <div
          className={`${styles.coinVisual} ${styles.coinYellow} ${styles.angle3}`}
        >
          <RiFlashlightFill />
        </div>
      </div>
      <div
        className={`${styles.coinWrapper} ${styles.pos4}`}
        style={getTransform(0.05)}
      >
        <div
          className={`${styles.coinVisual} ${styles.coinBlue} ${styles.angle4}`}
        >
          <RiFlashlightFill />
        </div>
      </div>
      <div
        className={`${styles.coinWrapper} ${styles.pos5}`}
        style={getTransform(-0.03)}
      >
        <div
          className={`${styles.coinVisual} ${styles.coinOrange} ${styles.angle5}`}
        >
          <RiFlashlightFill />
        </div>
      </div>

      <div className={styles.container}>
        <h1 className={styles.headline}>
          Monetize your
          <div className={styles.rotatingBadgeWrapper}>
            <div className={styles.platformSlider}>
              <div className={styles.slideBox}>
                <RiWhatsappFill size={32} /> WHATSAPP
              </div>
              <div className={styles.slideBox}>
                <RiTelegramFill size={32} /> TELEGRAM
              </div>
              <div className={styles.slideBox}>
                <RiDiscordFill size={32} /> DISCORD
              </div>
              <div className={styles.slideBox}>
                <RiWhatsappFill size={32} /> WHATSAPP
              </div>
            </div>
          </div>
          community.
        </h1>

        <p className={styles.subheadline}>
          Turn your chat group into a recurring revenue business. We automate
          invites, remove expired members, and handle payments instantly.
          <strong> You focus on the content.</strong>
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
            <button className={styles.pillButton}>Claim your link</button>
          </div>
        </div>
      </div>
    </section>
  );
}
