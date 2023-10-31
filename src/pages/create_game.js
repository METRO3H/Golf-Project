
import create_game_html from "../views/create_game.html"
import "../styles/create_game.css"
import {user_icon_colors} from "../constants/colors.js"
const create_game_container = document.createElement("div")

export default function(){
    
    create_game_container.id = "create_game_container"
    create_game_container.innerHTML = create_game_html
    Insert_List_Of_Players()
    return{
        title: "Crear sala",
        description: "Crear sala para jugadores de golf",
        content: create_game_container
    }

}

function Insert_List_Of_Players(){

    const sidebar_players = create_game_container.querySelector("#sidebar-players")

    const player_item_template = create_game_container.querySelector(".player-item")

    for (let i = 0; i < 3; i++) {
        const player_item_element = player_item_template.cloneNode(true)
        player_item_element.querySelector(".user-icon-svg").style.fill = user_icon_colors[i+1] 
        player_item_element.querySelector(".player-item-title").textContent = "Vacio"
        
        sidebar_players.append(player_item_element)
    }
    
}