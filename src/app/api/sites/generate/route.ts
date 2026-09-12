import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { generateSiteForCompany } from '@/lib/site-generator';
import { getOrCreateOpportunity, advanceOpportunityStatus } from '@/lib/opportunities';
import { jsonError, zodErrorMessage } from '@/lib/api-response';
import { generateSiteSchema } from '@/lib/validation';
import type { Company } from '@/lib/types';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Corpo da requisição inválido.', 400);
  }

  const parsed = generateSiteSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  const company = parsed.data.company as unknown as Company;

  try {
    const opportunity = await getOrCreateOpportunity(company, 'analisada');
    const site = await generateSiteForCompany(company, { plan: parsed.data.plan });
    site.opportunityId = opportunity.id;
    await store.upsertSite(site);
    await advanceOpportunityStatus(opportunity.id, 'site-gerado', { siteId: site.id });

    return NextResponse.json({ site, opportunityId: opportunity.id });
  } catch (error) {
    return jsonError(
      'Não foi possível gerar o site agora. Tente novamente em instantes.',
      502,
      { detail: error instanceof Error ? error.message : undefined },
    );
  }
}
