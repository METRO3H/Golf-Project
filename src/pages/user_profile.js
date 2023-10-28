import perfil_html from "../views/profiles.html"
import "../styles/perfil.css"

export default function(){

    const player_profile_page_container = document.createElement("div")
    player_profile_page_container.id = "perfil_container"
    player_profile_page_container.innerHTML = perfil_html
    
    Insert_Profile_Data_To(player_profile_page_container)

    return {
        title: "Perfil",
        description: "Perfil del Usuario",
        content: player_profile_page_container
    }
}

async function Insert_Profile_Data_To(player_profile_page_container){

    const username = player_profile_page_container.querySelector("#username-item")
    const email = player_profile_page_container.querySelector("#email-item")
    const description = player_profile_page_container.querySelector("#description-item")
    const handicap = player_profile_page_container.querySelector("#handicap-item")

    const token = localStorage.getItem('token')
    
    const response = await fetch(`../../request/profile`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const body_response = await response.json()
    
    if(!response.ok){
        player_profile_page_container.innerHTML = `<h1> ${body_response.message} </h1>`
        player_profile_page_container.style.display = "flex"
        return
    }

    const player_data = body_response.data

    username.textContent = player_data.username
    email.textContent = player_data.email
    description.textContent = player_data.description
    handicap.textContent = player_data.handicap

    player_profile_page_container.style.display = "flex"

}