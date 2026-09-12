import { promises as fs } from 'fs';
import path from 'path';
import type { DataStore } from './db';
import type { GeneratedSite, Opportunity, Proposal } from '../types';

interface DbShape {
  opportunities: Record<string, Opportunity>;
  sites: Record<string, GeneratedSite>;
  proposals: Record<string, Proposal>;
}

const DB_PATH = path.join(process.cwd(), '.data', 'db.json');

const emptyDb = (): DbShape => ({ opportunities: {}, sites: {}, proposals: {} });

/**
 * Implementação de referência da camada de dados: persiste em um arquivo
 * JSON local. Suficiente para demonstração e desenvolvimento; en produção,
 * substitua por uma implementação real de `DataStore` (Supabase/Postgres/
 * Firebase) — nenhuma outra parte do código muda.
 *
 * Mantemos um cache em memória por processo para evitar leituras de disco a
 * cada requisição, com escrita serializada (fila) para evitar corrupção em
 * gravações concorrentes.
 */
class FileStore implements DataStore {
  private cache: DbShape | null = null;
  private writeQueue: Promise<unknown> = Promise.resolve();

  private async load(): Promise<DbShape> {
    if (this.cache) return this.cache;
    try {
      const raw = await fs.readFile(DB_PATH, 'utf-8');
      this.cache = { ...emptyDb(), ...(JSON.parse(raw) as Partial<DbShape>) };
    } catch {
      this.cache = emptyDb();
    }
    return this.cache;
  }

  private async persist() {
    const db = this.cache;
    if (!db) return;
    this.writeQueue = this.writeQueue.then(async () => {
      await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
    });
    await this.writeQueue;
  }

  async listOpportunities(): Promise<Opportunity[]> {
    const db = await this.load();
    return Object.values(db.opportunities).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async getOpportunity(id: string): Promise<Opportunity | null> {
    const db = await this.load();
    return db.opportunities[id] ?? null;
  }

  async upsertOpportunity(opportunity: Opportunity): Promise<Opportunity> {
    const db = await this.load();
    db.opportunities[opportunity.id] = opportunity;
    await this.persist();
    return opportunity;
  }

  async deleteOpportunity(id: string): Promise<void> {
    const db = await this.load();
    delete db.opportunities[id];
    await this.persist();
  }

  async listSites(): Promise<GeneratedSite[]> {
    const db = await this.load();
    return Object.values(db.sites).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async getSite(id: string): Promise<GeneratedSite | null> {
    const db = await this.load();
    return db.sites[id] ?? null;
  }

  async upsertSite(site: GeneratedSite): Promise<GeneratedSite> {
    const db = await this.load();
    db.sites[site.id] = site;
    await this.persist();
    return site;
  }

  async listProposals(): Promise<Proposal[]> {
    const db = await this.load();
    return Object.values(db.proposals);
  }

  async getProposal(id: string): Promise<Proposal | null> {
    const db = await this.load();
    return db.proposals[id] ?? null;
  }

  async getProposalByShareId(shareId: string): Promise<Proposal | null> {
    const db = await this.load();
    return Object.values(db.proposals).find((p) => p.shareId === shareId) ?? null;
  }

  async upsertProposal(proposal: Proposal): Promise<Proposal> {
    const db = await this.load();
    db.proposals[proposal.id] = proposal;
    await this.persist();
    return proposal;
  }

  async incrementProposalViews(shareId: string): Promise<void> {
    const db = await this.load();
    const proposal = Object.values(db.proposals).find((p) => p.shareId === shareId);
    if (proposal) {
      proposal.viewCount += 1;
      await this.persist();
    }
  }
}

export const fileStore = new FileStore();
