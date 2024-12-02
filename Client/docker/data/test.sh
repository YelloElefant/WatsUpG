#!/bin/bash

# Declare an associative array
declare -A clientData
clientData=(
  ["type"]="client"
  ["macAddress"]="d8:50:e6:04:6f:8d"
  ["networkName"]="BigPPRouter"
  ["id"]="City"
)

# Add a JSON string (e.g., from `ip -j addr`) to the array
ip_output=$(ip -j addr) # Simulating a command output
clientData["ip"]="$ip_output"

# Construct the JSON dynamically
json="{"
for key in "${!clientData[@]}"; do
  value="${clientData[$key]}"
  # Check if the value is already JSON (avoid double quoting)
  if [[ "$key" == "ip" ]]; then
    json+="\"$key\": $value,"
  else
    json+="\"$key\": \"$(echo "$value" | sed 's/"/\\"/g')\","
  fi
done

# Remove the trailing comma and close the JSON object
json="${json%,}}"

# Output the JSON
echo "$json"