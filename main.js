"use strict";
/*===== loader ===== */
const loader = document.querySelector(".loader");
window.addEventListener("load", () => (loader.style.display = "none"));

/*===== TOGGLE CARRITO ===== */
const iconoCarrito = document.querySelector(".iconos__carrito");
const carrito = document.querySelector(".carrito");
const iconoClose = document.querySelector(".carrito__close");
const agregadoExitosamente = document.querySelector(".agregadoExitosamente");
const bodyEvento = document.querySelector("body");

const toggleCard = () => {
    iconoCarrito.addEventListener("click", () => {
        carrito.classList.toggle("active");
        agregadoExitosamente.classList.add("left");
        bodyEvento.classList.add('active')
    });
    iconoClose.addEventListener("click", () => {
        carrito.classList.remove("active");
        agregadoExitosamente.classList.remove("left");
        bodyEvento.classList.remove('active')
    });
};
toggleCard();
/*===== TOGGLE MENU ===== */
const iconoMenu = document.querySelector(".iconos__menu");
const iconoCloseMenu = document.querySelector(".navegacion__close");
const navegacion = document.querySelector(".navegacion__lista");
const navegacionLinks = document.querySelectorAll(".navegacion__link");

const toggleNavegacion = () => {
    iconoMenu.addEventListener("click", () => {
        navegacion.classList.toggle("active");
        bodyEvento.classList.add('active')
    });
    iconoCloseMenu.addEventListener("click", () => {
        navegacion.classList.remove("active");
        bodyEvento.classList.remove('active')
    });
    navegacionLinks.forEach((item) => {
        item.addEventListener("click", () => {
            navegacion.classList.remove("active");
            bodyEvento.classList.remove('active')
        });
    });
};
toggleNavegacion();

/*===== TOGGLE MODO ===== */
const iconosModo = document.querySelector(".iconos__modo");
const body = document.querySelector("body");
const toggleModo = () => {
    iconosModo.addEventListener("click", () => {
        iconosModo.classList.toggle("active");
        body.classList.toggle("oscuro");
        if (!body.classList.contains("oscuro")) {
            localStorage.setItem("modo", "claro");
        } else {
            localStorage.setItem("modo", "oscuro");
        }
    });
    let getModo = localStorage.getItem("modo");
    if (getModo === "oscuro") {
        iconosModo.classList.toggle("active");
        body.classList.toggle("oscuro");
    } else {
        iconosModo.classList.remove("active");
        body.classList.remove("oscuro");
    }
};
toggleModo();
/*===== EFECTO DEL SCROLL ===== */
const header = document.querySelector(".header");

const efectoScroll = () => {
    window.addEventListener("scroll", () => {
        let valorScroll = window.scrollY;
        if (valorScroll > 50) {
            header.style.boxShadow = "var(--box-shadow)";
            header.style.background = "var(--container-color)";
        } else {
            header.style.boxShadow = "none";
            header.style.background = "none";
        }
    });
};
efectoScroll();

/*===== SHOW SCROLL UP ===== */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((seccion) => {
        const sectionHeight = seccion.offsetHeight,
            sectionTop = seccion.offsetTop - 58,
            sectionId = seccion.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(`.navegacion__lista a[href*= ${sectionId}]`)
                .classList.add("active");
        } else {
            document
                .querySelector(".navegacion__lista a[href*=" + sectionId + "]")
                .classList.remove("active");
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*===== SHOW SCROLL UP ===== */

function scrollUp() {
    const scrollUp = document.querySelector("#scroll-up");
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 350) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
}
window.addEventListener("scroll", scrollUp);
