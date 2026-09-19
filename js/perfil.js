document.addEventListener("DOMContentLoaded", function () {
    const supabase = window.careerPathSupabase;

    const elementos = {
        vistaAuth: document.getElementById("vistaAuth"),
        vistaPerfil: document.getElementById("vistaPerfil"),
        contenedorAuth: document.getElementById("contenedorAuth"),
        vistaConfirmacion: document.getElementById("vistaConfirmacion"),

        tabLogin: document.getElementById("tabLogin"),
        tabRegistro: document.getElementById("tabRegistro"),

        tituloAuth: document.getElementById("tituloAuth"),
        descripcionAuth: document.getElementById("descripcionAuth"),

        formLogin: document.getElementById("formLogin"),
        formRegistro: document.getElementById("formRegistro"),
        formPerfil: document.getElementById("formPerfil"),

        mensajeAuth: document.getElementById("mensajeAuth"),
        mensajeConfirmacion: document.getElementById("mensajeConfirmacion"),
        mensajePerfil: document.getElementById("mensajePerfil"),

        correoConfirmacion: document.getElementById("correoConfirmacion"),

        btnYaConfirme: document.getElementById("btnYaConfirme"),
        btnReenviar: document.getElementById("btnReenviar"),
        btnCerrarSesion: document.getElementById("btnCerrarSesion"),

        loginEmail: document.getElementById("loginEmail"),
        loginPassword: document.getElementById("loginPassword"),

        registroNombre: document.getElementById("registroNombre"),
        registroEmail: document.getElementById("registroEmail"),
        registroPassword: document.getElementById("registroPassword"),
        registroConfirmar: document.getElementById("registroConfirmar"),

        perfilNombre: document.getElementById("perfilNombre"),
        perfilEdad: document.getElementById("perfilEdad"),
        perfilCiudad: document.getElementById("perfilCiudad"),

        emailPerfil: document.getElementById("emailPerfil"),
        nombreBienvenida: document.getElementById("nombreBienvenida"),

        porcentajePerfil: document.getElementById("porcentajePerfil"),
        barraPerfil: document.getElementById("barraPerfil"),
    };

    let usuarioActual = null;

    iniciar();

    async function iniciar() {
        if (!supabase) {
            mostrarAuth();
            mostrarFormularioLogin();

            mostrarMensaje(
                elementos.mensajeAuth,
                "No se pudo conectar con Supabase. Revisá el archivo js/supabase.js.",
                "error"
            );

            return;
        }

        configurarTabs();
        configurarPassword();
        configurarFormularios();
        configurarBotonesConfirmacion();
        configurarCerrarSesion();
        configurarCambiosPerfil();

        await verificarSesionInicial();

        supabase.auth.onAuthStateChange(async function (event, session) {
            if (session && session.user) {
                usuarioActual = session.user;
                await mostrarPerfilUsuario(session.user);
            } else {
                usuarioActual = null;
                mostrarAuth();
                mostrarFormularioLogin();
            }
        });
    }

    function configurarTabs() {
        if (elementos.tabLogin) {
            elementos.tabLogin.addEventListener("click", function () {
                mostrarFormularioLogin();
            });
        }

        if (elementos.tabRegistro) {
            elementos.tabRegistro.addEventListener("click", function () {
                mostrarFormularioRegistro();
            });
        }
    }

    function configurarPassword() {
        const botonesPassword = document.querySelectorAll("[data-password-target]");

        botonesPassword.forEach(function (boton) {
            boton.addEventListener("click", function () {
                const idInput = boton.dataset.passwordTarget;
                const input = document.getElementById(idInput);

                if (!input) {
                    return;
                }

                if (input.type === "password") {
                    input.type = "text";
                    boton.textContent = "Ocultar";
                } else {
                    input.type = "password";
                    boton.textContent = "Mostrar";
                }
            });
        });
    }

    function configurarFormularios() {
        if (elementos.formLogin) {
            elementos.formLogin.addEventListener("submit", iniciarSesion);
        }

        if (elementos.formRegistro) {
            elementos.formRegistro.addEventListener("submit", crearCuenta);
        }

        if (elementos.formPerfil) {
            elementos.formPerfil.addEventListener("submit", guardarPerfil);
        }
    }

    function configurarBotonesConfirmacion() {
        if (elementos.btnYaConfirme) {
            elementos.btnYaConfirme.addEventListener("click", function () {
                mostrarFormularioLogin();

                mostrarMensaje(
                    elementos.mensajeAuth,
                    "Si ya confirmaste tu correo, iniciá sesión con tu email y contraseña.",
                    "info"
                );
            });
        }

        if (elementos.btnReenviar) {
            elementos.btnReenviar.addEventListener("click", reenviarConfirmacion);
        }
    }

    function configurarCerrarSesion() {
        if (!elementos.btnCerrarSesion) {
            return;
        }

        elementos.btnCerrarSesion.addEventListener("click", async function () {
            if (!supabase) {
                return;
            }

            await supabase.auth.signOut();

            usuarioActual = null;

            mostrarAuth();
            mostrarFormularioLogin();
        });
    }

    function configurarCambiosPerfil() {
        const camposPerfil = [
            elementos.perfilNombre,
            elementos.perfilEdad,
            elementos.perfilCiudad,
        ];

        camposPerfil.forEach(function (campo) {
            if (campo) {
                campo.addEventListener("input", actualizarProgresoPerfil);
            }
        });

        document
            .querySelectorAll('input[name="intereses"], input[name="habilidades"], input[name="situacion"]')
            .forEach(function (input) {
                input.addEventListener("change", actualizarProgresoPerfil);
            });
    }

    async function verificarSesionInicial() {
        const respuesta = await supabase.auth.getSession();

        const session = respuesta.data.session;

        if (session && session.user) {
            usuarioActual = session.user;
            await mostrarPerfilUsuario(session.user);
        } else {
            usuarioActual = null;
            mostrarAuth();
            mostrarFormularioLogin();
        }
    }

    function mostrarAuth() {
        if (elementos.vistaAuth) {
            elementos.vistaAuth.classList.remove("d-none");
        }

        if (elementos.vistaPerfil) {
            elementos.vistaPerfil.classList.add("d-none");
        }
    }

    function mostrarPerfil() {
        if (elementos.vistaAuth) {
            elementos.vistaAuth.classList.add("d-none");
        }

        if (elementos.vistaPerfil) {
            elementos.vistaPerfil.classList.remove("d-none");
        }
    }

    function mostrarFormularioLogin() {
        mostrarAuth();

        if (elementos.contenedorAuth) {
            elementos.contenedorAuth.classList.remove("d-none");
        }

        if (elementos.vistaConfirmacion) {
            elementos.vistaConfirmacion.classList.add("d-none");
        }

        if (elementos.formLogin) {
            elementos.formLogin.classList.remove("d-none");
        }

        if (elementos.formRegistro) {
            elementos.formRegistro.classList.add("d-none");
        }

        if (elementos.tabLogin) {
            elementos.tabLogin.classList.add("activo");
            elementos.tabLogin.setAttribute("aria-selected", "true");
        }

        if (elementos.tabRegistro) {
            elementos.tabRegistro.classList.remove("activo");
            elementos.tabRegistro.setAttribute("aria-selected", "false");
        }

        if (elementos.tituloAuth) {
            elementos.tituloAuth.textContent = "Volvé a tu recorrido";
        }

        if (elementos.descripcionAuth) {
            elementos.descripcionAuth.textContent =
                "Iniciá sesión para continuar desde donde lo dejaste.";
        }

        limpiarMensaje(elementos.mensajeAuth);
    }

    function mostrarFormularioRegistro() {
        mostrarAuth();

        if (elementos.contenedorAuth) {
            elementos.contenedorAuth.classList.remove("d-none");
        }

        if (elementos.vistaConfirmacion) {
            elementos.vistaConfirmacion.classList.add("d-none");
        }

        if (elementos.formLogin) {
            elementos.formLogin.classList.add("d-none");
        }

        if (elementos.formRegistro) {
            elementos.formRegistro.classList.remove("d-none");
        }

        if (elementos.tabLogin) {
            elementos.tabLogin.classList.remove("activo");
            elementos.tabLogin.setAttribute("aria-selected", "false");
        }

        if (elementos.tabRegistro) {
            elementos.tabRegistro.classList.add("activo");
            elementos.tabRegistro.setAttribute("aria-selected", "true");
        }

        if (elementos.tituloAuth) {
            elementos.tituloAuth.textContent = "Creá tu cuenta";
        }

        if (elementos.descripcionAuth) {
            elementos.descripcionAuth.textContent =
                "Registrate para guardar tu perfil vocacional y continuar tu recorrido.";
        }

        limpiarMensaje(elementos.mensajeAuth);
    }

    function mostrarConfirmacion(email) {
        if (elementos.contenedorAuth) {
            elementos.contenedorAuth.classList.add("d-none");
        }

        if (elementos.vistaConfirmacion) {
            elementos.vistaConfirmacion.classList.remove("d-none");
        }

        if (elementos.correoConfirmacion) {
            elementos.correoConfirmacion.textContent = email;
        }

        sessionStorage.setItem("careerpath-correo-registro", email);

        limpiarMensaje(elementos.mensajeConfirmacion);
    }

    async function crearCuenta(evento) {
        evento.preventDefault();

        if (!supabase) {
            mostrarMensaje(
                elementos.mensajeAuth,
                "Supabase no está conectado.",
                "error"
            );

            return;
        }

        const nombre = elementos.registroNombre.value.trim();
        const email = elementos.registroEmail.value.trim();
        const password = elementos.registroPassword.value;
        const confirmar = elementos.registroConfirmar.value;

        if (!nombre || !email || !password || !confirmar) {
            mostrarMensaje(
                elementos.mensajeAuth,
                "Completá todos los campos para crear tu cuenta.",
                "error"
            );

            return;
        }

        if (password.length < 8) {
            mostrarMensaje(
                elementos.mensajeAuth,
                "La contraseña debe tener al menos 8 caracteres.",
                "error"
            );

            return;
        }

        if (password !== confirmar) {
            mostrarMensaje(
                elementos.mensajeAuth,
                "Las contraseñas no coinciden.",
                "error"
            );

            return;
        }

        const boton = document.getElementById("btnRegistro");
        cambiarEstadoBoton(boton, true, "Creando cuenta...");

        const redirectUrl = window.location.origin + window.location.pathname;

        const respuesta = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: redirectUrl,
                data: {
                    nombre: nombre,
                },
            },
        });

        cambiarEstadoBoton(boton, false, "Crear mi cuenta");

        if (respuesta.error) {
            mostrarMensaje(
                elementos.mensajeAuth,
                traducirErrorSupabase(respuesta.error.message),
                "error"
            );

            return;
        }

        mostrarConfirmacion(email);
    }

    async function iniciarSesion(evento) {
        evento.preventDefault();

        if (!supabase) {
            mostrarMensaje(
                elementos.mensajeAuth,
                "Supabase no está conectado.",
                "error"
            );

            return;
        }

        const email = elementos.loginEmail.value.trim();
        const password = elementos.loginPassword.value;

        if (!email || !password) {
            mostrarMensaje(
                elementos.mensajeAuth,
                "Ingresá tu correo y contraseña.",
                "error"
            );

            return;
        }

        const boton = document.getElementById("btnLogin");
        cambiarEstadoBoton(boton, true, "Ingresando...");

        const respuesta = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        cambiarEstadoBoton(boton, false, "Iniciar sesión");

        if (respuesta.error) {
            mostrarMensaje(
                elementos.mensajeAuth,
                traducirErrorSupabase(respuesta.error.message),
                "error"
            );

            return;
        }

        if (respuesta.data && respuesta.data.user) {
            usuarioActual = respuesta.data.user;
            await mostrarPerfilUsuario(respuesta.data.user);
        }
    }

    async function reenviarConfirmacion() {
        const email =
            sessionStorage.getItem("careerpath-correo-registro") ||
            (elementos.correoConfirmacion
                ? elementos.correoConfirmacion.textContent.trim()
                : "");

        if (!email) {
            mostrarMensaje(
                elementos.mensajeConfirmacion,
                "No encontramos el correo para reenviar la confirmación.",
                "error"
            );

            return;
        }

        const respuesta = await supabase.auth.resend({
            type: "signup",
            email: email,
            options: {
                emailRedirectTo: window.location.origin + window.location.pathname,
            },
        });

        if (respuesta.error) {
            mostrarMensaje(
                elementos.mensajeConfirmacion,
                traducirErrorSupabase(respuesta.error.message),
                "error"
            );

            return;
        }

        mostrarMensaje(
            elementos.mensajeConfirmacion,
            "Te reenviamos el correo de confirmación.",
            "exito"
        );
    }

    async function mostrarPerfilUsuario(usuario) {
        mostrarPerfil();

        if (elementos.emailPerfil) {
            elementos.emailPerfil.textContent = usuario.email || "";
        }

        const nombreMetadata =
            usuario.user_metadata && usuario.user_metadata.nombre
                ? usuario.user_metadata.nombre
                : "";

        limpiarFormularioPerfil();

        if (nombreMetadata && elementos.perfilNombre) {
            elementos.perfilNombre.value = nombreMetadata;
        }

        await cargarPerfilGuardado(usuario, nombreMetadata);

        actualizarProgresoPerfil();
    }

    async function cargarPerfilGuardado(usuario, nombreMetadata) {
        const respuesta = await supabase
            .from("profiles")
            .select("*")
            .eq("id", usuario.id)
            .maybeSingle();

        if (respuesta.error) {
            mostrarMensaje(
                elementos.mensajePerfil,
                "No se pudo cargar el perfil guardado. Revisá la tabla profiles en Supabase.",
                "error"
            );

            return;
        }

        const perfil = respuesta.data;

        if (!perfil) {
            if (elementos.nombreBienvenida) {
                elementos.nombreBienvenida.textContent =
                    obtenerPrimerNombre(nombreMetadata) || "estudiante";
            }

            return;
        }

        if (elementos.perfilNombre) {
            elementos.perfilNombre.value = perfil.nombre || nombreMetadata || "";
        }

        if (elementos.perfilEdad) {
            elementos.perfilEdad.value = perfil.edad || "";
        }

        if (elementos.perfilCiudad) {
            elementos.perfilCiudad.value = perfil.ciudad || "";
        }

        marcarCheckboxes("intereses", perfil.intereses || []);
        marcarCheckboxes("habilidades", perfil.habilidades || []);
        marcarRadio("situacion", perfil.situacion_actual || "");

        if (elementos.nombreBienvenida) {
            elementos.nombreBienvenida.textContent =
                obtenerPrimerNombre(perfil.nombre || nombreMetadata) ||
                "estudiante";
        }
    }

    async function guardarPerfil(evento) {
        evento.preventDefault();

        if (!usuarioActual) {
            mostrarMensaje(
                elementos.mensajePerfil,
                "Tenés que iniciar sesión para guardar tu perfil.",
                "error"
            );

            return;
        }

        const nombre = elementos.perfilNombre.value.trim();
        const edadTexto = elementos.perfilEdad.value;
        const ciudad = elementos.perfilCiudad.value.trim();

        const edad = edadTexto ? Number(edadTexto) : null;

        const intereses = obtenerSeleccionados("intereses");
        const habilidades = obtenerSeleccionados("habilidades");
        const situacion = obtenerRadioSeleccionado("situacion");

        if (!nombre) {
            mostrarMensaje(
                elementos.mensajePerfil,
                "Ingresá tu nombre para guardar el perfil.",
                "error"
            );

            return;
        }

        const perfilCompleto =
            Boolean(nombre) &&
            Boolean(ciudad) &&
            intereses.length > 0 &&
            habilidades.length > 0 &&
            Boolean(situacion);

        const boton = document.getElementById("btnGuardarPerfil");
        cambiarEstadoBoton(boton, true, "Guardando...");

        const respuesta = await supabase
            .from("profiles")
            .upsert(
                {
                    id: usuarioActual.id,
                    nombre: nombre,
                    edad: edad,
                    ciudad: ciudad,
                    intereses: intereses,
                    habilidades: habilidades,
                    situacion_actual: situacion,
                    perfil_completo: perfilCompleto,
                    updated_at: new Date().toISOString(),
                },
                {
                    onConflict: "id",
                }
            );

        cambiarEstadoBoton(boton, false, "Guardar mi perfil");

        if (respuesta.error) {
            mostrarMensaje(
                elementos.mensajePerfil,
                traducirErrorSupabase(respuesta.error.message),
                "error"
            );

            return;
        }

        if (elementos.nombreBienvenida) {
            elementos.nombreBienvenida.textContent =
                obtenerPrimerNombre(nombre) || "estudiante";
        }

        actualizarProgresoPerfil();

        mostrarMensaje(
            elementos.mensajePerfil,
            "Perfil guardado correctamente.",
            "exito"
        );
    }

    function actualizarProgresoPerfil() {
        let puntos = 0;
        const total = 5;

        if (elementos.perfilNombre && elementos.perfilNombre.value.trim()) {
            puntos++;
        }

        if (elementos.perfilEdad && elementos.perfilEdad.value) {
            puntos++;
        }

        if (elementos.perfilCiudad && elementos.perfilCiudad.value.trim()) {
            puntos++;
        }

        if (obtenerSeleccionados("intereses").length > 0) {
            puntos++;
        }

        if (
            obtenerSeleccionados("habilidades").length > 0 &&
            obtenerRadioSeleccionado("situacion")
        ) {
            puntos++;
        }

        const porcentaje = Math.round((puntos / total) * 100);

        if (elementos.porcentajePerfil) {
            elementos.porcentajePerfil.textContent = porcentaje + "%";
        }

        if (elementos.barraPerfil) {
            elementos.barraPerfil.style.width = porcentaje + "%";
            elementos.barraPerfil.setAttribute("aria-valuenow", porcentaje);
        }
    }

    function obtenerSeleccionados(nombre) {
        return Array.from(
            document.querySelectorAll('input[name="' + nombre + '"]:checked')
        ).map(function (input) {
            return input.value;
        });
    }

    function obtenerRadioSeleccionado(nombre) {
        const seleccionado = document.querySelector(
            'input[name="' + nombre + '"]:checked'
        );

        return seleccionado ? seleccionado.value : "";
    }

    function marcarCheckboxes(nombre, valores) {
        document
            .querySelectorAll('input[name="' + nombre + '"]')
            .forEach(function (input) {
                input.checked = valores.includes(input.value);
            });
    }

    function marcarRadio(nombre, valor) {
        document
            .querySelectorAll('input[name="' + nombre + '"]')
            .forEach(function (input) {
                input.checked = input.value === valor;
            });
    }

    function limpiarFormularioPerfil() {
        if (elementos.formPerfil) {
            elementos.formPerfil.reset();
        }

        limpiarMensaje(elementos.mensajePerfil);
    }

    function mostrarMensaje(elemento, texto, tipo) {
        if (!elemento) {
            return;
        }

        elemento.textContent = texto;

        elemento.classList.remove(
            "d-none",
            "error",
            "exito",
            "info",
            "mostrar"
        );

        elemento.classList.add("mostrar");

        if (tipo) {
            elemento.classList.add(tipo);
        }
    }

    function limpiarMensaje(elemento) {
        if (!elemento) {
            return;
        }

        elemento.textContent = "";
        elemento.classList.add("d-none");
        elemento.classList.remove("mostrar", "error", "exito", "info");
    }

    function cambiarEstadoBoton(boton, cargando, texto) {
        if (!boton) {
            return;
        }

        boton.disabled = cargando;

        const spanTexto = boton.querySelector("span");

        if (spanTexto) {
            spanTexto.textContent = texto;
        } else {
            boton.textContent = texto;
        }
    }

    function obtenerPrimerNombre(nombreCompleto) {
        if (!nombreCompleto) {
            return "";
        }

        return nombreCompleto.trim().split(" ")[0];
    }

    function traducirErrorSupabase(mensaje) {
        if (!mensaje) {
            return "Ocurrió un error inesperado.";
        }

        const mensajeMinuscula = mensaje.toLowerCase();

        if (mensajeMinuscula.includes("invalid login credentials")) {
            return "El correo o la contraseña no son correctos.";
        }

        if (mensajeMinuscula.includes("email not confirmed")) {
            return "Tenés que confirmar tu correo antes de iniciar sesión.";
        }

        if (mensajeMinuscula.includes("user already registered")) {
            return "Ese correo ya está registrado. Probá iniciar sesión.";
        }

        if (mensajeMinuscula.includes("password")) {
            return "La contraseña no cumple con los requisitos.";
        }

        if (mensajeMinuscula.includes("fetch")) {
            return "No se pudo conectar con Supabase. Revisá tu conexión.";
        }

        if (mensajeMinuscula.includes("profiles")) {
            return "Hay un problema con la tabla profiles en Supabase.";
        }

        return mensaje;
    }
});