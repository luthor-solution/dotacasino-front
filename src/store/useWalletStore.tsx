"use client";

import { create } from "zustand";
import { walletService } from "@/services/walletService";

type WalletState = {
  balance: number;
  currency: string;
  loading: boolean;
  lastFetchedUserId: string | null;

  setWallet: (data: { balance?: number; currency?: string }) => void;
  reset: () => void;

  // fetch con opción silenciosa (no cambia loading)
  fetchWallet: (
    userId?: string | null,
    opts?: { silent?: boolean }
  ) => Promise<void>;

  // helper para refrescar sin tocar loading
  refreshWallet: (userId?: string | null) => Promise<void>;
};

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  currency: "---",
  loading: false,
  lastFetchedUserId: null,

  setWallet: ({ balance, currency }) =>
    set((state) => ({
      balance: balance ?? state.balance,
      currency: currency ?? state.currency,
    })),

  reset: () =>
    set({
      balance: 0,
      currency: "---",
      loading: false,
      lastFetchedUserId: null,
    }),

  fetchWallet: async (userId, opts) => {
    const silent = opts?.silent === true;

    // Sin usuario => resetea
    if (!userId) {
      set({
        balance: 0,
        currency: "---",
        loading: false,
        lastFetchedUserId: null,
      });
      return;
    }

    try {
      if (!silent) set({ loading: true });
      const data = await walletService.getWallet();
      set({
        balance: Number(data.balance) || 0,
        currency: data.currency ?? "---",
        lastFetchedUserId: userId,
      });
    } catch {
      // En error, deja valores por defecto pero no trabe loading si es silencioso
      set((state) => ({
        balance: state.balance ?? 0,
        currency: state.currency ?? "---",
      }));
    } finally {
      if (!silent) set({ loading: false });
    }
  },

  refreshWallet: async (userId) => {
    // refresco silencioso
    await get().fetchWallet(userId, { silent: true });
  },
}));
