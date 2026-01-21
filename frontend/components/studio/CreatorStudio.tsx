"use client";
import { useState } from "react";
import {
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiCameraLine,
  RiImageAddLine,
  RiPencilLine,
  RiEyeLine,
  RiSmartphoneLine,
  RiMacbookLine,
  RiArrowRightSLine,
  RiMagicLine,
} from "react-icons/ri";
import LivePreview from "./LivePreview";
import styles from "./CreatorStudio.module.css";

export default function CreatorStudio({ user, profile }: any) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">(
    "mobile",
  );

  const [formData, setFormData] = useState({
    handle: "",
    displayName: profile?.display_name || "Reddy Sai Nivas C",
    bio: "",
    price: "10",
    bannerUrl: "",
    platforms: {
      telegram: { enabled: false, link: "", title: "VIP Telegram" },
      discord: { enabled: false, link: "", title: "Pro Discord" },
      whatsapp: { enabled: false, link: "", title: "Member Chat" },
    },
  });

  const togglePlatform = (key: "telegram" | "discord" | "whatsapp") => {
    setFormData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: {
          ...prev.platforms[key],
          enabled: !prev.platforms[key].enabled,
        },
      },
    }));
  };

  return (
    <div className={styles.studioWrapper}>
      {/* MOBILE NAV (Visible only on small screens) */}
      <div className={styles.mobileNav}>
        <button
          className={activeTab === "edit" ? styles.activeMobileTab : ""}
          onClick={() => setActiveTab("edit")}
        >
          <RiPencilLine /> <span>Editor</span>
        </button>
        <button
          className={activeTab === "preview" ? styles.activeMobileTab : ""}
          onClick={() => setActiveTab("preview")}
        >
          <RiEyeLine /> <span>Preview</span>
        </button>
      </div>

      {/* --- EDITOR PANE (Left) --- */}
      <div
        className={`${styles.editorPane} ${
          activeTab === "preview" ? styles.hideOnMobile : ""
        }`}
      >
        {/* HEADER */}
        <header className={styles.paneHeader}>
          <div className={styles.headerRow}>
            <div className={styles.headerIconBox}>
              <RiMagicLine className={styles.headerIcon} />
            </div>
            <div className={styles.headerTextStack}>
              <h1 className={styles.headerTitle}>
                Creator Studio<span className={styles.accentDot}>.</span>
              </h1>
              <p className={styles.headerSubtitle}>
                Design your membership page in seconds
              </p>
            </div>
          </div>
        </header>

        {/* 1. IDENTITY */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>1</div>
            <h3>Identity</h3>
          </div>

          <div className={styles.inputStack}>
            <div className={styles.inputGroup}>
              <label>Public Handle</label>
              <div className={styles.urlInputWrapper}>
                <span className={styles.urlPrefix}>substarter.com/</span>
                <input
                  type="text"
                  className={styles.urlInput}
                  value={formData.handle}
                  onChange={(e) =>
                    setFormData({ ...formData, handle: e.target.value })
                  }
                  placeholder="username"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Display Name</label>
              <input
                className={styles.cleanInput}
                type="text"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Bio</label>
              <textarea
                className={styles.cleanTextArea}
                rows={3}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="What is your community about?"
              />
            </div>
          </div>
        </section>

        {/* 2. VISUALS */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>2</div>
            <h3>Visuals</h3>
          </div>
          <div className={styles.visualGrid}>
            <button className={styles.uploadBtn}>
              <RiCameraLine size={28} />
              <span>Upload Avatar</span>
            </button>
            <button className={styles.uploadBtn}>
              <RiImageAddLine size={28} />
              <span>Upload Banner</span>
            </button>
          </div>
        </section>

        {/* 3. ACCESS */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>3</div>
            <h3>Access</h3>
          </div>
          <div className={styles.platformStack}>
            {[
              {
                id: "telegram",
                icon: <RiTelegramFill />,
                label: "Telegram",
                color: "#229ED9",
              },
              {
                id: "discord",
                icon: <RiDiscordFill />,
                label: "Discord",
                color: "#5865F2",
              },
              {
                id: "whatsapp",
                icon: <RiWhatsappFill />,
                label: "WhatsApp",
                color: "#25D366",
              },
            ].map((plat) => {
              const isEnabled = (formData.platforms as any)[plat.id].enabled;
              return (
                <div
                  key={plat.id}
                  className={`${styles.platformRow} ${
                    isEnabled ? styles.activePlatform : ""
                  }`}
                >
                  <div className={styles.platHeader}>
                    <div className={styles.platIdentity}>
                      <div
                        className={styles.platIcon}
                        style={{ color: plat.color, fontSize: "1.4rem" }}
                      >
                        {plat.icon}
                      </div>
                      <span className={styles.platName}>{plat.label}</span>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => togglePlatform(plat.id as any)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  {isEnabled && (
                    <div className={styles.platExpand}>
                      <input
                        type="text"
                        placeholder={`Paste your ${plat.label} invite link...`}
                        className={styles.miniInput}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. PRICING */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>4</div>
            <h3>Pricing</h3>
          </div>
          <div className={styles.priceWrapper}>
            <div className={styles.priceInputBox}>
              <span className={styles.currency}>$</span>
              <input
                className={styles.priceField}
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <span className={styles.priceFrequency}>per 30 days</span>
          </div>
        </section>

        <button className={styles.launchPageActionBtn}>
          Launch Page <RiArrowRightSLine />
        </button>
      </div>

      {/* --- PREVIEW PANE (Right) --- */}
      <div
        className={`${styles.previewPane} ${
          activeTab === "edit" ? styles.hideOnMobile : ""
        }`}
      >
        <div className={styles.deviceSwitcher}>
          <button
            className={`${styles.deviceBtn} ${
              previewDevice === "mobile" ? styles.deviceActive : ""
            }`}
            onClick={() => setPreviewDevice("mobile")}
          >
            <RiSmartphoneLine /> Mobile
          </button>
          <button
            className={`${styles.deviceBtn} ${
              previewDevice === "desktop" ? styles.deviceActive : ""
            }`}
            onClick={() => setPreviewDevice("desktop")}
          >
            <RiMacbookLine /> Desktop
          </button>
        </div>

        {/* SCALE WRAPPER: Ensures content fits without scrolling */}
        <div className={styles.scaleWrapper}>
          <LivePreview
            name={formData.displayName}
            bio={formData.bio}
            price={formData.price}
            handle={formData.handle}
            avatarUrl={profile?.avatar_url}
            bannerUrl={formData.bannerUrl}
            platforms={formData.platforms}
            viewMode={previewDevice}
          />
        </div>
      </div>
    </div>
  );
}
