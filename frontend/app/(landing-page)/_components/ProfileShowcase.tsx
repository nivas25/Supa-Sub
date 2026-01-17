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
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiFolderShield2Fill,
  RiVideoFill,
  RiInformationLine,
  RiMusicFill,
  RiMapPinFill,
} from "react-icons/ri";

const CREATORS = [
  {
    id: "01",
    handle: "fitness_mike",
    category: "Fitness",
    name: "Mike's Gym",
    bio: "Daily HIIT workouts & meal plans. Get fit with the squad.",
    price: "19",
    image: "/images/Profiles/1.jpg",
    avatar: "/images/Profiles/1.jpg",
    color: "#ffc900", // Yellow
    members: "140K",
    posts: "342",
    linkText: "substarter.com/fitness-mike",
    links: [
      {
        icon: <RiTelegramFill />,
        title: "Daily Workouts",
        tag: "Telegram",
        desc: "Morning routine videos posted daily at 6 AM EST.",
      },
      {
        icon: <RiFolderShield2Fill />,
        title: "Meal Plans PDF",
        tag: "Resources",
        desc: "Weekly high-protein shopping lists & recipes.",
      },
    ],
  },
  {
    id: "02",
    handle: "code_mastery",
    category: "Coding",
    name: "Dev Sarah",
    bio: "Zero to Hero coding bootcamps. Weekly code reviews.",
    price: "25",
    image: "/images/Profiles/2.jpg",
    avatar: "/images/Profiles/2.jpg",
    color: "#0066ff", // Blue
    members: "42K",
    posts: "85",
    linkText: "substarter.com/dev-sarah",
    links: [
      {
        icon: <RiDiscordFill />,
        title: "Dev Squad",
        tag: "Discord",
        desc: "24/7 peer support and live debugging sessions.",
      },
      {
        icon: <RiFolderShield2Fill />,
        title: "Source Code",
        tag: "GitHub",
        desc: "Full access to private repos for all projects.",
      },
    ],
  },
  {
    id: "03",
    handle: "zen_living",
    category: "Wellness",
    name: "Yoga Jen",
    bio: "Guided meditations and daily flows for inner peace.",
    price: "15",
    image: "/images/Profiles/3.jpg",
    avatar: "/images/Profiles/3.jpg",
    color: "#05ac72", // Green
    members: "89K",
    posts: "200+",
    linkText: "substarter.com/yoga-jen",
    links: [
      {
        icon: <RiWhatsappFill />,
        title: "Daily Flow",
        tag: "WhatsApp",
        desc: "Daily affirmations and pose corrections.",
      },
      {
        icon: <RiVideoFill />,
        title: "Meditation Library",
        tag: "Video",
        desc: "Over 200+ hours of guided 4k content.",
      },
    ],
  },
  {
    id: "04",
    handle: "vfx_school",
    category: "Design",
    name: "VFX Wizard",
    bio: "Blender & Maya tutorials. 3D Assets included.",
    price: "30",
    image: "/images/Profiles/4.jpg",
    avatar: "/images/Profiles/4.jpg",
    color: "#ff4d00", // Orange
    members: "25K",
    posts: "45",
    linkText: "substarter.com/vfx-wizard",
    links: [
      {
        icon: <RiDiscordFill />,
        title: "VFX Artists",
        tag: "Discord",
        desc: "Pro feedback on your renders and animations.",
      },
      {
        icon: <RiFolderShield2Fill />,
        title: "Asset Library",
        tag: "Drive",
        desc: "100GB+ of textures, models, and HDRI maps.",
      },
    ],
  },
  {
    id: "05",
    handle: "chef_marc",
    category: "Food",
    name: "Chef Marc",
    bio: "Secret family recipes and masterclasses. Cook like a pro.",
    price: "12",
    image: "/images/Profiles/5.jpg",
    avatar: "/images/Profiles/5.jpg",
    color: "#ffc900", // Yellow
    members: "12K",
    posts: "30",
    linkText: "substarter.com/chef-marc",
    links: [
      {
        icon: <RiTelegramFill />,
        title: "Recipe Drops",
        tag: "Telegram",
        desc: "Secret menu items and weekend specials.",
      },
      {
        icon: <RiVideoFill />,
        title: "Cooking Class",
        tag: "Course",
        desc: "Step-by-step video guides for complex dishes.",
      },
    ],
  },
  {
    id: "06",
    handle: "riff_master",
    category: "Music",
    name: "Guitar Pro",
    bio: "Learn to play your favorite songs in minutes. Tabs included.",
    price: "20",
    image: "/images/Profiles/6.jpg",
    avatar: "/images/Profiles/6.jpg",
    color: "#ff90e8", // Pink
    members: "35K",
    posts: "150",
    linkText: "substarter.com/riff-master",
    links: [
      {
        icon: <RiDiscordFill />,
        title: "Jam Sessions",
        tag: "Discord",
        desc: "Live jamming and theory Q&A with the band.",
      },
      {
        icon: <RiMusicFill />,
        title: "Tab Archive",
        tag: "Drive",
        desc: "High-quality PDF & GP5 tabs for 500+ songs.",
      },
    ],
  },
  {
    id: "07",
    handle: "crypto_king",
    category: "Finance",
    name: "Market Movers",
    bio: "Real-time stock signals and crypto analysis. Daily alerts.",
    price: "49",
    image: "/images/Profiles/7.jpg",
    avatar: "/images/Profiles/7.jpg",
    color: "#0066ff", // Blue
    members: "110K",
    posts: "900+",
    linkText: "substarter.com/market-movers",
    links: [
      {
        icon: <RiTelegramFill />,
        title: "Buy/Sell Signals",
        tag: "Telegram",
        desc: "Instant entry/exit alerts with risk management.",
      },
      {
        icon: <RiVideoFill />,
        title: "Market Analysis",
        tag: "Live Stream",
        desc: "Weekly zoom calls analyzing the week ahead.",
      },
    ],
  },
  {
    id: "08",
    handle: "travel_anna",
    category: "Travel",
    name: "Globetrotter",
    bio: "Hidden gems and travel hacks for your next adventure.",
    price: "10",
    image: "/images/Profiles/8.jpg",
    avatar: "/images/Profiles/8.jpg",
    color: "#05ac72", // Green
    members: "65K",
    posts: "210",
    linkText: "substarter.com/travel-anna",
    links: [
      {
        icon: <RiWhatsappFill />,
        title: "Travel Squad",
        tag: "WhatsApp",
        desc: "Real-time meetups and safety tips.",
      },
      {
        icon: <RiMapPinFill />,
        title: "City Guides",
        tag: "PDF Maps",
        desc: "Curated local spots avoiding tourist traps.",
      },
    ],
  },
];

export default function ProfileShowcase() {
  return (
    <section className={styles.wrapper} id="showcase">
      {/* Texture */}
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
                    <div className={styles.categoryTag}>{item.category}</div>
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

                  {/* 3. COMMUNITY LINKS LIST */}
                  <div className={styles.linksSection}>
                    <div className={styles.sectionHeader}>
                      <span className={styles.sectionLabel}>What you get</span>
                      <RiInformationLine className={styles.infoIcon} />
                    </div>

                    {item.links.map((link, idx) => (
                      <div className={styles.linkCard} key={idx}>
                        <div className={styles.cardTop}>
                          <div className={styles.linkIcon}>{link.icon}</div>
                          <div className={styles.linkInfo}>
                            <span className={styles.linkTitle}>
                              {link.title}
                            </span>
                            <span className={styles.platformTag}>
                              {link.tag}
                            </span>
                          </div>
                          <div className={styles.arrowIcon}>
                            <RiArrowRightLine />
                          </div>
                        </div>
                        <div className={styles.linkDesc}>{link.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. SPLIT FOOTER */}
                <div className={styles.stickyBtnContainer}>
                  <div className={styles.priceBox}>
                    <span className={styles.priceLabel}>Monthly</span>
                    <span className={styles.priceValue}>${item.price}</span>
                  </div>
                  <button className={styles.joinBtn}>
                    Join Now <RiArrowRightLine />
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
