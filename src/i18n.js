// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Loads translations from /public/locales
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    // Language codes you defined in /public/locales
    supportedLngs: ['en', 'hi', 'ta', 'te'],
    
    // The default language if the user's language is not available
    fallbackLng: 'en',
    
    // Where to find the translation files
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // Options for react-i18next
    react: {
      useSuspense: true, // Recommended: enables suspense for lazy loading
    },
    
    // Options for the language detector
    detection: {
      // Order and methods to detect language
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      // Cache user language in these locations
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;