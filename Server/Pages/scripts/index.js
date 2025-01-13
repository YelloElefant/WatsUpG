console.log("index.js loaded");

let currentPath = window.location.pathname;
currentPath = currentPath.split("/");


currentPath = currentPath[currentPath.length - 1];
if (currentPath == "index.html" || currentPath == "" || currentPath == "index" || currentPath == "/" || currentPath == "index.php") {
   currentPath = "dashboard"
} else {

   currentPath = currentPath.split(".")[0].toLowerCase();
}

let navToHighlight = document.getElementById(currentPath + "Link");
navToHighlight.style.backgroundColor = "#171b20";
navToHighlight.style.borderRadius = "0.375rem";

let colapsed = false;
document.getElementById("sidebarColapse").addEventListener("click",
   () => {
      let sidebarWrapper = document.getElementById("sidebarWrapper");
      let words = document.getElementsByClassName("linkWord");
      let titleParts = document.getElementById("sidebarTitle").children;

      let collapeIcon = document.getElementById("collapeIcon");
      let attributes = !colapsed ? ["none", "auto", "rotate(180)"] : ["inline", "300px", "rotate(0)"];
      for (let i = 0; i < words.length; i++) {
         words[i].style.display = attributes[0];
      }

      for (let i = 1; i < titleParts.length; i += 2) {
         titleParts[i].style.display = attributes[0];
      }

      sidebarWrapper.style.width = attributes[1];

      collapeIcon.setAttribute(
         "transform",
         attributes[2]
      );
      colapsed = colapsed ? false : true;
   }
);


// let clientCard = document.getElementsByClassName("clientCard")[0];
// console.log(clientCard);
// let clients = document.getElementById("clients");

// for (let i = 0; i < 7; i++) {
//    clients.appendChild(clientCard.cloneNode(true));
// }
