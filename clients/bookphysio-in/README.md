# BookPhysio.in — Agenx Client Workspace

**Client slug:** `bookphysio-in`
**Industry:** HealthTech / Practice Management
**Primary market:** India
**Onboarded:** 2026-05
**Status:** active

---

## About This Client

BookPhysio.in connects patients with physiotherapists across India. The product serves two audiences: patients who need to find and book a physiotherapist, and physiotherapy clinics or independent practitioners who manage their practice on the platform. Copy and agents must work for both audiences without conflating them.

**Product URL:** https://bookphysio.in
**Language:** Indian English (en-IN)

---

## Deployed Agents

| Agent | Source file | Customised? | Notes |
|---|---|---|---|
| Frontend Developer | `engineering/engineering-frontend-developer.md` | No | React / React Native stack |
| Backend Architect | `engineering/engineering-backend-architect.md` | No | Node.js + PostgreSQL |
| UI Designer | `design/design-ui-designer.md` | No | — |
| Support Responder | `support/support-support-responder.md` | Yes | See skills/voice.md for tone rules |
| Content Creator | `marketing/marketing-content-creator.md` | Yes | See skills/voice.md for language rules |
| Product Manager | `product/product-manager.md` | No | — |
| App Store Optimizer | `marketing/marketing-app-store-optimizer.md` | No | Google Play + App Store |

---

## Client-Specific Skills

| Skill file | Purpose |
|---|---|
| `skills/voice.md` | Full BookPhysio.in brand voice guide — terminology, copy rules, 16 rewrite patterns |
| `skills/stack.md` | Tech stack and deployment standards (fill in) |

---

## Quick Start

```bash
# Copy BookPhysio.in agents into Claude Code (adds global voice skill automatically)
cp clients/bookphysio-in/skills/voice.md ~/.claude/agents/bookphysio-voice.md

# Or use the agency install script (when built)
./scripts/agency-install.sh --client bookphysio-in --tool claude-code
```

---

## Planning

| File | Contents |
|---|---|
| `planning/ACTIVE.md` | Live task queue |
| `planning/CHANGELOG.md` | Session handoff log |
