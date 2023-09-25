
import { size } from "lodash"
import all_players from "../../pages/players.js"
import player_profile from "../../pages/player_profile.js"

export function Get_Player_Page(routeParts){
    
    const router_size = size(routeParts)
    if( router_size == 2){

        return ["Players", all_players()]

    }
    if(router_size == 3){
        const playerName = routeParts[2]
        return ["Player", player_profile(playerName)]
        
    }
   
}