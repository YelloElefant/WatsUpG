<?php
// check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $host = '192.168.1.29';
   $port = 9999;

   // Create a socket connection
   $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
   if ($socket === false) {
      die("Error creating socket: " . socket_strerror(socket_last_error()));
   }

   $result = socket_connect($socket, $host, $port);
   if ($result === false) {
      die("Error connecting to server: " . socket_strerror(socket_last_error($socket)));
   }

   // Send a command to the TCP server
   $message = $_POST['command'] . " " . $_POST['param'];
   socket_write($socket, $message, strlen($message));

   // Optionally read a response
   $response = socket_read($socket, 1024);
   echo "Response from server: $response\n";

   // Close the socket
   socket_close($socket);
} else {
   echo "Invalid request method";
}