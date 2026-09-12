'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchForm, type SearchFormValues } from './SearchForm';
import { FiltersBar, DEFAULT_FILTERS, applyFilters, type Filters } from './FiltersBar';
import { CompanyCard } from './CompanyCard';
import { EmptyState } from './EmptyState';
import { Alert } from './Alert';
import { generateSite, saveOpportunity, searchCompanies, ApiError } from '@/lib/api-client';
import type { Company } from '@/lib/types';

type Status = 'idle' | 'loading' | 'error' | 'done';

export function SearchExperience() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(values: SearchFormValues) {
    setStatus('loading');
    setError(null);
    setSearched(true);
    try {
      const result = await searchCompanies(values.location, values.segmentQuery);
      setCompanies(result.companies);
      setIsDemo(result.isDemo);
      setDemoNotice(
        result.isDemo
          ? result.error
            ? 'Não foi possível consultar a fonte de dados configurada, então mostramos resultados de demonstração.'
            : 'Nenhuma fonte de busca real está configurada — mostrando empresas de demonstração. Configure uma chave de API em Configurações para buscar empresas reais.'
          : null,
      );
      setStatus('done');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Não foi possível realizar a busca agora. Tente novamente.');
      setStatus('error');
    }
  }

  async function handleGenerateSite(company: Company) {
    setGeneratingId(company.id);
    try {
      await saveOpportunity(company);
      const { site } = await generateSite(company);
      router.push(`/site/${site.id}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Não foi possível gerar o site agora. Tente novamente.');
      setGeneratingId(null);
    }
  }

  const visibleCompanies = applyFilters(companies, filters);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Encontre empresas sem site e crie um site profissional para elas
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500 sm:mx-0 mx-auto">
          Encontre negócios em todo o Brasil e gere automaticamente uma proposta de site personalizada para cada
          empresa.
        </p>
      </div>

      <SearchForm onSearch={handleSearch} loading={status === 'loading'} />

      {error && <Alert tone="error">{error}</Alert>}
      {demoNotice && <Alert tone="warning" title="Modo demonstração">{demoNotice}</Alert>}

      {status === 'loading' && (
        <EmptyState icon="⏳" title="Buscando empresas…" description="Isso leva só alguns segundos." />
      )}

      {status === 'done' && companies.length === 0 && (
        <EmptyState
          icon="🤷"
          title="Nenhuma empresa encontrada."
          description="Tente outra cidade ou segmento."
        />
      )}

      {status === 'done' && companies.length > 0 && (
        <>
          <FiltersBar filters={filters} onChange={setFilters} />
          <p className="text-sm text-slate-500">
            {visibleCompanies.length} de {companies.length} empresas encontradas
            {isDemo ? ' · resultados de demonstração' : ''}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onGenerateSite={handleGenerateSite}
                generating={generatingId === company.id}
              />
            ))}
          </div>
        </>
      )}

      {!searched && status === 'idle' && (
        <EmptyState
          icon="🚀"
          title="Comece buscando por cidade e segmento"
          description="Exemplo: 'Feira de Santana, BA' + 'barbearias'."
        />
      )}
    </div>
  );
}
