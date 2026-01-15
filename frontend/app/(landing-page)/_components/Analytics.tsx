"use client";
import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import {
  RiFundsBoxFill,
  RiGroupFill,
  RiTimerFlashFill,
  RiGlobalFill,
  RiFlashlightFill,
  RiArrowRightUpLine,
} from "react-icons/ri";

const STORIES = [
  {
    id: 0,
    label: "REVENUE",
    value: "$124,500",
    sub: "+15% this week",
    icon: <RiFundsBoxFill />,
    color: "#00E0FF", // Cyan
    bg: "linear-gradient(135deg, #00E0FF 0%, #0047FF 100%)",
  },
  {
    id: 1,
    label: "MEMBERS",
    value: "12,840",
    sub: "+340 joined today",
    icon: <RiGroupFill />,
    color: "#FF0055", // Pink
    bg: "linear-gradient(135deg, #FF0055 0%, #FF00CC 100%)",
  },
  {
    id: 2,
    label: "RETENTION",
    value: "98.5%",
    sub: "Top 1% Creator Score",
    icon: <RiTimerFlashFill />,
    color: "#00FF66", // Neon Green
    bg: "linear-gradient(135deg, #00FF66 0%, #00CC44 100%)",
  },
  {
    id: 3,
    label: "REACH",
    value: "8.2M",
    sub: "Viral spikes detected",
    icon: <RiGlobalFill />,
    color: "#FFD600", // Yellow
    bg: "linear-gradient(135deg, #FFD600 0%, #FF6600 100%)",
  },
];

export default function Analytics() {
  const [activeStory, setActiveStory] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % STORIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = STORIES[activeStory];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.splitGrid}>
          {/* --- LEFT SIDE: WORDMAP HEADLINE --- */}
          <div className={styles.leftContent}>
            <div className={styles.badge}>
              <span className={styles.pulseDot}></span>
              LIVE DATA FEED
            </div>

            <h2 className={styles.mainTitle}>
              <span className={styles.staticText}>TRACK YOUR</span>
              <div className={styles.sliderContainer}>
                <div className={styles.wordSlider}>
                  <span className={`${styles.word} ${styles.blue}`}>
                    REVENUE
                  </span>
                  <span className={`${styles.word} ${styles.pink}`}>
                    GROWTH
                  </span>
                  <span className={`${styles.word} ${styles.green}`}>
                    MEMBERS
                  </span>
                  <span className={`${styles.word} ${styles.yellow}`}>
                    REACH
                  </span>
                  <span className={`${styles.word} ${styles.purple}`}>
                    EMPIRE
                  </span>
                  {/* Loop Duplicate */}
                  <span className={`${styles.word} ${styles.blue}`}>
                    REVENUE
                  </span>
                </div>
              </div>
              <span className={styles.staticText}>IN REAL TIME.</span>
            </h2>

            <p className={styles.description}>
              Stop guessing. Our dashboard visualizes your success story frame
              by frame. See exactly where your money comes from.
            </p>

            <button className={styles.exploreBtn}>
              Explore Analytics <RiArrowRightUpLine />
            </button>
          </div>

          {/* --- RIGHT SIDE: STORIES ENGINE --- */}
          <div className={styles.rightContent}>
            {/* 1. The Story Tray (WhatsApp Style) */}
            <div className={styles.storyTray}>
              {STORIES.map((story, index) => (
                <div
                  key={index}
                  className={`${styles.storyCircleWrapper} ${
                    activeStory === index ? styles.activeRing : ""
                  }`}
                  onClick={() => setActiveStory(index)}
                >
                  <div className={styles.rainbowRing}>
                    <div className={styles.innerCircle}>
                      <span style={{ color: story.color }}>{story.icon}</span>
                    </div>
                  </div>
                  <span className={styles.storyLabel}>{story.label}</span>
                </div>
              ))}
            </div>

            {/* 2. The Story Viewer (Phone Card) */}
            <div className={styles.viewerContainer}>
              <div
                className={styles.storyCard}
                style={{ background: current.bg }}
              >
                {/* Progress Bars */}
                <div className={styles.progressRow}>
                  {STORIES.map((_, i) => (
                    <div key={i} className={styles.progressBarBg}>
                      <div
                        className={`${styles.progressBarFill} ${
                          i === activeStory
                            ? styles.animating
                            : i < activeStory
                            ? styles.filled
                            : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Header */}
                <div className={styles.storyHeader}>
                  <div className={styles.userAvatar}>
                    <RiFlashlightFill />
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>Your Insights</span>
                    <span className={styles.timeAgo}>Live Update</span>
                  </div>
                </div>

                {/* Main Data Display */}
                <div className={styles.storyContent}>
                  <div className={styles.iconBig}>{current.icon}</div>
                  <h3 className={styles.storyValue}>{current.value}</h3>
                  <div className={styles.storyBadge}>{current.sub}</div>
                </div>

                {/* Footer Interaction */}
                <div className={styles.storyFooter}>
                  <div className={styles.replyBox}>Swipe for details</div>
                  <div className={styles.heartBtn}>🔥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
