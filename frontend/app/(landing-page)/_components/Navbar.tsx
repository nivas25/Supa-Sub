"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import styles from "./Navbar.module.css";
import { RiFlashlightFill } from "react-icons/ri";

const NAV_ITEMS = [
  { id: "features", label: "Features" },
  { id: "steps", label: "How it Works" },
  { id: "showcase", label: "Creators" },
  { id: "pricing", label: "Pricing" },
  { id: "profitCalculator", label: "Revenue" },
  { id: "faq", label: "FAQ's" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Collapse Logic
  useEffect(() => {
    const handleCollapse = () => {
      setIsCollapsed(window.scrollY > 100);
      if (Math.abs(window.scrollY) > 500 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleCollapse);
    return () => window.removeEventListener("scroll", handleCollapse);
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${styles.navWrapper} ${
        isCollapsed ? styles.collapsedWrapper : ""
      }`}
    >
      <nav
        className={`${styles.navContainer} ${
          isCollapsed ? styles.collapsed : ""
        }`}
      >
        {/* BRAND MARK */}
        <Link
          href="/"
          className={styles.brandLogo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className={styles.wordSub}>Sub</span>
          <span className={styles.wordStarter}>Starter</span>
          <div className={styles.boltCircle}>
            <RiFlashlightFill />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className={styles.desktopLinks}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`${styles.navLink} ${
                activeSection === item.id ? styles.activeLink : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* DESKTOP AUTH */}
        <div className={styles.desktopAuth}>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button className={styles.loginBtn}>Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className={styles.dashboardLink}>
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* HAMBURGER TOGGLE */}
        <button
          className={`${styles.mobileToggle} ${isMenuOpen ? styles.open : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        {/* MOBILE MENU */}
        <div
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.menuActive : ""
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`${styles.mobileLink} ${
                activeSection === item.id ? styles.activeLink : ""
              }`}
            >
              {item.label}
            </a>
          ))}
          <hr className={styles.divider} />

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button className={styles.mobileAuthBtn}>Login / Sign Up</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard" className={styles.mobileLink}>
              Go to Dashboard
            </Link>
            <div style={{ padding: "8px 16px" }}>
              <UserButton afterSignOutUrl="/" showName />
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
