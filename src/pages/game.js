import game_html from "../views/game.html";
import "../styles/game.css";

import formulario_html from "../views/formulario_hoyos.html";
import "../styles/formulario.css";

import { user_icon_colors } from "../constants/colors.js";
import { size } from "lodash";
import { Show_Toast } from "../components/toast.js";

import { io } from "socket.io-client";

const game_container = document.createElement("div");

export default function (url_parts) {
  game_container.id = "game-container";
  game_container.innerHTML = game_html;
  let list_of_players = []
  const socket = io({
    query: { token: localStorage.getItem("token")},
  });

  const game_id = url_parts[2]

  socket.emit("join_game", game_id, localStorage.getItem("user_name"))

  const player_item_element = game_container.querySelector(".player-item");
  const  player_item_template = player_item_element.cloneNode(true);
  player_item_element.remove()

  socket.on("user_connected", function(info){

    if(localStorage.getItem("user_name") !== info.admin){
      game_container.style.cursor = "not-allowed"
    }
      Insert_List_Of_Players(info, player_item_template, list_of_players)

    console.log(info)
    localStorage.setItem("admin", info.admin)
    localStorage.setItem("connected_user", info.connected_user)
  })

  socket.on("receive_game_invitation", function (sender_username) {
    Show_Toast(
      "Invitacion a partida",
      `El usuario ${sender_username} te ha invitado a una partida`
    );

  });
  Insert_Friends_List(socket);
  const start_button = game_container.querySelector("#start-button");

  start_button.addEventListener("click", function(players){
    insert_form(players)
  })

  return {
    title: "Partida",
    description: "Partida",
    content: game_container,
  };

}
 function insert_form(){




  const game_settings = game_container.querySelector("#game-settings");
  game_settings.innerHTML = formulario_html

  const form = game_container.querySelector("#golf-scores");

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    var scores = [];
    for(let i = 1; i <= 18; i++) {
      scores.push(document.getElementById('Hoyo_' + i).value);
    }
    console.log(scores);
    const data = {
      scores : scores,
      username_1: localStorage.getItem("admin"),
      username_2: localStorage.getItem("connected_user")
    }
    const response = await fetch('../../request/submit/game/results', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data)
  });

  const body_response = await response.json()

  });
}
async function Insert_Friends_List(socket) {
  const list_of_friends_container = game_container.querySelector(
    "#list-of-friends-container"
  );
  const token = localStorage.getItem("token");
  const URL_FETCH = `../../request/friend/list`;
  console.log(URL_FETCH);
  const response = await fetch(URL_FETCH, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body_response = await response.json();
  const friend_list = body_response.data;

  const friend_item_element = list_of_friends_container.querySelector(
    "#friend-item-template"
  );
  const friend_item_template = friend_item_element.cloneNode(true);
  friend_item_element.remove();


  for (let i = 0; i < size(friend_list); i++) {
    const friend_item_element = friend_item_template.cloneNode(true);
    friend_item_element.querySelector(".user-icon-svg").style.fill =
      user_icon_colors[i + 1];
    friend_item_element.querySelector(".player-item-title").textContent =
      friend_list[i].friend_username;

    friend_item_element.addEventListener("click", function () {
      console.log(friend_list[i].friend_username);
      socket.emit("send_game_invitation", friend_list[i].friend_username);

      Show_Toast("Invitar a partida", "Amigo invitado con exito");
      friend_item_element.style.background =
        "linear-gradient(to right, rgba(28, 152, 93, 10%), rgba(34, 197, 94, 60%), rgba(28, 152, 93))";
    });

    list_of_friends_container.append(friend_item_element);
  }
}

function Insert_List_Of_Players(info, player_item_template, list_of_players) {
  const sidebar_players = game_container.querySelector("#sidebar-players");

  var elementos = game_container.getElementsByClassName('player-item');
  while (elementos.length > 0) {
    elementos[0].parentNode.removeChild(elementos[0]);
}
  for (let i = 0; i < 2 ; i++) {
    const player_item_element = player_item_template.cloneNode(true);
    player_item_element.querySelector(".user-icon-svg").style.fill =
      user_icon_colors[i + 1];

      if(i === 0){
        player_item_element.querySelector(".player-item-title").textContent = info.admin;
      }
      if(i === 1 && info.connected_user !== info.admin){
        player_item_element.querySelector(".player-item-title").textContent =
        info.connected_user;
        list_of_players.push(info.admin)
        list_of_players.push(info.connected_user)

        console.log(list_of_players)
      }
      if(i == 1 && info.connected_user === info.admin){
        player_item_element.querySelector(".player-item-title").textContent =
        "Vacio";
      }


    sidebar_players.append(player_item_element);
  }

  game_container.style.display = "flex"
}
