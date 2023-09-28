<?php
echo "ReciveData.php";
echo "<br>";
echo "Data: ";
// $file = fopen("data.txt", "w") or die("Unable to open file!");
// fwrite($file, $data);
// fclose($file);
$data = json_encode($_POST);

echo $data;


?>