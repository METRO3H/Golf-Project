import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js' 
import login_register_containerHTML from "../views/login_register.html"
import {Toast} from "../components/toast.js"
import "../styles/login_register.css"

export function Get_Register_Login_Page() {
    const login_register_container = document.createElement("div")
    login_register_container.id = "register-login-container"
    login_register_container.innerHTML = login_register_containerHTML

    login_register_container.append(Toast("BOB", "Bob XD"))
    

    loginSubmit(login_register_container)
    registerSubmit(login_register_container)

    handleSwitch(login_register_container)

    return login_register_container
}
function registerSubmit(login_register_container){

    const register_form = login_register_container.querySelector("#register-form")

    register_form.addEventListener("submit", (event) => {
        event.preventDefault()

        const user_data = {
            email: register_form["email"].value,
            username: register_form["username"].value,
            password: register_form["password"].value
        }
        registerRequest(user_data)
        Show_Toast(login_register_container)
        })
}
async function registerRequest(user_data){

    try {
        const response = await fetch('../../request/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        });

        const registerResponse = JSON.stringify(await response.json());

        console.log(registerResponse)

        return registerResponse

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }
}

function loginSubmit(login_register_container){

    const login_form = login_register_container.querySelector("#login-form")

    login_form.addEventListener("submit", (event) => {

        event.preventDefault()
        const user_data = {
            email: login_form["email"].value,
            password: login_form["password"].value
        }

        loginRequest(user_data)
        Show_Toast(login_register_container)

        })
}

async function loginRequest(user_data){
    console.log(user_data)
    try {
        const response = await fetch('../../request/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        });

        const loginResponse = await response.json();
        console.log(loginResponse)

        return loginResponse

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }

}

function handleSwitch(login_register_container){

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

function Show_Toast(login_register_container){

    const ToastNotification = login_register_container.querySelector('#liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(ToastNotification)

    toastBootstrap.show()
}
