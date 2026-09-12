import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { store } from '@/lib/data';
import { GeneratedSitePreview } from '@/components/site-render/GeneratedSitePreview';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { siteId: string } }): Promise<Metadata> {
  const site = await store.getSite(params.siteId);
  return { title: site ? `${site.content.companyName} — ${site.content.tagline}` : 'Site não encontrado' };
}

export default async function PreviewPage({ params }: { params: { siteId: string } }) {
  const site = await store.getSite(params.siteId);
  if (!site) notFound();

  return <GeneratedSitePreview content={site.content} theme={site.theme} />;
}
