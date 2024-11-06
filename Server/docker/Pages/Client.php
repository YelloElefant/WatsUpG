<?php
$redis = new Redis();
$redis->connect('redisStack', 6379);
$client = $_GET['id'];
$clientData = $redis->get($client);
$clientData = json_decode($clientData, true);


// function that returns the client data from an array of data if it doesnt exist it will return "unknown"
function getClientData($key)
{
   global $clientData;
   if (array_key_exists($key, $clientData)) {
      return $clientData[$key];
   } else {
      return "Unknown";
   }
}


?>

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="./styles/index.css">
   <link rel="stylesheet" href="./styles/client.css">
   <title>Clients</title>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">

</head>

<body>
   <div id="contentWrapper">

      <div id="contentLeft">
         <div id="sidebarWrapper">
            <div id="sidebar">
               <div id="sidebarHeader">
                  <h1 id="sidebarTitle">WatsUpG</h1>
               </div>
               <div id="sidebarContent">
                  <a href="index.php" class="sidebarLink" id="dashboardLink">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true" role="img">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                     </svg>
                     <span class="linkSpan">Dashboard</span>
                  </a>
                  <a href="Clients.php" class="sidebarLink" id="clientsLink">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true" role="img">
                        <line x1="22" y1="12" x2="2" y2="12"></line>
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z">
                        </path>
                        <line x1="6" y1="16" x2="6.01" y2="16"></line>
                        <line x1="10" y1="16" x2="10.01" y2="16"></line>
                     </svg>
                     <span class="linkSpan">Clients</span>
                  </a>
                  <a href="#" class="sidebarLink" id="clientsLink">
                     <svg fill="#e6edf3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" class="icon">
                        <g id="group">
                           <path d="M24,15.9c0-2.8-1.5-5-3.7-6.1C21.3,8.8,22,7.5,22,6c0-2.8-2.2-5-5-5c-2.1,0-3.8,1.2-4.6,3c0,0,0,0,0,0c-0.1,0-0.3,0-0.4,0
		   c-0.1,0-0.3,0-0.4,0c0,0,0,0,0,0C10.8,2.2,9.1,1,7,1C4.2,1,2,3.2,2,6c0,1.5,0.7,2.8,1.7,3.8C1.5,10.9,0,13.2,0,15.9V20h5v3h14v-3h5
		   V15.9z M17,3c1.7,0,3,1.3,3,3c0,1.6-1.3,3-3,3c0-1.9-1.1-3.5-2.7-4.4c0,0,0,0,0,0C14.8,3.6,15.8,3,17,3z M13.4,4.2
		   C13.4,4.2,13.4,4.2,13.4,4.2C13.4,4.2,13.4,4.2,13.4,4.2z M15,9c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S15,7.3,15,9z M10.6,4.2
		   C10.6,4.2,10.6,4.2,10.6,4.2C10.6,4.2,10.6,4.2,10.6,4.2z M7,3c1.2,0,2.2,0.6,2.7,1.6C8.1,5.5,7,7.1,7,9C5.3,9,4,7.7,4,6S5.3,3,7,3
		   z M5.1,18H2v-2.1C2,13.1,4.1,11,7,11v0c0,0,0,0,0,0c0.1,0,0.2,0,0.3,0c0,0,0,0,0,0c0.3,0.7,0.8,1.3,1.3,1.8
		   C6.7,13.8,5.4,15.7,5.1,18z M17,21H7v-2.1c0-2.8,2.2-4.9,5-4.9c2.9,0,5,2.1,5,4.9V21z M22,18h-3.1c-0.3-2.3-1.7-4.2-3.7-5.2
		   c0.6-0.5,1-1.1,1.3-1.8c0.1,0,0.2,0,0.4,0v0c2.9,0,5,2.1,5,4.9V18z" />
                        </g>
                     </svg>
                     <span class="linkSpan">Groups</span>
                  </a>
                  <a href="#" class="sidebarLink" id="notificationsLink">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true" role="img">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                     </svg>
                     <span class="linkSpan">Notifications</span>
                  </a>
                  <a href="#" class="sidebarLink" id="settingsLink">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true" role="img">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z">
                        </path>
                        <circle cx="12" cy="12" r="3"></circle>
                     </svg>
                     <span class="linkSpan">Settings</span>
                  </a>
               </div>
            </div>
         </div>
      </div>
      <div id="contentRight">
         <?php 
         
         echo "<h1>".$clientData['id']."</h1>";
         ?>
         <div id="infoWrapper">  
            <div class="infoBlock">
               <h2>Client Information</h2>
               <div class="attrabutes">
                  <div class="attrabute">
                     <h3>Client ID</h3>
                     <p><?php echo getClientData('id'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>Client Name</h3>
                     <p><?php echo getClientData('name'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>Client Type</h3>
                     <p><?php echo getClientData('type'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>Client OS</h3>
                     <p><?php echo getClientData('os'); ?></p>
                  </div>
               </div>

            </div>

            <div class="infoBlock">
               <h2>Client Networking</h2>
               <div class="attrabutes">
                  <div class="attrabute">
                     <h3>Hostname</h3>
                     <p><?php echo getClientData('hostName'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>MAC Address</h3>
                     <p><?php echo getClientData('macAddress'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>IPv4</h3>
                     <p>Private: <?php echo getClientData('privateIpv4'); ?></p>
                     <p>Public: <?php echo getClientData('publicIpv4'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>IPv6</h3>
                     <p>Private: <?php echo getClientData('privateIpv6'); ?></p>
                     <p>Public: <?php echo getClientData('publicIpv6'); ?></p>
                  </div>
                  <div class="attrabute">
                     <h3>Current network adapter</h3>
                     <p>Name: <?php echo getClientData('adapter'); ?></p>
                     <p>Protocal: <?php echo getClientData('adapterProtocol'); ?></p>
                  </div>
               </div>
            </div>
         </div>

      </div>


   </div>
   <script src="./scripts/index.js"></script>
   <script src="./scripts/Client.js"></script>
</body>


</html>