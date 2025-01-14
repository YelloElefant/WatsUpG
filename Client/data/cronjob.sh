#!/bin/bash

# Function to dynamically add new data types
construct_data() {
  local data=""

  json="{"
  for key in "${!clientData[@]}"; do
    value="${clientData[$key]}"
    # Check if the value is already JSON (avoid double quoting)
    if [[ "$key" == "ip" || "$key" == "lshw" ]]; then
      json+="\"$key\": $value,"
    else
      json+="\"$key\": \"$(echo "$value" | sed 's/"/\\"/g')\","
    fi
  done

  # Remove the trailing comma and close the JSON object
  json="${json%,}}"

  # Output the JSON
  echo "json=$json&token=123456789&id=${clientData["id"]}"
}

# echo $1
# if [[ $1 == *"0"* ]]; then
#   /endPointQuery.sh
# fi

# Get host name
declare -A clientData

# Get id from id file
clientData["hostName"]=$(hostname)
clientData["id"]=$(cat /data/id)
clientData["serverPath"]=$(cat /data/serverPath)
clientData["adapter"]=$(ip route | grep -m1 default | cut -d ' ' -f5)
clientData["logicalName"]=$(lshw -c network | grep ${clientData["adapter"]} -B 5 -A 5 | grep "logical name:" -m1 | awk '{$1=$1};1' | cut -d ' ' -f3)
clientData["adapterProtocol"]=$(lshw -class network | awk '/description/ {via_line=$0} /'${clientData["adapter"]}'/ {print via_line}' | awk '{$1=$1};1' | cut -d ' ' -f2)
clientData["networkName"]='None'
routerIp=$(ip route | grep default | cut -d' ' -f3)
if [ ! -z $(dig -x $routerIp +short) ]; then
  clientData["networkName"]=$(dig -x $routerIp +short | cut -d'.' -f1)
fi
# clientData["privateIpv4"]=$(ip addr show dev ${clientData["adapter"]} | grep 'inet' | xargs | cut -d' ' -f2 | cut -d'/' -f1)
# clientData["privateIpv6"]=$(ip addr show dev ${clientData["adapter"]} | grep 'inet6' | xargs | cut -d' ' -f2 | cut -d'/' -f1)

clientData["macAddress"]=$(ip -j addr show dev ${clientData["adapter"]} | jq -cr '.[0].address')

amountOfIpAdresses=$(ip -j addr show dev ${clientData["adapter"]} | jq '.[0].addr_info | length')
amountOfIpAdresses=${amountOfIpAdresses:-0}

clientData["ip"]=$(ip -j addr show dev ${clientData["adapter"]})

# get link ipv6 address
# clientData["linkIpv6"]=$(ip -6 addr show dev ${clientData["adapter"]} | grep 'link' | xargs | cut -d' ' -f2 | cut -d'/' -f1)

clientData["cpu"]=$(top -bn1 | grep load | awk '{printf "%.2f", $(NF-2)}' | sed -e 's/\ *$//g')
clientData["memory"]=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
clientData["upTime"]=$(uptime | awk '{print $3,$4}' | cut -d' ' -f1)
clientData["currentTime"]=$(date +%T)
clientData["os"]=$(cat /etc/os-release | grep 'PRETTY_NAME' | cut -d'=' -f2 | sed 's/"//g' | cut -d' ' -f1)
clientData["diskUsage"]=$(df -h | grep '/dev/sda1' | awk '{print $5}')
clientData["osVersion"]=$(cat /etc/os-release | grep 'PRETTY_NAME' | cut -d'=' -f2 | sed 's/"//g' | cut -d' ' -f2)
clientData["lshw"]=$(lshw -json)
# clientData["token"]=123456789
clientData["type"]="client"
clientData["status"]="up"
clientData["time"]=$(date +%T)

# Construct data string
data=$(construct_data)

# Send data to server
response=$(curl -X POST -d "$data" http://${clientData["serverPath"]}:2525/Api/PostClientData.php)

echo $data

echo $response
newId=$(echo $response | grep 'id' | cut -d'=' -f2)
echo $newId

if [ $newId != 'known' ]; then
  echo $newId >/data/id
fi
