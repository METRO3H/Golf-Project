import { Show_Toast } from "../components/toast.js";
import perfil_html from "../views/profiles.html";
import "../styles/perfil.css";
import { friend_request_status } from "../constants/values.js";

export default function (player_name) {
  const player_profile_page_container = document.createElement("div");
  player_profile_page_container.id = "perfil_container";
  player_profile_page_container.innerHTML = perfil_html;

  Insert_Profile_Data_To(player_profile_page_container, player_name);

  return player_profile_page_container;
}

async function Insert_Profile_Data_To(
  player_profile_page_container,
  player_name
) {
  const friend_request_button = player_profile_page_container.querySelector( "#friend-request-button");
  const token = localStorage.getItem("token")
  const user_name = localStorage.getItem("user_name")
  if (token == null || user_name === player_name) {
    friend_request_button.remove(); //chao
  }
  const username =
    player_profile_page_container.querySelector("#username-item");
  const email = player_profile_page_container.querySelector("#email-item");
  const description =
    player_profile_page_container.querySelector("#description-item");
  const handicap =
    player_profile_page_container.querySelector("#handicap-item");

  const response = await fetch(`../../request/player/${player_name}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name: user_name }),
  });

  const body_response = await response.json();

  if (!response.ok) {
    player_profile_page_container.innerHTML = `<h1> ${body_response.message} </h1>`;
    player_profile_page_container.style.display = "flex";
    return;
  }

  const player_data = body_response.data;
  console.log(player_data);

  if (player_data.status === friend_request_status.waiting) {
    friend_request_button.textContent = "Solicitud de amistad enviada";
    friend_request_button.classList.remove("btn-info");
    friend_request_button.classList.add("btn-warning");
  }

  friend_request_button.addEventListener("click", function () {
    Send_Friend_Request(player_name, token);
  });
  username.textContent = player_data.username;
  email.textContent = player_data.email;
  description.textContent = player_data.description;
  handicap.textContent = player_data.handicap;

  player_profile_page_container.style.display = "flex";
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
