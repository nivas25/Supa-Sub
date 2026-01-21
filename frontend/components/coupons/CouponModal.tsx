"use client";
import { useState, useEffect } from "react";
import {
  RiCloseLine,
  RiMagicLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiHistoryLine,
} from "react-icons/ri";
import styles from "./CouponModal.module.css";
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

  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    setForm((prev) => ({ ...prev, code: random }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.discount) return;

    const finalData = {
      ...form,
      type: "Percentage" as const,
      status: mode === "create" ? "Active" : form.status,
    };

    onSave(finalData as CouponData);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitle}>
            <h2>{mode === "create" ? "New Coupon" : "Edit Coupon"}</h2>
            <p>Percentage discount & limits.</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <RiCloseLine size={24} />
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          {/* 1. CODE */}
          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label className={styles.fieldLabel}>Coupon Code</label>
              <button
                type="button"
                className={styles.generateBtn}
                onClick={generateCode}
              >
                <RiMagicLine /> Randomize
              </button>
            </div>
            <input
              className={styles.inputCode}
              placeholder="SUMMER25"
              value={form.code}
              onChange={(e) =>
                setForm({
                  ...form,
                  code: e.target.value.toUpperCase().replace(/\s/g, ""),
                })
              }
              autoFocus={mode === "create"}
              maxLength={15}
            />
          </div>

          {/* 2. VALUE & LIMITS */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Discount</label>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="20"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: e.target.value })
                  }
                  min="1"
                  max="100"
                />
                <span className={styles.suffixIcon}>%</span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Usage Limit</label>
              <input
                className={styles.input}
                type="number"
                placeholder="∞"
                value={form.maxUses}
                onChange={(e) =>
                  setForm({ ...form, maxUses: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {/* 3. STATUS (Edit Only) */}
          {mode === "edit" && (
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Status</label>

              <div className={styles.statusContainer}>
                <button
                  type="button"
                  className={
                    form.status === "Active"
                      ? styles.statusActive
                      : styles.statusOption
                  }
                  onClick={() => setForm({ ...form, status: "Active" })}
                >
                  <RiCheckLine /> Active
                </button>
                <button
                  type="button"
                  className={
                    form.status === "Expired"
                      ? styles.statusExpired
                      : styles.statusOption
                  }
                  onClick={() => setForm({ ...form, status: "Expired" })}
                >
                  <RiCloseLine /> Expired
                </button>
              </div>

              <div className={styles.editMeta}>
                <RiHistoryLine size={16} color="#64748b" />
                <span>
                  Redeemed <strong>{form.uses}</strong> of{" "}
                  <strong>{form.maxUses}</strong> times.
                </span>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className={styles.modalFooter}>
            {mode === "edit" && initialData ? (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => onDelete(initialData.id)}
                title="Delete"
              >
                <RiDeleteBinLine size={22} />
              </button>
            ) : (
              <div></div>
            )}

            <div className={styles.actionsRight}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveBtn}>
                {mode === "create" ? "Create" : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
