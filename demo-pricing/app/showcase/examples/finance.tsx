import { registerShowcase } from "@/lib/showcase";

registerShowcase({
  id: "finance",
  name: "Finance Dashboard",
  blurb: "KPI strip, revenue trend, and recent transactions — a Toss-style daily view.",
  category: "dashboard",
  primarySkin: "toss",
  primarySeed: "spring",
  rationale: {
    design: ["Rule 1 (Color Philosophy)", "Rule 14 (Hierarchy)", "Rule 65 (Accent Scarcity)"],
    methodology: ["Ch.1 Progressive Disclosure", "Ch.2 Information Density", "Ch.7 Color Discipline"],
    motion: "Spring entrance for KPI cards; Spring press on actions.",
  },
});
