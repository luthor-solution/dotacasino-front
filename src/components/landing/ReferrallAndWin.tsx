"use client";
import Image from "next/image";
import ReferralInput from "../ReferralInput";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const ReferrallAndWin = () => {
  const user = useAuthStore((state) => state.user);
  const isLogged = Boolean(user);

  return (
    <div className="flex flex-col md:flex-row justify-center w-full items-center px-[24px] py-20 bg-[#350b2d]">
      <div className="flex flex-col md:flex-row justify-between max-w-6xl items-center px-[24px] bg-[#350b2d] w-full md:gap-x-[32px] gap-x-0">
        <div className="hidden md:block md:w-1/2">
          <img
            src={"/cardsruletas.png"}
            alt={"ruleta"}
            width={650}
            height={120}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-y-[32px] w-full md:w-1/2">
          <div className="relative md:min-w-2xl w-full">
            <div className="hidden md:block absolute left-[400px] -top-20 pointer-events-none z-0">
              <img
                src="/cardstwo.png"
                alt="card"
                width={280}
                height={300}
                style={{ opacity: 0.18, transform: "rotate(40deg)" }}
              />
            </div>

            <span className="md:text-[50px] text-[30px] font-[700]  capitalize leading-[130%] relative z-10">
              Refiere y gana
            </span>
          </div>

          <span className="text-[19px]">
            A casino is a facility for certain types of gambling. Casinos are
            often built near or combined with hotels, resorts, restaurants,
            retail shopping, cruise ships, and other tourist attractions. Some
            casinos are also known for hosting live entertainment, such as
            stand-up comedy, concerts, and sports.
          </span>

          {/* Contenedor del ReferralInput: lo desenfocamos y ponemos overlay si no está logueado */}
          <div className="relative mt-2 w-full max-w-xl">
            <div
              className={`rounded-md transition-all ${
                isLogged ? "" : "filter blur-sm"
              }`}
              aria-hidden={!isLogged}
            >
              {/* Si ReferralInput acepta `disabled`, se lo pasamos.
                  Si no lo acepta, el overlay se encarga de bloquear clicks. */}
              <ReferralInput />
            </div>

            {!isLogged && (
              // Overlay centrado encima del input para captar clicks y ofrecer login
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto py-16">
                <div className="backdrop-blur-sm rounded-md w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white mb-3">
                      Inicia sesión para ver tu código de referido
                    </p>
                    <Link
                      href="/sign-in"
                      className="inline-block  text-[#2e0327] font-bold px-4 py-2 rounded-md shadow hover:opacity-95 hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(0deg, #ff9c19 40%, #ffdd2d 110%)",
                      }}
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferrallAndWin;
