// src/services/walletService.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

// src/types/membership.ts
export interface Membership {
  id: string; // "p-100", "p-500", ...
  name: string; // "Basic", "Advanced", "Pro"
  benefits: string[]; // lista de beneficios
  active: boolean; // estado
}

export type MembershipList = Membership[];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const membershisService = {
  async getMembeships(retry = true): Promise<MembershipList> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get<MembershipList>(
        `${API_BASE_URL}/memberships`,
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
        try {
          await userService.refreshToken();
          return await membershisService.getMembeships(false);
        } catch {
          // El logout ya se maneja en refreshToken si falla
        }
      }
      throw error;
    }
  },
};
