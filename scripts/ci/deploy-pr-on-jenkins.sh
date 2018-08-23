#!/bin/bash

set -e -o pipefail

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  curl $JENKINS_DEPLOY_URL
fi
