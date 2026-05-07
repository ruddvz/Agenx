# Execution Plan

> Phase-based roadmap. Check off slices as you ship them.
> Agents reference this file to find their current slice id.
> Format: `[ ]` pending · `[x]` done · `[~]` partial/blocked

---

## How to Use This File

1. **At session start:** Scan for the current unchecked slice in the active phase
2. **After shipping:** Mark the slice `[x]`
3. **When blocked:** Mark `[~]` and add a note explaining the block
4. **Adding work:** Add new slices at the bottom of the relevant phase
5. **Slice ids:** Use format `Phase.Slice` (e.g. `1.1`, `2.3`, `16.5`)

---

## Phase 0 — Project Setup

- [x] **0.1** Initialize Claude Company OS
- [ ] **0.2** Fill in `skills/core/company.md` with real company details
- [ ] **0.3** Fill in `skills/project/architecture.md` with real architecture
- [ ] **0.4** Fill in `skills/project/workflows.md` with real commands
- [ ] **0.5** Fill in `planning/EXECUTION-PLAN.md` with real phases
- [ ] **0.6** Set current lifecycle phase in `planning/PRODUCT-PHASES.md` — confirm which of the 12 phases the project is actually in right now
- [ ] **0.7** Write DECISION entries for any phases already completed before OS was added

---

## Phase 1 — [Your Phase Name]

> **Goal:** [What does completion of this phase deliver?]

- [ ] **1.1** [Slice title] — [1-line description]
- [ ] **1.2** [Slice title] — [1-line description]
- [ ] **1.3** [Slice title] — [1-line description]

---

## Phase 2 — [Your Phase Name]

> **Goal:** [What does completion of this phase deliver?]

- [ ] **2.1** [Slice title] — [1-line description]
- [ ] **2.2** [Slice title] — [1-line description]

---

## Phase 3 — [Your Phase Name]

> **Goal:** [What does completion of this phase deliver?]

- [ ] **3.1** [Slice title] — [1-line description]

---

## Done (Summary)

| Phase | Slices | Shipped | Date |
|-------|--------|---------|------|
| Phase 0 | 5 | 1 | [date] |

---

## Notes

- Slice ids are referenced in `planning/CHANGELOG.md` entries — keep them stable
- Don't renumber completed slices — add new ones at the bottom
- If a slice turns out to be much larger than expected, split it: `1.2a`, `1.2b`, etc.
