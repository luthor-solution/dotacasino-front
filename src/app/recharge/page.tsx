/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { depositService } from "@/services/depositsService";
import { walletService } from "@/services/walletService";
import stdMexService from "@/services/stdMexService";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// --- Tipos auxiliares ---
type Network = "BSC" | "TRX" | "ETH" | "POLYGON";
type Tab = "CRIPTO" | "SPEI";

type CreateDepositRequest = {
  amount: number;
  network: Network;
};

type CreateDepositResponse = {
  depositId: string;
  address: string; // dirección donde enviar
  chain: Network;
  expiresAt: string; // ISO datetime
  amount: number;
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

// --- Componente principal ---
export default function RecargaFichasPage() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  // Tabs
  const [activeTab, setActiveTab] = useState<Tab>("CRIPTO");

  const [balance, setBalance] = useState<number>(0);

  // CRIPTO
  const [amount, setAmount] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("BSC");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [uiMessage, setUiMessage] = useState<string>("");
  const [deposit, setDeposit] = useState<CreateDepositResponse | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // SPEI (solo lectura)
  const [speiClabe, setSpeiClabe] = useState<string>("");
  const [speiBanco, setSpeiBanco] = useState<string>("STP");
  const [speiMetodoPago] = useState<string>("PAGO"); // siempre en mayúsculas

  // Nombre completo desde el usuario (con fallback)
  const fullName =
    [user?.firstName?.trim(), user?.lastName?.trim()]
      .filter(Boolean)
      .join(" ") || "[Tu nombre completo]";

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

  // Polling cada 5s mientras haya un QR activo y estemos en la pestaña CRIPTO
  useEffect(() => {
    if (activeTab !== "CRIPTO") return;
    if (!deposit?.address) return;

    let intervalId: number | null = null;
    let stopped = false;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleOK = async () => {
      setUiMessage("Depósito acreditado correctamente.");

      // Refrescar balance cuando se acredita
      try {
        const wallet = await walletService.getWallet();
        setBalance(wallet.balance);
      } catch (e: any) {
        console.warn(
          "[wallet] no se pudo refrescar el balance tras OK:",
          e?.message || e
        );
      }

      // Detener polling y resetear UI
      stop();
      setTimeout(() => {
        setUiMessage("");
        setDeposit(null);
        setSeconds(0);
        setAmount("");
        setSelectedNetwork("BSC");
        setError("");
      }, 3000);
    };

    const tick = async () => {
      try {
        const res: any = await depositService.polling({
          address: deposit.address,
        });

        const value = String(res).toUpperCase();

        if (value === "COMPLETED") {
          handleOK();
          return;
        }
        if (value === "NO") {
          return;
        }

        const fallback = String(res?.status ?? res?.result ?? "").toUpperCase();
        if (fallback === "OK") {
          handleOK();
          return;
        }
      } catch (e: any) {
        console.warn(
          "[deposit polling] error:",
          e?.response?.data || e?.message || e
        );
      }
    };

    // Disparo inicial e intervalo de 5s
    tick();
    intervalId = window.setInterval(tick, 5000);

    return () => {
      stop();
    };
  }, [deposit?.address, activeTab]);

  // Al montar, intenta recuperar el QR vigente desde el backend (para CRIPTO)
  useEffect(() => {
    const loadCurrentQR = async () => {
      try {
        setError("");
        const data: any = await depositService.getCurrentQR();
        if (!data) return;

        const address: string = data.address ?? data.wallet_address ?? "";
        const chainRaw: string =
          data.network ?? data.chain ?? data.blockchain ?? "";
        const chain = chainRaw?.toUpperCase() as Network;
        const expiresAt: string = data.expires_at ?? data.expiresAt ?? "";
        const qrDataUrl: string | undefined =
          data.qrcode_url ?? data.qrDataUrl ?? undefined;
        const amt: number = typeof data.amount === "number" ? data.amount : 0;

        if (address && chain && expiresAt) {
          const normalized: CreateDepositResponse = {
            depositId: data.id ?? data.depositId ?? crypto.randomUUID(),
            address,
            chain,
            expiresAt,
            amount: amt,
            qrDataUrl,
          };
          setDeposit(normalized);
        }
      } catch (e: any) {
        console.warn("No current QR or failed to fetch:", e?.message || e);
      }
    };

    loadCurrentQR();
  }, []);

  // Manejo del temporizador (solo CRIPTO/QR)
  useEffect(() => {
    if (!deposit?.expiresAt) return;
    setSeconds(secondsLeft(deposit.expiresAt));

    if (timerRef.current) window.clearInterval(timerRef.current);
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
    if (activeTab !== "CRIPTO") return false;
    const val = parseFloat(amount);
    return !isSubmitting && !deposit && !Number.isNaN(val) && val > 0;
  }, [amount, isSubmitting, deposit, activeTab]);

  // Crear depósito CRIPTO
  async function handleCreateDeposit() {
    try {
      setError("");
      setIsSubmitting(true);
      const val = parseFloat(amount);
      if (Number.isNaN(val) || val <= 0) {
        setError("Ingresa un monto válido");
        return;
      }

      const dataAny: any = await depositService.createQR({
        amount: val,
        network: selectedNetwork,
      } as CreateDepositRequest);

      const normalized: CreateDepositResponse = {
        depositId: dataAny.id ?? dataAny.depositId ?? crypto.randomUUID(),
        address: dataAny.address ?? dataAny.wallet_address ?? "",
        chain: (
          (dataAny.network ?? dataAny.chain) ||
          selectedNetwork
        ).toUpperCase(),
        expiresAt:
          dataAny.expires_at ??
          dataAny.expiresAt ??
          new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        amount: typeof dataAny.amount === "number" ? dataAny.amount : val,
        qrDataUrl: dataAny.qrcode_url ?? dataAny.qrDataUrl ?? undefined,
      };

      if (!normalized.address) {
        throw new Error("La API no devolvió una dirección de depósito");
      }

      setDeposit(normalized);
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Ocurrió un error al crear el depósito"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCancel() {
    try {
      setError("");
      await depositService.cancelCurrentQR();
    } catch (e: any) {
      setError(
        e?.response?.data?.message || e?.message || "No se pudo cancelar el QR"
      );
    } finally {
      setDeposit(null);
      setSeconds(0);
      setAmount("");
      setSelectedNetwork("BSC");
      setUiMessage("");
    }
  }

  async function copyToClipboard(text: string, label?: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label ?? "Texto"} copiado`);
    } catch {
      toast.error("No se pudo copiar. Copia manualmente.");
    }
  }

  // Autorellenar CLABE/Banco al entrar en la pestaña SPEI (solo lectura)
  useEffect(() => {
    if (activeTab !== "SPEI") return;

    let mounted = true;
    (async () => {
      try {
        const data: any = await stdMexService.getClabe();
        if (!mounted) return;

        const clabe = String(data?.clabe ?? "").replace(/\D/g, "");
        if (clabe.length === 18) {
          setSpeiClabe(clabe);
        } else {
          setSpeiClabe("");
          toast.error("No se encontró CLABE. Inténtalo más tarde.");
        }

        if (data?.banco) {
          setSpeiBanco(String(data.banco));
        } else {
          setSpeiBanco("STP");
        }
      } catch (e: any) {
        setSpeiClabe("");
        setSpeiBanco("STP");
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "No se pudo obtener la CLABE";
        toast.error(msg);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeTab]);

  const isOverlayActive = Boolean(uiMessage) || seconds === 0;

  return (
    <div className="bg-neutral-950 text-neutral-100 px-4 py-10 mt-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {t("app.title")}
          </h1>
          <p className="text-neutral-400 mt-1">{t("app.subtitle")}</p>
        </header>

        {/* Tabs */}
        <div className="mb-6">
          <div className="inline-flex rounded-xl border border-neutral-800 bg-neutral-900/60 p-1">
            <button
              onClick={() => setActiveTab("CRIPTO")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === "CRIPTO"
                  ? "bg-emerald-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              Cripto
            </button>
            <button
              onClick={() => setActiveTab("SPEI")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === "SPEI"
                  ? "bg-emerald-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              SPEI
            </button>
          </div>
        </div>

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
                {t("balanceCard.title")}
              </p>
              <p className="mt-1 text-3xl font-bold">
                {formatCurrency(balance)}
              </p>
            </div>
          </div>
        </section>

        {/* ——————————— TAB: CRIPTO ——————————— */}
        {activeTab === "CRIPTO" && !deposit && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <h2 className="text-lg font-medium mb-4">{t("form.title")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-300">
                  {t("form.amountLabel")}
                </label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder={t("form.amountPlaceholder")}
                  className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-300">
                  {t("form.networkLabel")}
                </label>
                <select
                  value={selectedNetwork}
                  onChange={(e) =>
                    setSelectedNetwork(e.target.value as Network)
                  }
                  className="mt-2 w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="BSC">{t("form.networks.BSC")}</option>
                  <option value="ETH">{t("form.networks.ETH")}</option>
                  <option value="POLYGON">{t("form.networks.POLYGON")}</option>
                  <option value="TRX">{t("form.networks.TRX")}</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-xl px-3 py-2">
                {t("form.error", { error })}
              </div>
            )}

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleCreateDeposit}
                disabled={!canSubmit}
                className="rounded-xl px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>
              <button
                onClick={() => {
                  setAmount("");
                  setSelectedNetwork("BSC");
                  setError("");
                }}
                className="rounded-xl px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
              >
                {t("form.clear")}
              </button>
            </div>
          </section>
        )}

        {/* Vista de pago con QR (solo CRIPTO) */}
        {activeTab === "CRIPTO" && deposit && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">{t("payment.title")}</h2>
                <p className="text-sm text-neutral-400 mt-1">
                  {t("payment.selectedNetwork")}{" "}
                  <span className="font-medium text-neutral-200">
                    {deposit.chain}
                  </span>
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {t("payment.amount")}{" "}
                  <span className="font-medium text-neutral-200">
                    {formatCurrency(deposit.amount)}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-neutral-400">
                  {t("payment.expiresIn")}
                </span>
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
              {/* QR + overlays */}
              <div className="relative flex items-center justify-center">
                <img
                  src={deposit.qrDataUrl}
                  alt={t("payment.qrAlt")}
                  className="w-64 h-64 rounded-2xl border border-neutral-800 bg-neutral-950 p-3"
                />

                {/* Overlay éxito */}
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
                      <p className="text-neutral-400 text-xs mt-1">
                        {t("overlays.success.redirecting")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Overlay expiración */}
                {!uiMessage && seconds === 0 && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px]" />
                    <div className="relative z-10 flex flex-col items-center text-center px-4">
                      <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-600/50 flex items-center justify-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-7 h-7 text-red-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-red-300 text-sm md:text-base font-medium">
                        {t("overlays.expired.title")}
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        {t("overlays.expired.subtitle")}
                      </p>

                      <button
                        onClick={async () => {
                          try {
                            await depositService
                              .cancelCurrentQR()
                              .catch(() => {});
                          } finally {
                            setDeposit(null);
                            setSeconds(0);
                            setAmount("");
                            setSelectedNetwork("BSC");
                            setError("");
                            setUiMessage("");
                          }
                        }}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-sm"
                      >
                        {t("payment.generateNewQr")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-neutral-300">
                  {t("payment.walletAddressLabel")}
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    readOnly
                    value={deposit.address}
                    title={
                      isOverlayActive
                        ? t("payment.walletAddressTitleDisabled")
                        : t("payment.walletAddressTitleEnabled")
                    }
                    className={[
                      "w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 font-mono text-sm transition",
                      isOverlayActive
                        ? "opacity-60 blur-[1px] pointer-events-none select-none"
                        : "",
                    ].join(" ")}
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(deposit.address, "Dirección")
                    }
                    disabled={isOverlayActive}
                    title={
                      isOverlayActive
                        ? t("payment.copyDisabled")
                        : t("payment.copy")
                    }
                    className={[
                      "shrink-0 rounded-xl px-3 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition",
                      isOverlayActive
                        ? "opacity-60 blur-[1px] pointer-events-none"
                        : "",
                    ].join(" ")}
                  >
                    {t("payment.copy")}
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-neutral-900 border border-neutral-800 p-3 text-sm text-neutral-300">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t("payment.notes.onlyUsdt"),
                        }}
                      />
                    </li>
                    <li>{t("payment.notes.expiresAtZero")}</li>
                    <li>{t("payment.notes.autoCredit")}</li>
                  </ul>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    className="rounded-xl px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
                  >
                    {t("payment.cancel")}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ——————————— TAB: SPEI — SOLO LECTURA ——————————— */}
        {activeTab === "SPEI" && (
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <h2 className="text-lg font-medium mb-4">{t("spei.title")}</h2>

            <div className="space-y-3">
              {/* Banco */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-[120px] text-sm text-neutral-400">
                  {t("spei.bankLabel")}
                </div>
                <div className="flex-1">
                  <div className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 text-sm">
                    {speiBanco || "STP"}
                  </div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(speiBanco || "STP", t("spei.bankLabel"))
                  }
                  className="shrink-0 rounded-xl px-3 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm cursor-pointer"
                  title={t("spei.copyBankTitle")}
                >
                  {t("spei.copy")}
                </button>
              </div>

              {/* CLABE */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-[120px] text-sm text-neutral-400">
                  {t("spei.clabeLabel")}
                </div>
                <div className="flex-1">
                  <div className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 font-mono text-sm cursor-pointer">
                    {speiClabe || t("spei.unavailable")}
                  </div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(speiClabe || "", t("spei.clabeLabel"))
                  }
                  disabled={!speiClabe}
                  className={[
                    "shrink-0 rounded-xl px-3 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm cursor-pointer",
                    !speiClabe ? "opacity-50 cursor-not-allowed" : "",
                  ].join(" ")}
                  title={
                    speiClabe
                      ? t("spei.copyClabeTitle")
                      : t("spei.copyClabeUnavailable")
                  }
                >
                  {t("spei.copy")}
                </button>
              </div>

              {/* Beneficiario (Nombre completo) */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-[120px] text-sm text-neutral-400">
                  {t("spei.beneficiaryLabel")}
                </div>
                <div className="flex-1">
                  <div className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 text-sm">
                    {fullName}
                  </div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(fullName, t("spei.beneficiaryLabel"))
                  }
                  className="shrink-0 rounded-xl px-3 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm cursor-pointer"
                  title={t("spei.copyBeneficiaryTitle")}
                >
                  {t("spei.copy")}
                </button>
              </div>

              {/* Método de pago (PAGO) */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-[120px] text-sm text-neutral-400">
                  {t("spei.conceptLabel")}
                </div>
                <div className="flex-1">
                  <div className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-3 text-sm">
                    {speiMetodoPago}
                  </div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(speiMetodoPago, t("spei.conceptLabel"))
                  }
                  className="shrink-0 rounded-xl px-3 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm"
                  title={t("spei.copyConceptTitle")}
                >
                  {t("spei.copy")}
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-amber-900/20 border border-amber-700/50 p-3">
              <p className="text-amber-300 text-sm">
                {t("spei.importantNote")}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
