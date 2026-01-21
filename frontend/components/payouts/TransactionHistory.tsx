"use client";
import {
  RiHistoryLine,
  RiArrowRightUpLine,
  RiArrowLeftDownLine,
  RiTimeLine,
} from "react-icons/ri";
import styles from "./TransactionHistory.module.css";

// Sample Data
const TRANSACTIONS = [
  {
    id: "tx_W8s9X72j",
    date: "Today, 4:30 PM",
    title: "Payout to Razorpay",
    amount: "₹4,500.00",
    type: "withdrawal",
    status: "processing",
  },
  {
    id: "tx_J8s2A91k",
    date: "Oct 22, 2023",
    title: "Creator Earnings",
    amount: "₹12,100.00",
    type: "earning",
    status: "completed",
  },
  {
    id: "tx_H2s1B44m",
    date: "Oct 20, 2023",
    title: "Payout to Razorpay",
    amount: "₹8,200.00",
    type: "withdrawal",
    status: "paid",
  },
  {
    id: "tx_G5s1C33x",
    date: "Oct 18, 2023",
    title: "Creator Earnings",
    amount: "₹4,200.00",
    type: "earning",
    status: "completed",
  },
];

export default function TransactionHistory() {
  return (
    <div className={styles.container}>
      {/* 1. HEADER & STATS (Merged) */}
      <div className={styles.ledgerCard}>
        <div className={styles.statsHeader}>
          <div className={styles.statBlock}>
            <span className={styles.statLabel}>Lifetime Earnings</span>
            <div className={styles.statValue}>
              <span className={styles.greenText}>₹1.58L</span>
              <RiArrowLeftDownLine className={styles.trendIcon} />
            </div>
          </div>

          <div className={styles.verticalDivider}></div>

          <div className={styles.statBlock}>
            <span className={styles.statLabel}>Total Withdrawn</span>
            <div className={styles.statValue}>
              <span>₹1.44L</span>
              <RiArrowRightUpLine className={styles.trendIconGray} />
            </div>
          </div>
        </div>

        {/* 2. THE FEED LIST */}
        <div className={styles.feedList}>
          <div className={styles.listLabel}>
            <RiHistoryLine /> Recent Transactions
          </div>

          {TRANSACTIONS.map((item) => (
            <div key={item.id} className={styles.feedItem}>
              {/* ICON */}
              <div
                className={`${styles.iconCircle} ${item.type === "earning" ? styles.iconGreen : styles.iconBlack}`}
              >
                {item.type === "earning" ? (
                  <RiArrowLeftDownLine />
                ) : (
                  <RiArrowRightUpLine />
                )}
              </div>

              {/* DETAILS */}
              <div className={styles.itemDetails}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemDate}>{item.date}</span>
              </div>

              {/* AMOUNT & STATUS */}
              <div className={styles.itemRight}>
                <span
                  className={`${styles.itemAmount} ${item.type === "earning" ? styles.textGreen : styles.textBlack}`}
                >
                  {item.type === "withdrawal" ? "-" : "+"}
                  {item.amount}
                </span>
                <div className={styles.statusBadge}>
                  {item.status === "processing" && (
                    <RiTimeLine className={styles.spin} />
                  )}
                  <span>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.viewAllBtn}>View All Transactions</button>
      </div>
    </div>
  );
}
