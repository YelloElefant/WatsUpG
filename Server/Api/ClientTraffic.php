<?php
// this api is used to get and set the network traffic of a client
$redis = new Redis();
$redis->connect('redisStack', 6379);

// if GET then get the traffic
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   $id = $_GET['id'];
   $key = $id . "-traffic";
   $traffic = $redis->lRange($key, 0, -1);

   $decoded_data = array_map('json_decode', $traffic);
   $json = json_encode($decoded_data);

   header('Content-Type: application/json');
   
   echo $json;   
   
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
   // check if id is in the post request
   if (!array_key_exists('id', $_POST)) {
      echo "id not found in post request";
      return;
   }

   // if POST then set the traffic
   $id = $_POST['id'];
   $key = $id . "-traffic";

   // get size of the traffic
   $size = $redis->lLen($key);

   // if the size =  12 then remove the first element
   if ($size == 12) {
      $redis->lPop($key);
   }

   $traffic = $_POST['traffic'];
   $redis->rPush($key, $traffic);
   echo "set traffic for " . $id;
   
   

}