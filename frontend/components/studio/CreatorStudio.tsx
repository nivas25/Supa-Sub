"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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
  RiLoader4Fill,
} from "react-icons/ri";
import LivePreview from "./LivePreview";
import styles from "./CreatorStudio.module.css";

export default function CreatorStudio({ user, profile }: any) {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">(
    "mobile",
  );
  const [isLaunching, setIsLaunching] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Hidden Input Refs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    // FIX: Start fresh (empty strings) so previous details don't appear
    handle: "",
    displayName: "",
    bio: "",
    price: "10",
    avatarUrl: "",
    bannerUrl: "",
    platforms: {
      telegram: { enabled: false, link: "", title: "VIP Telegram" },
      discord: { enabled: false, link: "", title: "Pro Discord" },
      whatsapp: { enabled: false, link: "", title: "Member Chat" },
    },
  });

  // --- IMAGE UPLOAD LOGIC ---
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner",
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `${type}s/${fileName}`; // e.g. avatars/123.png

    setUploading(true);
    try {
      // Upload to 'images' bucket (lowercase)
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL from 'images' bucket
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      // Update State (Live Preview updates instantly)
      setFormData((prev) => ({
        ...prev,
        [type === "avatar" ? "avatarUrl" : "bannerUrl"]: publicUrl,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

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

  const updatePlatformLink = (
    key: "telegram" | "discord" | "whatsapp",
    val: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: { ...prev.platforms[key], link: val },
      },
    }));
  };

  const handleLaunch = async () => {
    if (!user) return alert("You must be logged in.");
    if (!formData.handle) return alert("Please pick a handle (username).");

    const activePlatformEntry = Object.entries(formData.platforms).find(
      ([_, data]) => data.enabled,
    );
    if (!activePlatformEntry)
      return alert("Please enable at least one platform.");

    setIsLaunching(true);

    try {
      // 1. Update Creator (Banner + Handle + Bio)
      const { error: creatorError } = await supabase
        .from("creators")
        .update({
          username: formData.handle,
          bio: formData.bio,
          banner_url: formData.bannerUrl,
        })
        .eq("id", user.id);

      if (creatorError) throw creatorError;

      // 2. Update Profile (Avatar)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          display_name: formData.displayName,
          avatar_url: formData.avatarUrl,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 3. Create/Update Group
      const [platformName, platformData] = activePlatformEntry;
      const { error: groupError } = await supabase.from("groups").insert({
        creator_id: user.id,
        name: formData.displayName,
        description: formData.bio,
        platform: platformName,
        price: parseFloat(formData.price) || 0,
        telegram_link: platformData.link,
        status: "active",
        views: 0,
      });

      if (groupError) throw groupError;

      router.push("/pages");
      router.refresh();
    } catch (error: any) {
      console.error("Launch Error:", error);
      alert("Error launching page: " + error.message);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className={styles.studioWrapper}>
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

      <div
        className={`${styles.editorPane} ${activeTab === "preview" ? styles.hideOnMobile : ""}`}
      >
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
                Design your membership page
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
            {/* AVATAR UPLOAD */}
            <input
              type="file"
              ref={avatarInputRef}
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "avatar")}
            />
            <button
              className={styles.uploadBtn}
              onClick={() => avatarInputRef.current?.click()}
              disabled={uploading}
            >
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <RiCameraLine size={28} />
              )}
              <span>{uploading ? "Uploading..." : "Upload Avatar"}</span>
            </button>

            {/* BANNER UPLOAD */}
            <input
              type="file"
              ref={bannerInputRef}
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "banner")}
            />
            <button
              className={styles.uploadBtn}
              onClick={() => bannerInputRef.current?.click()}
              disabled={uploading}
            >
              {formData.bannerUrl ? (
                <div
                  style={{
                    width: 60,
                    height: 30,
                    background: `url(${formData.bannerUrl}) center/cover`,
                    borderRadius: 4,
                  }}
                />
              ) : (
                <RiImageAddLine size={28} />
              )}
              <span>{uploading ? "Uploading..." : "Upload Banner"}</span>
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
                  className={`${styles.platformRow} ${isEnabled ? styles.activePlatform : ""}`}
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
                        onChange={(e) =>
                          updatePlatformLink(plat.id as any, e.target.value)
                        }
                        value={(formData.platforms as any)[plat.id].link}
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

        <button
          className={styles.launchPageActionBtn}
          onClick={handleLaunch}
          disabled={isLaunching || uploading}
          style={{ opacity: isLaunching ? 0.7 : 1 }}
        >
          {isLaunching ? (
            <>
              <RiLoader4Fill className="animate-spin" /> Launching...
            </>
          ) : (
            <>
              Launch Page <RiArrowRightSLine />
            </>
          )}
        </button>
      </div>

      <div
        className={`${styles.previewPane} ${activeTab === "edit" ? styles.hideOnMobile : ""}`}
      >
        <div className={styles.deviceSwitcher}>
          <button
            className={`${styles.deviceBtn} ${previewDevice === "mobile" ? styles.deviceActive : ""}`}
            onClick={() => setPreviewDevice("mobile")}
          >
            <RiSmartphoneLine /> Mobile
          </button>
          <button
            className={`${styles.deviceBtn} ${previewDevice === "desktop" ? styles.deviceActive : ""}`}
            onClick={() => setPreviewDevice("desktop")}
          >
            <RiMacbookLine /> Desktop
          </button>
        </div>

        <div className={styles.scaleWrapper}>
          <LivePreview
            name={formData.displayName}
            bio={formData.bio}
            price={formData.price}
            handle={formData.handle}
            avatarUrl={formData.avatarUrl}
            bannerUrl={formData.bannerUrl}
            platforms={formData.platforms}
            viewMode={previewDevice}
          />
        </div>
      </div>
    </div>
  );
}
