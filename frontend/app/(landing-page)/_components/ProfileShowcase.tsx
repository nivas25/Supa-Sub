"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProfileShowcase.module.css";
import {
  RiFireFill,
  RiVerifiedBadgeFill,
  RiLockFill,
  RiFlashlightFill,
  RiArrowRightLine,
} from "react-icons/ri";

const CREATORS = [
  {
    id: "01",
    handle: "fitness_mike",
    name: "Mike's Gym",
    bio: "Daily HIIT workouts & meal plans. Get fit with the squad.",
    price: "19",
    image: "/images/Profiles/1.jpg",
    avatar: "/images/Profiles/1.jpg",
    color: "#ffc900", // Yellow
    members: "140K",
    posts: "342",
    linkText: "substarter.com/fitness-mike",
  },
  {
    id: "02",
    handle: "code_mastery",
    name: "Dev Sarah",
    bio: "Zero to Hero coding bootcamps. Weekly code reviews.",
    price: "25",
    image: "/images/Profiles/2.jpg",
    avatar: "/images/Profiles/2.jpg",
    color: "#0066ff", // Blue
    members: "42K",
    posts: "85",
    linkText: "substarter.com/dev-sarah",
  },
  {
    id: "03",
    handle: "zen_living",
    name: "Yoga Jen",
    bio: "Guided meditations and daily flows for inner peace.",
    price: "15",
    image: "/images/Profiles/3.jpg",
    avatar: "/images/Profiles/3.jpg",
    color: "#05ac72", // Green
    members: "89K",
    posts: "200+",
    linkText: "substarter.com/yoga-jen",
  },
  {
    id: "04",
    handle: "vfx_school",
    name: "VFX Wizard",
    bio: "Blender & Maya tutorials. 3D Assets included.",
    price: "30",
    image: "/images/Profiles/4.jpg",
    avatar: "/images/Profiles/4.jpg",
    color: "#ff4d00", // Orange
    members: "25K",
    posts: "45",
    linkText: "substarter.com/vfx-wizard",
  },
  {
    id: "05",
    handle: "chef_marc",
    name: "Chef Marc",
    bio: "Secret family recipes and masterclasses. Cook like a pro.",
    price: "12",
    image: "/images/Profiles/5.jpg",
    avatar: "/images/Profiles/5.jpg",
    color: "#ffc900", // Yellow
    members: "12K",
    posts: "30",
    linkText: "substarter.com/chef-marc",
  },
  {
    id: "06",
    handle: "riff_master",
    name: "Guitar Pro",
    bio: "Learn to play your favorite songs in minutes. Tabs included.",
    price: "20",
    image: "/images/Profiles/6.jpg",
    avatar: "/images/Profiles/6.jpg",
    color: "#ff90e8", // Pink
    members: "35K",
    posts: "150",
    linkText: "substarter.com/riff-master",
  },
  {
    id: "07",
    handle: "crypto_king",
    name: "Market Movers",
    bio: "Real-time stock signals and crypto analysis. Daily alerts.",
    price: "49",
    image: "/images/Profiles/7.jpg",
    avatar: "/images/Profiles/7.jpg",
    color: "#0066ff", // Blue
    members: "110K",
    posts: "900+",
    linkText: "substarter.com/market-movers",
  },
  {
    id: "08",
    handle: "travel_anna",
    name: "Globetrotter",
    bio: "Hidden gems and travel hacks for your next adventure.",
    price: "10",
    image: "/images/Profiles/8.jpg",
    avatar: "/images/Profiles/8.jpg",
    color: "#05ac72", // Green
    members: "65K",
    posts: "210",
    linkText: "substarter.com/travel-anna",
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

        {/* --- PHONE SCROLLER --- */}
        <div className={styles.scrollContainer}>
          <div className={styles.track}>
            {CREATORS.map((item) => (
              <div
                key={item.id}
                className={styles.phoneMockup}
                style={{ "--accent": item.color } as React.CSSProperties}
              >
                {/* 1. Browser Chrome */}
                <div className={styles.browserChrome}>
                  <div className={styles.urlBar}>
                    <RiLockFill className={styles.lockIcon} />
                    {item.linkText}
                  </div>
                </div>

                {/* 2. Screen Content */}
                <div className={styles.screenContent}>
                  {/* Cover & Avatar */}
                  <div className={styles.coverPhoto}>
                    <Image
                      src={item.image}
                      alt="cover"
                      fill
                      className={styles.coverImg}
                      loading="lazy"
                      quality={75}
                    />
                  </div>

                  <div className={styles.profileInfo}>
                    <div className={styles.avatarBox}>
                      <Image
                        src={item.avatar}
                        alt="avatar"
                        fill
                        className={styles.avatarImg}
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                    <div className={styles.handle}>
                      {item.name}{" "}
                      <RiVerifiedBadgeFill className={styles.verified} />
                    </div>
                    <p className={styles.bio}>{item.bio}</p>

                    <div className={styles.statsGrid}>
                      <div className={styles.stat}>
                        <span className={styles.statNum}>{item.members}</span>
                        <span className={styles.statLabel}>Members</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statNum}>{item.posts}</span>
                        <span className={styles.statLabel}>Posts</span>
                      </div>
                    </div>
                  </div>

                  {/* Feed Preview */}
                  <div className={styles.feedPreview}>
                    <div className={styles.feedTitle}>Recent Posts</div>
                    <div className={styles.postList}>
                      {/* Free Post */}
                      <div className={`${styles.postItem} ${styles.freePost}`}>
                        <div className={styles.postThumb}>
                          <Image
                            src={item.image}
                            alt="post"
                            fill
                            style={{ objectFit: "cover", opacity: 0.8 }}
                          />
                        </div>
                        <div className={styles.postMeta}>
                          <div className={styles.postLine} />
                          <div
                            className={`${styles.postLine} ${styles.short}`}
                          />
                        </div>
                      </div>

                      {/* Locked Post */}
                      <div
                        className={`${styles.postItem} ${styles.lockedPost}`}
                      >
                        <div
                          className={styles.blurLayer}
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className={styles.lockOverlay}>
                          <div className={styles.lockBadge}>
                            <RiLockFill />
                          </div>
                          <div className={styles.lockText}>
                            Subscribers Only
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Sticky Action Button */}
                <div className={styles.stickyBtnContainer}>
                  <button className={styles.subscribeBtn}>
                    <span>Join Community</span>
                    <span>${item.price}/mo</span>
                  </button>
                </div>
              </div>
            ))}

            {/* "Create Yours" Card */}
            <div className={`${styles.phoneMockup} ${styles.createCard}`}>
              <div className={styles.createContent}>
                <RiFlashlightFill
                  size={60}
                  style={{ marginBottom: 20, color: "#ff90e8" }}
                />
                <h3 className={styles.createTitle}>
                  YOUR PAGE <br />
                  <span className={styles.createHighlight}>GOES HERE.</span>
                </h3>
                <p style={{ color: "#aaa", lineHeight: 1.5 }}>
                  Claim your unique link and start earning in minutes.
                </p>
                <button className={styles.createBtn}>
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
