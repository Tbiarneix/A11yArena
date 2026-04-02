'use client';

import { Input } from '@/components/ui/Input/Input';
import { DocSection } from '@/components/ui-library/DocSection/DocSection';
import { CodeBlock } from '@/components/ui-library/CodeBlock/CodeBlock';
import styles from './Doc.module.scss';

export function InputDoc() {
  return (
    <DocSection
      title="Input"
      description="Champ de saisie accessible avec label obligatoire, hint optionnel et message d'erreur. Style bottom-line Stitch : bordure inférieure qui s'étend au focus."
      props={[
        { name: 'id', type: 'string', description: 'Identifiant unique du champ (lie le label).', required: true },
        { name: 'label', type: 'string', description: 'Label visible du champ.', required: true },
        { name: 'error', type: 'string', description: "Message d'erreur (aria-invalid + role=\"alert\")." },
        { name: 'hint', type: 'string', description: "Texte d'aide sous le champ." },
        { name: '...props', type: 'InputHTMLAttributes', description: 'Tous les attributs natifs (type, placeholder, required…).' },
      ]}
    >
      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Standard</h3>
        <div style={{ maxWidth: 400 }}>
          <Input id="demo-email" label="Adresse email" type="email" placeholder="vous@exemple.fr" />
        </div>
        <CodeBlock
          label="Usage"
          code={`<Input
  id="demo-email"
  label="Adresse email"
  type="email"
  placeholder="vous@exemple.fr"
/>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Avec hint</h3>
        <div style={{ maxWidth: 400 }}>
          <Input
            id="demo-pseudo"
            label="Pseudo GitHub"
            hint="Utilisé pour afficher votre profil public."
          />
        </div>
        <CodeBlock
          label="Usage"
          code={`<Input
  id="demo-pseudo"
  label="Pseudo GitHub"
  hint="Utilisé pour afficher votre profil public."
/>`}
        />
      </div>

      <div className={styles.docExample}>
        <h3 className={styles.docExample__title}>Avec erreur</h3>
        <div style={{ maxWidth: 400 }}>
          <Input
            id="demo-error"
            label="Adresse email"
            type="email"
            defaultValue="pas-un-email"
            error="Veuillez entrer une adresse email valide."
          />
        </div>
        <CodeBlock
          label="Usage"
          code={`<Input
  id="demo-error"
  label="Adresse email"
  error="Veuillez entrer une adresse email valide."
/>`}
        />
      </div>
    </DocSection>
  );
}
