"use client";
import React from "react";
import styles from "./ImageSkeleton.module.css";

export function ImageSkeleton() {
  return <div className={styles.skeleton} />;
}

export function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.imageSkeleton} />
      <div className={styles.textSkeleton}>
        <div className={styles.textLine} />
        <div className={styles.textLine} style={{ width: "85%" }} />
        <div
          className={styles.textLine}
          style={{ width: "70%", marginTop: "8px" }}
        />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className={styles.heroSkeleton}>
      <div className={styles.badgeSkeleton} />
      <div className={styles.titleSkeleton} />
      <div className={styles.textSkeleton}>
        <div className={styles.textLine} />
        <div className={styles.textLine} />
      </div>
      <div className={styles.buttonSkeleton} />
    </div>
  );
}
