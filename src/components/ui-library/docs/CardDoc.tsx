'use client';

import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Tag } from '@/components/ui/Tag/Tag';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';
import cardStyles from './CardDoc.module.scss';

export function CardDoc() {
  return (
    <DocSection
      title="Card"
      description='Carte générique sans bordure (Stitch "No-Line Rule"). Le contraste est créé par le décalage tonal entre le fond de la carte (surface-container-lowest) et le fond de la page (surface-container). Variantes vertical et horizontal.'
      props={[
        { name: 'layout', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Disposition des enfants.' },
        { name: 'as', type: 'ElementType', default: "'article'", description: 'Balise HTML rendue (article, li, div…).' },
        { name: 'onClick', type: '() => void', description: 'Rend la carte interactive (cursor pointer + focus-ring).' },
        { name: 'children', type: 'ReactNode', description: 'Contenu de la carte.', required: true },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Carte verticale (challenge)</h3>
        <div className={styles.docExample__canvas}>
          <Card>
            <div className={cardStyles.cardDemo__header}>
              <Badge variant="fix">Fix</Badge>
              <Badge variant="easy">Easy</Badge>
            </div>
            <p className={cardStyles.cardDemo__title}>Images sans texte alternatif</p>
            <p className={cardStyles.cardDemo__desc}>
              Ajouter des attributs alt descriptifs sur toutes les images informatives.
            </p>
            <div className={cardStyles.cardDemo__tags}>
              <Tag>WCAG 1.1.1</Tag>
              <Tag>HTML</Tag>
            </div>
          </Card>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Card>
  <Badge variant="fix">Fix</Badge>
  <p>Images sans texte alternatif</p>
  <Tag>WCAG 1.1.1</Tag>
</Card>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Carte interactive (cliquable)</h3>
        <div className={styles.docExample__canvas}>
          <Card onClick={() => {}}>
            <p className={cardStyles.cardDemo__title}>Parcours Formulaires accessibles</p>
            <p className={cardStyles.cardDemo__desc}>8 challenges · 3h estimées</p>
          </Card>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Card onClick={() => router.push('/challenges/slug')}>
  <p>Parcours Formulaires accessibles</p>
</Card>`}
        />
      </div>
    </DocSection>
  );
}
