/* ==========================================================
   CAREERPATH AI - RESULTADOS / CATÁLOGO UTN
   ========================================================== */

const carreras = Array.isArray(window.CARRERAS_UTN)
  ? window.CARRERAS_UTN
  : [];

const configVisual = {
  grado: {
    icono: "bi-mortarboard",
    claseTema: "res-icon-tech",
    claseBadge: "res-tag-tech",
    claseBtn: "res-btn-tech",
    label: "Grado"
  },
  pregrado: {
    icono: "bi-code-square",
    claseTema: "res-icon-art",
    claseBadge: "res-tag-art",
    claseBtn: "res-btn-art",
    label: "Tecnicatura"
  },
  complementacion: {
    icono: "bi-journal-bookmark",
    claseTema: "res-icon-health",
    claseBadge: "res-tag-health",
    claseBtn: "res-btn-health",
    label: "Complementación"
  },
  posgrado: {
    icono: "bi-award",
    claseTema: "res-icon-bus",
    claseBadge: "res-tag-bus",
    claseBtn: "res-btn-bus",
    label: "Posgrado"
  }
};

let contenedor;
let contador;
let vistaActual = "grid";
let filtroActual = "todas";
let busquedaActual = "";
let modalCarreraBootstrap = null;

/* ==========================================================
   UTILIDADES
   ========================================================== */

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function obtenerConfig(carrera) {
  return configVisual[carrera.area] || configVisual.grado;
}

function textoNormalizado(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function obtenerCarrerasFiltradas() {
  let lista = carreras;

  if (filtroActual !== "todas") {
    lista = lista.filter((carrera) => carrera.area === filtroActual);
  }

  if (busquedaActual) {
    const termino = textoNormalizado(busquedaActual);

    lista = lista.filter((carrera) => {
      const texto = textoNormalizado(
        [
          carrera.titulo,
          carrera.subtipo,
          carrera.descripcion,
          ...(carrera.facultades || [])
        ].join(" ")
      );

      return texto.includes(termino);
    });
  }

  return lista;
}

/* ==========================================================
   TARJETAS
   ========================================================== */

function construirTarjetaGrid(carrera, conf, esFav) {
  const iconoFav = esFav ? "bi-star-fill" : "bi-star";
  const textoFav = esFav ? "Guardado" : "Favorito";
  const detalle = carrera.subtipo || conf.label;

  return `
    <div class="res-career-card h-100">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div class="res-card-icon ${conf.claseTema}" aria-hidden="true">
          <i class="bi ${conf.icono}"></i>
        </div>

        <span class="res-badge-small ${conf.claseBadge}">
          ${escaparHTML(detalle)}
        </span>
      </div>

      <h6 class="fw-bold mb-2 res-career-title">
        ${escaparHTML(carrera.titulo)}
      </h6>

      <p class="text-muted mb-2 res-career-university">
        Universidad Tecnológica Nacional
      </p>

      ${carrera.duracion ? `
        <p class="res-career-meta mb-4">
          <i class="bi bi-clock me-1" aria-hidden="true"></i>
          ${escaparHTML(carrera.duracion)}
        </p>
      ` : '<div class="mb-4"></div>'}

      <div class="mt-auto d-flex justify-content-between align-items-center gap-2">
        <button
          type="button"
          class="btn-favorito res-favorite-btn ${esFav ? "is-favorite" : ""}"
          data-id="${escaparHTML(carrera.id)}"
          aria-label="${esFav ? "Quitar de favoritos" : "Agregar a favoritos"} ${escaparHTML(carrera.titulo)}"
        >
          <i class="bi ${iconoFav} me-1" aria-hidden="true"></i>
          ${textoFav}
        </button>

        <button
          type="button"
          class="res-btn-circle ${conf.claseBtn} btn-ver-carrera"
          data-id="${escaparHTML(carrera.id)}"
          aria-label="Ver información de ${escaparHTML(carrera.titulo)}"
          title="Ver carrera"
        >
          <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;
}

function construirTarjetaLista(carrera, conf, esFav) {
  const iconoFav = esFav ? "bi-star-fill" : "bi-star";
  const textoFav = esFav ? "Guardado" : "Favorito";
  const detalle = carrera.subtipo || conf.label;

  return `
    <div class="res-career-card res-career-card-list d-flex flex-column flex-md-row align-items-md-center p-3">
      <div class="d-flex align-items-center mb-3 mb-md-0 w-100">
        <div class="res-card-icon ${conf.claseTema} me-3 flex-shrink-0" aria-hidden="true">
          <i class="bi ${conf.icono}"></i>
        </div>

        <div class="flex-grow-1">
          <h6 class="fw-bold mb-1 res-career-title">
            ${escaparHTML(carrera.titulo)}
          </h6>

          <p class="text-muted mb-0 res-career-university">
            Universidad Tecnológica Nacional
          </p>

          <div class="d-flex flex-wrap gap-2 mt-2">
            <span class="res-badge-small ${conf.claseBadge}">
              ${escaparHTML(detalle)}
            </span>

            ${carrera.duracion ? `
              <span class="res-career-meta">
                <i class="bi bi-clock me-1" aria-hidden="true"></i>
                ${escaparHTML(carrera.duracion)}
              </span>
            ` : ""}
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between justify-content-md-end w-100 res-career-list-actions">
        <button
          type="button"
          class="btn-favorito res-favorite-btn me-3 ${esFav ? "is-favorite" : ""}"
          data-id="${escaparHTML(carrera.id)}"
        >
          <i class="bi ${iconoFav} me-1" aria-hidden="true"></i>
          ${textoFav}
        </button>

        <button
          type="button"
          class="res-btn-circle ${conf.claseBtn} btn-ver-carrera"
          data-id="${escaparHTML(carrera.id)}"
          aria-label="Ver información de ${escaparHTML(carrera.titulo)}"
          title="Ver carrera"
        >
          <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;
}

function renderizarCarreras(lista = obtenerCarrerasFiltradas()) {
  if (!contenedor || !contador) return;

  contenedor.innerHTML = "";
  contador.innerHTML = `
    <i class="bi bi-mortarboard me-2" aria-hidden="true"></i>
    Mostrando ${lista.length} ${lista.length === 1 ? "carrera" : "carreras"}
  `;

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="res-empty-state text-center py-5">
          <i class="bi bi-search fs-2 d-block mb-3" aria-hidden="true"></i>
          <strong>No encontramos carreras con esos filtros.</strong>
          <p class="text-muted small mb-0 mt-2">
            Probá con otra categoría o término de búsqueda.
          </p>
        </div>
      </div>
    `;
    return;
  }

  const favoritos = obtenerFavoritos();

  lista.forEach((carrera) => {
    const conf = obtenerConfig(carrera);
    const esFav = favoritos.includes(carrera.id);
    const col = document.createElement("div");

    if (vistaActual === "grid") {
      col.className = "col";
      col.innerHTML = construirTarjetaGrid(carrera, conf, esFav);
    } else {
      col.className = "col-12";
      col.innerHTML = construirTarjetaLista(carrera, conf, esFav);
    }

    contenedor.appendChild(col);
  });

  conectarEventosTarjetas();
}

function conectarEventosTarjetas() {
  document.querySelectorAll(".btn-ver-carrera").forEach((boton) => {
    boton.addEventListener("click", () => abrirDetalleCarrera(boton.dataset.id));
  });

  document.querySelectorAll(".btn-favorito").forEach((boton) => {
    boton.addEventListener("click", () => alternarFavorito(boton.dataset.id));
  });
}

/* ==========================================================
   FAVORITOS
   ========================================================== */

function obtenerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("careerpath-favoritos-utn")) || [];
  } catch {
    return [];
  }
}

function alternarFavorito(idCarrera) {
  const carrera = carreras.find((item) => item.id === idCarrera);
  if (!carrera) return;

  let favoritos = obtenerFavoritos();
  const estabaGuardada = favoritos.includes(idCarrera);

  if (estabaGuardada) {
    favoritos = favoritos.filter((id) => id !== idCarrera);
  } else {
    favoritos.push(idCarrera);
  }

  localStorage.setItem("careerpath-favoritos-utn", JSON.stringify(favoritos));

  mostrarMensaje(
    estabaGuardada
      ? `“${carrera.titulo}” se quitó de tus favoritos.`
      : `“${carrera.titulo}” se guardó en tus favoritos.`
  );

  renderizarCarreras();
}

function mostrarMensaje(texto) {
  const anterior = document.querySelector(".res-toast-careerpath");
  if (anterior) anterior.remove();

  const aviso = document.createElement("div");
  aviso.className = "res-toast-careerpath";
  aviso.setAttribute("role", "status");
  aviso.innerHTML = `
    <i class="bi bi-info-circle me-2" aria-hidden="true"></i>
    ${escaparHTML(texto)}
  `;

  document.body.appendChild(aviso);

  requestAnimationFrame(() => aviso.classList.add("visible"));

  setTimeout(() => {
    aviso.classList.remove("visible");
    setTimeout(() => aviso.remove(), 250);
  }, 2400);
}

/* ==========================================================
   MODAL DE DETALLE
   ========================================================== */

function crearPlanHTML(carrera) {
  const planes = Array.isArray(carrera.planEstudios) ? carrera.planEstudios : [];

  if (planes.length === 0) {
    return `
      <div class="res-plan-pendiente">
        <i class="bi bi-journal-text" aria-hidden="true"></i>
        <div>
          <strong>Plan de estudios oficial</strong>
          <p class="mb-0">
            El detalle analítico todavía no está cargado dentro de CareerPath AI.
            Podés consultarlo desde el enlace oficial de la UTN.
          </p>
        </div>
      </div>
    `;
  }

  return `
    <div class="accordion res-plan-accordion" id="accordionPlanCarrera">
      ${planes
        .map((bloque, indice) => {
          const collapseId = `planCarrera${indice}`;

          return `
            <div class="accordion-item">
              <h3 class="accordion-header" id="heading${collapseId}">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#${collapseId}"
                  aria-expanded="false"
                  aria-controls="${collapseId}"
                >
                  ${escaparHTML(bloque.nivel)}
                </button>
              </h3>

              <div
                id="${collapseId}"
                class="accordion-collapse collapse"
                aria-labelledby="heading${collapseId}"
                data-bs-parent="#accordionPlanCarrera"
              >
                <div class="accordion-body">
                  <ul class="res-plan-lista mb-0">
                    ${(bloque.materias || [])
                      .map((materia) => `<li>${escaparHTML(materia)}</li>`)
                      .join("")}
                  </ul>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function abrirDetalleCarrera(idCarrera) {
  const carrera = carreras.find((item) => item.id === idCarrera);
  if (!carrera) return;

  const conf = obtenerConfig(carrera);

  const titulo = document.getElementById("modalCarreraTitulo");
  const categoria = document.getElementById("modalCarreraCategoria");
  const descripcion = document.getElementById("modalCarreraDescripcion");
  const datos = document.getElementById("modalCarreraDatos");
  const facultades = document.getElementById("modalCarreraFacultades");
  const plan = document.getElementById("modalCarreraPlan");
  const planTitulo = document.getElementById("modalCarreraPlanTitulo");
  const enlaceOficial = document.getElementById("modalCarreraFuente");
  const enlacePlan = document.getElementById("modalCarreraPlanLink");

  titulo.textContent = carrera.titulo;
  categoria.textContent = carrera.subtipo || conf.label;
  categoria.className = `res-modal-category res-badge-small ${conf.claseBadge}`;

  descripcion.textContent =
    carrera.descripcion ||
    "Consultá la información oficial de la Universidad Tecnológica Nacional para conocer los detalles de esta carrera.";

  const datosDisponibles = [
    carrera.duracion
      ? ["Duración", carrera.duracion, "bi-clock"]
      : null,
    carrera.modalidad
      ? ["Modalidad", carrera.modalidad, "bi-display"]
      : null,
    carrera.tituloOtorgado
      ? ["Título", carrera.tituloOtorgado, "bi-award"]
      : null,
    carrera.cargaHoraria
      ? ["Carga horaria", carrera.cargaHoraria, "bi-hourglass-split"]
      : null
  ].filter(Boolean);

  datos.innerHTML = datosDisponibles.length
    ? datosDisponibles
        .map(
          ([label, valor, icono]) => `
            <div class="res-modal-data-card">
              <i class="bi ${icono}" aria-hidden="true"></i>
              <span>${escaparHTML(label)}</span>
              <strong>${escaparHTML(valor)}</strong>
            </div>
          `
        )
        .join("")
    : `
        <div class="res-modal-data-card res-modal-data-card-wide">
          <i class="bi bi-info-circle" aria-hidden="true"></i>
          <span>Información académica</span>
          <strong>Consultar fuente oficial UTN</strong>
        </div>
      `;

  const sedes = Array.isArray(carrera.facultades) ? carrera.facultades : [];

  facultades.innerHTML = sedes.length
    ? sedes
        .map((sede) => `<span class="res-sede-chip">${escaparHTML(sede)}</span>`)
        .join("")
    : '<span class="text-muted small">Consultar disponibilidad en la UTN.</span>';

  planTitulo.textContent = carrera.planNombre || "Plan de estudios";
  plan.innerHTML = crearPlanHTML(carrera);

  if (carrera.fuenteOficial) {
    enlaceOficial.href = carrera.fuenteOficial;
    enlaceOficial.classList.remove("d-none");
  } else {
    enlaceOficial.classList.add("d-none");
  }

  if (carrera.planUrl) {
    enlacePlan.href = carrera.planUrl;
    enlacePlan.classList.remove("d-none");
  } else {
    enlacePlan.classList.add("d-none");
  }

  if (!modalCarreraBootstrap) {
    const modal = document.getElementById("modalCarrera");
    modalCarreraBootstrap = new bootstrap.Modal(modal);
  }

  modalCarreraBootstrap.show();
}

/* ==========================================================
   INICIALIZACIÓN
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  contenedor = document.getElementById("contenedor-carreras");
  contador = document.getElementById("contador-resultados");

  if (!contenedor || !contador) return;

  const botonesFiltro = document.querySelectorAll(".filtro-btn");
  const inputBusqueda = document.getElementById("buscarCarreraUTN");
  const btnGrid = document.getElementById("btn-vista-grid");
  const btnList = document.getElementById("btn-vista-list");

  botonesFiltro.forEach((btn) => {
    btn.addEventListener("click", () => {
      botonesFiltro.forEach((boton) => boton.classList.remove("active"));
      btn.classList.add("active");
      filtroActual = btn.dataset.area || "todas";
      renderizarCarreras();
    });
  });

  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
      busquedaActual = inputBusqueda.value.trim();
      renderizarCarreras();
    });
  }

  if (btnGrid) {
    btnGrid.addEventListener("click", () => {
      if (vistaActual === "grid") return;

      vistaActual = "grid";
      btnGrid.classList.add("active");
      btnList?.classList.remove("active");
      contenedor.className = "row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4";
      renderizarCarreras();
    });
  }

  if (btnList) {
    btnList.addEventListener("click", () => {
      if (vistaActual === "list") return;

      vistaActual = "list";
      btnList.classList.add("active");
      btnGrid?.classList.remove("active");
      contenedor.className = "row row-cols-1 g-3";
      renderizarCarreras();
    });
  }

  renderizarCarreras(carreras);
});
