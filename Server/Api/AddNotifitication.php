<?php
// this api takes the post parameter 'message' and adds it to the redis list called Notifications
header('Content-Type: application/json');
$redis = new Redis();
$redis->connect('redisStack', 6379);

$message = $_POST['message'];

$redis->rPush('Notifications', $message);
echo json_encode(['message' => 'Notification added']);