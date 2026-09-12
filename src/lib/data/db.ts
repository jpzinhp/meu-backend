import type { GeneratedSite, Opportunity, Proposal } from '../types';

/**
 * Camada de abstração de persistência.
 *
 * Toda a aplicação fala apenas com esta interface — nunca diretamente com um
 * arquivo, tabela ou SDK de banco. Isso permite trocar o backend de dados
 * (hoje: armazenamento local em arquivo JSON, preparado para produção com
 * Supabase, PostgreSQL ou Firebase) sem alterar nenhuma rota de API ou
 * componente. Para conectar um banco real, implemente esta interface em um
 * novo arquivo (ex: `supabase-store.ts`) e troque a instância exportada em
 * `index.ts`.
 */
export interface DataStore {
  listOpportunities(): Promise<Opportunity[]>;
  getOpportunity(id: string): Promise<Opportunity | null>;
  upsertOpportunity(opportunity: Opportunity): Promise<Opportunity>;
  deleteOpportunity(id: string): Promise<void>;

  listSites(): Promise<GeneratedSite[]>;
  getSite(id: string): Promise<GeneratedSite | null>;
  upsertSite(site: GeneratedSite): Promise<GeneratedSite>;

  listProposals(): Promise<Proposal[]>;
  getProposal(id: string): Promise<Proposal | null>;
  getProposalByShareId(shareId: string): Promise<Proposal | null>;
  upsertProposal(proposal: Proposal): Promise<Proposal>;
  incrementProposalViews(shareId: string): Promise<void>;
}
