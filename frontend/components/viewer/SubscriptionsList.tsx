"use client";
import {
  RiRefreshLine,
  RiVipCrownFill,
  RiTimeLine,
  RiCheckDoubleLine,
  RiStarSmileFill,
} from "react-icons/ri";
import styles from "./Subscriptions.module.css";

export default function SubscriptionsList() {
  const subs = [
    {
      id: 1,
      creator: "DesignCourse",
      plan: "PRO MENTORSHIP",
      price: "$29",
      duration: "30 days",
      status: "ACTIVE",
      expiry: "12 days left",
      isExpired: false,
      themeColor: "#25d366", // Brand Green
      accentColor: "#dcfce7",
    },
    {
      id: 2,
      creator: "Jack Herrington",
      plan: "REACT MASTER",
      price: "$10",
      duration: "30 days",
      status: "EXPIRED",
      expiry: "Ended Jan 10",
      isExpired: true,
      themeColor: "#ff90e8", // Hot Pink
      accentColor: "#fce7f3",
    },
    {
      id: 3,
      creator: "Fireship",
      plan: "PRO ACCESS",
      price: "$25",
      duration: "30 days",
      status: "ACTIVE",
      expiry: "Expires tomorrow",
      isExpired: false,
      themeColor: "#ffeb3b", // Yellow
      accentColor: "#fef9c3",
    },
  ];

  return (
    <div className={styles.grid}>
      {subs.map((sub) => (
        <div
          key={sub.id}
          className={`${styles.card} ${sub.isExpired ? styles.cardExpired : ""}`}
        >
          {/* TOP HALF: COLORED BRANDING */}
          <div
            className={styles.cardTop}
            style={{
              backgroundColor: sub.isExpired ? "#cbd5e1" : sub.themeColor,
            }}
          >
            {/* Floating Badge */}
            <div className={styles.floatBadge}>
              <RiStarSmileFill size={16} /> VERIFIED
            </div>

            <div className={styles.topContent}>
              <div className={styles.avatarBox}>{sub.creator[0]}</div>
              <h2 className={styles.creatorName}>{sub.creator}</h2>
              <div className={styles.planPill}>
                <RiVipCrownFill size={14} /> {sub.plan}
              </div>
            </div>

            {/* Zig Zag Divider */}
            <div className={styles.zigZag} />
          </div>

          {/* BOTTOM HALF: INFO & ACTION */}
          <div className={styles.cardBottom}>
            {/* Status Flag */}
            <div className={styles.statusFlag} data-status={sub.status}>
              {sub.status}
            </div>

            <div className={styles.infoRow}>
              <div className={styles.priceGroup}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>
                  {sub.price.replace("$", "")}
                </span>
                <span className={styles.duration}>/ {sub.duration}</span>
              </div>

              <div
                className={`${styles.expiryTag} ${sub.isExpired ? styles.expRed : styles.expGreen}`}
              >
                <RiTimeLine /> {sub.expiry}
              </div>
            </div>

            {/* Footer Action */}
            <div className={styles.footer}>
              {sub.isExpired ? (
                <button className={styles.renewBtn}>
                  Renew Now <RiRefreshLine />
                </button>
              ) : (
                <div className={styles.activeBtn}>
                  Active Pass <RiCheckDoubleLine />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
