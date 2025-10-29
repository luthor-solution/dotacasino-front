"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLock } from "react-icons/fi";
import FancyInput from "@/components/FancyInput";
import FancyButton from "@/components/FancyButton";
import { toast } from "react-toastify";
import { userService } from "@/services/userService";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

// Opcional: evita SSG/estático si esta página depende de query params dinámicos
export const dynamic = "force-dynamic";
// o alternativamente: export const revalidate = 0;

function ResetPasswordContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid") || "";
  const rt = searchParams.get("rt") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!rid || !rt) {
        setVerified(false);
        setMsg(t("auth.resetPassword.tokenMissing"));
        setIsSuccess(false);
        return;
      }
      try {
        setVerifying(true);
        setMsg(null);
        setIsSuccess(false);
        await userService.verifyRecoveryToken({ rid, rt });
        setVerified(true);
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          t("auth.resetPassword.tokenInvalid");
        setVerified(false);
        setMsg(errorMsg);
        toast.error(errorMsg);
      } finally {
        setVerifying(false);
      }
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rid, rt]);

  const validate = () => {
    if (!rid || !rt) {
      setMsg(t("auth.resetPassword.tokenMissing"));
      setIsSuccess(false);
      return false;
    }
    if (!password.trim()) {
      setMsg(t("auth.resetPassword.requiredPassword"));
      setIsSuccess(false);
      return false;
    }
    if (password.length < 8) {
      setMsg(t("auth.resetPassword.passwordTooShort"));
      setIsSuccess(false);
      return false;
    }
    if (!confirm.trim()) {
      setMsg(t("auth.resetPassword.requiredConfirm"));
      setIsSuccess(false);
      return false;
    }
    if (password !== confirm) {
      setMsg(t("auth.resetPassword.passwordsMismatch"));
      setIsSuccess(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setMsg(null);
    setIsSuccess(false);

    try {
      await userService.resetPassword({
        rid,
        rt,
        newPassword: password, // clave exacta que espera el backend
      });
      const successMsg = t("auth.resetPassword.successMsg");
      setMsg(successMsg);
      setIsSuccess(true);
      toast.success(t("auth.resetPassword.successToast"));
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        t("auth.resetPassword.errorGeneric");
      setMsg(errorMsg);
      setIsSuccess(false);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isActionDisabled = verifying || !verified || loading;

  return (
    <div
      className="flex items-center justify-center px-[32px] py-12 xl:px-12 w-screen min-h-[100dvh] relative"
      style={{
        backgroundImage: "url('/background/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-[#2e0327] opacity-80 z-0 pointer-events-none"></div>

      <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:space-x-16 space-y-[60px] xl:space-y-0 z-10 relative">
        <div className="relative backdrop-blur-lg px-4 sm:px-8 xl:px-[60px] py-8 sm:py-12 xl:py-[100px] border border-[#a97bbf33] rounded-[25px] space-y-8 sm:space-y-10 xl:space-y-[50px] flex flex-col items-center text-center w-full md:w-[400px] xl:w-fit">
          <div className="w-full flex justify-center items-center">
            <Image src={"/logo.svg"} width={200} height={100} alt="Logo" />
          </div>

          <div className="flex flex-col space-y-[24px] xl:w-[400px] w-full">
            <FancyInput
              placeholder={t("auth.resetPassword.passwordPlaceholder")}
              name="password"
              icon={<FiLock />}
              type="password"
              onChange={(val) => setPassword(val)}
            />

            <FancyInput
              placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
              name="confirmPassword"
              icon={<FiLock />}
              type="password"
              onChange={(val) => setConfirm(val)}
            />

            {msg && (
              <div
                className={`text-sm ${
                  isSuccess ? "text-green-400" : "text-[#FFC827]"
                } font-semibold`}
              >
                {msg}
              </div>
            )}

            <FancyButton
              onClick={handleSubmit}
              className={`${
                isActionDisabled
                  ? "opacity-60 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            >
              {verifying
                ? t("auth.resetPassword.verifying")
                : loading
                ? t("auth.resetPassword.submitting")
                : t("auth.resetPassword.submit")}
            </FancyButton>
          </div>

          <div className="w-full flex justify-between text-[15px]">
            <Link
              href="/sign-in"
              className="text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              {t("auth.resetPassword.backToSignIn")}
            </Link>
            <Link
              href="/forgot-password"
              className="text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              {t("auth.resetPassword.goToForgot")}
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-white text-center w-fit">
          <span className="text-[#FFC827] text-[28px] tracking-wide font-[600]">
            {t("auth.resetPassword.title")}
          </span>
          <span>{t("auth.resetPassword.subtitle")}</span>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
