"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import styles from "./Navbar.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      className={styles.themeBtn}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <RiMoonClearLine /> : <RiSunLine />}
    </button>
  );
}
