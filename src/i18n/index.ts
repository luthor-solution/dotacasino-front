import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa tus archivos JSON
import en from "./locales/en.json";
import es from "./locales/es.json";
import ko from "./locales/ko.json";
import pt from "./locales/pt.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ko: { translation: ko },
    pt: { translation: pt },
  },
  lng: "es", // idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react ya protege de XSS
  },
});

export default i18n;
