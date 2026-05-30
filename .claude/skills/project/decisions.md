---
name: decisions
description: >
  Log of important technical and product decisions. Load when about to make a
  significant change or when onboarding. Canonical file: planning/decisions.md
  in the repo root (read and update that file, not this stub).
---

# Decision Log (Claude skill pointer)

**Canonical file:** `planning/decisions.md` at the repository root.

When you make or need a decision:

1. Read `planning/decisions.md` for existing context
2. Add new entries there using the DECISION-XXX template
3. For client-only decisions, use `clients/[slug]/planning/decisions.md` if present

Phase lifecycle gates in `planning/PRODUCT-PHASES.md` require DECISION-001 through DECISION-012+ in `planning/decisions.md` at phase close.

Do not duplicate decision content in this file — it exists only so Claude Code can load the skill name `decisions`.
