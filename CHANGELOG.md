# Changelog

All notable changes to StyleSeed. Agents can check the latest version at
[version.json](https://styleseed-demo.vercel.app/version.json) and run `/ss-update`.

## [2.5.0] — 2026-07-01

**Theme: distinctive, not just coherent.** Dogfooding real product builds surfaced the next
failure mode: StyleSeed reliably stopped UI from being *ugly* (rainbow, emoji, pure black) but
could still leave it *generic* — the default indigo, the tight mobile type scale on a desktop
screen, the "Lucide-icon-in-a-pale-chip" cliché repeated for every feature, an all-even grid with
no focal point, and the demo layout copied verbatim. Coherent-but-generic still reads "an AI made
this." This release forces the *identity* layer that made the reference demo look designed.

### Added
- **Mood step in Quick Setup** — the agent now pins the aesthetic in plain words (**edges** →
  radius, **feel** → shadow/ornament, **density** → spacing/type, **tone** → motion/saturation),
  proposing a skin-based default the user tweaks ("sharper corners"). Locked in `STYLESEED.md`.
- **Smart domain defaults** — setup infers a domain-fit skin/color (Korean + fintech/regulation →
  Toss `#3182F6`, etc.) instead of asking cold. **The unlocked default indigo (`#5E6AD2`/`#4F46E5`)
  is now forbidden as a final choice.**
- **Type scale by surface** — a desktop/web B2B scale (body ≥16px, section titles ≥20px, larger
  hero) distinct from the tight mobile-app scale, plus a font-pairing recommendation table. Setup
  and the lock now record **surface** and **font**.
- **Retrofit path** (`/ss-update` Step 6) — re-do a screen built with an older, weaker StyleSeed to
  the new standard: write a lock if missing, re-score, fix to ≥80, report the before/after score.
- **`Distinctiveness` scoring category** in `/ss-score` (10 pts) and a matching Quality-Gate check.

### Changed
- **Quick Setup is now MANDATORY** (was "recommended") — if there's no `STYLESEED.md` and you're
  about to build UI, running setup is the first step, before any code.
- **Quality Gate gained Distinctive / Focal / Type-fit checks** — it now fails a default-indigo
  accent, a copied demo layout, an all-even no-focal grid, and 14px body on a desktop screen.

### Rules (gaps closed from real failures)
- **Golden Rules 14–16** — never ship the default/unlocked accent or a copied demo layout
  (coherent ≠ distinctive); one focal point per screen (an all-even card grid is the
  machine-composed tell); match the type scale to the surface.
- **No icon-chip cliché** (VISUAL-CRAFT **CC-9b**) — a generic Lucide line-icon in an identical
  pale-tinted rounded-square, repeated for every feature, is a top "AI built this" tell; drop the
  chip, vary the treatment, or use numbered/typographic markers.
- Enforced across `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `/ss-score`, and `/ss-update`.

## [2.4.0] — 2026-06-23

**Theme: consistent application.** Real usage showed the one-paste prompt could still
produce mediocre UI (random colors, no key color, different every run). Root cause:
*consistency comes from constraints*, and the paste path is the least-constrained. This
release raises the floor of the default path.

### Added
- **Quality Gate** — a non-negotiable self-review the agent runs *before showing the user any
  UI*: a 7-point checklist (coherence, color=meaning, hierarchy, layout, states, copy, polish);
  with the skills installed it's `/ss-score` looped to a ≥80 floor with fixes; without them it's
  a self-score. No first-draft, incoherent UI (rainbow lists, emoji icons, two accents, missing
  states) reaches the user. Baked into CLAUDE.md, AGENTS.md, llms.txt, and the paste-prompt.
- **Quick Setup protocol** (CLAUDE.md, AGENTS.md, llms.txt): agents now work in **plan
  mode**, lock a key color + motion seed *with the user* before building, then self-check.
- **Design Lock** — agents write and obey a project-root `STYLESEED.md` (skin, accent,
  radius, motion) on every prompt, so decisions persist instead of drifting. `/ss-setup`
  writes it automatically.
- **Troubleshooting guide** (README) + FAQ entries for "applied StyleSeed but it still
  looks bad / results vary."
- **Status chip tint tokens** in all 7 skins (`bg-success-tint`/`bg-warning-tint`/
  `bg-destructive-tint`/`bg-info-tint`, derived via `color-mix`, auto-adapting to dark) so
  agents stop hand-mixing one-off hex for status backgrounds.
- **"What's new" section** on the landing page (auto-synced from `version.json`) + this
  `CHANGELOG.md`.

### Changed
- **Stronger canonical paste-prompt** (homepage, both READMEs): points to `llms-full.txt`
  (the full rules, not the summary) and bakes in plan-mode + key-color lock + coherence
  self-check.

### Rules (gaps closed from real failures)
- **No emoji as UI icons** (CC-9a) — emoji inject many uncontrolled hues and break the
  single-accent rule; use one line-icon set in `currentColor`.
- **Status color = severity, not decoration** (CL-2a) — a normal/OK/"보통" state is neutral
  grey; color marks only the minority of rows that need attention; same value → same color.
- **No decorative hues** (CL-2b) — favorite stars, category dots, markers use the accent or
  grey, not a new color each.
- These are enforced in `/ss-review`, `/ss-score`, and the design-review skill rubric.

## [2.3.0] — 2026-06-15

- **Design judgment expansion**: APP-PLAYBOOKS.md (domain bias) + PAGE-TYPES.md (screen-type
  bias), VISUAL-CRAFT.md (research-backed craft + coherence laws), UX-WRITING.md (verbal
  judgment, Toss-grounded).
- 74 design rules · 15 skills (added `/ss-score`) · 7 brand skins.
- Agent-agnostic delivery: CLAUDE.md + AGENTS.md + .cursorrules.
- 8 `/guides` + 7 `/screens` programmatic-SEO pages, `/how-it-thinks`, `/faq`.

[2.5.0]: https://github.com/bitjaru/styleseed/releases/tag/v2.5.0
[2.4.0]: https://github.com/bitjaru/styleseed/releases/tag/v2.4.0
[2.3.0]: https://github.com/bitjaru/styleseed/releases/tag/v2.3.0
