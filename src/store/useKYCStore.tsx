import { create } from "zustand";

type KycDocumentType = "front" | "back" | "face" | "signature";

interface KycState {
  // Datos personales
  name: string;
  last_name: string;
  id: string;
  birthday: string;
  email: string;
  identityId: string;
  country: string;
  state: string;
  city: string;
  typeDocument: string;

  documents: Partial<Record<KycDocumentType, string | File>>;

  setField: (
    field: keyof Omit<
      KycState,
      "documents" | "setField" | "setDocument" | "resetKyc"
    >,
    value: string
  ) => void;
  setDocument: (type: KycDocumentType, value: string | File) => void;
  resetKyc: () => void;
}

export const useKycStore = create<KycState>((set) => ({
  name: "",
  last_name: "",
  id: "",
  birthday: "",
  email: "",
  identityId: "",
  country: "",
  state: "",
  city: "",
  typeDocument: "",
  documents: {},
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setDocument: (type, value) =>
    set((state) => ({
      documents: { ...state.documents, [type]: value },
    })),
  resetKyc: () =>
    set({
      name: "",
      last_name: "",
      id: "",
      birthday: "",
      email: "",
      identityId: "",
      country: "",
      state: "",
      city: "",
      typeDocument: "",
      documents: {},
    }),
}));
