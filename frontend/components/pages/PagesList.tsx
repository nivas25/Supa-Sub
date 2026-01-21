"use client";
import Link from "next/link";
import {
  RiAddLine,
  RiArrowRightUpLine,
  RiUser3Line,
  RiEyeLine,
} from "react-icons/ri";
import styles from "./PagesList.module.css";

// Real-world data interface
interface PageData {
  id: string;
  slug: string;
  subscribers: number;
  visits: number;
  status: "active" | "draft";
}

export default function PagesList({ pages }: { pages: PageData[] }) {
  return (
    <div className={styles.grid}>
      {/* 1. CREATE NEW CARD (Dashed Blueprint Style) */}
      <Link href="/editor/new" className={styles.createCard}>
        <div className={styles.createIconBox}>
          <RiAddLine size={32} />
        </div>
        <div className={styles.createTextStack}>
          <h3 className={styles.createTitle}>New Page</h3>
          <p className={styles.createSub}>Create a new entry point</p>
        </div>
      </Link>

      {/* 2. PAGE CARDS (Solid Studio Style) */}
      {pages.map((page) => (
        <Link
          key={page.id}
          href={`/editor/${page.id}`}
          className={styles.pageCard}
        >
          {/* A. PATTERN HEADER */}
          <div className={styles.cardHeader}>
            <div className={styles.dotPattern} />
            <div
              className={`${styles.statusBadge} ${page.status === "active" ? styles.active : styles.draft}`}
            >
              {page.status === "active" ? "LIVE" : "DRAFT"}
            </div>
            <div className={styles.externalLink}>
              <RiArrowRightUpLine />
            </div>
          </div>

          {/* B. CONTENT BODY */}
          <div className={styles.cardBody}>
            <div className={styles.slugContainer}>
              <span className={styles.slash}>/</span>
              <span className={styles.slugText}>{page.slug}</span>
            </div>

            <div className={styles.statsGrid}>
              {/* Subscribers */}
              <div className={styles.statBox}>
                <span className={styles.statLabel}>
                  <RiUser3Line className={styles.miniIcon} /> Subs
                </span>
                <span className={styles.statValue}>
                  {page.subscribers.toLocaleString()}
                </span>
              </div>

              {/* Visits */}
              <div className={styles.statBox}>
                <span className={styles.statLabel}>
                  <RiEyeLine className={styles.miniIcon} /> Views
                </span>
                <span className={styles.statValue}>
                  {page.visits > 1000
                    ? `${(page.visits / 1000).toFixed(1)}k`
                    : page.visits}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
