#!/bin/bash

set -e -o pipefail

# Remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes.
docker ps | grep 'weeks ago' | grep 'cloudstack-ui' | awk '{print $1}' | xargs docker rm -f 2> /dev/null || true;
docker system prune -f

echo $CONFIG > ./src/config/config.json

BRANCH_LOWER=`echo "$BRANCH" | tr '[:upper:]' '[:lower:]'`
BRANCH_LOWER=`echo ${BRANCH_LOWER##*/}`

docker build -t cloudstack-ui-branch .

docker stop "cloudstack-ui-$GITHUB_USER-$BRANCH_LOWER" 2> /dev/null || true
docker rm "cloudstack-ui-$GITHUB_USER-$BRANCH_LOWER" 2> /dev/null || true

docker run  --restart=always \
  --label branch=$BRANCH_LOWER \
  --label user=$GITHUB_USER \
  -e "BASE_HREF=/$GITHUB_USER/$BRANCH_LOWER/" \
  -e "PULSE_PLUGIN_ENDPOINT=$PULSE_PLUGIN_ENDPOINT" \
  -e "WEBSHELL_PLUGIN_ENDPOINT=$WEBSHELL_PLUGIN_ENDPOINT" \
  -e "CLIENT_ENDPOINT=$CLIENT_ENDPOINT" \
  -d --name "cloudstack-ui-$GITHUB_USER-$BRANCH_LOWER"\
  cloudstack-ui-branch;
