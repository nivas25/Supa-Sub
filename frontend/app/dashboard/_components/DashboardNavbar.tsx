"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "@/app/auth/actions";
import { RiLogoutBoxLine } from "react-icons/ri";
import styles from "./DashboardNavbar.module.css";

export default function DashboardNavbar() {
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

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
          {!isLoading && user && (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <button
                onClick={handleLogout}
                className={styles.logoutBtn}
                title="Sign out"
              >
                <RiLogoutBoxLine size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
