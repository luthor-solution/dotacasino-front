import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface GamesQuery {
  search?: string;
  provider?: string;
  platformType?: string;
  category?: string;
  device?: string;
  sort?: string;
  pageSize?: number;
  page?: number;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  provider: string;
  providerName: string;
  category: string;
  platformType: string;
  gameType: string;
  providerGameId: string;
  rtp: number | null;
  devices: string[];
  tags: string[];
  thumbnailUrl: string;
  order: number;
}

export interface GamesResponse {
  items: Game[];
  total: number;
  page: number;
  pageSize: number;
}

export type GameCategory = string;

export interface GameCategoriesResponse {
  categories: GameCategory[];
}

export const gamesService = {
  async getGames(
    params: GamesQuery = {},
    retry = true
  ): Promise<GamesResponse> {
    const { token } = useAuthStore.getState();
    /* if (!token) throw new Error("No token available"); */

    try {
      const response = await axios.get(`${API_BASE_URL}/games`, {
        params,
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
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken) {
          await userService.refreshToken();
          return gamesService.getGames(params, false);
        }
      }
      throw error;
    }
  },

  async getCategories(retry = true): Promise<GameCategoriesResponse> {
    const { token } = useAuthStore.getState();
    /* if (!token) throw new Error("No token available"); */

    try {
      const response = await axios.get(`${API_BASE_URL}/games/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // La respuesta es un array de strings, así que la adaptamos:
      return { categories: response.data as GameCategory[] };
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken) {
          await userService.refreshToken();
          return gamesService.getCategories(false);
        }
      }
      throw error;
    }
  },
};
