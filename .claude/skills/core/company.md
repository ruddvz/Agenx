---
name: company-core
description: >
  Core company context, values, and non-negotiable rules that apply to ALL work.
  This is the foundation of the Claude Company OS — always load this skill first.
  It defines who this company is, how it operates, what stack it uses, and what
  agents must never do regardless of task type. If you only fill in one skill
  file, make it this one.
---

# Company Core

## Who We Are

**Company name:** [YOUR COMPANY NAME]
**What we build:** [ONE SENTENCE — what your product/service does]
**Who we serve:** [Your primary customers or users]
**Stage:** [e.g. pre-launch / live in production / scaling]

---

## Our Tech Stack

**Primary language(s):** [e.g. TypeScript, Python]
**Frontend:** [e.g. Next.js 16 App Router, React 19, Tailwind CSS v4]
**Backend:** [e.g. Next.js API routes, Node.js, FastAPI]
**Database:** [e.g. PostgreSQL via Supabase, MongoDB]
**Auth:** [e.g. Supabase Auth, Clerk, NextAuth]
**Payments:** [e.g. Stripe, Razorpay]
**Email:** [e.g. Resend, SendGrid]
**Infra / hosting:** [e.g. Vercel, AWS, Railway]
**Testing:** [e.g. Vitest, Jest, Playwright]
**Key services:** [e.g. Supabase, Resend, Stripe, Vercel Analytics]

---

## Project Structure

```
[Paste your main folder structure here. Example:]

src/
├── app/          ← Next.js pages and API routes (App Router)
│   ├── (auth)/   ← Protected routes
│   ├── api/      ← API route handlers
│   └── ...
├── components/   ← Reusable UI components
│   ├── shared/   ← Team-owned shared components (read-only for most agents)
│   └── ...
├── lib/          ← Utilities, service clients, validation schemas
├── types/        ← TypeScript type definitions
└── hooks/        ← Custom React hooks
```

---

## Non-Negotiable Rules

These apply to every task, every file, every time:

1. **Never break existing functionality.** If a change might affect other parts of the app, flag it before implementing.
2. **No hardcoded secrets.** API keys, credentials, and env vars always go in `.env`. Never committed to git.
3. **No silent failures.** Every async operation must have error handling. Never swallow errors.
4. **Write for humans first.** Code is read more than it is written. Clarity beats cleverness.
5. **Server Components by default.** `'use client'` only when hooks, refs, or animation lifecycles demand it.
6. **All user input validated with Zod schemas** at system boundaries.
7. **Immutable data patterns.** Never mutate state in place — return new copies.
8. **Files max 800 lines, functions max 50 lines.**
9. **[Add your own non-negotiable here]**

---

## What We Never Do

- Do not refactor working code unless explicitly asked
- Do not install new dependencies without confirming with the team
- Do not delete files or data without explicit instruction
- Do not make assumptions about business logic — ask if unclear
- Do not push directly to main — always use feature branches + PRs
- Do not hardcode values that belong in environment variables
- [Add your own "never do" here]

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files (components) | PascalCase | `UserCard.tsx` |
| Files (utils) | camelCase | `formatDate.ts` |
| Variables | camelCase | `const userId` |
| Constants | SCREAMING_SNAKE | `MAX_RETRIES` |
| Database tables | snake_case, plural | `user_profiles` |
| CSS classes | kebab-case | `main-container` |
| API routes | lowercase, hyphens | `/api/user-profiles` |
| Branches | kebab-case | `feat/add-booking-flow` |

---

## Environment Setup

```bash
# Install dependencies
npm install   # or: pnpm install / bun install

# Copy environment template
cp .env.example .env

# Run dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Key environment variables needed:
# [LIST REQUIRED ENV VARS — no values, just names]
# DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
# RESEND_API_KEY, STRIPE_SECRET_KEY, etc.
```

---

## How We Use Claude Code

- **Phase 0 always:** Read `planning/CHANGELOG.md`, `planning/ACTIVE.md`, `planning/EXECUTION-PLAN.md` before starting any task
- **Read relevant skill files** before starting a task in that domain
- **If a task spans multiple domains** (e.g. frontend + database), read both skill files
- **When in doubt about a business decision**, stop and ask — do not invent logic
- **Prefer editing existing patterns** over introducing new ones
- **Update CHANGELOG.md** after every commit — this is mandatory
- **Commit every logical slice** — a slice = a commit = a CHANGELOG entry

---

## Domain Routing

| Task type | Primary agent | Notes |
|---|---|---|
| New feature (3+ files) | `planner` → domain agents | Plan before code |
| API route | `bp-backend` or domain backend | Security review mandatory |
| UI component | `bp-ui-*` or domain frontend | Mobile-first |
| DB schema/migration | `database-reviewer` | RLS + indexes required |
| Auth/payments | `security-reviewer` | Never skip |
| Build failure | `build-error-resolver` | First, don't guess |
| Tests | `tdd-guide` | Write tests first |
