import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { jsonError } from '@/lib/api-response';

export async function GET(_req: NextRequest, { params }: { params: { shareId: string } }) {
  const proposal = await store.getProposalByShareId(params.shareId);
  if (!proposal) return jsonError('Proposta não encontrada. O link pode estar incorreto ou ter expirado.', 404);

  const site = await store.getSite(proposal.siteId);
  if (!site) return jsonError('Site associado a esta proposta não foi encontrado.', 404);

  await store.incrementProposalViews(params.shareId);

  return NextResponse.json({ proposal, site });
}
