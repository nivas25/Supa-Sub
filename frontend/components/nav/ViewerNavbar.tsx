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
  RiFileList3Line,
} from "react-icons/ri";
import styles from "./ViewerNavbar.module.css";

interface ViewerNavbarProps {
  displayName?: string | null;
  avatarUrl?: string | null;
}

export default function ViewerNavbar({
  displayName,
  avatarUrl,
}: ViewerNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
  };

  const toggleMode = (target: "creator" | "viewer") => {
    if (target === "creator") {
      router.push("/pages");
    } else {
      router.push("/viewer/subscriptions"); // Default to Subscriptions now
    }
    setIsMenuOpen(false);
  };

  // Removed "Feed". Subscriptions is now the main view.
  const viewerLinks = [
    {
      name: "Subscriptions",
      href: "/viewer/subscriptions",
      icon: <RiFileList3Line />,
    },
    { name: "Profile", href: "/viewer/profile", icon: <RiUser3Line /> },
  ];

  return (
    <>
      <nav className={styles.navWrapper}>
        <div className={styles.navMain}>
          {/* BRAND */}
          <div className={styles.brandSection}>
            <Link href="/viewer/subscriptions" className={styles.brandLogo}>
              <span className={styles.wordSub}>Sub</span>
              <span className={styles.wordStarter}>Starter</span>
              <div className={styles.boltCircle}>
                <RiFlashlightFill size={18} />
              </div>
            </Link>

            {/* Desktop Links */}
            <div className={styles.desktopNav}>
              {viewerLinks.map((link) => (
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

          {/* ACTIONS */}
          <div className={styles.navActions}>
            <div className={styles.modeSwitcher}>
              <button
                onClick={() => toggleMode("creator")}
                className={styles.modeBtn}
              >
                Creator
              </button>
              <button className={`${styles.modeBtn} ${styles.modeBtnViewer}`}>
                Viewer
              </button>
            </div>

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
              Viewer Account
            </span>
          </div>
        </div>

        <nav className={styles.mobileNavList}>
          {viewerLinks.map((link) => (
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
          <div className={styles.mobileSwitcherBtns}>
            <button
              className={styles.mSwitchBtn}
              onClick={() => toggleMode("creator")}
            >
              Creator
            </button>
            <button
              className={`${styles.mSwitchBtn} ${styles.mSwitchBtnViewer}`}
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
