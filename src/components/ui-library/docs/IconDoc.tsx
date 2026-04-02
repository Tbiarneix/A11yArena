import { Icon } from '@/components/ui/Icon/Icon';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L4.09 12.26 11 12l-2 10 8.91-10.26L11 12l2-10z" />
    </svg>
  );
}

export function IconDoc() {
  return (
    <DocSection
      title="Icon"
      description="Wrapper d'icône SVG avec trois variantes visuelles (bare, on-surface, outlined) et quatre tailles. Utiliser aria-label uniquement quand l'icône est seule sans texte adjacent."
      props={[
        { name: 'children', type: 'ReactNode', description: 'Composant SVG.', required: true },
        { name: 'variant', type: "'bare' | 'on-surface' | 'outlined'", default: "'bare'", description: 'Apparence du conteneur.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Taille de l'icône." },
        { name: 'label', type: 'string', description: "aria-label si l'icône est seule (sans texte adjacent)." },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Variantes</h3>
        <div className={styles.docExample__row}>
          <Icon variant="bare"><StarIcon /></Icon>
          <Icon variant="on-surface"><StarIcon /></Icon>
          <Icon variant="outlined"><StarIcon /></Icon>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Icon variant="bare"><StarIcon /></Icon>
<Icon variant="on-surface"><StarIcon /></Icon>
<Icon variant="outlined"><StarIcon /></Icon>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Tailles</h3>
        <div className={styles.docExample__row} style={{ alignItems: 'center' }}>
          <Icon size="xs" variant="on-surface"><BoltIcon /></Icon>
          <Icon size="sm" variant="on-surface"><BoltIcon /></Icon>
          <Icon size="md" variant="on-surface"><BoltIcon /></Icon>
          <Icon size="lg" variant="on-surface"><BoltIcon /></Icon>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Icon size="xs"><BoltIcon /></Icon>
<Icon size="md"><BoltIcon /></Icon>
<Icon size="lg"><BoltIcon /></Icon>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Icône seule (avec label)</h3>
        <Icon variant="on-surface" label="Favori"><StarIcon /></Icon>
        <CodeBlock
          label="Usage"
          code={`// Sans texte adjacent → aria-label obligatoire
<Icon variant="on-surface" label="Favori">
  <StarIcon />
</Icon>

// Avec texte adjacent → pas de label (aria-hidden implicite)
<button>
  <Icon><StarIcon /></Icon>
  Ajouter aux favoris
</button>`}
        />
      </div>
    </DocSection>
  );
}
