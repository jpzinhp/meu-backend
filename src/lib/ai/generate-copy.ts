import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import type { Company } from '../types';
import { aiModel, getAnthropicClient } from './client';
import { AiSiteCopySchema, type AiSiteCopy } from './copy-schema';

const SYSTEM_PROMPT = `Você é um copywriter sênior especializado em sites institucionais para pequenos e médios negócios brasileiros.
Escreva sempre em português do Brasil, em tom profissional, caloroso e adequado ao segmento do negócio.
Regras importantes:
- NUNCA invente fatos verificáveis sobre a empresa (não invente prêmios, número de anos de existência, número de funcionários, nomes de clientes reais ou depoimentos atribuídos a pessoas).
- Escreva apenas textos de marketing genéricos e válidos para qualquer negócio real deste segmento e cidade.
- Seja específico ao segmento (use vocabulário do setor), mas genérico quanto a alegações factuais.
- Textos curtos, diretos e sem exageros ("o melhor do Brasil", "número 1"), sem emojis.`;

function buildUserPrompt(company: Company): string {
  const parts = [
    `Empresa: ${company.name}`,
    `Segmento: ${company.segmentLabel}`,
    `Cidade: ${company.city}${company.state ? `, ${company.state}` : ''}`,
  ];
  if (company.rating) {
    parts.push(`Avaliação pública: ${company.rating.toFixed(1)} de 5 (${company.ratingCount ?? 0} avaliações)`);
  }
  parts.push(
    '',
    'Gere o conteúdo de marketing para a página inicial do site profissional desta empresa, seguindo exatamente o schema fornecido.',
  );
  return parts.join('\n');
}

/**
 * Gera textos de marketing (tagline, descrição, sobre, serviços e
 * diferenciais) usando a API da Anthropic. Retorna `null` sempre que a IA
 * não estiver configurada ou a chamada falhar — o gerador de sites cai de
 * volta para os textos baseados em modelo por segmento, sem quebrar o
 * fluxo do usuário.
 */
export async function generateAiCopy(company: Company): Promise<AiSiteCopy | null> {
  const client = getAnthropicClient();
  if (!client) return null;

  try {
    const response = await client.messages.parse(
      {
        model: aiModel(),
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        output_config: {
          effort: 'medium',
          format: zodOutputFormat(AiSiteCopySchema),
        },
        messages: [{ role: 'user', content: buildUserPrompt(company) }],
      },
      { timeout: 20_000 },
    );

    if (!response.parsed_output) {
      console.warn('[ai] Resposta da IA não pôde ser validada contra o schema esperado.');
      return null;
    }

    return response.parsed_output;
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.warn('[ai] ANTHROPIC_API_KEY inválida — usando textos por template.');
    } else if (error instanceof Anthropic.RateLimitError) {
      console.warn('[ai] Limite de requisições da IA atingido — usando textos por template.');
    } else if (error instanceof Anthropic.APIConnectionError) {
      console.warn('[ai] Falha de conexão com a IA — usando textos por template.');
    } else if (error instanceof Anthropic.APIError) {
      console.warn(`[ai] Erro da API da IA (${error.status}) — usando textos por template.`);
    } else {
      console.warn('[ai] Erro inesperado ao gerar textos com IA — usando textos por template.', error);
    }
    return null;
  }
}
