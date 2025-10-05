// src/services/walletService.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export interface WalletResponse {
  currency: string;
  balance: number;
}

export interface TopupHistoryItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface TopupHistoryResponse {
  items: TopupHistoryItem[];
  total: number;
  page: number;
  pageSize: number;
}

export type TransactionKind = "spin-game" | "USER_TOPUP" | "bonus" | "withdraw";

// Meta es flexible: agrego campos comunes vistos y dejo un índice para otros
export interface LedgerMeta {
  // Campos comunes en spin-game
  bet?: string;
  cmd?: string;
  key?: string;
  win?: string;
  date?: string; // "YYYY-MM-DD HH:mm:ss"
  hall?: string;
  login?: string;
  action?: string; // e.g. "spin"
  gameId?: string;
  matrix?: string;
  betInfo?: string; // JSON string
  tradeId?: string;
  winLose?: number;
  WinLines?: string; // JSON string
  sessionId?: string;
  ticket_id?: string;
  round_finished?: string; // "true"/"false"

  // Campos comunes en USER_TOPUP / bonus / withdraw
  note?: string;
  actor?: string;
  ticket?: string;

  // Permite cualquier otra clave que pueda venir
  [key: string]: unknown;
}

// Una transacción individual (ítem del arreglo 'items')
export interface LedgerTransaction {
  id: string;
  kind: TransactionKind;
  amount: number; // positivo o negativo
  balanceAfter: number;
  meta?: LedgerMeta; // opcional
  createdAt: string; // ISO 8601, ej. "2025-10-04T23:52:37.680Z"
  status: string;
  currency: string;
}

// Respuesta completa del endpoint /wallet/ledger
export interface TransactionHistoryResponse {
  page: number;
  pageSize: number;
  total: number;
  items: LedgerTransaction[];
}

export const walletService = {
  async getWallet(retry = true): Promise<WalletResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get(`${API_BASE_URL}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data as WalletResponse;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        try {
          await userService.refreshToken();
          // Vuelve a intentar solo una vez
          return await walletService.getWallet(false);
        } catch {
          // El logout ya se maneja en refreshToken si falla
        }
      }
      throw error;
    }
  },

  async TransactionHistory(
    page: number = 1,
    pageSize: number = 20,
    retry = true
  ): Promise<TransactionHistoryResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/wallet/ledger?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data as TransactionHistoryResponse;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        try {
          await userService.refreshToken();
          // Vuelve a intentar solo una vez
          return await walletService.TransactionHistory(page, pageSize, false);
        } catch {
          // El logout ya se maneja en refreshToken si falla
        }
      }
      throw error;
    }
  },

  async getTopupHistory(
    page: number = 1,
    pageSize: number = 20,
    retry = true
  ): Promise<TopupHistoryResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/wallet/topup/history?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data as TopupHistoryResponse;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        try {
          await userService.refreshToken();
          // Vuelve a intentar solo una vez
          return await walletService.getTopupHistory(page, pageSize, false);
        } catch {
          // El logout ya se maneja en refreshToken si falla
        }
      }
      throw error;
    }
  },
};
