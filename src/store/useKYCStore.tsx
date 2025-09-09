import { create } from "zustand";

type KycDocumentType = "front" | "back" | "face" | "signature";

interface KycState {
  // Datos personales
  name: string;
  last_name: string; // <-- AGREGADO
  id: string; // <-- AGREGADO
  birthday: string; // <-- AGREGADO
  email: string;
  identityId: string;
  country: string;
  state: string;
  city: string;
  typeDocument: string;

  // Documentos
  documents: Partial<Record<KycDocumentType, string | File>>;

  // Métodos para actualizar
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
  last_name: "", // <-- AGREGADO
  id: "", // <-- AGREGADO
  birthday: "", // <-- AGREGADO
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
      last_name: "", // <-- AGREGADO
      id: "", // <-- AGREGADO
      birthday: "", // <-- AGREGADO
      email: "",
      identityId: "",
      country: "",
      state: "",
      city: "",
      typeDocument: "",
      documents: {},
    }),
}));
