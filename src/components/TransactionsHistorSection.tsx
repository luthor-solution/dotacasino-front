"use client";
import React, { useEffect, useState } from "react";
import {
  walletService,
  LedgerTransaction,
  TransactionKind,
  TransactionHistoryResponse,
} from "@/services/walletService";
import { useTranslation } from "react-i18next";
import TransactionHistoryTable from "./TransactionHistoryTable";
import TopupHistorySkeleton from "./TopupHistorySkeleton";
import TransactionsHistoryCardList from "./TransactionsHistoryCardList";

const PAGE_SIZE = 15;

// UI extiende el shape del backend (LedgerTransaction) para que sea asignable
// donde esperan LedgerTransaction[], y añadimos campos de presentación.
type UITransactionItem = LedgerTransaction & {
  currency: string; // no llega del backend; por defecto "USD"
  status: "completed" | "pending" | "failed" | string; // por defecto "completed"
};

function isGameMeta(meta: unknown): boolean {
  if (!meta || typeof meta !== "object") return false;
  const m = meta as Record<string, unknown>;
  const gameKeys = [
    "cmd",
    "action",
    "gameId",
    "matrix",
    "tradeId",
    "WinLines",
    "sessionId",
    "round_finished",
    "ticket_id",
  ];
  return gameKeys.some((k) => m[k] !== undefined) || m["action"] === "spin";
}

// Siempre devuelve TransactionKind (no opcional)
function deriveKind(it: Partial<LedgerTransaction>): TransactionKind {
  if (it.kind) return it.kind;

  const amount = Number(it.amount ?? 0);
  const meta = it.meta as Record<string, unknown> | undefined;
  const note = (meta?.note as string | undefined)?.toLowerCase?.() ?? "";
  const actor = (meta?.actor as string | undefined)?.toLowerCase?.() ?? "";

  if (isGameMeta(meta)) return "spin-game";
  if (
    note.includes("recarga") ||
    note.includes("deposit") ||
    actor.includes("client-api")
  ) {
    return "USER_TOPUP";
  }
  // Fallback determinístico
  return amount < 0 ? "withdraw" : "bonus";
}

function mapToUIItem(it: Partial<LedgerTransaction>): UITransactionItem {
  return {
    // LedgerTransaction (obligatorios)
    id: String(it.id ?? ""),
    amount: Number(it.amount ?? 0),
    balanceAfter: Number((it as LedgerTransaction).balanceAfter ?? 0),
    createdAt: String(it.createdAt ?? new Date().toISOString()),
    kind: deriveKind(it),
    meta: it.meta,

    // Campos de presentación para la UI
    currency: "USD",
    status: "completed",
  };
}

function mapLedger(response: TransactionHistoryResponse): {
  items: UITransactionItem[];
  total: number;
  page: number;
  pageSize: number;
} {
  const itemsRaw = Array.isArray(response?.items) ? response.items : [];
  const items = itemsRaw.map(mapToUIItem);
  return {
    items,
    total: Number(response?.total ?? items.length),
    page: Number(response?.page ?? 1),
    pageSize: Number(response?.pageSize ?? PAGE_SIZE),
  };
}

const TransactionsHistorSection: React.FC = () => {
  const [transactions, setTransactions] = useState<UITransactionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [serverPageSize, setServerPageSize] = useState<number>(PAGE_SIZE);
  const { t } = useTranslation();

  // Detecta si es móvil
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLoading(true);
    walletService
      .TransactionHistory(page, PAGE_SIZE)
      .then((data) => {
        const {
          items,
          total,
          page: respPage,
          pageSize,
        } = mapLedger(data as TransactionHistoryResponse);
        setTotal(total);
        setServerPageSize(pageSize || PAGE_SIZE);

        if (isMobile && page > 1 && respPage === page) {
          // En móvil acumulamos las páginas, evitando duplicados
          setTransactions((prev) => {
            const prevIds = new Set(prev.map((p) => p.id));
            const newItems = items.filter((i) => !prevIds.has(i.id));
            return [...prev, ...newItems];
          });
        } else {
          // Desktop o primera página en móvil
          setTransactions(items);
        }
      })
      .finally(() => setLoading(false));
  }, [page, isMobile]);

  const totalPages = Math.max(
    1,
    Math.ceil((total || 0) / (serverPageSize || PAGE_SIZE))
  );

  return (
    <div className="w-full max-w-6xl">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        {loading && page === 1 ? (
          <TopupHistorySkeleton rows={5} />
        ) : (
          <TransactionHistoryTable transactions={transactions} />
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
            <TransactionsHistoryCardList transactions={transactions} />
            <div className="flex gap-2">
              {/* Ver menos: vuelve a la primera página */}
              {page > 1 && (
                <button
                  className="w-1/2 mt-4 px-4 py-3 rounded bg-[#4b2342] text-white font-semibold"
                  onClick={() => setPage(1)}
                  disabled={loading}
                >
                  {t("showLess") || "Ver menos"}
                </button>
              )}
              {/* Ver más: solo si hay más páginas */}
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
        {/* Skeleton para loading de más páginas */}
        {loading && page > 1 && <TopupHistorySkeleton rows={3} mobile />}
      </div>
    </div>
  );
};

export default TransactionsHistorSection;
