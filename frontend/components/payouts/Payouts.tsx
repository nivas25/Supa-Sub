"use client";
import { useState } from "react";
import styles from "./Payouts.module.css";

import Header from "./Header";
import WalletCard from "./WalletCard";
import PayoutMethod from "./PayoutMethod";
import TransactionHistory from "./TransactionHistory";

export default function Payouts() {
  const [isLinked, setIsLinked] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => setIsWithdrawing(false), 2000);
  };

  const handleConnect = () => setIsLinked(true);
  const handleDisconnect = () => setIsLinked(false);

  return (
    <div className={styles.payoutsWrapper}>
      <Header />

      <div className={styles.gridContainer}>
        {/* 1. WALLET (Top Left on Desktop / Top on Mobile) */}
        <div className={styles.areaWallet}>
          <WalletCard
            isLinked={isLinked}
            isWithdrawing={isWithdrawing}
            onWithdraw={handleWithdraw}
          />
        </div>

        {/* 2. METHOD (Top Right on Desktop / Middle on Mobile) */}
        <div className={styles.areaMethod}>
          <PayoutMethod
            isLinked={isLinked}
            accountId={accountId}
            setAccountId={setAccountId}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </div>

        {/* 3. HISTORY (Bottom Left on Desktop / Bottom on Mobile) */}
        <div className={styles.areaHistory}>
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
