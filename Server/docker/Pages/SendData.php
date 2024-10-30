<?php
// <!-- this endpoint returns the data of a given ID -->
$id = $_GET['id'];

$redis = new Redis();
$redis->connect('redisStack', 6379);

echo $redis->get($id);
