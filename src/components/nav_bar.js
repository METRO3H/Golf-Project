import nav_bar_HTML from "../views/nav-bar.html"
import "../styles/nav-bar.css"


export function Nav_Bar(){
    const nav_bar_section = document.querySelector("#nav-bar")

    nav_bar_section.innerHTML = nav_bar_HTML
    
    return
}