import login_register_containerHTML from "../views/login_register.html"
import "../styles/login_register.css"

export function Get_Register_Login_Page() {


    const login_register_container = document.createElement("div")
    login_register_container.id = "register-login-container"
    login_register_container.innerHTML = login_register_containerHTML

    const login_form = login_register_container.querySelector("#login-form")
    loginSubmit(login_form)

    const register_form = login_register_container.querySelector("#register-form")
    registerSubmit(register_form)

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

function registerSubmit(form){
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const name = form["name"].value
        const email = form["email"].value
        const password = form["password"].value

        registerRequest(name, email, password)

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

async function registerRequest(name, email, password){
    const data = {
        name: name,
        email: email,
        password: password
    }
    console.log(data)
    try {
        const response = await fetch('../../request/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const registerResponse = await response.json();
        console.log(registerResponse)

        return registerResponse

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }
}