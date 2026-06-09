<div align="center">

<br />

# StyleSeed

### The design engine for Claude Code, Cursor, and vibe coding.

<br />

<a href="https://styleseed-demo.vercel.app">
  <img src="showcase/landing.png" width="760" alt="StyleSeed — a design engine that teaches Claude Code and Cursor design judgment. Landing: Design that scales without you redrawing it." />
</a>

<br /><br />

[![▶ Live Demo](https://img.shields.io/badge/▶_Live_Demo-Open-111111?style=for-the-badge&logoColor=white)](https://styleseed-demo.vercel.app)
&nbsp;
[![▶ Motion Gallery](https://img.shields.io/badge/▶_Motion_Gallery-Live-8B5CF6?style=for-the-badge&logoColor=white)](https://styleseed-demo.vercel.app/motion)
&nbsp;
[![▶ Pricing](https://img.shields.io/badge/▶_Pricing-Live-6C5CE7?style=for-the-badge&logoColor=white)](https://styleseed-demo.vercel.app/pricing)

<br /><br />

<a href="https://styleseed-demo.vercel.app">
  <img src="showcase/demo.gif" width="560" alt="Same chat UI morphing across Toss, Raycast, and Arc brand skins" />
</a>

**One component. Three brand DNAs.** Same chat UI morphing across Toss · Raycast · Arc — colors, radius, motion, shadows, gradients all driven by StyleSeed tokens. No rewrites. No conditional code. Just a `data-skin` attribute.

<br />

[![oosmetrics](https://api.oosmetrics.com/api/v1/badge/achievement/41c4272f-b2a8-4c64-8fcb-ca7750603ab9.svg)](https://oosmetrics.com/repo/bitjaru/styleseed)
![GitHub release](https://img.shields.io/github/v/release/bitjaru/styleseed?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/bitjaru/styleseed?style=flat-square)
![License](https://img.shields.io/github/license/bitjaru/styleseed?style=flat-square)

**Other repos teach LLMs what brands look like. StyleSeed teaches LLMs how designers think.**<br />
Data vs judgment. 69 design rules that Claude Code and Cursor read automatically — so the output stops looking generated and starts looking designed.

<br />

[Get Started](#get-started) · [Engine + Skins](#how-it-works-engine--skins) · [Motion](#named-motion-system) · [Skills](#14-ai-powered-skills) · [Wiki](../../wiki) · [한국어](README-KR.md)

<br />

</div>

---

## Who is this for?

- You asked **Claude Code** or **Cursor** to build a dashboard and it came out amateur-looking
- You're **vibe coding** a SaaS app and don't want to hire a designer
- You use **shadcn/ui** but the output still feels generic
- You want **Toss-style** refinement without reverse-engineering it yourself
- You're building a **Claude Code skill** or **Cursor rules** setup for design
- You ship fast with AI and need professional UI that doesn't look AI-generated

## Data vs Judgment

Every "help LLMs design better" project solves the wrong half of the problem. They feed the model more **design data** — brand palettes, font specs, shadow tokens, component libraries. I tried that first. Dumped Toss's entire design token JSON into my prompts. The output was still generic.

Then it hit me: **a junior designer with Toss's palette still ships ugly dashboards. A senior designer with only grayscale ships something refined.** The difference isn't what they have. It's what they know to do with it.

Design data is the paint. Design judgment is knowing where to put it.

StyleSeed is a **design engine** — 69 visual rules, 48 components, a named motion system, and 14 slash commands that teach LLMs the judgment, not just the data:

```
"The most refined black isn't #000 — it's #2A2A2A"
"One accent color in the entire app. Everything else grayscale. Restraint is elegance."
"Shadows at 4% opacity. If you can see it, it's already too much."
"Numbers and units at 2:1 ratio. 48px number, 24px unit. Always."
"Never repeat the same section type twice. Alternate tall and compact for rhythm."
"Card/background separation matters more than any border."
```

Nobody writes these down. They're baked into years of experience — invisible to outsiders, invisible to LLMs. StyleSeed writes them down, organizes them into six categories (color discipline, spatial rhythm, information hierarchy, shadow/elevation, component variance, motion/feedback), and hands them to Claude as a single markdown file it reads automatically.

The rules are **brand-agnostic** — they don't reference specific colors, only semantic tokens. Which means the same rulebook works whether your app looks like Toss, Vercel, or your client's weird purple brand. Swap the skin, the judgment carries over.

<div align="center">
  <img src="showcase/light-hero.png" width="260" alt="Light mode" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="showcase/dark-hero.png" width="260" alt="Dark mode" />
  <br />
  <em>Same engine, different skins. Built with Claude Code. Zero designer.</em>
</div>

<details>
<summary><strong>See full page</strong></summary>
<div align="center">
  <img src="showcase/light-full.png" width="260" alt="Light full" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="showcase/dark-full.png" width="260" alt="Dark full" />
</div>
</details>

## Works with Claude Design

[Claude Design](https://claude.ai/design/) generates UI fast — but it still picks `#000` for text, reaches for six accent colors, and floats cards with no background separation. The missing piece isn't more templates. It's the 69 rules that tell the model *when* to use which pattern and *why*.

**StyleSeed + Claude Design together:**

1. Claude Design generates the layout and components (fast scaffolding)
2. StyleSeed's 69 rules refine the output (design judgment layer)
3. Brand skins make it look like your brand, not like "AI made this"

Drop `DESIGN-LANGUAGE.md` into your Claude Design workflow and the same model produces noticeably more refined output — without changing a single prompt.

## Get Started

> **New to this? Read top to bottom — every step matters.** The most common
> mistake is expecting `/ss-setup` to work before the skills are copied into
> `.claude/skills/`. Do step 1 first.

### Option 1: Interactive Setup (Recommended)

**Step 1 — Install the skills.** Run this from **your project's root folder** (a terminal, not Claude Code):

```bash
# Download StyleSeed somewhere on your machine
git clone https://github.com/bitjaru/styleseed.git /tmp/styleseed

# Copy the slash-command skills into your project.
# NOTE: copy .claude/skills explicitly — `cp -r engine/*` skips hidden
# folders, which is why /ss-setup "doesn't exist" if you only do that.
mkdir -p .claude/skills
cp -r /tmp/styleseed/engine/.claude/skills/* .claude/skills/
```

**Step 2 — Restart Claude Code** (skills load at startup), open your project, and run:

```
/ss-setup
```

The wizard then walks you through:
1. App type (SaaS, e-commerce, fintech...)
2. Brand color or pick a skin (Toss, Stripe, Linear, Vercel, Notion...)
3. Or fetch any brand from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (58+ brands)
4. Font preference
5. Generates your first page automatically

> Don't see the `/ss-*` commands? Confirm `ls .claude/skills/` lists `ss-setup`,
> `ss-page`, etc., use the `/ss-` prefix (the old `/ui-*` names are gone), and
> restart Claude Code.

### Option 2: Manual Setup

Already did step 1 above? These commands copy the rest of the engine into a typical `src/`-based React project. **The source folder is `engine/`** (replace `/tmp/styleseed` with wherever you cloned it):

```bash
# Design reference + AI guide
mkdir -p .claude
cp /tmp/styleseed/engine/DESIGN-LANGUAGE.md .claude/DESIGN-LANGUAGE.md
cp /tmp/styleseed/engine/CLAUDE.md          ./CLAUDE.md

# Styles and components
mkdir -p src/styles src/components
cp -r /tmp/styleseed/engine/css/*        src/styles/
cp -r /tmp/styleseed/engine/components/*  src/components/

# Pick a skin — copy its theme.css alongside the other css files
cp /tmp/styleseed/skins/stripe/theme.css src/styles/theme.css
```

### Option 3: Just give AI the URL

```
Refer to https://github.com/bitjaru/styleseed — read engine/CLAUDE.md 
and engine/DESIGN-LANGUAGE.md, then build a SaaS dashboard.
Use skins/stripe/theme.css for the color palette.
```

### Option 4: Cursor

```bash
cp engine/.cursorrules your-project/.cursorrules
```

### Option 5: Install the skills with `npx skills`

The slash-command skills are published in the standard `SKILL.md` format, so you can install them straight into any agent (Claude Code, Cursor, …) with [Vercel's `skills` CLI](https://github.com/vercel-labs/skills) — no manual copying:

```bash
# add all 14 StyleSeed skills to the current project
npx skills add bitjaru/styleseed

# or pick specific ones
npx skills add bitjaru/styleseed --skill ss-motion,ss-page
```

## How It Works: Engine + Skins

```
┌─────────────────────────────────────────────────┐
│  StyleSeed Engine (brand-agnostic)              │
│                                                 │
│  69 rules · 48 components · 14 skills · motion  │
│  Layout · Composition · Typography · UX · A11y  │
└──────────────────────┬──────────────────────────┘
                       │
              Pick a skin ↓
                       │
    ┌──────┬──────┬──────┬──────┬──────┬─────────┐
    │ Toss │Stripe│Linear│Vercel│Notion│ 58 more │
    │      │      │      │      │      │(awesome)│
    └──────┴──────┴──────┴──────┴──────┴─────────┘
```

**Engine** = how your app is structured (design intelligence)
- 69 visual design rules (layout, composition, rhythm, forbidden patterns)
- 48 React components (32 primitives + 16 patterns)
- A named motion system (5 seeds + a copy-paste keyword library)
- 14 Claude Code skills (setup, UI, motion, UX, accessibility)
- Works with ANY color palette

**Skin** = what your app looks like (visual identity)
- Just a `theme.css` file with color variables
- 7 built-in skins: Toss, Stripe, Linear, Notion, Raycast, Arc, Vercel
- 58+ more available from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- Or create your own (change `--brand` and you're done)

### Data vs Judgment — how StyleSeed differs from every other "design for AI" repo

Most projects trying to fix AI-generated UI give the model more **data**. StyleSeed gives it **judgment**. They're complementary, not competing:

| | Data repos (e.g. [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)) | StyleSeed |
|---|---|---|
| **Approach** | Brand palette collection | Design judgment engine |
| **Teaches the model** | What brands *look like* | How designers *think* |
| **Provides** | Colors, fonts, shadow values | 69 rules + semantic tokens + executable skills |
| **Example output** | "Use this shade of blue" | "The refined black isn't #000, it's #2A2A2A" |
| **Brand-specific?** | Yes — rules are tied to one brand | No — rules reference semantic tokens, work with any skin |
| **Components** | None | 48 React components |
| **AI skills** | None | 14 slash commands (executable rules) |
| **Motion** | None | 5 named seeds + copy-paste keyword library |
| **Scales with new brands** | Re-extract everything | Write one `theme.css`, reuse all rules |

**Data repos** = paint colors.<br/>
**StyleSeed** = the rulebook for where to put the paint.

Use them together: data repos provide the skin, StyleSeed provides the brain.

## Named Motion System

<div align="center">
  <a href="https://styleseed-demo.vercel.app/motion">
    <img src="showcase/motion-gallery.gif" width="720" alt="StyleSeed motion gallery — flashy named moves: tilt-3d, magnetic, glow-pulse, gradient-sweep, blob-morph, spotlight" />
  </a>
  <br />
  <em>Flashy, named, copy-paste moves — live at <a href="https://styleseed-demo.vercel.app/motion">/motion</a></em>
</div>

<br />

Most AI-generated motion is the same default fade. StyleSeed gives motion a **vocabulary** — so you (and the LLM) can name a feel and get consistent, intentional animation across every page. Two layers:

**1. Seeds = personality.** Five named presets, each a spreadable framer-motion recipe in five contexts (`entrance` / `exit` / `hover` / `press` / `layout`):

| Seed | Vibe | Inspiration |
|------|------|-------------|
| **Spring** | bouncy, energetic, playful | Arc, Toss |
| **Silk** | smooth, elegant, continuous | Stripe, Linear |
| **Snap** | instant, decisive, precise | Raycast, Linear |
| **Float** | weightless, gentle, dreamy | Apple |
| **Pulse** | rhythmic, alive, punchy | Discord, music apps |

```tsx
import { spring } from "@engine/motion";

<motion.button {...spring.hover} {...spring.press}>Save</motion.button>
```

**2. Keywords = distinctive moves.** A library of copy-paste named motions behind one handle — `toggle-flip`, `toggle-curtain`, `reveal-blur`, `pop-in`, `tilt-3d`, `magnetic`, `glow-pulse`, `confetti-pop`, `shimmer`, and more. Say the keyword while vibe coding (or run `/ss-motion toggle-flip`) and the same recipe lands in your code.

▶ **[Preview & copy every motion at the live gallery →](https://styleseed-demo.vercel.app/motion)**
&nbsp;·&nbsp; [Vibe-code your own → the motion guide](https://styleseed-demo.vercel.app/motion/guide)

All seeds auto-respect `prefers-reduced-motion`, and the `/ss-motion` skill pulls every recipe from one source of truth — so motion stays consistent no matter who (or what) writes the code.

## Available Skins

| Skin | Style | Source |
|------|-------|--------|
| **[toss](skins/toss/)** | Korean fintech — purple, minimal, data-focused | Original |
| **[stripe](skins/stripe/)** | Professional — indigo, clean, multi-layer shadows | awesome-design-md |
| **[linear](skins/linear/)** | Dark-first — violet, minimal, developer-focused | awesome-design-md |
| **[vercel](skins/vercel/)** | Monochrome — black & white, geometric | awesome-design-md |
| **[notion](skins/notion/)** | Warm — blue accent, friendly, warm neutrals | awesome-design-md |
| **[58+ more](skins/_from-awesome-design-md/)** | Any brand from awesome-design-md | Auto-fetch via `/ss-setup` |

## Engine Contents

```
engine/
├── CLAUDE.md                 # AI reads this automatically
├── DESIGN-LANGUAGE.md        # 69 visual design rules (brand-agnostic)
├── .claude/skills/           # 14 slash commands (/ss-*)
│   ├── ss-setup/             #   Interactive setup wizard
│   ├── ss-page/              #   Scaffold pages
│   ├── ss-component/         #   Generate components
│   ├── ss-pattern/           #   Compose layouts
│   ├── ss-motion/            #   Apply named motion (seeds + keywords)
│   ├── ss-review/            #   Design compliance check
│   ├── ss-tokens/            #   Manage tokens
│   ├── ss-a11y/              #   Accessibility audit
│   ├── ss-lint/              #   Quick violation scan
│   ├── ss-update/            #   Pull latest engine
│   ├── ss-flow/              #   Design user flows
│   ├── ss-audit/             #   UX heuristic evaluation
│   ├── ss-copy/              #   Generate microcopy
│   └── ss-feedback/          #   Add loading/error/empty states
├── motion/                   # 5 motion seeds + keyword library
├── components/
│   ├── ui/                   # 32 primitives (shadcn/ui + motion)
│   └── patterns/             # 16 dashboard patterns
├── css/                      # base.css, fonts.css, index.css
├── tokens/                   # 6 JSON token files
├── utils/                    # Formatting utilities
├── icons/                    # Custom SVG icon library
└── scaffold/                 # Vite 6 + React 18 starter
```

## 14 AI-Powered Skills

### Setup
| Skill | What It Does |
|-------|-------------|
| `/ss-setup` | **Interactive wizard** — pick skin, brand color, font, generates first page |

### UI — Build It Right
| Skill | What It Does |
|-------|-------------|
| `/ss-component` | Generate components following design conventions |
| `/ss-page` | Scaffold pages with proper layout structure |
| `/ss-pattern` | Compose UI patterns (card grid, chart, list) |
| `/ss-motion` | Apply a named motion — a seed or a keyword move (`toggle-flip`, `tilt-3d`...) |
| `/ss-review` | Audit code for design system violations |
| `/ss-tokens` | View, add, or modify design tokens |
| `/ss-a11y` | Accessibility audit (WCAG 2.2 AA) |
| `/ss-lint` | Quick automated lint — catches common violations in seconds |
| `/ss-update` | Pull latest engine updates — analyzes your project and updates safely |

### UX — Design It Right (No Designer Needed)
| Skill | What It Does |
|-------|-------------|
| `/ss-flow` | Design user flows (progressive disclosure, information pyramid) |
| `/ss-audit` | Nielsen's 10 usability heuristics evaluation |
| `/ss-copy` | Generate UX microcopy (buttons, errors, empty states, toasts) |
| `/ss-feedback` | Add loading/success/error/empty states to any component |

### Example Workflow

```bash
/ss-setup                    # Pick skin, configure project
/ss-page Dashboard           # Scaffold main page
/ss-copy "dashboard"         # Generate all microcopy
/ss-feedback src/Dashboard   # Add loading/error states
/ss-audit src/Dashboard      # Check UX quality
/ss-lint src/Dashboard       # Quick violation scan
/ss-review src/Dashboard     # Deep design compliance check
/ss-update                   # Pull latest engine updates
```

### Example Prompts

**New project:**
```
Refer to https://github.com/bitjaru/styleseed — read engine/CLAUDE.md 
and engine/DESIGN-LANGUAGE.md. Use skins/stripe/theme.css for colors.
Build a SaaS dashboard with revenue, users, and activity.
```

**Add a page (engine already in project):**
```
Follow CLAUDE.md and DESIGN-LANGUAGE.md rules.
Create a settings page with profile, notifications, and danger zone.
Run /ss-review when done.
```

**Improve existing page:**
```
Refactor src/Dashboard.tsx to follow DESIGN-LANGUAGE.md.
Check visual rhythm (rule 61) and KPI variation (rule 62).
```

**Update engine:**
```
/ss-update
```

## Example Design Rules

These are the kind of rules that make AI output look professional:

```
Rule: The most refined black isn't #000 — it's #2A2A2A.
      5-level grayscale: #2A → #3C → #6A → #7A → #9B

Rule: All content lives inside cards. Never on page background.
      Card (#FFF) vs background (#FAFAFA) contrast IS the separator.

Rule: Never repeat the same section type consecutively.
      Hero → Grid → Chart → Carousel → List (visual rhythm)

Rule: KPI cards must vary: 2 with trend arrows, 1 with progress bar,
      1 with comparison text. Never 4 identical cards.

Rule: Information density increases as you scroll down.
      Top: 48px (one number) → Bottom: 14px (detailed lists)
```

69 rules total. [See the full design language →](engine/DESIGN-LANGUAGE.md)

## Tech Stack

React 18 · TypeScript · Tailwind CSS v4 · Radix UI · Vite 6 · Lucide Icons · CVA

## StyleSeed vs. the alternatives

| | StyleSeed | shadcn/ui | Tailwind UI | Material UI | Generic AI output |
|---|---|---|---|---|---|
| Components | ✅ 48 | ✅ 50+ | ✅ | ✅ | ❌ |
| Design **judgment** (when to use what) | ✅ 69 rules | ❌ | ❌ | Partial | ❌ |
| Claude Code / Cursor integration | ✅ 14 skills | ❌ | ❌ | ❌ | — |
| Brand skins (Toss, Stripe, Linear...) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Price | Free (MIT) | Free | $299+ | Free | — |
| Works *with* AI coding tools | ✅ | Indirect | Indirect | Indirect | — |

**TL;DR:** shadcn/ui gives you components. Tailwind UI gives you templates. StyleSeed gives you the *design judgment* that makes AI output stop looking like AI output.

## FAQ

**Q: Why does Claude Code / Cursor generate ugly UI?**
Because LLMs optimize for functional correctness, not visual refinement. They'll pick `#000` for text, `py-4` for spacing, `text-xl` for everything — all technically valid, all amateur. StyleSeed gives them the rules professional designers use.

**Q: Is this a shadcn/ui replacement?**
No — it's built *on top of* shadcn/ui patterns. StyleSeed components use the same Radix primitives and CVA conventions. Think of it as shadcn/ui + design judgment + AI-tool integration.

**Q: Does it work with Cursor too?**
Yes. The 69 design rules live in a `.cursorrules` file and `CLAUDE.md`. Cursor reads them automatically.

**Q: How is this different from awesome-design-md?**
awesome-design-md gives you brand DESIGN.md files (what). StyleSeed gives you the engine that turns any brand into a working app (how). They pair well.

**Q: Can I use it for a non-fintech app?**
Yes. The engine is brand-agnostic. Pick any skin, swap the brand color, ship.

## Documentation

Full docs in the **[Wiki](../../wiki)** — design rules reference, composition recipes, chart guides, skills reference.

## Contributing

### Create a New Skin

Just a `theme.css` + `skin.json`:
```bash
mkdir skins/your-brand
# Copy any existing skin as starting point
cp skins/toss/theme.css skins/your-brand/theme.css
# Change the --brand color and other values
```

### Improve the Engine

Better rules → better AI output:
- More specific design rules
- New pattern components
- Accessibility improvements
- New AI skills

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Updating

Already using StyleSeed? Quick update (always safe):

```bash
# Pull latest
cd styleseed && git pull

# Update design rules + skills (safe — no project-specific content)
cp styleseed/engine/DESIGN-LANGUAGE.md your-project/.claude/DESIGN-LANGUAGE.md
cp -r styleseed/engine/.claude/skills/ your-project/.claude/skills/
```

**Don't overwrite:** your `theme.css` (brand colors), `CLAUDE.md` (if project-specific), or customized components.

Full guide: [engine/UPDATE.md](engine/UPDATE.md)

**Get notified:** Click **Watch** → **Custom** → **Releases** on this repo.

## License

[MIT](LICENSE)

## Acknowledgments

- Design language inspired by [Toss](https://toss.im)
- Components based on [shadcn/ui](https://ui.shadcn.com/)
- Brand skins sourced from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- UX principles from [Laws of UX](https://lawsofux.com/) and [Nielsen Norman Group](https://www.nngroup.com/)
