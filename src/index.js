import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/index.css"
import {nav_bar_section} from "./constants/dom.js"
import { initializeRouter, handleLinkClick } from './router/router_handler.js';
import Nav_Bar from "./components/nav_bar.js"


nav_bar_section.append(Nav_Bar())



// Inicializar el enrutador
initializeRouter();

// Escuchar los clics en los enlaces y actualizar la URL
document.querySelectorAll('a').forEach(link => {
    handleLinkClick(link);
});

