#!/usr/bin/env bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

git fetch
git reset --hard
git checkout $BRANCH_NAME
git checkout main
git merge --ff-only $BRANCH_NAME
git push
if [ ${DELETE_BRANCH:-"false"} == "true" ]
then
git push --delete origin $BRANCH_NAME
fi
