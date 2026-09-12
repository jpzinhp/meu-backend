# SitePro AI

Encontre empresas sem site profissional e gere automaticamente uma proposta de
site moderno e responsivo para cada uma delas.

Fluxo principal: **Buscar empresas → identificar oportunidade → gerar site com
IA → pré-visualizar → editar → criar proposta → compartilhar → publicar.**

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** para estilo
- **API Routes** para toda a lógica de servidor (busca, geração, CRM)
- **Zod** para validação de dados de entrada
- Camada de dados própria (`src/lib/data`), pronta para trocar o
  armazenamento local em arquivo por Supabase/PostgreSQL/Firebase

## Como rodar

```bash
npm install
cp .env.example .env.local   # opcional — funciona em modo demonstração sem isso
npm run dev
```

Acesse `http://localhost:3000`.

## Modo demonstração

Sem nenhuma chave de API configurada, a aplicação funciona de ponta a ponta
usando **empresas fictícias claramente marcadas como "🧪 DEMONSTRAÇÃO"** e
imagens de referência geradas localmente (sem depender de bancos de imagem
externos). Isso garante que todo o fluxo — busca, geração de site, edição,
proposta e publicação — seja testável imediatamente.

Para usar dados reais, configure em `.env.local`:

| Variável | Para que serve |
| --- | --- |
| `OPENWEBNINJA_API_KEY` | Busca de empresas reais (dados do Google Maps), gratuito e sem cartão — [openwebninja.com](https://openwebninja.com) |
| `PEXELS_API_KEY` | Fotos de banco de imagens licenciadas — [pexels.com/api](https://www.pexels.com/api/) |
| `ANTHROPIC_API_KEY` | Geração de textos (tagline, descrição, sobre, serviços) por IA generativa (Claude) — sem ela, usa textos por template |
| `DATABASE_URL` / `SUPABASE_URL` | Banco de dados de produção |

Nenhuma chave é exposta ao navegador — todas são lidas apenas em API Routes
do servidor. Veja a página **Configurações** dentro do app para o status de
cada integração.

## Estrutura

```
src/
  app/
    (app)/            → páginas com navegação (busca, oportunidades, editor, configurações)
    api/               → rotas de API (busca, geração de site, CRM, propostas)
    preview/[siteId]/  → renderização pública do site gerado (sem navegação do app)
    proposta/[shareId]/→ página de proposta para o cliente final
  components/          → UI (cards, formulários, editor, renderização do site)
  lib/
    discovery/         → provedores de busca de empresas (real + demonstração) e score de oportunidade
    images/             → banco de imagens (Pexels) + ilustrações de referência geradas
    site-generator/     → escolha de estrutura, textos e tema por segmento
    data/                → abstração de persistência (arquivo local hoje, banco real amanhã)
```

## Segurança

- Todas as chamadas a APIs externas acontecem em API Routes (servidor),
  nunca no navegador.
- Entradas de API são validadas com Zod.
- Nunca inventamos telefone, endereço ou site de uma empresa — quando a
  informação não existe publicamente, a seção correspondente é omitida.
- Imagens sem uma foto real disponível são sinalizadas como "imagem de
  referência" e nunca apresentadas como fotos da empresa.

## Publicação

O projeto é um app Next.js padrão, compatível com Vercel, Netlify (via
adapter) ou qualquer hospedagem Node.js própria (`npm run build && npm
start`). Nenhum domínio é inventado: publicar um site apenas disponibiliza a
URL da própria aplicação em `/preview/[siteId]`.
