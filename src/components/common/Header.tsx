"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { userService } from "@/services/userService";

type NavLink = {
  href: string;
  label: string;
  showWhenLogged?: boolean; // true: solo logueado, false: solo no logueado, undefined: siempre
};

const navLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/sign-in", label: "Iniciar Sesión", showWhenLogged: false },
  { href: "/sign-up", label: "Regístrate", showWhenLogged: false },
  { href: "/recharge", label: "Recargar", showWhenLogged: true },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

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

  // Filtra los links según el estado de login
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.showWhenLogged === undefined) return true;
    return user ? link.showWhenLogged : !link.showWhenLogged;
  });

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-[#2e0327] bg-opacity-95 shadow-lg"
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

        {/* User menu (desktop) */}
        {user && (
          <div className="hidden md:block relative ml-4" ref={userMenuRef}>
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
              <div className="absolute right-0 mt-2 w-44 bg-[#2e0327] border border-[#FFC827] rounded-lg shadow-lg py-2 z-50 animate-fade-down">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
                  onClick={() => setUserMenu(false)}
                >
                  Mi perfil
                </Link>
                <Link
                  href=""
                  className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
                  onClick={() => {
                    setUserMenu(false);
                  }}
                >
                  Historial
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
                  onClick={() => {
                    setUserMenu(false);
                    logout();
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}

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
            md:hidden bg-[#2e0327] bg-opacity-95 px-4 pb-4 pt-2 flex flex-col gap-4 uppercase
            transition-all duration-300
            ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-8 pointer-events-none"
            }
          `}
          style={{ willChange: "transform, opacity" }}
        >
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
                <div className="mt-2 w-full bg-[#2e0327] border border-[#FFC827] rounded-lg shadow-lg py-2 z-50 animate-fade-down">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
                    onClick={() => {
                      setUserMenu(false);
                      setOpen(false);
                    }}
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href=""
                    className="block px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
                    onClick={() => {
                      setUserMenu(false);
                      setOpen(false);
                    }}
                  >
                    Historial
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#FFC827] hover:text-[#2e0327] transition-colors"
                    onClick={() => {
                      setUserMenu(false);
                      setOpen(false);
                      logout();
                    }}
                  >
                    Cerrar sesión
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
