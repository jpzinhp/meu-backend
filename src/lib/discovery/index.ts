import { generateDemoCompanies } from './demo';
import { openWebNinjaProvider } from './openwebninja';
import type { CompanySearchParams, CompanySearchResult } from './types';

export { calculateOpportunity, opportunityLabel } from './score';
export type { CompanySearchParams, CompanySearchResult } from './types';

const providers = [openWebNinjaProvider];

export function isDiscoveryConfigured(): boolean {
  return providers.some((p) => p.isConfigured());
}

export function activeDiscoveryProviderName(): string {
  const active = providers.find((p) => p.isConfigured());
  return active ? active.name : 'demonstracao';
}

/**
 * Busca empresas usando a primeira fonte real configurada (via variáveis de
 * ambiente). Se nenhuma fonte estiver configurada — ou se a busca real
 * falhar — cai automaticamente em modo demonstração, sempre sinalizando essa
 * condição no resultado para que a interface avise o usuário claramente.
 */
export async function searchCompanies(params: CompanySearchParams): Promise<CompanySearchResult> {
  const provider = providers.find((p) => p.isConfigured());

  if (!provider) {
    return {
      companies: generateDemoCompanies(params),
      isDemo: true,
      provider: 'demonstracao',
    };
  }

  try {
    const companies = await provider.search(params);
    if (companies.length === 0) {
      return { companies: [], isDemo: false, provider: provider.name };
    }
    return { companies, isDemo: false, provider: provider.name };
  } catch (error) {
    return {
      companies: generateDemoCompanies(params),
      isDemo: true,
      provider: 'demonstracao',
      error: error instanceof Error ? error.message : 'Falha ao consultar a fonte de dados.',
    };
  }
}
