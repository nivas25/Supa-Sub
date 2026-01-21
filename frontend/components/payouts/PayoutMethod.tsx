"use client";
import {
  RiBankCardLine,
  RiLinkUnlinkM,
  RiCheckDoubleFill,
  RiInformationLine,
  RiArrowRightLine,
} from "react-icons/ri";
import styles from "./PayoutMethod.module.css";

interface PayoutMethodProps {
  isLinked: boolean;
  accountId: string;
  setAccountId: (id: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function PayoutMethod({
  isLinked,
  accountId,
  setAccountId,
  onConnect,
  onDisconnect,
}: PayoutMethodProps) {
  return (
    <div className={styles.methodCard}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}>
            <RiBankCardLine />
          </div>
          <span>Payout Destination</span>
        </div>
        {isLinked && (
          <div className={styles.statusBadge}>
            <div className={styles.dot}></div> Active
          </div>
        )}
      </div>

      <div className={styles.body}>
        {isLinked ? (
          // STATE A: CONNECTED
          <div className={styles.connectedState}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Routing to Razorpay ID</span>
              <div className={styles.idDisplay}>
                <span className={styles.codeText}>acc_8842_xa_991</span>
                <RiCheckDoubleFill className={styles.checkIcon} />
              </div>
            </div>

            <button className={styles.disconnectBtn} onClick={onDisconnect}>
              <RiLinkUnlinkM /> <span>Disconnect</span>
            </button>
          </div>
        ) : (
          // STATE B: CONNECT FORM
          <div className={styles.connectForm}>
            <div className={styles.inputStack}>
              <label htmlFor="payoutId" className={styles.inputLabel}>
                Razorpay Route ID
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="payoutId"
                  type="text"
                  placeholder="e.g. acc_83n..."
                  className={styles.input}
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles.actionRow}>
              <a href="#" className={styles.helpLink}>
                <RiInformationLine /> Where do I find this?
              </a>
              <button
                className={styles.connectBtn}
                onClick={onConnect}
                disabled={!accountId}
              >
                Connect Account <RiArrowRightLine />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
