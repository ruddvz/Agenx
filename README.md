# Agenx

**A complete AI agency operating system — give your project a shared brain.**

Agenx combines Claude Company OS v2 with a growing library of specialized skills. Every Claude session follows the same standards, every agent knows your stack, and every handoff is documented so the next session picks up instantly.

---

## What's Here

| Component | What it does |
|---|---|
| **Claude Company OS v2** | 28+ specialized agents, an 8-phase development workflow, 12-phase product lifecycle gates, session handoffs, and token-efficient model routing |
| **Humanizer skill** | Removes AI-generated writing patterns from BookPhysio.in copy — enforces Indian English, active voice, and brand voice for patient and clinic audiences |

---

## Folder Structure

```
Agenx/
├── .claude/
│   ├── workflow-101.md              ← Master 8-phase workflow (read first)
│   └── skills/
│       ├── core/                   ← Applies to every agent, every task
│       │   ├── company.md          ← Stack, rules, non-negotiables
│       │   ├── code-style.md       ← Formatting, naming, patterns
│       │   ├── communication.md    ← Writing standards, PRs, error messages
│       │   ├── orchestrator.md     ← Multi-agent coordination
│       │   ├── handoff-protocol.md ← How agents pass work to each other
│       │   ├── failure-handling.md ← Three-attempts-then-escalate rule
│       │   ├── token-efficiency.md ← Model routing (Haiku / Sonnet / Opus)
│       │   ├── agent-registry.md   ← Full roster of available agents
│       │   └── self-audit.md       ← Agent self-check protocol
│       ├── team/                   ← One file per role
│       │   ├── frontend.md
│       │   ├── backend.md
│       │   ├── ops.md
│       │   └── data.md
│       ├── project/                ← This project's context
│       │   ├── architecture.md     ← System design and key decisions
│       │   ├── workflows.md        ← Step-by-step playbooks
│       │   ├── decisions.md        ← Why things are the way they are
│       │   └── lifecycle.md        ← 12-phase gate enforcement
│       └── specialized/            ← Domain-specific skills
│           └── humanizer-bookphysio.md  ← BookPhysio.in voice & copy rules
├── planning/
│   ├── ACTIVE.md                   ← Live task queue
│   ├── CHANGELOG.md                ← Session handoff log (newest first)
│   ├── EXECUTION-PLAN.md          ← Phase-based roadmap with checkboxes
│   └── PRODUCT-PHASES.md          ← 12-phase lifecycle gates
├── memory/
│   └── context-log.md              ← Shared persistent memory across sessions
├── docs/
│   ├── how-to-add-skills.md
│   ├── skill-template.md
│   └── design-system-template.md
├── scripts/
│   └── setup.sh                    ← Interactive setup script
└── archives/
    ├── company-os-v2-with-lifecycle.zip
    └── humanizer-bookphysio.skill
```

---

## Quick Start

### 1. Run setup

```bash
bash scripts/setup.sh
```

The setup script asks for your company name, tech stack, and team roles, then fills in placeholders across all skill files automatically.

### 2. Fill in the gaps

| File | What to add |
|---|---|
| `.claude/skills/core/company.md` | Non-negotiables specific to your team; folder structure |
| `.claude/skills/core/code-style.md` | Your formatter config; naming conventions |
| `.claude/skills/team/frontend.md` | Design tokens (colors, fonts, spacing) |
| `.claude/skills/team/backend.md` | ORM, auth provider, required env vars |
| `.claude/skills/project/architecture.md` | System diagram; data model; key decisions |
| `planning/EXECUTION-PLAN.md` | Your initial roadmap phases and slices |

### 3. Commit

```bash
git add .claude/ planning/ memory/
git commit -m "feat: initialize Agenx"
```

---

## The 8-Phase Workflow

Every feature goes through these phases. Full details in `.claude/workflow-101.md`.

| Phase | Name | What happens |
|---|---|---|
| 0 | Context | Read CHANGELOG, ACTIVE, EXECUTION-PLAN before anything |
| 1 | Planning | Blast-radius check, feature branch, planner agent |
| 2 | TDD Setup | Write failing tests first |
| 3 | Execution | Implement, go green, refactor |
| 4 | Verification | Build + tests + E2E |
| 5 | Quality Review | code-reviewer + security-reviewer in parallel |
| 6 | Docs & Memory | Update codemaps, EXECUTION-PLAN, ACTIVE |
| 7 | Wrap-up | Ask user for next step |
| 8 | Safe Push | Build → lint → test → diff scan → commit → push |

---

## Session Handoff Protocol

After every commit, add an entry to `planning/CHANGELOG.md`:

```markdown
## YYYY-MM-DD HH:MM — branch-name — slice id: short title
- Commit: <sha> (type: subject)
- Files touched: path1, path2
- Tests added/changed: count (file)
- Build: pass | fail (reason)
- Status: done | wip | blocked (reason)
- Next up: slice id + short title OR explicit question for next agent
- Notes: gotchas, partial state, deferred decisions
```

`Next up:` is mandatory. Never leave it empty.

---

## Adding New Skills

See `docs/how-to-add-skills.md` for the full guide.

Short version:
1. Copy `docs/skill-template.md` to `.claude/skills/<subfolder>/`
2. Fill in the template
3. PR → review → everyone benefits immediately

---

## Token Efficiency

| Tier | Model | When to use |
|---|---|---|
| T1 | Haiku | File ops, git, boilerplate, simple CRUD |
| T2 | Sonnet | Multi-file features, debugging, reviews (80% of work) |
| T3 | Opus | Architecture, security audits, gnarly bugs Sonnet failed |

Full routing rules in `.claude/skills/core/token-efficiency.md`.
