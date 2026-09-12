import { NextResponse } from 'next/server';
import { activeDiscoveryProviderName, isDiscoveryConfigured } from '@/lib/discovery';
import { isPexelsConfigured } from '@/lib/images';
import { isProductionDatabaseConfigured } from '@/lib/data';
import type { IntegrationStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status: IntegrationStatus = {
    discoveryConfigured: isDiscoveryConfigured(),
    discoveryProvider: activeDiscoveryProviderName(),
    imagesConfigured: isPexelsConfigured(),
    aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    databaseConfigured: isProductionDatabaseConfigured,
    databaseProvider: isProductionDatabaseConfigured ? 'Banco externo configurado' : 'Armazenamento local (arquivo)',
  };

  return NextResponse.json({ ok: true, ...status });
}
