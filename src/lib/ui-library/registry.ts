// =============================================================================
// UI LIBRARY — Registry des composants
// Ajouter un composant ici suffit à le faire apparaître dans la sidebar
// =============================================================================

export interface ComponentEntry {
  slug: string;
  label: string;
  description: string;
  category: 'actions' | 'display' | 'feedback' | 'layout' | 'forms';
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
  // Actions
  {
    slug: 'button',
    label: 'Button',
    description: 'Bouton d\'action principal, secondaire ou ghost. Gradient CTA Stitch.',
    category: 'actions',
  },
  // Display
  {
    slug: 'badge',
    label: 'Badge',
    description: 'Étiquette de type de challenge ou niveau de difficulté.',
    category: 'display',
  },
  {
    slug: 'tag',
    label: 'Tag',
    description: 'Étiquette pill pour catégories et frameworks.',
    category: 'display',
  },
  {
    slug: 'icon',
    label: 'Icon',
    description: 'Icône SVG avec variantes bare, on-surface et outlined.',
    category: 'display',
  },
  {
    slug: 'card',
    label: 'Card',
    description: 'Carte générique pour challenges, parcours et contributions.',
    category: 'layout',
  },
  {
    slug: 'callout',
    label: 'Callout',
    description: 'Bloc de mise en avant avec bordure left colorée (hint, before/after…).',
    category: 'display',
  },
  // Feedback
  {
    slug: 'progress-bar',
    label: 'ProgressBar',
    description: 'Barre de progression pour les parcours et scores.',
    category: 'feedback',
  },
  {
    slug: 'skeleton',
    label: 'Skeleton',
    description: 'Placeholder animé pour les états de chargement.',
    category: 'feedback',
  },
  {
    slug: 'toast',
    label: 'Toast',
    description: 'Notification accessible avec aria-live pour les feedbacks dynamiques.',
    category: 'feedback',
  },
  // Forms
  {
    slug: 'input',
    label: 'Input',
    description: 'Champ de saisie avec label, hint et message d\'erreur accessibles.',
    category: 'forms',
  },
];

export const CATEGORY_LABELS: Record<ComponentEntry['category'], string> = {
  actions: 'Actions',
  display: 'Affichage',
  layout: 'Mise en page',
  feedback: 'Feedback',
  forms: 'Formulaires',
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as ComponentEntry['category'][];

export function getComponent(slug: string): ComponentEntry | undefined {
  return COMPONENT_REGISTRY.find((c) => c.slug === slug);
}
