<?php
//returns alll members of a redis set called knownClients
$redis = new Redis();
$redis->connect('redisStack', 6379);

$knownClients = $redis->sMembers('usedIds');
//$knownClients = array_merge($knownClients, $redis->sMembers('Test'));
echo json_encode($knownClients);
