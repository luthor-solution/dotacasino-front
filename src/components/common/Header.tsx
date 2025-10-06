"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useKYCStatusStore } from "@/store/useKYCStatusStore";
import { useTranslation } from "react-i18next";
import { walletService } from "@/services/walletService"; // <- IMPORTANTE

type NavLink = {
  href: string;
  label: string;
  showWhenLogged?: boolean; // true: solo logueado, false: solo no logueado, undefined: siempre
};

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [isRecharge, setIsRecharge] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const kycStatus = useKYCStatusStore((state) => state.kycStatus);
  const { t } = useTranslation();

  // Estado para wallet
  const [balance, setBalance] = useState<string>("$0");
  const [currency, setCurrency] = useState<string>("---");
  const [loadingWallet, setLoadingWallet] = useState<boolean>(true);
  const didFetchWallet = useRef(false);

  const navLinks: NavLink[] = [
    { href: "/", label: t("header.home") },
    { href: "/games", label: t("header.games") },
    { href: "/recharge", label: t("header.recharge"), showWhenLogged: true },
    { href: "/sign-in", label: t("header.signIn"), showWhenLogged: false },
    { href: "/sign-up", label: t("header.signUp"), showWhenLogged: false },
  ];

  useEffect(() => {
    setIsRecharge(pathname === "/recharge");
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      setShowMenu(true);
    } else {
      const timeout = setTimeout(() => setShowMenu(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Cierra el menú de usuario si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenu(false);
      }
    }
    if (userMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenu]);

  // Fetch de wallet al montar (y solo una vez)
  const lastFetchedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      setBalance("$0");
      setCurrency("---");
      setLoadingWallet(false);
      lastFetchedUserId.current = null;
      return;
    }
    if (lastFetchedUserId.current === user.id) return; // ya fetcheado para este user

    setLoadingWallet(true);
    walletService
      .getWallet()
      .then((data) => {
        setBalance(`$${data.balance}`);
        setCurrency(data.currency ?? "");
        lastFetchedUserId.current = user.id;
      })
      .catch(() => {
        setBalance("$0");
        setCurrency("---");
      })
      .finally(() => setLoadingWallet(false));
  }, [user]);

  // Filtra los links según el estado de login
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.showWhenLogged === undefined) return true;
    return user ? link.showWhenLogged : !link.showWhenLogged;
  });

  // Pequeño componente de badge de balance para reutilizar en desktop/mobile
  const BalanceBadge = () => (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
        isRecharge ? "border-[#FFC827]" : "border-[#FFC827]"
      } bg-black/20`}
      title={t("totalBalance") ?? "Total Balance"}
    >
      <span className="text-[#FFC827] font-semibold">
        {loadingWallet ? "..." : balance}
      </span>
      <span className="text-white text-[10px]">
        {loadingWallet ? "" : currency}
      </span>
    </div>
  );

  return (
    <header
      className={`w-full fixed top-0 left-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? `${
              isRecharge
                ? "bg-neutral-950 bg-opacity-95 shadow-lg"
                : "bg-[#2e0327] bg-opacity-95 shadow-lg"
            }`
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-4 ${
          scrolled ? "py-4" : "py-5"
        } transition-all duration-300`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image src="/logo.svg" alt="Logo" width={200} height={44} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center uppercase">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white hover:text-[#FFC827] transition-colors font-medium select-none pb-1
                ${pathname === link.href ? "border-b-2 border-[#FFC827]" : ""}
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lado derecho: Balance + User menu (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Mostrar balance solo si user */}
          {user && <BalanceBadge />}

          {user && (
            <div className="relative ml-2" ref={userMenuRef}>
              <button
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
                onClick={() => setUserMenu((v) => !v)}
                aria-label="Abrir menú de usuario"
              >
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#FFC827] bg-white"
                />
                <span className="text-white font-medium">
                  {user?.displayName || "Usuario"}
                </span>
                <svg
                  className={`w-4 h-4 text-[#FFC827] transition-transform ${
                    userMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown */}
              {userMenu && (
                <div
                  className={`absolute right-0 mt-2 w-44 ${
                    isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
                  } border border-[#FFC827] rounded-lg shadow-lg py-2 z-40 animate-fade-down`}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors capitalize"
                    onClick={() => setUserMenu(false)}
                  >
                    {t("header.myProfile")}
                  </Link>
                  {kycStatus !== "APPROVED" && (
                    <Link
                      href="/kyc"
                      className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors capitalize"
                      onClick={() => {
                        setUserMenu(false);
                      }}
                    >
                      {t("header.verifyIdentity")}
                    </Link>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors cursor-pointer capitalize"
                    onClick={() => {
                      setUserMenu(false);
                      logout();
                    }}
                  >
                    {t("header.logout")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger (visible en md:hidden, por eso lo dejamos fuera en desktop) */}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span
            className={`block h-0.5 w-6 bg-[#FFC827] transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#FFC827] my-1 transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#FFC827] transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu con animación */}
      {showMenu && (
        <nav
          className={`
            md:hidden ${
              isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
            } bg-opacity-95 px-4 pb-4 pt-2 flex flex-col gap-4 uppercase
            transition-all duration-300
            ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-8 pointer-events-none"
            }
          `}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Balance en mobile (si user) */}
          {user && (
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">{t("totalBalance")}</span>
              <BalanceBadge />
            </div>
          )}

          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white hover:text-[#FFC827] transition-colors font-medium pb-1
                ${pathname === link.href ? "border-b-2 border-[#FFC827]" : ""}
              `}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* User menu (mobile) */}
          {user && (
            <div className="relative mt-2" ref={userMenuRef}>
              <button
                className="flex items-center gap-2 focus:outline-none w-full"
                onClick={() => setUserMenu((v) => !v)}
                aria-label="Abrir menú de usuario"
              >
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-[#FFC827] bg-white"
                />
                <span className="text-white font-medium">
                  {user?.displayName || "Usuario"}
                </span>
                <svg
                  className={`w-4 h-4 text-[#FFC827] transition-transform ${
                    userMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown */}
              {userMenu && (
                <div
                  className={`mt-2 w-full ${
                    isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
                  } border border-[#FFC827] rounded-lg shadow-lg py-2 z-40 animate-fade-down`}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors capitalize"
                    onClick={() => {
                      setUserMenu(false);
                      setOpen(false);
                    }}
                  >
                    {t("header.myProfile")}
                  </Link>

                  {kycStatus !== "APPROVED" && (
                    <Link
                      href="/kyc"
                      className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors capitalize"
                      onClick={() => {
                        setUserMenu(false);
                        setOpen(false);
                      }}
                    >
                      {t("header.verifyIdentity")}
                    </Link>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors capitalize"
                    onClick={() => {
                      setUserMenu(false);
                      setOpen(false);
                      logout();
                    }}
                  >
                    {t("header.logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
