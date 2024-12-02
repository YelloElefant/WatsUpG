async function Refresh() {
   let cardTemplate = document.getElementById("clientCardTemp").children[0];
   // console.log(cardTemplate);
   //get all ids to refresh

   let ids = await fetch("./KnownClientsData.php", { mode: 'no-cors' }).then(response => response.text());
   ids = JSON.parse(ids);
   for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let makeNew = false;

      let card = checkForCard(id);
      if (card === -1) {
         makeNew = true;
         card = cardTemplate.cloneNode(true);
      }

      let data = await fetch("./Api/GetClientDataById.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());
      let json = JSON.parse(data);
      console.log(json);
      let newCardData = [
         json["id"],
         json["adapter"],
         json["adapterProtocol"],
         json["hostName"],
         json["networkName"],
         JSON.parse(json["ip"])[0].local,
         JSON.parse(json["ip"])[1].local,
         json["cpu"] + '%',
         json["memory"] + '%',
         json["upTime"] + ' days',
         json["time"]
      ];


      card.id = newCardData[0];
      newCardData.forEach((data, index) => {
         if (index == 0) {
            // get the name of the client
            card.getElementsByClassName("clientName")[0].children[0].innerHTML = data;
            return;
         }
         if (index == 1) {
            card.getElementsByClassName("adapter")[0].innerHTML = data;
            return;
         }
         if (index == 2) {
            card.getElementsByClassName("adapterProtocol")[0].innerHTML = data;
            return;
         }
         let cardInfoBox = card.getElementsByClassName("clientInfoBox")[index - 3];
         cardInfoBox.children[1].innerHTML = data;

      }
      );

      let clients = document.getElementById("clients");
      if (makeNew == true) {
         clients.appendChild(card);
      }
   }

   function checkForCard(id) {
      let cards = document.getElementsByClassName("clientCard");
      for (let i = 0; i < cards.length; i++) {
         const card = cards[i];
         if (card.id == id) {
            return card;
         }
      }
      return -1;
   }

}

// Refresh();
setInterval(Refresh, 500)

