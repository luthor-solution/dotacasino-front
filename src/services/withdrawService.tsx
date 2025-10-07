// src/services/withdrawService.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export interface CreateWithdrawPayload {
  amount: number;
  address: string;
}

// Status posibles (dejamos abierto por si el backend agrega otros)
export type WithdrawStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "canceled"
  | "cancelled"
  | "failed"
  | "processing"
  | "queued"
  | string;

export interface WithdrawListItem {
  id: string;
  address: string;
  amount: number;
  created_at: string; // ISO
  userid: string;
  status: WithdrawStatus;
}

export type WithdrawListResponse = WithdrawListItem[];

export type CreateWithdrawResponse = any;
export type CancelWithdrawResponse = any;

export const withdrawService = {
  // GET /withdraw-coins/list  -> Historial
  async list(retry = true): Promise<WithdrawListResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.get<WithdrawListResponse>(
        `${API_BASE_URL}/withdraw-coins/list`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return await withdrawService.list(false);
      }
      throw error;
    }
  },

  // POST /withdraw-coins/create  -> Crear solicitud
  async create(
    payload: CreateWithdrawPayload,
    retry = true
  ): Promise<CreateWithdrawResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/withdraw-coins/create`,
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
        return await withdrawService.create(payload, false);
      }
      throw error;
    }
  },

  // DELETE /withdraw-coins/cancel  -> Cancelar la solicitud actual
  async cancelCurrent(retry = true): Promise<CancelWithdrawResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/withdraw-coins/cancel`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return await withdrawService.cancelCurrent(false);
      }
      throw error;
    }
  },
};
