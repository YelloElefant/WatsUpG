<?php




// $file = fopen("data.txt", "w") or die("Unable to open file!");
// fwrite($file, $data);
// fclose($file);
$hostName = $_POST['hostName'];
$token = $_POST['token'];
//echo $token;
$id = $_POST['id'];

if ($token == getenv('TOKEN')) {
   # code...

   $data = $_POST;
   unset($data['token']);
   $data = json_encode($data);


   $redis = new Redis();


   $redis->connect('redisStack', 6379);



   //check if id is in the group data set
   if ($redis->sIsMember('knownClients', $id)) {
      echo "id=known";
      $redis->set($id, $data);
   } else {
      //echo "Client is unknown";
      //count how many members are in the set
      $count = $redis->sCard('knownClients');

      $newId = $count + 1;
      echo 'id=';
      echo strval($newId);
      //echo ('id=' & strval($newId));

      $redis->sAdd('knownClients', $newId);
   }
} else {
   echo "Token is not correct";
}
