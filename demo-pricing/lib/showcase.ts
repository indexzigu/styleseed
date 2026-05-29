import type { SeedId } from "@engine/motion";

/**
 * A showcase entry is metadata only — server-safe. The actual render
 * function lives in app/showcase/_renderers/ so it can be looked up
 * inside a client component without crossing the server↔client boundary.
 */
export type ShowcaseEntry = {
  id: string;
  /** Human-readable title shown on the cards and detail page. */
  name: string;
  /** One-line elevator pitch. */
  blurb: string;
  /** Primary intent: "dashboard" / "pricing" / "marketing" / ... */
  category: string;
  /** Default skin to render when the user lands on the entry. */
  primarySkin: string;
  /** Default motion seed to render with. */
  primarySeed: SeedId;
  /** Cross-links to DESIGN-LANGUAGE rules and METHODOLOGY chapters. */
  rationale?: {
    design?: string[];
    methodology?: string[];
    motion?: string;
  };
};

const _entries: ShowcaseEntry[] = [];

export function registerShowcase(entry: ShowcaseEntry): void {
  if (_entries.some((e) => e.id === entry.id)) return;
  _entries.push(entry);
}

export function listShowcase(): ShowcaseEntry[] {
  return [..._entries].sort((a, b) => a.id.localeCompare(b.id));
}

export function getShowcase(id: string): ShowcaseEntry | undefined {
  return _entries.find((e) => e.id === id);
}
