document.addEventListener("DOMContentLoaded", function () {
  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";

  const enlaces = document.querySelectorAll(
    ".cp-nav-link[data-page]",
  );

  enlaces.forEach(function (enlace) {
    const paginaEnlace = enlace.dataset.page;

    enlace.classList.remove("active");
    enlace.removeAttribute("aria-current");

    if (paginaEnlace === paginaActual) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }
  });

  const menu = document.getElementById("menuPrincipal");
  const overlay = document.getElementById("navOverlay");

  if (!menu || !overlay || typeof bootstrap === "undefined") {
    return;
  }

  const instanciaMenu = bootstrap.Collapse.getOrCreateInstance(
    menu,
    {
      toggle: false,
    },
  );

  function mostrarFondo() {
    overlay.classList.add("activo");
    document.body.classList.add("cp-menu-abierto");
  }

  function ocultarFondo() {
    overlay.classList.remove("activo");
    document.body.classList.remove("cp-menu-abierto");
  }

  menu.addEventListener("show.bs.collapse", mostrarFondo);
  menu.addEventListener("hide.bs.collapse", ocultarFondo);
  menu.addEventListener("hidden.bs.collapse", ocultarFondo);

  overlay.addEventListener("click", function () {
    instanciaMenu.hide();
  });

  document
    .querySelectorAll(".cp-mobile-link")
    .forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        instanciaMenu.hide();
      });
    });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992 && menu.classList.contains("show")) {
      instanciaMenu.hide();
    }
  });
});
