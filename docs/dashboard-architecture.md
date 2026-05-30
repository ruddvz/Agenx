# Agenx Dashboard — Architecture Proposal

> **MVP shipped** in `dashboard/` (filesystem mode). GitHub API writes and onboarding wizard are still planned.

---

## What the Dashboard Needs to Do

The Agenx dashboard is the control surface for the agency. It surfaces the state of every client, lets account managers assign work, track progress, and onboard new clients — without touching git or markdown directly.

**Core capabilities (MVP):**

| Capability | Description |
|---|---|
| Client roster | List of all client workspaces with status (active / setup / paused) |
| Per-client health | Live view of ACTIVE.md tasks and last CHANGELOG entry |
| Agent roster | Full library of 200+ agents, searchable by division and capability |
| Client-agent mapping | Which agents are activated for each client |
| Onboarding flow | Guided intake form → generates client workspace files via API |
| Session log | Timeline of all CHANGELOG entries across clients |
| Alert feed | Blocked tasks, stale sessions, missing voice skills |

**Out of scope for MVP:**
- Agent execution (agents run in Claude Code / other tools, not in the dashboard)
- Billing / invoicing
- Client-facing portal (this is an internal agency tool first)

---

## Approach Options

### Option A — Static site over the git repo (recommended for MVP)

**How it works:**
- The dashboard reads the `clients/` directory structure from the GitHub API or a local git clone
- Renders client status, ACTIVE.md contents, and CHANGELOG summaries as a web UI
- Write operations (creating/updating files) happen via the GitHub API (commits)
- No separate backend database — the git repo IS the database

**Stack suggestion:**
- Next.js 14 (App Router) — deployed on Vercel
- GitHub REST API (Octokit) for reads and commits
- Tailwind CSS + shadcn/ui for UI components
- Auth: Clerk (team SSO, multiple account managers)

**Pros:** Zero new infrastructure; git is the source of truth; every change is audited
**Cons:** GitHub API rate limits if many clients; latency on file reads (use caching)

---

### Option B — Headless CMS + git sync

**How it works:**
- Client data lives in a CMS (Notion, Sanity, or Airtable) as a structured database
- A sync script writes CMS data back to `clients/*/` markdown files on save
- Dashboard reads from CMS (fast, structured queries)

**Pros:** Rich querying, better for non-technical account managers
**Cons:** Two sources of truth (CMS + git); sync complexity; extra cost

---

### Option C — Full-stack app with its own database

**How it works:**
- PostgreSQL/Supabase stores client data, agent assignments, task state
- Git integration is one-way export (optional)
- Dashboard is a full CRUD app

**Pros:** Most powerful, most scalable
**Cons:** Most complex; overkill for the first 5-10 clients; loses the "git is truth" simplicity

---

## Recommendation

**Start with Option A.** Build the dashboard as a Next.js app that reads and writes to the `clients/` directory in this repo via the GitHub API. This means:

- The agent files and client workspaces stay as plain markdown (usable directly in Claude Code without the dashboard)
- The dashboard is additive — it doesn't lock you into a proprietary format
- You can migrate to Option C later when client volume justifies it

---

## Proposed File Structure (Option A)

```
dashboard/                          ← Next.js app (separate repo or /dashboard subfolder)
├── app/
│   ├── page.tsx                    ← Client roster overview
│   ├── clients/
│   │   ├── page.tsx                ← All clients list
│   │   ├── [slug]/
│   │   │   ├── page.tsx            ← Client detail: health, tasks, agents
│   │   │   ├── onboarding/
│   │   │   │   └── page.tsx        ← Intake form → generates workspace files
│   │   │   └── agents/
│   │   │       └── page.tsx        ← Agent roster for this client
│   ├── agents/
│   │   └── page.tsx                ← Global agent library (searchable)
│   └── alerts/
│       └── page.tsx                ← Blocked tasks, stale sessions
├── lib/
│   ├── github.ts                   ← GitHub API client (Octokit)
│   ├── clients.ts                  ← Parse clients/*/README.md → typed objects
│   ├── planning.ts                 ← Parse ACTIVE.md, CHANGELOG.md
│   └── agents.ts                   ← Parse agent .md files → searchable index
└── components/
    ├── ClientCard.tsx
    ├── HealthBadge.tsx
    ├── AgentPicker.tsx
    ├── TaskList.tsx
    └── OnboardingWizard.tsx
```

---

## Data Model (from markdown files)

```typescript
interface Client {
  slug: string;           // "bookphysio-in"
  name: string;           // "BookPhysio.in"
  industry: string;
  market: string;
  status: "active" | "setup" | "paused" | "offboarded";
  onboardedAt: string;
  agents: AgentRef[];
  skills: SkillRef[];
}

interface Task {
  text: string;
  status: "blocked" | "in_progress" | "up_next" | "done";
  owner?: string;
}

interface ChangelogEntry {
  date: string;
  branch: string;
  sliceId: string;
  title: string;
  status: "done" | "wip" | "blocked";
  nextUp: string;
  notes?: string;
}

interface Agent {
  name: string;
  description: string;
  division: string;
  emoji: string;
  color: string;
  vibe: string;
  filePath: string;
}
```

---

## MVP Build Sequence

1. **Parse layer** — `lib/github.ts`, `lib/clients.ts`, `lib/planning.ts`, `lib/agents.ts`
2. **Client roster page** — list all clients with status badges
3. **Client detail page** — ACTIVE tasks + last 3 CHANGELOG entries + activated agents
4. **Agent library page** — searchable/filterable grid of all 200+ agents
5. **Alert feed** — blocked tasks, stale sessions, missing voice skills
6. **Onboarding wizard** — intake form → generates `clients/[slug]/` files via GitHub API commit

---

## Questions to Resolve Before Building

1. **Separate repo or monorepo?** The dashboard could live in `/dashboard` in this repo, or as `ruddvz/agenx-dashboard`. Recommendation: start in this repo for simplicity, extract later.
2. **Who uses the dashboard?** Internal Agenx account managers only? Or do client contacts get read-only access?
3. **Auth scope:** Just you + your team for now, or multi-org from day one?
4. **Agent execution:** Do you ever want to trigger an agent run from the dashboard? (This would require MCP/API integration and is out of scope for MVP.)
