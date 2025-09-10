import { create } from "zustand";

interface KYCStatusStore {
  kycStatus: string | null;
  setKycStatus: (status: string | null) => void;
}

export const useKYCStatusStore = create<KYCStatusStore>((set) => ({
  kycStatus: null,
  setKycStatus: (status) => set({ kycStatus: status }),
}));
