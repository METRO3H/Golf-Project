import perfil_html from "../views/profiles.html"
import "../styles/perfil.css"

export default function(playerName){

    const player_profile_page_container = document.createElement("div")
    player_profile_page_container.id = "perfil_container"
    player_profile_page_container.innerHTML = perfil_html
    
    Insert_Profile_Data_To(player_profile_page_container)

    return player_profile_page_container
}

async function Insert_Profile_Data_To(player_profile_page_container){

    const username = player_profile_page_container.querySelector("#username-item")
    const email = player_profile_page_container.querySelector("#email-item")
    const description = player_profile_page_container.querySelector("#description-item")
    const handicap = player_profile_page_container.querySelector("#handicap-item")
    const user_id = username.dataset.info;

    const user_data = await getUserData(user_id)
    
    console.log(user_data)

    username.textContent = user_data.username
    email.textContent = user_data.email
    description.textContent = user_data.description
    handicap.textContent = user_data.handicap

}

async function getUserData(user_id){

    try {
        const response = await fetch(`../../request/player/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id})
        });
         var user_data = await response.json()

        return user_data[0]

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }

}