"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProfileShowcase.module.css";
import {
  RiAddCircleFill,
  RiCheckFill,
  RiHandCoinLine,
  RiFlashlightFill,
} from "react-icons/ri";

const MEMBERS = [
  {
    id: "01",
    name: "COACH_KYRA",
    type: "FITNESS",
    price: "$19",
    fans: "140K",
    likes: "2M",
    color: "#ff90e8",
    shape: "circle",
    image: "/images/Profiles/1.jpg",
  },
  {
    id: "02",
    name: "ALEX_CODING",
    type: "CODING",
    price: "$25",
    fans: "42K",
    likes: "500K",
    color: "#0066ff",
    shape: "hexagon",
    image: "/images/Profiles/2.jpg",
  },
  {
    id: "03",
    name: "DR_SARA",
    type: "HEALTH",
    price: "$15",
    fans: "89K",
    likes: "1.5M",
    color: "#05ac72",
    shape: "diamond",
    image: "/images/Profiles/3.jpg",
  },
  {
    id: "04",
    name: "ART_BY_VFX",
    type: "VFX_ART",
    price: "$30",
    fans: "256K",
    likes: "8M",
    color: "#ff4d00",
    shape: "square",
    image: "/images/Profiles/4.jpg",
  },
  {
    id: "05",
    name: "CHEF_MARC",
    type: "COOKING",
    price: "$12",
    fans: "12K",
    likes: "100K",
    color: "#ffc900",
    shape: "circle",
    image: "/images/Profiles/5.jpg",
  },
  {
    id: "06",
    name: "GUITAR_DAN",
    type: "MUSIC",
    price: "$20",
    fans: "35K",
    likes: "400K",
    color: "#ff90e8",
    shape: "hexagon",
    image: "/images/Profiles/6.jpg",
  },
  {
    id: "07",
    name: "FINANCE_PRO",
    type: "MONEY",
    price: "$49",
    fans: "110K",
    likes: "3M",
    color: "#0066ff",
    shape: "diamond",
    image: "/images/Profiles/7.jpg",
  },
  {
    id: "08",
    name: "TRAVEL_ZOE",
    type: "TRAVEL",
    price: "$10",
    fans: "65K",
    likes: "900K",
    color: "#05ac72",
    shape: "square",
    image: "/images/Profiles/8.jpg",
  },
];

export default function ProfileShowcase() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.topBadge}>
            <RiFlashlightFill /> JOIN_NOW
          </div>
          <h2 className={styles.title}>
            JOIN THE <br />
            <span className={styles.highlight}>ELITE NETWORK.</span>
          </h2>
          {/* SUPER SIMPLE HOOK */}
          <p className={styles.description}>
            IF YOU MAKE STUFF, YOU CAN SELL STUFF. <br />
            EVERYONE IS WELCOME HERE.
          </p>
          <div className={styles.scrollHint}>
            <RiHandCoinLine /> <span>DRAG_TO_SEE_MORE</span>
          </div>
        </div>

        <div className={styles.scrollWrapper}>
          <div className={styles.scrollTrack}>
            {MEMBERS.map((person, i) => (
              <div
                key={i}
                className={styles.memberCard}
                style={{ "--accent": person.color } as any}
              >
                <div className={`${styles.bgShape} ${styles[person.shape]}`} />

                <div className={styles.cardHeader}>
                  <div className={styles.typeTag}>{person.type}</div>
                  <div className={styles.priceTag}>
                    {person.price}
                    <span>/mo</span>
                  </div>
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
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.nameTag}>
                    <h3 className={styles.userName}>{person.name}</h3>
                  </div>

                  <div className={styles.statsRow}>
                    <div className={styles.statLine}>
                      <span className={styles.smallLabel}>FANS</span>
                      <span className={styles.bigValue}>{person.fans}</span>
                    </div>
                    <div className={styles.statLine}>
                      <span className={styles.smallLabel}>LIKES</span>
                      <span className={styles.bigValue}>{person.likes}</span>
                    </div>
                  </div>
                </div>

                <button className={styles.joinBtn}>
                  JOIN_NOW <RiAddCircleFill />
                </button>

                <div className={styles.footerRow}>
                  <RiCheckFill className={styles.checkIcon} />{" "}
                  <span>REAL_MEMBER</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
