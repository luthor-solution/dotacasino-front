"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useRef, useState } from "react";
import FancyInput from "@/components/FancyInput";
import { COUNTRIES } from "@/utils/countriesAutocomplete";
import { FiFlag } from "react-icons/fi";

interface Country {
  code: string;
  name: string;
}

interface Props {
  placeholder: string;
  name: string;
  icon?: React.ReactNode;
  // AHORA value es el code (ej. "ES")
  value?: string;
  onChange?: (code: string) => void;
  maxSuggestions?: number;
}

const MAX_SUGGESTIONS_DEFAULT = 8;

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function CountryAutocomplete({
  placeholder,
  name,
  icon = <FiFlag />,
  value: propCode,
  onChange,
  maxSuggestions = MAX_SUGGESTIONS_DEFAULT,
}: Props) {
  // Modo controlado/no controlado por code
  const isControlled = propCode !== undefined;
  const [internalCode, setInternalCode] = useState<string>(propCode ?? "");
  const selectedCode = isControlled ? (propCode as string) : internalCode;

  // UI state
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const filterInputRef = useRef<HTMLInputElement | null>(null);

  // Actual país seleccionado (para mostrar nombre)
  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCode) || null,
    [selectedCode]
  );

  // Recalcular sugerencias desde el filtro
  const suggestions: Country[] = useMemo(() => {
    const q = normalize(filter);
    const list = !q
      ? COUNTRIES
      : COUNTRIES.filter((c) => {
          const n = normalize(c.name);
          const cd = c.code.toLowerCase();
          return n.includes(q) || cd.includes(q) || n.startsWith(q);
        });
    return list.slice(0, maxSuggestions);
  }, [filter, maxSuggestions]);

  // Sincronizar interno si cambia controlado
  useEffect(() => {
    if (isControlled) {
      setInternalCode(propCode ?? "");
    }
  }, [isControlled, propCode]);

  // Click fuera → cerrar
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Abrir y enfocar filtro
  const openMenu = () => {
    setOpen(true);
    // Inicializar filtro vacío al abrir para listar todo
    setFilter("");
    setSelectedIndex(-1);
    requestAnimationFrame(() => {
      filterInputRef.current?.focus();
    });
  };

  // Cerrar menú
  const closeMenu = () => {
    setOpen(false);
    setSelectedIndex(-1);
  };

  // Confirmar selección (siempre por code)
  const commit = (code: string) => {
    if (!isControlled) setInternalCode(code);
    onChange?.(code);
    closeMenu();
  };

  // Navegación con teclado dentro del filtro/lista
  const onFilterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setOpen(true);
      setSelectedIndex((i) => {
        const next = Math.min(i + 1, suggestions.length - 1);
        return suggestions.length ? Math.max(next, 0) : -1;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        commit(suggestions[selectedIndex].code);
        e.preventDefault();
      }
    } else if (e.key === "Escape") {
      closeMenu();
      e.preventDefault();
    } else if (e.key === "Tab") {
      // cerrar al tabular
      closeMenu();
    }
  };

  // Teclado sobre el “trigger” (FancyInput)
  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      openMenu();
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Valor real enviado al payload (code) */}
      <input type="hidden" name={name} value={selectedCode ?? ""} />

      {/* Trigger visual (muestra nombre, no editable) */}
      <div
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        {/* Reutilizamos FancyInput para mantener el estilo.
            Lo usamos como “readOnly display” del label seleccionado. */}
        <FancyInput
          placeholder={placeholder}
          name={`${name}__display`}
          icon={icon}
          value={selectedCountry?.name ?? ""}
          onChange={() => {
            /* No editable: el cambio ocurre desde el dropdown */
          }}
        />
      </div>

      {/* Dropdown con filtro + opciones */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-1 z-50 max-h-72 overflow-auto rounded-md border border-[#a97bbf33] bg-[#0f0b12] shadow-lg"
          role="listbox"
          aria-label="Selecciona un país"
        >
          {/* Filtro */}
          <div className="p-2 border-b border-[#a97bbf33]">
            <input
              ref={filterInputRef}
              type="text"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={onFilterKeyDown}
              placeholder="Filtrar por nombre o código..."
              className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400 px-2 py-2 rounded-md focus:ring-1 ring-[#a97bbf66]"
              aria-label="Filtro de países"
            />
          </div>

          {/* Opciones */}
          <div className="py-1">
            {suggestions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400">
                Sin resultados
              </div>
            ) : (
              suggestions.map((c, idx) => {
                const isActive = idx === selectedIndex;
                const isSelected = c.code === selectedCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(e) => {
                      // prevenir blur antes del click
                      e.preventDefault();
                      commit(c.code);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3 py-2 text-sm text-white transition-colors flex justify-between items-center hover:bg-[#1b1522] ${
                      isActive ? "bg-[#1b1522]" : ""
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-gray-400">{c.code}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
