<?php
$redis = new Redis();
$redis->connect('redisStack', 6379);
$runner = fopen("./idStuff/runner", "r") or die("Unable to open file!");
$runnerNumber = fgets($runner);
fclose($runner);

if ($runnerNumber == 0) {
   # code...

   $idsFile = fopen("./idStuff/ids", "r") or die("Unable to open file!");
   $usedIdsFile = fopen("./idStuff/usedIds", "r") or die("Unable to open file!");
   $avalibleIdsFile = fopen("./idStuff/avalibleIds", "r") or die("Unable to open file!");

   //read all lines from the files
   $idsA = array();

   $usedidsA = array();
   $avalibleIdsA = array();
   while (!feof($idsFile)) {
      array_push($idsA, fgets($idsFile));
   }
   while (!feof($usedIdsFile)) {
      array_push($usedidsA, fgets($usedIdsFile));
   }
   while (!feof($avalibleIdsFile)) {
      array_push($avalibleIdsA, fgets($avalibleIdsFile));
   }
   print_r($idsA);

   for ($i = 0; $i < count($idsA); $i++) {
      $idsA[$i] = substr($idsA[$i], 0, -1);
      $avalibleIdsA[$i] = $idsA[$i];
   }
   //close all files
   fclose($idsFile);
   fclose($usedIdsFile);
   fclose($avalibleIdsFile);

   print_r($idsA);
   foreach ($idsA as $id) {
      $redis->sAdd('ids', $id);
   }
   if ($usedidsA[0] != null) {
      foreach ($usedidsA as $id) {
         $redis->sAdd('usedIds', $id);
      }
   }
   if ($avalibleIdsA[0] != null) {
      foreach ($avalibleIdsA as $id) {
         $redis->sAdd('avalibleIds', $id);
      }
   }
   $runner = fopen("./idStuff/runner", "w") or die("Unable to open file!");
   fwrite($runner, "1");
}
$hostName = $_POST['hostName'];
$token = $_POST['token'];
//echo $token;
$id = $_POST['id'];

if ($token == getenv('TOKEN')) {
   # code...

   $data = $_POST;
   unset($data['token']);
   $data = json_encode($data);






   //check if id is in the group data set
   if ($redis->sIsMember('usedIds', $id)) {
      echo "id=known";
      $redis->set($id, $data);
   } else {
      //echo "Client is unknown";
      //count how many members are in the set

      $newId = $redis->sRandMember('avalibleIds');
      $redis->sRem('avalibleIds', $newId);
      $redis->sAdd('usedIds', $newId);
      echo 'id=';
      echo strval($newId);
      //echo ('id=' & strval($newId));

   }
} else {
   echo "Token is not correct";
}
