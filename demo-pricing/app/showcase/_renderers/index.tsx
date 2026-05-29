"use client";

import type { ReactNode } from "react";
import type { SeedId } from "@engine/motion";
import { Placeholder } from "../_placeholder";
import { FinancePage } from "./finance";

export type ShowcaseRenderer = (skin: string, seed: SeedId) => ReactNode;

/**
 * Client-side registry of showcase render functions. The server page
 * resolves the entry by id and passes the id (not the function) to the
 * client frame, which looks the renderer up here.
 */
export const renderers: Record<string, ShowcaseRenderer> = {
  finance: (skin, seed) => <FinancePage skin={skin} seed={seed} />,
  issues: (skin, seed) => <Placeholder id="issues" skin={skin} seed={seed} />,
  settings: (skin, seed) => <Placeholder id="settings" skin={skin} seed={seed} />,
  marketing: (skin, seed) => <Placeholder id="marketing" skin={skin} seed={seed} />,
  notes: (skin, seed) => <Placeholder id="notes" skin={skin} seed={seed} />,
  chat: (skin, seed) => <Placeholder id="chat" skin={skin} seed={seed} />,
  pricing: (skin, seed) => <Placeholder id="pricing" skin={skin} seed={seed} />,
};

export function getRenderer(id: string): ShowcaseRenderer | undefined {
  return renderers[id];
}
