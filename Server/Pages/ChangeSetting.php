<?php
$SettingsToChange = $_POST;
$Settings = file_get_contents("./Config/settings.conf");
$Settings = (array) json_decode($Settings);

if ($Settings != NULL) {

   foreach ($SettingsToChange as $key => $value) {
      if (array_key_exists($key, $Settings)) {
         $Settings[$key] = $value;
      }
   }
}



$Settings = json_encode($Settings);
file_put_contents("./Config/settings.conf", $Settings);
echo "fuck u jamie suck my cock :)";
