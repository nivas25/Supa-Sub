"use client";
import {
  RiSearchLine,
  RiFilter3Line,
  RiArrowDownSLine,
  RiSortDesc,
  RiLayoutGridFill,
} from "react-icons/ri";
import styles from "./PagesHeader.module.css";

interface PagesHeaderProps {
  count: number;
}

export default function PagesHeader({ count }: PagesHeaderProps) {
  return (
    <header className={styles.headerWrapper}>
      {/* --- TOP SECTION: TITLE & BRANDING --- */}
      <div className={styles.titleRow}>
        <div className={styles.leftGroup}>
          {/* Studio Icon */}
          <div className={styles.studioIconBox}>
            <RiLayoutGridFill className={styles.studioIcon} />
          </div>

          {/* Text Stack */}
          <div className={styles.textStack}>
            <h1 className={styles.pageTitle}>
              Pages<span className={styles.accentDot}>.</span>
            </h1>
            <p className={styles.subLabel}>Manage your digital entry points</p>
          </div>
        </div>

        {/* Counter Chip */}
        <div className={styles.counterChip}>
          <div className={styles.pulseDot}></div>
          <span>
            {count} {count === 1 ? "Active" : "Active Pages"}
          </span>
        </div>
      </div>

      {/* --- BOTTOM SECTION: CONTROLS & ACTIONS --- */}
      <div className={styles.controlsRow}>
        {/* Search Input (RENAMED TO FIX CONFLICTS) */}
        <div className={styles.searchBlock}>
          <RiSearchLine className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search pages..."
            className={styles.searchField}
          />
        </div>

        {/* Action Buttons Grid */}
        <div className={styles.actionsGroup}>
          {/* SORT BUTTON */}
          <div
            className={styles.tooltipWrapper}
            data-tooltip="Change sort criteria"
          >
            <button className={styles.sortBtn}>
              <div
                style={{ display: "flex", gap: "6px", alignItems: "center" }}
              >
                <span className={styles.btnLabel}>Sort:</span>
                <span className={styles.btnValue}>Subscribers</span>
              </div>
              <RiArrowDownSLine className={styles.chevron} />
            </button>
          </div>

          {/* ORDER TOGGLE */}
          <div className={styles.tooltipWrapper} data-tooltip="Toggle Order">
            <button className={styles.iconBtn} aria-label="Toggle Order">
              <RiSortDesc />
            </button>
          </div>

          {/* FILTER BUTTON */}
          <div
            className={styles.tooltipWrapper}
            data-tooltip="Advanced Filters"
          >
            <button className={styles.filterBtn}>
              <RiFilter3Line size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
