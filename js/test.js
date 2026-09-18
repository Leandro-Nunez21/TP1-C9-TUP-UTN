document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-test");
    const barraProgreso = document.getElementById("barra-test");
    const preguntas = document.querySelectorAll("fieldset");
    const totalPreguntas = preguntas.length;
    
    // Capturamos el nuevo contador que agregaste en el HTML
    const contadorPreguntas = document.getElementById("contador-preguntas");

    // Función creada por vos para mostrar una alerta de Bootstrap dinámica
    function mostrarAlertaPersonalizada() {
        // Evitamos que se amontonen los carteles si el usuario hace muchos clics
        if (document.getElementById("alerta-flotante")) return;

        // Creamos el contenedor del cartel (DOM Manipulation)
        const alerta = document.createElement("div");
        alerta.id = "alerta-flotante";
        
        // Clases de Bootstrap para posición fija, color rojo y sombra
        alerta.className = "alert alert-danger fade show position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg";
        alerta.style.zIndex = "9999"; 
        
        // Armamos el contenido con un diseño Flexbox para separar texto y botón
        alerta.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <strong>¡Atención!</strong> Faltan preguntas por responder.
                </div>
                <button type="button" class="btn btn-sm btn-danger ms-4" id="btn-cerrar-alerta">Entendido</button>
            </div>
        `;

        // Lo inyectamos en el cuerpo de la página
        document.body.appendChild(alerta);

        // Capturamos el botón nuevo que acabamos de crear y le damos la función de cerrar
        const botonCerrar = document.getElementById("btn-cerrar-alerta");
        botonCerrar.addEventListener("click", function() {
            alerta.remove();
        });

        // Hacemos que desaparezca automáticamente a los 20 segundos
        setTimeout(() => {
            if (document.getElementById("alerta-flotante")) {
                alerta.remove();
            }
        }, 20000);
    }

    // 1. BARRA DE PROGRESO EN TIEMPO REAL Y CONTADOR
    formulario.addEventListener("change", function () {
        const respondidas = formulario.querySelectorAll('input[type="radio"]:checked').length;
        const porcentaje = Math.round((respondidas / totalPreguntas) * 100);
        
        // Actualiza la barra
        barraProgreso.style.width = porcentaje + "%";
        barraProgreso.textContent = porcentaje + "%";
        barraProgreso.setAttribute("aria-valuenow", porcentaje);

        // Actualiza el texto del contador (ej: "2 de 6 completadas")
        if (contadorPreguntas) {
            contadorPreguntas.textContent = `${respondidas} de ${totalPreguntas} completadas`;
        }

        preguntas.forEach(fieldset => {
            if (fieldset.querySelector('input[type="radio"]:checked')) {
                fieldset.classList.remove("border-danger", "border-2");
            }
        });
    });

    // 2. VALIDACIÓN PREVIA AL ENVÍO
    formulario.addEventListener("submit", function (evento) {
        const respondidas = formulario.querySelectorAll('input[type="radio"]:checked').length;
        
        if (respondidas < totalPreguntas) {
            evento.preventDefault(); 
            
            preguntas.forEach(fieldset => {
                if (!fieldset.querySelector('input[type="radio"]:checked')) {
                    fieldset.classList.add("border-danger", "border-2");
                }
            });

            // Llamamos a nuestra alerta personalizada con botón
            mostrarAlertaPersonalizada();
        }
    });

    // 3. BOTÓN DE REINICIO
    formulario.addEventListener("reset", function () {
        // Reinicia la barra
        barraProgreso.style.width = "0%";
        barraProgreso.textContent = "0%";
        barraProgreso.setAttribute("aria-valuenow", "0");

        // Reinicia el contador
        if (contadorPreguntas) {
            contadorPreguntas.textContent = `0 de ${totalPreguntas} completadas`;
        }

        preguntas.forEach(fieldset => {
            fieldset.classList.remove("border-danger", "border-2");
        });
    });
});