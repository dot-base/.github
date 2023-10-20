#!/bin/bash
git reset --hard
git checkout -b $BRANCH_NAME
# attempt to merge to check for conflicts
git merge --no-commit --no-ff origin/main
EXIT_STATUS=$?
git merge --abort
if [ $EXIT_STATUS -eq 0 ]
then
    # zero exit status means there are no merge conflicts
    # otherwise we need to manually merge
    git merge --ff-only origin/main
fi
git push --set-upstream origin $BRANCH_NAME
echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_OUTPUT
