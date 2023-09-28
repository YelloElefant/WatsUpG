<?php
echo "ReciveData.php";
echo "<br>";
echo "Data: ";
// $file = fopen("data.txt", "w") or die("Unable to open file!");
// fwrite($file, $data);
// fclose($file);
$data = json_encode($_POST);

$redis = new Redis();
$redis->connect('redis', 6379);
$redis->auth('redis');
if ($redis->ping()) {
   echo "PONGn";
}

echo $data;

?>