"use client";
import React, { useState, useEffect } from "react";
import styles from "./ProfitCalculator.module.css";
import { RiCoinFill, RiCalculatorFill } from "react-icons/ri";

// --- REUSABLE SLOT DIGIT COMPONENT ---
const SlotDigit = ({ value }: { value: string }) => {
  return (
    <div className={styles.reelContainer}>
      <div
        className={styles.reelTrack}
        style={{ transform: `translateY(-${parseInt(value) * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className={styles.reelNumber}>
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProfitCalculator() {
  const [subscribers, setSubscribers] = useState(1000);
  const [price, setPrice] = useState(29);
  const [revenue, setRevenue] = useState(0);

  // Update revenue calculation
  useEffect(() => {
    const gross = subscribers * price;
    const net = Math.floor(gross * 0.95);
    setRevenue(net);
  }, [subscribers, price]);

  // Convert revenue to digit array
  const revenueString = revenue
    .toLocaleString("en-US", {
      minimumIntegerDigits: 1,
      useGrouping: false,
    })
    .toString();
  const digits = revenueString.split("");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <RiCalculatorFill /> <span>REVENUE FORECAST</span>
          </div>
          <h2 className={styles.title}>
            Keep the <span className={styles.highlight}>Lion's Share.</span>
          </h2>
          <p className={styles.subtitle}>
            Stop losing 30% to platform fees. We take a flat 5%. You keep the
            rest.
          </p>
        </div>

        {/* --- DESKTOP GRID LAYOUT --- */}
        <div className={styles.contentGrid}>
          {/* LEFT: SLOT MACHINE DISPLAY */}
          <div className={styles.slotMachine}>
            {/* Decorative Bolts */}
            <div className={`${styles.bolt} ${styles.boltTL}`} />
            <div className={`${styles.bolt} ${styles.boltTR}`} />
            <div className={`${styles.bolt} ${styles.boltBL}`} />
            <div className={`${styles.bolt} ${styles.boltBR}`} />

            <div className={styles.machineHeader}>
              <span className={styles.indicator} />
              <span className={styles.label}>ESTIMATED MONTHLY PROFIT</span>
              <span className={styles.indicator} />
            </div>

            <div className={styles.windowFrame}>
              <div className={styles.currency}>$</div>

              {/* The Reels */}
              <div className={styles.reelsWrapper}>
                {digits.map((digit, i) => (
                  <SlotDigit key={i} value={digit} />
                ))}
              </div>

              <div className={styles.perMo}>/mo</div>
            </div>

            <div className={styles.machineFooter}>
              <RiCoinFill className={styles.coinIcon} />
              <span>BASED ON 95% PAYOUT RATIO</span>
            </div>
          </div>

          {/* RIGHT: CHUNKY CONTROLS */}
          <div className={styles.controlsPanel}>
            {/* Slider 1 */}
            <div className={styles.controlGroup}>
              <div className={styles.labelRow}>
                <span className={styles.labelText}>ACTIVE SUBSCRIBERS</span>
                <span className={styles.valueBadge}>
                  {subscribers.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                className={styles.gumroadSlider}
              />
            </div>

            {/* Slider 2 */}
            <div className={styles.controlGroup}>
              <div className={styles.labelRow}>
                <span className={styles.labelText}>MONTHLY PRICE</span>
                <span className={styles.valueBadge}>${price}</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={styles.gumroadSlider}
              />
            </div>

            {/* Extra Info */}
            <div className={styles.infoRow}>
              We process payments instantly. <br />
              <strong>No holding periods.</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
