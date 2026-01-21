"use client";

import {
  RiShieldCheckFill,
  RiErrorWarningFill,
  RiLoader4Line,
  RiArrowRightUpLine,
  RiWallet3Line,
} from "react-icons/ri";
import styles from "./WalletCard.module.css";

interface WalletCardProps {
  isLinked: boolean;
  isWithdrawing: boolean;
  onWithdraw: () => void;
}

export default function WalletCard({
  isLinked,
  isWithdrawing,
  onWithdraw,
}: WalletCardProps) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.statementCard}>
      {/* 1. HEADER */}
      <div className={styles.headerStrip}>
        <div className={styles.brandGroup}>
          <RiWallet3Line className={styles.icon} />
          <span>Earnings</span>
        </div>
        <div className={styles.dateLabel}>{today}</div>
      </div>

      <div className={styles.cardBody}>
        {/* 2. LEFT: Value */}
        <div className={styles.valueSection}>
          <div className={styles.moneyRow}>
            <span className={styles.symbol}>₹</span>
            <span className={styles.amount}>14,450</span>
            <span className={styles.cents}>.00</span>
          </div>

          <div className={styles.statusRow}>
            {isLinked ? (
              <div className={`${styles.statusBadge} ${styles.verified}`}>
                <div className={styles.dotGreen}></div>
                <span>Connected</span>
              </div>
            ) : (
              <div className={`${styles.statusBadge} ${styles.warning}`}>
                <RiErrorWarningFill />
                <span>Link Bank</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. RIGHT: Action */}
        <div className={styles.actionSection}>
          <button
            className={styles.withdrawBtn}
            onClick={onWithdraw}
            disabled={isWithdrawing || !isLinked}
          >
            {isWithdrawing ? (
              <RiLoader4Line className={styles.spin} />
            ) : (
              <>
                <span>Withdraw Earnings</span>
                <RiArrowRightUpLine className={styles.btnIcon} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
