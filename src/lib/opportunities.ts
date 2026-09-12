import { store } from './data';
import type { Company, Opportunity, OpportunityStatus } from './types';

export function opportunityIdForCompany(companyId: string): string {
  return `opp_${companyId}`;
}

/**
 * Garante que exista um registro de CRM ("oportunidade") para a empresa.
 * Se já existir, atualiza os dados da empresa (podem ter mudado desde a
 * última busca) preservando status, notas e histórico já registrados.
 */
export async function getOrCreateOpportunity(
  company: Company,
  initialStatus: OpportunityStatus = 'encontrada',
): Promise<Opportunity> {
  const id = opportunityIdForCompany(company.id);
  const existing = await store.getOpportunity(id);
  const now = new Date().toISOString();

  if (existing) {
    const updated: Opportunity = { ...existing, company, updatedAt: now };
    return store.upsertOpportunity(updated);
  }

  const created: Opportunity = {
    id,
    company,
    status: initialStatus,
    notes: [],
    createdAt: now,
    updatedAt: now,
  };
  return store.upsertOpportunity(created);
}

export async function advanceOpportunityStatus(
  opportunityId: string,
  status: OpportunityStatus,
  extra: Partial<Pick<Opportunity, 'siteId' | 'proposalId' | 'contactDate'>> = {},
): Promise<Opportunity | null> {
  const existing = await store.getOpportunity(opportunityId);
  if (!existing) return null;
  const updated: Opportunity = {
    ...existing,
    ...extra,
    status,
    updatedAt: new Date().toISOString(),
  };
  return store.upsertOpportunity(updated);
}
