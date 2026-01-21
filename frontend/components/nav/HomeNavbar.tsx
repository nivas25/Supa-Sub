"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import {
  RiLogoutBoxRLine,
  RiFlashlightFill,
  RiMenu3Line,
  RiCloseLine,
  RiUser3Line,
  RiPagesLine,
  RiMoneyDollarCircleLine,
  RiCoupon2Line,
  RiCompass3Line,
  RiShoppingBag3Line,
} from "react-icons/ri";
import styles from "./HomeNavbar.module.css";

interface HomeNavbarProps {
  currentMode: "creator" | "subscriber"; // "subscriber" maps to Viewer
  displayName?: string | null;
  avatarUrl?: string | null;
}

export default function HomeNavbar({
  currentMode,
  displayName,
  avatarUrl,
}: HomeNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
  };

  // --- TOGGLE LOGIC ---
  const toggleMode = (target: "creator" | "viewer") => {
    if (target === "creator") {
      router.push("/pages"); // Go to Creator Dashboard
    } else {
      router.push("/viewer"); // Go to Viewer Feed
    }
    setIsMenuOpen(false);
  };

  // --- NAVIGATION LINKS ---
  const creatorLinks = [
    { name: "Pages", href: "/pages", icon: <RiPagesLine /> },
    { name: "Payouts", href: "/payouts", icon: <RiMoneyDollarCircleLine /> },
    { name: "Coupons", href: "/coupons", icon: <RiCoupon2Line /> },
    { name: "Profile", href: "/profile", icon: <RiUser3Line /> },
  ];

  const viewerLinks = [
    { name: "Feed", href: "/viewer", icon: <RiCompass3Line /> },
    {
      name: "Subscriptions",
      href: "/viewer/subscriptions",
      icon: <RiCompass3Line />,
    },
    // Viewer profile can be different, or same
    { name: "Profile", href: "/viewer/profile", icon: <RiUser3Line /> },
  ];

  // Choose links based on current mode
  const currentLinks = currentMode === "creator" ? creatorLinks : viewerLinks;

  return (
    <>
      <nav className={styles.navWrapper}>
        <div className={styles.navMain}>
          {/* LEFT: BRAND */}
          <div className={styles.brandSection}>
            <Link
              href={currentMode === "creator" ? "/pages" : "/viewer"}
              className={styles.brandLogo}
            >
              <span className={styles.wordSub}>Sub</span>
              <span className={styles.wordStarter}>Starter</span>
              <div className={styles.boltCircle}>
                <RiFlashlightFill size={18} />
              </div>
            </Link>

            {/* Desktop Links (Dynamic) */}
            <div className={styles.desktopNav}>
              {currentLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.activeLink : ""
                  }`}
                >
                  <span className={styles.linkIcon}>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className={styles.navActions}>
            {/* Neomorphic Desktop Switcher */}
            <div className={styles.modeSwitcher}>
              <button
                onClick={() => toggleMode("creator")}
                className={`${styles.modeBtn} ${
                  currentMode === "creator" ? styles.modeBtnActive : ""
                }`}
              >
                Creator
              </button>
              <button
                onClick={() => toggleMode("viewer")}
                className={`${styles.modeBtn} ${
                  currentMode === "subscriber" ? styles.modeBtnActive : ""
                }`}
              >
                Viewer
              </button>
            </div>

            {/* Profile */}
            <div className={styles.profileWrapper}>
              <div className={styles.profileCircle}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <RiUser3Line />
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className={styles.logoutBtn}
                title="Logout"
              >
                <RiLogoutBoxRLine size={18} />
              </button>

              <button
                className={styles.hamburger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <RiCloseLine size={24} />
                ) : (
                  <RiMenu3Line size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.menuOpen : ""}`}
      >
        <div className={styles.mobileUserCard}>
          <div className={styles.profileCircle}>
            {avatarUrl ? (
              <img src={avatarUrl} className={styles.avatar} />
            ) : (
              <RiUser3Line />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 800 }}>{displayName || "User"}</span>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>
              {currentMode === "creator" ? "Creator Account" : "Viewer Account"}
            </span>
          </div>
        </div>

        <nav className={styles.mobileNavList}>
          {currentLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileSwitcherContainer}>
          <span className={styles.mobileSwitchLabel}>Switch Perspective</span>

          {/* Neomorphic Mobile Switcher */}
          <div className={styles.mobileSwitcherBtns}>
            <button
              className={`${styles.mSwitchBtn} ${currentMode === "creator" ? styles.mSwitchBtnActive : ""}`}
              onClick={() => toggleMode("creator")}
            >
              Creator
            </button>
            <button
              className={`${styles.mSwitchBtn} ${currentMode === "subscriber" ? styles.mSwitchBtnActive : ""}`}
              onClick={() => toggleMode("viewer")}
            >
              Viewer
            </button>
          </div>

          <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
            Sign Out
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
