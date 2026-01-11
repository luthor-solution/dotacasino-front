import axios from "axios";

export const ipService = {
  async getUserIp(): Promise<string> {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.error("Error fetching user IP:", error);
      return "";
    }
  },
};
