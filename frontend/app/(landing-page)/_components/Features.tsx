"use client";
import React from "react";
import styles from "./Features.module.css";
import {
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiShieldFlashLine,
  RiSafe2Line,
  RiRocket2Line,
  RiDashboard3Line,
  RiFingerprintLine,
  RiGlobalLine,
} from "react-icons/ri";

export default function Features() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleStack}>
            <span className={styles.outlineText}>PLATFORM</span>
            <span className={styles.solidText}>FEATURES</span>
          </div>
          <div className={styles.headerMetaData}>
            <span>LOG_ID: SS_2026</span>
            <div className={styles.divider}></div>
            <span>TYPE: DIGITAL_ENGINE</span>
          </div>
        </div>

        <div className={styles.bentoGrid}>
          {/* OMNI SYNC - Faded Pink */}
          <div className={`${styles.card} ${styles.omni}`}>
            <div className={styles.cardInfo}>
              <div className={styles.id}>M_01</div>
              <RiDashboard3Line className={styles.topIcon} />
            </div>
            <div className={styles.textBody}>
              <h3 className={styles.title}>OMNI SYNC</h3>
              <p className={styles.desc}>
                Automated community management. Instant member sync across
                social platforms.
              </p>
            </div>
            <div className={styles.socialPills}>
              <div className={styles.pill}>
                <RiTelegramFill />
              </div>
              <div className={styles.pill}>
                <RiDiscordFill />
              </div>
              <div className={styles.pill}>
                <RiWhatsappFill />
              </div>
            </div>
            <RiGlobalLine className={styles.watermark} />
          </div>

          {/* PRO VAULT - Faded Yellow */}
          <div className={`${styles.card} ${styles.vault}`}>
            <div className={styles.cardInfo}>
              <div className={styles.id}>M_02</div>
              <RiSafe2Line className={styles.topIcon} />
            </div>
            <div className={styles.textBody}>
              <h3 className={styles.title}>PRO VAULT</h3>
              <p className={styles.desc}>
                Premium HD Videos hosting with global edge delivery and secure
                storage.
              </p>
            </div>
            <div className={styles.statusLine}>SECURE_PROTOCOL</div>
            <RiSafe2Line className={styles.watermark} />
          </div>

          {/* ZERO LEAK SHIELD - Faded Green */}
          <div className={`${styles.card} ${styles.shield}`}>
            <div className={styles.cardInfo}>
              <div className={styles.id}>M_03</div>
              <RiShieldFlashLine className={styles.topIcon} />
            </div>
            <div className={styles.textBody}>
              <h3 className={styles.title}>ZERO LEAK</h3>
              <p className={styles.desc}>
                Dynamic HLS encryption keeps content stream-only and
                non-downloadable.
              </p>
            </div>
            <div className={styles.statusLine}>ENCRYPTION_ACTIVE</div>
            <RiFingerprintLine className={styles.watermark} />
          </div>

          {/* SCALE PARTNER - Faded Orange */}
          <div className={`${styles.card} ${styles.scale}`}>
            <div className={styles.cardInfo}>
              <div className={styles.id}>M_04</div>
              <RiRocket2Line className={styles.topIcon} />
            </div>
            <div className={styles.revenueLayout}>
              <div className={styles.textBody}>
                <h3 className={styles.title}>SCALE PARTNER</h3>
                <p className={styles.desc}>
                  $0 upfront. We only earn when you earn. Just 10% per sale.
                </p>
              </div>
              <div className={styles.bigRev}>10%</div>
            </div>
            <RiRocket2Line className={styles.watermark} />
          </div>
        </div>
      </div>
    </section>
  );
}
