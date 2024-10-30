#!/bin/bash

networkName='None'
# get the ip of the router in curretn subenet
routerIp=$(ip route | grep default | cut -d' ' -f3)
# reverse dns lookup with dig command and check if it is not empty
if [ ! -z $(dig -x $routerIp +short) ]
then
  networkName=$(dig -x $routerIp +short | cut -d'.' -f1)
fi

echo $routerIp
echo $networkName