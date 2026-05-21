# UI/UX Methodology — StyleSeed Companion

> Philosophy companion to `DESIGN-LANGUAGE.md`. Where DESIGN-LANGUAGE prescribes the *rules* (font sizes, spacing, color tokens), this document explains the *reasoning patterns* behind them.
>
> Pull from this when you're scaffolding a new dashboard, deciding what to show first, or wondering why a layout feels off. Pair with `/ss-flow` or `/ss-page` slash skills for application.

---

## 1. Progressive Disclosure

Reveal information in layers from high-level summary to drill-down. Respects the human working memory limit (~4–7 chunks).

**Principles:**
- Surface only what the current task requires
- Hide advanced options until the user is ready
- Lower cognitive load for new and infrequent users
- Build confidence in complexity gradually

**Reference pattern — Stripe Dashboard:**
- Top level: revenue, volume, dispute rate only
- Every additional detail layer requires intentional click
- Partial previews ("6 of 25 failed") with link to the full page
- Tooltips for extra context — never cluttering the main view

**How to apply:**
- Pick 4–6 KPIs for above-the-fold; everything else goes one click away
- Replace inline detail blocks with summary cards that expand on tap
- Use tabs and drilldown links instead of stacking sections vertically

**Cross-reference:** `DESIGN-LANGUAGE.md` rule 14, 18, 19 (hierarchy).

---

## 2. Information Density Management

Two-tier structure: high-level snapshot → low-level drill-down. Power users want data, but dumping everything at once is unusable.

**Principles:**
- 4–6 core metrics above-the-fold
- Vertical, hierarchical density to optimize absorption
- Logical sections/subsections to bound cognitive load
- Consistent layout to lower the learning curve

**Implementation patterns:**
1. **Metric Strip**: 4–6 KPI cards at the top (revenue, health, alert count, etc.)
2. **Summary Cards**: each widget shown as a single-line summary (number + caption)
3. **Expandable Sections**: detailed chart/table appears on click of the area of interest
4. **Sidebar Navigation**: 240–280px, saves vertical space while keeping sections one click away

**Cross-reference:** `DESIGN-LANGUAGE.md` rules 14/18/19 (hierarchy), 61–63 (mx-6 / px-6 / section spacing).

---

## 3. Atomic Design System

Brad Frost's 5-tier UI component hierarchy. The most widely referenced model for structuring a design system.

**Tiers:**
1. **Atoms** — button, input, label, icon, color, typography (smallest units)
2. **Molecules** — search bar (input + button), form field (label + input + error), menu item (icon + text)
3. **Organisms** — navigation header, product card grid, data table (sort + pagination)
4. **Templates** — page structure (organism layout)
5. **Pages** — final screens with real data

**Design tokens:** colors, typography, spacing, shadows, radii defined as variables. Enables theme switching (light/dark) and cross-platform consistency.

**Why it matters in 2026:** Adoption shortens new-feature time-to-build, reduces visual bugs in production, and unblocks distributed teams.

**Cross-reference:** StyleSeed's `engine/components/{ui,patterns}/` already follows this — `ui/` ≈ atoms+molecules, `patterns/` ≈ organisms. The 8 skins under `skins/` are the design-token implementations.

---

## 4. Skeleton, Empty State, Microinteraction

The three "quality multipliers" that separate amateur dashboards from shipped ones.

### Skeleton Screen
- Preview the content layout with a lightweight placeholder
- Improves perceived load speed, prevents interface reflow
- **Full-screen loading**: skeletons beat spinners because they hint at page structure

### Empty State
- Empty screens need a CTA and guidance
- **One core message per screen** — don't dump text, button, link, tip, and illustration together
- Demo data, templates, or at least a "Get started" CTA are mandatory

### Microinteraction
- Hover states, chart tooltips, filter loading animations, icon transitions
- Communicates system responsiveness
- When consistent, raises UX quality without distracting from content

**Cross-reference:** Use `/ss-feedback` to add loading/empty/error/success states; motion tokens (`--duration-fast/normal/slow`, `--ease-spring`) are defined in each skin.

---

## 5. Contextual Onboarding

New-user experience that respects the user's attention.

**Three patterns:**
1. **Guided Tour** — tooltips / modals / spotlights for core UI elements
2. **Checklist** — structured list of key tasks (satisfaction on completion)
3. **Contextual Tooltip** — small help bubble that appears on first use of a specific feature

**Principles:**
- Never show a raw empty dashboard
- Minimize Time-to-Value (time until the user touches the core feature)
- Right help at the right moment, only the info needed
- Personalize via short upfront questions

**Reference patterns:**
- Notion seeds the first workspace with sample pages
- Slack guides shortest-path to sending a message
- HubSpot walks CRM setup via a step-by-step checklist

**Cross-reference:** `/ss-flow` for navigation/IA, `/ss-copy` for the actual onboarding microcopy.

---

## 6. The Linear / Toss Aesthetic

Minimal, clean, deliberately quiet. Today's dominant SaaS visual language.

### Linear principles
- **8px spacing scale** — 8, 16, 32, 64 multiples for consistency
- **Modular components** unconstrained by traditional grid layouts
- **Keyboard-first navigation** for power-user efficiency
- **Minimum visual noise** — hairline borders, flat surfaces, generous whitespace

### Toss principles
- **One decision per screen** — minimize cognitive load
- **Big typography** — core numbers large, ancillary info small
- **Generous whitespace** — between cards, between sections
- **Blue gradient CTA** — clear action affordance
- **Transparent border + shadow separation** — cards separated by tone, not lines

### Common aesthetic
- Flat surfaces (no gradient backgrounds)
- Hairline 0.5px borders or shadow-based separation
- Generous whitespace
- 14–16px base text

**Cross-reference:** Golden rules 2 (single accent), 3 (no pure black), 7 (shadows ≤ 8% opacity), 61–63 (spacing). Toss and Stripe skins under `skins/` are the closest realizations.

---

## Application priority — generic dashboard scaffolding

When you're starting a new dashboard, work in this order:

**Day 0–3 — get the bones right**
- Activate a skin via `data-skin` (e.g., `toss` for clean/trust, `linear` for keyboard-power, `arc` for playful)
- Lock in 14px base text and 8px spacing grid
- Split the page into above-the-fold (KPI strip + briefing) and below (detail widgets)
- Make every table row tappable to a detail view

**Week 1–2 — quality lift**
- Replace spinners with card-shaped skeletons that match the final layout
- Rewrite empty states with one CTA each
- Add an onboarding checklist for first-run users
- Toggle widgets between summary and detail mode

**Week 2–4 — polish**
- Extract repeated UI into atomic components
- Add contextual tooltips on first-use of each feature
- Make widgets collapsible
- Add keyboard navigation

---

## References

- [B2B SaaS UX Design in 2026 — Onething Design](https://www.onething.design/post/b2b-saas-ux-design)
- [Smart SaaS Dashboard Design Guide — F1Studioz](https://f1studioz.com/blog/smart-saas-dashboard-design/)
- [Dashboard UX Design Best Practices — Lazarev.agency](https://www.lazarev.agency/articles/dashboard-ux-design)
- [Designing for Scale and Complexity — Microsoft Design](https://medium.com/microsoft-design/designing-for-scale-and-complexity-b788363fd1cc)
- [UX Strategies for Real-Time Dashboards — Smashing Magazine](https://www.smashingmagazine.com/2025/09/ux-strategies-real-time-dashboards/)
- [Skeleton Screens 101 — NN/g](https://www.nngroup.com/articles/skeleton-screens/)
- [Empty State UX — Pencil & Paper](https://www.pencilandpaper.io/articles/empty-states)
- [Progressive Disclosure in SaaS UX — Lollypop Design](https://lollypop.design/blog/2025/may/progressive-disclosure/)
- [Linear Dashboard Best Practices](https://linear.app/now/dashboards-best-practices)
- [Atomic Design Methodology — Midrocket](https://midrocket.com/en/guides/atomic-design-methodology/)

---

*Source research compiled 2026-05-21 from a B2B SaaS dashboard (price-monitoring) implementation. Project-specific application notes live in that project's own docs; this file keeps only the universal portions.*
