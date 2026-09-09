# 🎓 Plataforma de Orientación Estudiantil (CareerPath AI)

**Trabajo Práctico Integrador - C9 TUP UTN**

Una aplicación web interactiva diseñada para ayudar a los estudiantes a descubrir su camino profesional ideal. La plataforma permite evaluar perfiles, identificar fortalezas mediante un test vocacional y trazar una ruta de aprendizaje 100% personalizada hacia el futuro laboral (Desarrollo Web, Inteligencia Artificial, etc.).

## 🚀 Tecnologías y Arquitectura
* **HTML5:** Estructura semántica y formularios interactivos.
* **CSS3:** Maquetación responsiva utilizando Flexbox, CSS Grid y variables de entorno (`:root`).
* **Git & GitHub:** Control de versiones y flujo de trabajo colaborativo mediante ramas protegidas.

## 📂 Estructura del Proyecto

El sitio está compuesto por 5 vistas principales, interconectadas para ofrecer una experiencia fluida:

1. **`index.html` (Inicio):** Landing page que explica el funcionamiento de la plataforma.
2. **`perfil.html` (Mi Perfil):** Formulario para la recolección de datos, intereses y habilidades previas del usuario.
3. **`test.html` (Test Vocacional):** Cuestionario interactivo de 6 preguntas que evalúa inclinaciones tecnológicas, sociales, de gestión y creativas.
4. **`resultados.html` (Resultados):** Despliegue del análisis del perfil, habilidades a desarrollar y sugerencias de carrera.
5. **`ruta.html` (Ruta de Aprendizaje):** Un plan de estudios dividido en etapas (Fundamentos, Desarrollo, Especialización) con seguimiento de progreso.

## 🔎 Estrategia SEO y Accesibilidad

Para asegurar el correcto posicionamiento orgánico en motores de búsqueda y una excelente experiencia de usuario, el equipo implementó las siguientes 5 estrategias On-Page y técnicas:

1. **Semántica HTML5 (Estructura de Contenido):** 
   Se utilizaron etiquetas con alto valor semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) en todas las vistas. Esto permite a los rastreadores web (como Googlebot) comprender la arquitectura y relevancia de cada bloque de información.
2. **Jerarquía de Encabezados (H1, H2, H3):** 
   Uso estricto de una estructura lógica de títulos. Se mantiene un único `<h1>` por documento para la palabra clave principal, desglosando los temas secundarios en etiquetas `<h2>` sin saltos de nivel.
3. **Interlinking (Estructura de Enlaces Internos):** 
   Implementación de una barra de navegación global `<nav>` coherente en todos los archivos. Esto garantiza que no existan "páginas huérfanas", distribuyendo la autoridad de la página y facilitando la indexación del sitio completo.
4. **Accesibilidad en Formularios (Factor de Ranking):** 
   Vinculación estricta de etiquetas `<label for="...">` con sus respectivos `<input id="...">` en los archivos `perfil.html` y `test.html`. Google prioriza la accesibilidad web (Core Web Vitals y UX) como factor de posicionamiento.
5. **Optimización de Metaetiquetas y Diseño Mobile-First (En desarrollo):** 
   Estructuración del `<head>` para incluir descripciones únicas (`<meta name="description">`) por página, junto con una maquetación CSS (Media Queries) orientada a la perfecta visualización en dispositivos móviles (Mobile-First Indexing).

## 👥 Equipo de Desarrollo y Roles

El trabajo se dividió estratégicamente en ramas individuales a partir de `dev` para optimizar el flujo de trabajo:

* **Leandro Núñez (Integrador):** Dueño del repositorio, revisión de Pull Requests, configuración base de `style.css`, variables de entorno y maquetación (Grid/Flexbox).
* **Valentina Pérez del Rien:** Documentación general, redacción del README y definición de estrategias SEO.
* **Tatiana Herrera:** SEO Técnico, implementación de metaetiquetas (viewport, description, keywords) y Open Graph.
* **Marina Noguera Morena Giovanna:** Revisión de semántica HTML, accesibilidad, jerarquía de etiquetas y atributos `alt` en elementos multimedia.

---
*Desarrollado para la Tecnicatura Universitaria en Programación - Universidad Tecnológica Nacional (UTN).*