import {main_section} from "./constants/dom.js"
import table from "./components/table.js"

function renderContent(route) {

    const contentMap = {
        '/': ['Bienvenido al Club de Golf'],
        '/home': ["Welcome XD"],
        '/games': ['Juegos de Golf'],
        '/ranking': ['Ranking de Jugadores'],
        '/table': [table()]
    };

    const [content] = contentMap[route] || ['Página no encontrada', ''];
    
    if (content instanceof HTMLElement) {
        // Si el contenido es un elemento del DOM, lo añadimos al main_section
        main_section.innerHTML = ''; // Limpiamos cualquier contenido anterior
        main_section.appendChild(content);
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
    window.addEventListener('popstate', handleRouteChange);

    // Inicializar la aplicación al cargar la página
    document.addEventListener('DOMContentLoaded', handleRouteChange);
}

export function handleLinkClick(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita la acción predeterminada del enlace (navegar a una nueva página)
        const path = this.getAttribute('href'); // Obtiene la ruta del enlace

        // Cambiar la URL sin recargar la página
        history.pushState(null, null, path);

        // Renderizar el contenido basado en la nueva ruta
        renderContent(path);
    });
}
