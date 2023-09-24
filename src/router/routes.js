
import table from "../components/table.js";
import users_Page from "../pages/users.js"

export const routesMap = {
    //Primer elemento de los objetos es el title (La wea que esta al lado del favicon), el segundo es el contenido.
    "/": ["Home", "Bienvenido al Club de Golf -> LPMMM"], //[titulo en el navegador, contenido de la wea],
    "/games": ["Games", "Juegos de Golf"],
    "/ranking": ["Ranking", "Ranking de Jugadores"],
    "/table": ["Table", table()],
    "/profile": ["Profile", "Perfil XD"],
    "/users": ["Users", users_Page()],
  };