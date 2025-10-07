"use client";

import Image from "next/image";
import Link from "next/link";
import { FiLock, FiUser } from "react-icons/fi";
import FancyInput from "@/components/FancyInput";
import FancyButton from "@/components/FancyButton";
import { useState } from "react";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await userService.login(form);
      // Guarda solo user, token y refreshToken
      login(res.user, res.access_token, res.refresh_token);
      setMsg("¡Inicio de sesión exitoso!");
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMsg(
        err.response?.data?.message ||
          err.message ||
          "Ocurrió un error al iniciar sesión."
      );
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
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#2e0327] opacity-80 z-0 pointer-events-none"></div>

      {/* Contenido */}
      <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:space-x-16 space-y-[60px] xl:space-y-0 z-10 relative">
        <div className="relative backdrop-blur-lg px-4 sm:px-8 xl:px-[60px] py-8 sm:py-12 xl:py-[100px] border border-[#a97bbf33] rounded-[25px] space-y-8 sm:space-y-10 xl:space-y-[50px] flex flex-col items-center text-center  w-full md:w-[400px] xl:w-fit">
          <div className="w-full flex justify-center items-center">
            <Link href={"/"}>
              <Image src={"/logo.svg"} width={250} height={100} alt="" />
            </Link>
          </div>
          <div className="flex flex-col space-y-[24px] xl:w-[400px] w-full">
            <FancyInput
              placeholder="email"
              name="email"
              icon={<FiUser />}
              onChange={(val) => handleChange("email", val)}
            />
            <FancyInput
              placeholder="Password"
              name="password"
              icon={<FiLock />}
              type="password"
              onChange={(val) => handleChange("password", val)}
            />

            {msg && (
              <div
                className={`text-sm ${
                  msg.includes("exitoso") ? "text-green-400" : "text-[#FFC827]"
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
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </FancyButton>
          </div>
          <div className="w-full flex justify-end">
            <Link
              href="forgot-password"
              className="text-[15px] text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              Olvidé mi contraseña
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-white text-center w-fit">
          <span className="text-[#FFC827] text-[28px] tracking-wide font-[600]">
            Bienvenido a Dota Casino
          </span>
          <span>Inicia sesión en tu cuenta para empezar a divertirte.</span>
          <div>
            <span>¿Aún no tienes una cuenta? </span>
            <Link
              href="/sign-up"
              className="text-[#e2a94f] underline hover:scale-110 transition-all duration-500"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
