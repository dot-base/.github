#!/usr/bin/env bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

git fetch
git reset --hard
git checkout main
git checkout release
git checkout -b $BRANCH_NAME
# attempt to merge to check for conflicts
git merge --no-commit --no-ff main
EXIT_STATUS=$?
git merge --abort
if [ $EXIT_STATUS -eq 0 ]
then
    # zero exit status means there are no merge conflicts
    # otherwise we need to manually merge
    git merge --ff-only main
fi
git push --set-upstream origin $BRANCH_NAME
echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_OUTPUT
