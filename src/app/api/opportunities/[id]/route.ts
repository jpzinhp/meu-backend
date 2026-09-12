import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { jsonError, zodErrorMessage } from '@/lib/api-response';
import { updateOpportunitySchema } from '@/lib/validation';
import { newId } from '@/lib/id';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const opportunity = await store.getOpportunity(params.id);
  if (!opportunity) return jsonError('Oportunidade não encontrada.', 404);
  return NextResponse.json({ opportunity });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await store.getOpportunity(params.id);
  if (!existing) return jsonError('Oportunidade não encontrada.', 404);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Corpo da requisição inválido.', 400);
  }

  const parsed = updateOpportunitySchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  const { status, contactDate, addNote } = parsed.data;
  const notes = addNote
    ? [...existing.notes, { id: newId('note'), text: addNote, createdAt: new Date().toISOString() }]
    : existing.notes;

  const updated = await store.upsertOpportunity({
    ...existing,
    status: status ?? existing.status,
    contactDate: contactDate ?? existing.contactDate,
    notes,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ opportunity: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await store.deleteOpportunity(params.id);
  return NextResponse.json({ ok: true });
}
