<?php
header("Content-Type: application/json");
// this api is used to get the client data by id returns as json
$id = $_GET['id'];

$redis = new Redis();
$redis->connect('redisStack', 6379);

echo $redis->get($id);

?>