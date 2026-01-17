"use client";
import React, { useState } from "react";
import styles from "./Hero.module.css";
import { RiFlashlightFill } from "react-icons/ri";

export default function Hero() {
  const [slug, setSlug] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Mouse Move for Parallax
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
      {/* --- MULTI-COLORED COINS --- */}

      {/* 1. Top Left: Pink (Moves slightly) */}
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

      {/* 2. Bottom Left: Green (Brand color, closer) */}
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

      {/* 3. Top Right: Yellow (Moves slightly) */}
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

      {/* 4. Bottom Right: Blue (Closest, moves most) */}
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

      {/* 5. Middle Right: Orange (Medium depth) */}
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

      {/* --- MAIN CONTENT --- */}
      <div className={styles.container}>
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
            <button className={styles.pillButton}>Claim your link</button>
          </div>
          <p className={styles.inputHint}>
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
