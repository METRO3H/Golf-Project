import Test_HTML from "../views/test.html"
import "../styles/test.css"

export default function(){

    // Crear el contenedor y cargar el HTML
    const Test_Container = document.createElement("div")
    Test_Container.id = "test-container"
    Test_Container.innerHTML = Test_HTML

    // Obtener el botón y agregar el event listener
    const ButtonElement = Test_Container.querySelector("#btnFetch")
    ButtonElement.addEventListener("click", fetchData)

    // Función async para hacer la petición fetch
    async function fetchData() {
        try {
            const response = await fetch('../../request/player/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ /* datos que quieres enviar en el body */ })
            });

            const data = await response.json();
            ShowData(data);
        } catch (error) {
            console.error('Error al obtener la información:', error);
        }
    }

    // Función para mostrar la información
    function ShowData(data) {
        const ResultElement = Test_Container.querySelector("#result");
        ResultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    return Test_Container;
}
