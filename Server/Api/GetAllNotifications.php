<?php
// this api gets all elements from the redis list called Notifications
$redis = new Redis();
$redis->connect('redisStack', 6379);

$notifications = $redis->lRange('Notifications', 0, -1);
echo json_encode($notifications);
   
?>
