
/* ==========================================================
   908 STUDIOS - DOCUMENTATION SEARCH
   search.js
========================================================== */


/* ==========================================================
   ÉLÉMENTS PRINCIPAUX
========================================================== */

const searchInput = document.getElementById("searchBox");

const sections = document.querySelectorAll(".doc-section, .hero, .information-card");


/* ==========================================================
   FONCTION DE RECHERCHE
========================================================== */

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

function searchDocs(query) {

    const q = normalizeText(query);

    sections.forEach(section => {

        const text = normalizeText(section.innerText);

        if (q === "") {

            section.style.display = "block";
            removeHighlight(section);

            return;

        }

        if (text.includes(q)) {

            section.style.display = "block";
            highlight(section, q);

        } else {

            section.style.display = "none";

        }

    });

}


/* ==========================================================
   SURBRILLANCE SIMPLE
========================================================== */

function highlight(section, query) {

    removeHighlight(section);

    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodes = [];

    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {

        const text = node.nodeValue;

        const lower = normalizeText(text);

        if (lower.includes(query)) {

            const span = document.createElement("span");

            const regex = new RegExp(`(${query})`, "gi");

            span.innerHTML = text.replace(regex, `<mark>$1</mark>`);

            const wrapper = document.createElement("span");

            wrapper.innerHTML = span.innerHTML;

            node.parentNode.replaceChild(wrapper, node);

        }

    });

}


/* ==========================================================
   SUPPRESSION SURBRILLANCE
========================================================== */

function removeHighlight(section) {

    const marks = section.querySelectorAll("mark");

    marks.forEach(mark => {

        const parent = mark.parentNode;

        parent.replaceChild(
            document.createTextNode(mark.textContent),
            mark
        );

        parent.normalize();

    });

}


/* ==========================================================
   EVENT INPUT
========================================================== */

if (searchInput) {

    searchInput.addEventListener("input", (e) => {

        searchDocs(e.target.value);

    });

}
