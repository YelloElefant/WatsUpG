<?php
// this api gets all the clients in the redis database based a data value attached to each client
header('Content-Type: application/json');
$redis = new Redis();
$redis->connect('redisStack', 6379);

$key = $_GET['key'];
$value = $_GET['value'];

$ids = $redis->sMembers('usedIds');

$clients = array();
foreach ($ids as $id) {
   $data = json_decode($redis->get($id), true);
   if (strtolower($data[$key]) != $value) {
      continue;
   }
   array_push($clients, $data);
}

echo json_encode($clients);