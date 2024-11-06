#!/bin/bash
amountOfIpAdresses=$(ip -j addr show dev enp4s0 | jq '.[0].addr_info | length')
amountOfIpAdresses=${amountOfIpAdresses:-0}

# Initialize an empty JSON object
ipObject="{}"

for (( i=0; i<$amountOfIpAdresses; i++ )); do
  # Extract each object in addr_info
  ipData=$(ip -j addr show dev enp4s0 | jq -c ".[0].addr_info[$i]")

  # Add the object to the JSON with the index as the key
  ipObject=$(echo "$ipObject" | jq --arg index "$i" --argjson data "$ipData" '. + {($index): $data}')
done

# Wrap the result in an outer "ip" key

#  remove the first and last character of the string

ipObject=$(echo "$ipObject" | jq -c '.')
echo "$ipObject" 