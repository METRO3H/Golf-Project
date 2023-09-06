import "./styles/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
let counter = 0
const bob = document.getElementById("bob")
const output = document.getElementById("output")
output.textContent = counter


bob.addEventListener("click", function(){
    counter = counter + 1
    console.log(counter)
    output.textContent = counter
})