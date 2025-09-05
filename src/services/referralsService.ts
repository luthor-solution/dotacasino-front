import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface TreeResponse {
  items: {
    user_id: string;
    parent_id: string;
    display_name: string;
    depth: number;
    path: string[];
  }[];
}

export const referralsService = {
  async getTree(): Promise<TreeResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.get(`${API_BASE_URL}/referrals/tree`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
