
import { Render_Content } from "./render_content.js";

function handleRouteChange() {
  const path = window.location.pathname; // Obtiene la ruta actual
  Render_Content(path);

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
    Render_Content(path);
  });
}
