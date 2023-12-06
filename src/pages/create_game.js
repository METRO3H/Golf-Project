import create_game_html from "../views/create_game.html"
import "../styles/create_game.css";
import { Render_Content } from '../router/render_content.js'
export default function () {

    const create_game_container = document.createElement("div")
    create_game_container.id = "create-game-container"
    create_game_container.innerHTML = create_game_html
    const button = create_game_container.querySelector("#submit-register-button")

    button.addEventListener("click", function(){
        console.log("wooom")

        const path = "/game/AGQxsuUSLoDqCWEJnGwpv4O"
        history.pushState(null, null, path);

        Render_Content(path);
    })

    return {
        title: "Crear sala",
        description: "Crear sala para jugadores de golf",
        content: create_game_container,
      };
}