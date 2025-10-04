"use client";
import React, { useEffect, useState } from "react";
import { walletService, TopupHistoryItem } from "@/services/walletService";
import TopupHistoryTable from "./TopupHistoryTable";
import TopupHistoryCardList from "./TopupHistoryCardList";
import TopupHistorySkeleton from "./TopupHistorySkeleton";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 20;

const TopupHistorySection: React.FC = () => {
  const [transactions, setTransactions] = useState<TopupHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
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
      .getTopupHistory(page, PAGE_SIZE)
      .then((data) => {
        setTotal(data.total);
        if (isMobile && page > 1) {
          // Acumula en móvil
          setTransactions((prev) => [...prev, ...data.items]);
        } else {
          // Reemplaza en desktop o en la primera carga
          setTransactions(data.items);
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isMobile]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="w-full max-w-6xl">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        {loading ? (
          <TopupHistorySkeleton rows={5} />
        ) : (
          <TopupHistoryTable transactions={transactions} />
        )}
        {/* Paginación Desktop */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-[#FFC827] text-[#2e0327] font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            {t("previous")}
          </button>
          <button
            className="px-4 py-2 rounded bg-[#FF9C19] text-white font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading || totalPages === 0}
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
            <TopupHistoryCardList transactions={transactions} />
            {/* Botón Ver más solo si hay más páginas */}
            {page < totalPages && (
              <button
                className="w-full mt-4 px-4 py-3 rounded bg-[#FF9C19] text-white font-semibold"
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
              >
                {loading ? t("loading") : t("showMore")}
              </button>
            )}
          </>
        )}
        {/* Skeleton para loading de más páginas */}
        {loading && page > 1 && <TopupHistorySkeleton rows={3} mobile />}
      </div>
    </div>
  );
};

export default TopupHistorySection;
