<?php
// this api is used to delete a client from the redis database
$redis = new Redis();
$redis->connect('redisStack', 6379);

$id = $_GET['id'];

$redis->del($id);


$redis->sRem('usedIds', $id);
$redis->sAdd('avalibleIds', $id);
