"use client";

import Image from "next/image";
import Link from "next/link";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import FancyInput from "@/components/FancyInput";
import FancyButton from "@/components/FancyButton";
import CountryPhoneInput from "@/components/CountryPhoneInput";
export default function SignUp() {
  return (
    <div
      className="flex items-center justify-center px-4 pb-12 pt-32 xl:px-12 w-screen min-h-[100dvh] relative"
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
              <FancyInput
                placeholder="First Name"
                name="firstname"
                icon={<FiUser />}
                onChange={(val) => console.log("firstname:", val)}
              />

              <FancyInput
                placeholder="Last Name"
                name="lastname"
                icon={<FiUser />}
                onChange={(val) => console.log("lastname:", val)}
              />

              <CountryPhoneInput
                onChange={(val) => console.log("phone:", val)}
              />

              <FancyInput
                placeholder="Email"
                name="email"
                icon={<FiMail />}
                onChange={(val) => console.log("email:", val)}
              />

              <FancyInput
                placeholder="Username"
                name="username"
                icon={<FiUser />}
                onChange={(val) => console.log("Username:", val)}
              />

              <FancyInput
                placeholder="Password"
                name="password"
                icon={<FiLock />}
                type="password"
                onChange={(val) => console.log("password:", val)}
              />

              <FancyInput
                placeholder="Confirm Password"
                name="confirmpassword"
                icon={<FiLock />}
                type="password"
                onChange={(val) => console.log("confirmpassword:", val)}
              />
            </div>

            <FancyButton onClick={() => alert("¡Iniciar sesión!")}>
              Registrarse
            </FancyButton>
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
