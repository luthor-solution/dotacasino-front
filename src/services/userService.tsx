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

  async getProfile(): Promise<ProfileResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
