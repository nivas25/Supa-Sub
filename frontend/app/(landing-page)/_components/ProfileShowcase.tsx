"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProfileShowcase.module.css";
import {
  RiAddLine,
  RiShieldCheckFill,
  RiFireFill,
  RiGroupLine,
  RiHeart3Fill,
  RiArrowRightLine,
} from "react-icons/ri";

const MEMBERS = [
  {
    id: "01",
    name: "COACH_KYRA",
    type: "FITNESS",
    price: "19",
    fans: "140K",
    likes: "2M",
    color: "#ff90e8",
    shape: "circle",
    image: "/images/Profiles/1.jpg",
    status: "LIVE",
  },
  {
    id: "02",
    name: "ALEX_CODING",
    type: "CODING",
    price: "25",
    fans: "42K",
    likes: "500K",
    color: "#0066ff",
    shape: "hexagon",
    image: "/images/Profiles/2.jpg",
    status: "ONLINE",
  },
  {
    id: "03",
    name: "DR_SARA",
    type: "HEALTH",
    price: "15",
    fans: "89K",
    likes: "1.5M",
    color: "#05ac72",
    shape: "diamond",
    image: "/images/Profiles/3.jpg",
    status: "ONLINE",
  },
  {
    id: "04",
    name: "ART_BY_VFX",
    type: "VFX_ART",
    price: "30",
    fans: "256K",
    likes: "8M",
    color: "#ff4d00",
    shape: "square",
    image: "/images/Profiles/4.jpg",
    status: "LIVE",
  },
  {
    id: "05",
    name: "CHEF_MARC",
    type: "COOKING",
    price: "12",
    fans: "12K",
    likes: "100K",
    color: "#ffc900",
    shape: "circle",
    image: "/images/Profiles/5.jpg",
    status: "ONLINE",
  },
  {
    id: "06",
    name: "GUITAR_DAN",
    type: "MUSIC",
    price: "20",
    fans: "35K",
    likes: "400K",
    color: "#ff90e8",
    shape: "hexagon",
    image: "/images/Profiles/6.jpg",
    status: "ONLINE",
  },
  {
    id: "07",
    name: "FINANCE_PRO",
    type: "MONEY",
    price: "49",
    fans: "110K",
    likes: "3M",
    color: "#0066ff",
    shape: "diamond",
    image: "/images/Profiles/7.jpg",
    status: "LIVE",
  },
  {
    id: "08",
    name: "TRAVEL_ZOE",
    type: "TRAVEL",
    price: "10",
    fans: "65K",
    likes: "900K",
    color: "#05ac72",
    shape: "square",
    image: "/images/Profiles/8.jpg",
    status: "ONLINE",
  },
];

export default function ProfileShowcase() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.topBadge}>
            <RiFireFill /> <span>NO LIMITS. JUST CREATING.</span>
          </div>
          <h2 className={styles.title}>
            ANY CONTENT. <br />
            <span className={styles.highlight}>ANYONE CAN EARN.</span>
          </h2>
          <p className={styles.description}>
            The platform built for the next generation of creators. <br />
            Upload what you love and get paid for it.
          </p>
        </div>

        <div className={styles.scrollWrapper}>
          <div className={styles.scrollTrack}>
            {MEMBERS.map((person) => (
              <div
                key={person.id}
                className={styles.memberCard}
                style={{ "--accent": person.color } as any}
              >
                <div className={styles.cardTopRow}>
                  <div className={styles.statusBadge}>
                    <span className={styles.pulseDot}></span>
                    {person.status}
                  </div>
                  <div className={styles.typeTag}>{person.type}</div>
                </div>

                <div className={styles.photoArea}>
                  <div className={`${styles.frame} ${styles[person.shape]}`}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className={styles.profileImage}
                    />
                  </div>
                  {/* UPGRADED NAME STICKER STRUCTURE */}
                  <div className={styles.nameSticker}>
                    <span className={styles.stickerText}>{person.name}</span>
                  </div>
                  <div className={styles.verifyBadge}>
                    <RiShieldCheckFill />
                  </div>
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <RiGroupLine /> <span>{person.fans}</span>
                    </div>
                    <div className={styles.statItem}>
                      <RiHeart3Fill /> <span>{person.likes}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actionArea}>
                  <div className={styles.priceContainer}>
                    <span className={styles.amount}>
                      ${person.price}
                      <span style={{ fontSize: "0.6em", opacity: 0.7 }}>
                        /mnth
                      </span>
                    </span>
                  </div>
                  <button className={styles.joinBtn}>
                    JOIN <RiAddLine />
                  </button>
                </div>
              </div>
            ))}

            <div className={`${styles.memberCard} ${styles.ctaCard}`}>
              <div className={styles.ctaContent}>
                <div className={styles.ctaIcon}>
                  <RiAddLine />
                </div>
                <h3 className={styles.ctaTitle}>YOU'RE NEXT.</h3>
                <p>Start selling your content in 5 minutes.</p>
                <button className={styles.setupBtn}>
                  SETUP PROFILE <RiArrowRightLine />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
