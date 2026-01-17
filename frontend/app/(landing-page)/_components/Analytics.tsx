"use client";
import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import {
  RiPulseLine,
  RiUserFollowLine,
  RiPieChartLine,
  RiFlashlightLine,
  RiCompass3Line,
} from "react-icons/ri";

const STORIES = [
  {
    id: 0,
    label: "REVENUE",
    value: "$12,450",
    sub: "Net earnings this week",
    icon: <RiPulseLine />,
    color: "#00E0FF", // Cyan
  },
  {
    id: 1,
    label: "MEMBERS",
    value: "1,284",
    sub: "Active paid subscribers",
    icon: <RiUserFollowLine />,
    color: "#FF90E8", // Pink
  },
  {
    id: 2,
    label: "RETENTION",
    value: "94.2%",
    sub: "Low churn monthly rate",
    icon: <RiPieChartLine />,
    color: "#25D366", // Green
  },
  {
    id: 3,
    label: "INSIGHTS",
    value: "+24%",
    sub: "Conversion spike detected",
    icon: <RiFlashlightLine />,
    color: "#FFEB3B", // Yellow
  },
];

const SLIDER_WORDS = [
  { text: "REVENUE", color: styles.blue },
  { text: "GROWTH", color: styles.pink },
  { text: "MEMBERS", color: styles.green },
  { text: "REACH", color: styles.yellow },
  { text: "EMPIRE", color: styles.purple },
  { text: "REVENUE", color: styles.blue },
];

export default function Analytics() {
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % STORIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = STORIES[activeStory];
  const marqueeText =
    "REAL-TIME SUBSCRIBER ANALYTICS • CHURN TRACKING • REVENUE FORECASTING • SETTLEMENT LOGS • ";

  return (
    <section className={styles.wrapper} id="analytics">
      {/* Mesh Gradient Removed - Clean Dot Grid BG used in CSS */}

      <div className={styles.container}>
        {/* Ticker / Marquee */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        <div className={styles.splitGrid}>
          {/* LEFT: Text Content */}
          <div className={styles.leftContent}>
            <div className={styles.premiumBadge}>
              <RiCompass3Line className={styles.spinIcon} /> ANALYTICS ENGINE
              v4.0
            </div>

            <h2 className={styles.mainTitle}>
              TRACK YOUR <br />
              <div className={styles.sliderContainer}>
                <div className={styles.wordSlider}>
                  {SLIDER_WORDS.map((word, i) => (
                    <span key={i} className={`${styles.word} ${word.color}`}>
                      {word.text}
                    </span>
                  ))}
                </div>
              </div>
              <br />
              IN REAL-TIME.
            </h2>

            <p className={styles.description}>
              Gain deep visibility into your subscriber base. From churn
              analysis to revenue forecasting, our dashboard provides the
              intelligence you need to scale your creator business.
            </p>
          </div>

          {/* RIGHT: Phone / Story Visuals */}
          <div className={styles.rightContent}>
            {/* Story Selection Tray */}
            <div className={styles.storyTray}>
              {STORIES.map((story, index) => (
                <button
                  key={index}
                  className={`${styles.storyCircleWrapper} ${
                    activeStory === index ? styles.activeStory : ""
                  }`}
                  onClick={() => setActiveStory(index)}
                  aria-label={`View ${story.label}`}
                >
                  <div className={styles.iosRing}>
                    <div className={styles.innerCircle}>
                      <span
                        style={{
                          // If active, icon is white via CSS. If inactive, grey.
                          color: activeStory === index ? "#fff" : "#000",
                        }}
                      >
                        {story.icon}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* The Hard-Bordered "Phone" */}
            <div className={styles.phoneContainer}>
              <div className={styles.phoneFrame}>
                <div
                  className={styles.storyCard}
                  style={{ borderColor: "#000" }}
                >
                  {/* Status Bar */}
                  <div className={styles.statusBar}>
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
                  </div>

                  {/* Header */}
                  <div className={styles.storyHeader}>
                    <div
                      className={styles.brandIcon}
                      style={{ background: current.color }}
                    >
                      {current.icon}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>Analytics Pro</span>
                      <span className={styles.timeAgo}>Live Updates</span>
                    </div>
                  </div>

                  {/* Main Value Content */}
                  <div className={styles.storyContent}>
                    {/* Value without glow, hard shadow via CSS */}
                    <h3
                      className={styles.storyValue}
                      style={{ color: current.color }}
                    >
                      {current.value}
                    </h3>
                    <div className={styles.premiumPill}>{current.sub}</div>
                  </div>

                  {/* Footer Action */}
                  <div className={styles.footerAction}>
                    <div className={styles.fullReportBtn}>
                      View Detailed Metrics
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
