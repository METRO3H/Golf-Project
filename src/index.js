import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "./styles/index.css"
import { initializeRouter, handleLinkClick } from './router/router_handler.js';
import {Nav_Bar} from "./components/nav_bar.js"
import { Toast } from "./components/toast.js";


Nav_Bar()
Toast()


// Inicializar el enrutador
initializeRouter();

// Escuchar los clics en los enlaces y actualizar la URL
document.querySelectorAll('a').forEach(link => {
    handleLinkClick(link);
});
 
