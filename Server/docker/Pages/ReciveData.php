<?php
echo "ReciveData.php";
echo "<br>";
echo "Data: ";
// $file = fopen("data.txt", "w") or die("Unable to open file!");
// fwrite($file, $data);
// fclose($file);
$data = $_POST['data'];
$hostName = $_POST['hostName'];

echo $data;

$redis = new Redis();

$redis->connect('redis', 6379);
if ($redis->ping()) {
   echo "PONGn";
}


$redis->zAdd($hostName, $data);
