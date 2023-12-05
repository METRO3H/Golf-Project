import { Show_Toast } from "../components/toast.js";
import perfil_html from "../views/profiles.html";
import "../styles/perfil.css";
import { friend_request_status } from "../constants/values.js";

export default function (player_name) {
  const player_profile_page_container = document.createElement("div");
  player_profile_page_container.id = "perfil_container";
  player_profile_page_container.innerHTML = perfil_html;

  Load_Profile_Data(player_profile_page_container, player_name);

  return player_profile_page_container;
}

async function Load_Profile_Data(player_profile_page_container, player_name) {

  const response = await fetch(`../../request/player/${player_name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name: localStorage.getItem("user_name") }),
  });

  const body_response = await response.json();

  if (!response.ok) {
    player_profile_page_container.innerHTML = `<h1> ${body_response.message} </h1>`;
    player_profile_page_container.style.display = "flex";
    return;
  }

  const player_data = body_response.data;
  console.log(player_data);

  Load_Relationship_Status_Button(player_data, player_profile_page_container)

  const username = player_profile_page_container.querySelector("#username-item");
  const email = player_profile_page_container.querySelector("#email-item");
  const description = player_profile_page_container.querySelector("#description-item");
  const handicap = player_profile_page_container.querySelector("#handicap-item");

  username.textContent = player_data.username;
  email.textContent = player_data.email;
  description.textContent = player_data.description;
  handicap.textContent = player_data.handicap;

  player_profile_page_container.style.display = "flex";
}

function Load_Relationship_Status_Button(player_data, player_profile_page_container){

  const relationship_status_button = player_profile_page_container.querySelector("#relationship-status-button");
  const my_username = localStorage.getItem("user_name")

  if(my_username == null) return;

  const root = document.documentElement;

  if (player_data.friendship_status == true) {

    relationship_status_button.textContent = "Amigos";
    root.style.setProperty('--relationship-status-button-color', 'linear-gradient(to right, rgb(28, 152, 93), rgb(34, 197, 94), rgb(28, 152, 93))');

    root.style.setProperty('--relationship-status-button-hover-color', 'linear-gradient(to right, rgb(28, 152, 93), rgb(34, 197, 94), rgb(28, 152, 93))');

    relationship_status_button.style.display = "block"
    return
  }

  if( player_data.sender_username == my_username && player_data.receiving_username == player_data.username){
    relationship_status_button.textContent = "Solicitud de amistad enviada";
    root.style.setProperty('--relationship-status-button-color', 'linear-gradient(270deg, rgb(226, 171, 4) 20%, rgb(255, 193, 11) 50%, rgb(226, 171, 4) 80%)');

    root.style.setProperty('--relationship-status-button-hover-color', 'linear-gradient(to right, rgb(28, 152, 93), rgb(34, 197, 94), rgb(28, 152, 93))');
    relationship_status_button.style.display = "block"
    return
  }

  if( player_data.sender_username == player_data.username && player_data.receiving_username == my_username){
    relationship_status_button.textContent = "Aceptar solicitud de amistad";
    root.style.setProperty('--relationship-status-button-color', 'linear-gradient(270deg, rgb(226, 171, 4) 20%, rgb(255, 193, 11) 50%, rgb(226, 171, 4) 80%)');

    root.style.setProperty('--relationship-status-button-hover-color', 'linear-gradient(to right, rgb(28, 152, 93), rgb(34, 197, 94), rgb(28, 152, 93))');
    relationship_status_button.style.display = "block"
    return
  }



  relationship_status_button.addEventListener("click", function () {
    Send_Friend_Request(player_name, token);
  });

    // Hide the button if the user ID is the same as the user ID of the page
    const username = localStorage.getItem('user_name'); // Get the user ID from local storage
    console.log(username);
    console.log(player_data.username);
    if (username === player_data.username) {
      const button = player_profile_page_container.querySelector('#relationship-status-button');
      button.style.display = 'none';
    }
}

async function Send_Friend_Request(player_name, token) {
  const response = await fetch(`../../request/add/friend/${player_name}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body_response = await response.json();

  Show_Toast("Añadir amigo", body_response.message);

  if (!response.ok) return;
}
