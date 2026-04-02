import type { WcagCriterion } from '@/domain/reference/WcagCriterion';
import type { RgaaCriterion } from '@/domain/reference/RgaaCriterion';
import type { ReferenceRepository } from '@/application/ports/ReferenceRepository';

// Échantillon représentatif des 78 critères WCAG 2.2
const WCAG_CRITERIA: WcagCriterion[] = [
  { id: '1.1.1', title: 'Contenu non textuel', description: 'Tout contenu non textuel présenté à l\'utilisateur a un équivalent textuel.', level: 'A', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#non-text-content' },
  { id: '1.3.1', title: 'Information et relations', description: 'L\'information, la structure et les relations transmises par la présentation peuvent être déterminées par un programme informatique.', level: 'A', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#info-and-relationships' },
  { id: '1.3.3', title: 'Caractéristiques sensorielles', description: 'Les instructions pour comprendre et utiliser le contenu ne reposent pas uniquement sur des caractéristiques sensorielles.', level: 'A', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#sensory-characteristics' },
  { id: '1.4.1', title: 'Utilisation de la couleur', description: 'La couleur n\'est pas utilisée comme le seul moyen visuel de transmettre une information.', level: 'A', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#use-of-color' },
  { id: '1.4.3', title: 'Contraste (minimum)', description: 'La présentation visuelle du texte a un rapport de contraste d\'au moins 4,5:1.', level: 'AA', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#contrast-minimum' },
  { id: '1.4.4', title: 'Redimensionnement du texte', description: 'Le texte peut être redimensionné jusqu\'à 200% sans recours à une technologie d\'assistance.', level: 'AA', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#resize-text' },
  { id: '1.4.10', title: 'Redistribution', description: 'Le contenu peut être présenté sans perte d\'information ni de fonctionnalité sans défilement en deux dimensions.', level: 'AA', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#reflow' },
  { id: '1.4.11', title: 'Contraste des composants non textuels', description: 'Les composants d\'interface et les graphiques informatifs ont un rapport de contraste d\'au moins 3:1.', level: 'AA', principle: 'Perceivable', url: 'https://www.w3.org/TR/WCAG22/#non-text-contrast' },
  { id: '2.1.1', title: 'Clavier', description: 'Toutes les fonctionnalités du contenu sont accessibles via une interface clavier.', level: 'A', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#keyboard' },
  { id: '2.1.2', title: 'Pas de piège au clavier', description: 'Si le focus clavier peut être déplacé vers un composant de la page, il peut être déplacé hors de ce composant.', level: 'A', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#no-keyboard-trap' },
  { id: '2.4.1', title: 'Contournement de blocs', description: 'Un mécanisme est disponible pour contourner les blocs de contenu répétés sur plusieurs pages Web.', level: 'A', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#bypass-blocks' },
  { id: '2.4.3', title: 'Ordre de focus', description: 'Les composants reçoivent le focus dans un ordre qui préserve la signification et l\'opérabilité.', level: 'A', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#focus-order' },
  { id: '2.4.6', title: 'En-têtes et étiquettes', description: 'Les en-têtes et les étiquettes décrivent le sujet ou l\'objectif.', level: 'AA', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#headings-and-labels' },
  { id: '2.4.7', title: 'Visibilité du focus', description: 'Tout composant d\'interface qui peut être activé par clavier a un indicateur de focus visible.', level: 'AA', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#focus-visible' },
  { id: '2.4.11', title: 'Apparence du focus (minimum)', description: 'Le focus clavier est visible et répond aux critères de taille et de contraste minimaux.', level: 'AA', principle: 'Operable', url: 'https://www.w3.org/TR/WCAG22/#focus-appearance' },
  { id: '3.3.1', title: 'Identification des erreurs', description: 'Si une erreur de saisie est détectée, l\'élément en erreur est identifié et l\'erreur est décrite à l\'utilisateur.', level: 'A', principle: 'Understandable', url: 'https://www.w3.org/TR/WCAG22/#error-identification' },
  { id: '3.3.2', title: 'Étiquettes ou instructions', description: 'Des étiquettes ou des instructions sont fournies quand le contenu requiert des saisies utilisateur.', level: 'A', principle: 'Understandable', url: 'https://www.w3.org/TR/WCAG22/#labels-or-instructions' },
  { id: '4.1.2', title: 'Nom, rôle et valeur', description: 'Pour tous les composants d\'interface, le nom et le rôle peuvent être déterminés par un programme informatique.', level: 'A', principle: 'Robust', url: 'https://www.w3.org/TR/WCAG22/#name-role-value' },
  { id: '4.1.3', title: 'Messages de statut', description: 'Dans les contenus utilisant des langages de balisage, les messages de statut peuvent être déterminés par un programme informatique.', level: 'AA', principle: 'Robust', url: 'https://www.w3.org/TR/WCAG22/#status-messages' },
];

const RGAA_CRITERIA: RgaaCriterion[] = [
  { id: '1.1', title: 'Images porteuses d\'information', description: 'Chaque image porteuse d\'information a-t-elle une alternative textuelle ?', theme: 'Images', level: 'A', wcagIds: ['1.1.1'] },
  { id: '1.2', title: 'Images de décoration', description: 'Chaque image de décoration est-elle correctement ignorée par les technologies d\'assistance ?', theme: 'Images', level: 'A', wcagIds: ['1.1.1'] },
  { id: '3.1', title: 'Rapport de contraste du texte', description: 'Le rapport de contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé ?', theme: 'Couleurs', level: 'AA', wcagIds: ['1.4.3'] },
  { id: '5.1', title: 'Tableau de données — en-têtes', description: 'Chaque tableau de données complexe a-t-il un résumé ?', theme: 'Tableaux', level: 'A', wcagIds: ['1.3.1'] },
  { id: '11.1', title: 'Étiquette de champ', description: 'Chaque champ de formulaire a-t-il une étiquette ?', theme: 'Formulaires', level: 'A', wcagIds: ['1.3.1', '3.3.2', '4.1.2'] },
  { id: '11.9', title: 'Intitulé de bouton', description: 'Dans chaque formulaire, l\'intitulé de chaque bouton est-il pertinent ?', theme: 'Formulaires', level: 'A', wcagIds: ['4.1.2'] },
  { id: '12.1', title: 'Liens d\'évitement', description: 'Chaque ensemble de pages dispose-t-il de liens d\'évitement ou d\'accès rapide ?', theme: 'Navigation', level: 'A', wcagIds: ['2.4.1'] },
  { id: '12.6', title: 'Navigation principale identifiée', description: 'Les zones de navigation principales et secondaires sont-elles identifiées ?', theme: 'Navigation', level: 'A', wcagIds: ['1.3.1'] },
];

const MAPPING: Record<string, string[]> = {
  '1.1.1': ['1.1', '1.2'],
  '1.3.1': ['5.1', '11.1', '12.6'],
  '1.4.3': ['3.1'],
  '2.4.1': ['12.1'],
  '3.3.2': ['11.1'],
  '4.1.2': ['11.1', '11.9'],
};

export class MockReferenceRepository implements ReferenceRepository {
  async findAllWcag(): Promise<WcagCriterion[]> {
    return WCAG_CRITERIA;
  }

  async findWcagById(id: string): Promise<WcagCriterion | null> {
    return WCAG_CRITERIA.find((c) => c.id === id) ?? null;
  }

  async findAllRgaa(): Promise<RgaaCriterion[]> {
    return RGAA_CRITERIA;
  }

  async findRgaaById(id: string): Promise<RgaaCriterion | null> {
    return RGAA_CRITERIA.find((c) => c.id === id) ?? null;
  }

  async getWcagRgaaMapping(): Promise<Record<string, string[]>> {
    return MAPPING;
  }
}
