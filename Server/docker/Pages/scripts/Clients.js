let listOfClientsElements = clientsList.getElementsByClassName("clientRow");

console.log(listOfClientsElements);

for (let i = 0; i < listOfClientsElements.length; i++) {
   const client = listOfClientsElements[i];
   let clientName = client.getElementsByClassName("clientName")[0].innerHTML;
   let clientCheckBox = client.getElementsByTagName("input")[0];
   clientCheckBox.addEventListener("change", (event) => {
      if (event.target.checked) {
         client.style.backgroundColor = "lightblue";
      }
      else {
         client.style.backgroundColor = "white";
      }
   });
   client.addEventListener("click", () => {
      let currentUrl = window.location.href;
      currentUrl = currentUrl.split("/")[0];
      newUrl = currentUrl + "/Client.php?id=" + clientName;
      window.location.href = newUrl;
   });
}


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

