
/* ==========================================================
   908 STUDIOS - LANGUAGE SYSTEM
   language.js
========================================================== */


/* ==========================================================
   ÉTAT DE LA LANGUE
========================================================== */

let currentLanguage = "fr";

const languageButton = document.getElementById("languageButton");


/* ==========================================================
   DICTIONNAIRE DE TRADUCTION
========================================================== */

const translations = {

    fr: {

        welcomeTitle: "Bienvenue dans la documentation juridique de 908 Studios",
        welcomeText: "Cette documentation centralise les informations légales, les conditions d'utilisation des services, la politique de confidentialité, les licences Open Source ainsi que les informations relatives aux comptes 908.",

        startButton: "Commencer la lecture",
        backButton: "Retour au site",

        presentationTag: "Présentation",
        presentationTitle: "À propos de 908 Studios",

        legalTag: "Mentions légales",
        legalTitle: "Informations légales",

        searchPlaceholder: "Rechercher...",

        themeDark: "🌙 Dark",
        themeLight: "☀️ Light"

    },

    en: {

        welcomeTitle: "Welcome to 908 Studios Legal Documentation",
        welcomeText: "This documentation centralizes legal information, service terms, privacy policy, open source licenses, and 908 account-related information.",

        startButton: "Start reading",
        backButton: "Back to site",

        presentationTag: "Overview",
        presentationTitle: "About 908 Studios",

        legalTag: "Legal notice",
        legalTitle: "Legal information",

        searchPlaceholder: "Search...",

        themeDark: "🌙 Dark",
        themeLight: "☀️ Light"

    }

};


/* ==========================================================
   FONCTION DE TRADUCTION
========================================================== */

function applyLanguage(lang) {

    const t = translations[lang];

    if (!t) return;

    currentLanguage = lang;

    // Titres principaux
    const heroTitle = document.querySelector(".hero h2");
    const heroText = document.querySelector(".hero p");

    if (heroTitle) heroTitle.textContent = t.welcomeTitle;
    if (heroText) heroText.textContent = t.welcomeText;

    // Boutons
    const heroButtons = document.querySelectorAll(".hero-buttons a");

    if (heroButtons[0]) heroButtons[0].textContent = t.startButton;
    if (heroButtons[1]) heroButtons[1].textContent = t.backButton;

    // Tags sections
    const sectionTags = document.querySelectorAll(".section-tag");

    if (sectionTags[0]) sectionTags[0].textContent = t.presentationTag;
    if (sectionTags[1]) sectionTags[1].textContent = t.legalTag;

    // Titres sections
    const sectionTitles = document.querySelectorAll(".doc-section h2");

    if (sectionTitles[0]) sectionTitles[0].textContent = t.presentationTitle;
    if (sectionTitles[1]) sectionTitles[1].textContent = t.legalTitle;

    // Search placeholder
    const searchBox = document.getElementById("searchBox");

    if (searchBox) searchBox.placeholder = t.searchPlaceholder;

    // Bouton thème (optionnel)
    const themeButton = document.getElementById("themeButton");

    if (themeButton) {

        if (themeButton.textContent.includes("Dark")) {
            themeButton.textContent = t.themeDark;
        } else {
            themeButton.textContent = t.themeLight;
        }

    }

}


/* ==========================================================
   SWITCH LANGUE
========================================================== */

if (languageButton) {

    languageButton.addEventListener("click", () => {

        if (currentLanguage === "fr") {

            applyLanguage("en");
            languageButton.textContent = "🇬🇧 English";

        } else {

            applyLanguage("fr");
            languageButton.textContent = "🇫🇷 Français";

        }

    });

}


/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    applyLanguage("fr");

});
