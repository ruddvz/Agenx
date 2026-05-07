# Active Task Queue

> This file is the live queue. Every agent reads this at startup.
> Format: one entry per task, newest first.
> Status: `[ ]` pending · `[>]` in progress · `[x]` done

---

## 👉 NEXT UP: **[Slice X.X]** — [Your current task title]

[One paragraph or bullet list describing what needs to be done next. Be specific enough
that a fresh agent with no context can pick this up and know exactly where to start.]

**Context:** [Link to relevant planning doc, PR, or spec]
**Blocked by:** [Anything blocking this, or "nothing"]

---

## 🎯 Current Sprint / Phase

**Phase:** [e.g. Phase 1 — MVP Backend]
**Goal:** [What does "done" look like for this phase?]
**Target:** [What slice or milestone are we aiming for?]

### Open Slices
- [ ] **X.1** [Slice title] — [brief description]
- [ ] **X.2** [Slice title] — [brief description]
- [ ] **X.3** [Slice title] — [brief description]

### In Progress
- [>] **X.0** [Slice title] — assigned to [agent or dev]

### Recently Done
- [x] **Setup** — Claude Company OS initialized

---

## Known Issues / Bugs

| # | Area | Issue | Priority | Status |
|---|------|-------|----------|--------|
| 1 | [Area] | [Description] | P1/P2/P3 | Open/In Progress/Done |

---

## Blockers

| Blocker | Waiting for | Owner |
|---------|-------------|-------|
| [e.g. Stripe test keys] | [Ops team to provision] | [Name] |

---

## Completed This Session

- [x] Initial setup

---

## Phase History (compact)

- **Setup** (YYYY-MM-DD): Claude Company OS configured ✓

---

## Domain Audit Status

| Domain | Last Audited | Status | Open issues |
|--------|-------------|--------|-------------|
| frontend | never | not run | — |
| backend  | never | not run | — |
| ops      | never | not run | — |
| data     | never | not run | — |

> Run `skills/core/self-audit.md` per domain. Update this table after each audit.

---

## Audit Findings (latest)

*No audits run yet. When you run an audit, paste the AUDIT REPORT block here.*

---

## Notes for Next Agent

- Read `planning/CHANGELOG.md` newest entry first — it has the exact resume point
- All [PLACEHOLDER] values in `skills/core/company.md` need to be filled in
- The `planning/EXECUTION-PLAN.md` file is where slices live — always check it
