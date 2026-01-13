"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import styles from "./DashboardNavbar.module.css";

export default function DashboardNavbar() {
  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navMain}>
        <Link href="/" className={styles.logo}>
          SubStarter<span>.</span>
        </Link>

        {/* Dashboard Nav Links */}
        <div className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/dashboard/content" className={styles.navLink}>
            Content
          </Link>
          <Link href="/dashboard/earnings" className={styles.navLink}>
            Earnings
          </Link>
          <Link href="/dashboard/settings" className={styles.navLink}>
            Settings
          </Link>
        </div>

        <div className={styles.actions}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
