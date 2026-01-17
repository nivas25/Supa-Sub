"use client";
import React from "react";
import styles from "./Pricing.module.css";
import { RiCheckFill } from "react-icons/ri";

export default function Pricing() {
  return (
    <section className={styles.wrapper} id="pricing">
      <div className={styles.container}>
        {/* LEFT: THE PITCH */}
        <div className={styles.contentSide}>
          <div className={styles.tag}>ZERO RISK MODEL</div>

          <h2 className={styles.title}>
            We only win <br />
            when <span className={styles.highlight}>you win.</span>
          </h2>

          <p className={styles.description}>
            Launch for free. No credit card required. <br />
            We simply deduct a flat 5% transaction fee when you get paid. You
            keep 95% of every subscription.
          </p>

          <div className={styles.featureList}>
            <div className={styles.feature}>
              <div className={styles.checkIcon}>
                <RiCheckFill />
              </div>
              <span>Unlimited Members & Revenue</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.checkIcon}>
                <RiCheckFill />
              </div>
              <span>Instant Daily Payouts</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.checkIcon}>
                <RiCheckFill />
              </div>
              <span>Fraud Protection Included</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.checkIcon}>
                <RiCheckFill />
              </div>
              <span>No Fee on Free Tiers</span>
            </div>
          </div>
        </div>

        {/* RIGHT: THE PRINTER VISUAL */}
        <div className={styles.visualSide}>
          {/* The Slot */}
          <div className={styles.printerSlot} />

          {/* The Receipt */}
          <div className={styles.receiptContainer}>
            <div className={styles.receipt}>
              {/* Header */}
              <div className={styles.receiptHeader}>
                <span className={styles.logoText}>SUBSTARTER</span>
                <div className={styles.metaRow}>
                  <span>ID: 8829-X</span>
                  <span>{new Date().toISOString().split("T")[0]}</span>
                  <span>TERM: 04</span>
                </div>
              </div>

              {/* Items */}
              <div className={styles.lineItem}>
                <span>VIP SUBSCRIPTION</span>
                <span>$100.00</span>
              </div>

              <div className={`${styles.lineItem} ${styles.feeItem}`}>
                <div className={styles.feeHighlight} />
                <span>PLATFORM FEE (5%)</span>
                <span>- $5.00</span>
              </div>

              <div className={`${styles.lineItem} ${styles.feeItem}`}>
                <span>PAYMENT PROC.</span>
                <span>INCL.</span>
              </div>

              {/* Total */}
              <div className={styles.totalSection}>
                <span className={styles.totalLabel}>NET PAYOUT</span>
                <span className={styles.totalAmount}>$95.00</span>
              </div>

              {/* Signature */}
              <div className={styles.signatureSection}>
                <span className={styles.signature}>Your Brand Inc.</span>
                <div className={styles.signLabel}>AUTHORIZED SIGNATURE</div>
              </div>

              {/* Stamp */}
              <div className={styles.stamp}>SETTLED</div>

              {/* Footer Code */}
              <div className={styles.barcode} />
              <div className={styles.footerCode}>THANK YOU FOR CREATING</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
