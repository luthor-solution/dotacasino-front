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
