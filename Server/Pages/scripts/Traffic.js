console.log('Traffic.js loaded');

const ctx = document.getElementById('trafficCanvas');

// Initial Data Setup
const maxDataPoints = 10;  // Number of points visible at a time
let counter = 0;           // Keeps track of time or data index
let myChart
// Create the Chart





let made = false;
let chart;

let data
async function getTrafficData() {
   let temp = await fetch('./Api/ClientTraffic.php?&id=' + window.location.search.split("=")[1]).then(response => response.text());
   return JSON.parse(temp).map((child) => {
      return {
         x: child.timestamp,
         y: child.enp4s0.rx.bytespersecond / 125000,
      }
   });
}

function createGraph(labels, data) {
   myChart = new Chart(ctx, {
      type: "line",
      data: {
         labels: labels, // Initial X-axis labels
         datasets: [
            {
               label: "Live Data",
               data: data, // Start with empty/null values
               borderColor: "rgba(75, 192, 192, 1)",
               borderWidth: 2,
               fill: true,
               tension: 0.4, // Smooth curves instead of sharp lines
            },
         ],
      },
      options: {
         responsive: true,
         animation: {
            duration: 1000, // Smooth animation duration (1 second)
            easing: "linear", // Linear movement effect
         },
      },
   });
}

async function updateGraph() {
   let traffic = await getTrafficData();

   if (!made) {
      createGraph(traffic.map((child) => child.x), traffic.map((child) => child.y));
      made = true;
   } else {
      // Add new data points
      myChart.data.labels.push(traffic[traffic.length - 1].x);
      myChart.data.datasets[0].data.push(traffic[traffic.length - 1].y);

      // Remove old data points to keep the chart within maxDataPoints
      while (myChart.data.labels.length > maxDataPoints) {
         myChart.data.labels.shift();
         myChart.data.datasets[0].data.shift();
      }

      myChart.update("none");
   }


}
updateGraph();
setInterval(updateGraph, 5000);