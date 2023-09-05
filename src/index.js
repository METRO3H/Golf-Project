import "./styles/index.css"


const bob = document.getElementById("bob")
const output = document.getElementById("output")
let counter = 0

bob.addEventListener("click", function(){
    counter = counter + 1
    console.log(counter)
    output.textContent = counter
})