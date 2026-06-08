import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GitFork,
  Layers,
  Package,
  Palette,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import "./showcase/examples";
import { listShowcase } from "@/lib/showcase";
import { seeds as motionSeeds } from "@engine/motion";
import { SeedDemo } from "./_home/seed-demo";
import { Hero } from "./_home/hero";

const HERO_SHOWCASE_IDS = ["finance", "food", "fitness", "music", "issues", "wallet"];

const FEATURES = [
  {
    icon: Palette,
    title: "Brand-agnostic by design",
    desc: "One attribute (data-skin) morphs the entire UI across 7 hand-tuned brand DNAs — Toss, Stripe, Linear, Notion, Raycast, Arc, Vercel.",
  },
  {
    icon: Zap,
    title: "Motion in vibe words",
    desc: "5 named seeds (Spring, Silk, Snap, Float, Pulse) for personality, plus 20+ flashy keyword moves — tilt-3d, magnetic, glow-pulse, confetti-pop. Copy-paste, no guessing spring stiffness.",
  },
  {
    icon: Layers,
    title: "Components + the judgment to use them",
    desc: "33 components and 16 patterns are table stakes. The real payload is 69 documented design rules that tell the AI when and how to use each one — judgment, not just parts.",
  },
  {
    icon: Sparkles,
    title: "AI-ready out of the box",
    desc: "14 slash skills (/ss-component, /ss-page, /ss-motion, …) that Claude Code and Cursor read automatically. Stop fighting generic shadcn output.",
  },
  {
    icon: Package,
    title: "Drop-in, not all-in",
    desc: "Copy engine/ into any React + Tailwind v4 project. No build step, no runtime dependency, no lock-in.",
  },
  {
    icon: Star,
    title: "Free under MIT",
    desc: "Production use, fork, white-label, internal tooling — all fair game. No usage caps, no telemetry.",
  },
];

export default function HomePage() {
  const entries = listShowcase();
  const heroEntries = HERO_SHOWCASE_IDS.map((id) =>
    entries.find((e) => e.id === id),
  ).filter((e): e is NonNullable<typeof e> => Boolean(e));
  const seedCount = Object.keys(motionSeeds).length;

  return (
    <>
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <div
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 text-[14px] font-bold text-white"
            >
              S
            </div>
            <span className="text-[15px] font-bold tracking-tight">StyleSeed</span>
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] font-semibold text-neutral-600 sm:flex">
            <Link href="/showcase" className="hover:text-neutral-900">
              Showcase
            </Link>
            <Link href="/motion" className="hover:text-neutral-900">
              Motion
            </Link>
            <Link href="/interactions" className="hover:text-neutral-900">
              Interactions
            </Link>
            <Link href="/gallery" className="hover:text-neutral-900">
              Components
            </Link>
            <a
              href="https://github.com/bitjaru/styleseed"
              className="hover:text-neutral-900"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/bitjaru/styleseed"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-[12px] font-bold text-neutral-700 hover:border-neutral-300 sm:inline-flex"
            >
              <GitFork size={12} />
              Star
            </a>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-black"
            >
              Browse showcase
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <Hero />

        {/* Showcase preview */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                  Showcase
                </div>
                <h2 className="mt-2 max-w-xl text-[36px] font-bold leading-tight tracking-tight text-neutral-900">
                  {entries.length} reference builds · {entries.length * 7 * seedCount} live
                  variants.
                </h2>
                <p className="mt-3 max-w-md text-[15px] text-neutral-600">
                  Not static templates — each one is the engine&rsquo;s output, re-skinning across 7
                  brand DNAs and {seedCount} motion seeds live in the browser. Copy the source, rules
                  and all.
                </p>
              </div>
              <Link
                href="/showcase"
                className="inline-flex items-center gap-1 text-[13px] font-bold text-neutral-900 hover:underline"
              >
                View all {entries.length} →
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {heroEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/showcase/${entry.id}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={`/showcase-hero/${entry.id}.png`}
                      alt={`${entry.name} — ${entry.primarySkin} skin with ${entry.primarySeed} motion`}
                      width={1440}
                      height={900}
                      className="h-full w-full object-cover object-top transition-transform group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-bold tracking-tight text-neutral-900">
                        {entry.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                        {entry.category}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] text-neutral-600">
                      {entry.blurb}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Motion seeds */}
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                Motion system
              </div>
              <h2 className="mt-2 text-[36px] font-bold leading-tight tracking-tight text-neutral-900">
                Vibe words for personality. Keywords for flair.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] text-neutral-600">
                {seedCount} named seeds (each with five spreadable recipes) <em>plus</em> a library of
                20+ scroll-stopping keyword moves — <code className="rounded bg-neutral-100 px-1 text-[13px]">tilt-3d</code>,{" "}
                <code className="rounded bg-neutral-100 px-1 text-[13px]">magnetic</code>,{" "}
                <code className="rounded bg-neutral-100 px-1 text-[13px]">glow-pulse</code>. Try them
                live below, or{" "}
                <Link href="/motion" className="font-semibold text-violet-600 underline underline-offset-2">
                  browse the full gallery
                </Link>
                .
              </p>
            </div>

            <div className="mt-12">
              <SeedDemo />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                Why StyleSeed
              </div>
              <h2 className="mt-2 text-[36px] font-bold leading-tight tracking-tight text-neutral-900">
                Built for the AI-assisted product workflow.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] text-neutral-600">
                Most repos hand the model more data — palettes, tokens, components. StyleSeed hands it{" "}
                <strong className="font-semibold text-neutral-900">judgment</strong>: the rules a
                senior designer follows without thinking.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
                    <f.icon size={18} />
                  </div>
                  <h3 className="mt-5 text-[16px] font-bold tracking-tight text-neutral-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="text-[44px] font-bold leading-tight tracking-tight text-neutral-900">
              Stop redrawing. Start shipping.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] text-neutral-600">
              One engine, every brand, every motion personality. Drop StyleSeed into your next vibe
              coding session and your LLM designs with a senior designer’s judgment — UI that doesn’t
              look generated.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/showcase"
                className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-5 py-3 text-[14px] font-bold text-white hover:bg-black"
              >
                Browse the showcase
                <ArrowRight size={14} />
              </Link>
              <a
                href="https://github.com/bitjaru/styleseed"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-[14px] font-bold text-neutral-900 hover:border-neutral-300"
              >
                <GitFork size={14} />
                Drop StyleSeed in
              </a>
            </div>
            <p className="mt-6 text-[12px] text-neutral-500">
              MIT licensed · zero install fee · no telemetry · production-ready
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-[14px] font-bold text-neutral-900">
                S
              </div>
              <span className="text-[15px] font-bold tracking-tight text-white">StyleSeed</span>
            </div>
            <p className="mt-2 max-w-sm text-[12px] text-neutral-400">
              Design engine for vibe coding. MIT licensed. Made by{" "}
              <a
                href="https://github.com/bitjaru"
                className="font-semibold text-neutral-200 hover:text-white"
              >
                bitjaru
              </a>{" "}
              in Seoul.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold">
            <Link href="/showcase" className="text-neutral-300 hover:text-white">
              Showcase
            </Link>
            <Link href="/motion" className="text-neutral-300 hover:text-white">
              Motion
            </Link>
            <Link href="/interactions" className="text-neutral-300 hover:text-white">
              Interaction gallery
            </Link>
            <Link href="/gallery" className="text-neutral-300 hover:text-white">
              Component gallery
            </Link>
            <Link href="/pricing" className="text-neutral-300 hover:text-white">
              Pricing demo
            </Link>
            <a
              href="https://github.com/bitjaru/styleseed"
              className="text-neutral-300 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://github.com/bitjaru/styleseed/blob/main/LICENSE"
              className="text-neutral-300 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              MIT License
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
