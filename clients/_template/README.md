# [CLIENT_NAME] — Agenx Client Workspace

**Client slug:** `[client-slug]`
**Industry:** [e.g. HealthTech, E-Commerce, SaaS, Logistics]
**Primary market:** [e.g. India, US, EU]
**Onboarded:** YYYY-MM-DD
**Status:** active | setup | paused | offboarded

---

## About This Client

[2-3 sentences describing who the client is, what their product does, and who it serves.]

**Product URL:** https://[client-domain]
**Internal contact:** [name / role]

---

## Deployed Agents

List every Agenx agent activated for this client. Link to the source agent file and note any client-specific customisation.

| Agent | Source file | Customised? | Notes |
|---|---|---|---|
| Frontend Developer | `engineering/engineering-frontend-developer.md` | No | — |
| [Add more rows] | | | |

---

## Client-Specific Skills

Skills in `clients/[client-slug]/skills/` override or extend the global agent behaviour for this client only.

| Skill file | Purpose |
|---|---|
| `skills/voice.md` | Brand voice, terminology, copy rules |
| `skills/stack.md` | Tech stack, deployment targets, env vars |
| [Add more rows] | |

---

## Quick Start

```bash
# Install this client's agents + voice/stack skills
./scripts/agency-install.sh --client [client-slug] --tool claude-code
```

Edit `agents.manifest` to list agent paths (one per line), then run the command above.

---

## Planning

| File | Contents |
|---|---|
| `planning/ACTIVE.md` | Live task queue |
| `planning/CHANGELOG.md` | Session handoff log |
| `planning/EXECUTION-PLAN.md` | Client roadmap with checkboxes |
| `agents.manifest` | Agent file paths for `agency-install.sh` |
