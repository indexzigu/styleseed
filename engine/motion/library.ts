import type { SeedId } from "./index";

/**
 * Motion Keyword Library — the named, copy-pasteable motion vocabulary.
 *
 * This is the SINGLE SOURCE OF TRUTH shared by two surfaces:
 *   1. the `/motion` gallery (live demo + Copy button per keyword)
 *   2. the `/ss-motion` skill (keyword → code lookup for vibe coding)
 *
 * The 5 seeds (spring/silk/snap/float/pulse) define a *personality*.
 * These keywords define a *distinctive move* — a flip, a curtain wipe,
 * a morph — so "make the toggle flip" maps to exactly one recipe and
 * every page in the repo gets the same motion. That keyword↔code
 * contract is the thing a plain UI-template gallery can't offer.
 *
 * Each entry is pure data (safe to import from a Server Component).
 * The live demo JSX lives in the gallery page, keyed by `key`.
 */

export type MotionCategory = "toggle" | "reveal" | "press" | "attention" | "list";

export interface MotionKeyword {
  /** Unique handle — what you type when vibe coding. e.g. "toggle-flip". */
  key: string;
  /** Short human label for the gallery card. */
  label: string;
  category: MotionCategory;
  /** One-line description of the move. */
  vibe: string;
  /** Closest personality seed, for consistency guidance. */
  seed: SeedId;
  /** Copy-pasteable, runnable framer-motion snippet. */
  snippet: string;
}

export const MOTION_CATEGORIES: { id: MotionCategory; label: string; blurb: string }[] = [
  { id: "toggle", label: "Toggle", blurb: "One control, many ways to switch state." },
  { id: "reveal", label: "Reveal", blurb: "How an element arrives on screen." },
  { id: "press", label: "Press", blurb: "Tactile feedback on tap/click." },
  { id: "attention", label: "Attention", blurb: "Looping or one-shot focus pulls." },
  { id: "list", label: "List", blurb: "Choreography across many items." },
];

export const MOTION_LIBRARY: MotionKeyword[] = [
  // ── Toggle ───────────────────────────────────────────────
  {
    key: "toggle-flip",
    label: "Flip",
    category: "toggle",
    vibe: "3D Y-axis card flip between two faces",
    seed: "spring",
    snippet: `const [on, setOn] = useState(false);

<motion.button
  onClick={() => setOn((o) => !o)}
  animate={{ rotateY: on ? 180 : 0 }}
  transition={{ type: "spring", stiffness: 260, damping: 22 }}
  style={{ transformStyle: "preserve-3d", perspective: 800 }}
/>`,
  },
  {
    key: "toggle-slide",
    label: "Slide stack",
    category: "toggle",
    vibe: "Old value slides out, new slides in from the side",
    seed: "snap",
    snippet: `<AnimatePresence mode="popLayout" initial={false}>
  <motion.div
    key={index}
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -40, opacity: 0 }}
    transition={{ type: "spring", stiffness: 320, damping: 30 }}
  >
    {value}
  </motion.div>
</AnimatePresence>`,
  },
  {
    key: "toggle-morph",
    label: "Morph",
    category: "toggle",
    vibe: "Shape morphs — pill ⇄ circle, width + radius",
    seed: "silk",
    snippet: `const [on, setOn] = useState(false);

<motion.button
  onClick={() => setOn((o) => !o)}
  animate={{ borderRadius: on ? 999 : 16, width: on ? 56 : 160 }}
  transition={{ type: "spring", stiffness: 300, damping: 26 }}
/>`,
  },
  {
    key: "toggle-curtain",
    label: "Curtain",
    category: "toggle",
    vibe: "Top→bottom clip-path wipe reveals the panel",
    seed: "silk",
    snippet: `const [open, setOpen] = useState(false);

<motion.div
  initial={false}
  animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
  transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.4 }}
/>`,
  },

  // ── Reveal ───────────────────────────────────────────────
  {
    key: "reveal-blur",
    label: "Blur in",
    category: "reveal",
    vibe: "Focus-pulls into place from a soft blur",
    seed: "float",
    snippet: `<motion.div
  initial={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
/>`,
  },
  {
    key: "reveal-rise",
    label: "Text rise",
    category: "reveal",
    vibe: "Masked clip-path rise — text climbs into view",
    seed: "silk",
    snippet: `<motion.div
  initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
  animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
/>`,
  },
  {
    key: "reveal-unfold",
    label: "Unfold",
    category: "reveal",
    vibe: "scaleY from the top edge, like an accordion",
    seed: "spring",
    snippet: `<motion.div
  style={{ transformOrigin: "top" }}
  initial={{ scaleY: 0, opacity: 0 }}
  animate={{ scaleY: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>`,
  },
  {
    key: "pop-in",
    label: "Pop in",
    category: "reveal",
    vibe: "Spring overshoot from zero — bouncy arrival",
    seed: "spring",
    snippet: `<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 500, damping: 16 }}
/>`,
  },

  // ── Press ────────────────────────────────────────────────
  {
    key: "press-squish",
    label: "Squish",
    category: "press",
    vibe: "Scale-down + tiny skew — jelly press",
    seed: "spring",
    snippet: `<motion.button
  whileTap={{ scale: 0.9, skewX: -4 }}
  transition={{ type: "spring", stiffness: 600, damping: 18 }}
/>`,
  },
  {
    key: "tap-ripple",
    label: "Ripple",
    category: "press",
    vibe: "Material-style radial ripple from the tap point",
    seed: "snap",
    snippet: `const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

function onTap(e: React.PointerEvent) {
  const r = e.currentTarget.getBoundingClientRect();
  setRipples((rs) => [...rs, { id: performance.now(), x: e.clientX - r.left, y: e.clientY - r.top }]);
}

<button onPointerDown={onTap} className="relative overflow-hidden">
  {ripples.map((r) => (
    <motion.span
      key={r.id}
      initial={{ scale: 0, opacity: 0.4 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
      style={{ position: "absolute", left: r.x, top: r.y, width: 40, height: 40, borderRadius: 999, background: "currentColor" }}
    />
  ))}
</button>`,
  },

  // ── Attention ────────────────────────────────────────────
  {
    key: "pulse-beat",
    label: "Heartbeat",
    category: "attention",
    vibe: "Looping scale pulse — alive, rhythmic",
    seed: "pulse",
    snippet: `<motion.div
  animate={{ scale: [1, 1.12, 1] }}
  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
/>`,
  },
  {
    key: "wiggle",
    label: "Wiggle",
    category: "attention",
    vibe: "Quick horizontal shake — error / wrong input",
    seed: "snap",
    snippet: `<motion.div
  animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
  transition={{ duration: 0.4 }}
/>`,
  },
  {
    key: "shimmer",
    label: "Shimmer",
    category: "attention",
    vibe: "Skeleton loading sweep across a surface",
    seed: "silk",
    snippet: `<motion.div
  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  style={{
    background: "linear-gradient(90deg,#eee 25%,#f5f5f5 50%,#eee 75%)",
    backgroundSize: "200% 100%",
  }}
/>`,
  },

  // ── List ─────────────────────────────────────────────────
  {
    key: "stagger-cascade",
    label: "Cascade",
    category: "list",
    vibe: "Children fade-up one after another",
    seed: "silk",
    snippet: `<motion.ul initial="hidden" animate="show"
  variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
    >
      {item.label}
    </motion.li>
  ))}
</motion.ul>`,
  },
];

/** Keyword → entry, for the /ss-motion skill and Copy lookups. */
export const MOTION_BY_KEY: Record<string, MotionKeyword> = Object.fromEntries(
  MOTION_LIBRARY.map((m) => [m.key, m]),
);
