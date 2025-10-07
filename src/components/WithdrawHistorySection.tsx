/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  withdrawService,
  WithdrawListItem,
  WithdrawListResponse,
} from "@/services/withdrawService";
import { LedgerTransaction, TransactionKind } from "@/services/walletService";

import WithdrawHistoryTable from "./WithdrawHistoryTable";
import WithdrawHistoryCardList from "./WithdrawHistoryCardList";
import TopupHistorySkeleton from "./TopupHistorySkeleton";
import ConfirmCancelModal from "./ConfirmCancelModal";

const PAGE_SIZE = 10;

type UITransactionItem = LedgerTransaction & {
  currency: string;
  status?: "completed" | "pending" | "failed" | string;
  kind: TransactionKind | "withdraw";
  raw?: WithdrawListItem;
  address?: string; // práctico para el modal
};

function normalizeStatus(
  raw: unknown
): "completed" | "pending" | "failed" | string {
  if (typeof raw !== "string") return "completed";
  const s = raw.toLowerCase();
  if (
    [
      "completed",
      "complete",
      "success",
      "succeeded",
      "ok",
      "done",
      "approved",
    ].includes(s)
  )
    return "completed";
  if (
    [
      "pending",
      "processing",
      "in_progress",
      "in-progress",
      "awaiting",
      "queued",
    ].includes(s)
  )
    return "pending";
  if (
    [
      "failed",
      "error",
      "declined",
      "rejected",
      "canceled",
      "cancelled",
    ].includes(s)
  )
    return "cancelled";
  return s;
}

function mapWithdrawItem(it: WithdrawListItem): UITransactionItem {
  const rawAmount = Number(it.amount ?? 0);
  return {
    id: String(it.id),
    amount: rawAmount > 0 ? -Math.abs(rawAmount) : Number(rawAmount) || 0,
    balanceAfter: 0,
    createdAt: String(it.created_at),
    meta: { address: it.address, userid: it.userid, status: it.status },
    kind: "withdraw",
    currency: "USD",
    status: normalizeStatus(it.status),
    raw: it,
    address: it.address,
  };
}

const WithdrawHistorySection: React.FC = () => {
  const { t } = useTranslation();

  const [allItems, setAllItems] = useState<UITransactionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  // Modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<UITransactionItem | null>(null);

  const [page, setPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const data: WithdrawListResponse = await withdrawService.list();
      setAllItems(data.map(mapWithdrawItem));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Abre modal (desde los hijos)
  const handleCancelClick = (tx: UITransactionItem) => {
    if (tx.status !== "pending") return;
    setSelectedTx(tx);
    setConfirmOpen(true);
  };

  // Confirmar cancelación
  const confirmCancel = async () => {
    if (!selectedTx) return;
    try {
      setCancelingId(selectedTx.id);
      await withdrawService.cancelCurrent();
      setConfirmOpen(false);
      setSelectedTx(null);
      await fetchList();
    } catch (e) {
      console.error(e);
      alert(t("somethingWentWrong") || "Ocurrió un error");
    } finally {
      setCancelingId(null);
    }
  };

  // Paginación en cliente
  const { pageItems, totalPages } = useMemo(() => {
    const total = allItems.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (isMobile) {
      const end = Math.min(page * PAGE_SIZE, total);
      return { pageItems: allItems.slice(0, end), totalPages };
    } else {
      const start = (page - 1) * PAGE_SIZE;
      const end = Math.min(start + PAGE_SIZE, total);
      return { pageItems: allItems.slice(start, end), totalPages };
    }
  }, [allItems, page, isMobile]);

  return (
    <div className="w-full max-w-6xl">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        {loading && page === 1 ? (
          <TopupHistorySkeleton rows={5} />
        ) : (
          <WithdrawHistoryTable
            transactions={pageItems}
            onCancel={handleCancelClick} // ahora solo abre el modal
            cancelingId={cancelingId}
          />
        )}

        {/* Paginación Desktop */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-[#FFC827] text-[#2e0327] font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading || totalPages <= 1}
          >
            {t("previous")}
          </button>
          <button
            className="px-4 py-2 rounded bg-[#FF9C19] text-white font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages || 1, p + 1))}
            disabled={page === totalPages || loading || totalPages <= 1}
          >
            {t("next")}
          </button>
          <span className="ml-4 text-sm text-white self-center">
            {t("page")} {page} {t("of")} {totalPages || 1}
          </span>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {loading && page === 1 ? (
          <TopupHistorySkeleton rows={5} mobile />
        ) : (
          <>
            <WithdrawHistoryCardList
              transactions={pageItems}
              onCancel={handleCancelClick} // abre modal
              cancelingId={cancelingId}
            />
            <div className="flex gap-2">
              {isMobile && page > 1 && (
                <button
                  className="w-1/2 mt-4 px-4 py-3 rounded bg-[#4b2342] text-white font-semibold"
                  onClick={() => setPage(1)}
                  disabled={loading}
                >
                  {t("showLess") || "Ver menos"}
                </button>
              )}
              {page < totalPages && (
                <button
                  className={`mt-4 px-4 py-3 rounded bg-[#FF9C19] text-white font-semibold ${
                    page > 1 ? "w-1/2" : "w-full"
                  }`}
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                >
                  {loading ? t("loading") : t("showMore")}
                </button>
              )}
            </div>
          </>
        )}
        {loading && page > 1 && <TopupHistorySkeleton rows={3} mobile />}
      </div>

      {/* Modal de confirmación */}
      <ConfirmCancelModal
        open={confirmOpen}
        onClose={() => {
          if (!cancelingId) {
            setConfirmOpen(false);
            setSelectedTx(null);
          }
        }}
        onConfirm={confirmCancel}
        loading={Boolean(cancelingId)}
        tx={
          selectedTx
            ? {
                id: selectedTx.id,
                amount: selectedTx.amount,
                createdAt: selectedTx.createdAt,
                address:
                  selectedTx.address || (selectedTx.meta as any)?.address,
                currency: selectedTx.currency || "USD",
                status: selectedTx.status,
              }
            : undefined
        }
        title={t("cancelWithdrawTitle") || "Cancelar retiro"}
        description={
          t("cancelWithdrawDesc") ||
          "¿Estás seguro que deseas cancelar este retiro? Esta acción no se puede deshacer."
        }
        confirmLabel={t("cancelWithdraw") || "Cancelar retiro"}
        cancelLabel={t("keep") || "Mantener"}
      />
    </div>
  );
};

export default WithdrawHistorySection;
