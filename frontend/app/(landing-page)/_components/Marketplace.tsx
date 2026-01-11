"use client";
import styles from "./Marketplace.module.css";

export default function Marketplace() {
  return (
    <section className={styles.wrapper}>
      {/* Moving Technical Background */}
      <div className={styles.gridBackground}></div>

      <div className={styles.container}>
        {/* CREATOR SIDE - GHOST WHITE */}
        <div className={styles.side}>
          <div className={styles.techTag}>[ UPLINK_PROTOCOL ]</div>
          <h2 className={styles.sideTitle}>
            DEPLOY
            <br />
            ASSETS
          </h2>
          <div className={styles.cardStack}>
            <div className={styles.miniCard}>UPLOAD_COURSE.EXE</div>
            <div className={styles.miniCard}>GENERATE_LINK</div>
            <div className={styles.miniCard}>SET_0%_FEE</div>
          </div>
        </div>

        {/* THE "SUPER DUPER" ENGINE - ACID GREEN & CARBON */}
        <div className={styles.centerEngine}>
          <div className={styles.engineHousing}>
            <div className={styles.outerRadar}></div>
            <div className={styles.innerCore}>
              <div className={styles.bolt}></div>
              <div className={styles.bolt}></div>
              <span className={styles.coreText}>
                SUPA
                <br />
                CORE
              </span>
            </div>
            {/* Animated Scanning Beam */}
            <div className={styles.scanner}></div>
          </div>
        </div>

        {/* SUBSCRIBER SIDE - CARBON GREY */}
        <div className={styles.side}>
          <div className={styles.techTag}>[ DOWNLINK_ACCESS ]</div>
          <h2 className={styles.sideTitle}>
            ACQUIRE
            <br />
            ACCESS
          </h2>
          <div className={styles.cardStack}>
            <div className={`${styles.miniCard} ${styles.carbon}`}>
              UNLOCK_CONTENT
            </div>
            <div className={`${styles.miniCard} ${styles.carbon}`}>
              JOIN_COMMUNITY
            </div>
            <div className={`${styles.miniCard} ${styles.carbon}`}>
              OWN_THE_FILE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
