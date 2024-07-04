<?php

$token = $_POST['token'];


if ($token == getenv('TOKEN')) {
   echo "up";
} else {
   echo "down";
}
