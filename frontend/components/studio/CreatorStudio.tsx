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
  RiAddLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiLayoutTopLine,
  RiLinkM,
  RiFileCopyLine,
  RiCheckDoubleLine,
} from "react-icons/ri";
import LivePreview from "./LivePreview";
import styles from "./CreatorStudio.module.css";

type IntervalType = "weekly" | "monthly" | "yearly" | "lifetime";

type PriceOption = {
  amount: string;
  interval: IntervalType | "";
};

const ALL_INTERVALS: IntervalType[] = [
  "weekly",
  "monthly",
  "yearly",
  "lifetime",
];

const INTERVAL_LABELS: Record<IntervalType, string> = {
  weekly: "Weekly (7 Days)",
  monthly: "Monthly (30 Days)",
  yearly: "Yearly (365 Days)",
  lifetime: "Lifetime (Forever)",
};

export default function CreatorStudio({ user }: any) {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">(
    "mobile",
  );

  // States
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false); // New state to track success
  const [uploading, setUploading] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false); // For clipboard feedback

  const [newFeature, setNewFeature] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    pageTitle: "",
    handle: "",
    description: "",
    avatarUrl: "",
    bannerUrl: "",
    prices: [{ amount: "10", interval: "monthly" }] as PriceOption[],
    features: [] as string[],
    welcomeMessage: "",
    terms: "",
    platforms: {
      telegram: { enabled: false, link: "", chatId: "", title: "VIP Telegram" },
      discord: { enabled: false, link: "", title: "Pro Discord" },
      whatsapp: { enabled: false, link: "", title: "Member Chat" },
    },
  });

  // --- FEATURES ---
  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature("");
  };

  const removeFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  // --- PRICING ---
  const addPriceOption = () => {
    const usedIntervals = formData.prices.map((p) => p.interval);
    const nextAvailable = ALL_INTERVALS.find((i) => !usedIntervals.includes(i));
    if (nextAvailable) {
      setFormData((prev) => ({
        ...prev,
        prices: [...prev.prices, { amount: "", interval: nextAvailable }],
      }));
    } else {
      alert("You have already added all available plan types.");
    }
  };

  const removePriceOption = (index: number) => {
    if (formData.prices.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      prices: prev.prices.filter((_, i) => i !== index),
    }));
  };

  const updatePrice = (
    index: number,
    field: keyof PriceOption,
    value: string,
  ) => {
    const newPrices = [...formData.prices];
    // @ts-ignore
    newPrices[index][field] = value;
    setFormData((prev) => ({ ...prev, prices: newPrices }));
  };

  // --- IMAGE UPLOAD ---
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner",
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `page-assets/${fileName}`;

    setUploading(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      setFormData((prev) => ({
        ...prev,
        [type === "avatar" ? "avatarUrl" : "bannerUrl"]: data.publicUrl,
      }));
    } catch (error: any) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // --- PLATFORM TOGGLES ---
  const togglePlatform = (key: string) => {
    setFormData((prev: any) => ({
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

  const updatePlatformLink = (key: string, val: string) => {
    setFormData((prev: any) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: { ...prev.platforms[key], link: val },
      },
    }));
  };

  // --- CLIPBOARD HELPER ---
  const handleCopyCommand = () => {
    if (!pageId) return;
    navigator.clipboard.writeText(`/connect ${pageId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- LAUNCH LOGIC ---
  const handleLaunch = async () => {
    if (!user || !formData.handle) return alert("Please set a Page URL.");
    if (!formData.pageTitle) return alert("Please set a Page Name.");
    if (!formData.prices || formData.prices.length === 0)
      return alert("Please add at least one pricing plan.");

    // Check if at least one platform is enabled
    const activePlatformEntry = Object.entries(formData.platforms).find(
      ([_, data]) => data.enabled,
    );
    if (!activePlatformEntry) return alert("Enable at least one platform.");

    setIsLaunching(true);

    try {
      // 1. Create PAGE
      const { data: pageData, error: pageError } = await supabase
        .from("pages")
        .insert({
          owner_id: user.id,
          name: formData.pageTitle,
          slug: formData.handle,
          icon_url: formData.avatarUrl,
          banner_url: formData.bannerUrl,
          description: formData.description,
          features: formData.features,
          terms: formData.terms,
          welcome_message: formData.welcomeMessage,
          status: "active",
          views: 0,
        })
        .select()
        .single();

      if (pageError) throw pageError;

      const newPageId = pageData.id;
      setPageId(newPageId); // Save ID locally

      // 2. Insert Platform Configs
      const { telegram, discord, whatsapp } = formData.platforms;

      if (telegram.enabled) {
        await supabase
          .from("page_telegram_config")
          .insert({ page_id: newPageId, chat_id: telegram.chatId });
      }
      if (discord.enabled) {
        await supabase
          .from("page_discord_config")
          .insert({ page_id: newPageId, invite_link: discord.link });
      }
      if (whatsapp.enabled) {
        await supabase
          .from("page_whatsapp_config")
          .insert({ page_id: newPageId, invite_link: whatsapp.link });
      }

      // 3. Insert Prices
      const priceInserts = formData.prices.map((p) => ({
        page_id: newPageId,
        amount: parseFloat(p.amount),
        interval: p.interval || "monthly",
      }));

      const { error: priceError } = await supabase
        .from("page_prices")
        .insert(priceInserts);
      if (priceError) throw priceError;

      // SUCCESS!
      setIsLaunched(true);

      // If Telegram is NOT enabled, we can redirect.
      // If Telegram IS enabled, stay here so they can see the ID.
      if (!telegram.enabled) {
        router.push("/pages");
      } else {
        alert(
          "Page Created! Now copy the command to connect your Telegram group.",
        );
      }
    } catch (error: any) {
      console.error("Launch Error:", error);
      alert(
        "Launch failed: " +
          (error.message?.includes("slug")
            ? "This URL is taken."
            : error.message),
      );
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
              <p className={styles.headerSubtitle}>Create your product page</p>
            </div>
          </div>
        </header>

        {/* 1. PAGE IDENTITY */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>1</div>
            <h3>Page Identity</h3>
          </div>
          <div className={styles.inputStack}>
            <div className={styles.inputGroup}>
              <label>
                <RiLayoutTopLine style={{ marginBottom: -2, marginRight: 4 }} />{" "}
                Page Name
              </label>
              <input
                className={styles.cleanInput}
                type="text"
                placeholder="e.g. VIP Crypto Signals"
                value={formData.pageTitle}
                onChange={(e) =>
                  setFormData({ ...formData, pageTitle: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <label>
                <RiLinkM style={{ marginBottom: -2, marginRight: 4 }} /> Page
                URL
              </label>
              <div className={styles.urlInputWrapper}>
                <span className={styles.urlPrefix}>substarter.com/</span>
                <input
                  className={styles.urlInput}
                  type="text"
                  value={formData.handle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      handle: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  placeholder="vip-signals"
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea
                className={styles.cleanTextArea}
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="What will members get?"
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
              <span>{uploading ? "Uploading..." : "Page Icon"}</span>
            </button>
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
              <span>{uploading ? "Uploading..." : "Page Banner"}</span>
            </button>
          </div>
        </section>

        {/* 3. DETAILS */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>3</div>
            <h3>Details</h3>
          </div>
          <div className={styles.inputStack}>
            <div className={styles.inputGroup}>
              <label>Features</label>
              <div className={styles.featureInputRow}>
                <input
                  type="text"
                  className={styles.cleanInput}
                  placeholder="e.g. Daily Analysis"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFeature()}
                />
                <button className={styles.addFeatureBtn} onClick={addFeature}>
                  <RiAddLine size={24} />
                </button>
              </div>
              {formData.features.length > 0 && (
                <div className={styles.featureList}>
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <span>{feat}</span>
                      <button
                        className={styles.removeFeatureBtn}
                        onClick={() => removeFeature(idx)}
                      >
                        <RiCloseLine size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>Welcome Message</label>
              <textarea
                className={styles.cleanTextArea}
                rows={3}
                placeholder="A public message..."
                value={formData.welcomeMessage}
                onChange={(e) =>
                  setFormData({ ...formData, welcomeMessage: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Terms</label>
              <textarea
                className={styles.cleanTextArea}
                rows={3}
                placeholder="Refund policy..."
                value={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* 4. ACCESS */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>4</div>
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
                        onChange={() => togglePlatform(plat.id)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  {isEnabled && (
                    <div className={styles.platExpand}>
                      {plat.id === "telegram" ? (
                        <div
                          style={{
                            background: "#f8fafc",
                            padding: 16,
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {/* MANUAL CONNECTION UI */}
                          {pageId ? (
                            <>
                              <div
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: 600,
                                  color: "#166534",
                                  marginBottom: 12,
                                }}
                              >
                                ✅ Page Created! Connect your group now:
                              </div>
                              <ol
                                style={{
                                  paddingLeft: 20,
                                  margin: "0 0 16px 0",
                                  fontSize: "0.85rem",
                                  color: "#475569",
                                  lineHeight: "1.6",
                                }}
                              >
                                <li>Open your Telegram Group.</li>
                                <li>
                                  Add <strong>@mysubstarterbot</strong> to your
                                  group.
                                </li>
                                <li>
                                  Promote the bot to <strong>Admin</strong>.
                                </li>
                                <li>Copy and paste this command:</li>
                              </ol>

                              <div
                                onClick={handleCopyCommand}
                                style={{
                                  background: "#0f172a",
                                  color: "#4ade80",
                                  padding: "10px 14px",
                                  borderRadius: 8,
                                  fontFamily: "monospace",
                                  fontSize: "0.9rem",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                  border: "1px solid #334155",
                                }}
                              >
                                <span>/connect {pageId}</span>
                                {copied ? (
                                  <RiCheckDoubleLine />
                                ) : (
                                  <RiFileCopyLine />
                                )}
                              </div>
                              {copied && (
                                <div
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#16a34a",
                                    marginTop: 4,
                                  }}
                                >
                                  Copied to clipboard!
                                </div>
                              )}

                              <button
                                onClick={() => router.push("/pages")}
                                style={{
                                  marginTop: 15,
                                  width: "100%",
                                  padding: 10,
                                  background: "#cbd5e1",
                                  border: "none",
                                  borderRadius: 6,
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  color: "#475569",
                                }}
                              >
                                I have connected the bot → Go to Dashboard
                              </button>
                            </>
                          ) : (
                            <div
                              style={{
                                color: "#e11d48",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <RiLoader4Fill />
                              Please "Launch Page" below to generate your
                              Connect ID.
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder={`Paste ${plat.label} invite link...`}
                          className={styles.miniInput}
                          onChange={(e) =>
                            updatePlatformLink(plat.id, e.target.value)
                          }
                          value={(formData.platforms as any)[plat.id].link}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. PRICING */}
        <section className={styles.configSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.stepNum}>5</div>
            <h3>Pricing Plans</h3>
          </div>
          <div className={styles.platformStack}>
            {formData.prices.map((price, idx) => (
              <div
                key={idx}
                className={styles.platformRow}
                style={{ padding: "16px" }}
              >
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <div
                    className={styles.priceInputBox}
                    style={{ width: "140px", height: "56px" }}
                  >
                    <span
                      className={styles.currency}
                      style={{ fontSize: "1.2rem" }}
                    >
                      $
                    </span>
                    <input
                      className={styles.priceField}
                      style={{ fontSize: "1.4rem" }}
                      type="number"
                      value={price.amount}
                      placeholder="0"
                      onChange={(e) =>
                        updatePrice(idx, "amount", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.selectWrapper}>
                    <select
                      className={styles.customSelect}
                      value={price.interval}
                      onChange={(e) =>
                        updatePrice(idx, "interval", e.target.value as any)
                      }
                    >
                      <option value="" disabled>
                        Select Duration
                      </option>
                      {ALL_INTERVALS.map((int) => (
                        <option
                          key={int}
                          value={int}
                          disabled={formData.prices.some(
                            (p, i) => i !== idx && p.interval === int,
                          )}
                        >
                          {INTERVAL_LABELS[int]}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData.prices.length > 1 && (
                    <button
                      onClick={() => removePriceOption(idx)}
                      className={styles.deleteBtn}
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {formData.prices.length < 4 && (
              <button onClick={addPriceOption} className={styles.addPlanBtn}>
                <RiAddLine size={20} /> Add Another Plan
              </button>
            )}
          </div>
        </section>

        {/* LAUNCH BUTTON */}
        {!isLaunched && (
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
                <span style={{ marginRight: "8px" }}>Launch Page</span>{" "}
                <RiArrowRightSLine />
              </>
            )}
          </button>
        )}
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
            name={formData.pageTitle || "Page Name"}
            bio={formData.description || "Page description..."}
            prices={formData.prices}
            features={formData.features}
            welcomeMessage={formData.welcomeMessage}
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
