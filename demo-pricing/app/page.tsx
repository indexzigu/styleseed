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
import { PromptBox } from "./_home/prompt-box";

const HERO_SHOWCASE_IDS = ["finance", "food", "fitness", "music", "issues", "wallet"];

const FEATURES = [
  {
    icon: Layers,
    title: "Judgment, not just parts",
    desc: "The real payload is 74 documented design rules — each with the reasoning behind it — that tell the AI when and how to use a component, and why. Components are table stakes; the judgment is the product.",
  },
  {
    icon: Sparkles,
    title: "Your AI reads it automatically",
    desc: "15 slash skills (/ss-page, /ss-review, /ss-score, …) that Claude Code, Codex, and Cursor pick up on their own — including a coherence grader that flags 'this looks AI-generated' before you ship.",
  },
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
    icon: Package,
    title: "Drop-in, not all-in",
    desc: "Copy engine/ into any React + Tailwind v4 project. No build step, no runtime dependency, no lock-in.",
  },
  {
    icon: GitFork,
    title: "A living, open framework",
    desc: "The rules aren't carved in stone — they're an open ecosystem. Use StyleSeed, find a pattern that works, and propose it as a rule via PR. The judgment compounds as the community adds to it.",
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
            <a href="#get-started" className="hover:text-neutral-900">
              Get started
            </a>
            <Link href="/how-it-thinks" className="hover:text-neutral-900">
              How it thinks
            </Link>
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
              aria-label="Star StyleSeed on GitHub"
              className="hidden items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-[12px] font-bold text-neutral-700 transition-colors hover:border-amber-300 hover:bg-amber-50 sm:inline-flex"
            >
              <Star size={12} className="fill-amber-400 text-amber-400" />
              Star on GitHub
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

        {/* Get started — the first thing a visitor needs: how to use it */}
        <section id="get-started" className="scroll-mt-20 border-t border-neutral-200 bg-neutral-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Get started</div>
                <h2 className="mt-2 text-[clamp(26px,4vw,36px)] font-bold tracking-tight">
                  The fastest way is one sentence.
                </h2>
                <p className="mt-2 max-w-xl text-[15px] text-neutral-400">
                  No install required. Paste this into Claude Code, Codex, Cursor, or any AI agent and it reads
                  the rules and applies them to whatever you build next.
                </p>
              </div>
              <a
                href="https://github.com/bitjaru/styleseed#get-started"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-white/10"
              >
                Full setup guide <ArrowRight size={14} />
              </a>
            </div>

            {/* the one-paste path — the primary, lowest-friction way */}
            <div className="mt-8 max-w-3xl">
              <PromptBox tone="dark" />
            </div>

            <div className="mt-10 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              Prefer to install it? Two ways
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {/* 1 — starter */}
              <div className="flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                <div className="text-[12px] font-bold uppercase tracking-widest text-emerald-400">Zero config</div>
                <h3 className="mt-2 text-[17px] font-bold">Start from the template</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-neutral-400">
                  A working React app with the whole engine pre-installed. Deploy it, or use it as a
                  GitHub template, then ask your AI for UI.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbitjaru%2Fstyleseed-starter" target="_blank" rel="noreferrer" className="rounded-lg bg-white px-3 py-2 text-[12px] font-bold text-neutral-900 hover:bg-neutral-200">Deploy ▲</a>
                  <a href="https://github.com/bitjaru/styleseed-starter/generate" target="_blank" rel="noreferrer" className="rounded-lg bg-white/10 px-3 py-2 text-[12px] font-bold text-white hover:bg-white/20">Use template</a>
                </div>
              </div>

              {/* 2 — add to existing */}
              <div className="flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                <div className="text-[12px] font-bold uppercase tracking-widest text-sky-400">Existing project</div>
                <h3 className="mt-2 text-[17px] font-bold">Add it in two commands</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-neutral-400">
                  Installs all 15 skills universally — Claude Code, Codex, Cursor, Gemini CLI & 12+
                  more — then run the setup wizard.
                </p>
                <div className="mt-4 space-y-1.5">
                  <code className="block rounded-lg bg-black/40 px-3 py-2 font-mono text-[12px] text-neutral-100">npx skills add bitjaru/styleseed</code>
                  <code className="block rounded-lg bg-black/40 px-3 py-2 font-mono text-[12px]"><span className="text-neutral-500"># in Claude Code: </span><span className="text-emerald-400">/ss-setup</span></code>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How it thinks — the differentiator, before the gallery */}
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              Why it works
            </div>
            <h2 className="mt-2 max-w-2xl text-[clamp(28px,4vw,40px)] font-bold leading-tight tracking-tight text-neutral-900">
              Other repos give your AI components. We give it the reasoning.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">
              Every decision in a StyleSeed UI has a stated reason — the rule it follows and why that
              rule makes the result look designed. That&rsquo;s what an AI can actually read, apply,
              and repeat. Walk a real screen, decision by decision.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rules-blueprint.svg"
              alt="A StyleSeed UI card annotated with the design rule behind each decision — numbers 2:1, one accent, content in cards, one corner radius, never color alone, real states."
              width={1200}
              height={680}
              className="mt-8 w-full rounded-2xl border border-neutral-200 bg-white"
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { k: "The decision", v: "Balance 48px, unit 24px" },
                { k: "The rule", v: "Rule 4 · Numbers 2:1 with units" },
                { k: "Why it works", v: "The eye locks onto magnitude first; equal sizes flatten it into noise." },
              ].map((c, i) => (
                <div key={c.k} className="rounded-2xl bg-neutral-50 p-5" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: i === 2 ? "#3182F6" : "#9CA3AF" }}>{c.k}</div>
                  <div className="mt-1.5 text-[14px] font-semibold leading-snug text-neutral-800">{c.v}</div>
                </div>
              ))}
            </div>
            <Link
              href="/how-it-thinks"
              className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-5 py-3 text-[14px] font-bold text-white hover:bg-black"
            >
              See how it thinks — the full walkthrough
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

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
                senior designer follows without thinking.{" "}
                <Link href="/why" className="font-semibold text-violet-600 underline underline-offset-2">
                  See the before/after →
                </Link>
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
            <Link href="/why" className="text-neutral-300 hover:text-white">
              Why StyleSeed
            </Link>
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
