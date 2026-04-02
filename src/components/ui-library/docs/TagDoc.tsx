import { Tag } from '@/components/ui/Tag/Tag';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function TagDoc() {
  return (
    <DocSection
      title="Tag"
      description="Étiquette pill pour les catégories, frameworks et filtres. Forme arrondie, fond neutre."
      props={[
        { name: 'children', type: 'ReactNode', description: 'Texte du tag.', required: true },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Exemples</h3>
        <div className={styles.docExample__row}>
          <Tag>React</Tag>
          <Tag>Vue</Tag>
          <Tag>HTML</Tag>
          <Tag>CSS</Tag>
          <Tag>ARIA</Tag>
          <Tag>Contraste</Tag>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Tag>React</Tag>
<Tag>HTML</Tag>
<Tag>ARIA</Tag>`}
        />
      </div>
    </DocSection>
  );
}
