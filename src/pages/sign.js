import login_register_containerHTML from "../views/login_register.html"
import "../styles/login_register.css"
import { log } from "neo-async"

export default function () {

    const login_register_container = document.createElement("div")
    login_register_container.id = "register-login-container"
    login_register_container.innerHTML = login_register_containerHTML

    const form = login_register_container.querySelector("#login-form")
    loginSubmit(form)

    return login_register_container

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