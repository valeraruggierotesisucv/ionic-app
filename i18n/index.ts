import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Storage } from '@ionic/storage';

import en from "./locales/en.json";
import es from "./locales/es.json";

const resources = {
  "es-ES": { translation: es },
  "en-US": { translation: en },
};

const LANGUAGE_KEY = 'user_language';
const store = new Storage();

// Create a promise that resolves when i18n is initialized
let i18nInitialized = false;
let initPromise: Promise<void>;

const initI18n = async () => {
  if (i18nInitialized) {
    return;
  }

  await store.create();
  let savedLanguage;
  
  try {
    savedLanguage = await store.get(LANGUAGE_KEY);
    
    if (!savedLanguage) {
      savedLanguage = "en-US";
      await store.set(LANGUAGE_KEY, savedLanguage);
    }

    await i18n.use(initReactI18next).init({
      resources,
      lng: savedLanguage,
      fallbackLng: "es-ES",
      interpolation: {
        escapeValue: false,
      },
    });

    i18n.on('languageChanged', async (lng) => {
      try {
        await store.set(LANGUAGE_KEY, lng);
      } catch (error) {
        console.error('Error saving language preference:', error);
      }
    });

    i18nInitialized = true;

  } catch (error) {
    console.error('Error initializing language:', error);
    await i18n.use(initReactI18next).init({
      resources,
      lng: "en-US",
      fallbackLng: "es-ES",
      interpolation: {
        escapeValue: false,
      },
    });
    i18nInitialized = true;
  }
};

// Create the initial promise
initPromise = initI18n();

export { initPromise };
export default i18n;