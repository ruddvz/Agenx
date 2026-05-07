---
name: bookphysio-in-stack
description: |
  Tech stack, deployment targets, environment variables, and project-specific
  constraints for BookPhysio.in. Agents read this before writing any code.
metadata:
  agenx-client: bookphysio-in
---

# BookPhysio.in — Stack & Technical Standards

## Core Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | [e.g. React 18, Next.js 14] | [e.g. App Router, Tailwind CSS] |
| Backend | [e.g. Node.js, Laravel, Django] | [e.g. REST / GraphQL] |
| Database | [e.g. PostgreSQL 15] | [e.g. hosted on Supabase] |
| Auth | [e.g. Clerk, Auth0, custom JWT] | |
| Hosting | [e.g. Vercel, AWS, GCP] | [region] |
| CI/CD | [e.g. GitHub Actions] | |

---

## Required Environment Variables

```
[LIST_ENV_VARS_HERE]
```

---

## Code Style

- **Language:** [TypeScript / Python / PHP / etc.]
- **Formatter:** [Prettier / Black / etc.] — config at [path]
- **Linter:** [ESLint / Pylint / etc.] — config at [path]
- **Tests:** [Jest / Pytest / PHPUnit / etc.]

---

## Non-Negotiables

- [e.g. Never commit secrets]
- [e.g. Always write tests for new API endpoints]
- [e.g. All DB migrations must be reversible]

---

## Deployment

```bash
# Staging
[deployment command]

# Production
[deployment command]
```
