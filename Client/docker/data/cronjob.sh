#!/bin/bash

#get host name
hostName=$(hostname)
#echo $hostName
#get network name
networkName='Trotter'
#echo 'Trotter'

# get private ipv4 address
privateIpv4=$(ip addr show dev eth0 | grep 'inet' | xargs | cut -d' ' -f2 | cut -d'/' -f1)
#echo $privateIpv4
# get private ipv6 address
privateIpv6=$(ip addr show dev eth0 | grep 'inet6' | xargs | cut -d' ' -f2 | cut -d'/' -f1)
#echo $privateIpv6
# get cpu usage as a percentage with 2 decimal places
cpu=$(top -bn1 | grep load | awk '{printf "%.2f", $(NF-2)}' | sed -e 's/\ *$//g')
#echo $cpu
# get memory usage as a percentage
memory=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
#echo $memory
# get up time
upTime=$(uptime | awk '{print $3,$4}' | cut -d' ' -f1)
#echo $upTime
# get disk usage as a percentage
#df -h | grep '/dev/sda1' | awk '{print $5}'
currentTime=$(date | cut -d' ' -f4)


#curl -X POST -d '{id="'"$hostName"'"&hostName="'"$hostName"'"&networkName="Trotter"&privateIpv4="'"$privateIpv4"'"&privateIpv6="'"$privateIpv6"'"&cpu="'"$cpu"'memory="'"$memory"'uptime="'"$upTime"'"&token="'"123456789"'"}' http://192.168.1.34:2525/ReciveData.php
echo 'time='$currentTime'&token=123456789&id='$hostName'&hostName='$hostName'&networkName=testing&privateIpv4='$privateIpv4'&privateIpv6='$privateIpv6'&cpu='$cpu'&memory='$memory'&upTime='$upTime'' http://192.168.1.34:2525/ReciveData.php > hello.txt
echo updated
curl -X POST \
-d 'time='$currentTime'&token=123456789&id='$hostName'&hostName='$hostName'&networkName=testing&privateIpv4='$privateIpv4'&privateIpv6='$privateIpv6'&cpu='$cpu'&memory='$memory'&upTime='$upTime'' http://192.168.1.34:2525/ReciveData.php
 