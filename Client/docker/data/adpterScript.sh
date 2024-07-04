#!/bin/bash
defaultAdapter=$(ip route | grep -m1 default | cut -d ' ' -f5)
logicalName=$(lshw -c network | grep $defaultAdapter -B 5 -A 5 | grep "logical name:" -m1 | awk '{$1=$1};1' | cut -d ' ' -f3)
defaultAdapterProtocol=$(sudo lshw -class network | awk '/description/ {via_line=$0} /'$defaultAdapter'/ {print via_line}' | awk '{$1=$1};1' | cut -d ' ' -f2)

echo $defaultAdapter
echo $defaultAdapterProtocol