import nav_bar_HTML from "../views/nav-bar.html"
import "../styles/nav-bar.css"


export default function(){
    const Nav_Bar_div = document.createElement("div")
    Nav_Bar_div.innerHTML = nav_bar_HTML
    
    return Nav_Bar_div
}