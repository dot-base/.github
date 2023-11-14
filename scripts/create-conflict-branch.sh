#!/usr/bin/env bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

BRANCH_NAME="sync/$VERSION_TAG"

git fetch
git checkout release
git checkout -b $BRANCH_NAME
git push --set-upstream origin $BRANCH_NAME
echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_OUTPUT
