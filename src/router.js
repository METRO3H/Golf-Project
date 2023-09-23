import { main_section } from "./constants/dom.js";
import table from "./components/table.js";
import test_page from "./pages/test.js"
function renderContent(route) {
  const contentMap = {
    //Primer elemento de los objetos es el title (La wea que esta al lado del favicon), el segundo es el contenido.
    "/": ["Home", "Bienvenido al Club de Golf -> LPMMM"], //[titulo en el navegador, contenido de la wea],
    "/games": ["Games", "Juegos de Golf"],
    "/ranking": ["Ranking", "Ranking de Jugadores"],
    "/table": ["Table", table()],
    "/profile": ["Profile", "Perfil XD"],
    "/test": ["Test", test_page()],
  };
  const [title, content] = contentMap[route] || ["Página no encontrada", "Página no encontrada XD"];

  document.title = title;
  if (content instanceof HTMLElement) {
    //El contenido es un elemento del DOM, lo añadimos al main_section
    main_section.innerHTML = "";
    main_section.append(content);
  } else {
    // Si no, mostramos el contenido como HTML
    main_section.innerHTML = content;
  }
}

function handleRouteChange() {
  const path = window.location.pathname; // Obtiene la ruta actual
  renderContent(path);
}

export function initializeRouter() {
  // Escuchar el evento popstate para detectar cambios en la URL
  window.addEventListener("popstate", handleRouteChange);

  // Inicializar la aplicación al cargar la página
  document.addEventListener("DOMContentLoaded", handleRouteChange);
}

export function handleLinkClick(link) {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Evita la acción predeterminada del enlace (navegar a una nueva página)
    const path = this.getAttribute("href"); // Obtiene la ruta del enlace

    // Cambiar la URL sin recargar la página
    history.pushState(null, null, path);

    // Renderizar el contenido basado en la nueva ruta
    renderContent(path);
  });
}
