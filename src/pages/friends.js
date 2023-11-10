import friends_html from "../views/friends.html"
import {user_icon_colors} from "../constants/colors.js"
const friends_container = document.createElement("div")

export default function(){
    
    friends_container.innerHTML = friends_html
}