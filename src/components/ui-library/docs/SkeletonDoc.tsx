import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function SkeletonDoc() {
  return (
    <DocSection
      title="Skeleton"
      description="Placeholder animé pour les états de chargement. aria-hidden=true : invisible aux lecteurs d'écran, utiliser un aria-live en complément pour annoncer le chargement."
      props={[
        { name: 'variant', type: "'text' | 'rect' | 'circle'", default: "'rect'", description: 'Forme du skeleton.' },
        { name: 'width', type: 'string', description: 'Largeur CSS (ex: "200px", "100%").' },
        { name: 'height', type: 'string', description: 'Hauteur CSS (ex: "48px").' },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Texte</h3>
        <div className={styles.docExample__col} style={{ maxWidth: 400 }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="90%" />
        </div>
        <CodeBlock label="Usage" code={`<Skeleton variant="text" width="80%" />`} />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Rectangle (carte)</h3>
        <Skeleton variant="rect" width="100%" height="120px" />
        <CodeBlock label="Usage" code={`<Skeleton variant="rect" width="100%" height="120px" />`} />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Cercle (avatar)</h3>
        <Skeleton variant="circle" width="48px" height="48px" />
        <CodeBlock label="Usage" code={`<Skeleton variant="circle" width="48px" height="48px" />`} />
      </div>
    </DocSection>
  );
}
