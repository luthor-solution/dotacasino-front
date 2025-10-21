import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import ko from "./locales/ko.json";
import pt from "./locales/pt.json";

const savedLng =
  typeof window !== "undefined"
    ? localStorage.getItem("i18nextLng") ?? "es"
    : "es";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ko: { translation: ko },
    pt: { translation: pt },
  },
  lng: savedLng,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
