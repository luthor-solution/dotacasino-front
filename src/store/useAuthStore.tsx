// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "@/services/userService";

export interface User {
  id: string;
  email: string;
  country: string;
  createdAt: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

function removeAuthCookie() {
  document.cookie = "auth_token=; path=/; max-age=0";
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      login: (user, token, refreshToken) => {
        set({ user, token, refreshToken });
        if (typeof window !== "undefined") {
          document.cookie = `auth_token=${token}; path=/; max-age=${
            60 * 60 * 24 * 7
          }`;
        }
      },
      logout: async () => {
        const token = get().token;
        const refreshToken = get().refreshToken;
        try {
          if (token && refreshToken) {
            await userService.logout(token, refreshToken);
            set({ user: null, token: null, refreshToken: null });
            if (typeof window !== "undefined") {
              localStorage.removeItem("auth");
              removeAuthCookie();
            }
          }
        } catch (e) {
          // Puedes manejar el error si lo deseas, pero igual limpia el estado
        }
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
