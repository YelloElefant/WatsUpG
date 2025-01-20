<?php
header("Content-Type: application/json");
// this api is used to get the client data by id returns as json
$id = $_GET['id'];

$redis = new Redis();
$redis->connect('redisStack', 6379);

// check if 'want' array exist in get request
if (array_key_exists('want', $_GET)) {
   $want = $_GET['want'];
   $data = json_decode($redis->get($id), true);
   // split $want at ,
   $want = explode(',', $want);
   $filteredData = [];
   foreach ($want as $key) {
      $filteredData[$key] = $data[$key];
   }

   echo json_encode($filteredData);
   return;
}


echo $redis->get($id);

?>