'use client';

import { useMemo, useState } from 'react';
import type { Opportunity, OpportunityStatus } from '@/lib/types';
import { EmptyState } from '../EmptyState';
import { OPPORTUNITY_STATUS_LABEL } from '../badges';
import { OpportunityRow } from './OpportunityRow';

export function OpportunitiesBoard({ initialOpportunities }: { initialOpportunities: Opportunity[] }) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OpportunityStatus | 'todos'>('todos');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return opportunities.filter((o) => {
      if (statusFilter !== 'todos' && o.status !== statusFilter) return false;
      if (!term) return true;
      return (
        o.company.name.toLowerCase().includes(term) ||
        o.company.city.toLowerCase().includes(term) ||
        o.company.segmentLabel.toLowerCase().includes(term)
      );
    });
  }, [opportunities, search, statusFilter]);

  function handleUpdate(updated: Opportunity) {
    setOpportunities((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Minhas oportunidades</h1>
        <p className="mt-1 text-sm text-slate-500">
          Acompanhe todas as empresas encontradas e o andamento de cada proposta — seu pequeno CRM de prospecção.
        </p>
      </div>

      <div className="card flex flex-wrap items-center gap-3 p-4">
        <input
          className="input max-w-xs"
          placeholder="Buscar por empresa, cidade ou segmento…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OpportunityStatus | 'todos')}
        >
          <option value="todos">Todos os status</option>
          {(Object.keys(OPPORTUNITY_STATUS_LABEL) as OpportunityStatus[]).map((s) => (
            <option key={s} value={s}>
              {OPPORTUNITY_STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <span className="ml-auto text-sm text-slate-500">{filtered.length} oportunidade(s)</span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Nenhuma oportunidade por aqui ainda."
          description="Busque empresas na tela inicial e clique em 'Gerar site com IA' para começar a preencher seu funil."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((opportunity) => (
            <OpportunityRow key={opportunity.id} opportunity={opportunity} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
