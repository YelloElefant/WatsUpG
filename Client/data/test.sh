#!/bin/bash
first=$(df -h / | tr -s ' ')
second=","
third=${first//" "/$second}

headers=$(echo $third | cut -d' ' -f1)
values=$(echo $third | cut -d' ' -f2)

# Split headers and values into arrays
IFS=',' read -r -a header_array <<<"$headers"
IFS=',' read -r -a value_array <<<"$values"

# Create JSON object using jq
json=$(jq -n --argjson headers "$(printf '%s\n' "${header_array[@]}" | jq -R . | jq -s .)" \
   --argjson values "$(printf '%s\n' "${value_array[@]}" | jq -R . | jq -s .)" \
   '$headers | to_entries | map({key: .value, value: $values[.key]}) | from_entries')

echo "$json"
