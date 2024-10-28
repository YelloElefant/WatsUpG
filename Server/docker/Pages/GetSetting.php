<?php
function GetSetting($settingToGet)
{
   $Settings = file_get_contents("./Config/settings.conf");
   $Settings = (array) json_decode($Settings);
   print_r($Settings["rules"]);
   echo $Settings["rules"]->write;
   exit;
}
session_start();
$_SESSION['code'] = 404;
header('Location: error.php');
