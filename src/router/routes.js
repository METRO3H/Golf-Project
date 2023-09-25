
import table from "../components/table.js";
import test_Page from "../pages/test.js"

import {Get_Player_Page} from "./controllers/playerController.js"


export function getRouteMap(route){
  const routeParts = route.split("/")
  const routeMap = {
    //Primer elemento de los objetos es el title (La wea que esta al lado del favicon), el segundo es el contenido.
    "/": ["Home", "Bienvenido al Club de Golf -> LPMMM"], //[titulo en el navegador, contenido de la wea],
    "/games": ["Games", "Juegos de Golf"],
    "/player": Get_Player_Page(routeParts),
    "/table": ["Table", table()],
    "/profile": ["Profile", "Perfil XD"],
    "/test": ["Test", test_Page()],
  };

  const parentRoute = `/${routeParts[1]}`

  return routeMap[parentRoute]
}