
/* ==========================================================
   908 STUDIOS - DOCUMENTATION JS CORE
   app.js
========================================================== */


/* ==========================================================
   BARRE DE PROGRESSION DE SCROLL
========================================================== */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

});


/* ==========================================================
   MODE SOMBRE / THÈME
========================================================== */

const themeButton = document.getElementById("themeButton");

let isDark = true; // thème par défaut

function applyTheme(dark) {

    const root = document.documentElement;

    if (dark) {

        root.style.setProperty("--background", "#07111F");
        root.style.setProperty("--surface", "#13243D");
        root.style.setProperty("--text", "#F5F8FC");

        themeButton.textContent = "🌙 Dark";

    } else {

        root.style.setProperty("--background", "#F5F8FC");
        root.style.setProperty("--surface", "#FFFFFF");
        root.style.setProperty("--text", "#0B1220");

        themeButton.textContent = "☀️ Light";

    }

}

if (themeButton) {

    themeButton.addEventListener("click", () => {

        isDark = !isDark;

        applyTheme(isDark);

    });

}


/* ==========================================================
   RETOUR EN HAUT (UTILITAIRE)
========================================================== */

const backToTop = document.createElement("button");

backToTop.innerText = "⬆";

backToTop.id = "backToTop";

document.body.appendChild(backToTop);

backToTop.style.position = "fixed";
backToTop.style.bottom = "25px";
backToTop.style.right = "25px";
backToTop.style.padding = "12px 16px";
backToTop.style.borderRadius = "50%";
backToTop.style.border = "none";
backToTop.style.cursor = "pointer";
backToTop.style.background = "#00CFFF";
backToTop.style.color = "#000";
backToTop.style.display = "none";
backToTop.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
backToTop.style.zIndex = "999";

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});


/* ==========================================================
   AMÉLIORATION UX SIMPLE
========================================================== */

// Smooth focus sur le search box
const searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("focus", () => {

        searchBox.style.transform = "scale(1.02)";

    });

    searchBox.addEventListener("blur", () => {

        searchBox.style.transform = "scale(1)";

    });

}
