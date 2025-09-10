# .github

Shared repository for organization-wide community health files and reusable GitHub Actions workflows.

This repo centralizes:

- Issue templates and a pull request template
- Reusable CI/CD workflows (via `workflow_call`)
- Contribution and conduct guidelines

Downstream repositories can reference these resources without duplicating them.

## Repository Structure

- `.github/ISSUE_TEMPLATE/`: Issue templates (bug, feature, epic, etc.).
- `.github/pull_request_template.md`: Default PR template.
- `.github/workflows/`: Reusable workflows for CI/CD, releases, and utilities.
- `.github/changelog.config.cjs`: Conventional changelog configuration.
- `scripts/`: Helper scripts used by some workflows.

## Using The Reusable Workflows

All workflows in `.github/workflows/` are defined with `on: workflow_call`, so any repo in the org can call them.

Example: run Node lint + tests via the shared workflow.

```yaml
name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  ci:
    uses: <your-org>/.github/.github/workflows/node-lint-and-test.yml@main
    with:
      RUN_TESTS: 'true'
      RUN_TYPECHECK: 'false'
      RUN_COVERAGE: 'false'
    secrets:
      GH_BOT_PAT: ${{ secrets.GH_BOT_PAT }}
      FONTAWESOME_NPM_AUTH_TOKEN: ${{ secrets.FONTAWESOME_NPM_AUTH_TOKEN }}
```

Replace `<your-org>` with your GitHub organization. Prefer pinning a tag or commit SHA instead of `@main` for stability.

### Available Workflows (examples)

- `node-lint-and-test.yml`: Lint, test, optional coverage for Node projects.
- `code-check.yml`: Run shared code checks.
- `coverage.yml`: Generate and publish coverage reports.
- `lint-pr-title.yml`: Enforce PR title conventions.
- `create-release*.yml` and `release-pr-after-merge.yml`: Automate release flows.
- `build-docker-image.yml`: Build and push Docker images.
- `manage-pr.yml`, `get-pr.yml`, `sync-pr-after-merge.yml`: PR management utilities.

See the full list under `.github/workflows/`.

### Required Secrets

Depending on the workflow you call, configure the following repository or org secrets:

- `GH_BOT_PAT`: Personal access token for bot operations.
- `GH_BOT_USER`: GitHub username of the bot account (used as assignee/author).
- `FONTAWESOME_NPM_AUTH_TOKEN`: NPM token for FontAwesome packages (optional where noted).
- `NPM_TOKEN`: NPM publish token (publish flows).
- `CR_PAT`: GitHub Container Registry token (Docker flows).
- `SLACK_WEBHOOK_URL`: Incoming webhook for Slack notifications.

Check each workflow file for its exact `inputs` and `secrets` expectations.

## Issue & PR Templates

- Issue templates in `.github/ISSUE_TEMPLATE/` are available org‑wide. Repos can override by adding their own templates.
- The default PR template from `.github/pull_request_template.md` applies to all repos that don’t define their own.

## Contributing

- Keep workflows reusable when possible via `on: workflow_call` and document `inputs`/`secrets` at the top of the file.
- Prefer small, composable workflows over monoliths.

## Notes

- Repos consuming these workflows must grant required permissions and secrets.
- Pin workflow references to a tag or SHA for deterministic CI.
- Scripts under `scripts/` are intended for use within workflows; run locally with care.

## License

This repository is open source. See `LICENSE` for details.
