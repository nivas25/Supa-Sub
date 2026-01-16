"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import styles from "./Navbar.module.css";

const SECTION_IDS = ["features", "steps", "showcase", "pricing", "faq"];

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    let ticking = false;
    const runMeasurement = () => {
      const scrollPosition = window.scrollY + 120; // offset for detection
      let foundSection = "";

      // Check each section from top to bottom
      for (const section of SECTION_IDS) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // Check if scrollPosition is within this section
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            foundSection = section;
            break;
          }
        }
      }
      setActiveSection((prev) => (prev === foundSection ? prev : foundSection));
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(runMeasurement);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    runMeasurement(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Collapse navbar when scrolled past threshold (rAF throttled)
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const shouldCollapse = window.scrollY > 200;
        setIsCollapsed((prev) =>
          prev === shouldCollapse ? prev : shouldCollapse
        );

        // Close menu when scrolling back to top
        if (!shouldCollapse) {
          setIsMenuOpen(false);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape, when resizing to desktop, and when clicking outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      setIsMenuOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const nav = document.querySelector("[aria-label='Primary']");

      // Close menu if click is outside navbar (works for both mobile and desktop)
      if (nav && !nav.contains(target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClickOutside, true); // Use capture phase

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClickOutside, true);
    };
  }, [isMenuOpen]);

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
    <nav
      className={`${styles.navWrapper} ${
        isCollapsed ? styles.collapsedWrapper : ""
      }`}
      aria-label="Primary"
    >
      <div
        className={`${styles.navMain} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <Link href="/" className={styles.logo}>
          SubStarter<span>.</span>
        </Link>

        {/* Desktop Links */}
        <div
          className={styles.desktopLinks}
          role="navigation"
          aria-label="Section links"
        >
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
            href="#steps"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("steps");
            }}
            className={activeSection === "steps" ? styles.active : ""}
          >
            Steps
          </a>
          <a
            href="#showcase"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("showcase");
            }}
            className={activeSection === "showcase" ? styles.active : ""}
          >
            Showcase
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
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("faq");
            }}
            className={activeSection === "faq" ? styles.active : ""}
          >
            FAQ's
          </a>
        </div>

        <div className={styles.actions}>
          <div className={styles.desktopButtons}>
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className={styles.cta}>Login</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className={styles.dashboardLink}>
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div
              className={`${styles.bar} ${
                isMenuOpen ? styles.openBar1 : styles.bar1
              }`}
            />
            <div
              className={`${styles.bar} ${
                isMenuOpen ? styles.openBar2 : styles.bar2
              }`}
            />
            <div
              className={`${styles.bar} ${
                isMenuOpen ? styles.openBar3 : styles.bar3
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.menuActive : ""
        }`}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("features");
          }}
          className={activeSection === "features" ? styles.active : ""}
          role="menuitem"
        >
          Features
        </a>
        <a
          href="#blueprint"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("blueprint");
          }}
          className={activeSection === "blueprint" ? styles.active : ""}
          role="menuitem"
        >
          Blueprint
        </a>
        <a
          href="#showcase"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("showcase");
          }}
          className={activeSection === "showcase" ? styles.active : ""}
          role="menuitem"
        >
          Showcase
        </a>
        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("pricing");
          }}
          className={activeSection === "pricing" ? styles.active : ""}
          role="menuitem"
        >
          Pricing
        </a>
        <a
          href="#faq"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("faq");
          }}
          className={activeSection === "faq" ? styles.active : ""}
          role="menuitem"
        >
          FAQ
        </a>

        <hr className={styles.divider} />

        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <button className={styles.mobileCta}>Login</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard" className={styles.mobileDashboard}>
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
