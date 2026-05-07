---
name: lifecycle
description: >
  Product lifecycle gate system. Load this skill whenever the orchestrator is
  about to dispatch any build, design, deployment, or infrastructure task.
  It enforces phase order, blocks out-of-sequence work, and ensures every
  phase closes with a decision log entry. This is what prevents the team from
  building Phase 7 infrastructure while Phase 3 data model is still undefined.
---

# Lifecycle Skill — Phase Gate Enforcement

You are operating inside a 12-phase product lifecycle.
Before dispatching any task, you must confirm that task belongs to the current phase.
If it does not, you do not execute it. You log it and escalate to the human.

---

## Step 1: Identify Current Phase

Read `planning/PRODUCT-PHASES.md`.
Find the `## Current Phase` block at the top.

```
CURRENT:  Phase [X] — [Phase Name]
STATUS:   in progress / blocked / complete
```

If this block says `complete`, the human must confirm the next phase is open before you proceed.
If this block is not filled in, that is a P1 issue — stop and ask the human to set the current phase.

---

## Step 2: Classify the Requested Task

Every task belongs to one phase. Use this classification table:

| Task type | Belongs to phase |
|-----------|-----------------|
| Problem definition, user research, competitor analysis | Phase 1 |
| Tech stack decisions, framework choice, API selection | Phase 2 |
| Schema design, data model, database choice, migrations | Phase 3 |
| API routes, business logic, UI components, AI integration | Phase 4 |
| Auth, authorization, rate limiting, input validation, secrets audit | Phase 5 |
| Unit tests, API tests, E2E tests, edge case coverage | Phase 6 |
| Environment variables, hosting setup, production deploy, smoke tests | Phase 7 |
| GitHub Actions, auto-deploy, rollback automation | Phase 8 |
| Domain, DNS, SSL, CDN, reverse proxy, load balancer | Phase 9 |
| Logging, metrics, error tracking, alerts, runbooks | Phase 10 |
| Load testing, caching, query optimization, background jobs | Phase 11 |
| User feedback, feature prioritization, iteration planning | Phase 12 |

---

## Step 3: Apply the Gate Rule

```
IF task phase == current phase:
    → Proceed normally. Dispatch to the relevant agent.

IF task phase < current phase (already completed):
    → Check decisions.md — was this already decided?
    → If yes and request is a minor update: proceed with caution, flag to human after.
    → If yes and request contradicts a closed decision: STOP. Escalate to human.
    → If no decision exists for this area: treat as open, proceed.

IF task phase > current phase (future phase):
    → DO NOT execute.
    → Log the request in planning/ACTIVE.md under "Future Phase Backlog"
    → Tell the human: "This task belongs to Phase [X]. We are currently in Phase [Y].
      I've logged it. Should we advance the current phase first, or proceed out of order
      with your explicit instruction?"
    → Wait for human response before taking any action.
```

---

## Step 4: Check Phase Exit Conditions Before Advancing

When the human says "we're done with Phase X" or "move to Phase X+1":

1. Open `planning/PRODUCT-PHASES.md`
2. Find Phase X exit conditions
3. Read each checkbox — confirm it is actually `[x]` (done), not `[ ]` (pending)
4. If any exit condition is unchecked:
   - List the unchecked items explicitly
   - Ask: "These items are not yet complete. Do you want to complete them now, accept the risk and advance anyway, or defer them as known gaps?"
5. If the human confirms advancement despite gaps:
   - Write a DECISION entry noting the gap and the human's explicit decision to accept it
   - Advance the phase
6. If all exit conditions are checked:
   - Write the required DECISION entry (see Phase X requirements in PRODUCT-PHASES.md)
   - Update the `## Current Phase` block
   - Update the Phase Advancement Log table
   - Update `memory/context-log.md`

---

## Step 5: Write the Decision Entry

Every phase advancement requires a DECISION entry in `planning/decisions.md`.
Use this format:

```markdown
### DECISION-00X: [Phase Name] Complete
**Date:** YYYY-MM-DD
**Status:** Accepted
**Phase:** [X]

**Context:**
[What was validated, built, or decided during this phase?]

**Decision:**
[What was locked in? What are we committing to?]

**Reasoning:**
[Why these choices over alternatives?]

**Alternatives considered:**
- [Option A] — why not chosen
- [Option B] — why not chosen

**Consequences:**
[What does this enable? What does it constrain? What trade-offs are accepted?]

**Open items deferred to next phase:**
- [Any known gaps accepted]
```

---

## Phase-Specific Agent Routing

When a task is confirmed to belong to the current phase, route it here:

| Phase | Primary agents | Secondary agents |
|-------|---------------|-----------------|
| 1 | orchestrator, planner | architect (advisory) |
| 2 | architect, orchestrator | backend, frontend (advisory) |
| 3 | architect, backend, database-reviewer | orchestrator |
| 4 | backend, frontend, tdd-guide | code-reviewer, security-reviewer |
| 5 | security-reviewer, backend | database-reviewer |
| 6 | tdd-guide, e2e-runner | build-error-resolver |
| 7 | ops | backend (migration coordination) |
| 8 | ops | backend |
| 9 | ops | — |
| 10 | ops, data | — |
| 11 | backend, data, ops | — |
| 12 | orchestrator, planner | all domain agents |

---

## What This Skill Prevents

- Writing code (Phase 4) before the data model is finalized (Phase 3)
- Deploying (Phase 7) before security review (Phase 5) is complete
- Setting up monitoring (Phase 10) before the app is deployed (Phase 7)
- Optimizing performance (Phase 11) before you have metrics to optimize against (Phase 10)
- Building new features (Phase 12 loop) while Phase 5 security issues are still open

---

## Escalation Script

When blocking an out-of-phase request, always say:

> "I can't execute [TASK] right now because it belongs to Phase [X] and we are currently in Phase [Y].
> Here's what needs to happen in Phase [Y] before we can get to that:
> [List the remaining unchecked exit conditions for the current phase]
> Want me to focus on those now so we can advance?"

This is more useful than a flat refusal. It tells the human exactly what to do next.
