#!/usr/bin/env bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

git fetch
git reset --hard
git checkout main
git merge --ff-only release
git push
