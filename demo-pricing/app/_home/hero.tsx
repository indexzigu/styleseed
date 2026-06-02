"use client";

import Link from "next/link";
import { ArrowRight, GitFork, Sparkles } from "lucide-react";
import { motion, useSpring, type Variants } from "framer-motion";

const STATS = [
  { value: "33", label: "components" },
  { value: "7", label: "brand skins" },
  { value: "5", label: "motion seeds" },
  { value: "69", label: "design rules" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
};

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-white to-neutral-50">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6 pb-20 pt-20 text-center"
      >
        {/* badge — entrance, then a soft breathing glow */}
        <motion.div variants={item} className="inline-block">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(139,92,246,0)",
                "0 0 22px rgba(139,92,246,0.45)",
                "0 0 0px rgba(139,92,246,0)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-neutral-600"
          >
            <Sparkles size={11} className="text-violet-500" />
            v2 · now with 20+ motion moves
          </motion.div>
        </motion.div>

        <motion.h1
          variants={item}
          className="mx-auto mt-7 max-w-3xl text-[clamp(40px,7vw,68px)] font-bold leading-[1.04] tracking-tight text-neutral-900"
        >
          Design that <GradientWord>scales</GradientWord>{" "}
          <br className="hidden sm:block" />
          without you redrawing it.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-neutral-600"
        >
          Not a component library or a template pack — a <strong className="font-semibold text-neutral-900">design engine</strong>.
          StyleSeed teaches Claude Code and Cursor how designers actually think — 69 rules, not just
          tokens — so AI ships intentional UI instead of generic output. Swap the brand DNA with one
          attribute; add motion in plain English. MIT licensed.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticLink href="/showcase">
            Browse the showcase
            <ArrowRight size={14} />
          </MagneticLink>
          <a
            href="https://github.com/bitjaru/styleseed"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-[14px] font-bold text-neutral-900 transition-colors hover:border-neutral-300"
          >
            <GitFork size={14} />
            View source on GitHub
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <dt className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                {s.label}
              </dt>
              <dd className="mt-1 text-[32px] font-bold tracking-tight text-neutral-900">
                {s.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

function GradientWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage: "linear-gradient(90deg,#8B5CF6,#3182F6,#4ECDC4,#8B5CF6)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </motion.span>
  );
}

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useSpring(0, { stiffness: 300, damping: 18 });
  const y = useSpring(0, { stiffness: 300, damping: 18 });
  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.4);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-5 py-3 text-[14px] font-bold text-white transition-colors hover:bg-black"
      >
        {children}
      </Link>
    </motion.div>
  );
}
