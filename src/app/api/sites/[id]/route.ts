import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { jsonError, zodErrorMessage } from '@/lib/api-response';
import { updateSiteSchema } from '@/lib/validation';
import type { GeneratedSite } from '@/lib/types';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const site = await store.getSite(params.id);
  if (!site) return jsonError('Site não encontrado.', 404);
  return NextResponse.json({ site });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await store.getSite(params.id);
  if (!existing) return jsonError('Site não encontrado.', 404);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Corpo da requisição inválido.', 400);
  }

  const parsed = updateSiteSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  const updated: GeneratedSite = {
    ...existing,
    theme: parsed.data.theme ? { ...existing.theme, ...parsed.data.theme } : existing.theme,
    content: parsed.data.content
      ? { ...existing.content, ...(parsed.data.content as Partial<GeneratedSite['content']>) }
      : existing.content,
    updatedAt: new Date().toISOString(),
  };

  await store.upsertSite(updated);
  return NextResponse.json({ site: updated });
}
