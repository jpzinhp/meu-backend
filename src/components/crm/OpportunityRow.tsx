'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Opportunity, OpportunityStatus } from '@/lib/types';
import { updateOpportunity, ApiError } from '@/lib/api-client';
import { OPPORTUNITY_STATUS_LABEL, WebsiteStatusBadge } from '../badges';

export function OpportunityRow({
  opportunity,
  onUpdate,
}: {
  opportunity: Opportunity;
  onUpdate: (updated: Opportunity) => void;
}) {
  const { company } = opportunity;
  const [noteDraft, setNoteDraft] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function changeStatus(status: OpportunityStatus) {
    setBusy(true);
    setError(null);
    try {
      const { opportunity: updated } = await updateOpportunity(opportunity.id, { status });
      onUpdate(updated);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Não foi possível atualizar o status.');
    } finally {
      setBusy(false);
    }
  }

  async function changeContactDate(contactDate: string) {
    setBusy(true);
    try {
      const { opportunity: updated } = await updateOpportunity(opportunity.id, { contactDate });
      onUpdate(updated);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Não foi possível salvar a data.');
    } finally {
      setBusy(false);
    }
  }

  async function addNote() {
    if (!noteDraft.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const { opportunity: updated } = await updateOpportunity(opportunity.id, { addNote: noteDraft.trim() });
      onUpdate(updated);
      setNoteDraft('');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Não foi possível salvar a observação.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">{company.name}</p>
          <p className="text-sm text-slate-500">
            {company.segmentLabel} · {company.city}
            {company.state ? `, ${company.state}` : ''}
          </p>
        </div>
        <WebsiteStatusBadge status={company.websiteStatus} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
        <span>📞 {company.phone ?? '—'}</span>
        <span>📷 {company.instagram ?? '—'}</span>
        <span className="truncate">🌐 {company.website ?? 'Sem site'}</span>
        <label className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400">Contato em:</span>
          <input
            type="date"
            className="rounded border border-slate-300 px-1.5 py-0.5 text-xs"
            value={opportunity.contactDate?.slice(0, 10) ?? ''}
            onChange={(e) => changeContactDate(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select
          disabled={busy}
          value={opportunity.status}
          onChange={(e) => changeStatus(e.target.value as OpportunityStatus)}
          className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
        >
          {(Object.keys(OPPORTUNITY_STATUS_LABEL) as OpportunityStatus[]).map((s) => (
            <option key={s} value={s}>
              {OPPORTUNITY_STATUS_LABEL[s]}
            </option>
          ))}
        </select>

        {opportunity.siteId && (
          <Link href={`/site/${opportunity.siteId}`} className="btn-ghost border border-slate-200 !px-3 !py-1.5 text-xs">
            Abrir editor do site
          </Link>
        )}
        <button
          type="button"
          onClick={() => setShowNotes((v) => !v)}
          className="btn-ghost border border-slate-200 !px-3 !py-1.5 text-xs"
        >
          🗒️ Observações ({opportunity.notes.length})
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}

      {showNotes && (
        <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
          {opportunity.notes.map((note) => (
            <div key={note.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <p>{note.text}</p>
              <p className="mt-1 text-[11px] text-slate-400">{new Date(note.createdAt).toLocaleString('pt-BR')}</p>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              className="input"
              placeholder="Adicionar observação…"
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNote()}
            />
            <button type="button" className="btn-secondary shrink-0" disabled={busy} onClick={addNote}>
              Adicionar observação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
