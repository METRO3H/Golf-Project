import table from "../components/table.js";
import test_Page from "../pages/test.js";
import { Get_Register_Login_Page } from "../pages/sign.js";
import { Get_Player_Page } from "./controllers/playerController.js";

export function Get_Page(route) {
  
  const url_parts = route.split("/");
  const parent_route = `/${url_parts[1] || ""}`;

  const page_not_found = {
    title: "Not Found",
    description: "Página no encontrada",
    content: "No se encontró ni una wea XD",
  }

  const page = {

    "/": {
      title: "Home",
      description: "Bienvenido al Club de Golf -> LPMMM",
      content: "Bienvenido al Club de Golf -> LPMMM"
    },
    "/games": {
      title: "Games",
      description: "Juegos de Golf",
      content: "Juegos de Golf"
    },
    "/table": {
      title: "Table",
      description: "Tabla de resultados (test no mas XD)",
      content: table(),
    },
    "/profile": {
      title: "Profile",
      description: "Perfil del Usuario",
    },
    "/test": {
      title: "Test",
      description: "Página de Pruebas",
      content: test_Page(),
    },
    "/sign": {
      title: "Sign",
      description: "Registro/Inicio de Sesión",
      content: Get_Register_Login_Page(),
    },
  };

  if(parent_route === "/player") return Get_Player_Page(url_parts)

  return page[parent_route] || page_not_found
}
