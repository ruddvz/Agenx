# Getting Started with Agenx

Follow this order on a **fresh clone**.

## 1. Company OS (optional, recommended)

```bash
bash scripts/setup.sh
```

Fills agency name and npm commands in `.claude/skills/core/company.md`.

## 2. Generate tool integrations

Required for Cursor, Gemini CLI, OpenClaw, and most tools except Claude Code and Copilot:

```bash
./scripts/convert.sh
```

## 3. Install agents

```bash
./scripts/install.sh --tool claude-code
# or: ./scripts/install.sh   # all detected tools
```

## 4. Install a client workspace

```bash
./scripts/agency-install.sh --client bookphysio-in --tool claude-code
```

Installs roster agents plus `bookphysio-in-voice` and `bookphysio-in-stack` skills.

## 5. Activate agency orchestration

In Claude Code:

```
Activate Agency Director. Run a portfolio health check.
```

## 6. Onboard a new client

```
Activate Agency Client Onboarder. I want to onboard a new client.
```

Produces `clients/[slug]/` with voice, stack, planning, and `agents.manifest`.

## Key files

| File | Purpose |
|------|---------|
| `planning/decisions.md` | Canonical decision log |
| `planning/ACTIVE.md` | Agency task queue |
| `clients/[slug]/skills/voice.md` | Brand voice for copy agents |
| `clients/[slug]/agents.manifest` | Agent paths to install per client |
| `scripts/lint-agents.sh` | Validate agent markdown |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `integrations/ missing` | Run `./scripts/convert.sh` |
| Install copies strategy playbooks | Fixed — strategy is docs only, not in agent dirs |
| Client install not found | Use `./scripts/agency-install.sh --client <slug>` |
| Decisions file missing | Use `planning/decisions.md` |
