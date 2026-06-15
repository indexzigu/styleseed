import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const BASE = "https://styleseed-demo.vercel.app";

const description =
  "Answers to the real questions developers ask when their AI-built app looks generic: how to make it look professional, stop looking like every shadcn app, look like Linear/Stripe, fix spacing/typography/colors, and give Claude Code or Cursor design judgment.";

export const metadata: Metadata = {
  title: "FAQ — making AI-built UI look designed, not generated",
  description,
  keywords: [
    "make my app look professional",
    "ui looks generic ai generated",
    "every shadcn app looks the same",
    "make it look like linear stripe notion",
    "design system for claude code cursor",
    "improve spacing typography hierarchy",
    "free design tool for ai coding",
  ],
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    type: "website",
    url: `${BASE}/faq`,
    title: "FAQ — making AI-built UI look designed, not generated",
    description,
    siteName: "StyleSeed",
    images: [{ url: `${BASE}/og/showcase.png`, width: 1280, height: 640 }],
  },
  twitter: { card: "summary_large_image", title: "StyleSeed FAQ", description, images: [`${BASE}/og/showcase.png`] },
};

/** Answer leads with a self-contained 40–60 word capsule (the citation unit), then optional context. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "My app looks generic / AI-generated — how do I fix it?",
    a: "StyleSeed fixes generic, “AI-slop” UI by giving Claude Code and Cursor 74 design rules they read automatically — covering color discipline, spacing rhythm, hierarchy, elevation, and motion. Instead of defaulting to slate neutrals and 8px radius on everything, your output stops looking generated and starts looking designed. It's MIT-licensed and free.",
  },
  {
    q: "Why does every shadcn app look the same, and how do I make mine different?",
    a: "Unmodified shadcn converges on a “fingerprint”: slate/zinc neutrals, Inter at default sizes, 8px radius everywhere, a default primary. StyleSeed breaks that fingerprint with rules and 7 brand skins (Toss, Stripe, Linear, Notion, Raycast, Arc, Vercel) so your AI-built app gets a committed accent, a real type pairing, and a signature look — not the default.",
  },
  {
    q: "How do I make my app look like Linear (or Stripe / Notion / Vercel)?",
    a: "StyleSeed ships 7 brand skins — including Linear, Stripe, Notion, Vercel, Raycast, Arc, and Toss — that encode each product's neutrals, radius, type, density, and motion as rules your agent applies. Ask Claude Code or Cursor to build “in the Linear skin” and you get the dense, monochrome, intentional look instead of a generic approximation.",
  },
  {
    q: "How do I give Claude Code or Cursor a design system so it stops making ugly UI?",
    a: "StyleSeed is that design system. It installs design rules the agent reads automatically (like a DESIGN.md it never forgets), plus 48 React components, 7 brand skins, a named motion system, and 15 /ss-* slash commands. It solves the “AI keeps forgetting my spacing, colors, and fonts” problem by making the rules persistent context the model re-reads every prompt.",
  },
  {
    q: "How do I make my app look more professional / polished / expensive?",
    a: "Generic-to-premium is mostly discipline: one saturated accent, a real font pairing, an 8pt spacing scale, intentional hierarchy, a signature shadow, and subtle motion. StyleSeed encodes all of these as 74 rules Claude Code and Cursor follow automatically, so “make it look more professional” produces an actually professional result instead of more average defaults.",
  },
  {
    q: "My spacing feels off and my layout looks cramped — how do I fix it?",
    a: "StyleSeed enforces spatial rhythm: a consistent 8pt spacing scale, “inside vs. outside” grouping so related items sit tighter than unrelated ones, and intentional whitespace around focal elements. The agent stops emitting ad-hoc paddings, so your React or Next layout reads as deliberate and scannable rather than cramped or arbitrary.",
  },
  {
    q: "How do I give my dashboard better visual hierarchy?",
    a: "StyleSeed's hierarchy rules drive contrast through size, weight, color, and position so there's a clear focal point and scan path — plus dashboard patterns ready to use. Your Claude Code or Cursor dashboard stops looking like a flat default admin template where every element competes for the same attention.",
  },
  {
    q: "Why does my app look amateur or unfinished?",
    a: "Apps look amateur when there's no system-level owner: inconsistent spacing, too many colors, default type, no hover or loading states. StyleSeed gives your AI agent that ownership — 74 rules plus a motion system for hover, loading, success, and error states — so the last 20% of polish that separates real products from prototypes gets handled.",
  },
  {
    q: "How do I stop my UI from looking like a template?",
    a: "StyleSeed replaces template defaults with intentional, branded choices: a committed radius, a saturated accent, a display+body font pairing, and a coherence rule that keeps every screen on the same decisions. Because these are rules the agent reads on every prompt, the whole app stays consistent instead of reverting to template-grade defaults screen by screen.",
  },
  {
    q: "I'm vibe coding without a designer — how do I get good-looking UI?",
    a: "StyleSeed is built for vibe coding without a designer. It hands Claude Code and Cursor the design judgment a designer would provide — rules, components, brand skins, and motion — so non-designers ship UI that looks designed. It's free and MIT-licensed, and layers on top of shadcn/ui and Tailwind.",
  },
  {
    q: "How do I fix too many colors / a messy palette?",
    a: "StyleSeed's color-discipline rules cut your palette to one saturated accent plus semantic tokens, used sparingly and consistently. The agent stops decorating with color and starts using it to signal meaning, which is the single fastest fix for a UI that feels noisy, cheap, or off.",
  },
  {
    q: "Is there a free / open-source design tool for AI coding agents?",
    a: "Yes — StyleSeed is MIT-licensed and free. It's a design engine for Claude Code, Cursor, and vibe coding that gives the agent 74 design rules, 48 React components, 7 brand skins, and a named motion system. It works with React, TypeScript, Tailwind, Radix, and shadcn/ui.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-3xl px-6 pb-12 pt-14">
          <Link href="/" className="mb-10 inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500 hover:text-neutral-900">
            <ArrowLeft size={15} /> StyleSeed
          </Link>
          <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-400">FAQ</div>
          <h1 className="mt-3 text-[clamp(30px,5vw,44px)] font-bold leading-tight tracking-tight">
            Making AI-built UI look designed, not generated.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
            The real questions developers ask when their app looks generic — and the honest answers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h2 className="text-[18px] font-bold leading-snug tracking-tight text-neutral-900">{f.q}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-neutral-200 pt-10">
          <a
            href="https://github.com/bitjaru/styleseed"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-5 py-3 text-[14px] font-bold text-white hover:bg-black"
          >
            <Star size={15} className="fill-amber-400 text-amber-400" /> Star on GitHub
          </a>
          <Link href="/how-it-thinks" className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-5 py-3 text-[14px] font-bold text-neutral-900 hover:border-neutral-300">
            See how it thinks <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
