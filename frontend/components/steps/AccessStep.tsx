"use client";
import { useState } from "react";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiCheckDoubleLine,
  RiFileCopyLine,
  RiTelegramFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiMagicLine,
  RiLoader5Line,
  RiCheckboxCircleFill,
  RiRefreshLine,
  RiErrorWarningFill,
  RiShieldStarLine,
  RiSearchLine,
  RiGroupLine,
  RiTerminalBoxLine,
  RiRobot2Line,
  RiKey2Line,
  RiExternalLinkLine,
} from "react-icons/ri";
import styles from "./AccessStep.module.css";

const ALL_INTERVALS = ["weekly", "monthly", "yearly", "lifetime"];
const INTERVAL_LABELS: Record<string, string> = {
  weekly: "7 days",
  monthly: "30 days",
  yearly: "365 days",
  lifetime: "Lifetime",
};

// YOUR BOT INVITE LINK
const DISCORD_INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=1464968205763219466&permissions=268435475&integration_type=0&scope=bot+applications.commands";

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

  // Telegram States
  const [tgVerifying, setTgVerifying] = useState(false);
  const [tgStatus, setTgStatus] = useState<{
    connected: boolean;
    groupName?: string;
  } | null>(null);

  // Discord States
  const [dcVerifying, setDcVerifying] = useState(false);
  const [dcStatus, setDcStatus] = useState<{
    connected: boolean;
    serverName?: string;
  } | null>(null);

  const usedIntervals = new Set(formData.prices.map((p: any) => p.interval));

  // --- 1. CHECK TELEGRAM ---
  const checkTgConnection = async () => {
    if (!pageId || !supabase) return;
    setTgVerifying(true);
    try {
      const { data, error } = await supabase
        .from("page_telegram_config")
        .select("*")
        .eq("page_id", pageId)
        .single();

      if (error) throw error;

      if (data && data.chat_id) {
        setTgStatus({
          connected: true,
          groupName: data.title || "Telegram Group",
        });
      } else {
        setTgStatus({ connected: false });
        alert(
          "Bot not connected yet. Did you run the /connect command in your group?",
        );
      }
    } catch (err) {
      console.error("TG Check failed", err);
      setTgStatus({ connected: false });
    } finally {
      setTgVerifying(false);
    }
  };

  // --- 2. CHECK DISCORD ---
  const checkDcConnection = async () => {
    if (!pageId || !supabase) return;
    setDcVerifying(true);
    try {
      const { data, error } = await supabase
        .from("page_discord_config")
        .select("*")
        .eq("page_id", pageId)
        .single();

      if (error) throw error;

      // Check if the bot has written the Guild ID (Server ID)
      if (data && data.guild_id) {
        setDcStatus({
          connected: true,
          serverName: data.guild_name || "Discord Server",
        });
      } else {
        setDcStatus({ connected: false });
        alert(
          "Bot not linked yet. You must run the /connect command INSIDE your Discord server.",
        );
      }
    } catch (err) {
      console.error("DC Check failed", err);
      setDcStatus({ connected: false });
    } finally {
      setDcVerifying(false);
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
    if (field === "enabled" && val === true && errors.platforms) {
      setErrors((prev: any) => ({ ...prev, platforms: "" }));
    }
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

                  {/* === TELEGRAM LOGIC === */}
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
                          <div className={styles.instructionList}>
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiSearchLine />
                              </div>
                              <p>
                                Add <strong>@mysubstarterbot</strong> to your
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
                              <p>Paste this command in the chat:</p>
                            </div>
                          </div>

                          <div
                            className={styles.codeBlock}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `/connect ${pageId}`,
                              );
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                          >
                            <code>/connect {pageId}</code>
                            <div className={styles.copyBtn}>
                              {copied ? (
                                <RiCheckDoubleLine />
                              ) : (
                                <RiFileCopyLine />
                              )}
                              <span>{copied ? "Copied" : "Copy"}</span>
                            </div>
                          </div>

                          <button
                            className={styles.verifyBtn}
                            onClick={checkTgConnection}
                            disabled={tgVerifying}
                          >
                            {tgVerifying ? (
                              <RiLoader5Line className={styles.spin} />
                            ) : (
                              <RiRefreshLine />
                            )}
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
                            )}
                            Generate Connection ID
                          </button>
                        </div>
                      )}
                    </div>
                  )}

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
                          <div className={styles.instructionList}>
                            {/* Step 1: Add Bot */}
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiRobot2Line />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  <strong>Step 1:</strong> Invite the bot to
                                  your server.
                                </p>
                                <a
                                  href={DISCORD_INVITE_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.actionLinkBtn}
                                >
                                  <RiExternalLinkLine /> Add Bot to Server
                                </a>
                              </div>
                            </div>

                            {/* Step 2: Copy ID */}
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiKey2Line />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  <strong>Step 2:</strong> Copy your connection
                                  ID.
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
                                    <span>{copied ? "Copied" : "Copy"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Step 3: Run Command */}
                            <div className={styles.stepItem}>
                              <div className={styles.stepIcon}>
                                <RiTerminalBoxLine />
                              </div>
                              <div className={styles.stepContent}>
                                <p>
                                  <strong>Step 3:</strong> Go to your Discord
                                  Server.
                                </p>
                                <p
                                  style={{
                                    fontSize: "0.85rem",
                                    color: "#64748b",
                                  }}
                                >
                                  Type <strong>/connect</strong>, select the
                                  command, and paste the ID you just copied.
                                </p>
                              </div>
                            </div>
                          </div>

                          <button
                            className={styles.verifyBtn}
                            onClick={checkDcConnection}
                            disabled={dcVerifying}
                          >
                            {dcVerifying ? (
                              <RiLoader5Line className={styles.spin} />
                            ) : (
                              <RiRefreshLine />
                            )}
                            Verify Connection
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
                            )}
                            Generate Connection ID
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
        {errors.platforms && (
          <span className={styles.errorText}>
            ⚠️ Select at least one platform.
          </span>
        )}
      </div>

      <div className={styles.divider} />

      {/* PRICING SECTION */}
      <div className={styles.pricingStack}>
        <div className={styles.headerText} style={{ marginBottom: 10 }}>
          <h3>Pricing</h3>
        </div>
        {formData.prices.map((p: any, idx: number) => {
          const isInvalid = !p.amount || parseFloat(p.amount) < 1;
          return (
            <div key={idx} className={styles.priceRow}>
              <div
                className={`${styles.moneyInputWrapper} ${isInvalid ? styles.invalidPrice : ""}`}
              >
                <span className={styles.moneySymbol}>$</span>
                <input
                  className={styles.moneyInput}
                  type="number"
                  placeholder="10"
                  value={p.amount}
                  min="1"
                  onChange={(e) => {
                    if (parseFloat(e.target.value) < 0) return;
                    const newPrices = [...formData.prices];
                    newPrices[idx].amount = e.target.value;
                    setFormData({ ...formData, prices: newPrices });
                    if (errors.prices && parseFloat(e.target.value) >= 1)
                      setErrors((prev: any) => ({ ...prev, prices: "" }));
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
                {ALL_INTERVALS.map((int) => {
                  const isDisabled =
                    usedIntervals.has(int) && int !== p.interval;
                  return (
                    <option key={int} value={int} disabled={isDisabled}>
                      {isDisabled
                        ? `(Added) ${INTERVAL_LABELS[int]}`
                        : `/ ${INTERVAL_LABELS[int]}`}
                    </option>
                  );
                })}
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
          );
        })}
        {errors.prices && (
          <span className={styles.errorText}>
            <RiErrorWarningFill /> Price must be at least $1.
          </span>
        )}
        {formData.prices.length < ALL_INTERVALS.length && (
          <button
            className={styles.addPlanBtn}
            onClick={() => {
              const next = ALL_INTERVALS.find(
                (i) => !formData.prices.some((p: any) => p.interval === i),
              );
              if (next)
                setFormData({
                  ...formData,
                  prices: [...formData.prices, { amount: "", interval: next }],
                });
            }}
          >
            <RiAddLine size={18} /> Add Another Plan
          </button>
        )}
      </div>
    </section>
  );
}
