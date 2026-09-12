import { NextRequest, NextResponse } from 'next/server';
import { searchCompanies } from '@/lib/discovery';
import { GENERIC_SEARCH_FAILURE, jsonError, zodErrorMessage } from '@/lib/api-response';
import { searchCompaniesSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Corpo da requisição inválido.', 400);
  }

  const parsed = searchCompaniesSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(zodErrorMessage(parsed.error), 422);
  }

  try {
    const result = await searchCompanies(parsed.data);
    return NextResponse.json(result);
  } catch {
    return jsonError(GENERIC_SEARCH_FAILURE, 502);
  }
}
