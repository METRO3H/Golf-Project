import { main_section } from "../constants/dom.js";
import { current_page } from "../constants/dom.js";
import { Get_Page } from "./routes.js";
import { start_loading_bar, end_loading_bar } from "../components/loading_bar.js";

export function Render_Content(route) {
  start_loading_bar()
 
  const page = Get_Page(route);
  
  current_page.Set_Title(page.title);
  current_page.Set_Description(page.description);

  if (page.content instanceof HTMLElement) {
    
    //El contenido es un elemento del DOM, lo añadimos al main_section
    main_section.innerHTML = "";
    main_section.append(page.content);
    
    end_loading_bar()

  } else {
    // Si no, mostramos el contenido como HTML
    main_section.innerHTML = page.content;
  }
}
