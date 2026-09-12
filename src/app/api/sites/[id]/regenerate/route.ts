import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { generateSiteForCompany } from '@/lib/site-generator';
import { jsonError, zodErrorMessage } from '@/lib/api-response';
import { regenerateSiteSchema } from '@/lib/validation';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await store.getSite(params.id);
  if (!existing) return jsonError('Site não encontrado.', 404);

  const opportunity = existing.opportunityId ? await store.getOpportunity(existing.opportunityId) : null;
  if (!opportunity) {
    return jsonError('Não foi possível localizar os dados originais da empresa para regenerar o site.', 404);
  }

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    // corpo vazio é aceito — mantém o plano atual
  }

  const parsed = regenerateSiteSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  try {
    const regenerated = await generateSiteForCompany(opportunity.company, {
      plan: parsed.data.plan ?? existing.plan,
      variantSeed: existing.version,
      existingSiteId: existing.id,
      existingVersion: existing.version,
    });
    regenerated.opportunityId = existing.opportunityId;
    regenerated.status = existing.status;
    regenerated.publicSlug = existing.publicSlug;
    regenerated.publishedAt = existing.publishedAt;

    await store.upsertSite(regenerated);
    return NextResponse.json({ site: regenerated });
  } catch (error) {
    return jsonError('Não foi possível regenerar o site agora. Tente novamente.', 502, {
      detail: error instanceof Error ? error.message : undefined,
    });
  }
}
