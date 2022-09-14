import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
// import img from "../src/assets/32rij.jpg";

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    backend:{
        // translation file path. ns= namespace, lng = language
        loadPath: "assets/i18n/{{ns}}/{{lng}}.json" 
    },
    fallbackLng: "en",
    debug: false,

    // you can have multiple namespaces, 
    // in case you want to divide a huge translation into smaller pieces and load them on demand
    ns: ["common", "header", "login", "signup", "recovery", "footer", "productCard"],

    interpolation:{
        escapeValue: false,
        formatSeparator: ",",
    },
    react:{
        wait: true,
    }
});

export default i18n;