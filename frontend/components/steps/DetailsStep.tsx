"use client";
import { useState } from "react";
import {
  RiAddLine,
  RiCloseLine,
  RiListCheck,
  RiChatQuoteLine,
  RiCheckDoubleFill,
  RiEyeLine,
  RiFileTextLine, // Icon for Terms
} from "react-icons/ri";
import styles from "./DetailsStep.module.css";

export default function DetailsStep({ formData, setFormData }: any) {
  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev: any) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature("");
  };

  return (
    <section className={styles.detailsCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.stepBadge}>3</div>
        <div className={styles.headerText}>
          <h3>Details</h3>
          <p>What do they get?</p>
        </div>
      </div>

      {/* Fields Stack */}
      <div className={styles.fieldStack}>
        {/* Features Input */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiListCheck size={18} /> What's Included
            </label>
            <span className={styles.optTag}>OPTIONAL</span>
          </div>

          <div className={styles.featureInputRow}>
            <input
              type="text"
              className={styles.stdInput}
              placeholder="e.g. Daily Market Analysis"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addFeature()}
            />
            <button
              className={styles.addFeatureBtn}
              onClick={addFeature}
              title="Add Feature"
            >
              <RiAddLine />
            </button>
          </div>

          <div className={styles.featureList}>
            {formData.features.length === 0 && (
              <div className={styles.emptyState}>
                List the benefits of your page above...
              </div>
            )}

            {formData.features.map((feat: string, idx: number) => (
              <div key={idx} className={styles.featureItem}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <RiCheckDoubleFill color="#25d366" size={18} />
                  <span>{feat}</span>
                </div>
                <button
                  className={styles.removeFeatureBtn}
                  onClick={() =>
                    setFormData((prev: any) => ({
                      ...prev,
                      features: prev.features.filter(
                        (_: any, i: number) => i !== idx,
                      ),
                    }))
                  }
                  title="Remove"
                >
                  <RiCloseLine />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Public Page Message */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiChatQuoteLine size={18} /> Welcome Message
            </label>
            <span
              className={styles.optTag}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <RiEyeLine size={12} /> PUBLIC
            </span>
          </div>
          <textarea
            className={styles.stdTextArea}
            placeholder="Write a message visible to everyone visiting your page..."
            value={formData.welcomeMessage}
            onChange={(e) =>
              setFormData({ ...formData, welcomeMessage: e.target.value })
            }
          />
        </div>

        {/* Terms & Conditions */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiFileTextLine size={18} /> Terms & Conditions
            </label>
            <span className={styles.optTag}>OPTIONAL</span>
          </div>
          <textarea
            className={styles.stdTextArea}
            placeholder="Paste your refund policy or terms here..."
            value={formData.terms || ""}
            onChange={(e) =>
              setFormData({ ...formData, terms: e.target.value })
            }
            style={{ minHeight: "100px" }}
          />
        </div>
      </div>
    </section>
  );
}
