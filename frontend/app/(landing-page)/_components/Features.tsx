"use client";
import React from "react";
import Image from "next/image";
import styles from "./Features.module.css";
import {
  RiBankCardLine,
  RiRobot2Line,
  RiShieldCheckLine,
  RiWhatsappFill,
  RiCheckDoubleLine, // Blue Ticks
  RiHeart3Line,
  RiCameraFill, // WhatsApp Camera Icon
} from "react-icons/ri";

export default function Features() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <RiWhatsappFill style={{ marginRight: 6 }} /> Features
          </div>
          <h2 className={styles.title}>
            RUN ON <br /> AUTOPILOT.
          </h2>
          <p className={styles.subtitle}>
            The tech stack that powers modern communities.
          </p>
        </div>

        {/* Story Grid */}
        <div className={styles.storyGrid}>
          {/* --- CARD 1: SYNC --- */}
          <div className={styles.storyCard}>
            <div className={styles.progressRow}>
              <div className={`${styles.bar} ${styles.barFilled}`}></div>
              <div className={styles.bar}></div>
            </div>

            <div className={styles.storyHeader}>
              <div className={styles.avatarContainer}>
                {/* Dashed Green Ring */}
                <div className={styles.statusRing}></div>
                <div className={styles.avatar}>
                  <RiRobot2Line />
                </div>
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.usernameRow}>
                  <span className={styles.username}>BOT_AUTO</span>
                </div>
                <div className={styles.timestampRow}>
                  <span className={styles.timestamp}>Just now</span>
                </div>
              </div>
            </div>

            <div className={`${styles.mediaContainer} ${styles.bgYellow}`}>
              <Image
                src="/images/Landing_page/Autonomous_Sync.jpg"
                alt="Sync Bot"
                width={400}
                height={400}
                className={styles.illustration}
              />
            </div>

            <div className={styles.captionContainer}>
              <h3 className={styles.captionTitle}>Zero-Touch Sync ⚡</h3>
              <p className={styles.captionText}>
                I instantly sync Stripe payments to WhatsApp, Telegram, and
                Discord access. No manual work.
              </p>
            </div>

            <div className={styles.interactionRow}>
              <div className={styles.replyPill}>
                <span className={styles.replyText}>Reply...</span>
                <RiCameraFill className={styles.cameraIcon} />
              </div>
              <div className={styles.likeBtn}>
                <RiHeart3Line />
              </div>
            </div>
          </div>

          {/* --- CARD 2: REVENUE --- */}
          <div className={styles.storyCard}>
            <div className={styles.progressRow}>
              <div className={`${styles.bar} ${styles.barFilled}`}></div>
              <div className={`${styles.bar} ${styles.barFilled}`}></div>
              <div className={styles.bar}></div>
            </div>

            <div className={styles.storyHeader}>
              <div className={styles.avatarContainer}>
                <div className={styles.statusRing}></div>
                <div className={styles.avatar}>
                  <RiBankCardLine />
                </div>
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.usernameRow}>
                  <span className={styles.username}>REVENUE</span>
                </div>
                <div className={styles.timestampRow}>
                  <span className={styles.timestamp}>Yesterday, 10:42 PM</span>
                  <RiCheckDoubleLine className={styles.blueTicks} />
                </div>
              </div>
            </div>

            <div className={`${styles.mediaContainer} ${styles.bgPink}`}>
              <Image
                src="/images/Landing_page/Revenue_Engine.jpg"
                alt="Revenue Dashboard"
                width={400}
                height={400}
                className={styles.illustration}
              />
            </div>

            <div className={styles.captionContainer}>
              <h3 className={styles.captionTitle}>Keep 95% Profit 💸</h3>
              <p className={styles.captionText}>
                We take a flat 5% fee. No monthly subscriptions. Daily payouts
                directly to your bank account.
              </p>
            </div>

            <div className={styles.interactionRow}>
              <div className={styles.replyPill}>
                <span className={styles.replyText}>Reply...</span>
                <RiCameraFill className={styles.cameraIcon} />
              </div>
              <div className={styles.likeBtn}>
                <RiHeart3Line />
              </div>
            </div>
          </div>

          {/* --- CARD 3: SHIELD --- */}
          <div className={styles.storyCard}>
            <div className={styles.progressRow}>
              <div className={`${styles.bar} ${styles.barFilled}`}></div>
              <div className={`${styles.bar} ${styles.barFilled}`}></div>
            </div>

            <div className={styles.storyHeader}>
              <div className={styles.avatarContainer}>
                <div className={styles.statusRing}></div>
                <div className={styles.avatar}>
                  <RiShieldCheckLine />
                </div>
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.usernameRow}>
                  <span className={styles.username}>SHIELD</span>
                </div>
                <div className={styles.timestampRow}>
                  <span className={styles.timestamp}>Today, 09:15 AM</span>
                  <RiCheckDoubleLine className={styles.blueTicks} />
                </div>
              </div>
            </div>

            <div className={`${styles.mediaContainer} ${styles.bgBlue}`}>
              <Image
                src="/images/Landing_page/Content_Shield.jpg"
                alt="Security Shield"
                width={400}
                height={400}
                className={styles.illustration}
              />
            </div>

            <div className={styles.captionContainer}>
              <h3 className={styles.captionTitle}>No Leaks Allowed 🔒</h3>
              <p className={styles.captionText}>
                Military-grade link protection. One-time access links ensure
                only paying subscribers get in.
              </p>
            </div>

            <div className={styles.interactionRow}>
              <div className={styles.replyPill}>
                <span className={styles.replyText}>Reply...</span>
                <RiCameraFill className={styles.cameraIcon} />
              </div>
              <div className={styles.likeBtn}>
                <RiHeart3Line />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
