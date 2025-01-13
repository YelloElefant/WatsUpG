let listOfClientsElements = clientsList.getElementsByClassName("clientRow");

console.log(listOfClientsElements);


function deleteClient() {

   let clientsList = document.getElementById("clientsList");

   let clientsSelectionBox = clientsList.getElementsByTagName("input");

   let clientsSelected = [];
   for (let i = 1; i < clientsSelectionBox.length; i++) {
      if (clientsSelectionBox[i].checked) {
         clientsSelected.push(listOfClientsElements[i - 1].getElementsByClassName("clientName")[0].innerHTML);

      }
   }

   clientsSelected.forEach(async (client) => {
      let response = await fetch("http://192.168.1.29:2525/Api/DeleteClient.php?id=" + client, { mode: 'no-cors' }).then(response => response.text())
      console.log(response);
      listOfClientsElements[client].remove();
   });
}

async function refreshClients() {
   for (let i = 0; i < listOfClientsElements.length; i++) {
      const client = listOfClientsElements[i];
      let clientName = client.getElementsByClassName("clientName")[0].children[0].innerHTML;
      // get the heading names of the table
      let tableHeadings = document.getElementById("clientsList").getElementsByTagName("th");
      tableHeadings = Array.from(tableHeadings).map((heading) => heading.getAttribute('data-propertyName')).slice(1).filter((heading) => heading !== "null");


      let deeperValues = tableHeadings.filter((heading) => heading.includes('.')).map((heading) => heading.split('.'));

      tableHeadings = tableHeadings.map((heading) => heading.split('.')[0]);

      let wants = tableHeadings.map((heading) => "&want[]=" + heading).join("");

      let clientData = JSON.parse(await fetch("http://192.168.1.29:2525/Api/GetClientDataById.php?id=" + clientName + wants, { mode: 'no-cors' })
         .then(response => response.text()));


      tableHeadings.map((heading) => {
         for (let i = 0; i < deeperValues.length; i++) {
            if (deeperValues[i][0] == heading) {
               clientData[heading] = JSON.parse(clientData[heading])[0][deeperValues[i][1]];
               break;
            }
         }
         return clientData[heading];
      }
      ).forEach((data, index) => {
         if (index == 0) {
            client.children[index + 1].children[0].innerHTML = data;
            return;
         }
         client.children[index + 1].innerHTML = data;
      });



   }
}

// function to handle search bar
function searchClients() {
   let searchInput = document.getElementById("searchBar").value;
   let clientsList = document.getElementById("clientsList");
   let clients = clientsList.getElementsByClassName("clientRow");
   for (let i = 0; i < clients.length; i++) {
      let client = clients[i];
      for (let j = 1; j < client.children.length; j++) {
         let clientData = client.children[j].innerHTML;
         if (clientData.toLowerCase().includes(searchInput.toLowerCase())) {
            client.style.display = "";
            break;
         } else {
            client.style.display = "none";
         }
      }
   }
}

function clearSearch() {
   let searchInput = document.getElementById("searchBar");
   searchInput.value = "";
   searchClients();
}