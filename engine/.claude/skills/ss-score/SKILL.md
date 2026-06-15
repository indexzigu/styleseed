---
name: ss-score
description: Score a UI file's design quality 0-100 against StyleSeed's design language — per-category breakdown, the worst offenders, and a prioritized fix list. A quantified version of /ss-review.
argument-hint: "[file-path or directory]"
allowed-tools: Read, Grep, Glob, Bash
---

# Design Score

`/ss-review` tells you *what's wrong*. `/ss-score` tells you *how good it is
overall* and *what to fix first* — a single number plus a category breakdown, so
you can track UI quality like you track test coverage.

## When NOT to use

- For a quick pass/fail before committing → use `/ss-lint`
- For a full prose audit with fixes → use `/ss-review`
- For non-UI files (logic, config) — scoring is meaningless

## What to score

Score the file (or each file in a directory) on **six weighted categories** that
map to the design language. Total = 100.

| Category | Weight | Reads from |
|---|---|---|
| **Color discipline** | 20 | DESIGN-LANGUAGE §1, §18, §72 |
| **Hierarchy & typography** | 20 | §2, §3, §4, §16 + Font Size table |
| **Layout & rhythm** | 15 | §13, §14, §15, §61 |
| **Cards & elevation** | 15 | §7, §8, §12, §1 |
| **States & a11y** | 20 | §11, §70, §71, §72 |
| **Motion & interaction** | 10 | §24, §59 + `engine/motion` |

## How to score each category

For each category, start at full marks and **subtract** for violations you find by
reading the code. Be specific and evidence-based — cite the line.

**Color discipline (20)** — deduct for: any `#000`/`text-black` (−4 each, cap −8);
more than one accent hue used decoratively (−5); hardcoded hex where a semantic
token exists (−2 each, cap −6); status conveyed by color alone (−4).

**Hierarchy & typography (20)** — deduct for: number/unit not ~2:1 (−4); font
sizes off the Font Size table / `text-[var(--…)]` for size (−5); everything the
same weight, no clear primary (−5); cramped or wrong line-height on body (−3).

**Layout & rhythm (15)** — deduct for: content on bare background, not in cards
(−6); `px-4`/`px-8`/`mx-4` instead of `px-6`/`mx-6` (−3); same section type
repeated in a row (−4); no `space-y-6` rhythm (−3).

**Cards & elevation (15)** — deduct for: 1px borders doing separation work that
tone+shadow should (−4); shadows over ~8% opacity / visibly heavy (−4); no
card/background tone separation (−5).

**States & a11y (20)** — deduct for: missing empty/loading/error state on a data
surface (−5 each, cap −10); contrast below 4.5:1 body / 3:1 large (−6); touch
target < 44px (−4); no visible focus / `outline:none` (−5); icon-only control
without `aria-label` (−3).

**Motion & interaction (10)** — deduct for: random/ad-hoc fades instead of a named
seed/keyword (−3); motion that delays content or blocks an action (−4); no
`prefers-reduced-motion` handling on custom motion (−3); scroll-linked/parallax
(forbidden, §59) (−5).

Clamp each category at 0. Sum to a total.

## Output format

```
## Design Score: 72 / 100   (src/app/Dashboard.tsx)

█████████████████░░░░░  C+

Color discipline      14/20   ▓▓▓░  #000 headings (l.12,40); orange+blue+green accents (l.28-34)
Hierarchy & typography 16/20  ▓▓▓▓  number/unit 1:1 on hero (l.18)
Layout & rhythm        12/15  ▓▓▓░  two identical KPI rows (l.22-31)
Cards & elevation      10/15  ▓▓░░  1px borders doing separation (l.22)
States & a11y          12/20  ▓▓░░  no empty/loading state; focus ring missing (l.55)
Motion & interaction    8/10  ▓▓▓░  default fade, not a named seed

### Fix first (highest score gain)
1. Replace #000 → #2A2A2A and collapse to one accent  → +6 color  (§3, §2)
2. Add empty + loading states to the orders list       → +10 states (§71)
3. Drop the 1px borders, use tone + ≤8% shadow         → +4 cards  (§7)

Re-score after: ~92 / 100.
```

Use letter bands: 90+ A · 80-89 B · 70-79 C · 60-69 D · <60 F.

## Rules

- **Read the file** — score from real evidence (line numbers), never guess.
- Order the "fix first" list by **score gain**, not by severity alone — the goal
  is the fastest path to a better number.
- For a directory, print a one-line score per file, then the lowest-scoring file's
  full breakdown.
- Don't auto-edit. `/ss-score` measures; `/ss-review` and `/ss-motion` fix.
- The score is a guide, not a gate — a 78 that ships beats a 95 that doesn't.
