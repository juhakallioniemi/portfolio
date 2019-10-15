import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../src/locales/en.json";
import translationFI from "../src/locales/fi.json";

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    fi: {
        translation: translationFI
    }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",

        returnObjects: true,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
