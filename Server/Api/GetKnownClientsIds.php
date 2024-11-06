<?php
// this api returns the ids of all the clients in the redis database
header('Content-Type: application/json');
$redis = new Redis();
$redis->connect('redisStack', 6379);

$ids = $redis->sMembers('usedIds');
echo json_encode($ids);
?>