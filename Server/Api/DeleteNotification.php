<?php
// this api will delete a notification from the redis list called Notifications from the head of the list (the oldest notification) and can use the get 
// parameter 'count' to delete multiple notifications

header('Content-Type: application/json');
$redis = new Redis();
$redis->connect('redisStack', 6379);

$count = $_GET['count'] ?? 1;

for ($i = 0; $i < $count; $i++) {
    $redis->lPop('Notifications');
}