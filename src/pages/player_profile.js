import perfil_html from "../views/profiles.html"
import "../styles/perfil.css"

export default function(player_name){

    const player_profile_page_container = document.createElement("div")
    player_profile_page_container.id = "perfil_container"
    player_profile_page_container.innerHTML = perfil_html
    
    Insert_Profile_Data_To(player_profile_page_container, player_name)

    return player_profile_page_container
}

async function Insert_Profile_Data_To(player_profile_page_container, player_name){

    const username = player_profile_page_container.querySelector("#username-item")
    const email = player_profile_page_container.querySelector("#email-item")
    const description = player_profile_page_container.querySelector("#description-item")
    const handicap = player_profile_page_container.querySelector("#handicap-item")

    const player_data = await getUserData(player_name)
    
    console.log(player_data)

    username.textContent = player_data.username
    email.textContent = player_data.email
    description.textContent = player_data.description
    handicap.textContent = player_data.handicap

}

async function getUserData(player_name){

    try {
        const request = await fetch(`../../request/player/${player_name}`);

        const response = await request.json()

        console.log(response.message)

        return response.data

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }

}