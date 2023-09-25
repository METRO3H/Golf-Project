import { main_section } from "../constants/dom.js";
import {getRouteMap} from "./routes.js"

function renderContent(route) {
  
  const [title, content] = getRouteMap(route) || ["Página no encontrada", "Página no encontrada XD"];

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
