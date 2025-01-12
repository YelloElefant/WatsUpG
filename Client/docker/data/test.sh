#!/bin/bash
json=$(cat ../clientData/settings.json)

# path first argument
path=$(echo $1 | sed 's/\([^.]*\)\./"\1",/g; s/\([^,]*\)$/\1/' | awk '{print "[" $0 "]"}')
echo path: $path

id=$(echo "$json" | jq --arg nest "$path" '. | getpath($nest)')
echo $id

#echo "$json" | jq --arg id "$id" '.id = $id' > ../clientData/settings.json