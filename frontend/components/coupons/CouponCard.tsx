"use client";
import styles from "./CouponCard.module.css";
import { CouponData } from "./Coupons";

interface CouponCardProps {
  data: CouponData;
  index: number; /* IMPORTANT: index is required now */
  onClick: () => void;
}

export default function CouponCard({ data, index, onClick }: CouponCardProps) {
  // Cycle through 5 themes (0 to 4)
  const themeIndex = (index || 0) % 5;
  const themeClass = styles[`theme${themeIndex}`];

  const usagePercent = Math.min((data.uses / data.maxUses) * 100, 100);
  const remaining = data.maxUses - data.uses;
  const isExpired = data.status === "Expired";

  return (
    <div
      className={`${styles.couponCard} ${themeClass} ${
        isExpired ? styles.cardExpired : ""
      }`}
      onClick={onClick}
    >
      {/* LEFT SECTION */}
      <div className={styles.cardMain}>
        <div className={styles.topRow}>
          {/* Badge gets accentBg color unless expired */}
          <div
            className={`${
              isExpired ? styles.statusBadgeExpired : styles.statusBadgeActive
            } ${!isExpired ? styles.accentBg : ""}`}
          >
            {isExpired ? "EXPIRED" : "ACTIVE"}
          </div>
          <span className={styles.typeLabel}>{data.type}</span>
        </div>

        <div className={styles.discountRow}>
          <span className={styles.discountValue}>{data.discount}</span>
          <span className={styles.discountSymbol}>
            {data.type === "Percentage" ? "%" : "$"}
            <br />
            OFF
          </span>
        </div>

        <div className={styles.usageSection}>
          <div className={styles.progressBarContainer}>
            {/* Progress Bar gets accentBg color */}
            <div
              className={`${styles.progressBarFill} ${styles.accentBg}`}
              style={{ width: `${usagePercent}%` }}
            ></div>
          </div>
          <div className={styles.usageMeta}>
            <span>
              <strong>{data.uses}</strong> Used
            </span>
            <span>
              <strong>{remaining}</strong> Left
            </span>
          </div>
        </div>
      </div>

      {/* TEAR LINE */}
      <div className={styles.tearLine}>
        <div className={styles.notchStart}></div>
        <div className={styles.dashedBorder}></div>
        <div className={styles.notchEnd}></div>
      </div>

      {/* RIGHT STUB */}
      <div className={styles.cardStub}>
        <div className={styles.punchHole}></div>

        <div className={styles.barcodeArea}>
          <div className={styles.barcode}></div>
          <span className={styles.fakeSerial}>NO.{data.id}8X</span>
        </div>

        <div className={styles.stubContent}>
          <span className={styles.codeLabel}>Redeem Code</span>
          <div className={styles.codeBox}>{data.code}</div>
        </div>
      </div>
    </div>
  );
}
