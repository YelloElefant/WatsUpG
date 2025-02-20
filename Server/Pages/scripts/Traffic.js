console.log('Traffic.js loaded');

const ctx = document.getElementById('trafficCanvas');

// Initial Data Setup
const maxDataPoints = 24;  // Number of points visible at a time
let counter = 0;           // Keeps track of time or data index
let myChart





let made = false;
let chart;

let data
async function getTrafficData(adapterDirection) {
   let temp = await fetch('./Api/ClientTraffic.php?&id=' + window.location.search.split("=")[1]).then(response => response.text());
   return JSON.parse(temp).map((child) => {
      return {
         x: child.timestamp,
         y: child[window.currentAdapter][adapterDirection].bytespersecond / 125000,
      }
   });
}

async function createGraph(labels, data, color, adapterDirection) {
   myChart = new Chart(ctx, {
      type: "line",
      data: {
         labels: labels, // Initial X-axis labels
         datasets: [
            {
               label: window.currentAdapter + " " + adapterDirection,
               data: data, // Start with empty/null values
               borderColor: color,
               backgroundColor: color.replace(")", ",0.2)"),
               borderWidth: 2,
               fill: true,
               tension: 0.4, // Smooth curves instead of sharp lines
            },
         ],
      },
      options: {
         responsive: true,
         animation: false,
         scales: {
            x: {
               type: "category",
               ticks: {
                  autoSkip: false, // Prevent skipping labels
               },
            },
            y: {
               ticks: {
                  // Include a dollar sign in the ticks
                  callback: function (value, index, ticks) {
                     return value + " Mbps";
                  }
               },
               beginAtZero: true,
            },
         },
      },
   });
}



async function updateGraph(color, adapterDirection) {
   let traffic = await getTrafficData(adapterDirection);

   if (!made) {
      createGraph(traffic.map((child) => child.x), traffic.map((child) => child.y), color, adapterDirection);
      made = true;
   } else {
      // Add new data points
      myChart.data.labels.push(traffic[traffic.length - 1].x);
      myChart.data.datasets[0].data.push(traffic[traffic.length - 1].y);


      // myChart.update("active");
      // Remove old data points to keep the chart within maxDataPoints
      while (myChart.data.labels.length > maxDataPoints) {
         myChart.data.labels.shift();
         myChart.data.datasets[0].data.shift();
      }





      myChart.update("active");
   }


}

updateGraph("rgba(75, 192, 192)", "rx");
setInterval(() => updateGraph("rgba(75, 192, 192", "rx"), 5000);
