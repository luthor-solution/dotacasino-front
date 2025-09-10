// services/serversService.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface Server {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  primaryColor: string;
  secondaryColor: string;
  enabled: boolean;
  createdAt: string;
}

export const serversService = {
  async getServers(): Promise<Server[]> {
    const response = await axios.get<Server[]>(`${API_BASE_URL}/servers`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
