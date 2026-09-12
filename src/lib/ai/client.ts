import Anthropic from '@anthropic-ai/sdk';

// Modelo padrão para geração de textos. Pode ser sobrescrito via variável de
// ambiente para testes com outro modelo, mas nunca é enviado pelo navegador.
const DEFAULT_MODEL = 'claude-opus-5';

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export function aiModel(): string {
  return process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
}

let cachedClient: Anthropic | null = null;

/** Cliente Anthropic — só deve ser importado/usado em código de servidor. */
export function getAnthropicClient(): Anthropic | null {
  if (!isAiConfigured()) return null;
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return cachedClient;
}
