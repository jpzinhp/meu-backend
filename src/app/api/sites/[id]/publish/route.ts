import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { advanceOpportunityStatus } from '@/lib/opportunities';
import { jsonError } from '@/lib/api-response';

function slugify(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'site'
  );
}

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await store.getSite(params.id);
  if (!existing) return jsonError('Site não encontrado.', 404);

  const slug = existing.publicSlug ?? `${slugify(existing.content.companyName)}-${existing.id.slice(-6)}`;
  const now = new Date().toISOString();

  const updated = {
    ...existing,
    status: 'publicado' as const,
    publicSlug: slug,
    publishedAt: existing.publishedAt ?? now,
    updatedAt: now,
  };

  await store.upsertSite(updated);

  if (existing.opportunityId) {
    await advanceOpportunityStatus(existing.opportunityId, 'site-publicado');
  }

  return NextResponse.json({ site: updated, publicUrl: `/preview/${updated.id}` });
}
