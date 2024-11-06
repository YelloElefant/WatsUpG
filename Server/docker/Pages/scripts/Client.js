// check each grid element called attrabutes and check if the last cell is empty 
var grids = document.getElementsByClassName("attrabutes");
let placeholder = document.createElement("div");
placeholder.classList.add("attrabute");

for (var i = 0; i < grids.length; i++) {
   var grid = grids[i];
   if (grid.children.length % 2 != 0) {
      var lastCell = grid.lastElementChild;
      grid.appendChild(placeholder);
   }
}

async function getCardData(id) {
   let data;
   if (window.location.host == "192.168.1.29:2525") {
      data = await fetch("http://192.168.1.29:2525/Api/GetClientDataById.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());
   }
   else {
      data = await fetch("https://watsupg.yelloelefant.com/Api/GetClientDataById.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());
   }

   data = JSON.parse(data);
   console.log(data);
   console.log(JSON.parse(data.ip));
   // console.log(JSON.parse(data));



}

getCardData('City');


// (grid) {
//    if (grid.children.length % 2 == 0) {
//       return true;
//    }
//    return false;
// }

