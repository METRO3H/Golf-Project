import searcher_HTML from "../views/searcher.html"

export default function(){
    const searcher_container = document.createElement("div")

    searcher_container.innerHTML = searcher_HTML

    return searcher_container
}