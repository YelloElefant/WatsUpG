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
   let data;
   if (window.location.host == "192.168.1.34:2525") {
      data = await fetch("http://192.168.1.34:2525/SendData.php?id=BigPPServer" , { mode: 'no-cors'}).then(response => response.text());
   }
   else {
      data = await fetch("https://watsupg.yelloelefant.com/SendData.php?id=BigPPServer" , { mode: 'no-cors'}).then(response => response.text());
   }
   let card = document.getElementsByClassName("clientInfo")[0];
   let name = card.previousSibling.previousSibling.children[1].children[0];
   let hostName = card.children[0].children[1];
   let NetworkName = card.children[1].children[1];
   let pubIP = card.children[2].children[1];
   let privIP = card.children[3].children[1];
   let cpuUsage = card.children[4].children[1];
   let ramUsage = card.children[5].children[1];
   let upTime = card.children[6].children[1];
   let timeStamp = card.children[7].children[1];
   let json = JSON.parse(data);
   //console.log(json);
   name.innerHTML = json["id"];
   hostName.innerHTML = json["hostName"];
   NetworkName.innerHTML = json["networkName"];
   pubIP.innerHTML = json["privateIpv4"];
   privIP.innerHTML = json["privateIpv6"];
   cpuUsage.innerHTML = json["cpu"] + '%';
   ramUsage.innerHTML = json["memory"] + '%';
   upTime.innerHTML = json["upTime"] + ' days';
   timeStamp.innerHTML = json["time"];
}

Refresh();
setInterval(Refresh, 500)


// let clientCard = document.getElementsByClassName("clientCard")[0];
// console.log(clientCard);
// let clients = document.getElementById("clients");

// for (let i = 0; i < 7; i++) {
//    clients.appendChild(clientCard.cloneNode(true));
// }
