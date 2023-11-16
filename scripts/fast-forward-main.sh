#!/usr/bin/env bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

git fetch
git reset --hard
echo "🚧 Working Directory"
pwd
echo "🚧 Release Commits"
git checkout $BRANCH_NAME
git status
git log --oneline -10
echo "🚧 Main commits"
git checkout main
git status
git log --oneline -10
echo "🔥 Trying to merge"
git merge --ff-only $BRANCH_NAME
echo "💥 Merge results"
git log --oneline -10
git status
