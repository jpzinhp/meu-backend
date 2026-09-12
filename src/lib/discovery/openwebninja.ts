import type { Company, WebsiteStatus } from '../types';
import { newId } from '../id';
import { findSegment, guessSegmentFromQuery } from '../segments';
import { calculateOpportunity } from './score';
import { parseLocation } from './demo';
import type { CompanySearchParams, DiscoveryProvider } from './types';

// Busca de empresas reais via Local Business Data API (OpenWeb Ninja) — dados
// agregados a partir do Google Maps (nome, telefone, endereço, avaliações e
// fotos), sem exigir cartão de crédito para o nível gratuito. Chave em
// https://openwebninja.com. Só é usado quando OPENWEBNINJA_API_KEY está
// configurada; caso contrário, a aplicação cai automaticamente em modo
// demonstração.
const SEARCH_URL = 'https://api.openwebninja.com/local-business-data/search';

interface OpenWebNinjaResult {
  business_id?: string;
  place_id?: string;
  name?: string;
  full_address?: string;
  address?: string;
  city?: string;
  phone_number?: string;
  website?: string;
  place_link?: string;
  rating?: number;
  review_count?: number;
  photos_sample?: Array<string | { photo_url_large?: string; photo_url?: string }>;
  working_hours?: Record<string, string[]>;
  opening_status?: string;
  emails_and_contacts?: { instagram?: string; facebook?: string };
}

function extractPhotos(x: OpenWebNinjaResult): string[] {
  const raw = Array.isArray(x.photos_sample) ? x.photos_sample : [];
  const urls = raw
    .map((p) => (typeof p === 'string' ? p : p?.photo_url_large || p?.photo_url))
    .filter((u): u is string => Boolean(u));
  return Array.from(new Set(urls));
}

function normalize(x: OpenWebNinjaResult, segmentQuery: string, location: string): Company {
  const { city, state } = parseLocation(location);
  const segmentInfo = guessSegmentFromQuery(segmentQuery) ?? findSegment('outro');
  const photos = extractPhotos(x);
  const hasWebsite = Boolean(x.website);
  const websiteStatus: WebsiteStatus = hasWebsite ? 'com-site' : 'sem-site';
  const address = x.full_address || x.address || '';
  const instagram = x.emails_and_contacts?.instagram;
  const facebook = x.emails_and_contacts?.facebook;

  const opportunity = calculateOpportunity({
    hasWebsite,
    rating: x.rating ?? undefined,
    ratingCount: x.review_count ?? 0,
    phone: x.phone_number,
    instagram,
    facebook,
    address,
    photos,
  });

  return {
    id: x.business_id || x.place_id || newId('biz'),
    name: x.name || 'Empresa encontrada',
    segment: segmentInfo.id,
    segmentLabel: segmentInfo.label,
    city: x.city || city,
    state,
    address,
    phone: x.phone_number || undefined,
    whatsapp: x.phone_number || undefined,
    instagram,
    facebook,
    website: x.website || undefined,
    hasWebsite,
    websiteStatus,
    rating: x.rating ?? undefined,
    ratingCount: x.review_count ?? 0,
    openingHours: x.working_hours
      ? Object.entries(x.working_hours).map(([day, hours]) => `${day}: ${(hours || []).join(', ')}`)
      : undefined,
    photos,
    source: 'Google Maps (via OpenWeb Ninja)',
    sourceUrl: x.place_link || undefined,
    isDemo: false,
    digitalPresence: opportunity.digitalPresence,
    opportunityScore: opportunity.score,
    opportunityReason: opportunity.reason,
    createdAt: new Date().toISOString(),
  };
}

export const openWebNinjaProvider: DiscoveryProvider = {
  name: 'openwebninja-local-business-data',

  isConfigured() {
    return Boolean(process.env.OPENWEBNINJA_API_KEY);
  },

  async search(params: CompanySearchParams): Promise<Company[]> {
    const apiKey = process.env.OPENWEBNINJA_API_KEY;
    if (!apiKey) {
      throw new Error('OPENWEBNINJA_API_KEY não configurada.');
    }

    const query = [params.segmentQuery || 'empresas', params.location].filter(Boolean).join(' em ');
    const limit = Math.min(20, Math.max(1, params.limit ?? 20));

    const url = new URL(SEARCH_URL);
    url.searchParams.set('query', query);
    url.searchParams.set('limit', String(limit));

    const response = await fetch(url, {
      headers: { 'x-api-key': apiKey },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`OpenWeb Ninja retornou ${response.status}`);
    }

    const data = (await response.json()) as { data?: OpenWebNinjaResult[]; results?: OpenWebNinjaResult[] };
    const raw = data.data || data.results || [];

    const seen = new Map<string, Company>();
    for (const item of raw) {
      const company = normalize(item, params.segmentQuery, params.location);
      seen.set(company.id, company);
    }

    return Array.from(seen.values())
      .sort((a, b) => b.opportunityScore - a.opportunityScore)
      .slice(0, limit);
  },
};
