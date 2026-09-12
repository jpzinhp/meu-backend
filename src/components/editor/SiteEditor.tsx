'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GeneratedSite, SitePlan } from '@/lib/types';
import { ApiError, createProposal, publishSite, regenerateSite, updateSite } from '@/lib/api-client';
import { DeviceFrame } from '../DeviceFrame';
import { CopyButton } from '../CopyButton';
import { Alert } from '../Alert';
import { EditorForm } from './EditorForm';

type Tab = 'previa' | 'editor';

const PLAN_LABEL: Record<SitePlan, string> = { basico: 'Básico', profissional: 'Profissional', premium: 'Premium' };

export function SiteEditor({ initialSite }: { initialSite: GeneratedSite }) {
  const [site, setSite] = useState(initialSite);
  const [draft, setDraft] = useState({ content: initialSite.content, theme: initialSite.theme });
  const [tab, setTab] = useState<Tab>('previa');
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(site.status === 'publicado' ? `/preview/${site.id}` : null);
  const [confirmingPublish, setConfirmingPublish] = useState(false);

  function origin() {
    return typeof window !== 'undefined' ? window.location.origin : '';
  }

  async function handleSave() {
    setBusy('save');
    setMessage(null);
    try {
      const { site: updated } = await updateSite(site.id, draft);
      setSite(updated);
      setDirty(false);
      setRefreshKey((k) => k + 1);
      setMessage({ tone: 'success', text: 'Alterações salvas com sucesso.' });
    } catch (e) {
      setMessage({ tone: 'error', text: e instanceof ApiError ? e.message : 'Não foi possível salvar agora.' });
    } finally {
      setBusy(null);
    }
  }

  async function handleRegenerate(plan?: SitePlan) {
    setBusy('regenerate');
    setMessage(null);
    try {
      const { site: updated } = await regenerateSite(site.id, plan);
      setSite(updated);
      setDraft({ content: updated.content, theme: updated.theme });
      setDirty(false);
      setRefreshKey((k) => k + 1);
      setMessage({ tone: 'success', text: 'Nova versão do site gerada.' });
    } catch (e) {
      setMessage({ tone: 'error', text: e instanceof ApiError ? e.message : 'Não foi possível regenerar agora.' });
    } finally {
      setBusy(null);
    }
  }

  async function handlePublish() {
    setBusy('publish');
    setMessage(null);
    try {
      const { site: updated, publicUrl: url } = await publishSite(site.id);
      setSite(updated);
      setPublicUrl(url);
      setConfirmingPublish(false);
      setMessage({ tone: 'success', text: 'Site publicado com sucesso!' });
    } catch (e) {
      setMessage({ tone: 'error', text: e instanceof ApiError ? e.message : 'Não foi possível publicar agora.' });
    } finally {
      setBusy(null);
    }
  }

  async function handleCreateProposal() {
    setBusy('proposal');
    setMessage(null);
    try {
      const { proposal } = await createProposal(site.id, site.opportunityId);
      setShareLink(`${origin()}/proposta/${proposal.shareId}`);
    } catch (e) {
      setMessage({ tone: 'error', text: e instanceof ApiError ? e.message : 'Não foi possível criar a proposta agora.' });
    } finally {
      setBusy(null);
    }
  }

  const previewSrc = `/preview/${site.id}?v=${refreshKey}`;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/oportunidades" className="text-sm text-slate-500 hover:text-slate-700">
            ← Minhas oportunidades
          </Link>
          <h1 className="text-xl font-bold text-slate-900">{site.content.companyName}</h1>
          <p className="text-sm text-slate-500">
            {site.content.segmentLabel} · Plano {PLAN_LABEL[site.plan]} · v{site.version}
            {site.status === 'publicado' && ' · ✅ publicado'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={previewSrc} target="_blank" rel="noreferrer" className="btn-secondary">
            👁️ Visualizar site
          </a>
          <button type="button" className="btn-primary" disabled={!dirty || busy !== null} onClick={handleSave}>
            {busy === 'save' ? 'Salvando…' : '💾 Salvar alterações'}
          </button>
        </div>
      </div>

      {message && <Alert tone={message.tone === 'success' ? 'success' : 'error'}>{message.text}</Alert>}

      <div className="flex gap-2 border-b border-slate-200">
        {(['previa', 'editor'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t === 'previa' ? 'Pré-visualização' : 'Editor'}
          </button>
        ))}
      </div>

      {tab === 'previa' ? (
        <DeviceFrame src={previewSrc} title={`${site.content.companyName} — prévia`} />
      ) : (
        <EditorForm
          draft={draft}
          onChange={(next) => {
            setDraft(next);
            setDirty(true);
          }}
        />
      )}

      <div className="card flex flex-col gap-4 p-5">
        <h2 className="text-sm font-semibold text-slate-700">Ações</h2>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Regenerar com plano:</span>
          {(['basico', 'profissional', 'premium'] as SitePlan[]).map((plan) => (
            <button
              key={plan}
              type="button"
              disabled={busy !== null}
              onClick={() => handleRegenerate(plan)}
              className="btn-ghost border border-slate-200 !px-3 !py-1.5 text-xs"
            >
              {busy === 'regenerate' ? '…' : `🔄 ${PLAN_LABEL[plan]}`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button type="button" className="btn-secondary" disabled={busy !== null} onClick={handleCreateProposal}>
            {busy === 'proposal' ? 'Criando…' : '📩 Criar proposta para cliente'}
          </button>

          {!confirmingPublish ? (
            <button
              type="button"
              className="btn-secondary"
              disabled={busy !== null}
              onClick={() => setConfirmingPublish(true)}
            >
              🚀 Publicar site
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              <span>Confirmar publicação do site?</span>
              <button type="button" className="btn-primary !px-3 !py-1.5" disabled={busy !== null} onClick={handlePublish}>
                {busy === 'publish' ? 'Publicando…' : 'Sim, publicar'}
              </button>
              <button type="button" className="btn-ghost !px-3 !py-1.5" onClick={() => setConfirmingPublish(false)}>
                Cancelar
              </button>
            </div>
          )}
        </div>

        {shareLink && (
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-violet-50 px-3 py-2.5 text-sm text-violet-800">
            <span className="truncate">🔗 {shareLink}</span>
            <CopyButton value={shareLink} />
            <a href={shareLink} target="_blank" rel="noreferrer" className="btn-ghost !px-3 !py-1.5">
              Ver proposta
            </a>
          </div>
        )}

        {publicUrl && (
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
            <span>✅ Site publicado com sucesso</span>
            <CopyButton value={`${origin()}${publicUrl}`} label="🔗 Copiar link do site" />
          </div>
        )}
      </div>
    </div>
  );
}
