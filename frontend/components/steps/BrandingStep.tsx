"use client";
import {
  RiCameraFill,
  RiImageAddFill,
  RiPaletteLine,
  RiPencilFill,
} from "react-icons/ri";
import styles from "./BrandingStep.module.css";

const THEME_COLORS = [
  { name: "Midnight", hex: "#000000" }, // Dark -> White Text
  { name: "Ocean", hex: "#2563eb" }, // Dark -> White Text
  { name: "Emerald", hex: "#059669" }, // Dark -> White Text
  { name: "Berry", hex: "#db2777" }, // Dark -> White Text
  { name: "Violet", hex: "#7c3aed" }, // Dark -> White Text
  { name: "Sunny", hex: "#facc15" }, // Light -> Black Text
];

// --- SMART CONTRAST FUNCTION ---
// Returns Black for light colors, White for dark colors
const getContrastColor = (hexColor: string) => {
  // Remove hash if present
  const hex = hexColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate YIQ brightness (Standard accessibility formula)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // If brightness is high (> 128), return Black, else White
  return yiq >= 128 ? "#000000" : "#ffffff";
};

export default function BrandingStep({
  formData,
  setFormData,
  errors,
  setErrors,
  avatarRef,
  bannerRef,
  supabase,
  user,
}: any) {
  // --- HANDLE COLOR CHANGE ---
  // This updates both the background color AND the text color
  const handleColorChange = (newColor: string) => {
    const textColor = getContrastColor(newColor);

    setFormData((prev: any) => ({
      ...prev,
      themeColor: newColor,
      // Ensure you add 'buttonTextColor' to your initial state in CreatorStudio.tsx!
      buttonTextColor: textColor,
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner",
  ) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const filePath = `page-assets/${user.id}-${Math.random()}.${file.name.split(".").pop()}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file);
    if (!error) {
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      setFormData((prev: any) => ({
        ...prev,
        [type === "avatar" ? "avatarUrl" : "bannerUrl"]: data.publicUrl,
      }));
      if (type === "avatar")
        setErrors((prev: any) => ({ ...prev, avatarUrl: "" }));
    }
  };

  return (
    <section
      className={`${styles.brandingCard} ${errors.avatarUrl ? styles.errorBorder : ""}`}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.stepBadge}>2</div>
        <div className={styles.headerText}>
          <h3>Branding</h3>
          <p>Make it look like you.</p>
        </div>
      </div>

      {/* Upload Grid */}
      <div className={styles.uploadGrid}>
        {/* Avatar Upload */}
        <div className={styles.uploadUnit}>
          <div className={styles.uploadLabelRow}>
            <span className={styles.uploadLabel}>Icon</span>
            <span className={styles.reqTag}>REQUIRED</span>
          </div>
          <div
            className={styles.uploadCard}
            onClick={() => avatarRef.current?.click()}
            title="Upload Page Icon"
          >
            {formData.avatarUrl ? (
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
              onChange={(e) => handleImageUpload(e, "avatar")}
            />
          </div>
          {errors.avatarUrl && (
            <span className={styles.errorText}>Please upload an icon.</span>
          )}
        </div>

        {/* Banner Upload */}
        <div className={styles.uploadUnit}>
          <div className={styles.uploadLabelRow}>
            <span className={styles.uploadLabel}>Cover Image</span>
            <span className={styles.optTag}>OPTIONAL</span>
          </div>
          <div
            className={styles.uploadCard}
            onClick={() => bannerRef.current?.click()}
            title="Upload Cover Image"
          >
            {formData.bannerUrl ? (
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
              onChange={(e) => handleImageUpload(e, "banner")}
            />
          </div>
        </div>
      </div>

      {/* Inputs Stack */}
      <div className={styles.fieldStack}>
        {/* Color Picker */}
        <div className={styles.inputWrapper}>
          <div className={styles.fieldLabel}>Accent Color</div>
          <div className={styles.colorRow}>
            {THEME_COLORS.map((c) => (
              <button
                key={c.hex}
                className={`${styles.colorDot} ${formData.themeColor === c.hex ? styles.activeColor : ""}`}
                style={{ background: c.hex }}
                onClick={() => handleColorChange(c.hex)} // Use the new handler
                title={c.name}
              />
            ))}

            {/* Custom Picker */}
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
                onChange={(e) => handleColorChange(e.target.value)} // Use the new handler
              />
            </div>
          </div>
        </div>

        {/* Button Text */}
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
