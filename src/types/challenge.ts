export type Framework = "vanilla" | "react" | "angular";
export type ChallengeType = "fix" | "build" | "audit";
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type ChallengeStatus = "not_started" | "in_progress" | "completed" | "failed";

export type Category =
  | "forms" | "navigation" | "images" | "live-regions"
  | "modals-dialogs" | "tabs-accordion" | "tables" | "media"
  | "headings-landmarks" | "focus-management" | "color-contrast"
  | "responsive-a11y";

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  summary: string;
  instructions: string;
  type: ChallengeType;
  category: Category;
  difficulty: Difficulty;
  frameworks: Framework[];
  estimatedMinutes: number;
  tags: string[];
  starterCode: Record<Framework, { files: CodeFile[]; entryFile: string }>;
  tests: ChallengeTest[];
  hints?: string[];
  criteria: CriterionReference[];
  isPublished: boolean;
}

export interface CodeFile {
  filename: string;
  language: "html" | "css" | "javascript" | "typescript" | "tsx" | "scss";
  content: string;
  readOnly?: boolean;
}

export interface ChallengeTest {
  id: string;
  label: string;
  type: "axe-rule" | "keyboard" | "aria-attribute" | "custom";
  config: Record<string, unknown>;
}

export interface CriterionReference {
  wcagId: string;
  rgaaIds: string[];
}
