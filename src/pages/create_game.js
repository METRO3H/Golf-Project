
import create_game_html from "../views/create_game.html"
import "../styles/create_game.css"

export default function(){
    const create_game_container = document.createElement("div")
    create_game_container.id = "create_game_container"
    create_game_container.innerHTML = create_game_html

    return{
        title: "Crear sala",
        description: "Crear sala para jugadores de golf",
        content: create_game_container
    }

}