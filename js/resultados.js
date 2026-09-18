// Oferta academica de la UTN Facultad Regional Tucumán
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

// Configuración de colores y estilos para cada área basados en el nuevo diseño CSS
const configVisual = {
    "grado": { icono: "bi-laptop", claseTema: "res-icon-tech", claseBadge: "res-tag-tech", claseBtn: "res-btn-tech", label: "Grado" },
    "pregrado": { icono: "bi-palette", claseTema: "res-icon-art", claseBadge: "res-tag-art", claseBtn: "res-btn-art", label: "Pregrado" },
    "complementacion": { icono: "bi-heart-pulse", claseTema: "res-icon-health", claseBadge: "res-tag-health", claseBtn: "res-btn-health", label: "Complementación" },
    "posgrado": { icono: "bi-bar-chart", claseTema: "res-icon-bus", claseBadge: "res-tag-bus", claseBtn: "res-btn-bus", label: "Posgrado" }
};

let contenedor;
let contador;
let vistaActual = "grid"; // Por defecto iniciamos en modo grilla (grid)

// ==========================================
// 1. FUNCIONES PRINCIPALES DE RENDERIZADO
// ==========================================
function renderizarCarreras(lista) {
    contenedor.innerHTML = "";
    contador.innerHTML = `<i class="bi bi-mortarboard me-2"></i>Mostrando ${lista.length} carreras`;

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="text-muted w-100 text-center py-4">No hay carreras para mostrar en esta área.</p>`;
        return;
    }

    const favoritosGuardados = obtenerFavoritos();

    lista.forEach((carrera) => {
        const conf = configVisual[carrera.area];
        const esFav = favoritosGuardados.includes(carrera.titulo);
        const iconoFav = esFav ? "bi-star-fill text-warning" : "bi-star";
        const textoFav = esFav ? "Guardado" : "Favorito";
        
        const col = document.createElement("div");

        // --- MODO GRILLA (Tarjetas en bloque) ---
        if (vistaActual === "grid") {
            col.className = "col";
            col.innerHTML = `
                <div class="res-career-card h-100">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="res-card-icon ${conf.claseTema}"><i class="bi ${conf.icono}"></i></div>
                        <span class="res-badge-small ${conf.claseBadge}">${conf.label}</span>
                    </div>
                    <h6 class="fw-bold mb-2" style="font-size: 0.95rem;">${carrera.titulo}</h6>
                    <p class="text-muted mb-4" style="font-size: 0.75rem;">Universidad Nacional de Tucumán</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="small btn-favorito" style="cursor: pointer; font-weight: 600; color: ${esFav ? '#F59E0B' : '#9CA3AF'}" data-titulo="${carrera.titulo}">
                            <i class="bi ${iconoFav} me-1"></i>${textoFav}
                        </span>
                        <button class="res-btn-circle ${conf.claseBtn}"><i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>
            `;
        } 
        // --- MODO LISTA (Tarjetas horizontales) ---
        else {
            col.className = "col-12";
            col.innerHTML = `
                <div class="res-career-card d-flex flex-column flex-md-row align-items-md-center p-3">
                    <div class="d-flex align-items-center mb-3 mb-md-0 w-100">
                        <div class="res-card-icon ${conf.claseTema} me-3 flex-shrink-0"><i class="bi ${conf.icono}"></i></div>
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-1" style="font-size: 1rem;">${carrera.titulo}</h6>
                            <p class="text-muted mb-0 d-flex align-items-center" style="font-size: 0.75rem;">
                                Universidad Nacional de Tucumán 
                                <span class="ms-3 res-badge-small ${conf.claseBadge} d-none d-sm-inline-block">${conf.label}</span>
                            </p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between justify-content-md-end w-100" style="max-width: 250px;">
                        <span class="small btn-favorito me-4" style="cursor: pointer; font-weight: 600; color: ${esFav ? '#F59E0B' : '#9CA3AF'}" data-titulo="${carrera.titulo}">
                            <i class="bi ${iconoFav} me-1"></i>${textoFav}
                        </span>
                        <button class="res-btn-circle ${conf.claseBtn}"><i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>
            `;
        }
        
        contenedor.appendChild(col);
    });

    // Añadir eventos a los botones de favorito generados
    document.querySelectorAll(".btn-favorito").forEach(btn => {
        btn.addEventListener("click", function() {
            const titulo = this.getAttribute("data-titulo");
            alternarFavorito(titulo, this);
        });
    });
}

// ==========================================
// 2. LÓGICA DE FAVORITOS
// ==========================================
function obtenerFavoritos() {
    const stringFavoritos = localStorage.getItem("favoritos");
    return stringFavoritos ? stringFavoritos.split("|") : [];
}

function alternarFavorito(titulo, botonElemento) {
    let favoritos = obtenerFavoritos();

    if (favoritos.includes(titulo)) {
        favoritos = favoritos.filter(f => f !== titulo);
        botonElemento.innerHTML = `<i class="bi bi-star me-1"></i>Favorito`;
        botonElemento.style.color = "#9CA3AF"; 
        mostrarMensaje(`"${titulo}" se quitó de tus favoritos`);
    } else {
        favoritos.push(titulo);
        botonElemento.innerHTML = `<i class="bi bi-star-fill me-1"></i>Guardado`;
        botonElemento.style.color = "#F59E0B"; 
        mostrarMensaje(`"${titulo}" se agregó a tus favoritos`);
    }

    localStorage.setItem("favoritos", favoritos.join("|"));
}

function mostrarMensaje(texto) {
    const aviso = document.createElement("div");
    aviso.innerHTML = `<i class="bi bi-info-circle me-2"></i> ${texto}`;
    aviso.className = "position-fixed bottom-0 end-0 m-4 p-3 rounded shadow-lg text-white";
    aviso.style.backgroundColor = "var(--res-purple)"; 
    aviso.style.zIndex = "9999";
    aviso.style.maxWidth = "300px";
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2500);
}

// ==========================================
// 3. INICIALIZACIÓN Y EVENTOS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    contenedor = document.getElementById("contenedor-carreras");
    contador = document.getElementById("contador-resultados");

    if (!contenedor || !contador) return;

    // --- EVENTOS DE FILTROS ---
    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    botonesFiltro.forEach((btn) => {
        btn.addEventListener("click", () => {
            botonesFiltro.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const area = btn.dataset.area;
            const filtradas = area === "todas" ? carreras : carreras.filter((c) => c.area === area);
            renderizarCarreras(filtradas);
        });
    });

    // --- EVENTOS DE CAMBIO DE VISTA (GRILLA / LISTA) ---
    const btnGrid = document.getElementById("btn-vista-grid");
    const btnList = document.getElementById("btn-vista-list");

    btnGrid.addEventListener("click", () => {
        if(vistaActual === "grid") return;
        vistaActual = "grid";
        
        btnGrid.style.color = "var(--res-purple)";
        btnList.style.color = "#6B7280";
        
        contenedor.className = "row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4";
        
        const areaActiva = document.querySelector(".filtro-btn.active").dataset.area;
        const filtradas = areaActiva === "todas" ? carreras : carreras.filter((c) => c.area === areaActiva);
        renderizarCarreras(filtradas);
    });

    btnList.addEventListener("click", () => {
        if(vistaActual === "list") return;
        vistaActual = "list";
        
        btnList.style.color = "var(--res-purple)";
        btnGrid.style.color = "#6B7280";
        
        contenedor.className = "row row-cols-1 g-3";
        
        const areaActiva = document.querySelector(".filtro-btn.active").dataset.area;
        const filtradas = areaActiva === "todas" ? carreras : carreras.filter((c) => c.area === areaActiva);
        renderizarCarreras(filtradas);
    });

    // Renderizado inicial
    renderizarCarreras(carreras);
});