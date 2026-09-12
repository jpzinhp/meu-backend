import type { Company } from '../types';

export interface CompanySearchParams {
  location: string;
  segmentQuery: string;
  limit?: number;
}

export interface CompanySearchResult {
  companies: Company[];
  isDemo: boolean;
  provider: string;
  error?: string;
}

export interface DiscoveryProvider {
  name: string;
  isConfigured(): boolean;
  search(params: CompanySearchParams): Promise<Company[]>;
}
