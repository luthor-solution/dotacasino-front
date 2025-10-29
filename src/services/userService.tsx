// src/services/userService.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export interface RegisterPayload {
  email: string;
  password: string;
  country: string;
  acceptTerms: boolean;
  referralCode?: string;
  side?: string;
}

export interface RegisterResponse {
  message: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    country: string;
    createdAt: string;
    roles: string[];
  };
  access_token: string;
  refresh_token: string;
}

export interface ProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  language: string;
  refCode: string;
  kycStatus: string;
  createdAt: string;
  refCodeL?: string;
  refCodeR?: string;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  displayName?: string;
  phone?: string;
  language?: string;
}
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  language: string;
  refCode: string;
  kycStatus: string;
  createdAt: string;
}

export interface CurrentMembership {
  current: number;
  limit: number;
}

export interface Deposit {
  current: number;
}

export interface CurrentMultiplierResponse {
  membership: CurrentMembership;
  deposit: Deposit;
}

export type MembershipPlan = "free" | "p-100" | "p-500" | "p-1000";
export interface CurrentMembershipResponse {
  membership: MembershipPlan;
}

export type RecoveryInitResponse = { ok: boolean };

export type MembershipQRResponse = {
  address: string;
  amount: number;
  membership_type: string;
  status: "pending" | "active" | "expired" | string;
  expires_at: string; // ISO
  qrcode_url: string;
  status_text: string | null;
};

export type UserByCodeResponse = {
  displayName?: string | null;
};

export interface MembershipPollingPayload {
  address: string; // dirección a validar
}

export type DepositPollingResponse = "OK" | "NO";

export const userService = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  async logout(token: string, refreshToken: string) {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        { refresh_token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        // Logout local
        const logout = useAuthStore.getState().logout;
        logout();
        toast.error("Hubo un error en el servidor. Has sido desconectado.");
      }
      // Puedes manejar otros errores si lo deseas
    }
  },

  async refreshToken() {
    const {
      token: accessToken,
      refreshToken,
      user,
      login,
    } = useAuthStore.getState();
    if (!accessToken || !refreshToken) {
      throw new Error("No tokens available for refresh");
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Actualiza los tokens en el store y localStorage
      const { access_token, refresh_token } = response.data;
      if (user) {
        login(user, access_token, refresh_token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Tu sesión ha terminado");
      }

      if (axios.isAxiosError(error) && error.response?.status === 500) {
        toast.error("Ha ocurrido un error");
      }

      const logout = useAuthStore.getState().logout;
      logout();

      throw error;
    }
  },

  async getProfile(retry = true): Promise<ProfileResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data as ProfileResponse;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        // Intenta refrescar el token
        try {
          await userService.refreshToken();
          // Vuelve a intentar obtener el perfil (solo una vez)
          return await userService.getProfile(false);
        } catch {
          // El logout ya se maneja en refreshToken si falla
        }
      }
      throw error;
    }
  },

  async updateProfile(
    payload: UpdateProfilePayload,
    retry = true
  ): Promise<UserProfile> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.patch(`${API_BASE_URL}/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        // Intenta refrescar token y reintenta una vez
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken) {
          await userService.refreshToken();
          return userService.updateProfile(payload, false);
        }
      }
      throw error;
    }
  },

  async changePassword(
    payload: { currentPassword: string; newPassword: string },
    retry = true
  ): Promise<{ message: string }> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile/password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        // Intenta refrescar token y reintenta una vez
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken) {
          await userService.refreshToken();
          return userService.changePassword(payload, false);
        }
      }
      throw error;
    }
  },

  async getCurrentMultiplier(retry = true): Promise<CurrentMultiplierResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get<CurrentMultiplierResponse>(
        `${API_BASE_URL}/users/current-multiplier`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return userService.getCurrentMultiplier(false);
      }
      throw error;
    }
  },

  async getCurrentMembership(retry = true): Promise<CurrentMembershipResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get<CurrentMembershipResponse>(
        `${API_BASE_URL}/users/current-membership`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();

        return userService.getCurrentMembership(false);
      }
      throw error;
    }
  },

  async getQRMembership(retry = true): Promise<MembershipQRResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get<MembershipQRResponse>(
        `${API_BASE_URL}/users/qr-membership`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();

        return userService.getQRMembership(false);
      }
      throw error;
    }
  },

  async createMembershipQR(
    params: {
      membership_type: string;
      network: string;
    },
    retry = true
  ): Promise<MembershipQRResponse> {
    const { membership_type, network } = params;
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");
    try {
      const response = await axios.post<MembershipQRResponse>(
        `${API_BASE_URL}/users/create-qr-membership`,
        { membership_type, network },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // { ok: true }
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();

        return userService.createMembershipQR(
          { membership_type: membership_type, network: network },
          false
        );
      }
      throw error;
    }
  },

  async requestPasswordReset(params: {
    email: string;
  }): Promise<RecoveryInitResponse> {
    const { email } = params;

    try {
      const response = await axios.post<RecoveryInitResponse>(
        `${API_BASE_URL}/auth/recovery/init`,
        { email, host: window.location.host },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // { ok: true }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.message ||
          "No se pudo iniciar la recuperación de contraseña.";
        throw new Error(msg);
      }
      throw error;
    }
  },

  async getUserByCode(code: string, retry = true): Promise<UserByCodeResponse> {
    if (!code) throw new Error("Code is required");

    try {
      const response = await axios.get<UserByCodeResponse>(
        `${API_BASE_URL}/users/${encodeURIComponent(code)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        await userService.refreshToken();
        return userService.getUserByCode(code, false);
      }
      throw error;
    }
  },

  async polling(
    payload: MembershipPollingPayload,
    retry = true
  ): Promise<DepositPollingResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/qr-membership-polling`,
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
        return await userService.polling(payload, false);
      }
      throw error;
    }
  },
};
