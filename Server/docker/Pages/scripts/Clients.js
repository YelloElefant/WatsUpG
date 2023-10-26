async function AddClients() {
   let cardTemplate = document.getElementById("clientCardTemp").children[0];
   //console.log(cardTemplate);
   //get all ids to refresh
   let ids;
   if (window.location.host == "192.168.1.34:2525") {
      ids = await fetch("http://192.168.1.34:2525/KnownClientsData.php", { mode: 'no-cors' }).then(response => response.text());
   }
   else {
      ids = await fetch("https://watsupg.yelloelefant.com/KnownClientsData.php", { mode: 'no-cors' }).then(response => response.text());
   }
   ids = JSON.parse(ids);
   for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let makeNew = false;

      let card = checkForCard(id);
      if (card === -1) {
         makeNew = true;
         card = cardTemplate.cloneNode(true);
      }

      let data;
      if (window.location.host == "192.168.1.34:2525") {
         data = await fetch("http://192.168.1.34:2525/SendData.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());
      }
      else {
         data = await fetch("https://watsupg.yelloelefant.com/SendData.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());
      }

      let cardInfo = card.children[1];
      let name = cardInfo.previousSibling.previousSibling.children[1].children[0];
      let hostName = cardInfo.children[0].children[1];
      let json = JSON.parse(data);
      //console.log(json);
      name.innerHTML = json["id"];
      card.id = json["id"];
      hostName.innerHTML = json["hostName"];

      let clientsList = document.getElementById("clientsList");

      if (makeNew == true) {
         clientsList.appendChild(card);
      }
   }

   function checkForCard(id) {
      let cards = document.getElementsByClassName("clientCard");
      for (let i = 0; i < cards.length; i++) {
         const card = cards[i];
         if (card.children[1].previousSibling.previousSibling.children[1].children[0].innerHTML == id) {
            return card;
         }
      }
      return -1;
   }

}

AddClients();