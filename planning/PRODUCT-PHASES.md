# Product Phases — Lifecycle Gate System

> This file maps the 12-phase product lifecycle to this project.
> The orchestrator reads this at Phase 0. No work begins until the current
> phase is confirmed. No phase is skipped. No phase gate is bypassed.
>
> Format: Each phase has an entry condition, an exit condition, owner agents,
> and a decision log requirement. When a phase closes, a DECISION entry is
> written to `planning/decisions.md`.

---

## How to Use This File

1. **At every session start:** Read the current phase status below
2. **Before any task:** Confirm the task belongs to the current phase
3. **If a task belongs to a future phase:** Flag it, log it, do not execute it
4. **To advance a phase:** All exit conditions must be checked `[x]`
5. **After advancing:** Write a DECISION entry and update `memory/context-log.md`

---

## Current Phase

```
CURRENT:  Phase [X] — [Phase Name]
STARTED:  YYYY-MM-DD
STATUS:   in progress / blocked / complete
NEXT:     Phase [X+1] — [Phase Name]
```

> Update this block every time a phase advances. Never leave it stale.

---

## Phase 1 — Idea and Validation

**Goal:** Confirm the problem is real, the target user is clear, and the MVP scope is agreed before any design or code begins.

**Agents:** orchestrator, planner, architect (advisory only)

### Entry Conditions
- [ ] A project has been named in `skills/core/company.md`
- [ ] The session has completed Phase 0 (CHANGELOG, ACTIVE, EXECUTION-PLAN read)

### Exit Conditions (all must be checked before advancing)
- [ ] **Problem definition** written and stored in `planning/decisions.md` (DECISION-001)
- [ ] **Target users** identified with at least one specific use case described
- [ ] **MVP scope** documented — what is in, what is explicitly out
- [ ] **Competitor research** completed — minimum 3 competitors noted with differentiators
- [ ] Human has explicitly confirmed: "Phase 1 is done, proceed to Phase 2"

### Decision Required at Close
Write `DECISION-001: Product Validated` in `planning/decisions.md`
Fields: problem definition, target user, MVP scope, why this over alternatives.

### Failure Mode to Avoid
Skipping validation and jumping straight to tech decisions.
If the problem is not validated, every downstream phase is built on sand.

---

## Phase 2 — Tech Decisions

**Goal:** Lock the stack, framework, APIs, and architecture pattern before writing a single line of production code.

**Agents:** architect, orchestrator, backend agent, frontend agent

### Entry Conditions
- [ ] Phase 1 exit conditions fully checked
- [ ] `DECISION-001` written in `planning/decisions.md`

### Exit Conditions
- [ ] **Programming language(s)** locked and written in `skills/core/company.md`
- [ ] **Framework** chosen (e.g. Next.js, FastAPI, Flutter) and justified
- [ ] **Key APIs and services** identified (auth, payments, messaging, etc.)
- [ ] **Architecture pattern** decided (monolith vs microservices, serverless vs server)
- [ ] All choices logged in `planning/decisions.md` as DECISION-002
- [ ] `skills/core/company.md` Tech Stack section fully filled in (no placeholders)
- [ ] Human has confirmed: "Phase 2 is done, proceed to Phase 3"

### Decision Required at Close
Write `DECISION-002: Tech Stack Locked` in `planning/decisions.md`
Fields: each tool chosen, alternatives considered, reason for choice.

### Failure Mode to Avoid
Leaving tech choices as "TBD" and making them ad hoc mid-build.
One late stack change can invalidate weeks of work.

---

## Phase 3 — Data Layer

**Goal:** Design the full data model before building any business logic or UI.

**Agents:** architect, backend agent, database-reviewer

### Entry Conditions
- [ ] Phase 2 exit conditions fully checked
- [ ] `DECISION-002` written in `planning/decisions.md`

### Exit Conditions
- [ ] **Database type confirmed** (relational, document, vector, cache)
- [ ] **Schema designed** — all core entities, relationships, indexes documented in `skills/project/architecture.md`
- [ ] **RLS / access rules** planned if using Supabase or similar row-level security
- [ ] **Migration strategy** defined — how schema changes will be applied in production
- [ ] Schema reviewed by `database-reviewer` agent — no P1 issues open
- [ ] Human has confirmed: "Phase 3 is done, proceed to Phase 4"

### Decision Required at Close
Write `DECISION-003: Data Model Finalized` in `planning/decisions.md`
Fields: entities, key relationships, why this model over alternatives.

### Failure Mode to Avoid
Building API routes and UI before the schema is stable.
Schema changes mid-build break migrations, APIs, and frontend types simultaneously.

---

## Phase 4 — Code Architecture

**Goal:** Build the core application and AI/integration features against the locked schema.

**Agents:** backend agent, frontend agent, tdd-guide, code-reviewer, security-reviewer

### Entry Conditions
- [ ] Phase 3 exit conditions fully checked
- [ ] Schema documented in `skills/project/architecture.md`
- [ ] `planning/EXECUTION-PLAN.md` has slices defined for Phase 4

### Exit Conditions
- [ ] **Backend API routes** built and tested — all happy path + auth failure + validation failure covered
- [ ] **Frontend components** built against real API (no mocked data in production paths)
- [ ] **AI / LLM integration** implemented if applicable — prompts version-controlled
- [ ] **External API integrations** implemented with webhook signature verification
- [ ] All `code-reviewer` CRITICAL and HIGH issues resolved
- [ ] All `security-reviewer` CRITICAL and HIGH issues resolved
- [ ] `npm run build` passes with zero errors
- [ ] `npm test` passes — all tests green
- [ ] Human has confirmed: "Phase 4 is done, proceed to Phase 5"

### Decision Required at Close
Write `DECISION-004: Core Architecture Complete` in `planning/decisions.md`
Fields: key architectural choices made during build, deferred items, known tech debt.

### Failure Mode to Avoid
Shipping auth/payments code without security review.
Never advance Phase 4 with open security review issues.

---

## Phase 5 — Auth and Security

**Goal:** Lock down all authentication, authorization, and data protection before any production traffic.

**Agents:** security-reviewer, backend agent, database-reviewer

### Entry Conditions
- [ ] Phase 4 exit conditions fully checked
- [ ] All API routes built

### Exit Conditions
- [ ] **Authentication** implemented and tested (login, logout, session expiry, token refresh)
- [ ] **Authorization** implemented — every route checks permissions correctly
- [ ] **Rate limiting** applied to all public endpoints
- [ ] **Input validation** on every user-controlled field (Zod or equivalent)
- [ ] **Secrets audit** passed — no hardcoded keys, all env vars in `.env.example`
- [ ] **Security review** by `security-reviewer` agent — zero P1 issues
- [ ] OWASP top 10 checklist reviewed for this app type
- [ ] Human has confirmed: "Phase 5 is done, proceed to Phase 6"

### Decision Required at Close
Write `DECISION-005: Security Model Approved` in `planning/decisions.md`
Fields: auth provider, session strategy, what was found and fixed in security review.

### Failure Mode to Avoid
Treating security as a "we'll harden it later" task.
Auth and input validation bugs in production are not recoverable without downtime.

---

## Phase 6 — Testing

**Goal:** Achieve reliable test coverage across unit, API, and E2E layers before deployment.

**Agents:** tdd-guide, e2e-runner, build-error-resolver

### Entry Conditions
- [ ] Phase 5 exit conditions fully checked
- [ ] All core features and auth implemented

### Exit Conditions
- [ ] **Unit tests** cover all business logic functions in `lib/`
- [ ] **API tests** cover: happy path, auth failure, validation failure for every route
- [ ] **E2E tests** cover: core user flows (signup, main action, key error states)
- [ ] **Edge cases** documented and tested (empty state, max input, concurrent requests)
- [ ] `npm test` — all pass, zero skipped
- [ ] `npx playwright test` — all E2E pass
- [ ] Test coverage report reviewed — no untested critical paths
- [ ] Human has confirmed: "Phase 6 is done, proceed to Phase 7"

### Decision Required at Close
Write `DECISION-006: Test Coverage Approved` in `planning/decisions.md`
Fields: coverage %, key flows tested, known gaps accepted and why.

### Failure Mode to Avoid
Writing tests after finding bugs in production.
Tests written before deployment catch 80% of what production would have caught.

---

## Phase 7 — Deployment

**Goal:** Ship to a stable production environment with zero data loss and zero user-facing errors.

**Agents:** ops agent, build-error-resolver

### Entry Conditions
- [ ] Phase 6 exit conditions fully checked
- [ ] All tests green
- [ ] No open P1 or P2 issues in `planning/ACTIVE.md`

### Exit Conditions
- [ ] **Environment variables** set in production — all verified present
- [ ] **Database migrations** run in production — confirmed successful
- [ ] **Build** passes in production environment (`npm run build` clean)
- [ ] **Smoke test** passed — core user flows tested on production URL
- [ ] **Error tracking** active (Sentry or equivalent) — first error would be caught
- [ ] **Rollback plan** documented in `skills/team/ops.md`
- [ ] Human has confirmed: "Phase 7 is done, proceed to Phase 8"

### Decision Required at Close
Write `DECISION-007: Production Deployed` in `planning/decisions.md`
Fields: hosting provider, deploy process, rollback strategy, smoke test results.

### Failure Mode to Avoid
Running DB migrations after code deploy.
Always: migrations first, code second. Reverse is data corruption.

---

## Phase 8 — CI/CD Pipeline

**Goal:** Automate build, test, and deploy so no human is required to ship safely.

**Agents:** ops agent, backend agent

### Entry Conditions
- [ ] Phase 7 exit conditions fully checked
- [ ] Production is live and stable for at least 24 hours

### Exit Conditions
- [ ] **GitHub Actions** (or equivalent) configured — triggers on PR and merge to main
- [ ] **Auto build** runs on every push — fails build if compile errors
- [ ] **Auto test** runs on every push — fails pipeline if any test fails
- [ ] **Auto deploy** configured for main branch — only deploys if build + tests pass
- [ ] **Rollback strategy** automated or documented with < 5 min RTO
- [ ] Pipeline tested end-to-end — push a commit, watch it deploy
- [ ] Human has confirmed: "Phase 8 is done, proceed to Phase 9"

### Decision Required at Close
Write `DECISION-008: CI/CD Operational` in `planning/decisions.md`
Fields: pipeline tool, trigger events, deploy target, rollback mechanism.

### Failure Mode to Avoid
Manual deploys as a permanent process.
Every manual deploy is a potential missed step. Automate once, benefit forever.

---

## Phase 9 — Infra and Networking

**Goal:** Make the application accessible, secure at the network layer, and resilient.

**Agents:** ops agent

### Entry Conditions
- [ ] Phase 8 exit conditions fully checked
- [ ] CI/CD pipeline operational

### Exit Conditions
- [ ] **Domain and DNS** configured — custom domain live, not bare IP
- [ ] **SSL/TLS** active (Let's Encrypt or provider cert) — all traffic HTTPS
- [ ] **Reverse proxy** configured if applicable (Nginx, Cloudflare, etc.)
- [ ] **CDN** configured for static assets if applicable
- [ ] **Load balancer** planned (even if not yet active — document the trigger point)
- [ ] DNS TTLs reviewed — short enough for fast failover
- [ ] Human has confirmed: "Phase 9 is done, proceed to Phase 10"

### Decision Required at Close
Write `DECISION-009: Infra Finalized` in `planning/decisions.md`
Fields: domain registrar, DNS provider, SSL approach, proxy layer.

### Failure Mode to Avoid
Leaving the app on a raw provider URL in production.
Users don't trust bare IP addresses or `*.vercel.app` URLs for serious products.

---

## Phase 10 — Monitoring and Logs

**Goal:** Know about problems before users report them.

**Agents:** ops agent, data agent

### Entry Conditions
- [ ] Phase 9 exit conditions fully checked
- [ ] App live on custom domain with SSL

### Exit Conditions
- [ ] **Logging** configured — errors written to a searchable log store (ELK, CloudWatch, Logtail, etc.)
- [ ] **Metrics** tracked — at minimum: request count, error rate, response time (Prometheus, Grafana, or equivalent)
- [ ] **Error tracking** active — Sentry or equivalent capturing exceptions with stack traces
- [ ] **Alerts** configured — at minimum: error spike, downtime, high latency
- [ ] **Alert routing** set — alerts go to a real person, not a silent inbox
- [ ] Runbook written: what to do when each alert fires
- [ ] Human has confirmed: "Phase 10 is done, proceed to Phase 11"

### Decision Required at Close
Write `DECISION-010: Observability Stack Set` in `planning/decisions.md`
Fields: logging tool, metrics tool, alerting rules, on-call owner.

### Failure Mode to Avoid
Finding out the app was down for 6 hours because no alert fired.
Monitoring without alerting is just decoration.

---

## Phase 11 — Performance and Scale

**Goal:** Optimize the app so it handles real load without degrading.

**Agents:** backend agent, data agent, ops agent

### Entry Conditions
- [ ] Phase 10 exit conditions fully checked
- [ ] Monitoring and alerts operational — you can measure what you optimize

### Exit Conditions
- [ ] **Load test** run — app handles expected peak traffic without errors
- [ ] **Slow query analysis** done — no query > 500ms under normal load
- [ ] **Caching strategy** implemented where appropriate (Redis, CDN, HTTP cache headers)
- [ ] **Background jobs** offloaded from request path where applicable (Celery, BullMQ, etc.)
- [ ] **Database indexing** reviewed — all high-frequency query columns indexed
- [ ] **Horizontal scaling** path documented — how do we add instances if needed?
- [ ] Human has confirmed: "Phase 11 is done, proceed to Phase 12"

### Decision Required at Close
Write `DECISION-011: Performance Baseline Set` in `planning/decisions.md`
Fields: load test results, bottlenecks found, caching approach, scale trigger thresholds.

### Failure Mode to Avoid
Premature optimization before load testing.
Optimize based on data from Phase 10 monitoring, not guesses.

---

## Phase 12 — Feedback Loop

**Goal:** Turn real user behavior into a prioritized improvement backlog. Repeat and grow.

**Agents:** orchestrator, planner, all domain agents

### Entry Conditions
- [ ] Phase 11 exit conditions fully checked
- [ ] At least one real user has used the app in production

### Exit Conditions (this phase never fully closes — it repeats)
- [ ] **User feedback channel** active — in-app, email, or community
- [ ] **Feedback reviewed** — minimum weekly cadence
- [ ] **Ranking/prioritization** process defined — how do new requests get scored?
- [ ] **New feature slices** added to `planning/EXECUTION-PLAN.md` from feedback
- [ ] **Iterate and grow** — cycle back to Phase 4 for new features, Phase 5 for security updates, Phase 11 for scale improvements
- [ ] Domain audits scheduled every 14 days (tracked in `memory/context-log.md`)

### Decision Required at Close (each cycle)
Write `DECISION-012+: Feedback Cycle [N]` in `planning/decisions.md`
Fields: feedback received, what was prioritized, what was deferred, next sprint goal.

### Failure Mode to Avoid
Building features based on assumptions after launch.
User feedback is a signal. Ignore it and you optimize for the wrong thing.

---

## Phase Gate Enforcement Rules

These rules apply to every agent, every session:

1. **No forward skipping.** A task belonging to Phase 6 cannot be executed while Phase 4 is incomplete.
2. **No backward regression.** A completed phase can only be re-opened with explicit human instruction and a DECISION log entry explaining why.
3. **Ambiguous tasks get classified first.** If a task could belong to multiple phases, the orchestrator classifies it before dispatching.
4. **Human confirmation required to advance.** The agent cannot self-advance a phase. A human must explicitly confirm exit conditions are met.
5. **Blocked phases escalate.** If a phase has been in progress for 7+ days with no advancement, the orchestrator flags it to the human with a specific blocker identified.

---

## Phase Advancement Log

| Phase | Opened | Closed | Decision Written | Notes |
|-------|--------|--------|-----------------|-------|
| Phase 1 | | | | |
| Phase 2 | | | | |
| Phase 3 | | | | |
| Phase 4 | | | | |
| Phase 5 | | | | |
| Phase 6 | | | | |
| Phase 7 | | | | |
| Phase 8 | | | | |
| Phase 9 | | | | |
| Phase 10 | | | | |
| Phase 11 | | | | |
| Phase 12 | | | | |
