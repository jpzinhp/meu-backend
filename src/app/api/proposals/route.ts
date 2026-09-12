import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { newId, newShareCode } from '@/lib/id';
import { advanceOpportunityStatus } from '@/lib/opportunities';
import { jsonError, zodErrorMessage } from '@/lib/api-response';
import { createProposalSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Corpo da requisição inválido.', 400);
  }

  const parsed = createProposalSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  const site = await store.getSite(parsed.data.siteId);
  if (!site) return jsonError('Site não encontrado.', 404);

  const proposal = await store.upsertProposal({
    id: newId('prop'),
    siteId: site.id,
    companyId: site.companyId,
    shareId: newShareCode(),
    createdAt: new Date().toISOString(),
    viewCount: 0,
  });

  const opportunityId = parsed.data.opportunityId ?? site.opportunityId;
  if (opportunityId) {
    await advanceOpportunityStatus(opportunityId, 'proposta-criada', { proposalId: proposal.id });
  }

  return NextResponse.json({ proposal });
}
