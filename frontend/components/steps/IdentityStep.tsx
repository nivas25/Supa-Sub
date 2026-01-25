"use client";

import { useState } from "react";
import {
  RiLinksLine,
  RiTwitterXFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiGlobalLine,
  RiCloseFill,
  RiEarthLine,
  RiUser3Line,
  RiFileTextLine,
  RiLoader5Line,
  RiCheckFill,
  RiErrorWarningFill,
  RiFacebookCircleFill,
} from "react-icons/ri";
import styles from "./IdentityStep.module.css";

interface SocialLink {
  platform: string;
  url: string;
}

interface IdentityStepProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
  supabase: any;
}

export default function IdentityStep({
  formData,
  setFormData,
  errors,
  setErrors,
  supabase,
}: IdentityStepProps) {
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState<boolean | null>(null);

  const checkUrlAvailability = async (slug: string) => {
    if (slug.length < 3) {
      setUrlAvailable(null);
      return;
    }
    setIsCheckingUrl(true);
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      setUrlAvailable(data === null);
    } catch (err) {
      console.error("URL check error:", err);
      setUrlAvailable(null);
    } finally {
      setIsCheckingUrl(false);
    }
  };

  const addSocial = (platform: string) => {
    if (formData.socialLinks.some((s: SocialLink) => s.platform === platform))
      return;
    setFormData((prev: any) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform, url: "" }],
    }));
  };

  const removeSocial = (index: number) => {
    const newLinks = formData.socialLinks.filter(
      (_: any, i: number) => i !== index,
    );
    setFormData({ ...formData, socialLinks: newLinks });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <RiTwitterXFill />;
      case "instagram":
        return <RiInstagramLine />;
      case "youtube":
        return <RiYoutubeFill />;
      case "facebook":
        return <RiFacebookCircleFill />;
      default:
        return <RiGlobalLine />;
    }
  };

  // --- CLEANED UP OPTIONS ---
  const socialOptions = [
    { id: "instagram", icon: <RiInstagramLine /> },
    { id: "twitter", icon: <RiTwitterXFill /> },
    { id: "youtube", icon: <RiYoutubeFill /> },
    { id: "facebook", icon: <RiFacebookCircleFill /> },
    { id: "website", icon: <RiGlobalLine /> },
  ];

  return (
    <section
      className={`${styles.identityCard} ${
        errors.handle || errors.pageTitle ? styles.errorBorder : ""
      }`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.stepBadge}>1</div>
        <div className={styles.headerText}>
          <h3>Identity</h3>
          <p>Claim your corner of the internet.</p>
        </div>
      </div>

      <div className={styles.fieldStack}>
        {/* Page URL */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiEarthLine className={styles.labelIcon} /> Page URL
            </label>
            <span className={styles.reqTag}>REQUIRED</span>
          </div>
          <div
            className={`${styles.urlInputGroup} ${urlAvailable === false ? styles.errorInput : ""}`}
          >
            <span className={styles.urlPrefix}>substarter.com/</span>
            <input
              type="text"
              className={styles.transparentInput}
              placeholder="username"
              value={formData.handle}
              autoComplete="off"
              onChange={(e) => {
                const val = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, "");
                setFormData({ ...formData, handle: val });
                if (errors.handle) setErrors({ ...errors, handle: "" });
                checkUrlAvailability(val);
              }}
            />
            <div className={styles.availabilityIndicator}>
              {isCheckingUrl && (
                <RiLoader5Line className={styles.spin} size={20} />
              )}
              {!isCheckingUrl && urlAvailable === true && (
                <RiCheckFill color="#10b981" size={24} />
              )}
              {!isCheckingUrl && urlAvailable === false && (
                <RiErrorWarningFill color="#ef4444" size={24} />
              )}
            </div>
          </div>
          {urlAvailable === false && (
            <span className={styles.errorText}>
              This handle is already taken.
            </span>
          )}
        </div>

        {/* Page Name */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiUser3Line className={styles.labelIcon} /> Page Name
            </label>
            <span className={styles.reqTag}>REQUIRED</span>
          </div>
          <input
            className={styles.stdInput}
            placeholder="e.g. The Design Vault"
            value={formData.pageTitle}
            onChange={(e) => {
              setFormData({ ...formData, pageTitle: e.target.value });
              if (errors.pageTitle) setErrors({ ...errors, pageTitle: "" });
            }}
          />
        </div>

        {/* Bio */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiFileTextLine className={styles.labelIcon} /> Bio
            </label>
            <div className={styles.charCount}>
              {(formData.description || "").length}/150
            </div>
          </div>
          <textarea
            className={styles.stdTextArea}
            placeholder="Briefly describe what members get..."
            rows={3}
            maxLength={150}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Social Links */}
        <div className={styles.inputWrapper}>
          <div className={styles.labelRow}>
            <label>
              <RiLinksLine className={styles.labelIcon} /> Social Profiles
            </label>
            <span className={styles.charCount}>Add your links</span>
          </div>
          <div className={styles.socialBlueprintContainer}>
            <div className={styles.socialPickerRow}>
              {socialOptions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => addSocial(s.id)}
                  className={styles.socialIconBtn}
                  disabled={formData.socialLinks.some(
                    (l: SocialLink) => l.platform === s.id,
                  )}
                >
                  {s.icon}
                </button>
              ))}
            </div>
            <div className={styles.socialActiveList}>
              {formData.socialLinks.length === 0 && (
                <div className={styles.emptyState}>
                  Select an icon above to add.
                </div>
              )}
              {formData.socialLinks.map((link: SocialLink, idx: number) => (
                <div key={idx} className={styles.socialInputRow}>
                  <div className={styles.platformBadge}>
                    {getSocialIcon(link.platform)}
                  </div>
                  <input
                    className={styles.socialUrlField}
                    placeholder={`Paste ${link.platform} URL...`}
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...formData.socialLinks];
                      newLinks[idx].url = e.target.value;
                      setFormData({ ...formData, socialLinks: newLinks });
                    }}
                  />
                  <button
                    type="button"
                    className={styles.deleteLinkBtn}
                    onClick={() => removeSocial(idx)}
                  >
                    <RiCloseFill />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
