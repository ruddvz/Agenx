# 🏢 Agenx — The AI Agency OS

**Deploy a full AI workforce for any company. Manage every client from one place.**

Agenx is a multi-client agency operating system built on top of [The Agency](https://github.com/msitarzewski/agency-agents) agent library. It adds three layers that the original repo doesn't have:

1. **Client workspaces** — each company gets its own `clients/[slug]/` folder with activated agents, a brand voice skill, a tech stack profile, and a live planning system
2. **Agency-level orchestration** — two new agents (`Agency Director`, `Agency Client Onboarder`) manage the portfolio, route work, and run client intake
3. **Company OS** — a `.claude/` skill system that gives every agent a shared rulebook, session handoff protocol, and token-efficient model routing

---

## What's Different From the Original Repo

| Feature | The Agency (original) | Agenx |
|---|---|---|
| Agent library | ✅ 200+ specialized agents | ✅ Same library, plus 2 new agency agents |
| Multi-client management | ❌ | ✅ `clients/` directory per client |
| Per-client voice/brand skill | ❌ | ✅ Voice guide template + example (BookPhysio.in) |
| Per-client tech stack profile | ❌ | ✅ Stack skill per client |
| Session handoff protocol | ❌ | ✅ CHANGELOG + ACTIVE per client |
| Product lifecycle gates | ❌ | ✅ 12-phase lifecycle enforcement |
| Orchestration brain | Partial | ✅ Agency Director + Orchestrator skills |
| Dashboard | ❌ | 🚧 Planned (see `docs/dashboard-architecture.md`) |

---

## 🗂 Repository Structure

```
Agenx/
│
├── clients/                        ← One folder per client company
│   ├── _template/                  ← Copy this when onboarding a new client
│   │   ├── README.md
│   │   ├── skills/
│   │   │   ├── voice.md            ← Brand voice + copy rules (fill in)
│   │   │   └── stack.md            ← Tech stack profile (fill in)
│   │   └── planning/
│   │       ├── ACTIVE.md
│   │       └── CHANGELOG.md
│   │
│   └── bookphysio-in/              ← Example: first real client
│       ├── README.md
│       ├── skills/
│       │   ├── voice.md            ← BookPhysio.in voice guide (complete)
│       │   └── stack.md
│       └── planning/
│           ├── ACTIVE.md
│           └── CHANGELOG.md
│
├── .claude/                        ← Company OS — shared agent rulebook
│   ├── workflow-101.md             ← Master 8-phase workflow
│   └── skills/
│       ├── core/                   ← Applies to every agent
│       │   ├── orchestrator.md
│       │   ├── handoff-protocol.md
│       │   ├── token-efficiency.md
│       │   ├── failure-handling.md
│       │   ├── agent-registry.md
│       │   ├── code-style.md
│       │   ├── communication.md
│       │   ├── company.md
│       │   └── self-audit.md
│       ├── team/                   ← Role-level skills
│       │   ├── frontend.md
│       │   ├── backend.md
│       │   ├── ops.md
│       │   └── data.md
│       ├── project/                ← Project-level skills
│       │   ├── architecture.md
│       │   ├── workflows.md
│       │   ├── decisions.md        ← Points to planning/decisions.md
│       │   └── lifecycle.md        ← 12-phase lifecycle gate
│       └── specialized/
│           └── humanizer-bookphysio.md  ← Legacy pointer (use clients/ now)
│
├── planning/                       ← Agency-internal planning
│   ├── decisions.md                ← Canonical decision log
│   ├── ACTIVE.md, CHANGELOG.md, EXECUTION-PLAN.md, PRODUCT-PHASES.md
│
├── academic/                       ┐
├── design/                         │
├── engineering/                    │
├── finance/                        │  200+ specialized agents
├── game-development/               │  (from The Agency)
├── marketing/                      │
├── paid-media/                     │
├── product/                        │
├── project-management/             │
├── sales/                          │
├── spatial-computing/              │
├── specialized/                    │  ← + Agency Director, Agency Client Onboarder
├── strategy/                       │
├── support/                        │
├── testing/                        ┘
│
├── planning/                       ← Agenx-internal planning (the agency itself)
│   ├── ACTIVE.md
│   ├── CHANGELOG.md
│   ├── EXECUTION-PLAN.md
│   └── PRODUCT-PHASES.md
│
├── dashboard/                      ← Next.js agency dashboard (npm run dev)
├── docs/
│   ├── client-voice-skill-template.md  ← Fill this in for every new client
│   ├── dashboard-architecture.md       ← Dashboard design + roadmap
│   ├── GETTING-STARTED.md
│   ├── how-to-add-skills.md
│   ├── skill-template.md
│   └── design-system-template.md
│
├── scripts/
│   ├── install.sh                  ← Install agents to any AI tool
│   ├── agency-install.sh           ← Install one client's agents + skills
│   ├── convert.sh                  ← Generate tool-specific integration files
│   ├── lint-agents.sh              ← Validate agent frontmatter
│   ├── generate-agents-index.sh    ← Build docs/AGENTS-INDEX.md
│   └── setup.sh                    ← Interactive Company OS setup
│
├── integrations/                   ← Generated tool outputs (run convert.sh)
├── archives/                       ← Original uploaded source files
├── memory/
│   └── context-log.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## ⚡ Quick Start

Full walkthrough: [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md)

### 1. Install agents to your AI tool

```bash
# Claude Code / Copilot — work from source (no convert step)
./scripts/install.sh --tool claude-code

# Other tools — generate integrations first, then install
./scripts/convert.sh
./scripts/install.sh
```

### 1b. Install a client workspace

```bash
./scripts/agency-install.sh --client bookphysio-in --tool claude-code
```

### 2. Activate the Agency Director

In Claude Code:
```
Activate Agency Director. I want to onboard a new client.
```

### 3. Onboard a new client

The Agency Client Onboarder will guide you through a ~20 min intake that produces:
- `clients/[slug]/skills/voice.md` — brand voice and copy rules
- `clients/[slug]/skills/stack.md` — tech stack profile
- `clients/[slug]/planning/ACTIVE.md` — first task queue
- `clients/[slug]/agents.manifest` — agent paths for install script
- `clients/[slug]/README.md` — client overview with agent roster

### 4. Set up the Company OS (optional but recommended)

```bash
bash scripts/setup.sh
```

Fills in placeholders in `.claude/skills/core/company.md` with your agency's name, stack, and rules.

---

## 🤖 The Two New Agency Agents

### 🏗️ Agency Client Onboarder (`specialized/agency-client-onboarder.md`)

Runs the new client intake interview. Asks about brand voice, tech stack, audience, and work scope. Scaffolds the complete `clients/[slug]/` workspace — with no placeholder text — from a single session.

**Use when:** A new company joins Agenx.

### 🎬 Agency Director (`specialized/agency-director.md`)

The portfolio orchestrator. Routes work requests to the right client and the right agent. Monitors delivery health across all clients. Flags blocked tasks, stale sessions, and missing voice skills before they become problems.

**Use when:** Assigning work, running a portfolio health check, or escalating a stuck agent.

---

## 🎭 The Full Agent Library

Agenx includes the complete roster from The Agency — 200+ specialists across 15 divisions:

| Division | Highlights |
|---|---|
| 💻 Engineering | Frontend, Backend, Mobile, AI, DevOps, Security, SRE, Data Engineer + more |
| 🎨 Design | UI Designer, UX Researcher, Brand Guardian, Whimsy Injector + more |
| 💰 Paid Media | PPC, Search Query Analyst, Ad Creative, Programmatic Buyer + more |
| 💼 Sales | Outbound Strategist, Deal Strategist, Sales Coach, Proposal Writer + more |
| 📢 Marketing | Growth Hacker, SEO, TikTok, LinkedIn, 15+ platform specialists |
| 📊 Product | Sprint Prioritizer, Product Manager, Trend Researcher + more |
| 🎬 Project Mgmt | Studio Producer, Project Shepherd, Jira Steward + more |
| 🧪 Testing | Reality Checker, Evidence Collector, API Tester, Accessibility Auditor + more |
| 🛟 Support | Support Responder, Analytics Reporter, Legal Compliance + more |
| 🥽 Spatial | XR Interface Architect, macOS Metal Engineer + more |
| 🎮 Game Dev | Unity, Unreal, Godot, Roblox, Blender specialists |
| 📚 Academic | Historian, Research Analyst + more |
| 💵 Finance | Financial Analyst + more |
| 🧩 Strategy | 16 strategy specialists |
| ⭐ Specialized | 41 agents including Agency Director, Agency Client Onboarder + more |

---

## 📋 Per-Client Voice Skills

Every client gets a `skills/voice.md` that tells copy-producing agents exactly how to write for that company. It covers:

- Non-negotiable rules (no em dashes, spelling standard, banned words)
- Brand voice for each audience
- Terminology standards (what do you call your users? your key actions?)
- 10+ before/after rewrite patterns for common AI copy problems
- A process checklist agents run before returning any output

**To create a new voice skill:** copy `docs/client-voice-skill-template.md` and fill it in. See `clients/bookphysio-in/skills/voice.md` for a complete real-world example.

---

## 🔄 Session Handoff Protocol

Every session ends with a CHANGELOG entry in `clients/[slug]/planning/CHANGELOG.md`:

```markdown
## YYYY-MM-DD HH:MM — branch-name — slice id: short title
- Commit: <sha> (type: subject)
- Files touched: path1, path2
- Build: pass | fail (reason)
- Status: done | wip | blocked (reason)
- Next up: slice id + short title
- Notes: gotchas, partial state, deferred decisions
```

`Next up:` is mandatory. Never leave it empty.

---

## 🖥️ Dashboard

Next.js app in [`dashboard/`](dashboard/) — reads `clients/` and agent markdown from the repo:

```bash
cd dashboard && npm install && npm run dev
```

- Portfolio overview, client detail (tasks + changelog), agent library, alerts
- Architecture: [`docs/dashboard-architecture.md`](docs/dashboard-architecture.md)

---

## 📖 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for agent design guidelines and the pull request process.

---

## 📄 License

MIT — see [LICENSE](LICENSE)
