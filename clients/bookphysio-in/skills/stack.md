---
name: bookphysio-in-stack
description: |
  Tech stack, deployment targets, environment variables, and project-specific
  constraints for BookPhysio.in. Agents read this before writing any code.
metadata:
  agenx-client: bookphysio-in
  last-updated: 2026-05
---

# BookPhysio.in — Stack & Technical Standards

## Core Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend (web) | React 18, Next.js 14 | App Router, Tailwind CSS |
| Frontend (mobile) | React Native | Shared patterns with web where practical |
| Backend | Node.js | REST APIs |
| Database | PostgreSQL 15 | Relational data for clinics, patients, appointments |
| Auth | TBD (document in DECISION when locked) | Session/JWT or managed provider |
| Hosting | TBD | Prefer India-region latency for primary market |
| CI/CD | GitHub Actions | Lint, test, build on PR; deploy on main |

---

## Required Environment Variables

```
# Names only — never commit values
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
AUTH_SECRET=
# Add payment, SMS, and storage keys when integrations are confirmed
```

---

## Code Style

- **Language:** TypeScript (strict)
- **Formatter:** Prettier — project config
- **Linter:** ESLint — project config
- **Tests:** Jest or Vitest for unit; Playwright for critical E2E flows

---

## Non-Negotiables

- Never commit secrets or `.env` files with real values
- Write tests for new API routes (happy path + auth failure + validation failure)
- Database migrations must be reversible
- All user-facing copy must pass `bookphysio-in-voice` skill before merge
- Indian English (en-IN) in all product strings

---

## Deployment

- Staging smoke test required before production promote
- Run migrations before application deploy
- Rollback: revert deploy + migration down only if safe (document in ops runbook)

---

## Open items

- Lock auth provider and document as DECISION in client or agency `planning/decisions.md`
- Confirm production hosting region and CDN strategy
