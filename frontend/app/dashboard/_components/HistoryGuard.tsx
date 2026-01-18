"use client";
import { useEffect } from "react";

export default function HistoryGuard() {
  useEffect(() => {
    // This replaces the "Google/Callback" entry in your history with the Landing Page
    // So hitting 'Back' from the Dashboard skips the login process entirely
    const handlePopState = () => {
      window.location.href = "/";
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return null;
}
