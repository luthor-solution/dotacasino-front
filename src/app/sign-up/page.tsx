"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { FiCode, FiFlag, FiLock, FiMail } from "react-icons/fi";
import FancyInput from "@/components/FancyInput";
import FancyButton from "@/components/FancyButton";
import { useEffect, useMemo, useState } from "react";
import { userService } from "@/services/userService";
import SuccessNotification from "@/components/SuccessNotification";
import { useSearchParams } from "next/navigation";

type Side = "left" | "right";

type ReferredProfile = {
  displayName?: string | null;
};

export default function SignUp() {
  const searchParams = useSearchParams();

  // Leemos ambos params soportados
  const refCodeLFromUrl = useMemo(
    () => searchParams.get("refCodeL") || "",
    [searchParams]
  );
  const refCodeRFromUrl = useMemo(
    () => searchParams.get("refCodeR") || "",
    [searchParams]
  );

  // Deducción automática del side
  const detectedSide: Side | null = useMemo(() => {
    if (refCodeRFromUrl) return "right";
    if (refCodeLFromUrl) return "left";
    return null;
  }, [refCodeLFromUrl, refCodeRFromUrl]);

  // Código detectado automáticamente
  const detectedReferral = useMemo(() => {
    if (refCodeRFromUrl) return refCodeRFromUrl;
    if (refCodeLFromUrl) return refCodeLFromUrl;
    return "";
  }, [refCodeLFromUrl, refCodeRFromUrl]);

  const [form, setForm] = useState({
    email: "",
    password: "",
    country: "ES",
    acceptTerms: false,
    referralCode: "", // se autocompleta abajo
  });

  // Estado para perfil referido
  const [refLoading, setRefLoading] = useState(false);
  const [refProfile, setRefProfile] = useState<ReferredProfile | null>(null);
  const [refError, setRefError] = useState<string | null>(null);

  // Prefill del referralCode desde la URL (una vez)
  useEffect(() => {
    if (detectedReferral && !form.referralCode) {
      setForm((prev) => ({ ...prev, referralCode: detectedReferral }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedReferral]);

  // Buscar datos del referido cuando haya referralCode
  useEffect(() => {
    const code = form.referralCode?.trim();
    if (!code) {
      setRefProfile(null);
      setRefError(null);
      setRefLoading(false);
      return;
    }

    let cancelled = false;
    async function fetchRefProfile() {
      setRefLoading(true);
      setRefError(null);
      try {
        const resp = await userService.getUserByCode(code);
        if (!cancelled) {
          setRefProfile({ displayName: resp?.displayName ?? null });
        }
      } catch (err: any) {
        if (!cancelled) {
          setRefProfile(null);
          const message =
            err?.response?.status === 404
              ? "Código de referido no encontrado"
              : err?.response?.data?.message ||
                err?.message ||
                "No se pudo verificar el referido";
          setRefError(message);
        }
      } finally {
        if (!cancelled) setRefLoading(false);
      }
    }

    fetchRefProfile();
    return () => {
      cancelled = true;
    };
  }, [form.referralCode]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);
    setFieldErrors({});
    try {
      // Detectado desde la URL (refCodeL/refCodeR)
      const sideDetected: Side | null = detectedSide;

      // Normaliza referralCode
      const trimmedReferral = (form.referralCode || "").trim();
      const hasReferral = trimmedReferral.length > 0;

      // Reglas:
      // - side siempre va: "left"/"right" si hay referralCode y se detectó side, en otro caso "".
      // - referralCode debe ir, pero vacío si no hay valor.
      const sideToSend: string =
        hasReferral && sideDetected ? sideDetected : "";
      const referralToSend: string = hasReferral ? trimmedReferral : "";

      const payload: any = {
        email: form.email,
        password: form.password,
        country: form.country,
        acceptTerms: form.acceptTerms,
        side: sideToSend,
        referralCode: referralToSend,
      };

      await userService.register(payload);

      setSuccess(true);
      setMsg("¡Registro exitoso! Ahora puedes iniciar sesión.");
    } catch (err: any) {
      if (Array.isArray(err.response?.data?.message)) {
        const errors: { [key: string]: string } = {};
        err.response.data.message.forEach((m: string) => {
          const lower = (m || "").toLowerCase();
          if (lower.includes("email")) errors.email = m;
          else if (lower.includes("contraseña")) errors.password = m;
          else if (lower.includes("country")) errors.country = m;
          else if (lower.includes("referral")) errors.referralCode = m;
          else if (lower.includes("side")) errors.side = m;
          else errors.general = m;
        });
        setFieldErrors(errors);
      } else {
        setMsg(
          err.response?.data?.message ||
            err.message ||
            "Ocurrió un error al registrarse."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const allErrors = [
    fieldErrors.email,
    fieldErrors.password,
    fieldErrors.country,
    fieldErrors.referralCode,
    fieldErrors.side,
    fieldErrors.general,
    !success && msg && !fieldErrors.general ? msg : null,
  ].filter(Boolean);

  const referredName = refProfile?.displayName || null;

  return (
    <div
      className="flex items-center justify-center px-[32px] pb-12 pt-32 xl:px-12 w-screen min-h-[100dvh] relative"
      style={{
        backgroundImage: "url('/background/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#2e0327] opacity-80 z-0 pointer-events-none"></div>

      {/* Contenido */}
      <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:space-x-16 space-y-[60px] xl:space-y-0 z-10 relative">
        <div className="relative backdrop-blur-lg px-4 sm:px-8 xl:px-[60px] py-8 sm:py-12 xl:py-[100px] border border-[#a97bbf33] rounded-[25px] space-y-8 sm:space-y-10 xl:space-y-[50px] flex flex-col items-center text-center w-full md:w-[700px] xl:w-fit">
          <div className="w-full flex justify-center items-center">
            <Image src={"/logo.svg"} width={250} height={100} alt="" />
          </div>
          <div className="flex flex-col space-y-[24px] xl:w-[700px] w-full">
            {success ? (
              <SuccessNotification
                message={msg}
                linkHref="/sign-in"
                linkText="Ir a iniciar sesión"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                  <FancyInput
                    placeholder="Email"
                    name="email"
                    icon={<FiMail />}
                    onChange={(val) => handleChange("email", val)}
                  />
                  <FancyInput
                    placeholder="Password"
                    name="password"
                    icon={<FiLock />}
                    type="password"
                    onChange={(val) => handleChange("password", val)}
                  />
                  <FancyInput
                    placeholder="Country (ej: ES)"
                    name="country"
                    icon={<FiFlag />}
                    onChange={(val) => handleChange("country", val)}
                  />
                  <FancyInput
                    placeholder="Referral Code (opcional)"
                    name="referralCode"
                    icon={<FiCode />}
                    value={form.referralCode}
                    onChange={(val) => handleChange("referralCode", val)}
                  />
                </div>

                {/* Info del referido debajo de los inputs */}
                <div className="mt-2 min-h-[22px]">
                  {refLoading && (
                    <div className="text-xs text-gray-300">
                      Verificando código de referido...
                    </div>
                  )}
                  {!refLoading && refError && (
                    <div className="text-xs text-red-400">{refError}</div>
                  )}
                  {!refLoading && !refError && referredName && (
                    <div className="text-xs text-green-400">
                      Referido por: {referredName}
                    </div>
                  )}
                </div>

                {/* Errores */}
                {allErrors.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2">
                    {allErrors.map((err, idx) => (
                      <div
                        key={idx}
                        className="text-red-400 text-xs text-center"
                      >
                        {err}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={form.acceptTerms}
                    onChange={(e) =>
                      handleChange("acceptTerms", e.target.checked)
                    }
                    className="accent-[#FFC827] w-5 h-5"
                  />
                  <label htmlFor="acceptTerms" className="text-white text-sm">
                    Acepto los{" "}
                    <a href="#" className="underline text-[#FFC827]">
                      términos y condiciones
                    </a>
                  </label>
                </div>

                <FancyButton
                  onClick={handleSubmit}
                  className={`${
                    loading
                      ? "opacity-60 cursor-not-allowed pointer-events-none"
                      : ""
                  }`}
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </FancyButton>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-white text-center w-fit">
          <span className="text-[#FFC827] text-[28px] tracking-wide font-[600]">
            Bienvenido a Dota Casino
          </span>
          <span>Regístrate en Dota Casino para empezar a divertirte.</span>
          <div>
            <span>¿Ya tienes una cuenta? </span>
            <Link
              href="/sign-in"
              className="text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
