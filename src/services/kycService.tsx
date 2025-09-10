import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "./userService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""; // Ajusta según tu config/env

export interface UploadDocumentPayload {
  type: string;
  file: string; // base64
}

export interface UploadDocumentResponse {
  id: string;
  type: string;
  status: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitKycPayload {
  name: string;
  last_name: string;
  id: string;
  country: string;
  birthday: string;
  documentIds: string[];
}

export interface SubmitKycResponse {
  status: string;
  submittedAt: string;
  reviewedAt: string;
  rejectionReason?: string;
}

export const kycService = {
  async uploadDocument(
    payload: UploadDocumentPayload,
    retry = true
  ): Promise<UploadDocumentResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/kyc/documents`,
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
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken) {
          await userService.refreshToken();
          return kycService.uploadDocument(payload, false);
        }
      }
      throw error;
    }
  },

  async submitKyc(
    payload: SubmitKycPayload,
    retry = true
  ): Promise<SubmitKycResponse> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    try {
      const response = await axios.post(`${API_BASE_URL}/kyc/submit`, payload, {
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
          return kycService.submitKyc(payload, false);
        }
      }
      throw error;
    }
  },
};
