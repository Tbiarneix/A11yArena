import { Callout } from '@/components/ui/Callout/Callout';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function CalloutDoc() {
  return (
    <DocSection
      title="Callout"
      description='Bloc de mise en avant avec bordure left colorée. Inspiré des patterns Stitch : "Need a hint" (challenge playground), "Before (broken)" et "After (fixed)" (debrief view).'
      props={[
        { name: 'variant', type: "'info' | 'success' | 'warning' | 'error' | 'hint'", default: "'info'", description: 'Couleur de la bordure left et du fond.' },
        { name: 'title', type: 'string', description: 'Titre optionnel du callout (uppercase).' },
        { name: 'children', type: 'ReactNode', description: 'Contenu du callout.', required: true },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Variantes</h3>
        <div className={styles.docExample__col}>
          <Callout variant="info" title="Info">
            Utilisez role=&quot;region&quot; avec un aria-label pour délimiter les zones de contenu.
          </Callout>
          <Callout variant="success" title="After (fixed)">
            {`<img src="logo.png" alt="Logo A11y Arena" />`}
          </Callout>
          <Callout variant="error" title="Before (broken)">
            {`<img src="logo.png" />`}
          </Callout>
          <Callout variant="hint" title="Need a hint ?">
            Pensez à vérifier que votre champ de formulaire a un label associé via htmlFor.
          </Callout>
          <Callout variant="warning" title="Attention">
            Ce pattern n&apos;est pas supporté par tous les lecteurs d&apos;écran.
          </Callout>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Callout variant="hint" title="Need a hint ?">
  Pensez à vérifier que votre champ a un label associé.
</Callout>

<Callout variant="error" title="Before (broken)">
  {'<img src="logo.png" />'}
</Callout>

<Callout variant="success" title="After (fixed)">
  {'<img src="logo.png" alt="Logo A11y Arena" />'}
</Callout>`}
        />
      </div>
    </DocSection>
  );
}
