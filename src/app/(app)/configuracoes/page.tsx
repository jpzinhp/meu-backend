import { activeDiscoveryProviderName, isDiscoveryConfigured } from '@/lib/discovery';
import { isPexelsConfigured } from '@/lib/images';
import { isProductionDatabaseConfigured } from '@/lib/data';
import { Alert } from '@/components/Alert';
import { CopyButton } from '@/components/CopyButton';

interface IntegrationCardProps {
  icon: string;
  title: string;
  description: string;
  configured: boolean;
  envVar?: string;
  extraNote?: string;
}

function IntegrationCard({ icon, title, description, configured, envVar, extraNote }: IntegrationCardProps) {
  return (
    <div className="card flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <span className={`badge ${configured ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {configured ? '✅ Configurado' : 'Não configurado'}
        </span>
      </div>
      <p className="text-sm text-slate-500">{description}</p>
      {envVar && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
          <code className="text-xs text-slate-600">{envVar}</code>
          <CopyButton value={envVar} label="Copiar nome" />
        </div>
      )}
      {extraNote && <p className="text-xs text-slate-400">{extraNote}</p>}
    </div>
  );
}

export default function ConfiguracoesPage() {
  const discoveryOn = isDiscoveryConfigured();
  const imagesOn = isPexelsConfigured();
  const aiOn = Boolean(process.env.ANTHROPIC_API_KEY);
  const dbOn = isProductionDatabaseConfigured;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="mt-1 text-sm text-slate-500">
          Status das integrações da sua conta. Por segurança, chaves de API nunca são digitadas ou exibidas no
          navegador — todas são configuradas apenas por variáveis de ambiente no servidor.
        </p>
      </div>

      <Alert tone="info" title="Como configurar uma chave">
        Copie o nome da variável de ambiente desejada e adicione-a no arquivo <code>.env.local</code> (desenvolvimento)
        ou no painel de variáveis de ambiente da sua hospedagem (produção) e reinicie a aplicação. Veja também o
        arquivo <code>.env.example</code> no projeto.
      </Alert>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IntegrationCard
          icon="🔎"
          title="Descoberta de empresas"
          description={
            discoveryOn
              ? `Fonte ativa: ${activeDiscoveryProviderName()}.`
              : 'Sem chave configurada — as buscas usam empresas de demonstração, claramente sinalizadas.'
          }
          configured={discoveryOn}
          envVar="OPENWEBNINJA_API_KEY"
          extraNote="Chave gratuita (sem cartão) em openwebninja.com — retorna dados reais do Google Maps. Alternativa futura: GOOGLE_PLACES_API_KEY."
        />
        <IntegrationCard
          icon="🖼️"
          title="Banco de imagens"
          description={
            imagesOn
              ? 'Fotos reais licenciadas do Pexels serão usadas como imagem de referência.'
              : 'Sem chave configurada — usamos ilustrações geradas automaticamente no estilo do segmento, sem depender de fotos externas.'
          }
          configured={imagesOn}
          envVar="PEXELS_API_KEY"
          extraNote="Chave gratuita em pexels.com/api."
        />
        <IntegrationCard
          icon="🤖"
          title="IA de geração de conteúdo"
          description={
            aiOn
              ? 'Textos gerados por IA generativa.'
              : 'Sem chave configurada — os textos do site usam um gerador baseado em modelos por segmento.'
          }
          configured={aiOn}
          envVar="ANTHROPIC_API_KEY"
        />
        <IntegrationCard
          icon="💬"
          title="WhatsApp"
          description="Os links de WhatsApp são gerados automaticamente a partir do telefone público da empresa — nenhuma configuração é necessária."
          configured
        />
        <IntegrationCard
          icon="🚀"
          title="Hospedagem"
          description="O projeto é compatível com Vercel, Netlify ou hospedagem própria via Node.js. Nenhum domínio é inventado — a publicação disponibiliza a URL da própria aplicação."
          configured={Boolean(process.env.VERCEL_API_TOKEN || process.env.NETLIFY_API_TOKEN)}
          envVar="VERCEL_API_TOKEN / NETLIFY_API_TOKEN"
        />
        <IntegrationCard
          icon="🗄️"
          title="Banco de dados"
          description={
            dbOn
              ? 'Banco de dados externo configurado.'
              : 'Usando armazenamento local em arquivo (ideal para demonstração). Configure um banco para produção com múltiplas instâncias.'
          }
          configured={dbOn}
          envVar="DATABASE_URL ou SUPABASE_URL"
        />
      </div>
    </div>
  );
}
