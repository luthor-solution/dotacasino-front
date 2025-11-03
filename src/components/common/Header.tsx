"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useKYCStatusStore } from "@/store/useKYCStatusStore";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useWalletStore } from "@/store/useWalletStore";

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
  const [isLanding, setIsLanding] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const kycStatus = useKYCStatusStore((state) => state.kycStatus);
  const { t } = useTranslation();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const inGame =
    pathname.startsWith("/game/") && pathname.split("/").length >= 3;
  // Wallet store (Zustand)
  const {
    balance,
    currency,
    loading: walletLoading,
    fetchWallet,
    refreshWallet,
    reset,
  } = useWalletStore();

  // Estado para Reporte (desktop + mobile)
  const [reportOpen, setReportOpen] = useState(false);
  const [reportOpenMobile, setReportOpenMobile] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const navLinks: NavLink[] = [
    { href: "/", label: t("header.home") },
    { href: "/servers", label: t("header.servers") },
    { href: "/games", label: t("header.games") },
    { href: "/recharge", label: t("header.recharge"), showWhenLogged: true },
    { href: "/sign-in", label: t("header.signIn"), showWhenLogged: false },
    { href: "/sign-up", label: t("header.signUp"), showWhenLogged: false },
  ];

  useEffect(() => {
    setIsRecharge(pathname === "/recharge" || pathname === "/withdraw");
    setIsLanding(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenu]);

  // Cierra el popover de reporte si se hace click fuera (desktop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        reportRef.current &&
        !reportRef.current.contains(event.target as Node)
      ) {
        setReportOpen(false);
      }
    }
    if (reportOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [reportOpen]);

  // Fetch inicial cuando hay usuario; reset cuando no hay
  useEffect(() => {
    if (!user?.id) {
      reset();
      return;
    }
    // primer fetch con loading visible
    fetchWallet(user.id);
  }, [user?.id, fetchWallet, reset]);

  // Polling: cada 4s en /game/[slug], cada 15s en otras urls
  useEffect(() => {
    if (!user?.id) return;

    // Detecta ruta /game/[slug]
    const isGamePage =
      pathname.startsWith("/game/") && pathname.split("/").length >= 3;

    const intervalMs = isGamePage ? 4000 : 15000;

    // refresco silencioso para no parpadear el "..."
    const id = setInterval(() => {
      refreshWallet(user.id);
    }, intervalMs);

    // Trigger inmediato al cambiar de ruta para no esperar el primer tick
    refreshWallet(user.id);

    return () => clearInterval(id);
  }, [pathname, user?.id, refreshWallet]);

  // Filtra los links según el estado de login
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.showWhenLogged === undefined) return true;
    return user ? link.showWhenLogged : !link.showWhenLogged;
  });

  // Formulario compartido para reportar problema
  function ReportForm({ afterSubmit }: { afterSubmit?: () => void }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const submitReport = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!description.trim()) {
        toast.error(t("report.form.toasts.requiredDescription"));
        return;
      }
      try {
        setSubmitting(true);
        const res = await fetch("/api/report-issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim() || undefined,
            description: description.trim(),
            url:
              typeof window !== "undefined" ? window.location.href : undefined,
            userAgent:
              typeof navigator !== "undefined"
                ? navigator.userAgent
                : undefined,
          }),
        });
        if (!res.ok) throw new Error("Server error");
        toast.success(t("report.form.toasts.success"));
        setDescription("");
        setEmail("");
        afterSubmit?.();
      } catch {
        toast.error(t("report.form.toasts.error"));
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <form onSubmit={submitReport} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="report_desc" className="text-sm text-white/80">
            {t("report.form.describeLabel")}
          </label>
          <textarea
            id="report_desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-[#FFC827]/40 px-3 py-2 text-sm outline-none bg-white text-gray-900 focus:ring-2 focus:ring-[#FFC827]"
            rows={4}
            placeholder={t("report.form.describePlaceholder")}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            className="px-3 py-2 text-sm rounded-md border border-[#FFC827]/60 text-white hover:bg-white/10 cursor-pointer"
            onClick={() => afterSubmit?.()}
          >
            {t("report.form.cancel")}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-3 py-2 text-sm rounded-md bg-[#FFC827] text-[#2e0327] hover:opacity-90 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? t("report.form.submitting") : t("report.form.submit")}
          </button>
        </div>
      </form>
    );
  }

  // Badge de balance (desktop + mobile)
  const BalanceBadge = () => (
    <Link
      href={"/withdraw"}
      className={`flex items-center gap-2 px-3 py-1 rounded-full border hover:scale-110 transition-all duration-300 hover:bg-[#FFC827] hover:text-[#2e0327] text-[#FFC827] ${
        isRecharge ? "border-[#FFC827]" : "border-[#FFC827]"
      } bg-black/20`}
      title={t("totalBalance") ?? "Total Balance"}
      onClick={() => {
        setOpen(false);
      }}
    >
      <span className="font-semibold">
        {walletLoading ? "..." : `$${balance.toLocaleString()}`}
      </span>
      <span className="text-[10px]">{walletLoading ? "" : currency}</span>
    </Link>
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
          : isLanding || inGame
          ? "bg-[#2e0327] bg-opacity-95"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-4 ${
          scrolled ? "py-4" : "py-5"
        } transition-all duration-300`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`items-center gap-2 select-none ${
            isAuthPage ? "hidden md:flex" : "flex"
          }`}
        >
          <Image src="/logo.svg" alt="Logo" width={150} height={44} />
        </Link>
        <div
          className={`items-center gap-2 select-none ${
            !isAuthPage ? "hidden md:flex" : "flex"
          }`}
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center uppercase">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white hover:text-[#FFC827] transition-colors font-medium select-none pb-1 ${
                pathname === link.href ? "border-b-2 border-[#FFC827]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lado derecho: Report + Balance + User menu (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Botón Reportar problema (desktop) */}
          <div className="relative" ref={reportRef}>
            <button
              onClick={() => setReportOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFC827] text-[#FFC827] hover:bg-[#FFC827] hover:text-[#2e0327] hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-expanded={reportOpen}
              aria-controls="report-popover"
            >
              {/* Icono bug */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 7V3" />
                <path d="M16 7V3" />
                <path d="M9 11H15" />
                <path d="M9 15H15" />
                <rect x="6" y="7" width="12" height="14" rx="6" />
                <path d="M19 7l1.5-1.5" />
                <path d="M5 7L3.5 5.5" />
              </svg>
              <span className="hidden lg:inline">{t("report.label")}</span>
            </button>

            {reportOpen && (
              <div
                id="report-popover"
                className={`absolute right-0 mt-2 w-80 ${
                  isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
                } border border-[#FFC827] rounded-lg shadow-lg p-4 text-white z-50`}
              >
                <div className="mb-2 font-semibold">{t("report.title")}</div>
                <ReportForm afterSubmit={() => setReportOpen(false)} />
              </div>
            )}
          </div>

          {/* Mostrar balance solo si user */}
          {user && <BalanceBadge />}

          {user && (
            <div className="relative ml-2" ref={userMenuRef}>
              <div
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
                aria-label="Abrir menú de usuario"
              >
                <Link href={"/profile"} className="flex items-center gap-x-2">
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
                </Link>
                <svg
                  className={`w-4 h-4 text-[#FFC827] transition-transform ${
                    userMenu ? "rotate-180" : ""
                  }`}
                  onClick={() => setUserMenu((v) => !v)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
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
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors capitalize"
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
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => {
            setOpen((v) => !v);
            // cerrar popover desktop si estaba abierto
            setReportOpen(false);
          }}
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
          className={`md:hidden ${
            isRecharge ? "bg-neutral-950" : "bg-[#2e0327]"
          } bg-opacity-95 px-4 pb-4 pt-2 flex flex-col gap-4 uppercase transition-all duration-300 ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
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
              className={`text-white hover:text-[#FFC827] transition-colors font-medium pb-1 ${
                pathname === link.href ? "border-b-2 border-[#FFC827]" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Sección Reportar (mobile) */}
          <div className="mt-1">
            <button
              onClick={() => setReportOpenMobile((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-[#FFC827] text-[#FFC827] hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
              aria-expanded={reportOpenMobile}
              aria-controls="report-mobile"
            >
              <span className="flex items-center gap-2">
                {/* Icono bug */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 7V3" />
                  <path d="M16 7V3" />
                  <path d="M9 11H15" />
                  <path d="M9 15H15" />
                  <rect x="6" y="7" width="12" height="14" rx="6" />
                  <path d="M19 7l1.5-1.5" />
                  <path d="M5 7L3.5 5.5" />
                </svg>
                {t("report.title")}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  reportOpenMobile ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {reportOpenMobile && (
              <div
                id="report-mobile"
                className="mt-3 border border-[#FFC827] rounded-lg p-3 text-white"
              >
                <ReportForm
                  afterSubmit={() => {
                    setReportOpenMobile(false);
                    setOpen(false);
                  }}
                />
              </div>
            )}
          </div>

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
