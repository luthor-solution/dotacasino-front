"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import FancyInput from "@/components/FancyInput";
import FancyButton from "@/components/FancyButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { userService } from "@/services/userService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMsg("Por favor ingresa tu correo electrónico.");
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      await userService.requestPasswordReset({ email });

      setMsg(
        "Si el correo existe en nuestro sistema, te enviamos un enlace para restablecer tu contraseña."
      );
      toast.success("Enviado con éxito");
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Ocurrió un error al solicitar el restablecimiento.";
      setMsg(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

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
            <Image src={"/logo.svg"} width={250} height={100} alt="" />
          </div>

          <div className="flex flex-col space-y-[24px] xl:w-[400px] w-full">
            <FancyInput
              placeholder="Correo electrónico"
              name="email"
              icon={<FiMail />}
              onChange={(val) => setEmail(val)}
            />

            {msg && (
              <div
                className={`text-sm ${
                  msg.toLowerCase().includes("enlace")
                    ? "text-green-400"
                    : "text-[#FFC827]"
                } font-semibold`}
              >
                {msg}
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
              {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
            </FancyButton>
          </div>

          <div className="w-full flex justify-between text-[15px]">
            <Link
              href="/sign-in"
              className="text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              Volver a iniciar sesión
            </Link>
            <Link
              href="/sign-up"
              className="text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              Crear cuenta
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-white text-center w-fit">
          <span className="text-[#FFC827] text-[28px] tracking-wide font-[600]">
            ¿Olvidaste tu contraseña?
          </span>
          <span>
            Ingresa tu correo y te enviaremos un enlace para restablecerla.
          </span>
        </div>
      </div>
    </div>
  );
}
