import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";

const resources = {
  "es-ES": { translation: es },
  "en-US": { translation: en },
};

const initI18n = async () => {
  let savedLanguage;
  
  if (!savedLanguage) {
    savedLanguage = "en-US";
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "es-ES",
    interpolation: {
      escapeValue: false,
    },
  });
};

// Ensure the initialization is awaited
initI18n().catch((error) => console.error("i18n initialization failed", error));

export default i18n;