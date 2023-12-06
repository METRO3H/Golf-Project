
import create_game_html from "../views/create_game.html"
import "../styles/create_game.css"
import {user_icon_colors} from "../constants/colors.js"
import { size } from "lodash"
const create_game_container = document.createElement("div")

export default function(){
    
    create_game_container.id = "create_game_container"
    create_game_container.innerHTML = create_game_html
    Insert_List_Of_Players()
    Insert_Friends_List()

    return{
        title: "Crear sala",
        description: "Crear sala para jugadores de golf",
        content: create_game_container
    }

}
async function Insert_Friends_List(){
    const list_of_friends_container = create_game_container.querySelector("#list-of-friends-container")
    const token = localStorage.getItem("token")
    const URL_FETCH = `../../request/friend/list`
    console.log(URL_FETCH)
    const response = await fetch(URL_FETCH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body_response = await response.json();
    const friend_list = body_response.data

    console.log(friend_list)

    const friend_item_element = list_of_friends_container.querySelector("#friend-item-template")
    const friend_item_template = friend_item_element.cloneNode(true)
    friend_item_element.remove()

    for (let i = 0; i < size(friend_list); i++) {
        const friend_item_element = friend_item_template.cloneNode(true)
        friend_item_element.querySelector(".user-icon-svg").style.fill = user_icon_colors[i+1] 
        friend_item_element.querySelector(".player-item-title").textContent = friend_list[i].friend_username
        
        list_of_friends_container.append(friend_item_element)
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