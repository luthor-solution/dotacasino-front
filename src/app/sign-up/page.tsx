"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCode, FiFlag, FiLock, FiMail } from "react-icons/fi";
import FancyInput from "@/components/FancyInput";
import FancyButton from "@/components/FancyButton";
import { useState } from "react";
import { userService } from "@/services/userService";
import SuccessNotification from "@/components/SuccessNotification";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    country: "ES",
    acceptTerms: false,
    referralCode: "",
  });
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
      await userService.register(form);
      setSuccess(true);
      setMsg("¡Registro exitoso! Ahora puedes iniciar sesión.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (Array.isArray(err.response?.data?.message)) {
        const errors: { [key: string]: string } = {};
        err.response.data.message.forEach((msg: string) => {
          if (msg.toLowerCase().includes("email")) errors.email = msg;
          else if (msg.toLowerCase().includes("contraseña"))
            errors.password = msg;
          else if (msg.toLowerCase().includes("country")) errors.country = msg;
          else if (msg.toLowerCase().includes("referral"))
            errors.referralCode = msg;
          else errors.general = msg;
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

  // Junta todos los errores en un array para mostrar juntos
  const allErrors = [
    fieldErrors.email,
    fieldErrors.password,
    fieldErrors.country,
    fieldErrors.referralCode,
    fieldErrors.general,
    !success && msg && !fieldErrors.general ? msg : null,
  ].filter(Boolean);

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
                    onChange={(val) => handleChange("referralCode", val)}
                  />
                </div>

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

                {/* Todos los errores juntos aquí */}
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
