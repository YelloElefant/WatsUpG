<?php
session_start();
$Code;
if (array_key_exists('code', $_SESSION) == false) {
   $Code = 100;
} else {
   $Code = $_SESSION['code'];
   unset($_SESSION['code']);
   session_destroy();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="styles/index.css">
   <title>Error</title>
</head>

<body>
   <div id="errorCode">
      <?php
      echo $Code;
      ?>
   </div>
</body>

</html>