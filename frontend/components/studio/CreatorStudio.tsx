"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  RiLayoutGridFill,
  RiSmartphoneLine,
  RiMacbookLine,
  RiLoader5Line,
  RiRocket2Fill,
  RiPencilLine,
  RiEyeLine,
} from "react-icons/ri";
import LivePreview from "./LivePreview";
import styles from "./CreatorStudio.module.css";

// Sub-Components
import IdentityStep from "../steps/IdentityStep";
import BrandingStep from "../steps/BrandingStep";
import DetailsStep from "../steps/DetailsStep";
import AccessStep from "../steps/AccessStep";

// Types
export type IntervalType = "weekly" | "monthly" | "yearly" | "lifetime";
export type SocialPlatform = "twitter" | "instagram" | "youtube" | "website";

export interface PriceOption {
  amount: string;
  interval: IntervalType | "";
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export default function CreatorStudio({ user }: any) {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">(
    "mobile",
  );

  // States
  const [isLaunching, setIsLaunching] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    pageTitle: "",
    handle: "",
    description: "",
    avatarUrl: "",
    bannerUrl: "",
    themeColor: "#000000",
    buttonTextColor: "#ffffff",
    buttonStyle: "pill",
    buttonText: "",
    prices: [{ amount: "10", interval: "monthly" }] as PriceOption[],
    features: [] as string[],
    socialLinks: [] as SocialLink[],
    welcomeMessage: "",
    terms: "",
    platforms: {
      telegram: { enabled: false, link: "", chatId: "", title: "VIP Telegram" },
      discord: { enabled: false, link: "", title: "Pro Discord" },
      whatsapp: { enabled: false, link: "", title: "Member Chat" },
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.pageTitle.trim()) {
      newErrors.pageTitle = "Page Name is required";
      isValid = false;
    }
    if (!formData.handle.trim()) {
      newErrors.handle = "URL is required";
      isValid = false;
    }
    if (!formData.avatarUrl) {
      newErrors.avatarUrl = "Icon is required";
      isValid = false;
    }

    if (formData.prices.length === 0) {
      newErrors.prices = "Add a plan";
      isValid = false;
    } else if (
      formData.prices.some((p) => !p.amount || parseFloat(p.amount) < 1)
    ) {
      newErrors.prices = "Minimum $1";
      isValid = false;
    }

    if (!Object.values(formData.platforms).some((p) => p.enabled)) {
      newErrors.platforms = "Select at least one platform";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreatePage = async (isDraft: boolean = false) => {
    if (!validateForm()) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    setIsLaunching(true);

    try {
      // 1. Create/Upsert Page
      const pagePayload = {
        owner_id: user.id,
        name: formData.pageTitle,
        slug: formData.handle,
        icon_url: formData.avatarUrl,
        banner_url: formData.bannerUrl,
        description: formData.description,
        features: formData.features,
        terms: formData.terms,
        welcome_message: formData.welcomeMessage,
        button_text: formData.buttonText || "Subscribe",
        theme_color: formData.themeColor,
        button_style: formData.buttonStyle,
        social_links: formData.socialLinks,
        status: "active",
      };

      let resultPageId = pageId;

      if (!pageId) {
        // Insert new
        const { data: pageData, error: pageError } = await supabase
          .from("pages")
          .insert(pagePayload)
          .select()
          .single();
        if (pageError) throw pageError;
        resultPageId = pageData.id;
        setPageId(pageData.id);
      } else {
        // Update existing (if they clicked generate ID multiple times or are editing)
        const { error: pageError } = await supabase
          .from("pages")
          .update(pagePayload)
          .eq("id", pageId);
        if (pageError) throw pageError;
      }

      // 2. Upsert Configs (Simpler to delete/re-insert or upsert)
      // For simplicity here we assume inserts are fine or you handle upserts in DB.
      // A safe way is to delete old configs for this page_id then insert new.
      await supabase
        .from("page_telegram_config")
        .delete()
        .eq("page_id", resultPageId);
      await supabase
        .from("page_discord_config")
        .delete()
        .eq("page_id", resultPageId);
      await supabase
        .from("page_whatsapp_config")
        .delete()
        .eq("page_id", resultPageId);
      await supabase.from("page_prices").delete().eq("page_id", resultPageId);

      const { telegram, discord, whatsapp } = formData.platforms;
      if (telegram.enabled) {
        await supabase.from("page_telegram_config").insert({
          page_id: resultPageId,
          chat_id: telegram.chatId,
          title: telegram.title,
        });
      }
      if (discord.enabled) {
        await supabase.from("page_discord_config").insert({
          page_id: resultPageId,
          invite_link: discord.link,
          title: discord.title,
        });
      }
      if (whatsapp.enabled) {
        await supabase.from("page_whatsapp_config").insert({
          page_id: resultPageId,
          invite_link: whatsapp.link,
          title: whatsapp.title,
        });
      }

      // 3. Insert Prices
      const priceInserts = formData.prices.map((p) => ({
        page_id: resultPageId,
        amount: parseFloat(p.amount),
        interval: p.interval || "monthly",
      }));
      await supabase.from("page_prices").insert(priceInserts);

      // 4. Handle Completion
      if (!isDraft) {
        router.push("/pages");
      }
    } catch (error: any) {
      alert(
        "Error: " +
          (error.message?.includes("slug")
            ? "This URL is already taken."
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
          <RiPencilLine />
        </button>
        <button
          className={activeTab === "preview" ? styles.activeMobileTab : ""}
          onClick={() => setActiveTab("preview")}
        >
          <RiEyeLine />
        </button>
      </div>

      <div
        className={`${styles.editorPane} ${activeTab === "preview" ? styles.hideOnMobile : ""}`}
      >
        <header className={styles.paneHeader}>
          <div className={styles.headerIconBox}>
            <RiLayoutGridFill className={styles.headerIcon} />
          </div>
          <div className={styles.headerTextStack}>
            <h1 className={styles.headerTitle}>
              Creator Studio<span className={styles.accentDot}>.</span>
            </h1>
            <p className={styles.headerSubtitle}>Design your product page</p>
          </div>
        </header>

        {/* STEPS */}
        <IdentityStep
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          supabase={supabase}
        />

        <BrandingStep
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          avatarRef={avatarInputRef}
          bannerRef={bannerInputRef}
          supabase={supabase}
          user={user}
        />

        <DetailsStep formData={formData} setFormData={setFormData} />

        <AccessStep
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          pageId={pageId}
          onSavePage={() => handleCreatePage(true)}
          isSaving={isLaunching}
          supabase={supabase}
        />

        {/* Final Launch Button - Only navigates away */}
        <button
          className={styles.desktopLaunchBtn}
          onClick={() => handleCreatePage(false)}
          disabled={isLaunching}
        >
          {isLaunching ? (
            <>
              <RiLoader5Line className="animate-spin" size={24} /> Saving...
            </>
          ) : (
            <>
              <RiRocket2Fill className={styles.rocketIcon} />{" "}
              {pageId ? "Save Changes & Exit" : "Launch Page"}
            </>
          )}
        </button>
      </div>

      <div
        className={`${styles.previewPane} ${activeTab === "edit" ? styles.hideOnMobile : ""}`}
      >
        <div className={styles.deviceToggle}>
          <button
            className={previewDevice === "mobile" ? styles.activeDevice : ""}
            onClick={() => setPreviewDevice("mobile")}
          >
            <RiSmartphoneLine /> Mobile
          </button>
          <button
            className={previewDevice === "desktop" ? styles.activeDevice : ""}
            onClick={() => setPreviewDevice("desktop")}
          >
            <RiMacbookLine /> Desktop
          </button>
        </div>
        <div className={styles.previewScaler}>
          <LivePreview
            {...formData}
            buttonText={formData.buttonText || "Subscribe"}
            viewMode={previewDevice}
          />
        </div>
      </div>
    </div>
  );
}
