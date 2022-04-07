/*===== agregar carrito ===== */
const carritoCards = document.querySelector(".carrito__cards");
const vaciarBtn = document.querySelector(".carrito__vaciar");
const cantidadTotal = document.querySelector(".cantidad__total");
const cantidadProducto = document.querySelector(".cantidad__producto");
const botonPagar = document.querySelector(".botonPagar");
const headerIndice = document.querySelector('.header__indice')

let nuevoCarrito = [];

function cargarListener() {
    bodyEvento.addEventListener("click", imprimirCarrito);
    vaciarBtn.addEventListener("click", vaciarHtml);
    document.addEventListener("DOMContentLoaded", () => {
        nuevoCarrito = JSON.parse(localStorage.getItem("carrito_21") || []);
        insertaHtml();
    });
}
cargarListener();

//===== vaciar Html =====
function vaciarHtml() {
    nuevoCarrito = [];
    insertaHtml();
}
//===== carrito vacio =====
function carritoVacio() {
    if (nuevoCarrito.length === 0) {
        botonPagar.style.display = "none";
    }
    if (nuevoCarrito.length > 0) {
        botonPagar.style.display = "inline-block";
    }
}
//===== imprimir carrito =====
function imprimirCarrito(e) {
    carritoVacio();
    const dataId = parseInt(e.target.getAttribute("data-id"));
    const existe = nuevoCarrito.some((producto) => {
        return producto.id === dataId;
    });

    if (e.target.classList.contains("agregar")) {
        const card = e.target.parentElement;
        if (!agregadoExitosamente.classList.contains("active")) {
            agregadoExitosamente.classList.add("active");
            if (agregadoExitosamente.classList.contains("active")) {
                setTimeout(() => {
                    agregadoExitosamente.classList.remove("active");
                }, 1300);
            }
        }
        leerDatos(card);
    }
    if (e.target.classList.contains("producto__mas")) {
        if (existe) {
            const copiacarrito = nuevoCarrito.map((producto) => {
                if (producto.id === dataId) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            });
            nuevoCarrito = [...copiacarrito];
        } else {
            nuevoCarrito = [...nuevoCarrito];
        }
        insertaHtml();
    }
    if (e.target.classList.contains("producto__menos")) {
        if (existe) {
            const copiacarrito = nuevoCarrito.map((producto) => {
                if (producto.id === dataId) {
                    if (producto.cantidad > 1) {
                        producto.cantidad--;
                        return producto;
                    } else {
                        return producto;
                    }
                } else {
                    return producto;
                }
            });
            nuevoCarrito = [...copiacarrito];
        } else {
            nuevoCarrito = [...nuevoCarrito];
        }
        insertaHtml();
    }
    if (e.target.classList.contains("producto__eliminar")) {
        nuevoCarrito = nuevoCarrito.filter((producto) => {
            return producto.id !== dataId;
        });
        carritoVacio();
        insertaHtml();
    }
}

//===== leerDatos =====
function leerDatos(card) {
    const infoCard = {
        imagen: card.querySelector("img").src,
        titulo: card.querySelector(".destacados__title").textContent,
        precio: parseInt(card.querySelector(".inicio__precio").textContent),
        id: parseInt(card.querySelector(".agregar").getAttribute("data-id")),
        cantidad: 1,
    };

    const existe = nuevoCarrito.some((producto) => {
        return producto.id === infoCard.id;
    });
    if (existe) {
        const copiacarrito = nuevoCarrito.map((producto) => {
            if (producto.id === infoCard.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        nuevoCarrito = [...copiacarrito];
    } else {
        nuevoCarrito = [...nuevoCarrito, infoCard];
    }
    insertaHtml();
}

//===== inserta HTML =====
function insertaHtml() {
    eliminaHtmlPrevio();
    nuevoCarrito.forEach((producto) => {
        const { imagen, titulo, precio, id, cantidad } = producto;

        const div = document.createElement("DIV");
        div.innerHTML = `
            <div class="producto">
                <div class="producto__imagen"><img class="producto__img" src="${imagen}" alt="${titulo}"></div>
                <div class="producto__info">
                    <h2 class="producto__title">${titulo}</h2>
                    <p class="producto__costo">S/.<span class="costo">${precio}</span></p>
                    <p class="producto__costoReal">S/.${precio + 123}</p>
                    <div class="producto__iconos">
                        <div class="producto__cantidad">
                            <i class="bx bx-minus producto__menos" data-id="${id}"></i>
                            <p class="producto__numero">${cantidad}</p>
                            <i class="bx bx-plus producto__mas" data-id="${id}"></i>
                        </div>
                        <i class="bx bx-trash-alt producto__eliminar" data-id="${id}"></i>
                    </div>
                </div>
            </div>
        `;
        carritoCards.appendChild(div);
    });
    sumaTotal();
    cantidadPro();
    insertarLocalStorage();
}
//===== CANTIDAD PRODUCTOS =====
function cantidadPro() {
    let cantidad = 0;
    nuevoCarrito.forEach((producto, index) => {
        cantidad = index + 1;
    });
    cantidadProducto.textContent = cantidad;
    headerIndice.textContent = cantidad;
}
//===== TOTAL=====
let total = 0;
function sumaTotal() {
    totalCantidad = nuevoCarrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
    cantidadTotal.textContent = totalCantidad;
}
//===== insertarLocalStorage =====
function insertarLocalStorage() {
    localStorage.setItem("carrito_21", JSON.stringify(nuevoCarrito));
}

//===== elimina Html Previo =====
function eliminaHtmlPrevio() {
    while (carritoCards.firstChild) {
        carritoCards.removeChild(carritoCards.firstChild);
    }
}
