
/* ==========================================================
   908 STUDIOS - TABLE OF CONTENTS (TOC)
   toc.js
========================================================== */


/* ==========================================================
   ÉLÉMENTS
========================================================== */

const tocLinks = document.querySelectorAll("#table-of-contents a");

const sections = document.querySelectorAll("section[id]");


/* ==========================================================
   SCROLL SMOOTH NAVIGATION
========================================================== */

tocLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const targetId = link.getAttribute("href").replace("#", "");

        const target = document.getElementById(targetId);

        if (target) {

            window.scrollTo({

                top: target.offsetTop - 100,

                behavior: "smooth"

            });

        }

    });

});


/* ==========================================================
   SECTION ACTIVE (SCROLL SPY)
========================================================== */

function setActiveLink() {

    let scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        const id = section.getAttribute("id");

        const link = document.querySelector(
            `#table-of-contents a[href="#${id}"]`
        );

        if (!link) return;

        if (scrollPosition >= top && scrollPosition < bottom) {

            tocLinks.forEach(l => l.classList.remove("active"));

            link.classList.add("active");

        }

    });

}


/* ==========================================================
   SCROLL LISTENER
========================================================== */

window.addEventListener("scroll", setActiveLink);


/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    setActiveLink();

});
