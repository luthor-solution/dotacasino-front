"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

export default function VerifyToken({
  onLoadingChange,
}: {
  onLoadingChange?: (loading: boolean) => void;
}) {
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      onLoadingChange?.(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    onLoadingChange?.(true);

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
      } finally {
        if (!cancelled) {
          setLoading(false);
          onLoadingChange?.(false);
        }
      }
    }

    fetchProfile();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return loading;
}
