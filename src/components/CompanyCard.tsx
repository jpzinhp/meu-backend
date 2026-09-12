'use client';

import type { Company } from '@/lib/types';
import { DemoBadge, PresenceBadge, ScoreBadge, WebsiteStatusBadge } from './badges';

export function CompanyCard({
  company,
  onGenerateSite,
  generating,
}: {
  company: Company;
  onGenerateSite: (company: Company) => void;
  generating: boolean;
}) {
  return (
    <div className="card flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{company.name}</h3>
            {company.isDemo && <DemoBadge />}
          </div>
          <p className="mt-0.5 text-sm text-slate-500">
            {company.segmentLabel} · {company.city}
            {company.state && company.state !== 'BR' ? `, ${company.state}` : ''}
          </p>
        </div>
        <ScoreBadge score={company.opportunityScore} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <WebsiteStatusBadge status={company.websiteStatus} />
        <PresenceBadge level={company.digitalPresence} />
      </div>

      <dl className="grid grid-cols-1 gap-1.5 text-sm text-slate-600 sm:grid-cols-2">
        {company.address && (
          <div className="flex gap-1.5">
            <dt className="shrink-0">📍</dt>
            <dd className="line-clamp-2">{company.address}</dd>
          </div>
        )}
        {company.phone && (
          <div className="flex gap-1.5">
            <dt className="shrink-0">📞</dt>
            <dd>{company.phone}</dd>
          </div>
        )}
        {company.instagram && (
          <div className="flex gap-1.5">
            <dt className="shrink-0">📷</dt>
            <dd className="truncate">{company.instagram}</dd>
          </div>
        )}
        {company.facebook && (
          <div className="flex gap-1.5">
            <dt className="shrink-0">👍</dt>
            <dd className="truncate">{company.facebook}</dd>
          </div>
        )}
        {typeof company.rating === 'number' && (
          <div className="flex gap-1.5">
            <dt className="shrink-0">⭐</dt>
            <dd>
              {company.rating.toFixed(1)} ({company.ratingCount ?? 0} avaliações)
            </dd>
          </div>
        )}
      </dl>

      <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
        <p className="mb-0.5 font-semibold text-slate-700">Por que esta empresa é uma boa oportunidade?</p>
        <p>{company.opportunityReason}</p>
      </div>

      <button
        type="button"
        className="btn-primary mt-auto"
        disabled={generating}
        onClick={() => onGenerateSite(company)}
      >
        {generating ? 'Gerando site…' : '✨ Gerar site com IA'}
      </button>
    </div>
  );
}
