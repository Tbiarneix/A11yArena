import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function ProgressBarDoc() {
  return (
    <DocSection
      title="ProgressBar"
      description="Barre de progression accessible (role=progressbar, aria-valuenow). Variante expert avec effet shimmer pour les niveaux avancés."
      props={[
        { name: 'value', type: 'number', description: 'Valeur entre 0 et 100.', required: true },
        { name: 'label', type: 'string', description: 'aria-label décrivant ce que la barre mesure.', required: true },
        { name: 'variant', type: "'default' | 'expert'", default: "'default'", description: 'Variante expert avec effet shimmer.' },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Progression standard</h3>
        <div className={styles.docExample__col}>
          <ProgressBar value={25} label="Progression du parcours Bases ARIA : 25%" />
          <ProgressBar value={60} label="Progression du parcours Formulaires : 60%" />
          <ProgressBar value={100} label="Progression du parcours Contraste : 100%" />
        </div>
        <CodeBlock
          label="Usage"
          code={`<ProgressBar value={60} label="Progression du parcours : 60%" />`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Variante Expert (shimmer)</h3>
        <ProgressBar value={85} label="Score expert : 85%" variant="expert" />
        <CodeBlock
          label="Usage"
          code={`<ProgressBar value={85} label="Score expert : 85%" variant="expert" />`}
        />
      </div>
    </DocSection>
  );
}
