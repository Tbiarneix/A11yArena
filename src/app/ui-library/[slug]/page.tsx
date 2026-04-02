import { notFound } from 'next/navigation';
import { getComponent, COMPONENT_REGISTRY } from '@/lib/ui-library/registry';

// Imports des docs de chaque composant
import { ButtonDoc } from '@/components/ui-library/docs/ButtonDoc';
import { BadgeDoc } from '@/components/ui-library/docs/BadgeDoc';
import { TagDoc } from '@/components/ui-library/docs/TagDoc';
import { InputDoc } from '@/components/ui-library/docs/InputDoc';
import { ProgressBarDoc } from '@/components/ui-library/docs/ProgressBarDoc';
import { SkeletonDoc } from '@/components/ui-library/docs/SkeletonDoc';
import { ToastDoc } from '@/components/ui-library/docs/ToastDoc';
import { IconDoc } from '@/components/ui-library/docs/IconDoc';
import { CardDoc } from '@/components/ui-library/docs/CardDoc';
import { CalloutDoc } from '@/components/ui-library/docs/CalloutDoc';

const DOC_COMPONENTS: Record<string, React.ComponentType> = {
  button: ButtonDoc,
  badge: BadgeDoc,
  tag: TagDoc,
  input: InputDoc,
  'progress-bar': ProgressBarDoc,
  skeleton: SkeletonDoc,
  toast: ToastDoc,
  icon: IconDoc,
  card: CardDoc,
  callout: CalloutDoc,
};

// Génération statique des routes au build
export function generateStaticParams() {
  return COMPONENT_REGISTRY.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return {};
  return {
    title: `${component.label} — UI Library — A11y Arena`,
    description: component.description,
  };
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();

  const DocComponent = DOC_COMPONENTS[slug];
  if (!DocComponent) notFound();

  return <DocComponent />;
}
