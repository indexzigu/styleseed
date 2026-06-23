# StyleSeed — design rules for any coding agent

This is the cross-agent entry point. **Codex, Amp, Gemini CLI, Windsurf, Cline, and
any tool that follows the `AGENTS.md` convention read this file automatically.**
Claude Code users get the same rules from `CLAUDE.md` (identical content, deeper API
reference). Cursor users: these same rules live in `.cursorrules`.

StyleSeed is a **design engine**: it teaches you (the agent) the *judgment* to build
professional UI — not just components, but which decision to make and why. When you
build any UI, dashboard, page, or component in this project, follow the rules below.

## Golden Rules (NEVER break these)

```
 1. All content inside cards — NEVER on bare page background
 2. Single accent color (--brand) — everything else grayscale
 3. No pure black (#000) — darkest text is defined by the skin (~#2A2A2A)
 4. Numbers 2:1 with units — 48px number + 24px unit, always
 5. space-y-6 between sections · mx-6 for single cards · px-6 for grids
 6. Never repeat the same section type consecutively — create visual rhythm
 7. Card shadows ≤ 8% opacity — if visible, it's too strong
 8. Touch targets ≥ 44×44px — no tiny tap areas
 9. Semantic tokens only (text-brand, bg-card) — NEVER hardcode hex in components
10. Font sizes from the "Font Size by Context" table ONLY — don't guess
11. After generating ANY page → review it against these rules (or run /ss-review)
```

**The coherence meta-rule (the #1 fix for "looks AI-generated"):** for each axis —
corner radius, accent color, shadow, spacing unit, icon style — pick ONE value and
apply it everywhere. Mixing an axis (sharp card + pill buttons, two accents) is the
fastest tell of un-designed UI. See `VISUAL-CRAFT.md` §C0.

## When to read which file

- **`CLAUDE.md`** — tokens, component API, imports, forbidden patterns. Reference while coding.
- **`DESIGN-LANGUAGE.md`** — the 74 visual rules + composition recipes. Read **before** building a page (start with the Table of Contents, then rules 14, 18, 19, 61-63).
- **`VISUAL-CRAFT.md`** — research-backed craft + the coherence laws (one choice per axis, layered shadows, nested-radius law, type recipe by app type). Read when a UI "looks off" but you can't say why.
- **`APP-PLAYBOOKS.md`** — how to bias the rules for the app's domain (fintech, SaaS, e-commerce, social…). Read right after you know what kind of app this is.
- **`PAGE-TYPES.md`** — how to bias for the screen type (dashboard / form / landing / detail / list / settings). Domain × page-type = the actual judgment.
- **`METHODOLOGY.md`** — the *why* behind the rules (info density, hierarchy, motion vibe vocabulary).

## Design Lock — read this EVERY prompt before building UI

The #1 cause of "the design looks random / different every time" is that design decisions
live only in chat memory and drift. Fix with a project design-lock file:

1. **Look for `STYLESEED.md` in the project root.** If it exists, it is the source of truth —
   obey it every prompt; never add a second accent, a different radius, or an off-lock color.
2. **If it doesn't exist, run Quick Setup (below) and WRITE it** before scaffolding:

```markdown
# StyleSeed — Design Lock
- App domain:        fintech
- Skin:              toss            # or "custom"
- Key color (accent): #3182F6        # the ONLY accent — everything else greyscale
- Radius personality: soft (12px)    # sharp 0-4 | soft 8-12 | pill — one everywhere
- Motion seed:       Spring          # Spring | Silk | Snap | Float | Pulse
- Type:              Inter + Pretendard · KPI 48/24
```

When the user later says "make it more X," update the lock *and* the UI together. The lock is
what keeps the result consistent across prompts — without it, even perfect rules drift.

## Quick Setup — do this BEFORE building (consistency comes from constraints)

If the user just said "apply StyleSeed and build X," don't start coding yet. Polished,
*consistent* output comes from constraints — the more you pin down first, the less the
result varies. **If your tool has a plan/ask mode, use it**: decide the choices below
**one at a time, with the user, holding the full design context**, then build. This is the
single biggest reason a result looks intentional instead of "colors went in at random, no
key color."

1. **App type** — fintech / SaaS / e-commerce / social / content / productivity / health /
   dev-tools. Bias the rules per `APP-PLAYBOOKS.md`.
2. **Accent (key color)** — ask for a brand color; if none, recommend by domain (fintech
   `#3182F6` · SaaS `#5E6AD2` · e-commerce `#FF6B35` · social `#FF4E8B` · content `#635BFF` ·
   health `#10B981` · dev-tools `#8B5CF6`). **One accent only; everything else greyscale.**
   Or pick a skin (Toss/Stripe/Linear/Notion/Raycast/Arc/Vercel).
3. **Motion seed** — Spring (Toss/Arc) · Silk (Stripe/Notion) · Snap (Linear/Raycast/Vercel) ·
   Float · Pulse. Per moment: CTA→spring press, modal→silk, list→stagger, balance/number→none.
4. **Write `STYLESEED.md` (the lock), build, then check** — save the choices to the lock file
   so they persist, apply the full rules (read `DESIGN-LANGUAGE.md` + `VISUAL-CRAFT.md`, not a
   summary), self-check coherence (one radius, one accent, real states; VISUAL-CRAFT §C0).

Confirm each choice before building. **More constraints = less variance.** For the most
consistent results, copy the rule files into the project so they're re-read every prompt —
a one-shot URL read drifts mid-session.

## Quality Gate — run this BEFORE showing the user ANY UI (non-negotiable)

Generating the UI is not "done." Before presenting it, it must pass the gate — the difference
between "looks generated" and "looks designed." Never show UI that hasn't passed.

```
□ Coherence  — ONE accent (no 2nd hue, NO emoji icons, no decorative color), ONE radius,
               ONE shadow, ONE icon set
□ Color=meaning — normal/OK/"보통" rows GREY; color only the minority needing attention; no
               rainbow list; same value → same color
□ Hierarchy  — one clear primary; numbers 2:1 with unit
□ Layout     — content in cards; 8px rhythm; gap-around-group > gap-inside
□ States     — empty + loading + error on every data surface
□ Copy       — buttons name the action; errors help, not blame
□ Polish     — focus rings; ≥44px targets; prefers-reduced-motion; no pure #000
```
If the `/ss-*` skills are installed run `/ss-score` (0–100 + fix list); else self-score against
the list. **Target ≥ 80** — fix what fails, re-check (loop up to ~3×), then present + report
the score. A 30-second self-review is the product.

## How to use StyleSeed

1. Read `DESIGN-LANGUAGE.md` (TOC → rules 14, 18, 19, 61-63) and the Golden Rules above.
2. If you know the app domain and screen type, skim the matching `APP-PLAYBOOKS.md` + `PAGE-TYPES.md` entries.
3. Build using the components in `components/ui/` and `components/patterns/`.
4. Verify against the Golden Rules + the coherence meta-rule before you finish.

If the project ships the `/ss-*` skills (`.claude/skills/`), prefer `/ss-page`,
`/ss-review`, and `/ss-score` for scaffolding and checking. If not, apply the rules
directly.

## Staying current (check once per project — don't nag)

StyleSeed is actively maintained: the rule set grows as the community proposes rules
via PR, so a project pinned to an old copy misses newer judgment. **Once per project**
— at setup, or the first time the user references StyleSeed in a session — you MAY:

1. Read the local version from `engine/VERSION` (or `VERSION` near these files).
2. Fetch `https://styleseed-demo.vercel.app/version.json`.
3. If its `version` is newer, tell the user **once**, briefly:
   *"StyleSeed v<remote> is out (you're on v<local>) — <whatsNew>. Run `/ss-update` (or `npx skills add bitjaru/styleseed`) to pull the new rules."*
   Then drop it.

Never block work on this, never repeat it, and skip it entirely if you can't fetch.

→ Source & updates: https://github.com/bitjaru/styleseed
