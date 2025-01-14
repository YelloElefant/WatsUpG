#!/bin/bash

# List of lshw classes
classes=(
   "system" "bridge" "memory" "processor" "address"
   "storage" "disk" "tape" "bus" "network"
   "display" "input" "printer" "multimedia" "communication"
   "power" "volume" "generic"
)

# Initialize an empty JSON object
json_output='{'

# Loop through each class and run lshw
for class in "${classes[@]}"; do
   # Run lshw for the class and capture the JSON output
   class_output=$(lshw -c "$class" -json 2>/dev/null)

   # If output is not empty, append it to the JSON object
   if [[ -n "$class_output" ]]; then
      json_output+="\"$class\": $class_output,"
   fi
done

# Remove the trailing comma and close the JSON object
json_output=${json_output%,}
json_output+='} '

# Pretty-print the JSON object using jq
echo "$json_output" | jq . -c
