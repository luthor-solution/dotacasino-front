"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const pathname = usePathname();
  const [isRecharge, setIsRecharge] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsRecharge(pathname === "/recharge");
  }, [pathname]);

  return (
    <footer
      className={`relative ${
        isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
      } text-white pt-12 pb-8 px-4 overflow-x-visible`}
      style={{
        backgroundImage: "url('/banner/banner1.jpg')",
        backgroundSize: "160%",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`absolute inset-0 ${
          isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
        } opacity-[92%] pointer-events-none`}
      ></div>
      {/* Overlay degradado solo arriba para que no se vea cortado */}
      <div
        className={`absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b ${
          isRecharge ? "from-neutral-950" : "from-[#2e0327] to-[#2e032700]"
        }`}
      ></div>

      {/* Imagen decorativa sobresaliendo */}
      <Image
        src="/shape.png"
        alt="Decoración"
        className="hidden xl:block  absolute top-0 right-0 pointer-events-none"
        style={{
          transform: "translateX(-10%) translateY(-40%)",
          zIndex: 20,
        }}
        height={100}
        width={200}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Columnas principales */}
        <div className="flex flex-col md:flex-row gap-12 flex-1">
          {/* Compañía */}
          <div>
            <h3 className="font-bold mb-3">{t("footer.company.title")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#FFC827] transition">
                  {t("footer.company.news")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC827] transition">
                  {t("footer.company.about")}
                </a>
              </li>
            </ul>
          </div>
          {/* Juegos */}
          <div>
            <h3 className="font-bold mb-3">{t("footer.games.title")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#FFC827] transition">
                  {t("footer.games.bonds")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFC827] transition">
                  {t("footer.games.jackpots")}
                </a>
              </li>
            </ul>
          </div>
          {/* Recursos */}
          <div>
            <h3 className="font-bold mb-3">{t("footer.resources.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-[#FFC827] transition">
                  {t("footer.resources.termsAndConditions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/antispam"
                  className="hover:text-[#FFC827] transition"
                >
                  {t("footer.resources.antiSpamPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-[#FFC827] transition"
                >
                  {t("footer.resources.refundPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kyc-and-aml"
                  className="hover:text-[#FFC827] transition"
                >
                  KYC Y AML
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Logo y selector de idioma */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <select
            className={`${
              isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
            } text-white px-4 py-2 rounded-lg border border-[#FFC827] focus:outline-none`}
            defaultValue="es"
          >
            <option value="es">🇪🇸 Spanish</option>
            <option value="en">🇬🇧 English</option>
            <option value="kr">🇰🇷 Korean</option>
          </select>
          <Image
            src="/logo.svg"
            alt="DOTA Logo"
            width={180}
            height={150}
            className="mt-2"
          />
          <span className="text-[#bdbdbd] text-sm mt-2">Dota.Click 2025™</span>
        </div>
      </div>

      {/* Texto descriptivo */}
      <div className="relative z-10 max-w-5xl mx-auto mt-8 text-center text-[#e0e0e0] text-sm leading-relaxed">
        {t("footer.rows.one")}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto mt-8 text-center text-white text-lg font-bold">
        {t("footer.rows.two")}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto mt-4 text-center text-[#e0e0e0] text-sm leading-relaxed">
        {t("footer.rows.three")}
        <br />
        <br />
        {t("footer.rows.four")}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto mt-8 text-center text-white text-lg font-bold">
        {t("footer.rows.five")}
      </div>
    </footer>
  );
};

export default Footer;
