import { loadHtmlFile } from "./handler.js";


document.addEventListener('DOMContentLoaded',()=>{
    let header = document.getElementById("header");
    if(header){
        loadHtmlFile(header,"../../templates/header.html")
    }
});
