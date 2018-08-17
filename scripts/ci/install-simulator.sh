#!/bin/bash

set -u -o pipefail

docker run --name cloudstack-simulator -d --rm -p 4222:8080 cloudstack/simulator
echo "Docker container cloudstack/simulator is started"

echo "Wait until simulator initialized"
for i in $(seq 1 50); do
  TEST_PORT=$(curl --silent --connect-timeout 1 127.0.0.1:4222 | grep HTML);
  if [ ! -z "$TEST_PORT" ]; then
  break;
  fi;
  echo -en "\rChecking... ($i/50)";
  sleep 5;
done
echo -e "\rSimulator initialized successfully"

echo "Deploy Data Center started"
docker exec cloudstack-simulator python /root/tools/marvin/marvin/deployDataCenter.py -i /root/setup/dev/basic.cfg
echo "Data Center deployed"
