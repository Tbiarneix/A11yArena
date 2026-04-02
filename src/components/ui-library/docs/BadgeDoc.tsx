import { Badge } from '@/components/ui/Badge/Badge';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function BadgeDoc() {
  return (
    <DocSection
      title="Badge"
      description="Étiquette compacte pour les types de challenge (fix, build, audit) et les niveaux de difficulté (easy, medium, hard). Style monospace, uppercase."
      props={[
        { name: 'variant', type: "'fix' | 'build' | 'audit' | 'easy' | 'medium' | 'hard' | 'neutral'", description: 'Style et couleur du badge.', required: true },
        { name: 'children', type: 'ReactNode', description: 'Texte du badge.', required: true },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Types de challenge</h3>
        <div className={styles.docExample__row}>
          <Badge variant="fix">Fix</Badge>
          <Badge variant="build">Build</Badge>
          <Badge variant="audit">Audit</Badge>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Badge variant="fix">Fix</Badge>
<Badge variant="build">Build</Badge>
<Badge variant="audit">Audit</Badge>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Niveaux de difficulté</h3>
        <div className={styles.docExample__row}>
          <Badge variant="easy">Easy</Badge>
          <Badge variant="medium">Medium</Badge>
          <Badge variant="hard">Hard</Badge>
          <Badge variant="neutral">Neutre</Badge>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Badge variant="easy">Easy</Badge>
<Badge variant="medium">Medium</Badge>
<Badge variant="hard">Hard</Badge>`}
        />
      </div>
    </DocSection>
  );
}
