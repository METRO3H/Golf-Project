import table from "../components/table.js";
import test_Page from "../pages/test.js";
import { Get_Register_Login_Page } from "../pages/sign.js";
import { Get_Player_Page } from "./controllers/playerController.js";
import User_Profile from "../pages/user_profile.js";
import Create_Game from "../pages/create_game.js"
import game from "../pages/game.js"
import create_game from "../pages/create_game.js";

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
    
    "/test": {
      title: "Test",
      description: "Página de Pruebas",
      content: test_Page(),
    },
  };

  if(parent_route === "/player") return Get_Player_Page(url_parts)
  if(parent_route === "/profile") return User_Profile()
  if(parent_route === "/game") return game(url_parts)
  
  if(parent_route === "/create_game"){
    return create_game()
  }
  if(parent_route === "/sign"){
    if(localStorage.getItem('token') || localStorage.getItem('user_name')){
      window.location.href = "/player/all"
      return
    }
    return{
      title: "Iniciar Sesión",
      description: "Registro/Inicio de Sesión",
      content: Get_Register_Login_Page(),
    }

  }

  
  
  return page[parent_route] || page_not_found
}
