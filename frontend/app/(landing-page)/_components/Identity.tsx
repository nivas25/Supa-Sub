"use client";
import React from "react";
import styles from "./Identity.module.css";
import {
  RiBaseStationLine,
  RiShieldUserLine,
  RiLineChartLine,
} from "react-icons/ri";

export default function Identity() {
  const specs = [
    {
      code: "V_01",
      label: "OUR_MISSION",
      value: "90%_PROFIT",
      color: "#ff90e8",
    },
    { code: "V_02", label: "THE_GOAL", value: "ZERO_FEES", color: "#ffc900" },
    { code: "V_03", label: "STATUS", value: "BUILDING", color: "#05ac72" },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.blueprintHeader}>
          <div className={styles.stamp}>U_OWN_PROFIT</div>
          <div className={styles.serial}>[ REF_ID: 2026_PRE_BUILD ]</div>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.textColumn}>
            {/* COMPACT EDITORIAL WORDMAP */}
            <h2 className={styles.wordMapTitle}>
              WE&apos;RE <span className={styles.pillPink}>ENGINEERS</span> WHO
              BELIEVE
              <br />
              <span className={styles.outline}>CREATORS</span> SHOULDN&apos;T
              <br />
              <span className={styles.yellowItalic}>SACRIFICE</span> 30% TO
              <br />
              ANY <span className={styles.blue}>PLATFORMS</span>.
            </h2>

            <div className={styles.subNarrative}>
              We are building{" "}
              <span className={styles.greenUnderline}>infrastructure</span>
              where you <span className={styles.blue}>keep</span> everything you
              <span className={styles.pinkHighlight}>earn</span>. Simple as
              that.
            </div>
          </div>

          <div className={styles.specColumn}>
            {specs.map((spec, i) => (
              <div
                key={i}
                className={styles.vibrantCard}
                style={{ "--accent": spec.color } as any}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.code}>{spec.code}</span>
                  <div className={styles.iconCircle}>
                    {i === 0 ? (
                      <RiBaseStationLine />
                    ) : i === 1 ? (
                      <RiShieldUserLine />
                    ) : (
                      <RiLineChartLine />
                    )}
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <h3 className={styles.specValue}>{spec.value}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
