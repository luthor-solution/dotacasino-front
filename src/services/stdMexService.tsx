// services/stdMex.tsx
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const stdMexService = {
  /**
   * GET /stdmex/clabe
   * Solo obtiene datos para prellenar (respuesta tipada como any temporalmente).
   * Implementa refresh de token y reintento único en caso de 401.
   */
  async getClabe(retry = true): Promise<any> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");
    if (!API_BASE_URL) throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");

    try {
      const response = await axios.get(`${API_BASE_URL}/stdmex/clabe`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data as any;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        try {
          await userService.refreshToken();
          return await stdMexService.getClabe(false);
        } catch {
          // El logout ya se maneja en refreshToken si falla
        }
      }
      throw error;
    }
  },
};

export default stdMexService;
