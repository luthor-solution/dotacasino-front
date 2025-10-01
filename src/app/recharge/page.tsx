/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Tipos auxiliares ---
type Network = "BSC" | "TRX" | "ETH" | "POLYGON";

type CreateDepositRequest = {
  amount: number;
  network: Network;
};

type CreateDepositResponse = {
  depositId: string;
  address: string; // dirección donde enviar
  chain: Network;
  expiresAt: string; // ISO datetime
  // Si tu backend ya genera un QR (data URL), puedes incluirlo aquí
  qrDataUrl?: string;
};

// --- Utilidades ---
const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD" }).format(
    n
  );

function secondsLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.floor(diff / 1000));
}

function toMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// Puedes cambiar este generador por el de tu backend si devuelves qrDataUrl
// Aquí usamos un servicio de QR público para simplificar el ejemplo
function makeQrUrl(data: string) {
  const encoded = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
}

// --- Componente principal ---
export default function RecargaFichasPage() {
  // En un caso real, obtén el balance del backend
  const [balance, setBalance] = useState<number>(1250);
  const [amount, setAmount] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("BSC");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  // Estado de la orden de depósito
  const [deposit, setDeposit] = useState<CreateDepositResponse | null>(null);

  // Contador regresivo
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!deposit) return;
    // Inicializa contador
    setSeconds(secondsLeft(deposit.expiresAt));

    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [deposit?.expiresAt]);

  const canSubmit = useMemo(() => {
    const val = parseFloat(amount);
    return !isSubmitting && !deposit && !Number.isNaN(val) && val > 0;
  }, [amount, isSubmitting, deposit]);

  async function handleCreateDeposit() {
    try {
      setError("");
      setIsSubmitting(true);
      const val = parseFloat(amount);
      if (Number.isNaN(val) || val <= 0) {
        setError("Ingresa un monto válido");
        return;
      }

      // Llama a tu endpoint real
      // const res = await fetch("/api/deposits", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ amount: val, network: selectedNetwork } as CreateDepositRequest),
      // });
      // if (!res.ok) throw new Error("No se pudo crear el depósito");
      // const data: CreateDepositResponse = await res.json();

      // Mock de respuesta (15 minutos de ventana)
      const now = Date.now();
      const data: CreateDepositResponse = {
        depositId: crypto.randomUUID(),
        address:
          selectedNetwork === "TRX"
            ? "TUSDTkQ5o2hFaKE8qj1Rmk1vFQx1EXAMPLE"
            : selectedNetwork === "ETH"
            ? "0x9a7a3C1F9bE36f6d7aF8b6e3d3B2c4e9FEXAMPLe"
            : selectedNetwork === "POLYGON"
            ? "0xABcD1234EFe0921aaBBccD11223344EXAMPLE"
            : "0xBSC1234abcdEFef9090abCdEe1122334455EXAMPLE",
        chain: selectedNetwork,
        expiresAt: new Date(now + 15 * 60 * 1000).toISOString(),
        qrDataUrl: undefined, // si tu backend lo manda, úsalo abajo
      };

      setDeposit(data);
    } catch (e: any) {
      setError(e?.message || "Ocurrió un error al crear el depósito");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setDeposit(null);
    setSeconds(0);
    setAmount("");
    setSelectedNetwork("BSC");
    setError("");
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // Feedback simple, puedes reemplazar por un toast
      alert("Dirección copiada al portapapeles");
    } catch {
      alert("No se pudo copiar. Copia manualmente.");
    }
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 px-4 py-10 mt-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Recargar fichas
          </h1>
          <p className="text-neutral-400 mt-1">
            Deposita con USDT en tu red favorita y acredita tus fichas al
            instante.
          </p>
        </header>

        {/* Card: Balance */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Balance actual</p>
              <p className="mt-1 text-3xl font-bold">
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-neutral-800 border border-neutral-700">
                ID: user-123
              </span>
            </div>
          </div>
        </section>

        {/* Formulario de creación de depósito */}
        {!deposit && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <h2 className="text-lg font-medium mb-4">
              Generar orden de depósito
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-300">
                  Monto a depositar (USD)
                </label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Ej. 25"
                  className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-300">Red (USDT)</label>
                <select
                  value={selectedNetwork}
                  onChange={(e) =>
                    setSelectedNetwork(e.target.value as Network)
                  }
                  className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="BSC">BSC · BEP20</option>
                  <option value="ETH">ETH · ERC20</option>
                  <option value="POLYGON">POLYGON · ERC20</option>
                  <option value="TRX">TRX · TRC20</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleCreateDeposit}
                disabled={!canSubmit}
                className="rounded-xl px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Creando orden..." : "Generar QR de depósito"}
              </button>
              <button
                onClick={() => {
                  setAmount("");
                  setSelectedNetwork("BSC");
                  setError("");
                }}
                className="rounded-xl px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
              >
                Limpiar
              </button>
            </div>
          </section>
        )}

        {/* Vista de pago con QR */}
        {deposit && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">
                  Enviar USDT a esta dirección
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  Red seleccionada:{" "}
                  <span className="font-medium text-neutral-200">
                    {deposit.chain}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-neutral-400">Expira en</span>
                <div
                  className={`text-2xl font-bold ${
                    seconds === 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {toMMSS(seconds)}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                <img
                  src={deposit.qrDataUrl || makeQrUrl(deposit.address)}
                  alt="QR de depósito"
                  className="w-64 h-64 rounded-2xl border border-neutral-800 bg-neutral-950 p-3"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-300">
                  Dirección de wallet
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    readOnly
                    value={deposit.address}
                    className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(deposit.address)}
                    className="shrink-0 rounded-xl px-3 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
                    title="Copiar"
                  >
                    Copiar
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-neutral-900 border border-neutral-800 p-3 text-sm text-neutral-300">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Envía solo <span className="font-semibold">USDT</span> en
                      la red indicada.
                    </li>
                    <li>La orden expira al llegar a 00:00.</li>
                    <li>
                      Se acreditará automáticamente después de 1–3
                      confirmaciones.
                    </li>
                  </ul>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    className="rounded-xl px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
                  >
                    Cancelar transacción
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
