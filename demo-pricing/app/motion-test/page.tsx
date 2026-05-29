"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  spring,
  silk,
  snap,
  float,
  pulse,
  type SeedConfig,
  type SeedContext,
} from "@engine/motion";

const SEEDS: SeedConfig[] = [spring, silk, snap, float, pulse];
const CONTEXTS: SeedContext[] = ["entrance", "exit", "hover", "press", "layout"];

export default function MotionTestPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-8 py-12 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Motion Seeds — 25 variants</h1>
          <p className="mt-2 text-sm text-neutral-600">
            5 seeds × 5 contexts. Hover and tap the cells in the right columns. Toggle the entrance/exit cells. Click layout cells to shuffle.
          </p>
        </header>

        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `120px repeat(${SEEDS.length}, minmax(160px, 1fr))`,
          }}
        >
          {/* Column headers */}
          <div />
          {SEEDS.map((s) => (
            <div key={s.name} className="px-2 pb-3">
              <div className="text-sm font-semibold">{s.name}</div>
              <div className="text-[11px] text-neutral-500">{s.vibe}</div>
            </div>
          ))}

          {/* One row per context */}
          {CONTEXTS.map((ctx) => (
            <Row key={ctx} context={ctx} />
          ))}
        </div>
      </div>
    </main>
  );
}

function Row({ context }: { context: SeedContext }) {
  return (
    <>
      <div className="flex items-center text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
        {context}
      </div>
      {SEEDS.map((seed) => (
        <Cell key={`${seed.name}-${context}`} seed={seed} context={context} />
      ))}
    </>
  );
}

function Cell({ seed, context }: { seed: SeedConfig; context: SeedContext }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3">
      {context === "entrance" || context === "exit" ? (
        <EntranceExitDemo seed={seed} which={context} />
      ) : context === "hover" ? (
        <HoverDemo seed={seed} />
      ) : context === "press" ? (
        <PressDemo seed={seed} />
      ) : (
        <LayoutDemo seed={seed} />
      )}
    </div>
  );
}

function EntranceExitDemo({ seed, which }: { seed: SeedConfig; which: "entrance" | "exit" }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="self-start rounded-md bg-neutral-900 px-2 py-1 text-[11px] text-white"
      >
        {visible ? "Remove" : "Add"}
      </button>
      <div className="flex h-20 items-center justify-center overflow-hidden rounded-md bg-neutral-100">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key="box"
              {...seed.entrance}
              {...seed.exit}
              className="size-10 rounded-md"
              style={{ background: brandFor(seed.name) }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="text-[10px] text-neutral-500">{which}</div>
    </div>
  );
}

function HoverDemo({ seed }: { seed: SeedConfig }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-20 items-center justify-center rounded-md bg-neutral-100">
        <motion.div
          {...seed.hover}
          className="size-10 cursor-pointer rounded-md"
          style={{ background: brandFor(seed.name) }}
        />
      </div>
      <div className="text-[10px] text-neutral-500">hover the square</div>
    </div>
  );
}

function PressDemo({ seed }: { seed: SeedConfig }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-20 items-center justify-center rounded-md bg-neutral-100">
        <motion.button
          type="button"
          {...seed.press}
          className="rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ background: brandFor(seed.name) }}
        >
          Press
        </motion.button>
      </div>
      <div className="text-[10px] text-neutral-500">tap the button</div>
    </div>
  );
}

function LayoutDemo({ seed }: { seed: SeedConfig }) {
  const [side, setSide] = useState<"left" | "right">("left");
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setSide((s) => (s === "left" ? "right" : "left"))}
        className="self-start rounded-md bg-neutral-900 px-2 py-1 text-[11px] text-white"
      >
        Toggle
      </button>
      <div
        className="flex h-20 items-center rounded-md bg-neutral-100 px-2"
        style={{ justifyContent: side === "left" ? "flex-start" : "flex-end" }}
      >
        <motion.div
          {...seed.layout}
          className="size-10 rounded-md"
          style={{ background: brandFor(seed.name) }}
        />
      </div>
      <div className="text-[10px] text-neutral-500">FLIP between sides</div>
    </div>
  );
}

function brandFor(name: string): string {
  switch (name) {
    case "Spring":
      return "#3182F6"; // toss blue
    case "Silk":
      return "#635BFF"; // stripe purple
    case "Snap":
      return "#5E6AD2"; // linear indigo
    case "Float":
      return "#F59E0B"; // warm amber
    case "Pulse":
      return "#FF4E8B"; // raycast pink
    default:
      return "#111";
  }
}
