#!/bin/bash
while true; do
   DURATION=5 # Seconds for vnstat sampling
   OUTPUT_FILE="/data/traffic"

   temp_dir=$(mktemp -d)

   # Get the list of interfaces vnstat is tracking
   INTERFACES=$(vnstat --iflist | cut -d ":" -f2 | sed 's/ ([^)]*)//g' | sed 's/^ *//' | tr ' ' '\n')

   for IFACE in $INTERFACES; do
      (
         JSON_OUTPUT=$(vnstat -tr $DURATION --json -i $IFACE 2>/dev/null)
         if [ -n "$JSON_OUTPUT" ]; then
            echo "\"$IFACE\": $JSON_OUTPUT," >>$temp_dir/$IFACE.json
         fi
      ) &
   done
   wait

   echo "{" >$OUTPUT_FILE

   for IFACE in $INTERFACES; do
      if [ -f "$temp_dir/$IFACE.json" ]; then
         cat "$temp_dir/$IFACE.json" >>$OUTPUT_FILE
      fi
   done

   echo "\"timestamp\": \"$(date +%H:%M)\"" >>$OUTPUT_FILE
   echo "}" >>$OUTPUT_FILE

   rm -r "$temp_dir"

done
