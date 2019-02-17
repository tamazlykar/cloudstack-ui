#!/bin/bash

set -e -u -o pipefail

docker run --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  ${NODE_CHROME_YARN_IMAGE} \
  /bin/bash -ce "yarn && yarn lint:ci && npm test && rm -rf karma-*"
