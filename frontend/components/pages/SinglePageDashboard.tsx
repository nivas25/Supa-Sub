"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  RiPencilLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiCheckLine,
  RiMoneyDollarCircleLine,
  RiUser3Line,
  RiEyeLine,
  RiPieChartLine,
  RiArrowRightSLine,
  RiBarChartGroupedFill,
} from "react-icons/ri";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styles from "./SinglePageDashboard.module.css";

interface PageStats {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
  revenue: number;
  subscribers: number;
  views: number;
  retention: number;
  history: {
    day: string;
    subscribers: number;
    revenue: number;
    views?: number;
  }[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
  labelOverride,
}: any) => {
  const displayLabel = labelOverride ?? label;
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px 12px",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.2)",
          border: "2px solid #fff",
          zIndex: 100,
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "#cbd5e1",
            fontWeight: 700,
            marginBottom: 2,
            textTransform: "uppercase",
          }}
        >
          {displayLabel}
        </p>
        <p style={{ fontSize: "1.1rem", fontWeight: 900 }}>
          {prefix}
          {payload[0].value.toLocaleString()}
          {suffix}
        </p>
      </div>
    );
  }
  return null;
};

export default function SinglePageDashboard({ stats }: { stats: PageStats }) {
  const [activeStory, setActiveStory] = useState(0);
  const [copied, setCopied] = useState(false);

  // --- 1. DATA GENERATION ---

  // A. Revenue (Real History)
  const revenueData = stats.history.map((h) => ({
    day: h.day,
    value: h.revenue,
  }));

  // B. Members (Real History)
  const subscriberData = stats.history.map((h) => ({
    day: h.day,
    value: h.subscribers,
  }));

  // C. Views (Real History Only)
  const viewsData = useMemo(() => {
    if (stats.history.length) {
      return stats.history.map((h) => ({
        day: h.day,
        value: typeof h.views === "number" ? h.views : stats.views,
      }));
    }
    return [{ day: "Day 1", value: stats.views }];
  }, [stats.history, stats.views]);

  // D. Retention (Static)
  const retentionData = [
    { name: "Retained", value: stats.retention },
    { name: "Churned", value: 100 - stats.retention },
  ];

  // Memoize stories
  const stories = useMemo(
    () => [
      {
        id: 0,
        label: "REVENUE",
        value: `$${stats.revenue.toLocaleString()}`,
        sub: "Total Earnings",
        icon: <RiMoneyDollarCircleLine />,
        color: "#00E0FF",
      },
      {
        id: 1,
        label: "MEMBERS",
        value: stats.subscribers.toLocaleString(),
        sub: "Active Subscribers",
        icon: <RiUser3Line />,
        color: "#FF90E8",
      },
      {
        id: 2,
        label: "VIEWS",
        value: stats.views.toLocaleString(),
        sub: "Total Page Views",
        icon: <RiEyeLine />,
        color: "#FFEB3B",
      },
      {
        id: 3,
        label: "RETENTION",
        value: `${stats.retention}%`,
        sub: "Member Loyalty",
        icon: <RiPieChartLine />,
        color: "#25D366",
      },
    ],
    [stats.revenue, stats.subscribers, stats.views, stats.retention],
  );

  useEffect(() => {
    const timer = setInterval(
      () => setActiveStory((prev) => (prev + 1) % 4),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  const currentStory = stories[activeStory];

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://substarter.com/${stats.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for X-Axis (Show every 5th date)
  const formatXAxis = (tickItem: string, index: number) => {
    return index % 5 === 0 ? tickItem : "";
  };

  // Helper for Y-Axis (FULL NUMBERS, NO 'k')
  const formatYAxis = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link
            href="/pages"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Pages
          </Link>
          <RiArrowRightSLine /> <span>{stats.name}</span>
        </div>

        <div className={styles.topRow}>
          <div className={styles.identityBlock}>
            <div className={styles.pageIconBox}>
              {stats.iconUrl ? (
                <img src={stats.iconUrl} className={styles.pageIcon} />
              ) : (
                <div style={{ background: "#000", height: "100%" }} />
              )}
            </div>
            {/* Slug text removed from here as requested */}
            <h1 className={styles.pageName}>{stats.name}</h1>
          </div>

          <div className={styles.actions}>
            <Link
              href={`/${stats.slug}`}
              target="_blank"
              className={`${styles.actionBtn} ${styles.visitBtn}`}
            >
              <RiExternalLinkLine /> Visit Page
            </Link>
            <Link
              href={`/editor/${stats.id}`}
              className={`${styles.actionBtn} ${styles.editBtn}`}
            >
              <RiPencilLine /> Edit
            </Link>
          </div>
        </div>

        <div className={styles.urlBar}>
          <span className={styles.urlText}>
            https://substarter.com/{stats.slug}
          </span>
          <button onClick={handleCopy} className={styles.copyBtn}>
            {copied ? (
              <>
                <RiCheckLine color="#0f172a" /> Copied
              </>
            ) : (
              <>
                <RiFileCopyLine /> Copy Link
              </>
            )}
          </button>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className={styles.dashboardGrid}>
        {/* LEFT: CHARTS & STATS */}
        <div className={styles.mainContent}>
          {/* 1. TOP STATS CARDS */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div>
                <div className={styles.statLabel}>Total Revenue</div>
                <div className={styles.statValue}>
                  ${stats.revenue.toLocaleString()}
                </div>
              </div>
              <div className={`${styles.statIcon} ${styles.iconRevenue}`}>
                <RiMoneyDollarCircleLine />
              </div>
            </div>
            <div className={styles.statCard}>
              <div>
                <div className={styles.statLabel}>Active Members</div>
                <div className={styles.statValue}>
                  {stats.subscribers.toLocaleString()}
                </div>
              </div>
              <div className={`${styles.statIcon} ${styles.iconMembers}`}>
                <RiUser3Line />
              </div>
            </div>
          </div>

          {/* 2. CHARTS GRID */}
          <div className={styles.chartsSection}>
            <div className={styles.chartsSectionTitle}>
              <RiBarChartGroupedFill /> Performance Trends
            </div>

            <div className={styles.chartsGrid}>
              {/* A. REVENUE (Blue Gradient Area) */}
              <div className={`${styles.chartCard} ${styles.fullWidthChart}`}>
                <div className={styles.chartHeader}>
                  <div className={styles.chartTitle}>Revenue Growth</div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0ea5e9"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }}
                      tickFormatter={formatXAxis}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }}
                      tickFormatter={formatYAxis}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip prefix="$" />}
                      cursor={{ stroke: "#0ea5e9", strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0ea5e9"
                      strokeWidth={4}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* B. MEMBERS (Pink Line) */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <div className={styles.chartTitle}>Subscriber Count</div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={subscriberData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis dataKey="day" hide />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      tickFormatter={formatYAxis}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ stroke: "#d946ef", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#d946ef"
                      strokeWidth={4}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* C. PAGE VIEWS (Yellow Area Chart - Fake Data) */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <div className={styles.chartTitle}>Total Views</div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={viewsData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorView"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#eab308"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#eab308"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis dataKey="day" hide />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      tickFormatter={formatYAxis}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip labelOverride="Total Views" />}
                      cursor={{ stroke: "#eab308", strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#eab308"
                      strokeWidth={4}
                      fill="url(#colorView)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* D. RETENTION (Green Bar) */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <div className={styles.chartTitle}>Retention</div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={retentionData}
                    layout="vertical"
                    barSize={32}
                    margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={70}
                      tick={{ fontSize: 11, fontWeight: 700, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip suffix="%" />}
                      cursor={{ fill: "transparent" }}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {retentionData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#22c55e" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: STORY VISUAL */}
        <div className={styles.sidebar}>
          <div className={styles.phoneFrame}>
            <div className={styles.storyCard}>
              <div
                className={styles.storyIconBox}
                style={{ color: currentStory.color }}
              >
                {currentStory.icon}
              </div>

              <div
                className={styles.storyLabel}
                style={{ color: currentStory.color }}
              >
                {currentStory.label}
              </div>
              <div className={styles.storyValue}>{currentStory.value}</div>

              <div className={styles.storyPill}>{currentStory.sub}</div>
            </div>
          </div>
          <div className={styles.storyControls}>
            {stories.map((s, i) => (
              <button
                key={i}
                className={`${styles.controlBtn} ${activeStory === i ? styles.activeControl : ""}`}
                onClick={() => setActiveStory(i)}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
