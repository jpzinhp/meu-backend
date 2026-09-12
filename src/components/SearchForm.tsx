'use client';

import { useState } from 'react';
import { LOCATION_EXAMPLES, SEGMENTS, ALL_SEGMENTS_VALUE } from '@/lib/segments';

export interface SearchFormValues {
  location: string;
  segmentQuery: string;
}

export function SearchForm({
  onSearch,
  loading,
}: {
  onSearch: (values: SearchFormValues) => void;
  loading: boolean;
}) {
  const [location, setLocation] = useState('');
  const [segment, setSegment] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!location.trim()) return;
    onSearch({ location: location.trim(), segmentQuery: segment === ALL_SEGMENTS_VALUE ? '' : segment });
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="location">
            Localização
          </label>
          <input
            id="location"
            className="input"
            placeholder="Digite cidade, estado, bairro ou região"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="location-examples"
          />
          <datalist id="location-examples">
            {LOCATION_EXAMPLES.map((ex) => (
              <option key={ex} value={ex} />
            ))}
          </datalist>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {LOCATION_EXAMPLES.map((ex) => (
              <button
                type="button"
                key={ex}
                onClick={() => setLocation(ex)}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label" htmlFor="segment">
            Segmento
          </label>
          <select
            id="segment"
            className="input"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
          >
            <option value="">Qual tipo de empresa você procura?</option>
            <option value={ALL_SEGMENTS_VALUE}>Todos os segmentos</option>
            {SEGMENTS.filter((s) => s.id !== 'outro').map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SEGMENTS.filter((s) => ['restaurante', 'barbearia', 'academia', 'clinica'].includes(s.id)).map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => setSegment(s.id)}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading || !location.trim()} className="btn-primary mt-5 w-full sm:w-auto">
        {loading ? 'Buscando…' : '🔎 Encontrar empresas'}
      </button>
    </form>
  );
}
