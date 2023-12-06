
import game_html from "../views/games.html";
import "../styles/games.css";
import searcherComponent from "../components/searcher.js";

export default function () {
  const games_page_container = document.createElement("div");
  games_page_container.id = "games-page-container";
  games_page_container.innerHTML = game_html;

  const searcher_container = games_page_container.querySelector("#searcher-container");
  searcher_container.append(searcherComponent());

  const games = get_games();
  return games_page_container;
}

async function get_games() {
  const response = await fetch(`../../request/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body_response = await response.json();

  if (!response.ok) {
    alert(body_response.message);
    return;
  }

  const games = body_response.data;
  const games_container = document.querySelector("#accordionExample");
  
  // Get the game item template
  const game_item_template = games_container.querySelector(".accordion-item");
  // Remove the template from the DOM temporarily
  game_item_template.remove();

  games.forEach((game, index) => {
    // Clone the template
    const game_item = game_item_template.cloneNode(true);
    // now delete the template

    // Fill in the data
    game_item.querySelector(".accordion-button").textContent = `Partida ${game.id}`;
    game_item.querySelector(".accordion-button").dataset.bsTarget = `#collapse${game.id}`;
    game_item.querySelector(".accordion-collapse").id = `collapse${game.id}`;

    const list_items = game_item.querySelectorAll(".list-group-item");
    list_items[0].textContent = `Fecha: ${game.date}`;
    list_items[1].textContent = `Clima: ${game.weather}`; // Assuming 'Cancha' refers to 'weather'
    list_items[2].textContent = `Tipo de juego: ${game.rules}`; // Assuming 'Tipo de juego' refers to 'rules'
    list_items[3].textContent = `Jugadores: ${game.number_of_players}`; // Assuming 'Puntaje' refers to 'number_of_players'
    list_items[4].textContent = `Duracion de la partida: ${game.duration}`; // Assuming 'Resultado' refers to 'duration'

    // Append the clone to the games_container
    games_container.append(game_item);
  });

  console.log(games);
}