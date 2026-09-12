'use client';

import type { GeneratedSite, ServiceItem } from '@/lib/types';

type Draft = Pick<GeneratedSite, 'content' | 'theme'>;

export function EditorForm({ draft, onChange }: { draft: Draft; onChange: (draft: Draft) => void }) {
  const { content, theme } = draft;

  function setContent<K extends keyof typeof content>(key: K, value: (typeof content)[K]) {
    onChange({ ...draft, content: { ...content, [key]: value } });
  }

  function setTheme<K extends keyof typeof theme>(key: K, value: (typeof theme)[K]) {
    onChange({ ...draft, theme: { ...theme, [key]: value } });
  }

  const itemsSectionIndex = content.sections.findIndex((s) => Array.isArray(s.items));
  const itemsSection = itemsSectionIndex >= 0 ? content.sections[itemsSectionIndex] : null;

  function updateItem(index: number, patch: Partial<ServiceItem>) {
    if (itemsSectionIndex < 0 || !itemsSection?.items) return;
    const items = itemsSection.items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    const sections = content.sections.map((s, i) => (i === itemsSectionIndex ? { ...s, items } : s));
    setContent('sections', sections);
  }

  return (
    <div className="flex flex-col gap-6">
      <Fieldset title="Identidade">
        <Field label="Nome da empresa">
          <input className="input" value={content.companyName} onChange={(e) => setContent('companyName', e.target.value)} />
        </Field>
        <Field label="Frase de efeito (título)">
          <input className="input" value={content.tagline} onChange={(e) => setContent('tagline', e.target.value)} />
        </Field>
        <Field label="Descrição">
          <textarea
            className="input min-h-20"
            value={content.description}
            onChange={(e) => setContent('description', e.target.value)}
          />
        </Field>
        <Field label="Inicial do logo">
          <input
            className="input"
            maxLength={2}
            value={theme.logoInitial}
            onChange={(e) => setTheme('logoInitial', e.target.value.toUpperCase())}
          />
        </Field>
      </Fieldset>

      <Fieldset title="Contato">
        <Field label="Telefone">
          <input className="input" value={content.phone ?? ''} onChange={(e) => setContent('phone', e.target.value)} />
        </Field>
        <Field label="WhatsApp (com DDD)">
          <input className="input" value={content.whatsapp ?? ''} onChange={(e) => setContent('whatsapp', e.target.value)} />
        </Field>
        <Field label="Endereço">
          <input className="input" value={content.address ?? ''} onChange={(e) => setContent('address', e.target.value)} />
        </Field>
        <Field label="Instagram">
          <input className="input" value={content.instagram ?? ''} onChange={(e) => setContent('instagram', e.target.value)} />
        </Field>
        <Field label="Facebook">
          <input className="input" value={content.facebook ?? ''} onChange={(e) => setContent('facebook', e.target.value)} />
        </Field>
      </Fieldset>

      <Fieldset title="Cores do site">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ColorField label="Primária" value={theme.primaryColor} onChange={(v) => setTheme('primaryColor', v)} />
          <ColorField label="Secundária" value={theme.secondaryColor} onChange={(v) => setTheme('secondaryColor', v)} />
          <ColorField label="Destaque" value={theme.accentColor} onChange={(v) => setTheme('accentColor', v)} />
          <ColorField label="Texto" value={theme.textColor} onChange={(v) => setTheme('textColor', v)} />
          <ColorField label="Fundo" value={theme.backgroundColor} onChange={(v) => setTheme('backgroundColor', v)} />
        </div>
      </Fieldset>

      {itemsSection && (
        <Fieldset title={`Serviços — seção "${itemsSection.title}"`}>
          <div className="flex flex-col gap-4">
            {itemsSection.items?.map((item, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-3">
                <Field label="Nome">
                  <input className="input" value={item.name} onChange={(e) => updateItem(i, { name: e.target.value })} />
                </Field>
                <Field label="Descrição">
                  <input
                    className="input"
                    value={item.description}
                    onChange={(e) => updateItem(i, { description: e.target.value })}
                  />
                </Field>
                <Field label="Preço (opcional)">
                  <input
                    className="input"
                    placeholder="Ex: A partir de R$ 49,90"
                    value={item.price ?? ''}
                    onChange={(e) => updateItem(i, { price: e.target.value })}
                  />
                </Field>
              </div>
            ))}
          </div>
        </Fieldset>
      )}
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-slate-200 p-4">
      <legend className="px-1 text-sm font-semibold text-slate-700">{title}</legend>
      <div className="mt-2 flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col items-start gap-1">
      <span className="label">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-9 cursor-pointer rounded border border-slate-300 p-0.5"
        />
        <span className="text-xs text-slate-500">{value}</span>
      </div>
    </label>
  );
}
