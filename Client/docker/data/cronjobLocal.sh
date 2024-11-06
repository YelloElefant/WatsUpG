#!/bin/bash

# Function to dynamically add new data types
construct_data() {
  local data=""
  
  # Add additional data types here
  for key in "${!clientData[@]}"; do
    data+="&$key=${clientData[$key]}"
  done

# remove the first character
  data=${data:1}
  echo "$data"
}

# echo $1
# if [[ $1 == *"0"* ]]; then
#   /endPointQuery.sh
# fi

# Get host name
hostName=$(hostname)
declare -A clientData

# Get id from id file
clientData["id"]='test'
clientData["serverPath"]=192.168.1.29
clientData["defaultAdapter"]=$(ip route | grep -m1 default | cut -d ' ' -f5)
clientData["logicalName"]=$(lshw -c network | grep ${clientData["defaultAdapter"]} -B 5 -A 5 | grep "logical name:" -m1 | awk '{$1=$1};1' | cut -d ' ' -f3)
clientData["defaultAdapterProtocol"]=$(lshw -class network | awk '/description/ {via_line=$0} /'${clientData["defaultAdapter"]}'/ {print via_line}' | awk '{$1=$1};1' | cut -d ' ' -f2)
clientData["networkName"]='None'
routerIp=$(ip route | grep default | cut -d' ' -f3)
if [ ! -z $(dig -x $routerIp +short) ]; then
  clientData["networkName"]=$(dig -x $routerIp +short | cut -d'.' -f1)
fi
clientData["privateIpv4"]=$(ip addr show dev ${clientData["defaultAdapter"]} | grep 'inet' | xargs | cut -d' ' -f2 | cut -d'/' -f1)
clientData["privateIpv6"]=$(ip addr show dev ${clientData["defaultAdapter"]} | grep 'inet6' | xargs | cut -d' ' -f2 | cut -d'/' -f1)
clientData["cpu"]=$(top -bn1 | grep load | awk '{printf "%.2f", $(NF-2)}' | sed -e 's/\ *$//g')
clientData["memory"]=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
clientData["upTime"]=$(uptime | awk '{print $3,$4}' | cut -d' ' -f1)
clientData["currentTime"]=$(date +%T)
clientData["os"]=$(cat /etc/os-release | grep 'PRETTY_NAME' | cut -d'=' -f2 | sed 's/"//g' | cut -d' ' -f1)
clientData["diskUsage"]=$(df -h | grep '/dev/sda1' | awk '{print $5}')
clientData["osVersion"]=$(cat /etc/os-release | grep 'PRETTY_NAME' | cut -d'=' -f2 | sed 's/"//g' | cut -d' ' -f2)

# Construct data string
data=$(construct_data)

# Send data to server
response=$(curl -X POST -d "$data" http://${clientData["serverPath"]}:2525/Api/PostClientData.php)

echo $data

echo $response 
newId=$(echo $response | grep 'id' | cut -d'=' -f2)
echo $newId

if [ $newId != 'known' ]; then
  echo $newId > /data/id
fi

# if [ $1 -eq 59 ]; then
#   exit 0
# fi

# echo "Script called. Count: $1"

# sleep 1

# /cronjob.sh $(( $1 + 1 ))