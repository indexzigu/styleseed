"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { seeds, type SeedId } from "@engine/motion";

const SEED_ORDER: SeedId[] = ["spring", "silk", "snap", "float", "pulse"];

/**
 * Hover/click a seed pill → the demo button below adopts that seed's
 * personality. Toggle off/on with the "Add" button to replay the
 * entrance, hover to feel the hover recipe, press to feel press.
 */
export function SeedDemo() {
  const [active, setActive] = useState<SeedId>("spring");
  const [mounted, setMounted] = useState(true);
  const seed = seeds[active];

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_30px_80px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            Try a vibe word
          </div>
          <div className="mt-1 text-[15px] font-semibold text-neutral-900">
            {seed.name} · {seed.vibe}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMounted((m) => !m)}
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-bold text-white"
        >
          {mounted ? "Remove" : "Add"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {SEED_ORDER.map((id) => {
          const s = seeds[id];
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActive(id);
                setMounted(false);
                setTimeout(() => setMounted(true), 80);
              }}
              className={
                "rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors " +
                (isActive
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200")
              }
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DemoCell label="Entrance" desc="how it appears">
          <div className="flex h-24 items-center justify-center">
            {mounted && (
              <motion.div
                key={`${active}-mount`}
                {...seed.entrance}
                className="h-12 w-12 rounded-xl"
                style={{ background: SEED_COLOR[active] }}
              />
            )}
          </div>
        </DemoCell>

        <DemoCell label="Hover" desc="point at the square">
          <div className="flex h-24 items-center justify-center">
            <motion.div
              {...seed.hover}
              className="h-12 w-12 cursor-pointer rounded-xl"
              style={{ background: SEED_COLOR[active] }}
            />
          </div>
        </DemoCell>

        <DemoCell label="Press" desc="tap the button">
          <div className="flex h-24 items-center justify-center">
            <motion.button
              type="button"
              {...seed.press}
              {...seed.hover}
              className="rounded-lg px-4 py-2 text-[13px] font-bold text-white"
              style={{ background: SEED_COLOR[active] }}
            >
              Tap me
            </motion.button>
          </div>
        </DemoCell>
      </div>

      <div className="mt-6 rounded-lg bg-neutral-50 p-4 font-mono text-[12px] leading-relaxed text-neutral-800">
        <span className="text-neutral-500">{'<'}</span>motion.button{" "}
        <span className="text-neutral-500">{'{...spring.press}'}</span>{" "}
        <span className="text-neutral-500">{'{...spring.hover}'}</span>
        <span className="text-neutral-500">{'>'}</span>
        <br />
        &nbsp;&nbsp;Save
        <br />
        <span className="text-neutral-500">{'</'}</span>motion.button
        <span className="text-neutral-500">{'>'}</span>
      </div>
    </div>
  );
}

function DemoCell({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
        {label}
      </div>
      {children}
      <div className="mt-1 text-[10px] text-neutral-500">{desc}</div>
    </div>
  );
}

const SEED_COLOR: Record<SeedId, string> = {
  spring: "#3182F6",
  silk: "#635BFF",
  snap: "#5E6AD2",
  float: "#F59E0B",
  pulse: "#FF4E8B",
};
