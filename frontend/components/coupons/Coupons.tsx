"use client";
import { useState } from "react";
import { RiCoupon3Line, RiAddLine } from "react-icons/ri";
import styles from "./Coupons.module.css";
import CouponCard from "./CouponCard";
import CouponModal from "./CouponModal";

// Define the data type properly
export type CouponData = {
  id: number;
  code: string;
  discount: string;
  type: "Percentage" | "Flat";
  uses: number;
  maxUses: number;
  status: "Active" | "Expired";
};

export default function Coupons() {
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponData | null>(null);

  // Mock Data
  const [coupons, setCoupons] = useState<CouponData[]>([
    {
      id: 1,
      code: "WELCOME50",
      discount: "50",
      type: "Percentage",
      uses: 124,
      maxUses: 500,
      status: "Active",
    },
    {
      id: 2,
      code: "SUMMER24",
      discount: "20",
      type: "Percentage",
      uses: 45,
      maxUses: 100,
      status: "Active",
    },
    {
      id: 3,
      code: "VIP_PASS",
      discount: "10",
      type: "Flat",
      uses: 890,
      maxUses: 1000,
      status: "Expired",
    },
    {
      id: 4,
      code: "BLACKFRIDAY",
      discount: "35",
      type: "Percentage",
      uses: 20,
      maxUses: 50,
      status: "Active",
    },
  ]);

  // Open Create Modal
  const openCreate = () => {
    setSelectedCoupon(null);
    setModalMode("create");
  };

  // Open Edit Modal
  const openEdit = (coupon: CouponData) => {
    setSelectedCoupon(coupon);
    setModalMode("edit");
  };

  // Handle Save
  const handleSave = (data: CouponData) => {
    if (modalMode === "create") {
      setCoupons([...coupons, { ...data, id: Date.now(), uses: 0 }]);
    } else {
      setCoupons(coupons.map((c) => (c.id === data.id ? data : c)));
    }
    setModalMode(null);
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    setModalMode(null);
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}>
            <RiCoupon3Line className={styles.headerIcon} />
          </div>
          <div className={styles.textStack}>
            <h1 className={styles.pageTitle}>
              Coupons<span className={styles.accentDot}>.</span>
            </h1>
            <p className={styles.subLabel}>Manage discounts & usage limits</p>
          </div>
        </div>

        <button className={styles.createBtn} onClick={openCreate}>
          New Coupon <RiAddLine />
        </button>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {/* IMPORTANT: We added 'index' here to pass to the card */}
        {coupons.map((coupon, index) => (
          <CouponCard
            key={coupon.id}
            data={coupon}
            index={index}
            onClick={() => openEdit(coupon)}
          />
        ))}
      </div>

      {/* MODAL */}
      {modalMode && (
        <CouponModal
          mode={modalMode}
          initialData={selectedCoupon}
          onClose={() => setModalMode(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
