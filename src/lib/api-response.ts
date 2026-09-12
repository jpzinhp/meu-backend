import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';

export function jsonError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export function zodErrorMessage(error: ZodError): string {
  const first = error.issues[0];
  return first ? first.message : 'Dados inválidos.';
}

export const GENERIC_SEARCH_FAILURE = 'Não foi possível realizar a busca agora. Tente novamente.';
export const NOT_CONFIGURED_MESSAGE = (integration: string) =>
  `Esta integração (${integration}) ainda não foi configurada. Adicione a chave da API em Configurações.`;
