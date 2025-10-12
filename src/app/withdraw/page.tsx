/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { withdrawService } from "@/services/withdrawService";
import { walletService } from "@/services/walletService";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

// --- Tipos auxiliares ---
type Network = "BSC" | "TRX" | "ETH" | "POLYGON";

type CreateWithdrawRequest = {
  amount: number;
  network: Network; // se enviará como "address" en el payload real
  address: string;
};

type CreateWithdrawResult = {
  id?: string | number;
  amount: number;
  chain: Network;
};

// --- Utilidades ---
const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "USD" }).format(
    n
  );

// --- Componente principal (mismo esqueleto/estilos que el de recargas, sin QR) ---
export default function RetiroFichasPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("BSC");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [uiMessage, setUiMessage] = useState<string>("");

  const [withdrawCreated, setWithdrawCreated] =
    useState<CreateWithdrawResult | null>(null);

  // Carga inicial del balance al montar (mismo patrón)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const wallet = await walletService.getWallet();
        if (!mounted) return;
        setBalance(wallet.balance);
      } catch (e: any) {
        console.warn(
          "[wallet] error al obtener balance inicial:",
          e?.message || e
        );
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const { parsedAmount, exceedsBalance, canSubmit } = useMemo(() => {
    const val = parseFloat(amount);
    const isValid = !Number.isNaN(val) && val > 0;
    const exceed = isValid && val > balance;
    return {
      parsedAmount: isValid ? val : NaN,
      exceedsBalance: !!exceed,
      canSubmit: !isSubmitting && !withdrawCreated && isValid && !exceed,
    };
  }, [amount, isSubmitting, withdrawCreated, balance]);

  // Crear retiro (NO QR, NO polling)
  async function handleCreateWithdraw() {
    try {
      setError("");
      setIsSubmitting(true);

      const val = parsedAmount;
      if (Number.isNaN(val) || val <= 0) {
        setError(t("withdraw.form.invalidAmount") || "Ingresa un monto válido");
        return;
      }
      if (val > balance) {
        setError(
          t("withdraw.form.exceedsBalance") ||
            "No puedes retirar más que tu balance disponible"
        );
        return;
      }

      if (val < 10) {
        setError(
          t("withdraw.form.minimumWithdrawAmount") ||
            "El monto mínimo de retiro es de 5 dólares"
        );
        return;
      }

      const req: CreateWithdrawRequest = {
        amount: val,
        network: selectedNetwork,
        address: address,
      };

      // address = network seleccionada
      const dataAny: any = await withdrawService.create({
        amount: req.amount,
        address: req.address,
      });

      const normalized: CreateWithdrawResult = {
        id: dataAny?.id ?? dataAny?.withdrawId ?? undefined,
        amount: req.amount,
        chain: req.network,
      };

      setWithdrawCreated(normalized);

      // Feedback de éxito SIN temporizador (permanece hasta acción del usuario)
      setUiMessage(
        t("withdraw.success.overlayMessage") ||
          "Solicitud de retiro creada correctamente."
      );
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          t("withdraw.form.genericError") ||
          "Ocurrió un error al crear el retiro"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCancel() {
    try {
      setError("");
      await withdrawService.cancelCurrent().catch(() => {});
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          t("withdraw.cancelError") ||
          "No se pudo cancelar la solicitud"
      );
    } finally {
      // Reset total (mismo comportamiento de “cancelar”)
      setWithdrawCreated(null);
      setAmount("");
      setSelectedNetwork("BSC");
      setUiMessage("");
    }
  }

  function goToHistory() {
    router.push("/wallet/withdraw/history");
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 px-4 py-10 mt-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {t("withdraw.app.title") || "Retiros"}
          </h1>
          <p className="text-neutral-400 mt-1">
            {t("withdraw.app.subtitle") ||
              "Solicita el retiro de tus fondos a la red seleccionada."}
          </p>
        </header>

        {uiMessage && (
          <div className="mb-6 rounded-xl border border-emerald-800 bg-emerald-950/30 px-3 py-2 text-emerald-300 text-sm">
            {uiMessage}
          </div>
        )}

        {/* Card: Balance */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">
                {t("withdraw.balance.title") || "Balance disponible"}
              </p>
              <p className="mt-1 text-3xl font-bold">
                {formatCurrency(balance)}
              </p>
            </div>
          </div>
        </section>

        {/* Formulario (idéntico layout y estilos) */}
        {!withdrawCreated && (
          <div className="flex flex-col space-y-8 mt-4">
            <div className="flex items-center w-full gap-x-2 justify-end">
              <h2 className="text-lg font-medium leading-0">
                {t("withdraw.minimumAmount")}
              </h2>
              <label className="text-lg font-medium text-red-500 leading-0">
                5 USD
              </label>
            </div>

            <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
              <h2 className="text-lg font-medium mb-4">
                {t("withdraw.form.title") || "Crear retiro"}
              </h2>

              <div className="pb-2">
                <div>
                  <label className="text-sm text-neutral-300">
                    {t("withdraw.form.address")}
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={"0x..."}
                    className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {exceedsBalance && (
                    <p className="mt-2 text-sm text-red-400">
                      {t("withdraw.form.exceedsBalance") ||
                        "No puedes retirar más que tu balance disponible"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-300">
                    {t("withdraw.form.amountLabel") || "Monto a retirar"}
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min={0}
                    step={0.01}
                    max={balance}
                    placeholder={t("withdraw.form.amountPlaceholder") || "0.00"}
                    className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {exceedsBalance && (
                    <p className="mt-2 text-sm text-red-400">
                      {t("withdraw.form.exceedsBalance") ||
                        "No puedes retirar más que tu balance disponible"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-neutral-300">
                    {t("withdraw.form.networkLabel") || "Red"}
                  </label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) =>
                      setSelectedNetwork(e.target.value as Network)
                    }
                    className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled
                  >
                    <option value="BSC">
                      {t("withdraw.form.networks.BSC") || "BSC"}
                    </option>
                    <option value="ETH">
                      {t("withdraw.form.networks.ETH") || "ETH"}
                    </option>
                    <option value="POLYGON">
                      {t("withdraw.form.networks.POLYGON") || "POLYGON"}
                    </option>
                    <option value="TRX">
                      {t("withdraw.form.networks.TRX") || "TRX"}
                    </option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mt-4 text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-xl px-3 py-2">
                  {t("withdraw.form.error", { error }) || `Error: ${error}`}
                </div>
              )}

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={handleCreateWithdraw}
                  disabled={!canSubmit}
                  className="rounded-xl px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isSubmitting
                    ? t("withdraw.form.submitting") || "Enviando..."
                    : t("withdraw.form.submit") || "Solicitar retiro"}
                </button>
                <button
                  onClick={() => {
                    setAmount("");
                    setSelectedNetwork("BSC");
                    setError("");
                  }}
                  className="rounded-xl px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
                >
                  {t("withdraw.form.clear") || "Limpiar"}
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Vista “post-creación” (mismo card y grid; sin QR ni contador) */}
        {withdrawCreated && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">
                  {t("withdraw.summary.title") || "Resumen del retiro"}
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  {t("withdraw.summary.selectedNetwork") || "Red seleccionada"}{" "}
                  <span className="font-medium text-neutral-200">
                    {withdrawCreated.chain}
                  </span>
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {t("withdraw.summary.amount") || "Monto"}{" "}
                  <span className="font-medium text-neutral-200">
                    {formatCurrency(withdrawCreated.amount)}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-neutral-400">
                  {t("withdraw.summary.info") || "Solicitud enviada"}
                </span>
                <div className="text-2xl font-bold text-emerald-400"></div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Panel izquierdo: cuadro del “QR”, ahora con feedback de éxito persistente */}
              <div className="relative flex items-center justify-center">
                <div className="w-64 h-64 rounded-2xl border border-neutral-800 bg-neutral-950 p-3 flex items-center justify-center" />

                {uiMessage && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px]" />
                    <div className="relative z-10 flex flex-col items-center text-center px-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-600/20 border border-emerald-600/50 flex items-center justify-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="w-7 h-7 text-emerald-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-emerald-300 text-sm md:text-base font-medium">
                        {uiMessage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel derecho: notas + acciones */}
              <div>
                <label className="text-sm text-neutral-300">
                  {t("withdraw.nextStepsLabel") ||
                    "Siguientes pasos e información"}
                </label>

                <div className="mt-2 rounded-2xl bg-neutral-900 border border-neutral-800 p-3 text-sm text-neutral-300">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      {t("withdraw.notes.created") ||
                        "Tu solicitud de retiro fue creada correctamente."}
                    </li>
                    <li>
                      {t("withdraw.notes.history") ||
                        "Puedes revisar el estado y cancelarla desde el historial mientras esté pendiente."}
                    </li>
                    <li>
                      {t("withdraw.notes.time") ||
                        "El procesamiento puede tardar algunos minutos."}
                    </li>
                  </ul>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    className="rounded-xl px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
                  >
                    {t("withdraw.cancel") || "Cancelar solicitud"}
                  </button>
                  <button
                    onClick={goToHistory}
                    className="rounded-xl px-4 py-3 bg-emerald-600 hover:bg-emerald-500 font-medium"
                  >
                    {t("withdraw.goToHistory") || "Ir al historial"}
                  </button>
                </div>

                {withdrawCreated.id && (
                  <div className="mt-4 text-xs text-neutral-400">
                    <span className="inline-block px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700">
                      {t("withdraw.requestId", {
                        id: String(withdrawCreated.id),
                      }) || `ID: ${String(withdrawCreated.id)}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
