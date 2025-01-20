async function getLshw(id) {
   return await fetch("./Api/GetClientDataById.php?want=lshw&id=" + id, { mode: 'no-cors' }).then(response => response.text());
}

let diagram = document.getElementById("diagramList");
let networkSvg = document.getElementById("networkSvg");
let usbSvg = document.getElementById("usbSvg");

getLshw(window.location.search.split("=")[1]).then(data => {
   data = JSON.parse(data).lshw
   // data = Object.fromEntries(
   //    Object.entries(data).filter(([key, value]) => Array.isArray(value) && value.length > 0)
   // );
   data = data.lshw;
   console.log(data);
   let network = data.network.filter((child) => !child.description.includes("controller"))
   console.log("Network interfaces:", network);
   makeSvg(network, "blue", networkSvg);

   let pluggedInUsb = data.input.filter((child) => child.id.includes("usb"));
   console.log("USB Devices: ", pluggedInUsb);
   pluggedInUsb.forEach((controller) => {
      delete controller.id;
      delete controller.class;
      delete controller.claimed;
   });

   // Filter USB controllers and hosts
   let usbControllers = data.bus.filter((child) => child.class === "bus" && (child.id.includes("usb") || (child.description && child.description.toLowerCase().includes("usb controller"))));
   // remove id, class, and claimed from the usb controllers

   console.log("USB Controllers and Hosts:", usbControllers);
   // for each usb controller add the devices that are plugged into it
   usbControllers.forEach((controller) => {
      controller.children = pluggedInUsb.filter((device) => device.businfo.split(':')[0] === controller.businfo.split(':')[0]);
   });
   makeSvg(usbControllers, "green", usbSvg);





});

function createDetailsElement(key, value) {
   let dropDown = document.createElement("details");
   let summary = document.createElement("summary");
   if (Object.keys(value).includes("product")) {
      summary.innerHTML = value.product;
   } else {
      summary.innerHTML = key;
   }
   dropDown.appendChild(summary);

   if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([childKey, childValue]) => {
         childKey = childKey.charAt(0).toUpperCase() + childKey.slice(1);
         if (typeof childValue === "object" && childValue !== null) {
            dropDown.appendChild(createDetailsElement(childKey, childValue));
         } else {
            let p = document.createElement("p");
            if (typeof childValue === "string" && childValue.includes(":")) {
               childValue = "\"" + childValue + "\"";
            }
            p.innerHTML = "- " + childKey + ": " + childValue;
            dropDown.appendChild(p);
         }
      });
   }

   return dropDown;
}

function makeSvg(listToMake, color, svgToCopy) {
   let div = document.createElement("div");
   div.className = "diagramWrapper attrabute";
   let dataDisplay = document.createElement("div");
   dataDisplay.className = "attrabute";


   listToMake.forEach((element) => {
      let newSvg = svgToCopy.cloneNode(true);
      newSvg.removeAttribute("id");
      newSvg.setAttribute("class", "diagram");
      newSvg.setAttribute("stroke", color);
      newSvg.addEventListener("click", () => {
         console.log(element);
         let otherSvgs = Array.from(div.children).filter((child) => child.tagName === "svg" && child !== newSvg);
         otherSvgs.forEach((svg) => {
            svg.style.backgroundColor = "";
         });

         newSvg.style.backgroundColor = "rgba(128, 128, 128, 0.123)";

         dataDisplay.innerHTML = "";
         // remove id, class, claimed from element 
         delete element.id;
         delete element.class;
         delete element.claimed;

         // make p for each element in the object and if the value is an object make a p for each element in that object as a drop down 
         Object.entries(element).forEach(([key, value]) => {
            key = key.charAt(0).toUpperCase() + key.slice(1);
            let p = document.createElement("p");
            if (typeof value === "object" && value !== null) {
               if (Object.keys(value).length === 0) {
                  return;
               }
               p.appendChild(createDetailsElement(key, value));
            } else {
               if (typeof value === "string" && value.includes(":")) {
                  value = "\"" + value + "\"";
               }
               p.innerHTML = key + ": " + value;
            }
            dataDisplay.appendChild(p);
         });
      });
      newSvg.addEventListener("mouseover", () => {
         newSvg.setAttribute("stroke", "red");
      });
      newSvg.addEventListener("mouseout", () => {
         newSvg.setAttribute("stroke", color);
      });
      div.appendChild(newSvg);
   });

   diagram.appendChild(div);
   diagram.appendChild(dataDisplay);
}