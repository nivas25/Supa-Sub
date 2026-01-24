"use client";
import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "@/app/auth/actions";
import {
  RiUser3Line,
  RiEditBoxLine,
  RiGlobalLine,
  RiMailLine,
  RiShieldStarLine,
  RiCameraLensLine,
  RiSave3Line,
  RiCloseLine,
  RiLoader4Fill,
} from "react-icons/ri";
import styles from "./Profile.module.css";

export default function Profile() {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Default State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    timezone: "Asia - Calcutta", // We can default this or add a column in DB
    avatarUrl: "",
    role: "Member",
    joinDate: "",
  });

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    async function loadData() {
      const data = await getProfile();
      if (data) {
        setFormData((prev) => ({
          ...prev,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          avatarUrl: data.avatar_url || "",
          joinDate: new Date(data.created_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
        }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // 2. SAVE DATA TO DB
    await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    setSaving(false);
    setMode("view");
  };

  if (loading)
    return <div className={styles.container}>Loading profile...</div>;

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
          onClick={() => setMode(mode === "view" ? "edit" : "view")}
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
              <div className={styles.avatarSection}>
                <div className={styles.avatarCircle}>
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <RiUser3Line size={56} />
                  )}
                </div>
                <div className={styles.roleBadge}>
                  <RiShieldStarLine /> {formData.role}
                </div>
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.fullName}>
                  {formData.firstName}{" "}
                  <span className={styles.lastName}>{formData.lastName}</span>
                </h2>
                <p className={styles.joinLabel}>
                  Member since {formData.joinDate}
                </p>

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
              </div>
            </div>

            <div className={styles.formFooter}>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <RiLoader4Fill className="animate-spin" />
                ) : (
                  <>
                    <RiSave3Line /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
