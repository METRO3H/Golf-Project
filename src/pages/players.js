import searcher_component from "../components/searcher.js"
import players_page_HTML from "../views/players_page.html"
import "../styles/players_page.css"
import { size } from "lodash"
import {user_icon_colors} from "../constants/colors.js"

export default function(){

    const players_page_container = document.createElement("div")
    players_page_container.id = "players-page-container"
    players_page_container.innerHTML = players_page_HTML

    const searcher_container = players_page_container.querySelector("#searcher-container")
    const list_of_players_group = players_page_container.querySelector(".list-group")

    searcher_container.append( searcher_component() )

//TEST CAMBIAR HANDICAP

const privilege = localStorage.getItem('user_privilege');
console.log(privilege);
if (privilege === 'admin') {
  // Create new form
  const form = document.createElement('form');
  form.innerHTML = `
      <input type="text" id="id-input" placeholder="Enter ID">
      <input type="text" id="handicap-input" placeholder="Enter Handicap">
      <button>Change Handicap</button>
  `;
  form.addEventListener('click', async (e) => {
      const user_data = {
          id: document.getElementById('id-input').value,
          handicap: document.getElementById('handicap-input').value
      }
      e.preventDefault();
      const id = document.getElementById('id-input').value;
      const handicap = document.getElementById('handicap-input').value;
  
      const response = await fetch('../../request/player/change_handicap', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user_data)
      });
  
      const body_response = await response.json()

  });

  // Append the form to the container
  players_page_container.insertBefore(form, players_page_container.firstChild);
}
//TEST CAMBIAR HANDICAP


    Insert_Players_To(list_of_players_group)

    return players_page_container
}

async function Insert_Players_To(list_of_players_group){

    const response = await fetch('../../request/player/all')
    const body_response = await response.json()

    // now sort the players by handicap
    const body_response_sort = body_response.data.sort((a,b) => a.handicap - b.handicap)

    if(!response.ok){
        list_of_players_group.innerHTML = `<h1> ${body_response.message} </h1>`
        return
    }

    const player_item_template = list_of_players_group.querySelector(".list-group-item")
    const player_item_element = player_item_template.cloneNode(true)

    player_item_template.remove()

    const players = body_response.data
    for (let i = 0; i < size(players); i++) {

        const item = player_item_element.cloneNode(true)
        const player_name = players[i]["username"]
        const formatted_player_name = player_name.replace(/\s/g, '_')

        item.setAttribute("href",`/player/${formatted_player_name}`)
        item.querySelector("#user-icon-svg").style.fill = user_icon_colors[i] 
        item.querySelector("#item-title").textContent = player_name
        item.querySelector("#item-description").textContent = players[i]["description"]
        item.querySelector("#item-ranking").textContent = `#${players[i]["handicap"]}`
        list_of_players_group.append(item)
        
    }
    player_item_element.remove()
}

/* function generateInvitationLink() {
    return 'http://localhost:6069/create_game' + Math.random().toString(36);
}

function buildInvitationLink() {
    const invitationLink = generateInvitationLink();
    document.getElementById('invitation-link').textContent = invitationLink;
}

// Llama a la función cuando la página se carga
window.onload = buildInvitationLink; */
