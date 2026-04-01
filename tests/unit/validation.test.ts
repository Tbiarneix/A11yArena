import { describe, it, expect } from "vitest";
import { challengeSchema } from "@/lib/validation/challenge.schema";

const validChallenge = {
  title: "Ajouter un texte alternatif",
  summary: "Corriger les images sans attribut alt dans une page de galerie.",
  instructions: "## Contexte\n\nCette galerie d'images n'a pas de texte alternatif...",
  type: "fix" as const,
  category: "images" as const,
  difficulty: 1,
  frameworks: ["vanilla"] as const,
  estimatedMinutes: 15,
  tags: ["alt", "images"],
  starterCode: {
    vanilla: {
      files: [{ filename: "index.html", language: "html" as const, content: "<img src='cat.jpg'>" }],
      entryFile: "index.html",
    },
  },
  tests: [{ id: "t1", label: "Images avec alt", type: "axe-rule" as const, config: { rule: "image-alt" } }],
};

describe("challengeSchema", () => {
  it("validates a correct challenge", () => {
    const result = challengeSchema.safeParse(validChallenge);
    expect(result.success).toBe(true);
  });

  it("rejects a challenge with too short a title", () => {
    const result = challengeSchema.safeParse({ ...validChallenge, title: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects difficulty out of range", () => {
    const result = challengeSchema.safeParse({ ...validChallenge, difficulty: 6 });
    expect(result.success).toBe(false);
  });
});
