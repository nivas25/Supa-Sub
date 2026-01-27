"use client";
import { useState, useRef, useEffect } from "react";
import {
  RiCameraFill,
  RiImageAddFill,
  RiPaletteLine,
  RiPencilFill,
  RiLoader4Line,
  RiFontSize,
  RiShapeLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import styles from "./BrandingStep.module.css";

const THEME_COLORS = [
  { name: "Midnight", hex: "#000000" },
  { name: "Ocean", hex: "#2563eb" },
  { name: "Emerald", hex: "#059669" },
  { name: "Berry", hex: "#db2777" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Sunny", hex: "#facc15" },
];

const FONT_OPTIONS = [
  {
    id: "outfit",
    label: "Outfit",
    font: "'Outfit', sans-serif",
    category: "Modern",
  },
  {
    id: "space",
    label: "Space Grotesk",
    font: "'Space Grotesk', sans-serif",
    category: "Tech",
  },
  {
    id: "syne",
    label: "Syne",
    font: "'Syne', sans-serif",
    category: "Artistic",
  },
  {
    id: "epilogue",
    label: "Epilogue",
    font: "'Epilogue', sans-serif",
    category: "Quirky",
  },
  {
    id: "dmserif",
    label: "DM Serif",
    font: "'DM Serif Display', serif",
    category: "Editorial",
  },
  {
    id: "playfair",
    label: "Playfair",
    font: "'Playfair Display', serif",
    category: "Luxury",
  },
  {
    id: "libre",
    label: "Baskerville",
    font: "'Libre Baskerville', serif",
    category: "Classic",
  },
  {
    id: "jetbrains",
    label: "Mono",
    font: "'JetBrains Mono', monospace",
    category: "Code",
  },
  {
    id: "oswald",
    label: "Oswald",
    font: "'Oswald', sans-serif",
    category: "Bold",
  },
  {
    id: "caveat",
    label: "Caveat",
    font: "'Caveat', cursive",
    category: "Handwritten",
  },
];

// --- UPDATED BUTTON SHAPES ---
const BUTTON_STYLES = [
  { id: "pill", label: "Pill", radius: "999px" },
  { id: "rounded", label: "Soft", radius: "6px" }, // Changed from 12px to 6px for distinct look
  { id: "sharp", label: "Sharp", radius: "0px" },
];

const getContrastColor = (hexColor: string) => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
};

export default function BrandingStep({
  formData,
  setFormData,
  setErrors,
  avatarRef,
  bannerRef,
  supabase,
  user,
}: any) {
  const [uploading, setUploading] = useState<{
    avatar: boolean;
    banner: boolean;
  }>({
    avatar: false,
    banner: false,
  });

  const [isFontOpen, setIsFontOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFontOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleColorChange = (newColor: string) => {
    const textColor = getContrastColor(newColor);
    setFormData((prev: any) => ({
      ...prev,
      themeColor: newColor,
      buttonTextColor: textColor,
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner",
  ) => {
    if (!e.target.files?.length) return;
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `page-assets/${user.id}-${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      setFormData((prev: any) => ({
        ...prev,
        [type === "avatar" ? "avatarUrl" : "bannerUrl"]: data.publicUrl,
      }));

      if (type === "avatar") {
        setErrors((prev: any) => ({ ...prev, avatarUrl: "" }));
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const activeFont =
    FONT_OPTIONS.find((f) => f.id === formData.fontStyle) || FONT_OPTIONS[0];

  return (
    <section className={styles.brandingCard}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=DM+Serif+Display&family=Epilogue:wght@500;700&family=JetBrains+Mono:wght@500&family=Libre+Baskerville:wght@400;700&family=Oswald:wght@500&family=Outfit:wght@400;600;800&family=Playfair+Display:wght@600&family=Space+Grotesk:wght@500;700&family=Syne:wght@600;800&display=swap");
      `}</style>

      <div className={styles.cardHeader}>
        <div className={styles.stepBadge}>2</div>
        <div className={styles.headerText}>
          <h3>Branding</h3>
          <p>Make it look like you.</p>
        </div>
      </div>

      <div className={styles.uploadGrid}>
        <div className={styles.uploadUnit}>
          <div className={styles.uploadLabelRow}>
            <span className={styles.uploadLabel}>Icon</span>
            <span className={styles.optTag}>OPTIONAL</span>
          </div>
          <div
            className={styles.uploadCard}
            onClick={() => !uploading.avatar && avatarRef.current?.click()}
            title="Upload Page Icon"
            style={{ cursor: uploading.avatar ? "wait" : "pointer" }}
          >
            {uploading.avatar ? (
              <div className={styles.loadingState}>
                <RiLoader4Line className={styles.spin} size={28} />
              </div>
            ) : formData.avatarUrl ? (
              <>
                <img
                  src={formData.avatarUrl}
                  className={styles.previewImg}
                  alt="Avatar"
                />
                <div className={styles.uploadOverlay}>
                  <RiPencilFill size={24} />
                </div>
              </>
            ) : (
              <>
                <RiCameraFill className={styles.uploadIcon} />
                <span className={styles.uploadText}>Upload</span>
              </>
            )}
            <input
              type="file"
              hidden
              ref={avatarRef}
              accept="image/*"
              disabled={uploading.avatar}
              onChange={(e) => handleImageUpload(e, "avatar")}
            />
          </div>
        </div>

        <div className={styles.uploadUnit}>
          <div className={styles.uploadLabelRow}>
            <span className={styles.uploadLabel}>Cover Image</span>
            <span className={styles.optTag}>OPTIONAL</span>
          </div>
          <div
            className={styles.uploadCard}
            onClick={() => !uploading.banner && bannerRef.current?.click()}
            title="Upload Cover Image"
            style={{ cursor: uploading.banner ? "wait" : "pointer" }}
          >
            {uploading.banner ? (
              <div className={styles.loadingState}>
                <RiLoader4Line className={styles.spin} size={28} />
              </div>
            ) : formData.bannerUrl ? (
              <>
                <img
                  src={formData.bannerUrl}
                  className={styles.previewImg}
                  alt="Banner"
                />
                <div className={styles.uploadOverlay}>
                  <RiPencilFill size={24} />
                </div>
              </>
            ) : (
              <>
                <RiImageAddFill className={styles.uploadIcon} />
                <span className={styles.uploadText}>Add Banner</span>
              </>
            )}
            <input
              type="file"
              hidden
              ref={bannerRef}
              accept="image/*"
              disabled={uploading.banner}
              onChange={(e) => handleImageUpload(e, "banner")}
            />
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.fieldStack}>
        {/* --- TYPOGRAPHY & BUTTON GRID --- */}
        <div className={styles.styleOptionsGrid}>
          {/* FONT DROPDOWN */}
          <div className={styles.inputWrapper}>
            <div className={styles.fieldLabel}>
              <span>
                <RiFontSize style={{ marginBottom: -2, marginRight: 4 }} />
                Typography
              </span>
            </div>
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button
                className={styles.dropdownTrigger}
                onClick={() => setIsFontOpen(!isFontOpen)}
              >
                <span
                  className={styles.triggerLabel}
                  style={{ fontFamily: activeFont.font }}
                >
                  {activeFont.label}
                </span>
                <RiArrowDownSLine
                  className={styles.dropdownArrow}
                  style={{
                    transform: isFontOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {isFontOpen && (
                <div className={styles.dropdownMenu}>
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font.id}
                      className={`${styles.dropdownItem} ${formData.fontStyle === font.id ? styles.activeDropdownItem : ""}`}
                      onClick={() => {
                        setFormData({ ...formData, fontStyle: font.id });
                        setIsFontOpen(false);
                      }}
                    >
                      <span
                        style={{ fontFamily: font.font, fontSize: "1.05rem" }}
                      >
                        {font.label}
                      </span>
                      <span className={styles.fontCategoryBadge}>
                        {font.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* BUTTON STYLE */}
          <div className={styles.inputWrapper}>
            <div className={styles.fieldLabel}>
              <span>
                <RiShapeLine style={{ marginBottom: -2, marginRight: 4 }} />
                Button Shape
              </span>
            </div>
            <div className={styles.styleToggleGroup}>
              {BUTTON_STYLES.map((btn) => (
                <button
                  key={btn.id}
                  className={`${styles.styleBtn} ${formData.buttonStyle === btn.id ? styles.activeStyleBtn : ""}`}
                  onClick={() =>
                    setFormData({ ...formData, buttonStyle: btn.id })
                  }
                  title={btn.label}
                >
                  <div
                    className={styles.miniBtnPreview}
                    style={{ borderRadius: btn.radius }}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- COLOR PICKER --- */}
        <div className={styles.inputWrapper}>
          <div className={styles.fieldLabel}>
            <span>
              <RiPaletteLine style={{ marginBottom: -2, marginRight: 4 }} />
              Accent Color
            </span>
          </div>
          <div className={styles.colorRow}>
            {THEME_COLORS.map((c) => (
              <button
                key={c.hex}
                className={`${styles.colorDot} ${formData.themeColor === c.hex ? styles.activeColor : ""}`}
                style={{ background: c.hex }}
                onClick={() => handleColorChange(c.hex)}
                title={c.name}
              />
            ))}
            <div
              className={`${styles.customColorBtn} ${
                !THEME_COLORS.find((c) => c.hex === formData.themeColor)
                  ? styles.activeColor
                  : ""
              }`}
            >
              <RiPaletteLine size={20} />
              <input
                type="color"
                className={styles.hiddenColorPicker}
                value={formData.themeColor}
                onChange={(e) => handleColorChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- BUTTON LABEL --- */}
        <div className={styles.inputWrapper}>
          <label className={styles.fieldLabel}>
            Button Label
            <span className={styles.optTag}>OPTIONAL</span>
          </label>
          <input
            className={styles.stdInput}
            placeholder="Default: Subscribe"
            value={formData.buttonText}
            onChange={(e) =>
              setFormData({ ...formData, buttonText: e.target.value })
            }
          />
        </div>
      </div>
    </section>
  );
}
