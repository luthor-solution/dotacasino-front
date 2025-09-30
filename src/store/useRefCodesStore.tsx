// src/store/refCodesStore.ts
import { create } from "zustand";

type RefCodesState = {
  refCodeL: string | null;
  refCodeR: string | null;
  // acciones
  setRefCodeL: (code: string | null) => void;
  setRefCodeR: (code: string | null) => void;
  setRefCodes: (codes: {
    refCodeL?: string | null;
    refCodeR?: string | null;
  }) => void;
  initFromResponse: (resp: { refCodeL?: string; refCodeR?: string }) => void;
  reset: () => void;
};

export const useRefCodesStore = create<RefCodesState>((set) => ({
  refCodeL: null,
  refCodeR: null,

  setRefCodeL: (code) => set(() => ({ refCodeL: code ?? null })),
  setRefCodeR: (code) => set(() => ({ refCodeR: code ?? null })),

  setRefCodes: ({ refCodeL, refCodeR }) =>
    set((state) => ({
      refCodeL: refCodeL ?? state.refCodeL,
      refCodeR: refCodeR ?? state.refCodeR,
    })),

  initFromResponse: (resp) =>
    set(() => ({
      refCodeL: resp.refCodeL ?? null,
      refCodeR: resp.refCodeR ?? null,
    })),

  reset: () => set({ refCodeL: null, refCodeR: null }),
}));
