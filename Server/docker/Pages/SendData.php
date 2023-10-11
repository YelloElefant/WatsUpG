<?php
$id = $_GET['id'];

$redis = new Redis();
$redis->connect('redisStack', 6379);

echo $redis->get($id);
