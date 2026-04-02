import { Button } from '@/components/ui/Button/Button';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function ButtonDoc() {
  return (
    <DocSection
      title="Button"
      description="Bouton d'action avec trois variantes : primary (gradient CTA Stitch), secondary (fond neutre) et ghost (transparent). Trois tailles disponibles."
      props={[
        { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", description: 'Style visuel du bouton.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Taille du bouton.' },
        { name: 'children', type: 'ReactNode', description: 'Contenu du bouton.', required: true },
        { name: '...props', type: 'ButtonHTMLAttributes', description: 'Tous les attributs natifs (disabled, onClick, type…).' },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Variantes</h3>
        <div className={styles.docExample__row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Tailles</h3>
        <div className={styles.docExample__row} style={{ alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>État désactivé</h3>
        <div className={styles.docExample__row}>
          <Button disabled>Désactivé</Button>
          <Button variant="secondary" disabled>Désactivé</Button>
        </div>
        <CodeBlock label="Usage" code={`<Button disabled>Désactivé</Button>`} />
      </div>
    </DocSection>
  );
}
