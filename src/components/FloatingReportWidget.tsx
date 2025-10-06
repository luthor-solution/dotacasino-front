"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Position = { x: number; y: number };

const BUBBLE_SIZE = 56; // px
const STORAGE_KEY = "report-bubble-pos";

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export default function FloatingReportWidget() {
  const bubbleRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [pos, setPos] = useState<Position>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const p = JSON.parse(saved) as Position;
          return p;
        } catch {}
      }
      // Posición inicial en esquina inferior derecha
      const x = window.innerWidth - BUBBLE_SIZE - 16;
      const y = window.innerHeight - BUBBLE_SIZE - 24;
      return { x, y };
    }
    return { x: 16, y: 16 };
  });
  const [dragging, setDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const startOffset = useRef<Position | null>(null);
  const downPoint = useRef<{ px: number; py: number } | null>(null);
  const movedRef = useRef(false);

  // Reajustar si cambia el tamaño de la ventana
  useEffect(() => {
    function onResize() {
      const maxX = window.innerWidth - BUBBLE_SIZE - 8;
      const maxY = window.innerHeight - BUBBLE_SIZE - 8;
      setPos((p) => ({ x: clamp(p.x, 8, maxX), y: clamp(p.y, 8, maxY) }));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Click fuera para cerrar el diálogo
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!isOpen) return;
      const target = e.target as Node;
      if (
        dialogRef.current &&
        !dialogRef.current.contains(target) &&
        bubbleRef.current &&
        !bubbleRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick, true);
    return () => document.removeEventListener("mousedown", onDocClick, true);
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    bubbleRef.current?.setPointerCapture(e.pointerId);
    startOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    downPoint.current = { px: e.clientX, py: e.clientY };
    movedRef.current = false;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !startOffset.current) return;
    const nx = e.clientX - startOffset.current.x;
    const ny = e.clientY - startOffset.current.y;
    const maxX = window.innerWidth - BUBBLE_SIZE - 8;
    const maxY = window.innerHeight - BUBBLE_SIZE - 8;
    const clamped = { x: clamp(nx, 8, maxX), y: clamp(ny, 8, maxY) };
    setPos(clamped);

    if (downPoint.current) {
      const dx = Math.abs(e.clientX - downPoint.current.px);
      const dy = Math.abs(e.clientY - downPoint.current.py);
      if (dx > 4 || dy > 4) movedRef.current = true; // Umbral para distinguir click de arrastre
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
    // Guardar posición si hubo movimiento
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
    // Si no hubo movimiento, tratar como click para abrir/cerrar
    if (!movedRef.current) {
      setIsOpen((v) => !v);
    }
  };

  // Posicionamiento del diálogo cerca de la burbuja
  const [dialogPos, setDialogPos] = useState<Position>({ x: 0, y: 0 });
  useEffect(() => {
    if (!isOpen) return;
    const w = dialogRef.current?.offsetWidth ?? 300;
    const h = dialogRef.current?.offsetHeight ?? 220;
    const margin = 12;

    // Preferir arriba; si no cabe, abajo
    const preferAbove = pos.y > h + 48;
    const top = preferAbove ? pos.y - h - margin : pos.y + BUBBLE_SIZE + margin;

    // Alinear el borde derecho del diálogo con el centro de la burbuja,
    // pero que no se salga de la pantalla
    const left = clamp(pos.x - w + BUBBLE_SIZE, 8, window.innerWidth - w - 8);
    const finalTop = clamp(top, 8, window.innerHeight - h - 8);

    setDialogPos({ x: left, y: finalTop });
  }, [isOpen, pos]);

  // Formulario de reporte
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Por favor describe el problema.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/report-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || undefined,
          description: description.trim(),
          url: typeof window !== "undefined" ? window.location.href : undefined,
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
      });
      if (!res.ok) throw new Error("Error en el servidor");
      toast.success("¡Gracias! Tu reporte fue enviado.");
      setIsOpen(false);
      setDescription("");
      setEmail("");
    } catch (err) {
      toast.error("No se pudo enviar el reporte. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        ref={bubbleRef}
        aria-label="Reportar un problema"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          zIndex: 9999,
          touchAction: "none", // importante para touch
        }}
        className="rounded-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow-lg flex items-center justify-center select-none"
      >
        {/* Icono de “bug” */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
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
          <path d="M19 21l1.5 1.5" />
          <path d="M5 21L3.5 22.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label="Reportar problema"
          style={{
            position: "fixed",
            left: dialogPos.x,
            top: dialogPos.y,
            zIndex: 10000,
            width: 320,
            maxWidth: "90vw",
          }}
          className="rounded-xl bg-white shadow-2xl border border-gray-200 p-4 text-gray-900"
        >
          <div className="mb-2 font-semibold">Reportar un problema</div>
          <form onSubmit={submitReport} className="space-y-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="report_email" className="text-sm text-gray-600">
                Correo (opcional)
              </label>
              <input
                id="report_email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="tu@correo.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="report_desc" className="text-sm text-gray-600">
                Describe el problema
              </label>
              <textarea
                id="report_desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                rows={4}
                placeholder="¿Qué estabas haciendo? ¿Qué salió mal?"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
