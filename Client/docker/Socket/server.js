const net = require("net");

const clients = {}; // Object to store connected clients

// Function to handle incoming data from clients
function handleClientData(socket, clientId, data) {
   const message = data.toString().trim();
   const splitMessage = message.split(" ");
   const command = splitMessage[0];
   const args = splitMessage[1];
   console.log(`command: ${command}`);
   console.log(`args: ${args}`);

   console.log(`[MESSAGE FROM ${clientId}]: ${message}`);

   if (command === "name") {
      // write to name.txt file
      const fs = require("fs");
      settings = { name: args };
      //read file
      fs.readFile("../clientData/settings.json", "utf8", (err, data) => {
         if (err) {
            console.error(`[ERROR] ${clientId}: ${err.message}`);
         } else {
            settings = JSON.parse(data);
         }
      });

      settings.name = args;

      fs.writeFile("../clientData/settings.json", JSON.stringify(settings), (err) => {
         if (err) {
            console.error(`[ERROR] ${clientId}: ${err.message}`);
         } else {
            console.log(`[FILE WRITTEN] ${clientId}: settings.json`);
         }
      })

   }
   // Example: Echo the message back to the client
   socket.write(`Acknowledged: ${message}`);
}

// Create a TCP server
const server = net.createServer((socket) => {
   const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
   console.log(`[NEW CONNECTION] ${clientId}`);

   // Add client to the client list
   clients[clientId] = socket;

   // Handle incoming data
   socket.on("data", (data) => {
      handleClientData(socket, clientId, data);
   });

   // Handle client disconnection
   socket.on("end", () => {
      console.log(`[DISCONNECTED] ${clientId}`);
      delete clients[clientId];
   });

   // Handle errors
   socket.on("error", (err) => {
      console.error(`[ERROR] ${clientId}: ${err.message}`);
   });
});

// Start the server
const PORT = 9999;
server.listen(PORT, () => {
   console.log(`[SERVER] Listening on port ${PORT}...`);
});

// Handle server errors
server.on("error", (err) => {
   console.error(`[SERVER ERROR]: ${err.message}`);
});