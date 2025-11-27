import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import ko from "./locales/ko.json";
import pt from "./locales/pt.json";

const supportedLngs = ["en", "es", "ko", "pt"] as const;
type SupportedLng = (typeof supportedLngs)[number];

// Dominios por región/idioma
const mxDomains = [
  "dotamx.com",
  "dotacasino-front.vercel.app",
  "dotatable.com",
];
const krDomains = ["dotakorea.com", "dota4korea.com"];

// Obtener idioma guardado en localStorage (si existe y es válido)
const getSavedLanguage = (): SupportedLng | null => {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("i18nextLng");
  if (saved && supportedLngs.includes(saved as SupportedLng)) {
    return saved as SupportedLng;
  }

  return null;
};

// Detectar idioma del navegador (ej: "es-MX" -> "es")
const getBrowserLanguage = (): SupportedLng | null => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return null;
  }

  const navLang =
    navigator.language ||
    (Array.isArray(navigator.languages) && navigator.languages[0]);

  if (!navLang) return null;

  const baseLang = navLang.split("-")[0]; // "es-MX" -> "es"

  if (supportedLngs.includes(baseLang as SupportedLng)) {
    return baseLang as SupportedLng;
  }

  return null;
};

// Fallback dinámico según dominio
const getDomainFallbackLanguage = (): SupportedLng => {
  if (typeof window === "undefined") {
    // fallback por defecto en SSR
    return "en";
  }

  const host = window.location.hostname;

  // Coincidencias exactas con dominios MX → español
  if (mxDomains.includes(host)) {
    return "es";
  }

  // Coincidencias exactas con dominios KR → coreano
  if (krDomains.includes(host)) {
    return "ko";
  }

  // Reglas genéricas de respaldo por TLD (opcional, puedes quitarlas si solo quieres listas fijas)
  if (host.endsWith(".mx") || host.endsWith(".es")) {
    return "es";
  }

  if (host.endsWith(".br")) {
    return "pt";
  }

  if (host.endsWith(".kr")) {
    return "ko";
  }

  // Default global
  return "en";
};

// Resolver idioma inicial
const resolveInitialLanguage = (): SupportedLng => {
  const saved = getSavedLanguage();
  if (saved) return saved;

  const browser = getBrowserLanguage();
  if (browser) return browser;

  return getDomainFallbackLanguage();
};

const initialLng = resolveInitialLanguage();
const fallbackLng = getDomainFallbackLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ko: { translation: ko },
    pt: { translation: pt },
  },
  lng: initialLng,
  fallbackLng, // dinámico según dominio
  supportedLngs,
  interpolation: { escapeValue: false },
});

export default i18n;
