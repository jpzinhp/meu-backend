'use client';

import type {
  Company,
  GeneratedSite,
  IntegrationStatus,
  Opportunity,
  OpportunityStatus,
  Proposal,
  SitePlan,
} from './types';
import type { CompanySearchResult } from './discovery/types';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data?.error || 'Ocorreu um erro inesperado. Tente novamente.', res.status);
  }
  return data as T;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function getHealth() {
  return request<{ ok: true } & IntegrationStatus>('/api/health');
}

export function searchCompanies(location: string, segmentQuery: string) {
  return request<CompanySearchResult>('/api/companies/search', {
    method: 'POST',
    body: JSON.stringify({ location, segmentQuery }),
  });
}

export function saveOpportunity(company: Company) {
  return request<{ opportunity: Opportunity }>('/api/opportunities', {
    method: 'POST',
    body: JSON.stringify({ company }),
  });
}

export function listOpportunities() {
  return request<{ opportunities: Opportunity[] }>('/api/opportunities');
}

export function updateOpportunity(
  id: string,
  patch: { status?: OpportunityStatus; contactDate?: string; addNote?: string },
) {
  return request<{ opportunity: Opportunity }>(`/api/opportunities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export function generateSite(company: Company, plan?: SitePlan) {
  return request<{ site: GeneratedSite; opportunityId: string }>('/api/sites/generate', {
    method: 'POST',
    body: JSON.stringify({ company, plan }),
  });
}

export function getSite(id: string) {
  return request<{ site: GeneratedSite }>(`/api/sites/${id}`);
}

export function updateSite(id: string, patch: Partial<Pick<GeneratedSite, 'theme' | 'content'>>) {
  return request<{ site: GeneratedSite }>(`/api/sites/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export function regenerateSite(id: string, plan?: SitePlan) {
  return request<{ site: GeneratedSite }>(`/api/sites/${id}/regenerate`, {
    method: 'POST',
    body: JSON.stringify({ plan }),
  });
}

export function publishSite(id: string) {
  return request<{ site: GeneratedSite; publicUrl: string }>(`/api/sites/${id}/publish`, {
    method: 'POST',
  });
}

export function createProposal(siteId: string, opportunityId?: string) {
  return request<{ proposal: Proposal }>('/api/proposals', {
    method: 'POST',
    body: JSON.stringify({ siteId, opportunityId }),
  });
}

export function getProposal(shareId: string) {
  return request<{ proposal: Proposal; site: GeneratedSite }>(`/api/proposals/${shareId}`);
}
