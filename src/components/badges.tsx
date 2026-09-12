import type { DigitalPresenceLevel, OpportunityStatus, WebsiteStatus } from '@/lib/types';
import { opportunityLabel } from '@/lib/discovery';

export function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 85
      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
      : score >= 65
        ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-200'
        : score >= 40
          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
          : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';

  return (
    <div className={`badge flex-col items-start gap-0.5 rounded-xl px-3 py-1.5 ${tone}`}>
      <span className="text-sm font-bold leading-none">{score}/100</span>
      <span className="text-[11px] font-medium leading-none">{opportunityLabel(score)}</span>
    </div>
  );
}

const WEBSITE_STATUS_LABEL: Record<WebsiteStatus, string> = {
  'sem-site': 'Sem site',
  'com-site': 'Com site',
  desconhecido: 'Site desconhecido',
};

const WEBSITE_STATUS_TONE: Record<WebsiteStatus, string> = {
  'sem-site': 'bg-emerald-50 text-emerald-700',
  'com-site': 'bg-slate-100 text-slate-600',
  desconhecido: 'bg-amber-50 text-amber-700',
};

export function WebsiteStatusBadge({ status }: { status: WebsiteStatus }) {
  return <span className={`badge ${WEBSITE_STATUS_TONE[status]}`}>{WEBSITE_STATUS_LABEL[status]}</span>;
}

const PRESENCE_LABEL: Record<DigitalPresenceLevel, string> = {
  'muito-baixa': 'Presença muito baixa',
  baixa: 'Presença baixa',
  media: 'Presença média',
  boa: 'Boa presença',
};

const PRESENCE_TONE: Record<DigitalPresenceLevel, string> = {
  'muito-baixa': 'bg-rose-50 text-rose-700',
  baixa: 'bg-orange-50 text-orange-700',
  media: 'bg-amber-50 text-amber-700',
  boa: 'bg-sky-50 text-sky-700',
};

export function PresenceBadge({ level }: { level: DigitalPresenceLevel }) {
  return <span className={`badge ${PRESENCE_TONE[level]}`}>{PRESENCE_LABEL[level]}</span>;
}

export function DemoBadge() {
  return (
    <span className="badge bg-violet-100 text-violet-700 ring-1 ring-violet-200" title="Empresa fictícia para demonstração — sem chave de API configurada">
      🧪 DEMONSTRAÇÃO
    </span>
  );
}

export const OPPORTUNITY_STATUS_LABEL: Record<OpportunityStatus, string> = {
  encontrada: 'Encontrada',
  analisada: 'Analisada',
  'site-gerado': 'Site gerado',
  'proposta-criada': 'Proposta criada',
  enviada: 'Enviada',
  'cliente-interessado': 'Cliente interessado',
  'site-publicado': 'Site publicado',
};

const OPPORTUNITY_STATUS_TONE: Record<OpportunityStatus, string> = {
  encontrada: 'bg-slate-100 text-slate-600',
  analisada: 'bg-sky-50 text-sky-700',
  'site-gerado': 'bg-indigo-50 text-indigo-700',
  'proposta-criada': 'bg-violet-50 text-violet-700',
  enviada: 'bg-amber-50 text-amber-700',
  'cliente-interessado': 'bg-lime-50 text-lime-700',
  'site-publicado': 'bg-emerald-50 text-emerald-700',
};

export function OpportunityStatusBadge({ status }: { status: OpportunityStatus }) {
  return <span className={`badge ${OPPORTUNITY_STATUS_TONE[status]}`}>{OPPORTUNITY_STATUS_LABEL[status]}</span>;
}
