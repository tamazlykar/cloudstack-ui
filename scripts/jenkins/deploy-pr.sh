#!/bin/bash

set -e -o pipefail

# Remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes.
docker ps | grep 'weeks ago' | grep 'cloudstack-ui' | awk '{print $1}' | xargs docker rm -f 2> /dev/null || true;
docker system prune -f

echo $CONFIG > ./src/config/config.json

echo -e "\nBuilding docker image\n"
docker build -t cloudstack-ui-pr .

docker stop "cloudstack-ui-$PULL_REQUEST_NUMBER" 2> /dev/null || true
docker rm "cloudstack-ui-$PULL_REQUEST_NUMBER" 2> /dev/null || true

echo -e "\nRunning docker container\n"
docker run  --restart=always \
  --label pr_id=$PULL_REQUEST_NUMBER \
  -e "BASE_HREF=/$PULL_REQUEST_NUMBER/" \
  -e "PULSE_PLUGIN_ENDPOINT=$PULSE_PLUGIN_ENDPOINT" \
  -e "WEBSHELL_PLUGIN_ENDPOINT=$WEBSHELL_PLUGIN_ENDPOINT" \
  -e "CLIENT_ENDPOINT=$CLIENT_ENDPOINT" \
  -d --name "cloudstack-ui-$PULL_REQUEST_NUMBER"\
  cloudstack-ui-pr;
