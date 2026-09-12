import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { store } from '@/lib/data';
import { Logo } from '@/components/Logo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { shareId: string } }): Promise<Metadata> {
  const proposal = await store.getProposalByShareId(params.shareId);
  const site = proposal ? await store.getSite(proposal.siteId) : null;
  return { title: site ? `Proposta para ${site.content.companyName}` : 'Proposta não encontrada' };
}

const BENEFITS = [
  { icon: '📱', title: 'Funciona em qualquer tela', text: 'Site responsivo, rápido e adaptado para celular, tablet e computador.' },
  { icon: '🔎', title: 'Presença profissional', text: 'Uma vitrine própria na internet, além das redes sociais.' },
  { icon: '💬', title: 'Contato direto pelo WhatsApp', text: 'Clientes falam com você em um clique, sem intermediários.' },
  { icon: '⭐', title: 'Mais credibilidade', text: 'Transmite confiança para quem está conhecendo o seu negócio agora.' },
];

export default async function ProposalPage({ params }: { params: { shareId: string } }) {
  const proposal = await store.getProposalByShareId(params.shareId);
  if (!proposal) notFound();

  const site = await store.getSite(proposal.siteId);
  if (!site) notFound();

  await store.incrementProposalViews(params.shareId);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-10">
        <Logo />
      </header>

      <section className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-10">
        <span className="badge bg-brand-50 text-brand-700">Proposta de site profissional</span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-4xl">
          Criamos uma presença digital profissional para {site.content.companyName}.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          Preparamos um site completo, moderno e pronto para atrair mais clientes para o seu negócio. Veja abaixo
          como ficou.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <iframe
            src={`/preview/${site.id}`}
            title={`Site de ${site.content.companyName}`}
            className="h-[75vh] w-full border-0"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-10">
        <h2 className="text-center text-xl font-bold text-slate-900">Por que ter um site profissional?</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card p-5">
              <span className="text-2xl">{b.icon}</span>
              <p className="mt-2 font-semibold text-slate-800">{b.title}</p>
              <p className="mt-1 text-sm text-slate-500">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-16 text-center sm:px-10">
        <div className="card p-8">
          <h2 className="text-lg font-bold text-slate-900">Gostou do que viu?</h2>
          <p className="mt-2 text-sm text-slate-500">
            Fale com quem te enviou esta proposta para aprovar e colocar o site da {site.content.companyName} no ar.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-xs text-slate-400 sm:px-10">
        Proposta criada com SitePro AI
      </footer>
    </div>
  );
}
