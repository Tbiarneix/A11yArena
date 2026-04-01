export type WcagLevel = "A" | "AA" | "AAA";
export type WcagPrinciple = "perceivable" | "operable" | "understandable" | "robust";

export type RgaaTheme =
  | "images" | "cadres" | "couleurs" | "multimedia" | "tableaux"
  | "liens" | "scripts" | "elements-obligatoires" | "structuration"
  | "presentation" | "formulaires" | "navigation" | "consultation";

export interface WcagCriterion {
  id: string;
  name: string;
  level: WcagLevel;
  principle: WcagPrinciple;
  guideline: string;
  description: string;
  url: string;
  techniques: string[];
  rgaaMapping: string[];
}

export interface RgaaCriterion {
  id: string;
  name: string;
  theme: RgaaTheme;
  level: WcagLevel;
  description: string;
  url: string;
  tests: { id: string; description: string }[];
  wcagMapping: string[];
}
