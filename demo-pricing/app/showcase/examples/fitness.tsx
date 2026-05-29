import { registerShowcase } from "@/lib/showcase";

registerShowcase({
  id: "fitness",
  name: "Fitness Tracker",
  blurb: "Activity rings, workout history, and weekly goals — an Apple Fitness-style health app.",
  category: "mobile",
  primarySkin: "raycast",
  primarySeed: "pulse",
  rationale: {
    design: [
      "Rule 1 (Color Philosophy) — vivid metric rings on a calm dark base",
      "Rule 2 (Large numbers + small units)",
      "Rule 14 (Hierarchy) — today's rings dominate, history supports",
    ],
    methodology: [
      "Ch.2 Information Density — rings + 3 stats above the fold",
      "Ch.7 Color Discipline — borderless, depth via tone on dark",
      "Ch.8 Motion Vibe — Pulse for the live, heartbeat feel",
    ],
    motion: "Pulse entrance for the rings; Pulse press on the start-workout button.",
  },
});
