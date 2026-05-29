import Link from "next/link";
import { notFound } from "next/navigation";
import "../examples"; // side-effect: registers every entry
import { getShowcase, listShowcase } from "@/lib/showcase";
import { loadRegistry } from "@/lib/registry";
import { seeds as motionSeeds, type SeedId } from "@engine/motion";
import { ShowcaseFrame } from "./showcase-frame";

export function generateStaticParams() {
  return listShowcase().map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = getShowcase(id);
  if (!entry) return { title: "Not found" };
  return { title: `${entry.name} — StyleSeed Showcase`, description: entry.blurb };
}

export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = getShowcase(id);
  if (!entry) notFound();

  const skins = loadRegistry().skins.map((s) => ({
    id: s.id,
    name: s.name,
    brand: s.brand,
  }));
  const seeds = (Object.keys(motionSeeds) as SeedId[]).map((sid) => ({
    id: sid,
    name: motionSeeds[sid].name,
    vibe: motionSeeds[sid].vibe,
  }));

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/showcase" className="text-sm text-gray-500 hover:text-gray-900">
          ← Showcase
        </Link>

        <header className="mt-4 mb-8">
          <div className="flex items-baseline justify-between">
            <h1 className="text-4xl font-bold tracking-tight">{entry.name}</h1>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {entry.category}
            </span>
          </div>
          <p className="mt-2 text-lg text-gray-700">{entry.blurb}</p>
        </header>

        <ShowcaseFrame
          entryId={entry.id}
          defaultSkin={entry.primarySkin}
          defaultSeed={entry.primarySeed}
          skins={skins}
          seeds={seeds}
        />

        {entry.rationale && (
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {entry.rationale.design && (
              <RationaleCard title="Design rules" items={entry.rationale.design} />
            )}
            {entry.rationale.methodology && (
              <RationaleCard
                title="Methodology"
                items={entry.rationale.methodology}
              />
            )}
            {entry.rationale.motion && (
              <RationaleCard title="Motion" items={[entry.rationale.motion]} />
            )}
          </section>
        )}

        <footer className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-500">
          <p>
            Source:{" "}
            <code className="font-mono">
              app/showcase/examples/{entry.id}.tsx
            </code>{" "}
            · Recreate with{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">
              /ss-page {entry.id}
            </code>
          </p>
        </footer>
      </div>
    </main>
  );
}

function RationaleCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </div>
      <ul className="space-y-1 text-sm text-gray-800">
        {items.map((it) => (
          <li key={it}>• {it}</li>
        ))}
      </ul>
    </div>
  );
}
