"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Copy } from "lucide-react";
import {
  MOTION_LIBRARY,
  MOTION_CATEGORIES,
  type MotionKeyword,
  type MotionCategory,
} from "@engine/motion";

const ACCENT: Record<MotionCategory, string> = {
  flair: "#8B5CF6",
  toggle: "#3182F6",
  reveal: "#635BFF",
  press: "#FF4E8B",
  attention: "#F59E0B",
  list: "#10B981",
};

export default function MotionLibraryPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-14 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Motion Keywords
          </div>
          <h1 className="text-[34px] font-bold leading-tight tracking-tight">
            Name the motion. Drop it in. Get the same feel everywhere.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
            Each card is a distinct, named move — not another fade. Click a card to
            replay it, then <span className="font-semibold text-neutral-900">Copy</span> the
            snippet, or say the keyword while vibe coding
            (<code className="rounded bg-neutral-200 px-1.5 py-0.5 text-[12px]">/ss-motion toggle-flip</code>)
            and the same recipe lands in your code.
          </p>
        </header>

        {MOTION_CATEGORIES.map((cat) => {
          const entries = MOTION_LIBRARY.filter((m) => m.category === cat.id);
          if (entries.length === 0) return null;
          return (
            <section key={cat.id} className="mb-14">
              <div className="mb-5 flex items-baseline gap-3">
                <h2 className="text-[20px] font-bold tracking-tight">{cat.label}</h2>
                <span className="text-[13px] text-neutral-500">{cat.blurb}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <KeywordCard key={entry.key} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function KeywordCard({ entry }: { entry: MotionKeyword }) {
  const [trigger, setTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const accent = ACCENT[entry.category];
  const Demo = DEMOS[entry.key] ?? FallbackDemo;

  async function copy() {
    try {
      await navigator.clipboard.writeText(entry.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl bg-white"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.06)" }}
    >
      {/* live stage — click to replay/toggle. A div (not button) so the
          press/ripple demos can nest their own <button> without invalid
          nesting / hydration mismatch. */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setTrigger((t) => t + 1)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setTrigger((t) => t + 1);
        }}
        className="relative flex h-40 items-center justify-center bg-neutral-50"
        style={{ cursor: "pointer" }}
        aria-label={`Replay ${entry.label} motion`}
      >
        <Demo trigger={trigger} accent={accent} />
        <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-medium uppercase tracking-wider text-neutral-300">
          tap
        </span>
      </div>

      {/* meta */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold">{entry.label}</span>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            {copied ? (
              <>
                <Check size={14} style={{ color: "#10B981" }} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy
              </>
            )}
          </button>
        </div>
        <code
          className="w-fit rounded-md px-2 py-1 text-[12px] font-semibold"
          style={{ background: `${accent}14`, color: accent }}
        >
          {entry.key}
        </code>
        <p className="text-[13px] leading-snug text-neutral-500">{entry.vibe}</p>
      </div>
    </div>
  );
}

// ── Live demos, keyed by motion keyword ────────────────────────────
type DemoProps = { trigger: number; accent: string };

const swatch = (accent: string): React.CSSProperties => ({
  background: accent,
  borderRadius: 14,
});

const DEMOS: Record<string, (p: DemoProps) => React.ReactElement> = {
  // ── Flair ──────────────────────────────────────────────
  "tilt-3d": ({ accent }) => <Tilt3dDemo accent={accent} />,
  magnetic: ({ accent }) => <MagneticDemo accent={accent} />,
  spotlight: ({ accent }) => <SpotlightDemo accent={accent} />,
  "text-scramble": ({ trigger, accent }) => <ScrambleDemo trigger={trigger} accent={accent} />,
  "confetti-pop": ({ accent }) => <ConfettiDemo accent={accent} />,

  "glow-pulse": ({ accent }) => (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 0px ${accent}00`,
          `0 0 28px ${accent}b3`,
          `0 0 0px ${accent}00`,
        ],
      }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className="flex h-14 w-28 items-center justify-center rounded-xl text-[14px] font-bold text-white"
      style={{ background: accent }}
    >
      Live
    </motion.div>
  ),

  "gradient-sweep": () => (
    <motion.span
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="text-[30px] font-extrabold tracking-tight"
      style={{
        backgroundImage: "linear-gradient(90deg,#6C5CE7,#FF6B6B,#FFD93D,#6C5CE7)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Gradient
    </motion.span>
  ),

  "blob-morph": ({ accent }) => (
    <motion.div
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="size-20"
      style={{ background: `linear-gradient(135deg, ${accent}, #FF6B6B)` }}
    />
  ),

  // ── Toggle ─────────────────────────────────────────────
  "toggle-flip": ({ trigger, accent }) => {
    const on = trigger % 2 === 1;
    const face: React.CSSProperties = {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
      color: "#fff",
      fontWeight: 700,
      backfaceVisibility: "hidden",
    };
    return (
      <div style={{ perspective: 800 }}>
        <motion.div
          animate={{ rotateY: on ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ position: "relative", width: 96, height: 64, transformStyle: "preserve-3d" }}
        >
          <div style={{ ...face, background: accent }}>Off</div>
          <div style={{ ...face, background: "#1a1a1a", transform: "rotateY(180deg)" }}>On</div>
        </motion.div>
      </div>
    );
  },

  "toggle-slide": ({ trigger, accent }) => {
    const labels = ["Day", "Week", "Month", "Year"];
    const i = trigger % labels.length;
    return (
      <div className="relative flex h-12 w-28 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={i}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="absolute flex h-10 w-24 items-center justify-center text-[15px] font-bold text-white"
            style={swatch(accent)}
          >
            {labels[i]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },

  "toggle-morph": ({ trigger, accent }) => {
    const on = trigger % 2 === 1;
    return (
      <motion.div
        animate={{ borderRadius: on ? 999 : 16, width: on ? 56 : 150 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="flex h-14 items-center justify-center text-[13px] font-bold text-white"
        style={{ background: accent }}
      >
        {on ? "•" : "Expanded"}
      </motion.div>
    );
  },

  "toggle-curtain": ({ trigger, accent }) => {
    const open = trigger % 2 === 1;
    return (
      <div className="relative h-20 w-32 overflow-hidden rounded-xl bg-neutral-200">
        <motion.div
          initial={false}
          animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
          transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-white"
          style={{ background: accent }}
        >
          Revealed
        </motion.div>
      </div>
    );
  },

  "reveal-blur": ({ trigger, accent }) => (
    <motion.div
      key={trigger}
      initial={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex h-16 w-28 items-center justify-center text-[14px] font-bold text-white"
      style={swatch(accent)}
    >
      Focus
    </motion.div>
  ),

  "reveal-rise": ({ trigger, accent }) => (
    <div className="overflow-hidden">
      <motion.div
        key={trigger}
        initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
        animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="text-[30px] font-bold tracking-tight"
        style={{ color: accent }}
      >
        Headline
      </motion.div>
    </div>
  ),

  "reveal-unfold": ({ trigger, accent }) => (
    <motion.div
      key={trigger}
      style={{ transformOrigin: "top", ...swatch(accent) }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex h-20 w-28 items-center justify-center text-[13px] font-bold text-white"
    >
      Panel
    </motion.div>
  ),

  "pop-in": ({ trigger, accent }) => (
    <motion.div
      key={trigger}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 16 }}
      className="flex size-16 items-center justify-center rounded-2xl text-[24px] font-bold text-white"
      style={{ background: accent }}
    >
      ✓
    </motion.div>
  ),

  "press-squish": ({ accent }) => (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9, skewX: -4 }}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
      className="rounded-xl px-6 py-3 text-[14px] font-bold text-white"
      style={{ background: accent }}
    >
      Press me
    </motion.button>
  ),

  "tap-ripple": ({ accent }) => <RippleDemo accent={accent} />,

  "pulse-beat": ({ accent }) => (
    <motion.div
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      className="flex size-14 items-center justify-center rounded-full text-[20px] font-bold text-white"
      style={{ background: accent }}
    >
      ♥
    </motion.div>
  ),

  wiggle: ({ trigger, accent }) => (
    <motion.div
      animate={trigger > 0 ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      key={trigger}
      className="flex h-12 w-32 items-center justify-center rounded-lg border-2 text-[13px] font-bold"
      style={{ borderColor: accent, color: accent }}
    >
      Wrong code
    </motion.div>
  ),

  shimmer: () => (
    <motion.div
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="h-16 w-32 rounded-xl"
      style={{
        background: "linear-gradient(90deg,#e5e5e5 25%,#f5f5f5 50%,#e5e5e5 75%)",
        backgroundSize: "200% 100%",
      }}
    />
  ),

  "stagger-cascade": ({ trigger, accent }) => (
    <motion.ul
      key={trigger}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="flex flex-col gap-1.5"
    >
      {[0, 1, 2, 3].map((n) => (
        <motion.li
          key={n}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="h-3.5 rounded-full"
          style={{ width: 110 - n * 14, background: accent }}
        />
      ))}
    </motion.ul>
  ),
};

function Tilt3dDemo({ accent }: { accent: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 250, damping: 20 });
  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 800, background: `linear-gradient(135deg, ${accent}, #4ECDC4)` }}
      className="flex h-24 w-32 items-center justify-center rounded-2xl text-[13px] font-bold text-white shadow-lg"
    >
      hover me
    </motion.div>
  );
}

function MagneticDemo({ accent }: { accent: string }) {
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  return (
    <motion.button
      type="button"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.5);
        y.set((e.clientY - r.top - r.height / 2) * 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, background: accent }}
      className="rounded-xl px-6 py-3 text-[14px] font-bold text-white"
    >
      Hover me
    </motion.button>
  );
}

function SpotlightDemo({ accent }: { accent: string }) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(120px circle at ${mx}% ${my}%, rgba(255,255,255,0.35), transparent 60%)`;
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative flex h-24 w-36 items-center justify-center overflow-hidden rounded-2xl text-[13px] font-bold text-white"
      style={{ background: accent }}
    >
      move cursor
      <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: bg }} />
    </div>
  );
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

function ScrambleDemo({ trigger, accent }: DemoProps) {
  const target = "StyleSeed";
  const [text, setText] = useState(target);
  useEffect(() => {
    if (trigger === 0) return;
    let frame = 0;
    const id = setInterval(() => {
      setText(
        target
          .split("")
          .map((c, i) =>
            i < frame / 3 ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
          )
          .join(""),
      );
      if (frame++ > target.length * 3) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [trigger]);
  return (
    <span className="font-mono text-[22px] font-bold tracking-tight" style={{ color: accent }}>
      {text}
    </span>
  );
}

const CONFETTI_COLORS = ["#FF6B6B", "#FFD93D", "#6C5CE7", "#4ECDC4"];

function ConfettiDemo({ accent }: { accent: string }) {
  const [bits, setBits] = useState<{ id: number; dx: number; dy: number; rot: number; c: string }[]>([]);
  function pop() {
    setBits(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        dx: (Math.random() - 0.5) * 180,
        dy: (Math.random() - 0.5) * 180,
        rot: Math.random() * 360,
        c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    );
  }
  return (
    <button
      type="button"
      onClick={pop}
      className="relative rounded-xl px-6 py-3 text-[14px] font-bold text-white"
      style={{ background: accent }}
    >
      Celebrate
      {bits.map((b) => (
        <motion.span
          key={b.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: b.dx, y: b.dy, opacity: 0, rotate: b.rot }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => setBits([])}
          style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, background: b.c, borderRadius: 2 }}
        />
      ))}
    </button>
  );
}

function RippleDemo({ accent }: { accent: string }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  let counter = ripples.length;
  function onDown(e: React.PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    counter += 1;
    setRipples((rs) => [...rs, { id: counter + rs.length, x: e.clientX - r.left, y: e.clientY - r.top }]);
  }
  return (
    <button
      type="button"
      onPointerDown={onDown}
      className="relative flex h-12 w-32 items-center justify-center overflow-hidden rounded-xl text-[13px] font-bold text-white"
      style={{ background: accent }}
    >
      Tap area
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() =>
            setRipples((rs) => rs.filter((x) => x.id !== r.id))
          }
          style={{
            position: "absolute",
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            borderRadius: 999,
            background: "rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </button>
  );
}

function FallbackDemo({ accent }: DemoProps) {
  return <div className="size-12 rounded-xl" style={{ background: accent }} />;
}
