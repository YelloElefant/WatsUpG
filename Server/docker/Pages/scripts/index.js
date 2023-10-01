console.log("index.js loaded");

let currentPath = window.location.pathname;
currentPath = currentPath.split("/");


currentPath = currentPath[currentPath.length - 1];
if (currentPath == "index.html" || currentPath == "" || currentPath == "index" || currentPath == "/") {
   currentPath = "dashboard"
} else {

   currentPath = currentPath.split(".")[0];
}

let navToHighlight = document.getElementById(currentPath + "Link");
navToHighlight.style.backgroundColor = "#171b20";
navToHighlight.style.borderRadius = "0.375rem";



// let clientCard = document.getElementsByClassName("clientCard")[0];
// console.log(clientCard);
// let clients = document.getElementById("clients");

// for (let i = 0; i < 7; i++) {
//    clients.appendChild(clientCard.cloneNode(true));
// }