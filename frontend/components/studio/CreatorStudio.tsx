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
  RiSave3Line,
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
  const [isSavingDraft, setIsSavingDraft] = useState(false);
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
    fontStyle: "outfit",
    buttonStyle: "pill",
    buttonText: "",
    prices: [{ amount: "10", interval: "monthly" }] as PriceOption[],
    features: [] as string[],
    socialLinks: [] as SocialLink[],
    welcomeMessage: "",
    terms: "",
    platforms: {
      telegram: { enabled: false, link: "", chatId: "", title: "VIP Telegram" },
      // Added roleId here
      discord: {
        enabled: false,
        link: "",
        title: "Pro Discord",
        roleId: "",
      },
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
    } else if (formData.handle.length < 3) {
      newErrors.handle = "URL must be at least 3 characters";
      isValid = false;
    }

    if (formData.prices.length === 0) {
      newErrors.prices = "Add at least one plan";
      isValid = false;
    } else if (
      formData.prices.some((p) => !p.amount || parseFloat(p.amount) <= 1)
    ) {
      newErrors.prices = "All prices must be greater than $1";
      isValid = false;
      if (activeTab === "preview") setActiveTab("edit");
    }

    if (!Object.values(formData.platforms).some((p) => p.enabled)) {
      newErrors.platforms = "Select at least one platform";
      isValid = false;
    }

    if (formData.socialLinks.some((s) => !s.url.trim())) {
      newErrors.socialLinks = "Please fill in all social links or remove them.";
      isValid = false;
      if (activeTab === "preview") setActiveTab("edit");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreatePage = async (isDraft: boolean = false) => {
    if (!validateForm()) {
      alert("⚠️ Please fix the errors before saving.");
      return;
    }

    if (isDraft) setIsSavingDraft(true);
    else setIsLaunching(true);

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
        font_style: formData.fontStyle,
        button_style: formData.buttonStyle,
        social_links: formData.socialLinks,
        status: isDraft ? "draft" : "active",
      };

      let resultPageId = pageId;

      if (!pageId) {
        const { data: pageData, error: pageError } = await supabase
          .from("pages")
          .insert(pagePayload)
          .select()
          .single();
        if (pageError) throw pageError;
        resultPageId = pageData.id;
        setPageId(pageData.id);
      } else {
        const { error: pageError } = await supabase
          .from("pages")
          .update(pagePayload)
          .eq("id", pageId);
        if (pageError) throw pageError;
      }

      // 2. SMART UPSERT: Protect bot-generated data
      const { telegram, discord, whatsapp } = formData.platforms;

      // TELEGRAM
      if (telegram.enabled) {
        await supabase.from("page_telegram_config").upsert(
          {
            page_id: resultPageId,
            title: telegram.title || "VIP Telegram",
          },
          { onConflict: "page_id" },
        );
      } else {
        await supabase
          .from("page_telegram_config")
          .delete()
          .eq("page_id", resultPageId);
      }

      // DISCORD
      if (discord.enabled) {
        // Upsert allows us to save the role_id if the user typed it in,
        // without destroying the guild_id that the bot might have set.
        await supabase.from("page_discord_config").upsert(
          {
            page_id: resultPageId,
            title: discord.title || "Pro Discord",
            invite_link: discord.link || null,
            role_id: discord.roleId || null, // Saving Role ID here
          },
          { onConflict: "page_id" },
        );
      } else {
        await supabase
          .from("page_discord_config")
          .delete()
          .eq("page_id", resultPageId);
      }

      // WHATSAPP
      if (whatsapp.enabled) {
        await supabase.from("page_whatsapp_config").upsert(
          {
            page_id: resultPageId,
            invite_link: whatsapp.link,
            title: whatsapp.title,
          },
          { onConflict: "page_id" },
        );
      } else {
        await supabase
          .from("page_whatsapp_config")
          .delete()
          .eq("page_id", resultPageId);
      }

      // 3. Update Prices
      await supabase.from("page_prices").delete().eq("page_id", resultPageId);
      const priceInserts = formData.prices.map((p) => ({
        page_id: resultPageId,
        amount: parseFloat(p.amount),
        interval: p.interval || "monthly",
      }));
      await supabase.from("page_prices").insert(priceInserts);

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
      setIsSavingDraft(false);
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
          isSaving={isSavingDraft}
          supabase={supabase}
        />

        <div className={styles.actionRow}>
          <button
            className={styles.draftBtn}
            onClick={() => handleCreatePage(true)}
            disabled={isSavingDraft || isLaunching}
          >
            {isSavingDraft ? (
              <RiLoader5Line className="animate-spin" />
            ) : (
              <RiSave3Line />
            )}
            Save Draft
          </button>

          <button
            className={styles.launchBtn}
            onClick={() => handleCreatePage(false)}
            disabled={isSavingDraft || isLaunching}
          >
            {isLaunching ? (
              <>
                <RiLoader5Line className="animate-spin" /> Launching...
              </>
            ) : (
              <>
                <RiRocket2Fill /> {pageId ? "Update Live Page" : "Launch Page"}
              </>
            )}
          </button>
        </div>
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
            name={formData.pageTitle}
            bio={formData.description}
            avatarUrl={formData.avatarUrl}
            bannerUrl={formData.bannerUrl}
            handle={formData.handle}
            prices={formData.prices}
            features={formData.features}
            platforms={formData.platforms}
            socialLinks={formData.socialLinks}
            welcomeMessage={formData.welcomeMessage}
            terms={formData.terms}
            buttonText={formData.buttonText || "Subscribe"}
            themeColor={formData.themeColor}
            buttonTextColor={formData.buttonTextColor}
            buttonStyle={formData.buttonStyle}
            fontStyle={formData.fontStyle}
            viewMode={previewDevice}
          />
        </div>
      </div>
    </div>
  );
}
