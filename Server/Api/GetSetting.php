<?php
// this api returns the value of a setting in the redis database
header('Content-Type: application/json');
$redis = new Redis();
$redis->connect('redisStack', 6379);

$setting = $_GET['setting'];

// get the value of the setting from the redis database
// settings are stored in a set called 'settings'
// this set is a key value pair where the key is the setting name and the value is the setting value
$settings = $redis->get('settings');
$settings = json_decode($settings, true);
if ($settings == null) {
   echo "fatal: settings not found";
   return;
}
// echo  json_encode($settings);
if (array_key_exists($setting, $settings)) {
   $value = $settings[$setting];
} else {
   $value = null;
}
if ($value == null) {
   $value = "fatal: setting not found";
}
echo json_encode($value);
?>