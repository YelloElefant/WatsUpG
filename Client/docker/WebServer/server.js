const http = require('http');
const fs = require('fs');
const path = require('path');




const server = http.createServer((req, res) => {
   let filePath = req.url === '/' ? '/index.html' : req.url;
   let extname = path.extname(filePath);
   let contentType = 'text/html';

   console.log("file path: ", filePath);
   console.log("extemsion: ", extname);
   console.log("dir name: ", __dirname);

   switch (extname) {
      case '.js':
         contentType = 'text/javascript';
         break;
      case '.css':
         contentType = 'text/css';
         break;
      case '.json':
         contentType = 'application/json';
         break;
      case '.png':
         contentType = 'image/png';
         break;
      case '.jpg':
         contentType = 'image/jpg';
         break;
   }

   res.writeHead(200, { 'Content-Type': contentType });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
