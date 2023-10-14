import { loading_bar } from "../constants/dom.js";


export function start_loading_bar(){

    loading_bar.classList.add("loading-bar-animation-class")
}
export function end_loading_bar(){

    loading_bar.addEventListener("animationend", function(){
        loading_bar.classList.remove("loading-bar-animation-class")
    })
}

