import login_register_containerHTML from "../views/login_register.html"
import "../styles/login_register.css"

export function Get_Register_Login_Page() {
    const login_register_container = document.createElement("div")
    login_register_container.id = "register-login-container"
    login_register_container.innerHTML = login_register_containerHTML

    const login_form = login_register_container.querySelector("#login-form")
    loginSubmit(login_form)

    handleSwitch(login_register_container)

    const register_form = login_register_container.querySelector("#register-form")
    registerSubmit(register_form)

    return login_register_container

}
function registerSubmit(register_form){
    register_form.addEventListener("submit", (event) => {
        event.preventDefault()

        const user_data = {
            email: register_form["email"].value,
            username: register_form["username"].value,
            password: register_form["password"].value
        }
        registerRequest(user_data)

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

function loginSubmit(form){
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const username = form["username"].value
        const password = form["password"].value

        loginRequest(username, password)

        })
}

async function loginRequest(username, password){
    const data = {
        username: username,
        password: password
    }
    console.log(data)
    try {
        const response = await fetch('../../request/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const loginResponse = await response.json();
        console.log(loginResponse)

        return loginResponse

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }

}

async function checkUserExists(username){
    const data = {
        username: username
    }
    try {
        const response = await fetch('../../request/checkUserExists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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