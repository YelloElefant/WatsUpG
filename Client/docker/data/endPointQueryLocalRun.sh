#!/bin/bash

# This script is used to query the endpoint of the server
#will test private ip first then internet as failover 

# Get the private ip of the server
#get serverPrivateIp environment variable
serverPrivateIp=$(export | grep serverPrivateIp | cut -d '=' -f2 | cut -d '"' -f2)

#get serverPublicHostName environment variable
serverDomainName=$(export | grep serverDomainName | cut -d '=' -f2 | cut -d '"' -f2)


response=$(curl -f -X POST -d 'token='123456789'' http://192.168.1.35:2525/EndPointQuery.php)

if [ -z $response ]; then 
  echo "var is unset"; 
  response2=$(curl -f -X POST -d 'token='123456789'' https://watsupg.yelloelefant.com/EndPointQuery.php)
  echo $response2
  if [ $response2 = 'up' ]
  then
    echo watsupg.yelloelefant.com > ./serverPath
    exit 0
  fi
else 

  if [ $response = 'up' ]
  then
    echo $serverPrivateIp > ./serverPath
    exit 0
  fi


fi



#will call itself again with a count 5 times before exiting, thus setting the script to run every 5 seconds

if [ $1 -eq 10 ]
then
  exit 0
fi

echo "Script called. Count: $1"

sleep 5

/endPointQuery.sh $(( $1 + 1 ))

