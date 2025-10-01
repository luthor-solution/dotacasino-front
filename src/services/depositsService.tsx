// src/services/depositsService.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// Tipos existentes
export type DepositNetwork = "BSC" | "TRX" | "ETH" | "POLYGON";

export interface CreateDepositQRPayload {
  amount: number;
  network: DepositNetwork;
}

export interface DepositQRResponse {
  userid: string;
  amount: number;
  expires_at: string; // ISO string
  address: string;
  qrcode_url: string;
  network: "BSC" | "TRX" | "ETH" | "POLYGON";
  created_at: {
    _seconds: number;
    _nanoseconds: number;
  };
  status: "pending" | "completed" | "expired" | "failed" | string; // amplía según estados reales
}

// Payload para polling (lo que pediste)
export interface DepositPollingPayload {
  address: string; // dirección a validar
}

// Respuesta de polling (dejamos any hasta tener el schema)
export type DepositPollingResponse = "OK" | "NO";

export const depositService = {
  // POST /deposit-coins/create-qr
  async createQR(
    payload: CreateDepositQRPayload,
    retry = true
  ): Promise<DepositQRResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/deposit-coins/create-qr`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return await depositService.createQR(payload, false);
      }
      throw error;
    }
  },

  // GET /deposit-coins/qr
  async getCurrentQR(retry = true): Promise<DepositQRResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.get(`${API_BASE_URL}/deposit-coins/qr`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return await depositService.getCurrentQR(false);
      }
      throw error;
    }
  },

  // DELETE /deposit-coins/cancel-qr
  async cancelCurrentQR(retry = true): Promise<void> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      await axios.delete(`${API_BASE_URL}/deposit-coins/cancel-qr`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return await depositService.cancelCurrentQR(false);
      }
      throw error;
    }
  },

  // POST /deposit-coins/polling  -> Validar estado de la transacción para una address
  async polling(
    payload: DepositPollingPayload,
    retry = true
  ): Promise<DepositPollingResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/deposit-coins/polling`,
        payload, // { address: string }
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return await depositService.polling(payload, false);
      }
      throw error;
    }
  },
};
