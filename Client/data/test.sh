#!/bin/bash

classes=(
   "system" "bridge" "memory" "processor" "address"
   "storage" "disk" "tape" "bus" "network"
   "display" "input" "multimedia" "communication"
   "volume" "generic"
)

temp_dir=$(mktemp -d)
json_output='{'

for class in "${classes[@]}"; do
   (
      class_output=$(lshw -c "$class" -json 2>/dev/null)
      if [[ -n "$class_output" ]]; then
         echo "\"$class\": $class_output," >"$temp_dir/$class.json"
      fi
   ) &
done

wait

for class in "${classes[@]}"; do
   if [[ -f "$temp_dir/$class.json" ]]; then
      json_output+=$(cat "$temp_dir/$class.json")
   fi
done

# Remove the trailing comma and close the JSON object
json_output=${json_output%,}
json_output+='}'

# Pretty-print the JSON object using jq
echo {"\"lshw\"" : "$json_output"} | jq . -c

# Clean up temporary files
rm -r "$temp_dir"
