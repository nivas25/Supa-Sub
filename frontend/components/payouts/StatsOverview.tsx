import styles from "./StatsOverview.module.css";

export default function StatsOverview() {
  return (
    <div className={styles.grid}>
      <div className={styles.statCard}>
        <span className={styles.label}>Total Earnings</span>
        <span className={styles.value}>₹1.58L</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.label}>Withdrawn</span>
        <span className={styles.value}>₹1.44L</span>
      </div>
    </div>
  );
}
