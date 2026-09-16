document.addEventListener("DOMContentLoaded", function () {
    // Activa los efectos que necesitan JavaScript
    document.documentElement.classList.add("js-animaciones");

    // Checkboxes de la ruta
    const casillas = document.querySelectorAll(".ruta-check");

    // Elementos del progreso
    const barraProgreso =
        document.getElementById("barraProgreso");

    const textoProgreso =
        document.getElementById("textoProgreso");

    const contadorProgreso =
        document.getElementById("contadorProgreso");

    const cantidadCompletados =
        document.getElementById("cantidadCompletados");

    const cantidadPendientes =
        document.getElementById("cantidadPendientes");

    const porcentajeResumen =
        document.getElementById("porcentajeResumen");

    const mensajeRutaCompleta =
        document.getElementById("mensajeRutaCompleta");

    const bloqueProgreso =
        document.querySelector(".ruta-progreso");

    // Secciones que se animan al aparecer
    const seccionesAnimadas =
        document.querySelectorAll(".animar-ruta");

    // Nombre con el que se guardará la información
    const CLAVE_STORAGE =
        "careerpath-ruta-completados";

    // Calcula y actualiza el progreso
    function actualizarProgreso() {
        let completados = 0;

        casillas.forEach(function (casilla) {
            const tema =
                casilla.closest(".ruta-tema");

            if (casilla.checked) {
                completados++;

                tema.classList.add("completado");
            } else {
                tema.classList.remove("completado");
            }
        });

        const total = casillas.length;

        let porcentaje = 0;

        if (total > 0) {
            porcentaje =
                Math.round(
                    (completados / total) * 100,
                );
        }

        const pendientes =
            total - completados;

        // Barra
        barraProgreso.style.width =
            porcentaje + "%";

        barraProgreso.setAttribute(
            "aria-valuenow",
            porcentaje,
        );

        barraProgreso.setAttribute(
            "aria-valuetext",
            porcentaje + "% completado",
        );

        // Porcentaje principal
        textoProgreso.textContent =
            porcentaje + "%";

        // Cantidad de temas
        contadorProgreso.textContent =
            completados +
            " de " +
            total +
            " temas completados";

        // Estadísticas
        cantidadCompletados.textContent =
            completados;

        cantidadPendientes.textContent =
            pendientes;

        porcentajeResumen.textContent =
            porcentaje + "%";

        // Cuando termina toda la ruta
        if (porcentaje === 100 && total > 0) {
            barraProgreso.classList.add(
                "ruta-completa",
            );

            bloqueProgreso.classList.add(
                "ruta-finalizada",
            );

            mensajeRutaCompleta.classList.remove(
                "d-none",
            );

            contadorProgreso.textContent =
                "¡Completaste los " +
                total +
                " temas de tu ruta!";
        } else {
            barraProgreso.classList.remove(
                "ruta-completa",
            );

            bloqueProgreso.classList.remove(
                "ruta-finalizada",
            );

            mensajeRutaCompleta.classList.add(
                "d-none",
            );
        }
    }

    // Guarda los temas completados
    function guardarProgreso() {
        const temasCompletados = [];

        casillas.forEach(function (casilla) {
            if (casilla.checked) {
                temasCompletados.push(
                    casilla.id,
                );
            }
        });

        localStorage.setItem(
            CLAVE_STORAGE,
            JSON.stringify(temasCompletados),
        );
    }

    // Recupera los temas guardados
    function cargarProgreso() {
        const progresoGuardado =
            localStorage.getItem(CLAVE_STORAGE);

        if (progresoGuardado === null) {
            return;
        }

        const temasGuardados =
            JSON.parse(progresoGuardado);

        casillas.forEach(function (casilla) {
            if (
                temasGuardados.includes(
                    casilla.id,
                )
            ) {
                casilla.checked = true;
            }
        });
    }

    // Prepara las animaciones al hacer scroll
    function prepararAnimaciones() {
        if (
            "IntersectionObserver" in window
        ) {
            const observador =
                new IntersectionObserver(
                    function (entradas) {
                        entradas.forEach(
                            function (entrada) {
                                if (
                                    entrada.isIntersecting
                                ) {
                                    entrada.target.classList.add(
                                        "visible",
                                    );

                                    observador.unobserve(
                                        entrada.target,
                                    );
                                }
                            },
                        );
                    },
                    {
                        threshold: 0.12,
                    },
                );

            seccionesAnimadas.forEach(
                function (seccion) {
                    observador.observe(seccion);
                },
            );
        } else {
            seccionesAnimadas.forEach(
                function (seccion) {
                    seccion.classList.add(
                        "visible",
                    );
                },
            );
        }
    }

    // Evento de los checkboxes
    casillas.forEach(function (casilla) {
        casilla.addEventListener(
            "change",
            function () {
                actualizarProgreso();
                guardarProgreso();
            },
        );
    });

    // Cargar lo guardado
    cargarProgreso();

    // Actualizar interfaz
    actualizarProgreso();

    // Activar animaciones
    prepararAnimaciones();
});