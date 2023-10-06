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

async function Refresh() {
   let data = await fetch("http://192.168.1.34:2525/SendData.php?id=Alex").then(response => response.text());
   let card = document.getElementsByClassName("clientInfo")[0];
   let hostName = card.children[0].children[1];
   let NetworkName = card.children[1].children[1];
   let pubIP = card.children[2].children[1];
   let privIP = card.children[3].children[1];
   let cpuUsage = card.children[4].children[1];
   let ramUsage = card.children[5].children[1];
   let upTime = card.children[6].children[1];
   let json = JSON.parse(data);
   
   hostName.innerHTML = json["hostName"];
   NetworkName.innerHTML = json["hostName"];
   pubIP.innerHTML = json["hostName"];
   privIP.innerHTML = json["hostName"];
   cpuUsage.innerHTML = json["hostName"];
   ramUsage.innerHTML = json["hostName"];
   upTime.innerHTML = json["hostName"];

}

Refresh();
//setInterval(Refresh, 1000)


// let clientCard = document.getElementsByClassName("clientCard")[0];
// console.log(clientCard);
// let clients = document.getElementById("clients");

// for (let i = 0; i < 7; i++) {
//    clients.appendChild(clientCard.cloneNode(true));
// }