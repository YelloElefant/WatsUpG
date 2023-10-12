<?php
//returns alll members of a redis set called knownClients
$redis = new Redis();
$redis->connect('redisStack', 6379);

$knownClients = $redis->sMembers('knownClients');
echo json_encode($knownClients);
