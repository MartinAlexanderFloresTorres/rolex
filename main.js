/*===== loader ===== */
const loader = document.querySelector('.loader');
window.addEventListener('load', () =>loader.style.display = "none");

/*===== TOGGLE CARRITO ===== */
const iconoCarrito = document.querySelector(".iconos__carrito");
const carrito = document.querySelector(".carrito");
const iconoClose = document.querySelector(".carrito__close");

const toggleCard = () => {
    iconoCarrito.addEventListener("click", () => {
        carrito.classList.toggle("active");
    });
    iconoClose.addEventListener("click", () => {
        carrito.classList.remove("active");
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
    });
    iconoCloseMenu.addEventListener("click", () => {
        navegacion.classList.remove("active");
    });
    navegacionLinks.forEach((item) => {
        item.addEventListener("click", () => {
            navegacion.classList.remove("active");
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

/*===== agregar carrito ===== */
const agregar = document.querySelectorAll(".agregar");
const carritoCantidad = document.querySelector(".header__indice");
const carritoCards = document.querySelector(".carrito__cards");
const btnEliminar = document.querySelector(".producto__eliminar");

let cantidad = 1;
let producto;

const carritoProducto = () => {
    producto = `
    <div class="producto">
    <div class="producto__imagen"><img class="producto__img" src="img/featured1.png" alt="imagen de reloj"></div>
    <div class="producto__info">
        <h2 class="producto__title">Reloj - ${cantidad}</h2>
        <p class="producto__costo">S/.<span class="costo">${55 * cantidad}</span></p>
        <p class="producto__costoReal">S/.${cantidad * 110}</p>
        <div class="producto__iconos">
            <div class="producto__cantidad">
                <i class="bx bx-minus producto__menos"></i>
                <p class="producto__numero">1</p>
                <i class="bx bx-plus producto__mas"></i>
            </div>
            <i class="bx bx-trash-alt producto__eliminar"></i>
        </div>
    </div>
    </div>
    `;
};

let costoProducto;
let total;

const agregadoExitosamente = document.querySelector('.agregadoExitosamente');
const cantidadDeCarrito = () => {
    carritoProducto();
    agregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            carritoCantidad.innerHTML = cantidad;
            cantidad++;
            agregadoExitosamente.classList.add('active');
            setTimeout(() => {
                agregadoExitosamente.classList.remove('active');
            }, 1300);
            document.querySelector(".carrito__cards").innerHTML += producto;

            const costo = document.querySelectorAll(".costo")
            costo.forEach((element, i) => {
                costoProducto = Number(element.textContent);
                total = costoProducto * (i + 1);
                document.querySelector('.cantidad__total').innerHTML = total;
                document.querySelector('.cantidad__producto').innerHTML = cantidad - 1;
            });
            document.querySelector(".carrito__vaciar").addEventListener('click', () =>{
                document.querySelector(".carrito__cards").innerHTML = "";
                carritoCantidad.innerHTML = "";
                cantidad = 1;
                document.querySelector('.cantidad__total').innerHTML = "0.00";
                document.querySelector('.cantidad__producto').innerHTML = "0";
            });
            carritoProducto();
        });
    });
};
cantidadDeCarrito();