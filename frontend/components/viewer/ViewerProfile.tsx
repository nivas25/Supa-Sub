"use client";
import { useState } from "react";
import {
  RiUser3Line,
  RiEditBoxLine,
  RiGlobalLine,
  RiMailLine,
  RiShieldStarLine,
  RiCameraLensLine,
  RiSave3Line,
  RiCloseLine,
} from "react-icons/ri";
import styles from "./ViewerProfile.module.css";

export default function ViewerProfile() {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Reader",
    email: "alex.viewer@example.com",
    timezone: "America - New York",
    role: "Viewer", // Fixed role for this view
    joinDate: "Feb 2024",
  });

  const toggleMode = () => {
    setMode(mode === "view" ? "edit" : "view");
  };

  return (
    <div className={styles.container}>
      {/* --- PAGE HEADER --- */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}>
            <RiUser3Line className={styles.headerIcon} />
          </div>
          <div className={styles.textStack}>
            <h1 className={styles.pageTitle}>
              My Profile<span className={styles.accentDot}>.</span>
            </h1>
            <p className={styles.subLabel}>
              {mode === "view" ? "Personal Details" : "Update Information"}
            </p>
          </div>
        </div>

        <button
          className={mode === "view" ? styles.editBtn : styles.cancelBtn}
          onClick={toggleMode}
        >
          {mode === "view" ? (
            <>
              Edit <RiEditBoxLine />
            </>
          ) : (
            <>
              Cancel <RiCloseLine />
            </>
          )}
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className={styles.cardContainer}>
        {/* VIEW MODE */}
        {mode === "view" && (
          <div className={`${styles.viewCard} ${styles.fadeUp}`}>
            <div className={styles.cardBody}>
              {/* LEFT: AVATAR */}
              <div className={styles.avatarSection}>
                <div className={styles.avatarCircle}>
                  <RiUser3Line size={56} />
                </div>
                <div className={styles.roleBadge}>
                  <RiShieldStarLine /> {formData.role}
                </div>
              </div>

              {/* RIGHT: INFO */}
              <div className={styles.infoSection}>
                <h2 className={styles.fullName}>
                  {formData.firstName}{" "}
                  <span className={styles.lastName}>{formData.lastName}</span>
                </h2>
                <p className={styles.joinLabel}>Joined {formData.joinDate}</p>

                <div className={styles.divider}></div>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.labelTiny}>EMAIL</span>
                    <span className={styles.valueStrong}>
                      <RiMailLine className={styles.fieldIcon} />{" "}
                      {formData.email}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.labelTiny}>TIMEZONE</span>
                    <span className={styles.valueStrong}>
                      <RiGlobalLine className={styles.fieldIcon} />{" "}
                      {formData.timezone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && (
          <div className={`${styles.editForm} ${styles.fadeUp}`}>
            <div className={styles.formHeader}>
              <h3>Edit Details</h3>
            </div>

            <div className={styles.formBody}>
              {/* Photo Upload */}
              <div className={styles.uploadRow}>
                <div className={styles.miniAvatar}>
                  <RiUser3Line />
                </div>
                <div className={styles.uploadActions}>
                  <span className={styles.uploadLabel}>Profile Photo</span>
                  <button className={styles.uploadBtn}>
                    <RiCameraLensLine /> Change Photo
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <div className={styles.inputGrid}>
                <div className={styles.fieldGroup}>
                  <label>First Name</label>
                  <input
                    className={styles.input}
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label>Last Name</label>
                  <input
                    className={styles.input}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>

                <div className={styles.fieldGroupFull}>
                  <label>Email Address</label>
                  <input
                    className={styles.lockedInput}
                    value={formData.email}
                    readOnly
                  />
                  <span className={styles.hint}>
                    Contact support to change email.
                  </span>
                </div>

                <div className={styles.fieldGroupFull}>
                  <label>Timezone</label>
                  <select
                    className={styles.select}
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                  >
                    <option>Asia - Calcutta</option>
                    <option>America - New York</option>
                    <option>Europe - London</option>
                    <option>Australia - Sydney</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formFooter}>
              <button className={styles.saveBtn} onClick={toggleMode}>
                Save Changes <RiSave3Line />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
