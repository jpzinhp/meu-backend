'use client';

import type { WebsiteStatus, DigitalPresenceLevel } from '@/lib/types';

export type SortOption = 'oportunidade' | 'avaliacao' | 'avaliacoes' | 'alfabetica';

export interface Filters {
  status: WebsiteStatus | 'todos';
  presence: DigitalPresenceLevel | 'todas';
  sort: SortOption;
}

export const DEFAULT_FILTERS: Filters = { status: 'todos', presence: 'todas', sort: 'oportunidade' };

export function FiltersBar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  return (
    <div className="card flex flex-wrap items-center gap-3 p-4">
      <FilterSelect
        label="Status do site"
        value={filters.status}
        onChange={(status) => onChange({ ...filters, status: status as Filters['status'] })}
        options={[
          { value: 'todos', label: 'Todos' },
          { value: 'sem-site', label: 'Sem site' },
          { value: 'com-site', label: 'Com site' },
          { value: 'desconhecido', label: 'Desconhecido' },
        ]}
      />
      <FilterSelect
        label="Presença digital"
        value={filters.presence}
        onChange={(presence) => onChange({ ...filters, presence: presence as Filters['presence'] })}
        options={[
          { value: 'todas', label: 'Todas' },
          { value: 'muito-baixa', label: 'Muito baixa' },
          { value: 'baixa', label: 'Baixa' },
          { value: 'media', label: 'Média' },
          { value: 'boa', label: 'Boa' },
        ]}
      />
      <FilterSelect
        label="Ordenar por"
        value={filters.sort}
        onChange={(sort) => onChange({ ...filters, sort: sort as SortOption })}
        options={[
          { value: 'oportunidade', label: 'Maior oportunidade' },
          { value: 'avaliacao', label: 'Maior avaliação' },
          { value: 'avaliacoes', label: 'Mais avaliações' },
          { value: 'alfabetica', label: 'Ordem alfabética' },
        ]}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="font-medium text-slate-500">{label}</span>
      <select
        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function applyFilters<T extends {
  websiteStatus: WebsiteStatus;
  digitalPresence: DigitalPresenceLevel;
  opportunityScore: number;
  rating?: number;
  ratingCount?: number;
  name: string;
}>(companies: T[], filters: Filters): T[] {
  let result = companies.filter((c) => {
    if (filters.status !== 'todos' && c.websiteStatus !== filters.status) return false;
    if (filters.presence !== 'todas' && c.digitalPresence !== filters.presence) return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case 'avaliacao':
        return (b.rating ?? 0) - (a.rating ?? 0);
      case 'avaliacoes':
        return (b.ratingCount ?? 0) - (a.ratingCount ?? 0);
      case 'alfabetica':
        return a.name.localeCompare(b.name, 'pt-BR');
      case 'oportunidade':
      default:
        return b.opportunityScore - a.opportunityScore;
    }
  });

  return result;
}
