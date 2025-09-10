# Local testing with `act`

This repo includes helpers to run GitHub Actions locally using `act`.

Prereqs
- Docker installed and running
- `act` installed: https://github.com/nektos/act

Setup
- Copy `.secrets.example` to `.secrets` and fill values (at least `GH_BOT_PAT`).
- The default runner image is set in `.actrc` to `ghcr.io/catthehacker/ubuntu:act-22.04`.

Common commands
- List workflows/jobs detected: `act -l`
- Dry run (no steps executed): `act -n <event>`
- Run with secrets and a specific event payload: `act <event> -e <path> --secret-file ./.secrets`
- Run a specific workflow file: `act <event> -W .github/workflows/<file>.yml --secret-file ./.secrets`

Makefile shortcuts
- `make list` — list workflows/jobs
- `make dry-run` — dry run all
- `make set-end-date` — test Set End Date on close
- `make ensure-issue` — test Ensure Issue in Development Board
- `make start-date` — test Set Start Date on In Progress
- `make close-parent` — test Close Parent when last sub-issue closed
- `make create-label` — test Create Label Across Repos dispatch

Examples
- Set End Date on issue close
  - `act issues -W .github/workflows/set-issue-end-date-on-close.yml -e .github/testevents/issues.closed.json --secret-file ./.secrets`

- Ensure issue in development board (on open)
  - `act issues -W .github/workflows/ensure-issue-in-development-board.yml -e .github/testevents/issues.opened.json --secret-file ./.secrets`

- Set Start Date when Status moves to In Progress (Projects v2 item edited)
  - `act projects_v2_item -W .github/workflows/set-issue-start-date-on-in-progress.yml -e .github/testevents/projects_v2_item.edited.json --secret-file ./.secrets`
  - Note: This workflow requires real ProjectV2 item/issue ids and permissions; use a valid PAT and IDs.

- Close parent when last sub-issue is closed
  - `act issues -W .github/workflows/close-parent-when-last-sub-issue-closed.yml -e .github/testevents/issues.closed.json --secret-file ./.secrets`

- Dispatch the create-label helper:
  - `act workflow_dispatch -W .github/workflows/create-label-across-repos.yml -e .github/testevents/workflow_dispatch.create_label.json --secret-file ./.secrets`

Notes
- Actions that call GitHub GraphQL/REST require network access and a PAT with required scopes.
- `act` runs workflows in the local repo context; cross-repo or org-wide operations execute against live GitHub APIs.
- Some GitHub-only contexts (e.g., real node IDs for Projects v2 items) must be supplied for end-to-end testing.
