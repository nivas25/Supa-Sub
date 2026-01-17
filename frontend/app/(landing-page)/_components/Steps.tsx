"use client";
import React from "react";
import styles from "./Steps.module.css";
import {
  RiCustomerService2Fill,
  RiSendPlaneFill,
  RiFlashlightFill,
  RiWhatsappFill,
  RiTelegramFill,
  RiDiscordFill,
  RiLinkM,
  RiBankCardLine,
  RiUserFollowFill,
} from "react-icons/ri";

export default function Steps() {
  return (
    <section className={styles.wrapper} id="steps">
      <div className={styles.container}>
        {/* SPLIT LAYOUT */}
        <div className={styles.splitGrid}>
          {/* LEFT: Sticky Text */}
          <div className={styles.leftContent}>
            <div className={styles.badge}>
              <RiFlashlightFill style={{ marginRight: 6 }} />
              SETUP GUIDE
            </div>

            <h2 className={styles.title}>
              It’s not magic.
              <br />
              It’s a <span className={styles.serifHighlight}>workflow</span>.
            </h2>

            <p className={styles.subtitle}>
              Our support team guides you through the configuration
              step-by-step. You stay in control, we handle the infrastructure.
            </p>

            {/* Visual Steps List */}
            <div className={styles.roadmapList}>
              <div className={`${styles.roadmapItem} ${styles.active}`}>
                <div className={styles.stepNum}>1</div>
                <span>Connect Community</span>
              </div>
              <div className={`${styles.roadmapItem} ${styles.active}`}>
                <div className={styles.stepNum}>2</div>
                <span>Verify Ownership</span>
              </div>
              <div className={`${styles.roadmapItem} ${styles.active}`}>
                <div className={styles.stepNum}>3</div>
                <span>Configure Pricing</span>
              </div>
              <div className={`${styles.roadmapItem} ${styles.active}`}>
                <div className={styles.stepNum}>4</div>
                <span>Receive Payouts</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Chat Window */}
          <div className={styles.rightContent}>
            <div className={styles.chatWindow}>
              {/* Header */}
              <div className={styles.windowHeader}>
                <div className={styles.agentInfo}>
                  <div className={styles.agentAvatar}>
                    <RiCustomerService2Fill />
                    <div className={styles.onlineStatus} />
                  </div>
                  <div className={styles.agentDetails}>
                    <span className={styles.agentName}>Alex (Support)</span>
                    <span className={styles.ticketId}>Ticket #SETUP-2026</span>
                  </div>
                </div>
                <div className={styles.windowControls}>
                  <div
                    className={styles.controlDot}
                    style={{ background: "#ff5f56" }}
                  />
                  <div
                    className={styles.controlDot}
                    style={{ background: "#ffbd2e" }}
                  />
                  <div
                    className={styles.controlDot}
                    style={{ background: "#27c93f" }}
                  />
                </div>
              </div>

              {/* Messages */}
              <div className={styles.messageStream}>
                {/* --- 1. CONNECT --- */}
                <div className={styles.userRow}>
                  <div className={styles.userBubble}>
                    <span className={styles.userLabel}>You</span>
                    Hi Alex, I want to monetize my Telegram group.
                  </div>
                </div>

                <div className={styles.supportRow}>
                  <div className={styles.supportIcon}>
                    <RiCustomerService2Fill />
                  </div>
                  <div className={styles.supportContent}>
                    <div className={styles.supportBubble}>
                      I can help with that. First, select your platform below so
                      we can initiate the connection protocol.
                    </div>
                    <div className={styles.actionCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>
                          STEP 1: SELECT PLATFORM
                        </span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.platformGrid}>
                          <div className={styles.platBtn}>
                            <RiWhatsappFill size={24} />{" "}
                            <span className={styles.platLabel}>WhatsApp</span>
                          </div>
                          <div className={`${styles.platBtn} ${styles.active}`}>
                            <RiTelegramFill size={24} />{" "}
                            <span className={styles.platLabel}>Telegram</span>
                          </div>
                          <div className={styles.platBtn}>
                            <RiDiscordFill size={24} />{" "}
                            <span className={styles.platLabel}>Discord</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- 2. VERIFY --- */}
                <div className={styles.userRow}>
                  <div className={styles.userBubble}>
                    <span className={styles.userLabel}>You</span>
                    Selected. How do you know it's my group?
                  </div>
                </div>

                <div className={styles.supportRow}>
                  <div className={styles.supportIcon}>
                    <RiCustomerService2Fill />
                  </div>
                  <div className={styles.supportContent}>
                    <div className={styles.supportBubble}>
                      Paste your <b>Group Invite Link</b> below. Our system will
                      check for admin rights instantly.
                    </div>
                    <div className={styles.actionCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>
                          STEP 2: VERIFICATION
                        </span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.inputVisual}>
                          <span className={styles.label}>INVITE LINK</span>
                          <div className={styles.inputBox}>
                            <RiLinkM style={{ marginRight: 8, opacity: 0.5 }} />
                            t.me/+7382_private_vip
                          </div>
                          <div className={styles.connectBtn}>
                            VERIFY CHANNEL
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- 3. PRICING --- */}
                <div className={styles.userRow}>
                  <div className={styles.userBubble}>
                    <span className={styles.userLabel}>You</span>
                    Verified! I want to charge $25 per month.
                  </div>
                </div>

                <div className={styles.supportRow}>
                  <div className={styles.supportIcon}>
                    <RiCustomerService2Fill />
                  </div>
                  <div className={styles.supportContent}>
                    <div className={styles.supportBubble}>
                      Perfect. Configure your subscription product below.
                    </div>
                    <div className={styles.actionCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>STEP 3: CONFIG</span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.priceVisual}>
                          <div className={styles.priceBox}>
                            <span className={styles.priceVal}>$ 25.00</span>
                            <span className={styles.priceSub}>Price</span>
                          </div>
                          <div className={styles.priceBox}>
                            <span className={styles.priceVal}>Monthly</span>
                            <span className={styles.priceSub}>Billing</span>
                          </div>
                        </div>
                        <div
                          className={styles.connectBtn}
                          style={{
                            marginTop: 10,
                            background: "#25D366",
                            color: "#000",
                          }}
                        >
                          PUBLISH PAGE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- 4. PAYOUT LOGIC (Updated Copy) --- */}
                <div className={styles.userRow}>
                  <div className={styles.userBubble}>
                    <span className={styles.userLabel}>You</span>
                    How exactly does the 5% fee work?
                  </div>
                </div>

                <div className={styles.supportRow}>
                  <div className={styles.supportIcon}>
                    <RiCustomerService2Fill />
                  </div>
                  <div className={styles.supportContent}>
                    <div className={styles.supportBubble}>
                      We charge a flat <b>5% fee on each subscription</b>{" "}
                      transaction. The remaining 95% is transferred directly to
                      you. Here is an example of a single sale:
                    </div>
                    <div className={styles.actionCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>
                          STEP 4: TRANSACTION RECEIPT
                        </span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.payoutReceipt}>
                          <div className={styles.transactionHeader}>
                            <RiUserFollowFill
                              style={{
                                verticalAlign: "middle",
                                marginRight: 4,
                              }}
                            />
                            New Subscriber: "Alex"
                          </div>
                          <div className={styles.receiptRow}>
                            <span>User Paid</span>
                            <span>$25.00</span>
                          </div>
                          <div className={`${styles.receiptRow} ${styles.fee}`}>
                            <span>Platform Fee (5%)</span>
                            <span>- $1.25</span>
                          </div>
                          <div
                            className={`${styles.receiptRow} ${styles.total}`}
                          >
                            <span>NET TO YOU</span>
                            <span className={styles.highlightGreen}>
                              $23.75
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              color: "#888",
                              marginTop: 6,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <RiBankCardLine /> Instant Allocation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={styles.chatFooter}>
                <div className={styles.fakeInput}>
                  That's clear. I'm ready to start...
                </div>
                <div className={styles.sendBtn}>
                  <RiSendPlaneFill size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
