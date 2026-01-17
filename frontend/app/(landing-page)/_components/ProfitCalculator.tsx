"use client";
import React, { useState, useEffect } from "react";
import styles from "./ProfitCalculator.module.css";
import { RiCalculatorFill, RiCheckDoubleLine } from "react-icons/ri";

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

  const [gross, setGross] = useState(0);
  const [net, setNet] = useState(0);
  const [fee, setFee] = useState(0);

  // Update revenue calculation
  useEffect(() => {
    const grossCalc = subscribers * price;
    const feeCalc = Math.floor(grossCalc * 0.05); // 5% Fee
    const netCalc = grossCalc - feeCalc;

    setGross(grossCalc);
    setFee(feeCalc);
    setNet(netCalc);
  }, [subscribers, price]);

  // Convert revenue to digit array for slot machine
  const revenueString = net
    .toLocaleString("en-US", {
      minimumIntegerDigits: 1,
      useGrouping: false,
    })
    .toString();
  const digits = revenueString.split("");

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <RiCalculatorFill /> <span>FORECASTING ENGINE</span>
          </div>
          <h2 className={styles.title}>
            Keep the <span className={styles.highlight}>Lion's Share.</span>
          </h2>
          <p className={styles.subtitle}>
            Stop losing 30% to legacy platforms. We charge a flat 5% transaction
            fee. You keep 95% of every dollar.
          </p>
        </div>

        {/* CALCULATOR INTERFACE */}
        <div className={styles.contentGrid}>
          {/* LEFT: THE PROFIT ENGINE */}
          <div className={styles.machineWrapper}>
            <div className={styles.slotMachine}>
              {/* Decorative Vents */}
              <div className={styles.vents}>
                <div className={styles.ventSlot} />
                <div className={styles.ventSlot} />
                <div className={styles.ventSlot} />
              </div>

              {/* Machine Header */}
              <div className={styles.machineHeader}>
                <span className={styles.machineLabel}>NET MONTHLY PROFIT</span>
                <div className={styles.statusLight} />
              </div>

              {/* Display Window */}
              <div className={styles.windowFrame}>
                <div className={styles.currency}>$</div>

                {/* Rolling Digits */}
                <div className={styles.reelsWrapper}>
                  {digits.map((digit, i) => (
                    <SlotDigit key={i} value={digit} />
                  ))}
                </div>

                <div className={styles.perMo}>/mo</div>
              </div>

              {/* Dynamic Breakdown Panel */}
              <div className={styles.breakdownPanel}>
                <span>Gross: ${gross.toLocaleString()}</span>
                <span style={{ color: "#aaa" }}>|</span>
                <span>Fee: -${fee.toLocaleString()} (5%)</span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTROL PANEL */}
          <div className={styles.controlsPanel}>
            {/* Slider 1: Subscribers */}
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

            {/* Slider 2: Price */}
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

            {/* Footer Info */}
            <div className={styles.infoRow}>
              <RiCheckDoubleLine className={styles.checkIcon} />
              <span>
                Calculated based on 95% payout ratio. <br />
                <strong>Funds settle to your bank daily.</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
