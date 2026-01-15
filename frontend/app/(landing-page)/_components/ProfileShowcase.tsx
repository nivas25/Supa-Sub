"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProfileShowcase.module.css";
import {
  RiFireFill,
  RiArrowRightLine,
  RiVerifiedBadgeFill,
  RiFlashlightFill,
  RiUserHeartLine,
  RiGroupLine,
} from "react-icons/ri";

const CREATORS = [
  {
    id: "01",
    tag: "FITNESS",
    headline: "Your Personal",
    highlight: "Coach",
    desc: "Daily workout plans and nutrition guides for a healthier you.",
    price: "19",
    image: "/images/Profiles/1.jpg",
    color: "#ffc900", // Yellow
    badge: "POPULAR 🔥",
    btnText: "Join the Squad",
    members: "140K",
  },
  {
    id: "02",
    tag: "CODING",
    headline: "Zero to",
    highlight: "Mastery",
    desc: "Full-stack bootcamps and weekly code reviews.",
    price: "25",
    image: "/images/Profiles/2.jpg",
    color: "#0066ff", // Blue
    badge: "BEST SELLER 💎",
    btnText: "Join the Devs",
    members: "42K",
  },
  {
    id: "03",
    tag: "HEALTH",
    headline: "Holistic",
    highlight: "Living",
    desc: "Mental health tips and guided meditation sessions.",
    price: "15",
    image: "/images/Profiles/3.jpg",
    color: "#05ac72", // Green
    badge: "TRENDING 🌿",
    btnText: "Join the Zen",
    members: "89K",
  },
  {
    id: "04",
    tag: "VFX ART",
    headline: "VFX Magic",
    highlight: "School",
    desc: "Learn 3D modeling and animation from industry pros.",
    price: "30",
    image: "/images/Profiles/4.jpg",
    color: "#ff4d00", // Orange
    badge: "TOP RATED ⭐",
    btnText: "Join the Art",
    members: "256K",
  },
  {
    id: "05",
    tag: "COOKING",
    headline: "Chef Marc's",
    highlight: "Kitchen",
    desc: "Secret recipes and video tutorials for home cooks.",
    price: "12",
    image: "/images/Profiles/5.jpg",
    color: "#ffc900", // Yellow
    badge: "TASTY PICKS 🍳",
    btnText: "Join the Feast",
    members: "12K",
  },
  {
    id: "06",
    tag: "MUSIC",
    headline: "Guitar Pro",
    highlight: "Tabs",
    desc: "Learn to play your favorite songs in minutes.",
    price: "20",
    image: "/images/Profiles/6.jpg",
    color: "#ff90e8", // Pink
    badge: "NEW DROP 🎸",
    btnText: "Join the Jam",
    members: "35K",
  },
  {
    id: "07",
    tag: "FINANCE",
    headline: "Market",
    highlight: "Movers",
    desc: "Real-time stock signals and crypto analysis.",
    price: "49",
    image: "/images/Profiles/7.jpg",
    color: "#0066ff", // Blue
    badge: "HIGH VALUE 💸",
    btnText: "Join the Club",
    members: "110K",
  },
  {
    id: "08",
    tag: "TRAVEL",
    headline: "Globetrotter",
    highlight: "Guides",
    desc: "Hidden gems and travel hacks for your next trip.",
    price: "10",
    image: "/images/Profiles/8.jpg",
    color: "#05ac72", // Green
    badge: "ADVENTURE 🗺️",
    btnText: "Join the Trip",
    members: "65K",
  },
];

export default function ProfileShowcase() {
  return (
    <section className={styles.wrapper}>
      {/* High-End Texture */}
      <div className={styles.dotPattern} />

      <div className={styles.container}>
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div className={styles.topBadge}>
            <RiFireFill /> <span>NO LIMITS. JUST CREATING.</span>
          </div>
          <h2 className={styles.title}>
            ANY CONTENT. <br />
            <span className={styles.headerHighlight}>ANYONE CAN EARN.</span>
          </h2>
          <p className={styles.description}>
            The platform built for the next generation of creators. <br />
            Upload what you love and get paid for it.
          </p>
        </div>

        {/* --- MARKETPLACE SCROLLER --- */}
        <div className={styles.scrollContainer}>
          <div className={styles.track}>
            {CREATORS.map((item) => (
              <div
                key={item.id}
                className={styles.productCard}
                style={{ "--accent": item.color } as any}
              >
                {/* Image & Status Area */}
                <div className={styles.imageArea}>
                  <div className={styles.liveTag}>
                    <span className={styles.pulseDot} /> LIVE
                  </div>
                  <span className={styles.categoryTag}>{item.tag}</span>
                  <Image
                    src={item.image}
                    alt={item.headline}
                    fill
                    className={styles.bgImage}
                  />
                </div>

                {/* Content Body */}
                <div className={styles.cardContent}>
                  <div className={styles.topMeta}>
                    <div className={styles.creatorBadge}>
                      <RiVerifiedBadgeFill className={styles.verifyIcon} />
                      <span className={styles.badgeText}>{item.badge}</span>
                    </div>
                    <div className={styles.memberCount}>
                      <RiGroupLine /> {item.members}
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>
                    {item.headline}{" "}
                    <span className={styles.textHighlight}>
                      {item.highlight}
                    </span>
                  </h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>

                {/* Interactive Footer */}
                <div className={styles.cardFooter}>
                  <div className={styles.priceTag}>
                    <span className={styles.currency}>$</span>
                    {item.price}
                  </div>
                  <button className={styles.accessBtn}>
                    {item.btnText} <RiUserHeartLine />
                  </button>
                </div>
              </div>
            ))}

            {/* "Create Yours" CTA Card */}
            <div className={`${styles.productCard} ${styles.ctaCard}`}>
              <div className={styles.ctaContent}>
                <div className={styles.iconBox}>
                  <RiFlashlightFill />
                </div>
                <h3 className={styles.ctaHeading}>
                  YOUR EMPIRE <br />
                  <span className={styles.whiteHighlight}>STARTS HERE.</span>
                </h3>
                <p className={styles.ctaText}>
                  Join 10,000+ creators earning on their own terms.
                </p>
                <button className={styles.startBtn}>
                  Create My Page <RiArrowRightLine />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
