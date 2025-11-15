import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const reportService = {
  // POST /deposit-coins/create-qr
  async report(text: string, url: string) {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/report/new`, {
        text,
        url,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
