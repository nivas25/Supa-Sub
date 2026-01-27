"use client";
import { useState } from "react";
import {
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiLoader5Line,
  RiCheckboxCircleFill,
  RiRefreshLine,
  RiShieldStarLine,
  RiTerminalBoxLine,
  RiRobot2Line,
  RiExternalLinkLine,
  RiInformationLine,
  RiAddLine,
  RiDeleteBinLine,
  RiErrorWarningFill,
  RiCheckDoubleLine,
  RiFileCopyLine,
  RiArrowRightSLine,
  RiMagicLine,
  RiGroupLine,
} from "react-icons/ri";
import styles from "./AccessStep.module.css";

// STRICT ORDER: 7 Days -> 30 Days -> 365 Days -> Lifetime
const ALL_INTERVALS = ["weekly", "monthly", "yearly", "lifetime"];
const INTERVAL_LABELS: Record<string, string> = {
  weekly: "7 Days",
  monthly: "30 Days",
  yearly: "365 Days",
  lifetime: "Lifetime",
};

// Ensure this ENV variable is set in .env.local
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
// NOTE: "Manage Roles" permission is critical (integer 268435456 is Manage Roles)
const DISCORD_INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=268435456&integration_type=0&scope=bot+applications.commands`;

export default function AccessStep({
  formData,
  setFormData,
  errors,
  setErrors,
  pageId,
  onSavePage,
  isSaving,
  supabase,
}: any) {
  const [copied, setCopied] = useState(false);
  const [showDcGuide, setShowDcGuide] = useState(true);
  const [showTgGuide, setShowTgGuide] = useState(true);

  // Platform States
  const [tgVerifying, setTgVerifying] = useState(false);
  const [tgStatus, setTgStatus] = useState<{
    connected: boolean;
    groupName?: string;
  } | null>(null);
  const [dcVerifying, setDcVerifying] = useState(false);
  const [dcStatus, setDcStatus] = useState<{
    connected: boolean;
    serverName?: string;
  } | null>(null);

  const usedIntervals = new Set(formData.prices.map((p: any) => p.interval));

  // --- CHECK DISCORD ---
  const checkDcConnection = async () => {
    if (!pageId || !supabase) return;
    setDcVerifying(true);
    try {
      // 1. SAVE ROLE ID FIRST
      if (formData.platforms.discord.roleId) {
        await supabase
          .from("page_discord_config")
          .upsert(
            {
              page_id: pageId,
              role_id: formData.platforms.discord.roleId,
            },
            { onConflict: "page_id" },
          )
          .select();
      }

      // 2. CHECK CONNECTION
      const { data, error } = await supabase
        .from("page_discord_config")
        .select("*")
        .eq("page_id", pageId)
        .single();

      if (error) throw error;

      if (data && data.guild_id && data.channel_id) {
        setDcStatus({
          connected: true,
          serverName: data.guild_name || "Discord Server",
        });
      } else {
        setDcStatus({ connected: false });
        alert(
          "Bot not connected yet. Make sure you ran /connect in the #verify-here channel!",
        );
      }
    } catch (err) {
      setDcStatus({ connected: false });
      alert("Connection failed. Please follow all setup steps carefully.");
    } finally {
      setDcVerifying(false);
    }
  };

  // --- CHECK TELEGRAM ---
  const checkTgConnection = async () => {
    if (!pageId || !supabase) return;
    setTgVerifying(true);
    try {
      const { data, error } = await supabase
        .from("page_telegram_config")
        .select("*")
        .eq("page_id", pageId)
        .single();
      if (data && data.chat_id) {
        setTgStatus({
          connected: true,
          groupName: data.title || "Telegram Group",
        });
      } else {
        setTgStatus({ connected: false });
        alert("Bot not found. Did you add the bot and make it ADMIN?");
      }
    } catch (err) {
      setTgStatus({ connected: false });
    } finally {
      setTgVerifying(false);
    }
  };

  const updatePlatform = (key: string, field: string, val: any) => {
    setFormData((prev: any) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: { ...prev.platforms[key], [field]: val },
      },
    }));
    if (field === "enabled" && val === true && errors.platforms)
      setErrors((prev: any) => ({ ...prev, platforms: "" }));
  };

  const getPlatformIcon = (pid: string) => {
    switch (pid) {
      case "telegram":
        return <RiTelegramFill color="#229ED9" />;
      case "discord":
        return <RiDiscordFill color="#5865F2" />;
      case "whatsapp":
        return <RiWhatsappFill color="#25D366" />;
      default:
        return null;
    }
  };

  return (
    <section
      className={`${styles.accessCard} ${errors.prices || errors.platforms ? styles.errorBorder : ""}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.stepBadge}>4</div>
        <div className={styles.headerText}>
          <h3>Access & Pricing</h3>
          <p>Configure how members join and pay.</p>
        </div>
      </div>

      <div className={styles.platformStack}>
        {["telegram", "discord", "whatsapp"].map((pid) => {
          const pData = formData.platforms[pid];
          return (
            <div
              key={pid}
              className={`${styles.platformCard} ${pData.enabled ? styles.enabledPlatform : ""}`}
            >
              <div className={styles.platHead}>
                <div className={styles.platInfo}>
                  <span className={styles.platIcon}>
                    {getPlatformIcon(pid)}
                  </span>
                  <span className={styles.platName}>{pid}</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={pData.enabled}
                    onChange={() =>
                      updatePlatform(pid, "enabled", !pData.enabled)
                    }
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              {pData.enabled && (
                <div className={styles.platBody}>
                  <div className={styles.inputGroup}>
                    <label className={styles.subLabel}>Display Name</label>
                    <input
                      className={styles.stdInput}
                      placeholder={
                        pid === "telegram"
                          ? "VIP Channel"
                          : pid === "discord"
                            ? "Pro Server"
                            : "Community Chat"
                      }
                      value={pData.title}
                      onChange={(e) =>
                        updatePlatform(pid, "title", e.target.value)
                      }
                    />
                  </div>

                  {/* === DISCORD LOGIC === */}
                  {pid === "discord" && (
                    <div className={styles.connectBox}>
                      {dcStatus?.connected ? (
                        <div className={styles.successState}>
                          <RiCheckboxCircleFill size={28} />
                          <div>
                            <h4>Connected!</h4>
                            <p>
                              Linked to: <strong>{dcStatus.serverName}</strong>
                            </p>
                          </div>
                        </div>
                      ) : pageId ? (
                        <>
                          <div
                            className={styles.guideToggle}
                            onClick={() => setShowDcGuide(!showDcGuide)}
                          >
                            <RiInformationLine />
                            <span>
                              {showDcGuide
                                ? "Hide Setup Guide"
                                : "Show Setup Guide"}
                            </span>
                            <RiArrowRightSLine
                              style={{
                                transform: showDcGuide
                                  ? "rotate(90deg)"
                                  : "none",
                                transition: "0.2s",
                              }}
                            />
                          </div>

                          {/* --- FRIENDLY SETUP GUIDE --- */}
                          {showDcGuide && (
                            <div className={styles.guideBox}>
                              <h4 className={styles.guideTitle}>
                                Setting Up Your Private Discord Server
                              </h4>
                              <p
                                style={{
                                  fontSize: "0.9rem",
                                  color: "#64748b",
                                  marginBottom: "24px",
                                  lineHeight: "1.6",
                                }}
                              >
                                Create a members-only server where content is
                                hidden until users subscribe.
                              </p>

                              <div className={styles.guideList}>
                                {/* Step 1 */}
                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>1</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Lock Your Server
                                    </strong>
                                    <p style={{ marginBottom: "6px" }}>
                                      Server Settings → Roles → @everyone
                                    </p>
                                    <p style={{ marginBottom: "10px" }}>
                                      Disable <strong>View Channels</strong>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "#64748b",
                                        padding: "8px 12px",
                                        background: "#f1f5f9",
                                        borderRadius: "6px",
                                        marginTop: "8px",
                                      }}
                                    >
                                      This hides all channels from non-members
                                      by default
                                    </p>
                                  </div>
                                </div>

                                {/* Step 2 */}
                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>2</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Create Verification Channel
                                    </strong>
                                    <p style={{ marginBottom: "6px" }}>
                                      Create channel:{" "}
                                      <code
                                        style={{
                                          background: "#f1f5f9",
                                          padding: "2px 8px",
                                          borderRadius: "4px",
                                        }}
                                      >
                                        #verify-here
                                      </code>
                                    </p>
                                    <p style={{ marginBottom: "6px" }}>
                                      Channel Settings → Permissions → @everyone
                                    </p>
                                    <p style={{ marginBottom: "10px" }}>
                                      Enable <strong>View Channel</strong> for
                                      this channel only
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "#64748b",
                                        padding: "8px 12px",
                                        background: "#f1f5f9",
                                        borderRadius: "6px",
                                        marginTop: "8px",
                                      }}
                                    >
                                      This becomes the only visible channel for
                                      new users
                                    </p>
                                  </div>
                                </div>

                                {/* Step 3 */}
                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>3</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Create Member Role
                                    </strong>
                                    <p style={{ marginBottom: "6px" }}>
                                      Server Settings → Roles → Create Role
                                    </p>
                                    <p style={{ marginBottom: "6px" }}>
                                      Name it (e.g., "Premium Member")
                                    </p>
                                    <p style={{ marginBottom: "6px" }}>
                                      Enable <strong>View Channels</strong>{" "}
                                      permission
                                    </p>
                                    <p style={{ marginBottom: "10px" }}>
                                      Right-click role → Copy Role ID
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "#f59e0b",
                                        padding: "8px 12px",
                                        background: "#fffbeb",
                                        borderRadius: "6px",
                                        marginTop: "8px",
                                      }}
                                    >
                                      <strong>Note:</strong> Enable Developer
                                      Mode in User Settings → Advanced if you
                                      don't see "Copy Role ID"
                                    </p>
                                  </div>
                                </div>

                                {/* Step 4 */}
                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>4</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Position Bot Role (Critical)
                                    </strong>
                                    <p style={{ marginBottom: "6px" }}>
                                      Server Settings → Roles
                                    </p>
                                    <p style={{ marginBottom: "10px" }}>
                                      <strong>
                                        Drag SubStarter Bot role ABOVE your
                                        Member role
                                      </strong>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "#dc2626",
                                        padding: "8px 12px",
                                        background: "#fef2f2",
                                        borderRadius: "6px",
                                        marginTop: "8px",
                                      }}
                                    >
                                      <strong>Important:</strong> Bot cannot
                                      assign roles that are positioned above it
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Connection Steps */}
                          <div className={styles.instructionList}>
                            {/* Invite Bot */}
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiRobot2Line />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  <strong>Invite the Bot</strong>
                                </p>
                                <a
                                  href={DISCORD_INVITE_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.actionLinkBtn}
                                >
                                  <RiExternalLinkLine /> Add SubStarter Bot
                                </a>
                              </div>
                            </div>

                            {/* Paste Role ID */}
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiShieldStarLine />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  <strong>Paste Your Member Role ID</strong>
                                </p>
                                <input
                                  className={styles.stdInput}
                                  style={{
                                    marginTop: 8,
                                    height: 44,
                                    fontSize: "0.9rem",
                                  }}
                                  placeholder="e.g. 123456789012345678"
                                  value={pData.roleId || ""}
                                  onChange={(e) =>
                                    updatePlatform(
                                      "discord",
                                      "roleId",
                                      e.target.value,
                                    )
                                  }
                                />
                                <p
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#64748b",
                                    marginTop: 4,
                                  }}
                                >
                                  (From Step 3 above - Right-click role → Copy
                                  ID)
                                </p>
                              </div>
                            </div>

                            {/* Run Command */}
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiTerminalBoxLine />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  <strong>Connect the Bot</strong>
                                </p>
                                <p
                                  style={{
                                    fontSize: "0.85rem",
                                    marginBottom: 8,
                                  }}
                                >
                                  Go to your <code>#verify-here</code> channel,
                                  type <code>/connect</code> and paste this
                                  code:
                                </p>
                                <div
                                  className={styles.codeBlock}
                                  onClick={() => {
                                    navigator.clipboard.writeText(pageId);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  }}
                                >
                                  <code>{pageId}</code>
                                  <div className={styles.copyBtn}>
                                    {copied ? (
                                      <RiCheckDoubleLine />
                                    ) : (
                                      <RiFileCopyLine />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            className={`${styles.verifyBtn} ${styles.discordBtn}`}
                            onClick={checkDcConnection}
                            disabled={dcVerifying}
                          >
                            {dcVerifying ? (
                              <RiLoader5Line className={styles.spin} />
                            ) : (
                              <RiRefreshLine />
                            )}{" "}
                            Check Connection
                          </button>
                        </>
                      ) : (
                        <div className={styles.generateState}>
                          <p>Generate an ID to connect Discord.</p>
                          <button
                            className={styles.generateBtn}
                            onClick={onSavePage}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <RiLoader5Line className={styles.spin} />
                            ) : (
                              <RiMagicLine />
                            )}{" "}
                            Generate ID
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* === TELEGRAM LOGIC (Unchanged) === */}
                  {pid === "telegram" && (
                    <div className={styles.connectBox}>
                      {tgStatus?.connected ? (
                        <div className={styles.successState}>
                          <RiCheckboxCircleFill size={28} />
                          <div>
                            <h4>Connected!</h4>
                            <p>
                              Linked to: <strong>{tgStatus.groupName}</strong>
                            </p>
                          </div>
                        </div>
                      ) : pageId ? (
                        <>
                          <div
                            className={styles.guideToggle}
                            onClick={() => setShowTgGuide(!showTgGuide)}
                          >
                            <RiInformationLine />
                            <span>
                              {showTgGuide
                                ? "Hide Instructions"
                                : "How to Connect"}
                            </span>
                            <RiArrowRightSLine
                              style={{
                                transform: showTgGuide
                                  ? "rotate(90deg)"
                                  : "none",
                                transition: "0.2s",
                              }}
                            />
                          </div>

                          {showTgGuide && (
                            <div className={styles.guideBox}>
                              <h4 className={styles.guideTitle}>
                                Telegram Setup
                              </h4>
                              <p
                                style={{
                                  fontSize: "0.9rem",
                                  color: "#64748b",
                                  marginBottom: "24px",
                                  lineHeight: "1.6",
                                }}
                              >
                                Connect your Telegram group to enable automatic
                                member management.
                              </p>

                              <div className={styles.guideList}>
                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>1</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Add Bot to Group
                                    </strong>
                                    <p style={{ marginBottom: "10px" }}>
                                      Open your Telegram Group and add{" "}
                                      <code
                                        style={{
                                          background: "#f1f5f9",
                                          padding: "2px 8px",
                                          borderRadius: "4px",
                                        }}
                                      >
                                        @substarter_offical_bot
                                      </code>{" "}
                                      as a member
                                    </p>
                                  </div>
                                </div>

                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>2</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Grant Admin Rights
                                    </strong>
                                    <p style={{ marginBottom: "10px" }}>
                                      Promote bot to{" "}
                                      <strong>Administrator</strong> with
                                      permission to manage members
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "#dc2626",
                                        padding: "8px 12px",
                                        background: "#fef2f2",
                                        borderRadius: "6px",
                                        marginTop: "8px",
                                      }}
                                    >
                                      <strong>Required:</strong> Bot must have
                                      admin permissions to function
                                    </p>
                                  </div>
                                </div>

                                <div className={styles.guideItem}>
                                  <span className={styles.guideNum}>3</span>
                                  <div className={styles.guideContent}>
                                    <strong
                                      style={{
                                        fontSize: "0.95rem",
                                        display: "block",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Connect Group
                                    </strong>
                                    <p style={{ marginBottom: "10px" }}>
                                      Use the command below in your group chat
                                      to link it with your page
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className={styles.instructionList}>
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiGroupLine />
                              </div>
                              <p>
                                Add <strong>@substarter_offical_bot</strong> to
                                Group.
                              </p>
                            </div>
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiShieldStarLine />
                              </div>
                              <p>
                                Promote bot to <strong>Admin</strong>.
                              </p>
                            </div>
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiTerminalBoxLine />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  Type <code>/connect</code> and paste this
                                  code:
                                </p>
                                <div
                                  className={styles.codeBlock}
                                  onClick={() => {
                                    navigator.clipboard.writeText(pageId);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  }}
                                >
                                  <code>{pageId}</code>
                                  <div className={styles.copyBtn}>
                                    {copied ? (
                                      <RiCheckDoubleLine />
                                    ) : (
                                      <RiFileCopyLine />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className={`${styles.verifyBtn} ${styles.telegramBtn}`}
                            onClick={checkTgConnection}
                            disabled={tgVerifying}
                          >
                            {tgVerifying ? (
                              <RiLoader5Line className={styles.spin} />
                            ) : (
                              <RiRefreshLine />
                            )}{" "}
                            Check Connection
                          </button>
                        </>
                      ) : (
                        <div className={styles.generateState}>
                          <p>Generate an ID to connect Telegram.</p>
                          <button
                            className={styles.generateBtn}
                            onClick={onSavePage}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <RiLoader5Line className={styles.spin} />
                            ) : (
                              <RiMagicLine />
                            )}{" "}
                            Generate ID
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* === WHATSAPP LOGIC === */}
                  {pid === "whatsapp" && (
                    <div className={styles.inputGroup}>
                      <label className={styles.subLabel}>Invite Link</label>
                      <input
                        className={styles.stdInput}
                        placeholder="https://chat.whatsapp.com/..."
                        value={pData.link}
                        onChange={(e) =>
                          updatePlatform(pid, "link", e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.divider} />

      {/* === PRICING SECTION === */}
      <div className={styles.pricingStack}>
        <div className={styles.headerText} style={{ marginBottom: 10 }}>
          <h3>Pricing</h3>
        </div>
        {formData.prices.map((p: any, idx: number) => {
          // STRICT CHECK: Amount must be > 1
          const isInvalidPrice = p.amount !== "" && parseFloat(p.amount) <= 1;
          return (
            <div key={idx} className={styles.priceRowWrapper}>
              <div
                className={`${styles.priceRow} ${isInvalidPrice ? styles.invalidRow : ""}`}
              >
                <div className={styles.moneyInputWrapper}>
                  <span className={styles.moneySymbol}>$</span>
                  <input
                    className={styles.moneyInput}
                    type="number"
                    placeholder="10"
                    value={p.amount}
                    min="1.01"
                    step="0.01"
                    onChange={(e) => {
                      const newPrices = [...formData.prices];
                      newPrices[idx].amount = e.target.value;
                      setFormData({ ...formData, prices: newPrices });
                      if (errors.prices && parseFloat(e.target.value) > 1)
                        setErrors({ ...errors, prices: "" });
                    }}
                  />
                </div>
                <select
                  className={styles.intervalSelect}
                  value={p.interval}
                  onChange={(e) => {
                    const newPrices = [...formData.prices];
                    newPrices[idx].interval = e.target.value;
                    setFormData({ ...formData, prices: newPrices });
                  }}
                >
                  {ALL_INTERVALS.map((int) => (
                    <option
                      key={int}
                      value={int}
                      disabled={usedIntervals.has(int) && int !== p.interval}
                    >
                      {INTERVAL_LABELS[int]}
                    </option>
                  ))}
                </select>
                {formData.prices.length > 1 && (
                  <button
                    className={styles.deletePlanBtn}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        prices: formData.prices.filter(
                          (_: any, i: number) => i !== idx,
                        ),
                      })
                    }
                  >
                    <RiDeleteBinLine />
                  </button>
                )}
              </div>
              {isInvalidPrice && (
                <span className={styles.miniErrorText}>
                  Price must be greater than $1
                </span>
              )}
            </div>
          );
        })}
        {errors.prices && (
          <span className={styles.errorText}>
            <RiErrorWarningFill /> {errors.prices}
          </span>
        )}

        {formData.prices.length < ALL_INTERVALS.length && (
          <button
            className={styles.addPlanBtn}
            onClick={() => {
              // Automatically pick next available interval in specific order
              const nextInterval = ALL_INTERVALS.find(
                (int) => !usedIntervals.has(int),
              );
              if (nextInterval) {
                setFormData({
                  ...formData,
                  prices: [
                    ...formData.prices,
                    { amount: "", interval: nextInterval },
                  ],
                });
              }
            }}
          >
            <RiAddLine size={18} /> Add Another Plan
          </button>
        )}
      </div>
    </section>
  );
}
