function deleteClient() {

   let clientsList = document.getElementById("clientsList");
   let listOfClientsElements = clientsList.getElementsByClassName("clientRow");

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