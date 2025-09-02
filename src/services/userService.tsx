// src/services/userService.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export interface RegisterPayload {
  email: string;
  password: string;
  country: string;
  acceptTerms: boolean;
  referralCode?: string;
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
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      { refresh_token: refreshToken }, // <-- Aquí va el refresh_token
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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
        const logout = useAuthStore.getState().logout;
        logout();
      }
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
};
