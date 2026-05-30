# Decision Log — Agenx

> **Canonical location** for agency and product decisions.  
> Per-client decisions may also live in `clients/[slug]/planning/decisions.md` when they only affect one client.  
> The Claude skill at `.claude/skills/project/decisions.md` points here.

Every significant technical or product decision, and why it was made.

---

## How to Add a Decision

```markdown
### DECISION-XXX: [Short title]
**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by DECISION-XXX | Reversed
**Decided by:** [Name(s)]

**Context:**
What situation or problem prompted this decision?

**Decision:**
What was decided, specifically?

**Reasoning:**
Why this over the alternatives?

**Alternatives considered:**
- [Option A] — why rejected

**Consequences:**
What becomes easier? What becomes harder?
```

Lifecycle phase gates in `planning/PRODUCT-PHASES.md` reference DECISION-001 through DECISION-012+ at phase close.

---

## Active Decisions

### DECISION-001: Agenx decision log location
**Date:** 2026-05-30
**Status:** Accepted
**Decided by:** Agenx engineering

**Context:**
Multiple docs referenced `planning/decisions.md`, `skills/project/decisions.md`, and `.claude/skills/project/decisions.md` with no single file committed at the repo root.

**Decision:**
Use `planning/decisions.md` as the canonical agency decision log. Client-specific decisions use `clients/[slug]/planning/decisions.md` when needed.

**Reasoning:**
Planning files (`ACTIVE.md`, `CHANGELOG.md`, `EXECUTION-PLAN.md`) already live under `planning/`; keeping decisions alongside them matches agent handoff protocols.

**Alternatives considered:**
- Only `.claude/skills/project/decisions.md` — rejected because it is tool-specific and easy to miss in git review

**Consequences:**
- All lifecycle and orchestration docs must reference `planning/decisions.md` only
- `.claude/skills/project/decisions.md` becomes a pointer skill for Claude Code

---

## Superseded / Reversed Decisions

_None yet._
