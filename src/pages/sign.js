import { Show_Toast } from "../components/toast.js"
import login_register_containerHTML from "../views/login_register.html"
import { Render_Content } from '../router/render_content.js'
import "../styles/login_register.css"
import { Update_Nav_Bar } from "../components/nav_bar.js"

const login_register_container = document.createElement("div")

export function Get_Register_Login_Page() {

    if(localStorage.getItem('token') || localStorage.getItem('user_name')){
        login_register_container.innerHTML = login_register_containerHTML
    }

    login_register_container.id = "register-login-container"
    login_register_container.innerHTML = login_register_containerHTML

    loginSubmit()

    registerSubmit()
    
    handleSwitch()

    return login_register_container
}

function registerSubmit(){

    const register_form = login_register_container.querySelector("#register-form")

    register_form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const user_data = {
            email: register_form["email"].value,
            username: register_form["username"].value,
            password: register_form["password"].value
        }
        const response = await fetch('../../request/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        });

        const body_response = await response.json()

        Show_Toast("Registro", body_response.message)

        if(!response.ok) return

        const beautifier_button = login_register_container.querySelector("#beautifier-button")
        const form_container = login_register_container.querySelector(".form-container")
        form_container.style.transform = "translateX(0%)"
        beautifier_button.style.transform = "translateX(0%)"
        
        })
}

function loginSubmit(){

    const login_form = login_register_container.querySelector("#login-form")

    login_form.addEventListener("submit", async function(event){

        event.preventDefault()

        const user_data = {
            email: login_form["email"].value,
            password: login_form["password"].value
        }
        const response = await fetch('../../request/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        });

        const body_response = await response.json()
        Show_Toast("Iniciar sesión", body_response.message)

        if(!response.ok) return;

        localStorage.setItem('token', body_response.jwt);
        localStorage.setItem('user_name', body_response.data.username);

        Update_Nav_Bar(body_response.data.username)

        const path = '/player/all'
        history.pushState(null, null, path);
        Render_Content(path);
       
    })
}


function handleSwitch(){

    const register_switch = login_register_container.querySelector("#register-button-switch")
    const login_switch = login_register_container.querySelector("#login-button-switch") 

    const beautifier_button = login_register_container.querySelector("#beautifier-button")
    const form_container = login_register_container.querySelector(".form-container")
  

    register_switch.addEventListener("click", function(){
        form_container.style.transform = "translateX(-50%)"
        beautifier_button.style.transform = "translateX(100%)"
    })

    login_switch.addEventListener("click", function(){
        form_container.style.transform = "translateX(0%)"
        beautifier_button.style.transform = "translateX(0%)"
    })


}

