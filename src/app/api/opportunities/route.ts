import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data';
import { getOrCreateOpportunity } from '@/lib/opportunities';
import { jsonError, zodErrorMessage } from '@/lib/api-response';
import { companySchema } from '@/lib/validation';
import type { Company } from '@/lib/types';
import { z } from 'zod';

export async function GET() {
  const opportunities = await store.listOpportunities();
  return NextResponse.json({ opportunities });
}

const bodySchema = z.object({ company: companySchema });

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Corpo da requisição inválido.', 400);
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  const opportunity = await getOrCreateOpportunity(parsed.data.company as unknown as Company, 'analisada');
  return NextResponse.json({ opportunity });
}
