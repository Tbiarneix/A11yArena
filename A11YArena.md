# A11y Arena — Instructions Projet

> Plateforme gratuite de challenges interactifs dédiés à l'accessibilité numérique.
> Apprendre en pratiquant, comprendre par l'impact utilisateur, maîtriser WCAG & RGAA.

---

## RÈGLES CRITIQUES (à respecter dans CHAQUE fichier)

### Accessibilité — La plateforme DOIT être exemplaire

- Skip links sur TOUTES les pages (`Aller au contenu principal`, `Aller à la navigation`)
- Landmarks sémantiques : `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` — jamais de `<div>` pour ces rôles
- Hiérarchie de titres stricte : un seul `<h1>` par page, pas de saut de niveau
- Focus visible sur TOUS les éléments interactifs : `outline: 2px solid $color-focus` avec `outline-offset: 2px` — JAMAIS `outline: none`
- Live regions (`role="status"`, `aria-live="polite"`) pour TOUS les feedbacks dynamiques (résultats de tests, toasts, sauvegarde)
- Labels explicites sur TOUS les champs de formulaire — pas de placeholder seul
- Contrastes AA minimum (4.5:1 texte, 3:1 composants UI) — vérifier avec les design tokens
- `prefers-reduced-motion: reduce` respecté sur TOUTES les animations
- Navigation clavier complète sur TOUS les composants interactifs
- Attributs `aria-*` conformes aux patterns APG (tabs, dialog, accordion, combobox, etc.)

### CSS — SCSS Modules + BEM strict

- **JAMAIS de Tailwind, utilitaires CSS atomiques, ou styles inline**
- Chaque composant a son fichier `.module.scss` co-localisé
- Nommage BEM strict : `.block__element--modifier`
- Les design tokens (couleurs, espacements, typographie, ombres, rayons) vivent dans `src/design/tokens/` et sont importés via `@use`
- Les mixins réutilisables (responsive, focus, transitions) vivent dans `src/design/mixins/`
- Les styles globaux (reset, typographie de base, skip links) vivent dans `src/design/global/`
- JAMAIS de valeur magique en dur — toujours un token ou une variable
- Imbrication SCSS limitée à 3 niveaux max
- Pas de `@extend` — utiliser des mixins
- Les media queries utilisent les mixins responsive (`@include breakpoint(md)`)

```scss
// ✅ BON
@use "@/design/tokens" as *;
@use "@/design/mixins" as *;

.challenge-card {
  padding: $space-md;
  border-radius: $radius-md;
  background-color: $color-bg-elevated;

  &__title {
    font-family: $font-display;
    font-size: $font-size-lg;
    color: $color-text;
  }

  &__badge--fix {
    background-color: $color-info;
  }
  &__badge--build {
    background-color: $color-success;
  }
  &__badge--audit {
    background-color: $color-warning;
  }

  &:focus-visible {
    @include focus-ring;
  }
}

// ❌ INTERDIT
.card {
  padding: 16px; // Valeur magique
  color: #1a202c; // Couleur en dur
  @extend .some-class; // Pas de @extend
}
```

### Convention de code

- TypeScript strict (`strict: true`, pas de `any`)
- Composants React fonctionnels avec hooks uniquement
- Server Components par défaut, `"use client"` uniquement quand nécessaire (interactivité, hooks)
- Nommage : PascalCase composants, camelCase fonctions/variables, kebab-case fichiers et routes
- Imports absolus avec alias `@/` mappé sur `src/`
- Pas de `console.log` en production — utiliser un logger si nécessaire
- Pas de `// @ts-ignore` ni `// eslint-disable`
- Tests unitaires pour la logique métier (domain + application)
- Tests E2E Playwright pour les parcours critiques

### Architecture — Domain Driven Design

L'architecture suit une séparation stricte en couches. La règle de dépendance est absolue : **les couches internes ne connaissent JAMAIS les couches externes**.

```
domain ← application ← infrastructure
                      ← presentation (components, pages)
```

- **`domain/`** : Entités, Value Objects, types métier, règles métier pures. ZÉRO dépendance externe (pas de React, pas de Supabase, pas de Next.js, pas de Zod). Testable unitairement à 100%.
- **`application/`** : Use cases, ports (interfaces), DTOs. Orchestre le domaine. Dépend uniquement de `domain/`. Définit les interfaces (ports) que l'infrastructure implémente.
- **`infrastructure/`** : Adapters (implémentations des ports). Supabase, Drizzle, axe-core, iframe sandbox. Dépend de `domain/` et `application/`.
- **`components/`** : Composants UI React purs. Reçoivent des props typées, affichent, émettent des événements. Pas de logique métier, pas de fetch, pas d'accès direct à l'infrastructure. Chaque composant a son `.module.scss` co-localisé.
- **`app/`** (pages Next.js) : Orchestration. Connecte les composants aux use cases via les hooks. Appelle l'infrastructure au niveau Server Components / Route Handlers.
- **`design/`** : Tokens, mixins, styles globaux. Aucune logique, aucun composant. Consommé par les `.module.scss` des composants via `@use`.

```
// ✅ BON — Un composant UI importe uniquement des types domain et son style
import type { Challenge } from '@/domain/challenge/Challenge';
import styles from './ChallengeCard.module.scss';

// ✅ BON — Un use case importe uniquement du domain et des ports
import type { Challenge } from '@/domain/challenge/Challenge';
import type { ChallengeRepository } from '@/application/ports/ChallengeRepository';

// ❌ INTERDIT — Un composant importe de l'infrastructure
import { supabase } from '@/infrastructure/supabase/client';

// ❌ INTERDIT — Le domain importe de l'application ou de l'infrastructure
import { SubmitAttemptUseCase } from '@/application/use-cases/SubmitAttempt';

// ❌ INTERDIT — Un composant contient de la logique métier
const score = tests.filter(t => t.passed).length / tests.length * 100; // → ça va dans domain/scoring
```

---

## STACK TECHNIQUE

| Couche               | Techno                    | Config                                                                                             |
| -------------------- | ------------------------- | -------------------------------------------------------------------------------------------------- |
| Framework            | Next.js 15 (App Router)   | `next@latest`, RSC par défaut                                                                      |
| Langage              | TypeScript 5+             | `strict: true`                                                                                     |
| Base de données      | PostgreSQL via Supabase   | Client `@supabase/supabase-js` + `@supabase/ssr`                                                   |
| ORM                  | Drizzle ORM               | `drizzle-orm` + `drizzle-kit` + driver `postgres`                                                  |
| Auth                 | Supabase Auth             | GitHub + Google providers                                                                          |
| Stockage fichiers    | Supabase Storage          | Assets des challenges (images, captures)                                                           |
| Éditeur code         | CodeMirror 6              | `@codemirror/view`, `@codemirror/lang-html`, `@codemirror/lang-javascript`, `@codemirror/lang-css` |
| Sandbox              | iframe sandboxée + srcdoc | Rendu live du code utilisateur                                                                     |
| Tests a11y (runtime) | axe-core                  | Exécuté dans l'iframe via postMessage                                                              |
| Styling              | SCSS Modules + BEM        | `sass`, CSS Modules natifs Next.js                                                                 |
| Validation           | Zod                       | Couche application uniquement (pas dans domain)                                                    |
| MDX                  | next-mdx-remote           | Rendu des débriefs pédagogiques                                                                    |
| Déploiement          | Vercel                    | Preview deploys sur PR                                                                             |

### Variables d'environnement requises

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=              # Connexion directe PostgreSQL pour Drizzle
```

---

## RESSOURCES DESIGN — Google Stitch

Le projet dispose de maquettes complètes sur Google Stitch. **Toute création de page ou de composant doit s'appuyer sur l'écran Stitch correspondant comme source de vérité visuelle.**

- **Project ID :** `15833478698754473596`
- **Plateforme :** [https://stitch.google.com](https://stitch.google.com)
- **Design system :** "The Precise Craftsman" / "The Architectural Monograph"
- **MCP :** `mcp__stitch__*` (connecté via `@davideast/stitch-mcp`)

### Écrans disponibles

| Écran | Light | Dark | Screen ID (light) |
| ----- | ----- | ---- | ----------------- |
| Landing Page | ✅ | ✅ | `0b9a05a9a0134203941465f6ddbc8ba3` |
| Challenge List | ✅ | ✅ | `da7b0b2b6da045b184b192e3214d7175` |
| Challenge Playground | ✅ | ✅ | `035d84aa52964b488ec375e06cefed5e` |
| Debrief View | ✅ | ✅ | `600259ebded245188b244aa9133f0068` |
| Pathway Detail | ✅ | ✅ | `fa615f365f3047df815d90589f8801e0` |
| Pathways List | ✅ | ✅ | `fde3072233814fa7b705f68a93fe418a` |
| References Hub | ✅ | ✅ | `a40551e139554f7ca5afc78dc49c710b` |
| User Profile | ✅ | ✅ | `3ff84a83a241462581700f59a9c1ff14` |
| About Page | ✅ | ✅ | `7cf79c28f0ab4119a3a9e29ccc90352b` |

### Règle d'utilisation

Avant d'implémenter une page ou un composant significatif, consulter l'écran Stitch correspondant via :
```
mcp__stitch__get_screen({ name: "projects/15833478698754473596/screens/<SCREEN_ID>" })
```

Les tokens de design (`src/design/tokens/`) sont extraits directement de la palette Stitch. Tout écart doit être justifié par une contrainte d'accessibilité (contraste, focus, etc.).

---

## ARBORESCENCE PROJET

```
a11y-arena/
├── src/
│   │
│   │   ════════════════════════════════════════
│   │   DOMAIN — Entités, Value Objects, règles métier pures
│   │   Zéro dépendance externe
│   │   ════════════════════════════════════════
│   │
│   ├── domain/
│   │   ├── challenge/
│   │   │   ├── Challenge.ts
│   │   │   ├── ChallengeType.ts
│   │   │   ├── Category.ts
│   │   │   ├── Difficulty.ts
│   │   │   ├── Framework.ts
│   │   │   ├── StarterCode.ts
│   │   │   ├── ChallengeTest.ts
│   │   │   └── CodeFile.ts
│   │   ├── debrief/
│   │   │   ├── Debrief.ts
│   │   │   ├── ImpactScenario.ts
│   │   │   ├── AssistiveTech.ts
│   │   │   └── TechnicalDecision.ts
│   │   ├── reference/
│   │   │   ├── WcagCriterion.ts
│   │   │   ├── RgaaCriterion.ts
│   │   │   ├── CriterionReference.ts
│   │   │   ├── WcagLevel.ts
│   │   │   ├── WcagPrinciple.ts
│   │   │   └── RgaaTheme.ts
│   │   ├── contribution/
│   │   │   ├── Contribution.ts
│   │   │   ├── ContributionStatus.ts          # Machine à états (draft → published)
│   │   │   ├── Review.ts
│   │   │   ├── ReviewAction.ts
│   │   │   └── Contributor.ts
│   │   ├── user/
│   │   │   ├── User.ts
│   │   │   ├── UserRole.ts
│   │   │   └── Badge.ts
│   │   ├── attempt/
│   │   │   ├── Attempt.ts
│   │   │   ├── AttemptStatus.ts
│   │   │   ├── TestResult.ts
│   │   │   └── Score.ts                       # Règles de scoring pures
│   │   ├── parcours/
│   │   │   ├── Parcours.ts
│   │   │   └── ParcoursStep.ts
│   │   └── shared/
│   │       ├── Entity.ts
│   │       ├── ValueObject.ts
│   │       ├── Slug.ts
│   │       └── errors/
│   │           ├── DomainError.ts
│   │           ├── InvalidChallengeError.ts
│   │           ├── InvalidContributionTransitionError.ts
│   │           └── InsufficientPermissionsError.ts
│   │
│   │   ════════════════════════════════════════
│   │   APPLICATION — Use cases, ports, DTOs
│   │   Dépend uniquement de domain/
│   │   ════════════════════════════════════════
│   │
│   ├── application/
│   │   ├── ports/
│   │   │   ├── ChallengeRepository.ts
│   │   │   ├── AttemptRepository.ts
│   │   │   ├── ContributionRepository.ts
│   │   │   ├── UserRepository.ts
│   │   │   ├── ParcoursRepository.ts
│   │   │   ├── ReferenceRepository.ts
│   │   │   ├── BadgeRepository.ts
│   │   │   ├── TestExecutor.ts
│   │   │   └── AuthProvider.ts
│   │   ├── use-cases/
│   │   │   ├── challenge/
│   │   │   │   ├── ListChallenges.ts
│   │   │   │   ├── GetChallenge.ts
│   │   │   │   └── SubmitAttempt.ts
│   │   │   ├── contribution/
│   │   │   │   ├── CreateChallenge.ts
│   │   │   │   ├── UpdateChallenge.ts
│   │   │   │   ├── SubmitForReview.ts
│   │   │   │   ├── ReviewContribution.ts
│   │   │   │   ├── PublishChallenge.ts
│   │   │   │   └── ListMyContributions.ts
│   │   │   ├── parcours/
│   │   │   │   ├── ListParcours.ts
│   │   │   │   └── GetParcoursProgress.ts
│   │   │   ├── reference/
│   │   │   │   ├── SearchWcagCriteria.ts
│   │   │   │   ├── SearchRgaaCriteria.ts
│   │   │   │   └── GetWcagRgaaMapping.ts
│   │   │   └── user/
│   │   │       ├── GetUserProfile.ts
│   │   │       └── GetUserProgress.ts
│   │   ├── dto/
│   │   │   ├── ChallengeFiltersDTO.ts
│   │   │   ├── SubmitAttemptDTO.ts
│   │   │   ├── CreateChallengeDTO.ts
│   │   │   ├── ReviewDTO.ts
│   │   │   └── UserProgressDTO.ts
│   │   └── validation/
│   │       ├── challenge.schema.ts
│   │       ├── contribution.schema.ts
│   │       ├── attempt.schema.ts
│   │       └── review.schema.ts
│   │
│   │   ════════════════════════════════════════
│   │   INFRASTRUCTURE — Adapters (implémentations des ports)
│   │   Dépend de domain/ et application/
│   │   ════════════════════════════════════════
│   │
│   ├── infrastructure/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── db/
│   │   │   ├── schema.ts
│   │   │   ├── client.ts
│   │   │   └── mappers/
│   │   │       ├── ChallengeMapper.ts
│   │   │       ├── AttemptMapper.ts
│   │   │       ├── ContributionMapper.ts
│   │   │       ├── UserMapper.ts
│   │   │       ├── ParcoursMapper.ts
│   │   │       └── ReferenceMapper.ts
│   │   ├── repositories/
│   │   │   ├── DrizzleChallengeRepository.ts
│   │   │   ├── DrizzleAttemptRepository.ts
│   │   │   ├── DrizzleContributionRepository.ts
│   │   │   ├── DrizzleUserRepository.ts
│   │   │   ├── DrizzleParcoursRepository.ts
│   │   │   ├── DrizzleReferenceRepository.ts
│   │   │   ├── DrizzleBadgeRepository.ts
│   │   │   └── SupabaseAuthProvider.ts
│   │   ├── sandbox/
│   │   │   ├── AxeCoreTestExecutor.ts
│   │   │   ├── axe-bridge.ts
│   │   │   └── keyboard-tester.ts
│   │   └── di/
│   │       └── container.ts                   # Câblage ports → adapters
│   │
│   │   ════════════════════════════════════════
│   │   DESIGN — Tokens, mixins, styles globaux
│   │   Aucune logique, aucun composant
│   │   Consommé via @use dans les .module.scss
│   │   ════════════════════════════════════════
│   │
│   ├── design/
│   │   ├── tokens/
│   │   │   ├── _index.scss
│   │   │   ├── _colors.scss
│   │   │   ├── _typography.scss
│   │   │   ├── _spacing.scss
│   │   │   ├── _radii.scss
│   │   │   ├── _shadows.scss
│   │   │   ├── _breakpoints.scss
│   │   │   └── _z-index.scss
│   │   ├── mixins/
│   │   │   ├── _index.scss
│   │   │   ├── _breakpoints.scss
│   │   │   ├── _focus.scss
│   │   │   ├── _transitions.scss
│   │   │   ├── _typography.scss
│   │   │   ├── _visually-hidden.scss
│   │   │   └── _truncate.scss
│   │   └── global/
│   │       ├── _reset.scss
│   │       ├── _base.scss
│   │       ├── _skip-links.scss
│   │       ├── _focus.scss
│   │       └── _dark-mode.scss
│   │
│   │   ════════════════════════════════════════
│   │   COMPONENTS — UI React purs + SCSS Modules
│   │   Pas de logique métier, pas de fetch
│   │   Props typées depuis domain/
│   │   ════════════════════════════════════════
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Header.module.scss
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Footer.module.scss
│   │   │   ├── SkipLinks/
│   │   │   │   ├── SkipLinks.tsx
│   │   │   │   └── SkipLinks.module.scss
│   │   │   ├── Navigation/
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── Navigation.module.scss
│   │   │   └── LiveAnnouncer/
│   │   │       └── LiveAnnouncer.tsx
│   │   ├── challenge/
│   │   │   ├── ChallengeCard/
│   │   │   │   ├── ChallengeCard.tsx
│   │   │   │   └── ChallengeCard.module.scss
│   │   │   ├── ChallengeFilters/
│   │   │   │   ├── ChallengeFilters.tsx
│   │   │   │   └── ChallengeFilters.module.scss
│   │   │   ├── CodeEditor/
│   │   │   │   ├── CodeEditor.tsx
│   │   │   │   └── CodeEditor.module.scss
│   │   │   ├── Preview/
│   │   │   │   ├── Preview.tsx
│   │   │   │   └── Preview.module.scss
│   │   │   ├── TestRunner/
│   │   │   │   ├── TestRunner.tsx
│   │   │   │   └── TestRunner.module.scss
│   │   │   ├── TestResultItem/
│   │   │   │   ├── TestResultItem.tsx
│   │   │   │   └── TestResultItem.module.scss
│   │   │   ├── InstructionsPanel/
│   │   │   │   ├── InstructionsPanel.tsx
│   │   │   │   └── InstructionsPanel.module.scss
│   │   │   ├── HintSystem/
│   │   │   │   ├── HintSystem.tsx
│   │   │   │   └── HintSystem.module.scss
│   │   │   ├── PlaygroundLayout/
│   │   │   │   ├── PlaygroundLayout.tsx
│   │   │   │   └── PlaygroundLayout.module.scss
│   │   │   └── FrameworkSelector/
│   │   │       ├── FrameworkSelector.tsx
│   │   │       └── FrameworkSelector.module.scss
│   │   ├── debrief/
│   │   │   ├── DebriefView/
│   │   │   │   ├── DebriefView.tsx
│   │   │   │   └── DebriefView.module.scss
│   │   │   ├── ImpactSection/
│   │   │   │   ├── ImpactSection.tsx
│   │   │   │   └── ImpactSection.module.scss
│   │   │   ├── AssistiveTechScenario/
│   │   │   │   ├── AssistiveTechScenario.tsx
│   │   │   │   └── AssistiveTechScenario.module.scss
│   │   │   ├── SolutionDiff/
│   │   │   │   ├── SolutionDiff.tsx
│   │   │   │   └── SolutionDiff.module.scss
│   │   │   ├── SolutionAnnotated/
│   │   │   │   ├── SolutionAnnotated.tsx
│   │   │   │   └── SolutionAnnotated.module.scss
│   │   │   ├── ReferencesTable/
│   │   │   │   ├── ReferencesTable.tsx
│   │   │   │   └── ReferencesTable.module.scss
│   │   │   └── FurtherReading/
│   │   │       ├── FurtherReading.tsx
│   │   │       └── FurtherReading.module.scss
│   │   ├── contribute/
│   │   │   ├── ChallengeEditor/
│   │   │   │   ├── ChallengeEditor.tsx
│   │   │   │   └── ChallengeEditor.module.scss
│   │   │   ├── ChallengeMetaForm/
│   │   │   │   ├── ChallengeMetaForm.tsx
│   │   │   │   └── ChallengeMetaForm.module.scss
│   │   │   ├── StarterCodeEditor/
│   │   │   │   ├── StarterCodeEditor.tsx
│   │   │   │   └── StarterCodeEditor.module.scss
│   │   │   ├── TestBuilder/
│   │   │   │   ├── TestBuilder.tsx
│   │   │   │   └── TestBuilder.module.scss
│   │   │   ├── DebriefEditor/
│   │   │   │   ├── DebriefEditor.tsx
│   │   │   │   └── DebriefEditor.module.scss
│   │   │   ├── CriteriaSelector/
│   │   │   │   ├── CriteriaSelector.tsx
│   │   │   │   └── CriteriaSelector.module.scss
│   │   │   ├── HintEditor/
│   │   │   │   ├── HintEditor.tsx
│   │   │   │   └── HintEditor.module.scss
│   │   │   ├── ContributionStatusBadge/
│   │   │   │   ├── ContributionStatusBadge.tsx
│   │   │   │   └── ContributionStatusBadge.module.scss
│   │   │   ├── ReviewPanel/
│   │   │   │   ├── ReviewPanel.tsx
│   │   │   │   └── ReviewPanel.module.scss
│   │   │   └── ContributionDashboard/
│   │   │       ├── ContributionDashboard.tsx
│   │   │       └── ContributionDashboard.module.scss
│   │   ├── references/
│   │   │   ├── WcagTable/
│   │   │   │   ├── WcagTable.tsx
│   │   │   │   └── WcagTable.module.scss
│   │   │   ├── RgaaTable/
│   │   │   │   ├── RgaaTable.tsx
│   │   │   │   └── RgaaTable.module.scss
│   │   │   ├── MappingTable/
│   │   │   │   ├── MappingTable.tsx
│   │   │   │   └── MappingTable.module.scss
│   │   │   └── CriterionDetail/
│   │   │       ├── CriterionDetail.tsx
│   │   │       └── CriterionDetail.module.scss
│   │   ├── profil/
│   │   │   ├── ProgressMap/
│   │   │   │   ├── ProgressMap.tsx
│   │   │   │   └── ProgressMap.module.scss
│   │   │   ├── BadgeGrid/
│   │   │   │   ├── BadgeGrid.tsx
│   │   │   │   └── BadgeGrid.module.scss
│   │   │   ├── ActivityHeatmap/
│   │   │   │   ├── ActivityHeatmap.tsx
│   │   │   │   └── ActivityHeatmap.module.scss
│   │   │   └── AttemptHistory/
│   │   │       ├── AttemptHistory.tsx
│   │   │       └── AttemptHistory.module.scss
│   │   ├── mdx/
│   │   │   ├── ImpactScenario/
│   │   │   │   ├── ImpactScenario.tsx
│   │   │   │   └── ImpactScenario.module.scss
│   │   │   ├── SolutionCode/
│   │   │   │   ├── SolutionCode.tsx
│   │   │   │   └── SolutionCode.module.scss
│   │   │   ├── Annotation/
│   │   │   │   ├── Annotation.tsx
│   │   │   │   └── Annotation.module.scss
│   │   │   ├── Decision/
│   │   │   │   ├── Decision.tsx
│   │   │   │   └── Decision.module.scss
│   │   │   ├── WcagRef/
│   │   │   │   ├── WcagRef.tsx
│   │   │   │   └── WcagRef.module.scss
│   │   │   ├── RgaaRef/
│   │   │   │   ├── RgaaRef.tsx
│   │   │   │   └── RgaaRef.module.scss
│   │   │   ├── ApgPattern/
│   │   │   │   ├── ApgPattern.tsx
│   │   │   │   └── ApgPattern.module.scss
│   │   │   └── Resource/
│   │   │       ├── Resource.tsx
│   │   │       └── Resource.module.scss
│   │   └── ui/
│   │       ├── Button/
│   │       │   ├── Button.tsx
│   │       │   └── Button.module.scss
│   │       ├── Dialog/
│   │       │   ├── Dialog.tsx
│   │       │   └── Dialog.module.scss
│   │       ├── Tabs/
│   │       │   ├── Tabs.tsx
│   │       │   └── Tabs.module.scss
│   │       ├── Accordion/
│   │       │   ├── Accordion.tsx
│   │       │   └── Accordion.module.scss
│   │       ├── Tag/
│   │       │   ├── Tag.tsx
│   │       │   └── Tag.module.scss
│   │       ├── Toast/
│   │       │   ├── Toast.tsx
│   │       │   └── Toast.module.scss
│   │       ├── ProgressBar/
│   │       │   ├── ProgressBar.tsx
│   │       │   └── ProgressBar.module.scss
│   │       ├── Select/
│   │       │   ├── Select.tsx
│   │       │   └── Select.module.scss
│   │       ├── Input/
│   │       │   ├── Input.tsx
│   │       │   └── Input.module.scss
│   │       ├── Textarea/
│   │       │   ├── Textarea.tsx
│   │       │   └── Textarea.module.scss
│   │       ├── Checkbox/
│   │       │   ├── Checkbox.tsx
│   │       │   └── Checkbox.module.scss
│   │       ├── RadioGroup/
│   │       │   ├── RadioGroup.tsx
│   │       │   └── RadioGroup.module.scss
│   │       ├── Badge/
│   │       │   ├── Badge.tsx
│   │       │   └── Badge.module.scss
│   │       ├── Skeleton/
│   │       │   ├── Skeleton.tsx
│   │       │   └── Skeleton.module.scss
│   │       ├── ResizablePanels/
│   │       │   ├── ResizablePanels.tsx
│   │       │   └── ResizablePanels.module.scss
│   │       └── DropdownMenu/
│   │           ├── DropdownMenu.tsx
│   │           └── DropdownMenu.module.scss
│   │
│   │   ════════════════════════════════════════
│   │   PAGES — Orchestration Next.js App Router
│   │   Connecte components ↔ use cases
│   │   ════════════════════════════════════════
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── page.module.scss
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   └── page.module.scss
│   │   │   └── callback/route.ts
│   │   ├── challenges/
│   │   │   ├── page.tsx
│   │   │   ├── page.module.scss
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       ├── page.module.scss
│   │   │       └── debrief/
│   │   │           ├── page.tsx
│   │   │           └── page.module.scss
│   │   ├── parcours/
│   │   │   ├── page.tsx
│   │   │   ├── page.module.scss
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── page.module.scss
│   │   ├── references/
│   │   │   ├── page.tsx
│   │   │   ├── page.module.scss
│   │   │   ├── wcag/
│   │   │   │   ├── page.tsx
│   │   │   │   └── page.module.scss
│   │   │   ├── rgaa/
│   │   │   │   ├── page.tsx
│   │   │   │   └── page.module.scss
│   │   │   └── mapping/
│   │   │       ├── page.tsx
│   │   │       └── page.module.scss
│   │   ├── contribute/
│   │   │   ├── page.tsx
│   │   │   ├── page.module.scss
│   │   │   ├── new/
│   │   │   │   ├── page.tsx
│   │   │   │   └── page.module.scss
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       │   ├── page.tsx
│   │   │       │   └── page.module.scss
│   │   │       └── review/
│   │   │           ├── page.tsx
│   │   │           └── page.module.scss
│   │   ├── profil/
│   │   │   ├── page.tsx
│   │   │   └── page.module.scss
│   │   ├── a-propos/
│   │   │   ├── page.tsx
│   │   │   └── page.module.scss
│   │   └── api/
│   │       ├── challenges/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       ├── submit/route.ts
│   │       │       └── tests/route.ts
│   │       ├── contributions/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       └── review/route.ts
│   │       ├── parcours/route.ts
│   │       ├── progress/route.ts
│   │       └── references/mapping/route.ts
│   │
│   │   ════════════════════════════════════════
│   │   HOOKS — Ponts entre composants et application
│   │   ════════════════════════════════════════
│   │
│   ├── hooks/
│   │   ├── useChallenge.ts
│   │   ├── useCodeEditor.ts
│   │   ├── useTestRunner.ts
│   │   ├── useProgress.ts
│   │   ├── useContribution.ts
│   │   ├── useAnnouncer.ts
│   │   └── useMediaQuery.ts
│   │
│   └── middleware.ts
│
├── content/
│   ├── debriefs/
│   └── seed/
│       ├── wcag-2.2-criteria.json
│       ├── rgaa-4.1-criteria.json
│       └── wcag-rgaa-mapping.json
│
├── supabase/
│   ├── migrations/
│   ├── seed.ts
│   └── config.toml
│
├── public/
│   ├── og/
│   └── icons/
│
├── tests/
│   ├── unit/
│   │   ├── domain/
│   │   │   ├── Score.test.ts
│   │   │   ├── ContributionStatus.test.ts
│   │   │   └── Difficulty.test.ts
│   │   └── application/
│   │       ├── SubmitAttempt.test.ts
│   │       ├── ReviewContribution.test.ts
│   │       └── CreateChallenge.test.ts
│   └── e2e/
│       ├── challenge-flow.spec.ts
│       ├── contribution-flow.spec.ts
│       └── a11y-audit.spec.ts
│
├── .env.local.example
├── drizzle.config.ts
├── next.config.ts
├── tsconfig.json
├── playwright.config.ts
└── package.json
```

---

## DESIGN TOKENS SCSS

### Couleurs

```scss
// src/design/tokens/_colors.scss

$color-primary: #1a365d;
$color-primary-hover: #2a4a7f;
$color-primary-light: #ebf2ff;
$color-success: #38a169;
$color-success-light: #e6f7ed;
$color-error: #c53030;
$color-error-light: #fde8e8;
$color-warning: #dd6b20;
$color-warning-light: #fef3e2;
$color-info: #3182ce;
$color-focus: #4c9aff;

$color-bg: #fafaf9;
$color-bg-elevated: #ffffff;
$color-bg-muted: #f1f0ee;
$color-bg-code: #1e1e2e;
$color-text: #1a202c;
$color-text-secondary: #4a5568;
$color-text-muted: #718096;
$color-text-inverse: #f7fafc;
$color-border: #e2e0dc;
$color-border-strong: #a0aec0;

// Dark mode overrides (via CSS custom properties dans _dark-mode.scss)
$dark-bg: #1a1a2e;
$dark-bg-elevated: #2d2d44;
$dark-bg-muted: #252540;
$dark-bg-code: #0d1117;
$dark-text: #e2e8f0;
$dark-text-secondary: #a0aec0;
$dark-border: #3d3d5c;
```

### Typographie

```scss
// src/design/tokens/_typography.scss

$font-display: "Fira Code", monospace;
$font-body: "Atkinson Hyperlegible", sans-serif;
$font-code: "Fira Code", "JetBrains Mono", monospace;

$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-md: 1.125rem;
$font-size-lg: 1.25rem;
$font-size-xl: 1.5rem;
$font-size-2xl: 1.875rem;
$font-size-3xl: 2.25rem;
$font-size-4xl: 3rem;

$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### Espacements, rayons, ombres, breakpoints, z-index

```scss
// _spacing.scss
$space-xxs: 2px;
$space-xs: 4px;
$space-sm: 8px;
$space-md: 16px;
$space-lg: 24px;
$space-xl: 32px;
$space-2xl: 48px;
$space-3xl: 64px;
$space-4xl: 96px;

// _radii.scss
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-xl: 16px;
$radius-full: 9999px;

// _shadows.scss
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.12);

// _breakpoints.scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;

// _z-index.scss
$z-skip-links: 100;
$z-dropdown: 50;
$z-sticky: 40;
$z-modal-backdrop: 60;
$z-modal: 70;
$z-toast: 80;
$z-tooltip: 90;
```

---

## MIXINS SCSS

```scss
// _breakpoints.scss
@use "../tokens/breakpoints" as *;
@mixin breakpoint($name) {
  @media (min-width: map-get((sm: $breakpoint-sm, md: $breakpoint-md, lg: $breakpoint-lg, xl: $breakpoint-xl, 2xl: $breakpoint-2xl), $name)) {
    @content;
  }
}

// _focus.scss
@use "../tokens/colors" as *;
@mixin focus-ring {
  outline: 2px solid $color-focus;
  outline-offset: 2px;
}

// _transitions.scss
@mixin transition($properties...) {
  transition-property: $properties;
  transition-duration: 250ms;
  transition-timing-function: ease;
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
}

// _visually-hidden.scss
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// _typography.scss
@use "../tokens/typography" as *;
@mixin heading-1 {
  font-family: $font-display;
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
}
@mixin heading-2 {
  font-family: $font-display;
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
}
@mixin heading-3 {
  font-family: $font-display;
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  line-height: $line-height-tight;
}
@mixin body-text {
  font-family: $font-body;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  line-height: $line-height-normal;
}
@mixin code-text {
  font-family: $font-code;
  font-size: $font-size-sm;
  line-height: $line-height-relaxed;
}
```

---

## EXEMPLES DE CODE — Convention complète

### Composant UI (components/)

```tsx
// src/components/challenge/ChallengeCard/ChallengeCard.tsx

import type { Challenge } from "@/domain/challenge/Challenge";
import type { AttemptStatus } from "@/domain/attempt/AttemptStatus";
import styles from "./ChallengeCard.module.scss";

interface ChallengeCardProps {
  challenge: Challenge;
  userStatus?: AttemptStatus;
  onSelect: (slug: string) => void;
}

export function ChallengeCard({
  challenge,
  userStatus = "not_started",
  onSelect,
}: ChallengeCardProps) {
  return (
    <article
      className={styles["challenge-card"]}
      aria-labelledby={`title-${challenge.slug}`}
    >
      <div className={styles["challenge-card__header"]}>
        <h3
          id={`title-${challenge.slug}`}
          className={styles["challenge-card__title"]}
        >
          {challenge.title}
        </h3>
        <span className={styles[`challenge-card__badge--${challenge.type}`]}>
          {challenge.type}
        </span>
      </div>
      <p className={styles["challenge-card__summary"]}>{challenge.summary}</p>
      <button
        className={styles["challenge-card__action"]}
        onClick={() => onSelect(challenge.slug)}
      >
        {userStatus === "completed" ? "Revoir" : "Commencer"}
      </button>
    </article>
  );
}
```

```scss
// src/components/challenge/ChallengeCard/ChallengeCard.module.scss

@use "@/design/tokens" as *;
@use "@/design/mixins" as *;

.challenge-card {
  padding: $space-lg;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  background-color: $color-bg-elevated;
  box-shadow: $shadow-sm;
  @include transition(box-shadow, border-color);

  &:hover {
    box-shadow: $shadow-md;
    border-color: $color-border-strong;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-sm;
  }

  &__title {
    @include heading-3;
    font-size: $font-size-lg;
    color: $color-text;
    margin: 0;
  }

  &__badge {
    padding: $space-xs $space-sm;
    border-radius: $radius-full;
    font-family: $font-display;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    text-transform: uppercase;
    color: $color-text-inverse;

    &--fix {
      background-color: $color-info;
    }
    &--build {
      background-color: $color-success;
    }
    &--audit {
      background-color: $color-warning;
    }
  }

  &__summary {
    @include body-text;
    color: $color-text-secondary;
    margin: 0 0 $space-md;
  }

  &__action {
    width: 100%;
    padding: $space-sm $space-md;
    border: none;
    border-radius: $radius-md;
    background-color: $color-primary;
    color: $color-text-inverse;
    font-family: $font-body;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    cursor: pointer;
    @include transition(background-color);

    &:hover {
      background-color: $color-primary-hover;
    }
    &:focus-visible {
      @include focus-ring;
    }
  }
}
```

### Entité domain (domain/)

```typescript
// src/domain/attempt/Score.ts — Zéro dépendance externe

export class Score {
  private constructor(
    public readonly value: number,
    public readonly testsPassed: number,
    public readonly testsTotal: number,
    public readonly isFirstTry: boolean,
    public readonly timeSpentSeconds: number,
  ) {}

  static calculate(params: {
    testsPassed: number;
    testsTotal: number;
    isFirstTry: boolean;
    timeSpentSeconds: number;
    estimatedMinutes: number;
  }): Score {
    if (params.testsTotal === 0)
      throw new Error("Cannot score with zero tests");

    const base = (params.testsPassed / params.testsTotal) * 100;
    const firstTryBonus = params.isFirstTry && base === 100 ? 10 : 0;
    const estimatedSec = params.estimatedMinutes * 60;
    const speedBonus =
      params.timeSpentSeconds < estimatedSec && base === 100
        ? Math.min(
            10,
            Math.round((1 - params.timeSpentSeconds / estimatedSec) * 10),
          )
        : 0;

    return new Score(
      Math.min(120, base + firstTryBonus + speedBonus),
      params.testsPassed,
      params.testsTotal,
      params.isFirstTry,
      params.timeSpentSeconds,
    );
  }

  get isPerfect(): boolean {
    return this.testsPassed === this.testsTotal;
  }
  get percentage(): number {
    return Math.round((this.testsPassed / this.testsTotal) * 100);
  }
}
```

```typescript
// src/domain/contribution/ContributionStatus.ts — Machine à états pure

type Status =
  | "draft"
  | "submitted"
  | "in_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "rejected";

const TRANSITIONS: Record<Status, Status[]> = {
  draft: ["submitted"],
  submitted: ["in_review"],
  in_review: ["approved", "changes_requested", "rejected"],
  changes_requested: ["submitted"],
  approved: ["published"],
  published: [],
  rejected: [],
};

export class ContributionStatus {
  private constructor(public readonly value: Status) {}
  static create(value: Status) {
    return new ContributionStatus(value);
  }
  static draft() {
    return new ContributionStatus("draft");
  }

  canTransitionTo(target: Status): boolean {
    return TRANSITIONS[this.value].includes(target);
  }

  transitionTo(target: Status): ContributionStatus {
    if (!this.canTransitionTo(target))
      throw new Error(`Transition invalide : ${this.value} → ${target}`);
    return new ContributionStatus(target);
  }

  get isEditable(): boolean {
    return this.value === "draft" || this.value === "changes_requested";
  }
  get isFinal(): boolean {
    return this.value === "published" || this.value === "rejected";
  }
}
```

### Port + Adapter

```typescript
// src/application/ports/ChallengeRepository.ts — Interface (contrat)
import type { Challenge } from "@/domain/challenge/Challenge";
import type { ChallengeFiltersDTO } from "@/application/dto/ChallengeFiltersDTO";

export interface ChallengeRepository {
  findBySlug(slug: string): Promise<Challenge | null>;
  findAll(
    filters: ChallengeFiltersDTO,
  ): Promise<{ challenges: Challenge[]; total: number }>;
  create(challenge: Challenge): Promise<Challenge>;
  update(challenge: Challenge): Promise<Challenge>;
  delete(id: string): Promise<void>;
  publish(id: string): Promise<void>;
}
```

```typescript
// src/infrastructure/repositories/DrizzleChallengeRepository.ts — Implémentation
import type { ChallengeRepository } from "@/application/ports/ChallengeRepository";
import { db } from "@/infrastructure/db/client";
import { challenges } from "@/infrastructure/db/schema";
import { ChallengeMapper } from "@/infrastructure/db/mappers/ChallengeMapper";
import { eq, and } from "drizzle-orm";

export class DrizzleChallengeRepository implements ChallengeRepository {
  async findBySlug(slug: string) {
    const row = await db.query.challenges.findFirst({
      where: eq(challenges.slug, slug),
    });
    return row ? ChallengeMapper.toDomain(row) : null;
  }
  // ... reste de l'implémentation
}
```

### Container DI

```typescript
// src/infrastructure/di/container.ts

import { DrizzleChallengeRepository } from "@/infrastructure/repositories/DrizzleChallengeRepository";
import { DrizzleAttemptRepository } from "@/infrastructure/repositories/DrizzleAttemptRepository";
// ... autres imports

export const container = {
  challengeRepository: new DrizzleChallengeRepository(),
  attemptRepository: new DrizzleAttemptRepository(),
  contributionRepository: new DrizzleContributionRepository(),
  userRepository: new DrizzleUserRepository(),
  parcoursRepository: new DrizzleParcoursRepository(),
  referenceRepository: new DrizzleReferenceRepository(),
  badgeRepository: new DrizzleBadgeRepository(),
  authProvider: new SupabaseAuthProvider(),
  testExecutor: new AxeCoreTestExecutor(),
} as const;
```

---

## SCHÉMA BASE DE DONNÉES (Drizzle + PostgreSQL/Supabase)

Le schéma complet vit dans `src/infrastructure/db/schema.ts`. Voir la section ARBORESCENCE pour la liste des tables. Les tables principales sont :

- **users** : profil, streaks, rôle reviewer
- **challenges** : contenu complet (instructions, starter code, tests, debrief en JSONB)
- **challenge_criteria** + **challenge_rgaa_criteria** : mapping many-to-many vers WCAG/RGAA
- **contributions** : workflow de contribution avec snapshot du challenge
- **contribution_reviews** : reviews avec commentaires inline
- **contributors** : attribution auteur/reviewer/traducteur par challenge
- **attempts** : tentatives utilisateur avec code soumis et résultats
- **badges** : badges débloqués
- **parcours** + **parcours_steps** : parcours thématiques ordonnés
- **wcag_criteria** + **rgaa_criteria** + **wcag_rgaa_mapping** : référentiels normatifs

---

## SUPABASE — ROW LEVEL SECURITY

```sql
-- Challenges publiés : lecture publique
CREATE POLICY "challenges_public_read" ON challenges FOR SELECT USING (is_published = true);

-- Challenges draft : auteur + reviewers
CREATE POLICY "challenges_draft_read" ON challenges FOR SELECT USING (
  EXISTS (SELECT 1 FROM contributors WHERE contributors.challenge_id = challenges.id AND contributors.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM users WHERE users.supabase_auth_id = auth.uid()::text AND users.is_reviewer = true)
);

-- Contributions : auteur + reviewers
CREATE POLICY "contributions_read" ON contributions FOR SELECT USING (
  author_id = auth.uid()
  OR EXISTS (SELECT 1 FROM users WHERE users.supabase_auth_id = auth.uid()::text AND users.is_reviewer = true)
);

-- Tentatives + Badges : privés
CREATE POLICY "attempts_private" ON attempts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "badges_private" ON badges FOR ALL USING (user_id = auth.uid());
```

---

## WORKFLOW DE CONTRIBUTION

### Machine à états

```
draft → submitted → in_review → approved → published
                  ↘ changes_requested → submitted
                  ↘ rejected
```

### Éditeur intégré (`/contribute/new`) — 6 étapes

1. **Métadonnées** : titre, résumé, type, catégorie, difficulté, frameworks, durée, tags
2. **Code de départ** : CodeMirror multi-fichiers par framework
3. **Tests** : TestBuilder visuel (axe-rule picker, keyboard steps, aria checker)
4. **Indices** : 1 à 5, progressifs, Markdown
5. **Débrief** : éditeur MDX + preview live + composants custom
6. **Preview & soumission** : validation Zod, preview complète, brouillon / soumission

---

## SEED INITIAL

`supabase/seed.ts` doit insérer : critères WCAG 2.2, critères RGAA 4.1, mapping WCAG↔RGAA, 3-5 challenges initiaux avec débriefs, 2 parcours (Formulaires, Navigation clavier).

---

## COMMANDES

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:seed": "tsx supabase/seed.ts",
    "db:studio": "drizzle-kit studio",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/e2e/a11y-audit.spec.ts"
  }
}
```

---

## ORDRE D'IMPLÉMENTATION

### Phase 1 — Fondations

1. Init Next.js 15 + TypeScript + SCSS (`sass`) + ESLint
2. `src/design/` : tokens, mixins, global styles
3. Supabase : projet, auth providers, env vars
4. Domain complet : entités, value objects, erreurs
5. Ports (interfaces application)
6. Drizzle : schéma, mappers, adapters
7. Container DI
8. Migrations + seed WCAG/RGAA
9. Layout racine + composants UI de base
10. Auth (login, callback, middleware)

### Phase 2 — Challenges (lecture)

1. Use cases : ListChallenges, GetChallenge, SubmitAttempt
2. Liste + filtres + playground
3. Sandbox + axe-core
4. Scoring + débrief

### Phase 3 — Contribution (écriture)

1. Use cases contribution
2. ChallengeEditor multi-étapes
3. TestBuilder, DebriefEditor, CriteriaSelector
4. Workflow + review + dashboard

### Phase 4 — Parcours & Progression

1. Parcours + timeline + profil + badges

### Phase 5 — Références

1. Tables WCAG/RGAA + mapping interactif

### Phase 6 — Polish

1. Erreurs, empty states, skeletons, SEO, tests E2E, audit a11y
