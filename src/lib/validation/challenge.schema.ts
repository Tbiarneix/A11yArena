import { z } from "zod";

const codeFileSchema = z.object({
  filename: z.string().min(1),
  language: z.enum(["html", "css", "javascript", "typescript", "tsx", "scss"]),
  content: z.string(),
  readOnly: z.boolean().optional(),
});

const challengeTestSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["axe-rule", "keyboard", "aria-attribute", "custom"]),
  config: z.record(z.string(), z.unknown()),
});

const frameworkCodeSchema = z.object({
  files: z.array(codeFileSchema).min(1),
  entryFile: z.string().min(1),
});

export const challengeSchema = z.object({
  title: z.string().min(3).max(120),
  summary: z.string().min(10).max(300),
  instructions: z.string().min(20),
  type: z.enum(["fix", "build", "audit"]),
  category: z.enum([
    "forms", "navigation", "images", "live-regions",
    "modals-dialogs", "tabs-accordion", "tables", "media",
    "headings-landmarks", "focus-management", "color-contrast",
    "responsive-a11y",
  ]),
  difficulty: z.number().int().min(1).max(5),
  frameworks: z.array(z.enum(["vanilla", "react", "angular"])).min(1),
  estimatedMinutes: z.number().int().min(5).max(120),
  tags: z.array(z.string()).max(10),
  starterCode: z.record(z.string(), frameworkCodeSchema),
  tests: z.array(challengeTestSchema).min(1),
  hints: z.array(z.string()).max(5).optional(),
  debriefContent: z.string().optional(),
});

export type ChallengeInput = z.infer<typeof challengeSchema>;
