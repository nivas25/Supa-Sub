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
    color: "#00E0FF",
  },
  {
    id: 1,
    label: "MEMBERS",
    value: "1,284",
    sub: "Active paid subscribers",
    icon: <RiUserFollowLine />,
    color: "#FF0055",
  },
  {
    id: 2,
    label: "RETENTION",
    value: "94.2%",
    sub: "Low churn monthly rate",
    icon: <RiPieChartLine />,
    color: "#00FF66",
  },
  {
    id: 3,
    label: "INSIGHTS",
    value: "+24%",
    sub: "Conversion spike detected",
    icon: <RiFlashlightLine />,
    color: "#FFD600",
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
    <section className={styles.wrapper} id="showcase">
      <div className={styles.meshGradient}></div>

      <div className={styles.container}>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.leftContent}>
            <div className={styles.premiumBadge}>
              <RiCompass3Line className={styles.spinIcon} /> ANALYTICS ENGINE
              v4.0
            </div>

            <h2 className={styles.mainTitle}>
              <span className={styles.staticText}>TRACK YOUR</span>
              <br />
              <div className={styles.sliderContainer}>
                <div className={styles.wordSlider}>
                  {SLIDER_WORDS.map((word, i) => (
                    <span key={i} className={`${styles.word} ${word.color}`}>
                      {word.text}
                    </span>
                  ))}
                </div>
              </div>
              <span className={styles.staticText}> IN REAL-TIME.</span>
            </h2>

            <p className={styles.description}>
              Gain deep visibility into your subscriber base. From churn
              analysis to revenue forecasting, our dashboard provides the
              intelligence you need to scale your creator business.
            </p>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.storyTray}>
              {STORIES.map((story, index) => (
                <button
                  key={index}
                  className={`${styles.storyCircleWrapper} ${
                    activeStory === index ? styles.activeStory : ""
                  }`}
                  onClick={() => setActiveStory(index)}
                >
                  <div className={styles.iosRing}>
                    <div className={styles.innerCircle}>
                      <span
                        style={{
                          color:
                            activeStory === index
                              ? story.color
                              : "rgba(120,120,120,0.4)",
                        }}
                      >
                        {story.icon}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className={styles.phoneContainer}>
              <div className={styles.phoneReflection}></div>
              <div className={styles.phoneFrame}>
                <div
                  className={styles.storyCard}
                  style={{ borderColor: `${current.color}44` }}
                >
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

                  <div className={styles.storyContent}>
                    <div
                      className={styles.valueGlow}
                      style={{ color: current.color }}
                    >
                      {current.value}
                    </div>
                    <h3 className={styles.storyValue}>{current.value}</h3>
                    <div className={styles.premiumPill}>{current.sub}</div>
                  </div>

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
