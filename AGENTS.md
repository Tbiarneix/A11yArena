# A11y Arena — Instructions Projet

> Plateforme gratuite de challenges interactifs dédiés à l'accessibilité numérique.
> Apprendre en pratiquant, comprendre par l'impact utilisateur, maîtriser WCAG & RGAA.

---

## RÈGLES CRITIQUES (à respecter dans CHAQUE fichier)

### Accessibilité — La plateforme DOIT être exemplaire

- Skip links sur TOUTES les pages (`Aller au contenu principal`, `Aller à la navigation`)
- Landmarks sémantiques : `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` — jamais de `<div>` pour ces rôles
- Hiérarchie de titres stricte : un seul `<h1>` par page, pas de saut de niveau
- Focus visible sur TOUS les éléments interactifs : `outline: 2px solid var(--color-focus)` avec `outline-offset: 2px` — JAMAIS `outline: none`
- Live regions (`role="status"`, `aria-live="polite"`) pour TOUS les feedbacks dynamiques (résultats de tests, toasts, sauvegarde)
- Labels explicites sur TOUS les champs de formulaire — pas de placeholder seul
- Contrastes AA minimum (4.5:1 texte, 3:1 composants UI) — vérifier avec les variables CSS
- `prefers-reduced-motion: reduce` respecté sur TOUTES les animations
- Navigation clavier complète sur TOUS les composants interactifs
- Attributs `aria-*` conformes aux patterns APG (tabs, dialog, accordion, combobox, etc.)

### Convention de code

- TypeScript strict (`strict: true`, pas de `any`)
- Composants React fonctionnels avec hooks uniquement
- Server Components par défaut, `"use client"` uniquement quand nécessaire (interactivité, hooks)
- Nommage : PascalCase composants, camelCase fonctions/variables, kebab-case fichiers et routes
- Imports absolus avec alias `@/` mappé sur `src/`
- Pas de `console.log` en production — utiliser un logger si nécessaire
- Pas de `// @ts-ignore` ni `// eslint-disable`
- Tests unitaires pour la logique métier (validation, scoring, mapping WCAG↔RGAA)
- Tests E2E Playwright pour les parcours critiques

---

## STACK TECHNIQUE

| Couche | Techno | Config |
|---|---|---|
| Framework | Next.js 15 (App Router) | `next@latest`, RSC par défaut |
| Langage | TypeScript 5+ | `strict: true` |
| Base de données | PostgreSQL via Supabase | Client `@supabase/supabase-js` + `@supabase/ssr` |
| ORM | Drizzle ORM | `drizzle-orm` + `drizzle-kit` + driver `postgres` |
| Auth | Supabase Auth | GitHub + Google providers |
| Stockage fichiers | Supabase Storage | Pour les assets des challenges (images, captures) |
| Éditeur code | CodeMirror 6 | `@codemirror/view`, `@codemirror/lang-html`, `@codemirror/lang-javascript`, `@codemirror/lang-css` |
| Sandbox | iframe sandboxée + srcdoc | Rendu live du code utilisateur |
| Tests a11y (runtime) | axe-core | Exécuté dans l'iframe via postMessage |
| Styling | Tailwind CSS 4 | Design tokens via CSS variables |
| Validation | Zod | Schémas partagés client/serveur |
| MDX | next-mdx-remote | Rendu des débriefs pédagogiques |
| Déploiement | Vercel | Preview deploys sur PR |

### Variables d'environnement requises

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=              # Connexion directe PostgreSQL pour Drizzle
```

---

## ARBORESCENCE PROJET

```
a11y-arena/
├── src/
│   ├── app/
│   │   ├── layout.tsx                        # RootLayout : SkipLinks + Header + main + Footer + LiveAnnouncer
│   │   ├── page.tsx                          # Landing page
│   │   ├── globals.css                       # Tailwind directives + CSS custom properties
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx                # Page connexion (Supabase Auth UI)
│   │   │   └── callback/route.ts             # Callback OAuth
│   │   │
│   │   ├── challenges/
│   │   │   ├── page.tsx                      # Liste filtrable des challenges
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                  # Challenge playground (éditeur + preview + tests)
│   │   │       └── debrief/page.tsx          # Débrief pédagogique post-challenge
│   │   │
│   │   ├── parcours/
│   │   │   ├── page.tsx                      # Liste des parcours thématiques
│   │   │   └── [slug]/page.tsx               # Détail parcours + timeline de progression
│   │   │
│   │   ├── references/
│   │   │   ├── page.tsx                      # Hub documentation
│   │   │   ├── wcag/page.tsx                 # Table WCAG 2.2 navigable
│   │   │   ├── rgaa/page.tsx                 # Table RGAA 4.1 navigable
│   │   │   └── mapping/page.tsx              # Correspondance interactive WCAG ↔ RGAA
│   │   │
│   │   ├── contribute/
│   │   │   ├── page.tsx                      # Dashboard contributeur (mes contributions + stats)
│   │   │   ├── new/page.tsx                  # Éditeur de création de challenge
│   │   │   ├── [id]/edit/page.tsx            # Éditeur de modification
│   │   │   └── [id]/review/page.tsx          # Interface de review (pour les reviewers)
│   │   │
│   │   ├── profil/
│   │   │   └── page.tsx                      # Progression, badges, historique, heatmap
│   │   │
│   │   ├── a-propos/page.tsx
│   │   │
│   │   └── api/
│   │       ├── challenges/
│   │       │   ├── route.ts                  # GET (liste filtrée) + POST (création)
│   │       │   └── [id]/
│   │       │       ├── route.ts              # GET + PATCH + DELETE
│   │       │       ├── submit/route.ts       # POST : soumettre une tentative
│   │       │       └── tests/route.ts        # POST : exécuter les tests axe-core
│   │       ├── contributions/
│   │       │   ├── route.ts                  # GET (mes contributions) + POST (soumettre pour review)
│   │       │   └── [id]/
│   │       │       ├── route.ts              # GET + PATCH
│   │       │       └── review/route.ts       # POST : approuver/rejeter/demander des changements
│   │       ├── parcours/
│   │       │   └── route.ts
│   │       ├── progress/
│   │       │   └── route.ts                  # GET + POST progression utilisateur
│   │       └── references/
│   │           └── mapping/route.ts          # GET mapping WCAG↔RGAA
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                    # Nav principale + dark mode toggle + avatar
│   │   │   ├── Footer.tsx
│   │   │   ├── SkipLinks.tsx                 # Liens d'évitement
│   │   │   ├── Navigation.tsx                # Nav responsive (desktop + mobile drawer)
│   │   │   └── LiveAnnouncer.tsx             # Provider de live region globale
│   │   │
│   │   ├── challenge/
│   │   │   ├── ChallengeCard.tsx             # Card pour la liste
│   │   │   ├── ChallengeFilters.tsx          # Barre de filtres (type, catégorie, difficulté, framework, statut)
│   │   │   ├── CodeEditor.tsx                # Wrapper CodeMirror avec tabs multi-fichiers
│   │   │   ├── Preview.tsx                   # iframe sandboxée avec rendu live
│   │   │   ├── TestRunner.tsx                # Panel résultats (pass/fail animés)
│   │   │   ├── TestResultItem.tsx            # Ligne de résultat individuelle
│   │   │   ├── InstructionsPanel.tsx         # Énoncé + critères + hints
│   │   │   ├── HintSystem.tsx                # Indices progressifs
│   │   │   ├── PlaygroundLayout.tsx          # Layout resizable 3 panneaux
│   │   │   └── FrameworkSelector.tsx         # Tabs Vanilla / React / Angular
│   │   │
│   │   ├── debrief/
│   │   │   ├── DebriefView.tsx               # Orchestrateur du débrief
│   │   │   ├── ImpactSection.tsx             # Section impact utilisateur
│   │   │   ├── AssistiveTechScenario.tsx     # Card avant/après par technologie
│   │   │   ├── SolutionDiff.tsx              # Vue diff code initial vs solution
│   │   │   ├── SolutionAnnotated.tsx         # Code solution avec annotations
│   │   │   ├── ReferencesTable.tsx           # Tableau WCAG + RGAA + liens
│   │   │   └── FurtherReading.tsx            # Ressources complémentaires
│   │   │
│   │   ├── contribute/
│   │   │   ├── ChallengeEditor.tsx           # Formulaire complet de création/édition de challenge
│   │   │   ├── ChallengeMetaForm.tsx         # Sous-formulaire : type, catégorie, difficulté, frameworks, tags
│   │   │   ├── StarterCodeEditor.tsx         # Éditeur du code de départ (CodeMirror + tabs fichiers)
│   │   │   ├── TestBuilder.tsx               # Interface de création de tests (axe-rule picker, keyboard steps builder, aria checker)
│   │   │   ├── DebriefEditor.tsx             # Éditeur MDX du débrief avec preview live
│   │   │   ├── CriteriaSelector.tsx          # Sélecteur WCAG/RGAA avec recherche + auto-mapping
│   │   │   ├── HintEditor.tsx                # Éditeur d'indices progressifs
│   │   │   ├── ContributionStatusBadge.tsx   # Badge de statut (draft, submitted, in_review, etc.)
│   │   │   ├── ReviewPanel.tsx               # Panel de review : commentaires, approve/reject
│   │   │   └── ContributionDashboard.tsx     # Vue d'ensemble des contributions de l'utilisateur
│   │   │
│   │   ├── references/
│   │   │   ├── WcagTable.tsx                 # Table WCAG filtrable
│   │   │   ├── RgaaTable.tsx                 # Table RGAA filtrable
│   │   │   ├── MappingTable.tsx              # Correspondance interactive
│   │   │   └── CriterionDetail.tsx           # Expandable row avec détail + mapping
│   │   │
│   │   ├── profil/
│   │   │   ├── ProgressMap.tsx               # Progression par parcours
│   │   │   ├── BadgeGrid.tsx                 # Grille de badges (débloqués + verrouillés)
│   │   │   ├── ActivityHeatmap.tsx           # Heatmap style GitHub
│   │   │   └── AttemptHistory.tsx            # Historique des tentatives
│   │   │
│   │   ├── mdx/                              # Composants MDX custom pour les débriefs
│   │   │   ├── ImpactScenario.tsx            # <ImpactScenario tech="screen-reader">
│   │   │   ├── SolutionCode.tsx              # <SolutionCode framework="vanilla">
│   │   │   ├── Annotation.tsx                # <Annotation line={3}>
│   │   │   ├── Decision.tsx                  # <Decision title="...">
│   │   │   ├── Alternative.tsx               # <Alternative approach="...">
│   │   │   ├── WcagRef.tsx                   # <WcagRef id="1.3.1">
│   │   │   ├── RgaaRef.tsx                   # <RgaaRef id="7.1.1">
│   │   │   ├── ApgPattern.tsx                # <ApgPattern name="Accordion">
│   │   │   └── Resource.tsx                  # <Resource title="..." url="...">
│   │   │
│   │   └── ui/                               # Composants génériques accessibles
│   │       ├── Button.tsx
│   │       ├── Dialog.tsx                    # Piège de focus, Escape pour fermer, retour focus
│   │       ├── Tabs.tsx                      # Navigation flèches, roving tabindex
│   │       ├── Accordion.tsx                 # Pattern APG accordion
│   │       ├── Tag.tsx
│   │       ├── Toast.tsx                     # role="status", aria-live="polite"
│   │       ├── ProgressBar.tsx               # role="progressbar", aria-valuenow/min/max
│   │       ├── Select.tsx                    # Combobox accessible
│   │       ├── Input.tsx                     # Label associé, aria-describedby pour erreurs
│   │       ├── Textarea.tsx
│   │       ├── Checkbox.tsx
│   │       ├── RadioGroup.tsx
│   │       ├── Badge.tsx
│   │       ├── Skeleton.tsx
│   │       ├── ResizablePanels.tsx           # Panels redimensionnables accessibles
│   │       └── DropdownMenu.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                     # createBrowserClient()
│   │   │   ├── server.ts                     # createServerClient() pour RSC et Route Handlers
│   │   │   └── middleware.ts                 # Refresh token automatique
│   │   ├── db/
│   │   │   ├── schema.ts                     # Schéma Drizzle complet (voir section dédiée)
│   │   │   ├── client.ts                     # Instance Drizzle connectée à Supabase PostgreSQL
│   │   │   └── queries/
│   │   │       ├── challenges.ts             # Requêtes challenges (CRUD + filtres)
│   │   │       ├── attempts.ts               # Requêtes tentatives
│   │   │       ├── contributions.ts          # Requêtes contributions (CRUD + workflow)
│   │   │       ├── parcours.ts
│   │   │       ├── progress.ts
│   │   │       └── references.ts             # Requêtes WCAG/RGAA/mapping
│   │   ├── sandbox/
│   │   │   ├── runner.ts                     # Orchestration : compile code → injecte dans iframe → run axe
│   │   │   ├── axe-bridge.ts                 # Communication postMessage avec l'iframe pour axe-core
│   │   │   └── keyboard-tester.ts            # Simulation de navigation clavier via Playwright (server-side)
│   │   ├── validation/
│   │   │   ├── challenge.schema.ts           # Schéma Zod pour Challenge
│   │   │   ├── debrief.schema.ts             # Schéma Zod pour Debrief
│   │   │   ├── contribution.schema.ts        # Schéma Zod pour soumission/review
│   │   │   └── references.ts                 # Validation que les IDs WCAG/RGAA existent en base
│   │   ├── scoring.ts                        # Calcul du score (tests passés, bonus temps, bonus first try)
│   │   ├── badges.ts                         # Logique de déblocage des badges
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── useChallenge.ts                   # Fetch + état du challenge courant
│   │   ├── useCodeEditor.ts                  # État de l'éditeur (fichiers, onglet actif, dirty state)
│   │   ├── useTestRunner.ts                  # Exécution des tests + état résultats
│   │   ├── useProgress.ts                    # Progression utilisateur
│   │   ├── useAnnouncer.ts                   # Hook pour annoncer via la live region globale
│   │   ├── useContribution.ts                # CRUD contribution
│   │   └── useMediaQuery.ts                  # Responsive + prefers-reduced-motion
│   │
│   ├── types/
│   │   ├── challenge.ts
│   │   ├── debrief.ts
│   │   ├── contribution.ts
│   │   ├── reference.ts
│   │   ├── user.ts
│   │   └── index.ts
│   │
│   └── middleware.ts                         # Supabase auth middleware (refresh token)
│
├── supabase/
│   ├── migrations/                           # Migrations SQL générées par Drizzle
│   ├── seed.ts                               # Seed : challenges initiaux + critères WCAG/RGAA
│   └── config.toml                           # Config Supabase locale
│
├── content/
│   ├── debriefs/                             # Fichiers MDX des débriefs
│   │   ├── missing-alt-text.mdx
│   │   ├── form-labels.mdx
│   │   └── ...
│   └── seed/
│       ├── wcag-2.2-criteria.json            # Dump structuré WCAG 2.2 complet
│       ├── rgaa-4.1-criteria.json            # Dump structuré RGAA 4.1 complet
│       └── wcag-rgaa-mapping.json            # Table de correspondance
│
├── public/
│   ├── og/                                   # Images OpenGraph
│   └── icons/                                # Icônes catégories et TA
│
├── tests/
│   ├── e2e/                                  # Tests Playwright
│   │   ├── challenge-flow.spec.ts            # Parcours : choisir → coder → soumettre → débrief
│   │   ├── contribution-flow.spec.ts         # Parcours : créer → soumettre → review → publier
│   │   └── a11y-audit.spec.ts                # Audit axe-core de la plateforme elle-même
│   └── unit/
│       ├── scoring.test.ts
│       ├── validation.test.ts
│       └── badges.test.ts
│
├── .env.local.example
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── playwright.config.ts
└── package.json
```

---

## SCHÉMA BASE DE DONNÉES (Drizzle + PostgreSQL/Supabase)

```typescript
// src/lib/db/schema.ts

import {
  pgTable, pgEnum,
  uuid, text, integer, real, boolean, timestamp, jsonb,
  primaryKey, uniqueIndex, index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ───

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

// ─── Tables ───

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

// ─── Challenges ───

export const challenges = pgTable("challenges", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  instructions: text("instructions").notNull(), // Markdown
  type: challengeTypeEnum("type").notNull(),
  category: categoryEnum("category").notNull(),
  difficulty: integer("difficulty").notNull(), // 1-5
  frameworks: jsonb("frameworks").$type<string[]>().notNull(), // ["vanilla", "react"]
  estimatedMinutes: integer("estimated_minutes").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  starterCode: jsonb("starter_code").$type<Record<string, { files: CodeFile[]; entryFile: string }>>().notNull(),
  tests: jsonb("tests").$type<ChallengeTest[]>().notNull(),
  hints: jsonb("hints").$type<string[]>(),
  debriefContent: text("debrief_content"), // MDX brut du débrief
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

// ─── Challenge ↔ Critères WCAG/RGAA (many-to-many) ───

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

// ─── Contributions ───

export const contributions = pgTable("contributions", {
  id: uuid("id").primaryKey().defaultRandom(),
  challengeId: uuid("challenge_id").references(() => challenges.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  status: contributionStatusEnum("status").default("draft").notNull(),
  version: integer("version").default(1).notNull(),
  /** Snapshot complet du challenge au moment de la soumission */
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
  /** Commentaires inline sur des sections spécifiques */
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

// ─── Tentatives & Progression ───

export const attempts = pgTable("attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  challengeId: uuid("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  framework: frameworkEnum("framework").notNull(),
  status: challengeStatusEnum("status").notNull(),
  submittedCode: jsonb("submitted_code").$type<Record<string, string>>(),
  testResults: jsonb("test_results").$type<TestResult[]>(),
  score: real("score").default(0),
  timeSpent: integer("time_spent").default(0), // secondes
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

// ─── Parcours ───

export const parcours = pgTable("parcours", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: categoryEnum("category").notNull(),
  prerequisites: jsonb("prerequisites").$type<string[]>(), // slugs d'autres parcours
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const parcoursSteps = pgTable("parcours_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  parcoursId: uuid("parcours_id").references(() => parcours.id, { onDelete: "cascade" }).notNull(),
  challengeId: uuid("challenge_id").references(() => challenges.id).notNull(),
  orderIndex: integer("order_index").notNull(),
  contextNote: text("context_note"), // Markdown
  required: boolean("required").default(true).notNull(),
}, (table) => [
  index("parcours_steps_parcours_idx").on(table.parcoursId),
  uniqueIndex("parcours_steps_unique_idx").on(table.parcoursId, table.orderIndex),
]);

// ─── Références WCAG & RGAA ───

export const wcagCriteria = pgTable("wcag_criteria", {
  id: text("id").primaryKey(), // "1.1.1", "1.3.1", etc.
  name: text("name").notNull(),
  level: wcagLevelEnum("level").notNull(),
  principle: wcagPrincipleEnum("principle").notNull(),
  guideline: text("guideline").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  techniques: jsonb("techniques").$type<string[]>(),
});

export const rgaaCriteria = pgTable("rgaa_criteria", {
  id: text("id").primaryKey(), // "1.1.1", "7.1.1", etc.
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

// ─── Relations Drizzle ───

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

// ─── Types JSON utilisés dans les colonnes JSONB ───

interface CodeFile {
  filename: string;
  language: "html" | "css" | "javascript" | "typescript" | "tsx" | "scss";
  content: string;
  readOnly?: boolean;
}

interface ChallengeTest {
  id: string;
  label: string;
  type: "axe-rule" | "keyboard" | "aria-attribute" | "custom";
  config: Record<string, unknown>;
}

interface TestResult {
  testId: string;
  passed: boolean;
  message?: string;
}

interface DebriefMeta {
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

interface InlineComment {
  section: string; // "instructions" | "starterCode" | "tests" | "debrief"
  path?: string; // chemin dans le JSON, ex: "starterCode.vanilla.files[0].content"
  line?: number;
  comment: string;
}
```

---

## TYPES TYPESCRIPT

```typescript
// src/types/challenge.ts

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
```

```typescript
// src/types/contribution.ts

export type ContributionStatus =
  | "draft" | "submitted" | "in_review"
  | "changes_requested" | "approved" | "published" | "rejected";

export type ReviewAction = "approve" | "request_changes" | "reject" | "comment";

export interface Contribution {
  id: string;
  challengeId?: string;
  authorId: string;
  status: ContributionStatus;
  version: number;
  challengeSnapshot: Record<string, unknown>;
  submittedAt?: Date;
  resolvedAt?: Date;
}

export interface ContributionReview {
  id: string;
  contributionId: string;
  reviewerId: string;
  action: ReviewAction;
  comment?: string;
  inlineComments?: InlineComment[];
  createdAt: Date;
}

export interface InlineComment {
  section: "instructions" | "starterCode" | "tests" | "debrief";
  path?: string;
  line?: number;
  comment: string;
}
```

```typescript
// src/types/reference.ts

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
```

```typescript
// src/types/user.ts

export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl?: string;
  githubHandle?: string;
  isReviewer: boolean;
  stats: UserStats;
}

export interface UserStats {
  totalCompleted: number;
  totalAttempted: number;
  currentStreak: number;
  longestStreak: number;
  byCategory: Record<Category, { completed: number; total: number }>;
  badges: Badge[];
}

export interface Badge {
  id: string;
  badgeType: string;
  badgeValue?: string;
  unlockedAt: Date;
}

export interface ChallengeAttempt {
  id: string;
  userId: string;
  challengeId: string;
  framework: Framework;
  status: ChallengeStatus;
  submittedCode?: Record<string, string>;
  testResults?: TestResult[];
  score: number;
  timeSpent: number;
  submittedAt: Date;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  message?: string;
}
```

---

## DESIGN SYSTEM & CSS VARIABLES

```css
/* src/app/globals.css */

@import "tailwindcss";

:root {
  /* ─── Couleurs sémantiques ─── */
  --color-primary: #1a365d;
  --color-primary-hover: #2a4a7f;
  --color-primary-light: #ebf2ff;

  --color-success: #38a169;
  --color-success-light: #e6f7ed;
  --color-error: #c53030;
  --color-error-light: #fde8e8;
  --color-warning: #dd6b20;
  --color-warning-light: #fef3e2;
  --color-info: #3182ce;

  --color-focus: #4c9aff;

  /* ─── Surfaces ─── */
  --color-bg: #fafaf9;
  --color-bg-elevated: #ffffff;
  --color-bg-muted: #f1f0ee;
  --color-bg-code: #1e1e2e;

  /* ─── Texte ─── */
  --color-text: #1a202c;
  --color-text-secondary: #4a5568;
  --color-text-muted: #718096;
  --color-text-inverse: #f7fafc;

  /* ─── Bordures ─── */
  --color-border: #e2e0dc;
  --color-border-strong: #a0aec0;

  /* ─── Typographie ─── */
  --font-display: "Fira Code", monospace;
  --font-body: "Atkinson Hyperlegible", sans-serif;
  --font-code: "Fira Code", "JetBrains Mono", monospace;

  /* ─── Espacements ─── */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* ─── Rayons ─── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* ─── Ombres ─── */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* ─── Focus ─── */
  --focus-ring: 2px solid var(--color-focus);
  --focus-offset: 2px;

  /* ─── Transitions ─── */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}

/* ─── Dark mode ─── */
[data-theme="dark"] {
  --color-primary: #63b3ed;
  --color-primary-hover: #90cdf4;
  --color-primary-light: #1a365d;

  --color-bg: #1a1a2e;
  --color-bg-elevated: #2d2d44;
  --color-bg-muted: #252540;
  --color-bg-code: #0d1117;

  --color-text: #e2e8f0;
  --color-text-secondary: #a0aec0;
  --color-text-muted: #718096;
  --color-text-inverse: #1a202c;

  --color-border: #3d3d5c;
  --color-border-strong: #5a5a7a;

  --color-success-light: #1a3a2a;
  --color-error-light: #3a1a1a;
  --color-warning-light: #3a2a1a;
}

/* ─── Réduction de mouvement ─── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ─── Focus visible global ─── */
:focus-visible {
  outline: var(--focus-ring);
  outline-offset: var(--focus-offset);
}

/* ─── Skip links ─── */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-md);
  z-index: 100;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
}

.skip-link:focus {
  top: var(--space-sm);
}
```

---

## WORKFLOW DE CONTRIBUTION INTÉGRÉ

### Rôles et permissions

| Rôle | Créer challenge | Éditer ses challenges | Soumettre pour review | Reviewer | Publier |
|---|---|---|---|---|---|
| Utilisateur connecté | ✅ | ✅ | ✅ | ❌ | ❌ |
| Reviewer | ✅ | ✅ | ✅ | ✅ | ❌ |
| Admin (toi) | ✅ | ✅ | ✅ | ✅ | ✅ |

### Workflow d'un challenge contribué

```
draft → submitted → in_review → approved → published
                  ↘ changes_requested → submitted (resoumission)
                  ↘ rejected (fin)
```

### Éditeur de challenge intégré (`/contribute/new`)

L'éditeur est un formulaire multi-étapes accessible :

**Étape 1 — Métadonnées**
- Titre, résumé, type (fix/build/audit), catégorie, difficulté, frameworks, durée estimée, tags
- Sélecteur de critères WCAG avec auto-complétion et mapping RGAA automatique

**Étape 2 — Code de départ**
- CodeMirror avec tabs multi-fichiers par framework
- Bouton "Ajouter un fichier" / "Supprimer"
- Toggle "Read-only" par fichier
- Sélecteur de fichier d'entrée

**Étape 3 — Tests**
- Interface de construction de tests :
  - Type "axe-rule" : dropdown des règles axe-core avec recherche
  - Type "keyboard" : builder de séquence clavier (ajouter des steps avec action + sélecteur attendu)
  - Type "aria-attribute" : sélecteur CSS + liste d'attributs attendus
  - Type "custom" : éditeur Playwright (pour les reviewers/admins uniquement)
- Bouton "Tester maintenant" : exécute les tests sur le starter code pour vérifier qu'ils échouent

**Étape 4 — Indices**
- 1 à 5 indices progressifs, du plus vague au plus explicite
- Éditeur Markdown simple

**Étape 5 — Débrief pédagogique**
- Éditeur MDX avec preview live
- Templates pré-remplis pour les sections (impact, solution, références)
- Les composants MDX custom (<ImpactScenario>, <WcagRef>, etc.) sont disponibles en auto-complétion
- La solution de référence est un CodeMirror séparé

**Étape 6 — Prévisualisation & soumission**
- Preview complète du challenge tel qu'il sera vu par l'utilisateur
- Validation Zod en temps réel avec messages d'erreur accessibles
- Bouton "Sauvegarder en brouillon" / "Soumettre pour review"

### Interface de review (`/contribute/[id]/review`)

- Vue split : challenge preview à gauche, panel de review à droite
- Commentaires inline par section (cliquable sur instructions, code, tests, débrief)
- Actions : Approuver / Demander des modifications / Rejeter (avec commentaire obligatoire)
- Historique des reviews précédentes
- Diff entre versions si re-soumission

---

## SUPABASE — ROW LEVEL SECURITY (RLS)

```sql
-- Les challenges publiés sont lisibles par tous
CREATE POLICY "Challenges publiés lisibles par tous"
  ON challenges FOR SELECT
  USING (is_published = true);

-- Les challenges non publiés sont lisibles par leur auteur et les reviewers
CREATE POLICY "Challenges draft lisibles par auteur"
  ON challenges FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM contributors
      WHERE contributors.challenge_id = challenges.id
      AND contributors.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.supabase_auth_id = auth.uid()::text
      AND users.is_reviewer = true
    )
  );

-- Les contributions sont lisibles par leur auteur et les reviewers
CREATE POLICY "Contributions lisibles par auteur et reviewers"
  ON contributions FOR SELECT
  USING (
    author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.supabase_auth_id = auth.uid()::text
      AND users.is_reviewer = true
    )
  );

-- Les tentatives sont privées
CREATE POLICY "Tentatives privées"
  ON attempts FOR ALL
  USING (user_id = auth.uid());

-- Les badges sont privés
CREATE POLICY "Badges privés"
  ON badges FOR ALL
  USING (user_id = auth.uid());
```

---

## SEED INITIAL

Le script de seed (`supabase/seed.ts`) doit :

1. Importer et insérer tous les critères WCAG 2.2 depuis `content/seed/wcag-2.2-criteria.json`
2. Importer et insérer tous les critères RGAA 4.1 depuis `content/seed/rgaa-4.1-criteria.json`
3. Importer et insérer la table de correspondance depuis `content/seed/wcag-rgaa-mapping.json`
4. Insérer 3 à 5 challenges initiaux simples avec leurs débriefs (pour avoir du contenu au lancement)
5. Insérer 2 parcours initiaux (Formulaires, Navigation clavier)

---

## COMMANDES DE DÉVELOPPEMENT

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:seed": "tsx supabase/seed.ts",
    "db:studio": "drizzle-kit studio",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/e2e/a11y-audit.spec.ts",
    "validate:challenge": "tsx src/scripts/validate-challenge.ts",
    "validate:debrief": "tsx src/scripts/validate-debrief.ts",
    "check:coverage": "tsx src/scripts/check-coverage.ts"
  }
}
```

---

## ORDRE D'IMPLÉMENTATION RECOMMANDÉ

### Phase 1 — Fondations
1. Init Next.js 15 + TypeScript + Tailwind + ESLint
2. Configurer Supabase (projet, auth providers GitHub/Google, variables d'env)
3. Installer et configurer Drizzle avec le schéma complet
4. Exécuter les migrations + seed WCAG/RGAA
5. Implémenter le layout racine (SkipLinks, Header, Footer, LiveAnnouncer, dark mode toggle)
6. Implémenter les composants UI de base (Button, Input, Tabs, Dialog, Toast, Tag)
7. Implémenter l'auth (login, callback, middleware, guard pages)

### Phase 2 — Challenges (lecture)
1. Page liste des challenges avec filtres
2. Challenge playground (CodeEditor + Preview + TestRunner)
3. Sandbox iframe + bridge axe-core
4. Système de scoring
5. Page débrief avec composants MDX

### Phase 3 — Contribution (écriture)
1. Éditeur de challenge multi-étapes
2. TestBuilder (interface de création de tests)
3. DebriefEditor (éditeur MDX + preview)
4. CriteriaSelector (sélecteur WCAG/RGAA)
5. Workflow de soumission et sauvegarde brouillon
6. Interface de review
7. Dashboard contributeur

### Phase 4 — Parcours & Progression
1. Pages parcours (liste + détail avec timeline)
2. Système de progression utilisateur
3. Page profil (stats, badges, heatmap, historique)
4. Logique de badges

### Phase 5 — Références
1. Tables WCAG et RGAA navigables
2. Tableau de correspondance interactif
3. Lien depuis les débriefs vers les références

### Phase 6 — Polish
1. Pages d'erreur (404, 500)
2. Empty states
3. Skeletons de chargement
4. SEO (metadata, OG images, sitemap)
5. Tests E2E
6. Audit a11y de la plateforme elle-même avec axe-core + Playwright
