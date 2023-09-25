import perfil_html from "../views/profiles.html"
import "../styles/perfil.css"

export default function(playerName){

    const player_profile_page_container = document.createElement("div")
    player_profile_page_container.id = "perfil_container"
    player_profile_page_container.innerHTML = perfil_html


    return player_profile_page_container
}