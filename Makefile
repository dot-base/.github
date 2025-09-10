ACT ?= act
SECRETS ?= .secrets

.PHONY: help list dry-run set-end-date ensure-issue start-date close-parent create-label

help:
	@echo "Useful targets:"
	@echo "  make list                 # List workflows/jobs"
	@echo "  make dry-run              # Dry run of all detected events"
	@echo "  make set-end-date         # Test set-issue-end-date-on-close"
	@echo "  make ensure-issue         # Test ensure-issue-in-development-board"
	@echo "  make start-date           # Test set-issue-start-date-on-in-progress"
	@echo "  make close-parent         # Test close-parent-when-last-sub-issue-closed"
	@echo "  make create-label         # Test create-label-across-repos (workflow_dispatch)"

list:
	$(ACT) -l

dry-run:
	$(ACT) -n

set-end-date:
	$(ACT) issues \
	  -W .github/workflows/set-issue-end-date-on-close.yml \
	  -e .github/testevents/issues.closed.json \
	  --secret-file $(SECRETS)

ensure-issue:
	$(ACT) issues \
	  -W .github/workflows/ensure-issue-in-development-board.yml \
	  -e .github/testevents/issues.opened.json \
	  --secret-file $(SECRETS)

start-date:
	$(ACT) projects_v2_item \
	  -W .github/workflows/set-issue-start-date-on-in-progress.yml \
	  -e .github/testevents/projects_v2_item.edited.json \
	  --secret-file $(SECRETS)

close-parent:
	$(ACT) issues \
	  -W .github/workflows/close-parent-when-last-sub-issue-closed.yml \
	  -e .github/testevents/issues.closed.json \
	  --secret-file $(SECRETS)

create-label:
	$(ACT) workflow_dispatch \
	  -W .github/workflows/create-label-across-repos.yml \
	  -e .github/testevents/workflow_dispatch.create_label.json \
	  --secret-file $(SECRETS)


