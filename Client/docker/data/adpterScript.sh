#!/bin/bash
defaultAdapter=$(ip route | grep -m1 default | cut -d ' ' -f5)
defaultAdapterProtocol=$(sudo lshw -class network -short | grep $defaultAdapter | awk -F 'network' '{print $2}' | awk '{$1=$1};1' | cut -d ' ' -f1)

echo $defaultAdapter
echo $defaultAdapterProtocol