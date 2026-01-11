"use client";
import React, { useState } from "react";
import styles from "./FAQ.module.css";
import {
  RiAddLine,
  RiIndeterminateCircleLine,
  RiTerminalWindowLine,
} from "react-icons/ri";

const FAQS = [
  {
    q: "How exactly do I keep 90% of my revenue?",
    a: "Standard platforms take 30% for 'discovery.' We provide the raw infrastructure. You bring the audience, we provide the engine, and we only take a flat 10% fee to keep the servers running at peak performance.",
  },
  {
    q: "Is my content protected from leaks?",
    a: "Yes. Our Pro Vault uses Zero-Leak encryption. Content is delivered via secure, non-downloadable streams and temporary access tokens, ensuring your intellectual property stays behind your paywall.",
  },
  {
    q: "Which platforms can I integrate with?",
    a: "We currently support full automation for Telegram and Discord. WhatsApp integration is in active development. You can turn any community group into a paid storefront in under 60 seconds.",
  },
  {
    q: "How do payouts work?",
    a: "We believe in real-time liquidity. Once a fan pays, your 90% share is processed immediately. Depending on your region, funds are typically available in your connected bank account within 24-48 hours.",
  },

  {
    q: "What does 'Building Infrastructure' mean for me?",
    a: "It means we are focused on the tech, not the social fluff. You get a robust, white-labeled backend that works while you sleep, handling invites, payments, and file delivery automatically.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Sticky System Info Panel */}
        <div className={styles.sidebar}>
          <div className={styles.terminalHeader}>
            <RiTerminalWindowLine />
            <span>SYSTEM_SUPPORT_v1.0</span>
          </div>
          <h2 className={styles.title}>
            FREQUENTLY <br />
            <span className={styles.outline}>ASKED</span> <br />
            QUESTIONS
          </h2>
          <div className={styles.statusBox}>
            <div className={styles.pulse}></div>
            <p>SUPPORT_REPRESENTATIVES_ONLINE</p>
          </div>
        </div>

        {/* Accordion Content */}
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
                <div className={styles.toggleIcon}>
                  {active === i ? <RiIndeterminateCircleLine /> : <RiAddLine />}
                </div>
              </div>
              <div className={styles.answerRow}>
                <p className={styles.answer}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
