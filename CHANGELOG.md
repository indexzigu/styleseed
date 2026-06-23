# Changelog

All notable changes to StyleSeed. Agents can check the latest version at
[version.json](https://styleseed-demo.vercel.app/version.json) and run `/ss-update`.

## [2.4.0] — 2026-06-23

**Theme: consistent application.** Real usage showed the one-paste prompt could still
produce mediocre UI (random colors, no key color, different every run). Root cause:
*consistency comes from constraints*, and the paste path is the least-constrained. This
release raises the floor of the default path.

### Added
- **Quick Setup protocol** (CLAUDE.md, AGENTS.md, llms.txt): agents now work in **plan
  mode**, lock a key color + motion seed *with the user* before building, then self-check.
- **Design Lock** — agents write and obey a project-root `STYLESEED.md` (skin, accent,
  radius, motion) on every prompt, so decisions persist instead of drifting. `/ss-setup`
  writes it automatically.
- **Troubleshooting guide** (README) + FAQ entries for "applied StyleSeed but it still
  looks bad / results vary."
- This `CHANGELOG.md`.

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

[2.4.0]: https://github.com/bitjaru/styleseed/releases/tag/v2.4.0
[2.3.0]: https://github.com/bitjaru/styleseed/releases/tag/v2.3.0
