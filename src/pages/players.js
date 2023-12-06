import searcher_component from "../components/searcher.js"
import players_page_HTML from "../views/players_page.html"
import "../styles/players_page.css"
import { set, size, template } from "lodash"
import {user_icon_colors} from "../constants/colors.js"

let original_template;
let original_element;

export default function(){
    const list_of_players = []

    const players_page_container = document.createElement("div")
    players_page_container.id = "players-page-container"
    players_page_container.innerHTML = players_page_HTML
    
    const searcher_container = players_page_container.querySelector("#searcher-container")
    const list_of_players_group = players_page_container.querySelector(".list-group")

    searcher_container.append( searcher_component() )

    //TEST CAMBIAR HANDICAP
    const privilege = localStorage.getItem('user_privilege');
    //console.log(privilege);
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

    // Add event listener to search input field
    const searchInput = searcher_container.querySelector('input');
    Insert_Players_To(list_of_players_group, list_of_players)
    searchInput.addEventListener('input', (e) => {
        update_list_of_players(list_of_players_group, e.target.value, list_of_players);
    });

    return players_page_container
}

/*async function Insert_Players_To2(list_of_players_group, key_input){
        
        const response = await fetch('../../request/player/all')
        const body_response = await response.json()
    
        // now sort the players by handicap
        const body_response_sort = body_response.data.sort((a,b) => a.handicap - b.handicap)
        // now sort the players by key_input, and only show the ones that match
        const body_response_sort2 = body_response_sort.filter((a) => a.username.toLowerCase().includes(key_input.toLowerCase()))
        
        if(!response.ok){
            list_of_players_group.innerHTML = `<h1> ${body_response.message} </h1>`
            return
        }
    
        const player_item_template = list_of_players_group.querySelector(".list-group-item")
        console.log(player_item_element)
        const player_item_element = player_item_template.cloneNode(true)
    
        player_item_template.remove()
    
        const players = body_response_sort2
        console.log(players)
        
        //clear old list of players
        list_of_players_group.innerHTML = ""
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
}*/

async function update_list_of_players(list_of_players_group,key_input, list_of_players){
    //const player_item_template = list_of_players_group.querySelector(".list-group-item")
    //const player_item_element = player_item_template.cloneNode(true) // Clone the template before removing it
    
    const player_item_template = getTemplate()
    const player_item_element = getElement()
    // now sort the players by handicap
    const list_of_players_sort = list_of_players.sort((a,b) => a.handicap - b.handicap)
    
    // now sort the players by key_input, and only show the ones that match
    const list_of_players_sort2 = list_of_players_sort.filter((a) => a.username.toLowerCase().includes(key_input.toLowerCase()))
    list_of_players_group.innerHTML = ""
    for (let i = 0; i < size(list_of_players_sort2); i++) {
        
        const item = player_item_element.cloneNode(true) // Use the clone as the template
        const player_name = list_of_players_sort2[i]["username"]
        const formatted_player_name = player_name.replace(/\s/g, '_')

        item.setAttribute("href",`/player/${formatted_player_name}`)
        item.querySelector("#user-icon-svg").style.fill = user_icon_colors[i] 
        item.querySelector("#item-title").textContent = player_name
        item.querySelector("#item-description").textContent = list_of_players_sort2[i]["description"]
        item.querySelector("#item-ranking").textContent = `#${list_of_players_sort2[i]["handicap"]}`
        list_of_players_group.append(item)
    }
}
async function Insert_Players_To(list_of_players_group, list_of_players){
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
    setTemplate(player_item_element,player_item_template)
    //console.log('template setted')  
    //console.log(getTemplate())
    //console.log(getElement())

    player_item_template.remove()

    list_of_players.push(...body_response.data)

    for (let i = 0; i < size(list_of_players); i++) {
        
        const item = player_item_element.cloneNode(true)
        const player_name = list_of_players[i]["username"]
        const formatted_player_name = player_name.replace(/\s/g, '_')

        item.setAttribute("href",`/player/${formatted_player_name}`)
        item.querySelector("#user-icon-svg").style.fill = user_icon_colors[i] 
        item.querySelector("#item-title").textContent = player_name
        item.querySelector("#item-description").textContent = list_of_players[i]["description"]
        item.querySelector("#item-ranking").textContent = `#${list_of_players[i]["handicap"]}`
        list_of_players_group.append(item)
    }
    player_item_element.remove()
}

function setTemplate(template, element){
    original_template = template;
    original_element = element;
}

function getTemplate(){
    return original_template;
}

function getElement(){
    return original_element;
}