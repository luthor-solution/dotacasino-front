"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";
import { useKYCStatusStore } from "@/store/useKYCStatusStore";
import { useRefCodesStore } from "@/store/useRefCodesStore";

export default function VerifyToken({
  onLoadingChange,
}: {
  onLoadingChange?: (loading: boolean) => void;
}) {
  const token = useAuthStore((state) => state.token);
  const setKycStatus = useKYCStatusStore((state) => state.setKycStatus);

  // acciones del store de ref codes
  const initRefCodes = useRefCodesStore((s) => s.initFromResponse);
  const resetRefCodes = useRefCodesStore((s) => s.reset);

  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      onLoadingChange?.(false);
      setKycStatus(null); // Limpia el estado si no hay token
      resetRefCodes(); // Limpia refCodeL y refCodeR cuando no hay token
      return;
    }

    let cancelled = false;
    setLoading(true);
    onLoadingChange?.(true);

    async function fetchProfile() {
      try {
        const profile = await userService.getProfile();
        if (!cancelled) {
          setKycStatus(profile.kycStatus ?? null);
          // Guarda refCodeL y refCodeR del perfil
          initRefCodes({
            refCodeL: profile.refCodeL ?? "",
            refCodeR: profile.refCodeR ?? "",
          });
        }
      } catch (error) {
        if (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).response?.status === 401
        ) {
          try {
            await userService.refreshToken();
            if (!cancelled) {
              const profile = await userService.getProfile();
              setKycStatus(profile.kycStatus ?? null);
              initRefCodes({
                refCodeL: profile.refCodeL ?? "",
                refCodeR: profile.refCodeR ?? "",
              });
            }
          } catch {
            setKycStatus(null);
            resetRefCodes(); // Limpia ref codes si no se pudo refrescar
            // El logout ya se maneja en refreshToken si falla
          }
        } else {
          setKycStatus(null);
          resetRefCodes(); // Limpia ref codes ante otros errores
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
