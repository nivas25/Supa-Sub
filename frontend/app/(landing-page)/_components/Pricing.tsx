"use client";
import styles from "./Pricing.module.css";
import {
  RiFlashlightFill,
  RiVipCrownFill,
  RiCheckLine,
  RiSubtractLine,
} from "react-icons/ri";

export default function Pricing() {
  const tiers = [
    {
      id: "LVL_01",
      name: "STARTER",
      price: "0",
      icon: <RiFlashlightFill />,
      features: ["5 VAULT SLOTS", "TELEGRAM BOT", "1GB DISPATCH"],
      disabled: ["CUSTOM BRANDING", "API ACCESS"],
      isPro: false,
    },
    {
      id: "LVL_02",
      name: "PRO_MODE",
      price: "29",
      icon: <RiVipCrownFill />,
      features: [
        "UNLIMITED VAULT",
        "ADVANCED BOT",
        "100GB DISPATCH",
        "API ACCESS",
      ],
      disabled: [],
      isPro: true,
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>SYSTEM_ACCESS</h2>
        </div>

        <div className={styles.grid}>
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`${styles.card} ${t.isPro ? styles.pro : ""}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.idTag}>{t.id}</span>
                <div className={styles.icon}>{t.icon}</div>
              </div>

              <h3 className={styles.tierName}>{t.name}</h3>
              <div className={styles.priceBlock}>
                <span className={styles.amount}>${t.price}</span>
                <span className={styles.per}>/MO</span>
              </div>

              <div className={styles.featureList}>
                {t.features.map((f, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <RiCheckLine className={styles.checkIcon} /> {f}
                  </div>
                ))}
                {t.disabled.map((f, idx) => (
                  <div
                    key={idx}
                    className={`${styles.featureItem} ${styles.inactive}`}
                  >
                    <RiSubtractLine /> {f}
                  </div>
                ))}
              </div>

              <button className={styles.cta}>
                {t.isPro ? "UPGRADE_PRO" : "GET_STARTED"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
