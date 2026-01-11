"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import ThemeToggle from "./ThemeToggle";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["marketplace", "features", "vault", "pricing"];
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navMain}>
        <Link href="/" className={styles.logo}>
          SUPASUB<span>.</span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className={styles.desktopLinks}>
          <a
            href="#marketplace"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("marketplace");
            }}
            className={activeSection === "marketplace" ? styles.active : ""}
          >
            Marketplace
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("features");
            }}
            className={activeSection === "features" ? styles.active : ""}
          >
            Features
          </a>
          <a
            href="#vault"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("vault");
            }}
            className={activeSection === "vault" ? styles.active : ""}
          >
            The Vault
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("pricing");
            }}
            className={activeSection === "pricing" ? styles.active : ""}
          >
            Pricing
          </a>
        </div>

        <div className={styles.actions}>
          <ThemeToggle />
          {/* These will stay styled as buttons on desktop */}
          <div className={styles.desktopButtons}>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/signup" className={styles.cta}>
              Start Selling
            </Link>
          </div>

          <button
            className={styles.mobileToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ""}`}
            ></div>
            <div
              className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ""}`}
            ></div>
            <div
              className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ""}`}
            ></div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.menuActive : ""
        }`}
      >
        <a
          href="#marketplace"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("marketplace");
          }}
          className={activeSection === "marketplace" ? styles.active : ""}
        >
          Marketplace
        </a>
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("features");
          }}
          className={activeSection === "features" ? styles.active : ""}
        >
          Features
        </a>
        <a
          href="#vault"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("vault");
          }}
          className={activeSection === "vault" ? styles.active : ""}
        >
          The Vault
        </a>
        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("pricing");
          }}
          className={activeSection === "pricing" ? styles.active : ""}
        >
          Pricing
        </a>
        <hr className={styles.divider} />
        <Link href="/login" className={styles.mobileLogin}>
          Login
        </Link>
        <Link href="/signup" className={styles.mobileCta}>
          Start Selling
        </Link>
      </div>
    </nav>
  );
}
