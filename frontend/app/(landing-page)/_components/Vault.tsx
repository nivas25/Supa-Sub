"use client";
import styles from "./Vault.module.css";
import {
  RiShieldFlashLine,
  RiVideoLine,
  RiLockPasswordLine,
  RiBaseStationLine,
  RiCpuLine,
  RiCloudFill,
  RiCodeSSlashLine,
  RiRadarLine,
  RiPulseLine,
} from "react-icons/ri";

export default function Vault() {
  return (
    <section className={styles.wrapper}>
      {/* REACT ICON DEPTH LAYER */}
      <div className={styles.iconLayer}>
        <RiCpuLine
          className={styles.bgIcon}
          style={{ top: "15%", left: "8%", fontSize: "7rem" }}
        />
        <RiCodeSSlashLine
          className={styles.bgIcon}
          style={{ top: "25%", right: "12%", fontSize: "5rem" }}
        />
        <RiRadarLine
          className={styles.bgIcon}
          style={{ bottom: "20%", left: "15%", fontSize: "6rem" }}
        />
        <RiCloudFill
          className={styles.bgIcon}
          style={{ bottom: "10%", right: "8%", fontSize: "11rem" }}
        />
        <RiPulseLine
          className={styles.bgIcon}
          style={{ top: "50%", left: "45%", fontSize: "4rem" }}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* LEFT: THE MONITOR (Angled) */}
          <div className={styles.visualSide}>
            <div className={styles.header}>
              <span className={styles.tag}>[ STORAGE_UNIT_01 ]</span>
              <h2 className={styles.mainTitle}>VIDEO_VAULT</h2>
            </div>

            <div className={styles.monitor}>
              <div className={styles.screen}>
                <RiVideoLine className={styles.videoIcon} />
                <div className={styles.scannerLine}></div>
              </div>
              <div className={styles.monitorBase}>
                <div className={styles.loading}>
                  <div className={styles.bar}></div>
                </div>
                <span className={styles.mono}>SECURE_ACCESS_GRANTED</span>
              </div>
            </div>
          </div>

          {/* RIGHT: THE SCATTERED CARDS */}
          <div className={styles.infoSide}>
            <div className={`${styles.techCard} ${styles.c1}`}>
              <RiShieldFlashLine className={styles.cardIcon} />
              <div className={styles.cardText}>
                <h3>ZERO_LEAK_PROTOCOL</h3>
                <p>Advanced anti-piracy stream protection.</p>
              </div>
            </div>

            <div className={`${styles.techCard} ${styles.c2} ${styles.acid}`}>
              <RiBaseStationLine className={styles.cardIcon} />
              <div className={styles.cardText}>
                <h3>ULTRA_SPEED_CDN</h3>
                <p>Global edge nodes for 4K buffer-free delivery.</p>
              </div>
            </div>

            <div className={`${styles.techCard} ${styles.c3}`}>
              <RiLockPasswordLine className={styles.cardIcon} />
              <div className={styles.cardText}>
                <h3>DYNAMIC_DRM</h3>
                <p>Unique encryption keys generated per session.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
