#!/bin/bash

# This script is used to query the endpoint of the server
#will test private ip first then internet as failover 

# Get the private ip of the server
#get serverPrivateIp environment variable
serverPrivateIp=$(export | grep serverPrivateIp | cut -d '=' -f2 | cut -d '"' -f2)

#get serverPublicHostName environment variable
serverDomainName=$(export | grep serverDomainName | cut -d '=' -f2 | cut -d '"' -f2)


response=$(curl -X POST -d 'token='123456789'' http://$serverPrivateIp:2525/EndPointQuery.php)

if [ $response = 'up' ]
then
  echo $serverPrivateIp > /data/serverPath
  exit 0
fi

response=$(curl -X POST -d 'token='123456789'' https://$serverDomainName:2525/EndPointQuery.php)

if [ $response = 'up' ]
then
  echo $serverDomainName > /data/serverPath
  exit 0
fi


#will call itself again with a count 5 times before exiting, thus setting the script to run every 5 seconds

# if [ $1 -eq 10 ]
# then
#   exit 0
# fi

# echo "Script called. Count: $1"

# sleep 5

# /endPointQuery.sh $(( $1 + 1 ))