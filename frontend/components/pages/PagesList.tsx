"use client";
import Link from "next/link";
import {
  RiAddLine,
  RiArrowRightUpLine,
  RiUser3Line,
  RiEyeLine,
} from "react-icons/ri";
import styles from "./PagesList.module.css";

// 1. Define the Interface to match the Database/Server Data
interface PageData {
  id: string;
  slug: string;
  name: string; // Correct: Matches DB 'name'
  subscribers: number; // Correct: Matches the calculated count
  views: number; // Correct: Matches DB 'views'
  status: string;
}

export default function PagesList({ pages }: { pages: PageData[] }) {
  return (
    <div className={styles.grid}>
      {/* 1. CREATE NEW CARD */}
      <Link href="/editor/new" className={styles.createCard}>
        <div className={styles.createIconBox}>
          <RiAddLine size={32} />
        </div>
        <div className={styles.createTextStack}>
          <h3 className={styles.createTitle}>New Page</h3>
          <p className={styles.createSub}>Create a new entry point</p>
        </div>
      </Link>

      {/* 2. PAGE CARDS */}
      {pages.map((page) => (
        <Link
          key={page.id}
          href={`/pages/${page.id}`} // Clicking card goes to Editor
          className={styles.pageCard}
        >
          {/* A. HEADER */}
          <div className={styles.cardHeader}>
            <div className={styles.dotPattern} />
            <div
              className={`${styles.statusBadge} ${page.status === "active" ? styles.active : styles.draft}`}
            >
              {page.status === "active" ? "LIVE" : "DRAFT"}
            </div>

            {/* External Link Button (Opens Live Page) */}
            <div
              className={styles.externalLink}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`/${page.slug}`, "_blank");
              }}
            >
              <RiArrowRightUpLine />
            </div>
          </div>

          {/* B. BODY */}
          <div className={styles.cardBody}>
            <div className={styles.infoStack}>
              {/* Page Name */}
              <h3 className={styles.pageTitle}>{page.name}</h3>

              {/* Page URL */}
              <div className={styles.slugContainer}>
                <span className={styles.slash}>substarter.com/</span>
                <span className={styles.slugText}>{page.slug}</span>
              </div>
            </div>

            {/* C. REAL STATS */}
            <div className={styles.statsGrid}>
              {/* Subscribers Count */}
              <div className={styles.statBox}>
                <span className={styles.statLabel}>
                  <RiUser3Line className={styles.miniIcon} /> Subs
                </span>
                <span className={styles.statValue}>
                  {page.subscribers.toLocaleString()}
                </span>
              </div>

              {/* Views Count */}
              <div className={styles.statBox}>
                <span className={styles.statLabel}>
                  <RiEyeLine className={styles.miniIcon} /> Views
                </span>
                <span className={styles.statValue}>
                  {page.views > 1000
                    ? `${(page.views / 1000).toFixed(1)}k`
                    : page.views}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
