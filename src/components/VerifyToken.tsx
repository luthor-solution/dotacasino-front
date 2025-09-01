"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

export default function VerifyToken() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function fetchProfile() {
      try {
        await userService.getProfile();
      } catch (error) {
        if (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).response?.status === 401
        ) {
          try {
            await userService.refreshToken();
            if (!cancelled) {
              await userService.getProfile();
            }
          } catch {
            // El logout ya se maneja en refreshToken si falla
          }
        }
      }
    }

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return null;
}
