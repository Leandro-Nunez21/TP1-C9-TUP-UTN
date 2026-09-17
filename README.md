# 🎓 CareerPath AI - Plataforma de Orientación Vocacional Inteligente

**Trabajo Práctico Integrador - C9 TUP UTN**

CareerPath AI no es solo un cuestionario; es una **plataforma integral de orientación vocacional potenciada por Inteligencia Artificial**. Diseñada para estudiantes de Tucumán, el sistema analiza perfiles, gustos y habilidades a través de un motor lógico para realizar un *matching* preciso con la oferta académica de instituciones como UNT, UTN, UNSTA, USPT y terciarios, trazando finalmente una ruta de aprendizaje 100% personalizada.

## 🚀 Evolución del Proyecto y Decisiones Arquitectónicas

A partir de las iteraciones y correcciones de diseño, el proyecto fue escalado para comportarse como un **producto de software completo y coherente**, aplicando las siguientes directrices técnicas:

*   **Identidad Visual Centralizada:** Se utiliza un **único archivo `style.css`** como *Single Source of Truth* para todo el sistema. Se eliminaron por completo los estilos en línea (`style=""`) y el uso de `!important`, garantizando un código limpio y mantenible.
*   **Responsive Nativo:** La adaptación a dispositivos móviles, tablets y escritorio se delega íntegramente al sistema de grillas y utilidades de **Bootstrap 5** (contenedores, filas, columnas y flexbox), descartando el uso de media queries manuales redundantes.
*   **Interacción y DOM:** Se reemplazaron las alertas y validaciones nativas del navegador (como el atributo `required`) por manipulaciones del DOM mediante **Vanilla JavaScript**, creando notificaciones flotantes asimétricas, barras de progreso en tiempo real y componentes dinámicos generados desde el script.
*   **Narrativa de Producto (IA):** Todo el recorrido del usuario está diseñado para comunicar el uso de algoritmos de evaluación y personalización inteligente desde la primera interacción.

## 📂 El Recorrido del Usuario (User Journey)

El sitio está compuesto por 5 vistas principales, interconectadas para ofrecer una experiencia fluida y con propósito:

1.  **Inicio (`index.html`):** Landing page con un *hero* explicativo que comunica inmediatamente la propuesta de valor: un motor de Inteligencia Artificial para el futuro profesional.
2.  **Mi Perfil (`perfil.html`):** Interfaz inicial para la recolección de datos demográficos, intereses y background del estudiante.
3.  **Evaluación Inteligente (`test.html`):** Cuestionario interactivo con aval psicológico. Presenta un diseño asimétrico a dos columnas, feedback visual en tiempo real (barra y contador de progreso) y validación dinámica con JS.
4.  **Resultados (`resultados.html`):** Despliegue del análisis de la IA. Zonas diferenciadas para la interpretación del perfil, porcentajes de afinidad y sugerencias de instituciones educativas.
5.  **Ruta de Aprendizaje (`ruta.html`):** Un plan de estudios estructurado en etapas basado en las recomendaciones algorítmicas, con persistencia de datos (guardado de favoritos).

## 🔎 Las 5 Estrategias SEO y Accesibilidad Web

Para asegurar el correcto posicionamiento orgánico en motores de búsqueda y una excelente experiencia de usuario, el equipo implementó las siguientes **5 estrategias On-Page y técnicas**:

1.  **Semántica HTML5 (Estructura de Contenido):** Se utilizaron etiquetas con alto valor semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) en todas las vistas. Esto permite a los rastreadores web (como Googlebot) comprender la arquitectura y relevancia de cada bloque de información.
2.  **Jerarquía de Encabezados (H1, H2, H3):** Uso estricto de una estructura lógica de títulos. Se mantiene un único `<h1>` por documento para la palabra clave principal, desglosando los temas secundarios en etiquetas `<h2>` y `<h3>` sin saltos de nivel.
3.  **Interlinking (Estructura de Enlaces Internos):** Implementación de una barra de navegación global `<nav>` coherente en todos los archivos. Esto garantiza que no existan "páginas huérfanas", distribuyendo la autoridad de la página y facilitando la indexación del sitio completo.
4.  **Accesibilidad en Formularios (Factor de Ranking):** Vinculación estricta de etiquetas `<label for="...">` con sus respectivos `<input id="...">` en los formularios, sumado al uso de atributos `aria-*`. Google prioriza la accesibilidad web (Core Web Vitals y UX) como factor de posicionamiento.
5.  **Optimización de Metaetiquetas y Diseño Mobile-First:** Estructuración del `<head>` para incluir descripciones únicas (`<meta name="description">`, `keywords`) y metadatos de Open Graph por página, junto con una maquetación CSS y Bootstrap orientada a la perfecta visualización adaptativa.

## 👥 Flujo de Trabajo Colaborativo y Distribución de Tareas

El trabajo se dividió estratégicamente en distintas fases (Estructura/SEO, Lógica JavaScript y Refactorización Bootstrap) mediante ramas específicas y revisiones en equipo mediante Pull Requests:

*   **Leandro Núñez (Integrador / Tech Lead):**
    *   **Arquitectura y Gestión:** Dueño del repositorio, revisión de Pull Requests, creación del `style.css` unificado, variables de entorno (`:root`) y Media Queries base.
    *   **Lógica JS (`feature/perfil-y-modo-oscuro`):** Edición interactiva de perfil con previsualización en tiempo real e interruptor global de Modo Oscuro/Claro con persistencia.
    *   **Refactor Bootstrap (`refactor/nav-footer`):** Implementación de Navbar colapsable con menú hamburguesa, Footer responsive y maquetado estructural global.

*   **Valentina Pérez del Rien (Estrategia y Lógica Interactiva):**
    *   **Documentación:** Redacción integral del README y definición de la estrategia SEO y de producto.
    *   **Lógica JS (`feature/rediseño-test`):** Desarrollo del Test de Orientación interactivo, incluyendo barra de progreso en tiempo real y validación del DOM previa al envío (sin usar `required` nativo).
    *   **Refactor Bootstrap (`refactor/home`):** Rediseño del `index.html` aplicando grillas (`container`, `row`, `col`), Hero section, tarjetas informativas y botones de llamada a la acción.

*   **Tatiana Herrera (SEO Técnico y Datos Dinámicos):**
    *   **Optimización SEO:** Configuración del `<head>` (viewport, meta description, keywords) y protocolos Open Graph para previsualización en redes sociales.
    *   **Lógica JS (`feature/resultados-dinamicos`):** Renderizado dinámico de tarjetas desde el DOM, motor de filtros por área y sistema de guardado en "Favoritos" mediante `localStorage`.
    *   **Refactor Bootstrap (`refactor/resultados`):** Estructuración de `resultados.html` y `ruta.html` utilizando componentes avanzados como `progress-bar`, `list-group` / acordeones y badges de estado.

*   **Marina Noguera Morena Giovanna (Semántica HTML, Accesibilidad y Tracker):**
    *   **Estructura y A11y:** Control de calidad de la semántica HTML5, jerarquía lógica de encabezados (H1-H6) y cumplimiento de estándares de accesibilidad (atributos `alt`).
    *   **Lógica JS (`feature/ruta-tracker`):** Creación del motor de progreso de la ruta de aprendizaje con checkboxes interactivos, cálculo de avance general y persistencia de datos.
    *   **Refactor Bootstrap (`refactor/formularios`):** Rediseño visual de `perfil.html` y `test.html` aplicando estilos nativos a controles (`form-control`, `form-check`), tarjetas contenedoras y botones de envío.