import { notFound } from 'next/navigation';
import { store } from '@/lib/data';
import { SiteEditor } from '@/components/editor/SiteEditor';

export const dynamic = 'force-dynamic';

export default async function SiteEditorPage({ params }: { params: { siteId: string } }) {
  const site = await store.getSite(params.siteId);
  if (!site) notFound();

  return <SiteEditor initialSite={site} />;
}
