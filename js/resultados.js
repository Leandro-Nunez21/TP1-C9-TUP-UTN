// Oferta academica de la UNT (agrupada por area)
const carreras = [
    // Area de tecnología
    { titulo: "Geología", area: "tecnologia" },
    { titulo: "Licenciatura en Ciencias Biológicas", area: "tecnologia" },
    { titulo: "Licenciatura en Biotecnología", area: "tecnologia" },
    { titulo: "Licenciatura en Química", area: "tecnologia" },
    { titulo: "Arquitectura y Urbanismo", area: "tecnologia" },
    { titulo: "Ingeniería Agronómica", area: "tecnologia" },
    { titulo: "Ingeniería Zootecnista", area: "tecnologia" },
    { titulo: "Agrimensura", area: "tecnologia" },
    { titulo: "Ingeniería Azucarera", area: "tecnologia" },
    { titulo: "Ingeniería Biomédica", area: "tecnologia" },
    { titulo: "Ingeniería Civil", area: "tecnologia" },
    { titulo: "Ingeniería Eléctrica", area: "tecnologia" },
    { titulo: "Ingeniería Electrónica", area: "tecnologia" },
    { titulo: "Ingeniería en Computación", area: "tecnologia" },
    { titulo: "Ingeniería en Informática", area: "tecnologia" },
    { titulo: "Ingeniería Geodésica y Geofísica", area: "tecnologia" },
    { titulo: "Ingeniería Química", area: "tecnologia" },
    { titulo: "Ingeniería Mecánica", area: "tecnologia" },
    { titulo: "Ingeniería Industrial", area: "tecnologia" },
    { titulo: "Licenciatura en Física", area: "tecnologia" },
    { titulo: "Licenciatura en Informática", area: "tecnologia" },
    { titulo: "Licenciatura en Matemática", area: "tecnologia" },
    { titulo: "Programador Universitario", area: "tecnologia" },
    { titulo: "Tecnicatura Univ. en Tecnología Azucarera e Industrias Derivadas", area: "tecnologia" },
    { titulo: "Diseño de Iluminación", area: "tecnologia" },
    { titulo: "Tecnicatura en Iluminación", area: "tecnologia" },
    { titulo: "Tecnicatura Universitaria en Física", area: "tecnologia" },
    { titulo: "Tecnicatura Universitaria en Física Ambiental", area: "tecnologia" },
    { titulo: "Tecnicatura Superior en Controles Automáticos Industriales", area: "tecnologia" },
    { titulo: "Tecnicatura Superior en Electricidad Industrial", area: "tecnologia" },
    { titulo: "Tecnicatura Superior en Diseño Industrial", area: "tecnologia" },

    // Area de salud
    { titulo: "Medicina Veterinaria", area: "salud" },
    { titulo: "Medicina", area: "salud" },
    { titulo: "Licenciatura en Kinesiología y Fisiatría", area: "salud" },
    { titulo: "Licenciatura en Fonoaudiología", area: "salud" },
    { titulo: "Odontología", area: "salud" },
    { titulo: "Tecnicatura Universitaria en Prótesis Dental", area: "salud" },
    { titulo: "Tecnicatura en Asistencia Dental", area: "salud" },
    { titulo: "Psicología", area: "salud" },
    { titulo: "Tecnicatura Universitaria en Acompañamiento Terapéutico", area: "salud" },
    { titulo: "Bioquímica", area: "salud" },
    { titulo: "Farmacia", area: "salud" },
    { titulo: "Tecnicatura Laboratorista Universitaria en Salud", area: "salud" },
    { titulo: "Licenciatura en Enfermería", area: "salud" },
    { titulo: "Enfermería Universitaria", area: "salud" },
    { titulo: "Tecnicatura en Estadísticas de Salud", area: "salud" },

    // Area de negocios
    { titulo: "Abogacía", area: "negocios" },
    { titulo: "Escribanía", area: "negocios" },
    { titulo: "Procuración", area: "negocios" },
    { titulo: "Licenciatura en Seguridad Pública", area: "negocios" },
    { titulo: "Licenciatura en Ciencias de la Comunicación", area: "negocios" },
    { titulo: "Tecnicatura Universitaria en Comunicación", area: "negocios" },
    { titulo: "Licenciatura en Geografía", area: "negocios" },
    { titulo: "Licenciatura en Historia", area: "negocios" },
    { titulo: "Licenciatura en Trabajo Social", area: "negocios" },
    { titulo: "Contador Público", area: "negocios" },
    { titulo: "Licenciatura en Administración", area: "negocios" },
    { titulo: "Licenciatura en Economía", area: "negocios" },

    // Area de arte
    { titulo: "Profesorado/Licenciatura en Ciencias de la Educación", area: "arte" },
    { titulo: "Profesorado/Licenciatura en Letras", area: "arte" },
    { titulo: "Profesorado/Licenciatura en Filosofía", area: "arte" },
    { titulo: "Profesorado/Licenciatura en Inglés", area: "arte" },
    { titulo: "Profesorado/Licenciatura en Francés", area: "arte" },
    { titulo: "Profesorado en Geografía", area: "arte" },
    { titulo: "Profesorado en Historia", area: "arte" },
    { titulo: "Profesorado en Artes Plásticas", area: "arte" },
    { titulo: "Profesorado en Ciencias Económicas", area: "arte" },
    { titulo: "Profesorado en Química", area: "arte" },
    { titulo: "Profesorado en Matemática", area: "arte" },
    { titulo: "Profesorado/Licenciatura en Educación Física", area: "arte" },
    { titulo: "Profesorado de Psicología", area: "arte" },
    { titulo: "Licenciatura en Artes Visuales", area: "arte" },
    { titulo: "Diseño de Interiores y Equipamiento", area: "arte" },
    { titulo: "Licenciatura en Teatro", area: "arte" },
    { titulo: "Intérprete Dramático", area: "arte" },
    { titulo: "Profesorado Universitario en Teatro", area: "arte" },
    { titulo: "Licenciatura en Música", area: "arte" },
    { titulo: "Tecnicatura Universitaria en Fotografía", area: "arte" },
    { titulo: "Profesorado en Danza Contemporánea", area: "arte" },
    { titulo: "Bailarín/a en Danza Contemporánea", area: "arte" },
    { titulo: "Licenciatura en Danza Clásica", area: "arte" },
    { titulo: "Licenciatura en Diseño de Sonido", area: "arte" },
    { titulo: "Licenciatura en Luthería", area: "arte" },
    { titulo: "Tecnicatura Universitaria en Sonorización", area: "arte" },
    { titulo: "Tecnicatura Universitaria en Actuación Teatral", area: "arte" },
    { titulo: "Tecnicatura Univ. en Instrumentos de Cuerdas Pulsadas", area: "arte" },
    { titulo: "Tecnicatura Universitaria en Diseño de Indumentaria y Textil", area: "arte" },
    { titulo: "Profesorado en Ciencias Biológicas", area: "arte" },
    { titulo: "Arqueología", area: "arte" },
    { titulo: "Tecnicatura Univ. en Documentación y Museología Arqueológica", area: "arte" },
    { titulo: "Licenciatura en Cinematografía", area: "arte" },
    { titulo: "Tecnicatura Universitaria en Medios Audiovisuales", area: "arte" },
    { titulo: "Profesorado en Artes Visuales", area: "arte" },
    { titulo: "Profesorado de Educación Primaria", area: "arte" },
    { titulo: "Profesorado de Educación Inicial", area: "arte" },
    { titulo: "Profesorado en Música con Orientación en Educación Musical", area: "arte" },
    { titulo: "Profesorado en Música con Orientación en Dirección Coral", area: "arte" },
    { titulo: "Profesorado en Música con Orientación en Instrumento", area: "arte" }
];

const contenedor = document.getElementById("contenedor-carreras");
const contador = document.getElementById("contador-resultados");

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

const botonesFiltro = document.querySelectorAll(".filtro-btn");
botonesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
        const area = btn.dataset.area;
        const filtradas = area === "todas" ? carreras : carreras.filter(c => c.area === area);
        renderizarCarreras(filtradas);

        botonesFiltro.forEach(b => {
            b.style.backgroundColor = "var(--color-fondo)";
            b.style.color = "var(--color-texto)";
        });

        btn.style.backgroundColor = "var(--color-primario)";
        btn.style.color = "white";
    });
});

renderizarCarreras(carreras);