import { RiWallet3Line } from "react-icons/ri";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      {/* Neo-Brutalist Icon Box */}
      <div className={styles.iconBox}>
        <RiWallet3Line className={styles.icon} />
      </div>

      <div className={styles.textStack}>
        <h1 className={styles.pageTitle}>
          Payouts<span className={styles.accentDot}>.</span>
        </h1>
        <p className={styles.subLabel}>Track earnings & manage withdrawals</p>
      </div>
    </div>
  );
}
