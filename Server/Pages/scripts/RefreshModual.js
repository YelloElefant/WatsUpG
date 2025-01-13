async function Refresh(arrayOfProperties, arrayOfElementsToPopulate) {

   let ids = await fetch("./KnownClientsData.php", { mode: 'no-cors' }).then(response => response.text());
   ids = JSON.parse(ids);

   for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      let rawData = await fetch("./Api/GetClientDataById.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());
      let data = JSON.parse(rawData);

      let newCardData = [];
      arrayOfProperties.forEach(property => {
         newCardData.push(data[property]);
      });

      for (let j = 0; j < arrayOfElementsToPopulate.length; j++) {
         const element = arrayOfElementsToPopulate[j];
         element.innerHTML = newCardData[j];
      }
   }
}