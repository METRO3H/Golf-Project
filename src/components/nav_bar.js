import nav_bar_HTML from "../views/nav-bar.html"
import "../styles/nav-bar.css"



export function Nav_Bar(){
    const nav_bar_section = document.querySelector("#nav-bar")
    nav_bar_section.innerHTML = nav_bar_HTML
    const user_name = localStorage.getItem('user_name')
    const sign_out_button = nav_bar_section.querySelector("#sign-out-button")
    sign_out_button.addEventListener("click", Sign_Out)
    if(user_name != null){
        nav_bar_section.querySelector("#login-register-button-navbar").style.display = "none"
        nav_bar_section.querySelector("#username-dropdown-navbar-content").textContent = user_name
        nav_bar_section.querySelector("#username-dropdown-navbar").style.display = "list-item"
    }

    return
}

export function Update_Nav_Bar(user_name){

    document.querySelector("#login-register-button-navbar").style.display = "none"
    document.querySelector("#username-dropdown-navbar-content").textContent = user_name
    document.querySelector("#username-dropdown-navbar").style.display = "list-item"

    return
}

function Sign_Out(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_privilege');
    localStorage.removeItem('user_id');
    
    window.location.href = "/player/all";
    
    return
}