"use client";
import React, { useEffect, useRef, useState } from "react";
import FancyInput from "@/components/FancyInput";
import { COUNTRIES } from "@/utils/countriesAutocomplete";
import { FiFlag } from "react-icons/fi";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Country {
  code: string;
  name: string;
}

interface Props {
  placeholder: string;
  name: string;
  icon?: React.ReactNode;
  value?: string; // valor controlado (ej. "ES" o "Spain")
  onChange?: (value: string) => void;
}

const MAX_SUGGESTIONS = 8;

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function CountryAutocomplete({
  placeholder,
  name,
  icon = <FiFlag />,
  value: propValue,
  onChange,
}: Props) {
  const isControlled = propValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(propValue ?? "");
  const value = isControlled ? (propValue as string) : internalValue;

  const [query, setQuery] = useState<string>(value ?? "");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Mantener query sincronizado si el componente es controlado externamente
    setQuery(value ?? "");
  }, [value]);

  // filtrar países por nombre o código
  const suggestions: Country[] = COUNTRIES.filter((c: any) => {
    if (!query) return true;
    const q = normalize(query);
    return (
      normalize(c.name).includes(q) ||
      c.code.toLowerCase().includes(q) ||
      normalize(c.name).startsWith(q)
    );
  }).slice(0, MAX_SUGGESTIONS);

  const commit = (val: string) => {
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val);
    setQuery(val);
    setOpen(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    setOpen(true);
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val); // enviar cambio también para controlado
  };

  // click fuera para cerrar
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown") setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        commit(suggestions[selectedIndex].name);
      } else {
        commit(query);
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Reutilizamos FancyInput para mantener el estilo */}
      <FancyInput
        placeholder={placeholder}
        name={name}
        icon={icon}
        value={query}
        onChange={(v) => handleInputChange(v)}
      />

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-1 z-50 max-h-60 overflow-auto rounded-md border border-[#a97bbf33] bg-[#0f0b12] shadow-lg"
          role="listbox"
          aria-label="Sugerencias de países"
        >
          {suggestions.map((c, idx) => (
            <button
              key={c.code}
              type="button"
              onMouseDown={(e) => {
                // onMouseDown para prevenir blur antes de click
                e.preventDefault();
                commit(c.name);
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full text-left px-3 py-2 text-sm text-white hover:bg-[#1b1522] transition-colors flex justify-between items-center ${
                idx === selectedIndex ? "bg-[#1b1522]" : ""
              }`}
            >
              <span>{c.name}</span>
              <span className="text-xs text-gray-400">{c.code}</span>
            </button>
          ))}
        </div>
      )}

      {/* Controles de teclado para accesibilidad */}
      <input
        aria-hidden
        tabIndex={-1}
        value=""
        onKeyDown={onKeyDown}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
