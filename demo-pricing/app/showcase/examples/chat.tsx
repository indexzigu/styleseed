import { registerShowcase } from "@/lib/showcase";

registerShowcase({
  id: "chat",
  name: "AI Chat",
  blurb: "Conversational UI with streaming reply — Raycast-style sharp surface (mirrors the existing / route).",
  category: "chat",
  primarySkin: "raycast",
  primarySeed: "snap",
  rationale: {
    design: ["Rule 1 (Color Philosophy)", "Rule 14 (Hierarchy)"],
    methodology: ["Ch.6 Linear/Toss Aesthetic", "Ch.8 Motion Vibe"],
    motion: "Snap entrance for messages; Spring on send button.",
  },
});
