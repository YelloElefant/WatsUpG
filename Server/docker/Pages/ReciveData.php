<?php



echo "ReciveData.php";
echo "<br>";
echo "Data: ";
// $file = fopen("data.txt", "w") or die("Unable to open file!");
// fwrite($file, $data);
// fclose($file);
$hostName = $_POST['hostName'];
$token = $_POST['token'];

if ($token == getenv('TOKEN')) {
   # code...

   $data = $_POST;
   unset($data['token']);
   $data = json_encode($data);

   echo $data;

   $redis = new Redis();


   $redis->connect('redisStack', 6379);
   if ($redis->ping()) {
      echo "PONGn";
   }

   $redis->set($hostName, $data);
} else {
   echo "Token is not correct";
}
