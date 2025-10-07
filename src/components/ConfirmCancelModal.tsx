// src/components/wallet/ConfirmCancelModal.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface TxInfo {
  id: string;
  amount: number;
  createdAt?: string;
  address?: string;
  status?: string;
  currency?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  tx?: TxInfo;
  // Textos opcionales (puedes traducir desde el padre)
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

function formatAmount(amount: number) {
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";
  const abs = Math.abs(Number(amount) || 0);
  return `${sign}${abs.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })}`;
}

const ConfirmCancelModal: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  loading,
  tx,
  title = "Cancelar retiro",
  description = "¿Estás seguro que deseas cancelar este retiro? Esta acción no se puede deshacer.",
  confirmLabel = "Cancelar retiro",
  cancelLabel = "Mantener",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  // Cerrar con ESC y clic fuera
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    // autofocus botón confirmar
    setTimeout(() => confirmBtnRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-lg border border-[#4b2342] bg-[#2e0327] p-5 shadow-2xl"
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>

        {tx && (
          <div className="mb-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[#FFC827]">ID</span>
              <span className="text-white break-all">{tx.id}</span>
            </div>
            {tx.address && (
              <div className="flex justify-between">
                <span className="text-[#FFC827]">Address</span>
                <span className="text-white break-all">{tx.address}</span>
              </div>
            )}
            {tx.createdAt && (
              <div className="flex justify-between">
                <span className="text-[#FFC827]">Fecha</span>
                <span className="text-white">
                  {new Date(tx.createdAt).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#FFC827]">Monto</span>
              <span className="text-white">
                {formatAmount(tx.amount)} {tx.currency || "USD"}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded bg-[#4b2342] text-white font-semibold disabled:opacity-60"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmBtnRef}
            className="px-4 py-2 rounded border border-[#F05252] text-[#F05252] hover:bg-[#F05252] hover:text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Cancelando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;
