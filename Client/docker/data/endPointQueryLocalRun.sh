#!/bin/bash

# This script is used to query the endpoint of the server
#will test private ip first then internet as failover 

# Get the private ip of the server
#get serverPrivateIp environment variable
serverPrivateIp='192.168.1.34'

#get serverPublicHostName environment variable
serverDomainName='watsupg.yelloelefant.com'

echo $serverPrivateIp
echo $serverDomainName


response=$(curl -X POST -d 'token='123456789'' http://$serverPrivateIp:2525/EndPointQuery.php)

echo $response

if [ $response = 'up' ]
then
  echo $serverPrivateIp > ../clientData/serverPath
  exit 0
fi

# $response = $(curl -X POST -d 'token='123456789'' https://$serverDomainName:2525/EndPointQuery.php)

# if [ $response == 'up' ]
# then
#   echo $serverPrivateIp > ./data/serverPath
#   exit 0
# fi
