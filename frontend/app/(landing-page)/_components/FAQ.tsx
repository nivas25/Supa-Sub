"use client";
import React, { useState } from "react";
import styles from "./FAQ.module.css";
import {
  RiAddLine,
  RiSubtractLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";

const FAQS = [
  {
    q: "How exactly do I keep 95% of my revenue?",
    a: "Standard platforms take 30% for 'discovery.' We provide the raw infrastructure. You bring the audience, we provide the engine, and we only take a flat 5% fee to keep the servers running at peak performance.",
  },
  {
    q: "Which platforms do you support?",
    a: "We currently support full automation for WhatsApp, Telegram, and Discord. You can turn any existing community group into a paid storefront in under 60 seconds.",
  },
  {
    q: "How fast do payouts land?",
    a: "We believe in real-time liquidity. Once a fan pays, your 95% share is processed immediately. Depending on your region/bank, funds are typically available within 24-48 hours.",
  },
  {
    q: "Do I need technical skills?",
    a: "None. If you can paste a link, you can use our platform. We handle the bots, the payment gateways, and the member syncing automatically.",
  },
  {
    q: "Do I own my customer data?",
    a: "100%. Unlike other platforms that gate your audience, you get full export access to your member emails and phone numbers. It's your business; we just power it.",
  },
  {
    q: "Can I sell to an international audience?",
    a: "Yes. Our payment layer handles 135+ currencies and automatically converts them to your local bank's currency upon payout. You can scale globally from day one.",
  },
];

export default function FAQ() {
  // Initial state is null so no question is open by default
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Sticky Sidebar Header */}
        <div className={styles.sidebar}>
          <div className={styles.badge}>
            <RiQuestionAnswerLine /> <span>SUPPORT CENTER</span>
          </div>
          <h2 className={styles.title}>
            Frequently Asked <br />
            <span className={styles.italicHighlight}>Questions.</span>
          </h2>
          {/* Operations Status Widget Removed */}
        </div>

        {/* Clean Accordion List */}
        <div className={styles.faqList}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`${styles.faqItem} ${
                active === i ? styles.active : ""
              }`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className={styles.questionRow}>
                <span className={styles.index}>0{i + 1}</span>
                <h3 className={styles.question}>{faq.q}</h3>
                <div className={styles.iconBox}>
                  {active === i ? <RiSubtractLine /> : <RiAddLine />}
                </div>
              </div>

              <div className={styles.answerWrapper}>
                <div className={styles.answerInner}>
                  <p className={styles.answer}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
