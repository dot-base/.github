# dotbase/.github

Shared GitHub configuration for the dotbase org: issue/PR templates, reusable workflows, and automation that applies across repositories.

## What’s Inside

- Issue templates: `.github/ISSUE_TEMPLATE/*`
- PR template: `.github/pull_request_template.md`
- Reusable workflows: `.github/workflows/*.yml`
  - CI helpers: Node, Flutter, Maven, Coverage, Docker build
  - PR & release automation: create/sync release PRs, lint PR titles, post‑merge sync
  - Project automation: ensure issues are in boards, set start/end dates, close parent issues, etc.
- Local testing helpers: `LOCAL-ACTIONS-TESTING.md`, `.actrc`, `.secrets.example`, `Makefile`
- Test event payloads for `act`: `.github/testevents/*.json`

## Using Reusable Workflows

You can call workflows in this repo from other repos via `workflow_call`.

Example: Node lint/test workflow

```yaml
name: CI
on: [push, pull_request]

jobs:
  node-ci:
    uses: dotbase/.github/.github/workflows/node-lint-and-test.yml@main
    secrets:
      GH_BOT_PAT: ${{ secrets.GH_BOT_PAT }}
      # Optional, if your repo needs private FontAwesome deps
      FONTAWESOME_NPM_AUTH_TOKEN: ${{ secrets.FONTAWESOME_NPM_AUTH_TOKEN }}
    with:
      RUN_TESTS: 'true'        # default
      RUN_TYPECHECK: 'false'   # default
      RUN_COVERAGE: 'false'    # default
```

Example: Flutter tests

```yaml
jobs:
  flutter-tests:
    uses: dotbase/.github/.github/workflows/flutter-build.yml@main
```


Other notable workflows you can call or enable by event:

- `coverage.yml`: generate Jest coverage and annotate via GH bot
- `build-docker-image.yml`: build and optionally push a Docker image
- Release helpers: `create-release.yml`, `create-pre-release.yml`, `create-release-pr.yml`, `release-pr-after-merge.yml`, `create-sync-pr.yml`, `sync-pr-after-merge.yml`
- Project automations: `ensure-issue-in-development-board.yml`, `ensure-project-item.yml`, `set-issue-end-date-on-close.yml`, `close-parent-when-last-sub-issue-closed.yml`
- PR management: `manage-pr.yml`, `lint-pr-title.yml`, `configure-manually-opened-feature-pr.yml`, `pr-checks.yml`

Tip: Open any workflow file to see required secrets/inputs.

## Local Testing with `act`

This repo is set up to run workflows locally using [`act`](https://github.com/nektos/act).

Quick start:

1) Install Docker and `act`
2) Copy `.secrets.example` to `.secrets` and fill values (at least `GH_BOT_PAT`)
3) Try listing workflows: `act -l` or `make list`

Common commands (see more in `LOCAL-ACTIONS-TESTING.md`):

- Dry run an event: `act -n <event>`
- Run a workflow with a test payload: `act <event> -W .github/workflows/<file>.yml -e .github/testevents/<payload>.json --secret-file ./.secrets`
- Makefile shortcuts:
  - `make set-end-date`, `make ensure-issue`, `make start-date`, `make close-parent`, `make create-label`

Details and examples: see `LOCAL-ACTIONS-TESTING.md`.

## GitHub Access Tokens

Secrets used by these workflows and the minimum recommended scopes/permissions:

- GH_BOT_PAT: bot Personal Access Token used for GraphQL/REST operations across PRs, issues, releases, and Projects v2.
  - Classic PAT scopes: repo, read:org, project (add workflow if you need to dispatch/modify workflows).
  - Fine‑grained PAT permissions:
    - Repository: Contents (Read and write), Issues (Read and write), Pull requests (Read and write), Metadata (Read). Add Actions (Read and write) only if you dispatch workflows.
    - Organization: Projects (Read and write) for Projects v2 automations.
    - For org‑wide tasks (e.g., create labels across all repos), grant access to All repositories for the org.
- GH_BOT_USER: GitHub username of the bot account (no special scope; used for assignment/attribution).
- CR_PAT: token for GitHub Container Registry login. Scopes: write:packages (and read:packages). Add delete:packages if cleaning up images.
- FONTAWESOME_NPM_AUTH_TOKEN: npm auth token for private FontAwesome packages (non‑GitHub scope).
- NPM_TOKEN: npm auth token with publish rights for packages you release.

Where to store:
- In calling repos/org: add as Actions secrets with the exact names above.
- For local testing with `act`: copy `.secrets.example` to `.secrets` and fill required values.

## Contributing

- Keep workflows reusable when possible via `on: workflow_call` and document `inputs`/`secrets` at the top of the file.
- Prefer small, composable workflows over monoliths.
- When adding automations that call GitHub APIs, include guidance for local testing with `act` and sample payloads in `.github/testevents/`.

## License

This repository is licensed under the MIT License. See `LICENSE`.
