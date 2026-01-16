"use client";
import React, { CSSProperties, useEffect, useState, useRef } from "react";
import styles from "./Steps.module.css";
import {
  RiLink,
  RiAtLine,
  RiLayoutMasonryLine,
  RiRobot2Line,
  RiLineChartLine,
  RiBankCardLine,
  RiFlashlightFill,
  RiArrowRightSLine,
} from "react-icons/ri";

interface CustomStyle extends CSSProperties {
  "--index"?: number;
  "--accent"?: string;
}

const JOURNEY = [
  {
    id: "01",
    phase: "GATEWAY",
    title: "LINK YOUR ECOSYSTEM",
    desc: "Bridge your WhatsApp, Telegram, or Discord. Our engine prepares to handle your members with surgical precision.",
    benefit: "Universal platform support.",
    color: "#25D366",
    icon: <RiLink />,
  },
  {
    id: "02",
    phase: "BRANDING",
    title: "CLAIM YOUR DOMAIN",
    desc: "Secure your custom substarter.com URL. Establish instant trust with a professional storefront that screams authority.",
    benefit: "100% Brand Ownership.",
    color: "#FFD700",
    icon: <RiAtLine />,
  },
  {
    id: "03",
    phase: "CHECKOUT",
    title: "DESIGN THE FLOW",
    desc: "Launch a high-converting checkout page. Customize tiers and pricing to match your community's value.",
    benefit: "Optimized for mobile sales.",
    color: "#00D1FF",
    icon: <RiLayoutMasonryLine />,
  },
  {
    id: "04",
    phase: "AUTONOMY",
    title: "DEPLOY THE BOTS",
    desc: "Our autonomous bots take over 24/7. They handle every invite, renewal, and removal while you sleep.",
    benefit: "Hands-free management.",
    color: "#5865F2",
    icon: <RiRobot2Line />,
  },
  {
    id: "05",
    phase: "ANALYTICS",
    title: "READ THE VITAL SIGNS",
    desc: "Deep-dive into growth metrics. Track revenue, churn, and member retention through a clear, technical dashboard.",
    benefit: "Real-time growth data.",
    color: "#FF2E63",
    icon: <RiLineChartLine />,
  },
  {
    id: "06",
    phase: "SETTLEMENT",
    title: "COLLECT YOUR 95%",
    desc: "Withdraw your earnings with zero friction. We only succeed when you do, keeping the industry's best 95/5 split.",
    benefit: "Maximum creator profit.",
    color: "#FF9F1C",
    icon: <RiBankCardLine />,
  },
];

export default function Steps() {
  const [activeStep, setActiveStep] = useState("01");
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top?.target) {
          const index = stepRefs.current.findIndex((el) => el === top.target);
          if (index !== -1) {
            setActiveStep(JOURNEY[index].id);
          }
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-35% 0px -35% 0px",
      }
    );

    stepRefs.current.forEach((node) => {
      if (node) {
        observerRef.current?.observe(node);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Smooth scroll to step when clicking tracker node
  const scrollToStep = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className={styles.wrapper} id="steps">
      <div className={styles.dotPattern} />
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.stickyContent}>
            <div className={styles.statusBadge}>
              <RiFlashlightFill /> <span>PHASE-BY-PHASE BLUEPRINT</span>
            </div>
            <h2 className={styles.giantTitle}>
              THE <br /> <span className={styles.highlight}>EXPLORER.</span>
            </h2>

            <div className={styles.progressTracker}>
              {JOURNEY.map((step, i) => (
                <div
                  key={step.id}
                  onClick={() => scrollToStep(i)}
                  className={`${styles.trackerNode} ${
                    activeStep === step.id ? styles.nodeActive : ""
                  }`}
                >
                  <div
                    className={styles.nodeCircle}
                    style={{
                      borderColor: activeStep === step.id ? step.color : "#eee",
                      backgroundColor:
                        activeStep === step.id ? "#fff" : "transparent",
                    }}
                  >
                    {step.id}
                  </div>
                  <div className={styles.nodeText}>
                    <span className={styles.nodePhase}>{step.phase}</span>
                    <span className={styles.nodeTitle}>{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightSide}>
          {JOURNEY.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={styles.stepBlock}
            >
              <div
                className={styles.card}
                style={{ "--accent": step.color } as CustomStyle}
              >
                <div className={styles.cardTop}>
                  <div className={styles.numberArea}>{step.id}</div>
                  <div
                    className={styles.phaseArea}
                    style={{ background: step.color }}
                  >
                    <span className={styles.phase}>{step.phase}</span>
                    <div className={styles.iconWrapper}>{step.icon}</div>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.description}>{step.desc}</p>
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.outcomeBadge}>
                    <span className={styles.outcomeLabel}>OUTCOME</span>
                    <span className={styles.outcomeValue}>{step.benefit}</span>
                    <RiArrowRightSLine className={styles.arrowIcon} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
