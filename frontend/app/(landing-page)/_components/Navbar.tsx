"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";

export default function LandingNavbar() {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;
    const sections = ["features", "blueprint", "showcase", "pricing", "faq"];

    const runMeasurement = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      let foundSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
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
    runMeasurement(); // Initial check
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
          SubStarter<span>.</span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className={styles.desktopLinks}>
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
            href="#blueprint"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("blueprint");
            }}
            className={activeSection === "blueprint" ? styles.active : ""}
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
            FAQ
          </a>
        </div>

        <div className={styles.actions}>
          {/* These will stay styled as buttons on desktop */}
          <div className={styles.desktopButtons}>
            {isAuthed && session?.user ? (
              <>
                <span className={styles.userName}>
                  HI, {session.user.name?.split(" ")[0]?.toUpperCase()}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={styles.loginBtn}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className={styles.loginBtn}
                >
                  Login
                </button>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className={styles.cta}
                >
                  Start Selling
                </button>
              </>
            )}
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
          href="#blueprint"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("blueprint");
          }}
          className={activeSection === "blueprint" ? styles.active : ""}
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
          FAQ
        </a>
        <hr className={styles.divider} />
        {isAuthed && session?.user ? (
          <>
            <span className={styles.userName}>
              HI, {session.user.name?.split(" ")[0]?.toUpperCase()}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className={styles.mobileLogin}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className={styles.mobileLogin}
            >
              Login
            </button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className={styles.mobileCta}
            >
              Start Selling
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
