
import Get_All_Players from "../../pages/players.js"
import Get_Player_Profile from "../../pages/player_profile.js"

export function Get_Player_Page(url_parts){
    
    const player_request = url_parts[2]
    console.log(player_request)
    if(player_request === "all"){
        
        return {
            title: "Players",
            description: "Lista de todos los jugadores",
            content: Get_All_Players()
          }
    }

    return {
        title: player_request,
        description: `Perfil del Jugador ${player_request}`,
        content: Get_Player_Profile(player_request)
        }
    
   
}