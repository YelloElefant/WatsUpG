#!/bin/bash
while true; do
   /endPointQuery.sh
   for i in {1..5}; do
      /cronjob.sh
      sleep 1
   done
done
