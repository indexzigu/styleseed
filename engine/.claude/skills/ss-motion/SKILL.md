---
name: ss-motion
description: Apply a named StyleSeed motion seed (Spring/Silk/Snap/Float/Pulse) to a component or interaction, translating vibe words into framer-motion params
argument-hint: [vibe-or-seed-name] [context] [file-path]
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Motion Seed Applier

## When NOT to use

- For general framer-motion docs or learning → use the framer-motion site
- For non-React motion (CSS-only transitions, GSAP) — this skill targets `motion.X` JSX only
- For full scroll-linked timelines or parallax — out of scope per DESIGN-LANGUAGE.md Rule 59
- For tweaking the existing FadeIn/FadeUp/Stagger wrappers — edit `engine/components/ui/motion.tsx` directly

## Vibe → Seed mapping

Translate the user's prompt to one of the five seeds before applying. Use this lookup table from `engine/motion/index.ts`:

| Words the user might say | Seed |
|---|---|
| bouncy, springy, playful, energetic, alive | **Spring** |
| smooth, silky, fluid, elegant, composed, continuous | **Silk** |
| snappy, quick, instant, decisive, sharp, precise | **Snap** |
| floaty, gentle, weightless, dreamy, ambient, drifting | **Float** |
| rhythmic, punchy, pulsing, heartbeat, beat | **Pulse** |
| "Toss style", "Arc style" | **Spring** (per brand default) |
| "Stripe style", "Notion style" | **Silk** |
| "Linear style", "Raycast style", "Vercel style" | **Snap** |

If the user says only a *brand* name, use that brand's default seed from `BRAND_DEFAULT_SEED`. If the user is explicit about a seed name (`spring`, `silk`, etc.), respect it verbatim.

## Context detection

Infer one of the five contexts from the prompt:

- "on hover" / "when hovered" → `hover`
- "on press" / "on tap" / "on click" → `press`
- "when it appears" / "on mount" / "entering" → `entrance`
- "when it leaves" / "on close" / "exiting" → `exit` (requires `<AnimatePresence>`)
- "when layout changes" / "FLIP" / "rearranging" → `layout`

If ambiguous, default to `entrance`. If multiple contexts are reasonable (e.g., a button needs both `hover` and `press`), apply both.

## Application steps

Apply seed: **$0** · Context: **$1** · Target: **$ARGUMENTS**

1. **Read the target file** at the path given (or, if no path was given, ask the user which file). Locate the JSX element the user is talking about — usually a `<button>`, `<div>`, `<Card>`, or similar.

2. **Confirm the import paths**. The component file must be able to import:
   - `motion` (and `AnimatePresence` for `exit`) from `"framer-motion"`
   - the chosen seed from `"@engine/motion"` — in a project that doesn't use the `@engine/*` alias, use a relative path to `engine/motion`

3. **Replace the target tag with a `<motion.X>` and spread the seed's recipe**:

   ```tsx
   // hover example
   <motion.button {...spring.hover}>Save</motion.button>

   // press + hover combined
   <motion.button {...spring.press} {...spring.hover}>Save</motion.button>

   // entrance (mount)
   <motion.div {...silk.entrance}>...</motion.div>

   // exit (requires AnimatePresence wrapper somewhere up the tree)
   <AnimatePresence>
     {open && <motion.div {...silk.entrance} {...silk.exit} />}
   </AnimatePresence>

   // layout (FLIP)
   <motion.div {...snap.layout}>...</motion.div>
   ```

4. **Do NOT inline the params**. The whole point of the seed is that the values come from one source. Never expand `{ type: "spring", stiffness: 300, damping: 18 }` into the JSX — always spread the recipe.

5. **Respect `prefers-reduced-motion`** in long-running surfaces. For one-off interactions (hover/press), framer-motion already throttles. For mount/exit/layout sequences in a long-lived page, import `usePrefersReducedMotion` and `REDUCED_TRANSITION` from `@engine/motion` and override the transition when reduced motion is on.

6. **Validate** by re-reading the file and confirming the JSX still parses (matching brackets, motion tag closed, AnimatePresence in place if `exit` was used).

7. **Tell the user which seed and context you applied**, and offer one related context they might want next ("Want `press` too so it feels clickable?").

## Defaults if the user is vague

- No file given → ask "which file?"
- No vibe word → ask "any vibe word, brand, or seed name?"
- Vibe is "natural" or "feel like a real app" → default to **Silk** (the safest of the five)
- Element is a CTA button → also apply `press`

## Forbidden

- Do not invent new seed names. There are exactly five.
- Do not edit `engine/motion/seeds/*.ts` from this skill — those are calibrated by hand. Add a new seed only via a separate, explicit ask.
- Do not introduce a third-party animation lib (gsap, anime.js). StyleSeed targets framer-motion exclusively.
- Do not add scroll-linked, parallax, or infinite animations (DESIGN-LANGUAGE.md Rule 59).
