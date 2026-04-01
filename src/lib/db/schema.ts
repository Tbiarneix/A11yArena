import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const challengeTypeEnum = pgEnum("challenge_type", ["fix", "build", "audit"]);

export const categoryEnum = pgEnum("category", [
  "forms", "navigation", "images", "live-regions",
  "modals-dialogs", "tabs-accordion", "tables", "media",
  "headings-landmarks", "focus-management", "color-contrast",
  "responsive-a11y",
]);

export const frameworkEnum = pgEnum("framework", ["vanilla", "react", "angular"]);

export const challengeStatusEnum = pgEnum("challenge_status", [
  "not_started", "in_progress", "completed", "failed"
]);

export const contributionStatusEnum = pgEnum("contribution_status", [
  "draft", "submitted", "in_review", "changes_requested", "approved", "published", "rejected"
]);

export const wcagLevelEnum = pgEnum("wcag_level", ["A", "AA", "AAA"]);

export const wcagPrincipleEnum = pgEnum("wcag_principle", [
  "perceivable", "operable", "understandable", "robust"
]);

export const rgaaThemeEnum = pgEnum("rgaa_theme", [
  "images", "cadres", "couleurs", "multimedia", "tableaux",
  "liens", "scripts", "elements-obligatoires", "structuration",
  "presentation", "formulaires", "navigation", "consultation",
]);

export const contributorRoleEnum = pgEnum("contributor_role", [
  "author", "reviewer", "translator"
]);

export const reviewActionEnum = pgEnum("review_action", [
  "approve", "request_changes", "reject", "comment"
]);

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

export interface TestResult {
  testId: string;
  passed: boolean;
  message?: string;
}

export interface DebriefMeta {
  impact: {
    description: string;
    scenarios: {
      assistiveTech: string;
      broken: string;
      fixed: string;
    }[];
  };
  solution: {
    keyDecisions: {
      title: string;
      explanation: string;
      alternatives?: { approach: string; whyNot: string }[];
    }[];
  };
  references: {
    wcag: { id: string; name: string; level: string; url: string; summary: string }[];
    rgaa: { id: string; name: string; theme: string; url: string; summary: string }[];
    apg?: { name: string; url: string; keyboardInteractions: string[] }[];
  };
  furtherReading: { title: string; url: string; type: string; lang: string }[];
}

export interface InlineComment {
  section: string;
  path?: string;
  line?: number;
  comment: string;
}

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  supabaseAuthId: text("supabase_auth_id").unique().notNull(),
  displayName: text("display_name").notNull(),
  email: text("email").unique(),
  avatarUrl: text("avatar_url"),
  githubHandle: text("github_handle"),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  isReviewer: boolean("is_reviewer").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
});

export const challenges = pgTable("challenges", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  instructions: text("instructions").notNull(),
  type: challengeTypeEnum("type").notNull(),
  category: categoryEnum("category").notNull(),
  difficulty: integer("difficulty").notNull(),
  frameworks: jsonb("frameworks").$type<string[]>().notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  starterCode: jsonb("starter_code").$type<Record<string, { files: CodeFile[]; entryFile: string }>>().notNull(),
  tests: jsonb("tests").$type<ChallengeTest[]>().notNull(),
  hints: jsonb("hints").$type<string[]>(),
  debriefContent: text("debrief_content"),
  debriefMeta: jsonb("debrief_meta").$type<DebriefMeta>(),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("challenges_category_idx").on(table.category),
  index("challenges_type_idx").on(table.type),
  index("challenges_difficulty_idx").on(table.difficulty),
  index("challenges_published_idx").on(table.isPublished),
]);

export const challengeCriteria = pgTable("challenge_criteria", {
  id: uuid("id").primaryKey().defaultRandom(),
  challengeId: uuid("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  wcagId: text("wcag_id").references(() => wcagCriteria.id).notNull(),
}, (table) => [
  index("challenge_criteria_challenge_idx").on(table.challengeId),
]);

export const challengeRgaaCriteria = pgTable("challenge_rgaa_criteria", {
  id: uuid("id").primaryKey().defaultRandom(),
  challengeCriterionId: uuid("challenge_criterion_id").references(() => challengeCriteria.id, { onDelete: "cascade" }).notNull(),
  rgaaId: text("rgaa_id").references(() => rgaaCriteria.id).notNull(),
});

export const contributions = pgTable("contributions", {
  id: uuid("id").primaryKey().defaultRandom(),
  challengeId: uuid("challenge_id").references(() => challenges.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  status: contributionStatusEnum("status").default("draft").notNull(),
  version: integer("version").default(1).notNull(),
  challengeSnapshot: jsonb("challenge_snapshot").notNull(),
  submittedAt: timestamp("submitted_at"),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("contributions_author_idx").on(table.authorId),
  index("contributions_status_idx").on(table.status),
]);

export const contributionReviews = pgTable("contribution_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  contributionId: uuid("contribution_id").references(() => contributions.id, { onDelete: "cascade" }).notNull(),
  reviewerId: uuid("reviewer_id").references(() => users.id).notNull(),
  action: reviewActionEnum("action").notNull(),
  comment: text("comment"),
  inlineComments: jsonb("inline_comments").$type<InlineComment[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contributors = pgTable("contributors", {
  id: uuid("id").primaryKey().defaultRandom(),
  challengeId: uuid("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  role: contributorRoleEnum("role").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("contributors_unique_idx").on(table.challengeId, table.userId, table.role),
]);

export const attempts = pgTable("attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  challengeId: uuid("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  framework: frameworkEnum("framework").notNull(),
  status: challengeStatusEnum("status").notNull(),
  submittedCode: jsonb("submitted_code").$type<Record<string, string>>(),
  testResults: jsonb("test_results").$type<TestResult[]>(),
  score: real("score").default(0),
  timeSpent: integer("time_spent").default(0),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
}, (table) => [
  index("attempts_user_idx").on(table.userId),
  index("attempts_challenge_idx").on(table.challengeId),
  index("attempts_user_challenge_idx").on(table.userId, table.challengeId),
]);

export const badges = pgTable("badges", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  badgeType: text("badge_type").notNull(),
  badgeValue: text("badge_value"),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("badges_unique_idx").on(table.userId, table.badgeType, table.badgeValue),
]);

export const parcours = pgTable("parcours", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: categoryEnum("category").notNull(),
  prerequisites: jsonb("prerequisites").$type<string[]>(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const parcoursSteps = pgTable("parcours_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  parcoursId: uuid("parcours_id").references(() => parcours.id, { onDelete: "cascade" }).notNull(),
  challengeId: uuid("challenge_id").references(() => challenges.id).notNull(),
  orderIndex: integer("order_index").notNull(),
  contextNote: text("context_note"),
  required: boolean("required").default(true).notNull(),
}, (table) => [
  index("parcours_steps_parcours_idx").on(table.parcoursId),
  uniqueIndex("parcours_steps_unique_idx").on(table.parcoursId, table.orderIndex),
]);

export const wcagCriteria = pgTable("wcag_criteria", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  level: wcagLevelEnum("level").notNull(),
  principle: wcagPrincipleEnum("principle").notNull(),
  guideline: text("guideline").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  techniques: jsonb("techniques").$type<string[]>(),
});

export const rgaaCriteria = pgTable("rgaa_criteria", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  theme: rgaaThemeEnum("theme").notNull(),
  level: wcagLevelEnum("level").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  tests: jsonb("tests").$type<{ id: string; description: string }[]>(),
});

export const wcagRgaaMapping = pgTable("wcag_rgaa_mapping", {
  wcagId: text("wcag_id").references(() => wcagCriteria.id).notNull(),
  rgaaId: text("rgaa_id").references(() => rgaaCriteria.id).notNull(),
}, (table) => [
  primaryKey({ columns: [table.wcagId, table.rgaaId] }),
]);

export const challengesRelations = relations(challenges, ({ many }) => ({
  criteria: many(challengeCriteria),
  attempts: many(attempts),
  contributions: many(contributions),
  contributors: many(contributors),
  parcoursSteps: many(parcoursSteps),
}));

export const usersRelations = relations(users, ({ many }) => ({
  attempts: many(attempts),
  badges: many(badges),
  contributions: many(contributions),
  reviews: many(contributionReviews),
}));

export const parcoursRelations = relations(parcours, ({ many }) => ({
  steps: many(parcoursSteps),
}));
