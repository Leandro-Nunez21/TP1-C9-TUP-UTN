// Oferta academica de la UTN Facultad Regional Tucumán (agrupada por nivel)
const carreras = [
    // Carreras de Grado
    { titulo: "Ingeniería en Sistemas de Información", area: "grado" },
    { titulo: "Ingeniería en Energía Eléctrica", area: "grado" },
    { titulo: "Ingeniería Mecánica", area: "grado" },
    { titulo: "Ingeniería Civil", area: "grado" },
    { titulo: "Ingeniería Electrónica", area: "grado" },

    // Carreras de Pregrado
    { titulo: "Tecnicatura Universitaria en Logística", area: "pregrado" },
    { titulo: "Tecnicatura Universitaria en Mecatrónica", area: "pregrado" },
    { titulo: "Tecnicatura Universitaria en Programación", area: "pregrado" },
    { titulo: "Tecnicatura Universitaria en Desarrollo y Producción de Videojuegos", area: "pregrado" },
    { titulo: "Tecnicatura Universitaria en Higiene y Seguridad en el Trabajo", area: "pregrado" },
    { titulo: "Tecnicatura Universitaria en Energías Sustentables", area: "pregrado" },
    { titulo: "Tecnicatura Universitaria en Mantenimiento Industrial", area: "pregrado" },

    // Complementación Curricular
    { titulo: "Licenciatura en Gestión Ambiental", area: "complementacion" },
    { titulo: "Licenciatura en Tecnología Educativa", area: "complementacion" },
    { titulo: "Licenciatura en Higiene y Seguridad en el Trabajo", area: "complementacion" },
    { titulo: "Licenciatura en Enseñanza de la Matemática", area: "complementacion" },
    { titulo: "Profesorado en Docencia Superior", area: "complementacion" },

    // Carreras de Posgrado
    { titulo: "Especialización en Ingeniería en Mantenimiento", area: "posgrado" },
    { titulo: "Especialización en Higiene y Seguridad en el Trabajo", area: "posgrado" },
    { titulo: "Especialización en Ingeniería Ambiental", area: "posgrado" },
    { titulo: "Especialización en Ingeniería Bioenergética", area: "posgrado" },
    { titulo: "Especialización en Ingeniería en Sistemas de Información", area: "posgrado" },
    { titulo: "Especialización en Docencia Universitaria", area: "posgrado" },
    { titulo: "Especialización en Ingeniería Gerencial", area: "posgrado" },
    { titulo: "Maestría en Ingeniería Ambiental", area: "posgrado" },
    { titulo: "Maestría en Ingeniería Bioenergética", area: "posgrado" },
    { titulo: "Maestría en Ingeniería en Sistemas de Información", area: "posgrado" },
    { titulo: "Maestría en Docencia Universitaria", area: "posgrado" },
    { titulo: "Maestría en Administración de Negocios", area: "posgrado" }
];

let contenedor;
let contador;

function renderizarCarreras(lista) {
    contenedor.innerHTML = "";
    contador.textContent = `${lista.length} carrera(s) encontrada(s)`;

    if (lista.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "No hay carreras para mostrar en esta área.";
        aviso.className = "text-muted";
        contenedor.appendChild(aviso);
        return;
    }

    lista.forEach((carrera) => {
        const col = document.createElement("div");
        col.className = "col";

        const card = document.createElement("div");
        card.className = "card h-100 border-0 shadow-sm";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex justify-content-between align-items-center";

        const titulo = document.createElement("span");
        titulo.textContent = carrera.titulo;
        titulo.className = "fw-medium";

        const btnFav = document.createElement("button");
        btnFav.className = "btn btn-sm flex-shrink-0 ms-2";
        btnFav.style.backgroundColor = "var(--color-secundario)";
        btnFav.style.color = "var(--color-texto)";

        const favoritosGuardados = obtenerFavoritos();
        btnFav.textContent = favoritosGuardados.includes(carrera.titulo) ? "★ Guardado" : "☆ Favorito";
        btnFav.addEventListener("click", () => alternarFavorito(carrera.titulo, btnFav));

        cardBody.appendChild(titulo);
        cardBody.appendChild(btnFav);
        card.appendChild(cardBody);
        col.appendChild(card);
        contenedor.appendChild(col);
    });
}

function obtenerFavoritos() {
    const stringFavoritos = localStorage.getItem("favoritos");
    if (stringFavoritos) {
        return stringFavoritos.split("|");
    } else {
        return [];
    }
}

function alternarFavorito(titulo, boton) {
    let favoritos = obtenerFavoritos();

    if (favoritos.includes(titulo)) {
        favoritos = favoritos.filter(f => f !== titulo);
        boton.textContent = "☆ Favorito";
        mostrarMensaje(`"${titulo}" se quitó de tus favoritos`);
    } else {
        favoritos.push(titulo);
        boton.textContent = "★ Guardado";
        mostrarMensaje(`"${titulo}" se agregó a tus favoritos`);
    }

    localStorage.setItem("favoritos", favoritos.join("|"));
}

function mostrarMensaje(texto) {
    const aviso = document.createElement("div");
    aviso.textContent = texto;
    aviso.className = "position-fixed bottom-0 end-0 m-3 p-3 rounded shadow";
    aviso.style.backgroundColor = "var(--color-primario)";
    aviso.style.color = "white";
    aviso.style.zIndex = "9999";
    aviso.style.maxWidth = "280px";
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2500);
}

document.addEventListener("DOMContentLoaded", () => {
    contenedor = document.getElementById("contenedor-carreras");
    contador = document.getElementById("contador-resultados");

    if (!contenedor || !contador) {
        console.error("No se encontraron los elementos de resultados.");
        return;
    }

    const botonesFiltro = document.querySelectorAll(".filtro-btn");

    botonesFiltro.forEach((btn) => {
        btn.type = "button";

        btn.addEventListener("click", () => {
            const area = btn.dataset.area;
            const filtradas = area === "todas"
                ? carreras
                : carreras.filter((c) => c.area === area);

            renderizarCarreras(filtradas);
        });
    });

    renderizarCarreras(carreras);
});