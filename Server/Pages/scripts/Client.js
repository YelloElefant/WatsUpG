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
   data = await fetch("./Api/GetClientDataById.php?id=" + id, { mode: 'no-cors' }).then(response => response.text());

   data = JSON.parse(data);
   console.log(data);



}

getCardData(window.location.search.split("=")[1]);


// (grid) {
//    if (grid.children.length % 2 == 0) {
//       return true;
//    }
//    return false;
// }

