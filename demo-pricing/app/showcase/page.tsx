import Link from "next/link";
import Image from "next/image";
import "./examples"; // side-effect: registers every entry
import { listShowcase } from "@/lib/showcase";
import { loadRegistry } from "@/lib/registry";
import { seeds as motionSeeds } from "@engine/motion";

export const metadata = {
  title: "StyleSeed Showcase — 11 reference builds × 7 skins × 5 motion seeds",
  description:
    "Browse 11 finished UI pages — not static templates, but the design engine's output. Toggle brand skins and motion seeds live, then recreate any of them with one command.",
};

export default function ShowcasePage() {
  const entries = listShowcase();
  const skinCount = loadRegistry().skins.length;
  const seedCount = Object.keys(motionSeeds).length;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-12">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
            ← StyleSeed home
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Showcase</h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            {entries.length} finished pages, each toggleable across {skinCount} brand skins and{" "}
            {seedCount} motion seeds — {entries.length * skinCount * seedCount} live variants in
            total. Click any card to view the page, swap a skin, or pull the source.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/showcase/${entry.id}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={`/showcase-hero/${entry.id}.png`}
                  alt={`${entry.name} hero`}
                  width={1440}
                  height={900}
                  className="h-full w-full object-cover object-top transition-transform group-hover:scale-[1.02]"
                  priority={false}
                />
              </div>
              <div className="border-t border-gray-200 p-5">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-lg font-semibold group-hover:text-blue-600">
                    {entry.name}
                  </h2>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400">
                    {entry.category}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{entry.blurb}</p>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-gray-500">
                  <span className="font-mono">skin · {entry.primarySkin}</span>
                  <span className="font-mono">motion · {entry.primarySeed}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p>
            Each entry can be recreated locally with{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">
              /ss-page {`<id>`}
            </code>{" "}
            or by reading{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">
              app/showcase/examples/{`<id>`}.tsx
            </code>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
