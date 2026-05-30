# Agenx Dashboard

Internal agency control surface for client workspaces, agent library, and delivery health.

Reads markdown from the parent repository (`clients/`, agent divisions, planning files) at request time.

## Run locally

From the **repository root**:

```bash
cd dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`AGENX_REPO_ROOT` defaults to `..` (monorepo root). Override if the dashboard runs elsewhere:

```bash
AGENX_REPO_ROOT=/path/to/Agenx npm run dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Portfolio overview + top alerts |
| `/clients` | All client workspaces |
| `/clients/[slug]` | Tasks, changelog, agents, skills |
| `/agents` | Searchable agent library (~180 agents) |
| `/alerts` | Blocked tasks, stub skills, stale logs |

## Deploy (Vercel)

1. Set **Root Directory** to `dashboard`
2. Ensure the full monorepo is deployed (so `../clients` exists) or set `AGENX_REPO_ROOT`
3. For GitHub-only reads later: set `GITHUB_TOKEN` + `GITHUB_REPO` (not yet implemented)

## Stack

- Next.js 15 App Router
- Tailwind CSS
- Filesystem data source (Option A from `docs/dashboard-architecture.md`)
