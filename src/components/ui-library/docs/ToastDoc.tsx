import { Toast } from '@/components/ui/Toast/Toast';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function ToastDoc() {
  return (
    <DocSection
      title="Toast"
      description={`Notification accessible. role="status" + aria-live="polite" : le contenu est annoncé aux lecteurs d'écran sans interrompre la navigation. Bordure left colorée selon la sévérité.`}
      props={[
        { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Type de notification.' },
        { name: 'children', type: 'ReactNode', description: 'Contenu de la notification.', required: true },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Variantes</h3>
        <div className={styles.docExample__col}>
          <Toast variant="info">Challenge sauvegardé automatiquement.</Toast>
          <Toast variant="success">Bravo ! Tous les tests sont passés.</Toast>
          <Toast variant="warning">Attention : certains attributs ARIA manquent.</Toast>
          <Toast variant="error">Erreur critique d'accessibilité détectée.</Toast>
        </div>
        <CodeBlock
          label="Usage"
          code={`<Toast variant="success">Bravo ! Tous les tests sont passés.</Toast>
<Toast variant="error">Erreur critique détectée.</Toast>`}
        />
      </div>
    </DocSection>
  );
}
