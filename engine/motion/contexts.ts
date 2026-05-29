/**
 * Motion seed types — five named animation feels, each with five reusable contexts.
 *
 * A seed is a complete personality (Spring, Silk, Snap, Float, Pulse).
 * A context is where that personality lands: entrance, exit, hover, press, layout.
 * Each context returns props you can spread directly onto a `<motion.X>`.
 *
 * Example:
 *   <motion.button {...spring.press} {...spring.hover}>Save</motion.button>
 *   <AnimatePresence>
 *     {open && <motion.div {...silk.entrance} {...silk.exit} />}
 *   </AnimatePresence>
 */

import type { Transition } from "framer-motion";

/** The five contexts every seed defines. */
export type SeedContext = "entrance" | "exit" | "hover" | "press" | "layout";

/** Shape spread onto a `<motion.X>` for an entrance animation. */
export type EntranceRecipe = {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  transition: Transition;
};

/** Shape for an exit animation. Pair with `<AnimatePresence>`. */
export type ExitRecipe = {
  exit: Record<string, number | string>;
  transition: Transition;
};

/** Shape for a hover interaction. */
export type HoverRecipe = {
  whileHover: Record<string, number | string>;
  transition: Transition;
};

/** Shape for a tap/press interaction. */
export type PressRecipe = {
  whileTap: Record<string, number | string>;
  transition: Transition;
};

/** Shape for FLIP-style layout animations. */
export type LayoutRecipe = {
  layout: true;
  transition: Transition;
};

/** A complete seed: one personality across all five contexts. */
export type SeedConfig = {
  /** The seed name as it appears in vocab/docs. */
  readonly name: string;
  /** One-line vibe description for the LLM and UI. */
  readonly vibe: string;
  readonly entrance: EntranceRecipe;
  readonly exit: ExitRecipe;
  readonly hover: HoverRecipe;
  readonly press: PressRecipe;
  readonly layout: LayoutRecipe;
};

/** Convenience: pull every recipe for a single seed. */
export type SeedRecipes = Pick<SeedConfig, SeedContext>;
