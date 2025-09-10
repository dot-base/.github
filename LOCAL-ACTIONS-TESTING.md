# Local testing with `act`

This repo includes helpers to run GitHub Actions locally using `act`.

Prereqs
- Docker installed and running
- `act` installed: https://github.com/nektos/act

Setup
- Copy `.secrets.example` to `.secrets` and fill values (at least `GH_BOT_PAT`).
  ```bash
  cp .secrets.example .secrets
  ```
- The default runner image is set in `.actrc` to `ghcr.io/catthehacker/ubuntu:act-22.04`.

Common commands
- List workflows/jobs detected:
  ```bash
  act -l
  ```
- Dry run (no steps executed):
  ```bash
  act -n <event>
  ```
- Run with secrets and a specific event payload:
  ```bash
  act <event> -e <path> --secret-file ./.secrets
  ```
- Run a specific workflow file:
  ```bash
  act <event> -W .github/workflows/<file>.yml --secret-file ./.secrets
  ```

Makefile shortcuts
- List workflows/jobs:
  ```bash
  make list
  ```
- Dry run all:
  ```bash
  make dry-run
  ```
- Test Set End Date on close:
  ```bash
  make set-end-date
  ```
- Test Ensure Issue in Development Board:
  ```bash
  make ensure-issue
  ```
- Test Close Parent when last sub-issue closed:
  ```bash
  make close-parent
  ```
- Test Create Label Across Repos dispatch:
  ```bash
  make create-label
  ```

Examples
- Set End Date on issue close
  ```bash
  act issues \
    -W .github/workflows/set-issue-end-date-on-close.yml \
    -e .github/testevents/issues.closed.json \
    --secret-file ./.secrets
  ```

- Ensure issue in development board (on open)
  ```bash
  act issues \
    -W .github/workflows/ensure-issue-in-development-board.yml \
    -e .github/testevents/issues.opened.json \
    --secret-file ./.secrets
  ```

- Close parent when last sub-issue is closed
  ```bash
  act issues \
    -W .github/workflows/close-parent-when-last-sub-issue-closed.yml \
    -e .github/testevents/issues.closed.json \
    --secret-file ./.secrets
  ```

- Dispatch the create-label helper:
  ```bash
  act workflow_dispatch \
    -W .github/workflows/create-label-across-repos.yml \
    -e .github/testevents/workflow_dispatch.create_label.json \
    --secret-file ./.secrets
  ```

Notes
- Actions that call GitHub GraphQL/REST require network access and a PAT with required scopes.
- `act` runs workflows in the local repo context; cross-repo or org-wide operations execute against live GitHub APIs.
- Some GitHub-only contexts (e.g., real node IDs for Projects v2 items) must be supplied for end-to-end testing.
