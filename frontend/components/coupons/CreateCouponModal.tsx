"use client";
import { useState, useEffect } from "react";
import {
  RiCloseLine,
  RiSave3Line,
  RiDeleteBinLine,
  RiHistoryLine,
} from "react-icons/ri";
import styles from "./Coupons.module.css";
import { CouponData } from "./Coupons";

interface ModalProps {
  mode: "create" | "edit";
  initialData: CouponData | null;
  onClose: () => void;
  onSave: (data: CouponData) => void;
  onDelete: (id: number) => void;
}

export default function CouponModal({
  mode,
  initialData,
  onClose,
  onSave,
  onDelete,
}: ModalProps) {
  const [form, setForm] = useState<Partial<CouponData>>({
    code: "",
    discount: "",
    type: "Percentage",
    maxUses: 100,
    status: "Active",
    uses: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.discount) return;

    // Ensure status is active for new coupons if not specified
    const finalData = {
      ...form,
      status: form.status || "Active",
    };

    onSave(finalData as CouponData);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h2>{mode === "create" ? "Create New Coupon" : "Edit Coupon"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <RiCloseLine size={24} />
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          {/* CODE INPUT */}
          <div className={styles.fieldGroup}>
            <label>Coupon Code</label>
            <input
              className={styles.inputBig}
              placeholder="SUMMER24"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              autoFocus={mode === "create"}
            />
          </div>

          {/* DISCOUNT ROW */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Discount Value</label>
              <input
                className={styles.input}
                type="number"
                placeholder="20"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Type</label>
              <select
                className={styles.select}
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as any })
                }
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Flat">Flat Amount ($)</option>
              </select>
            </div>
          </div>

          {/* LIMITS (Removed Status Field) */}
          <div className={styles.fieldGroup}>
            <label>Usage Limit (Max Uses)</label>
            <input
              className={styles.input}
              type="number"
              value={form.maxUses}
              onChange={(e) =>
                setForm({ ...form, maxUses: parseInt(e.target.value) })
              }
              placeholder="e.g. 100"
            />
          </div>

          {/* USAGE STATS (Only in Edit Mode) */}
          {mode === "edit" && form.uses !== undefined && (
            <div className={styles.statsBox}>
              <RiHistoryLine />
              <span>
                Used <strong>{form.uses}</strong> times out of{" "}
                <strong>{form.maxUses}</strong>.
              </span>
            </div>
          )}

          {/* ACTIONS */}
          <div className={styles.modalActions}>
            {mode === "edit" && initialData ? (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => onDelete(initialData.id)}
              >
                <RiDeleteBinLine /> Delete
              </button>
            ) : (
              <div></div> /* Spacer */
            )}

            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveBtn}>
                {mode === "create" ? "Create Coupon" : "Save Changes"}{" "}
                <RiSave3Line />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
