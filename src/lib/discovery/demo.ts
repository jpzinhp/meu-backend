import type { Company, SegmentId, WebsiteStatus } from '../types';
import { newId } from '../id';
import { findSegment, guessSegmentFromQuery } from '../segments';
import { calculateOpportunity } from './score';
import { NEIGHBORHOODS, STREETS, SEGMENT_NAME_PARTS, pick } from './demo-data';
import type { CompanySearchParams } from './types';

const DDD_BY_STATE: Record<string, string> = {
  BA: '71',
  SP: '11',
  RJ: '21',
  MG: '31',
  PR: '41',
  RS: '51',
  PE: '81',
  CE: '85',
  DF: '61',
  SC: '48',
  GO: '62',
  ES: '27',
  AM: '92',
  PA: '91',
};

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

export function parseLocation(location: string): { city: string; state: string } {
  const parts = location.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const state = parts[parts.length - 1].toUpperCase().slice(0, 2);
    const city = parts.slice(0, -1).join(', ');
    return { city, state };
  }
  return { city: location.trim() || 'Sua cidade', state: 'BR' };
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function makeName(segmentId: SegmentId, rnd: () => number): string {
  const parts = SEGMENT_NAME_PARTS[segmentId];
  const prefix = pick(parts.prefixes, rnd);
  const core = pick(parts.cores, rnd);
  let suffix = pick(parts.suffixes, rnd);
  // Evita nomes redundantes como "Barbearia Estilo Barbearia".
  if (suffix && prefix.toLowerCase().includes(suffix.toLowerCase())) {
    suffix = '';
  }
  return [prefix, core, suffix].filter(Boolean).join(' ');
}

function makePhone(state: string, rnd: () => number): string {
  const ddd = DDD_BY_STATE[state] ?? '11';
  const part1 = 90000 + Math.floor(rnd() * 9999);
  const part2 = 1000 + Math.floor(rnd() * 8999);
  return `(${ddd}) 9${part1}-${part2}`;
}

function resolveSegments(segmentQuery: string): SegmentId[] {
  const q = segmentQuery.trim().toLowerCase();
  if (!q || q === 'todos' || q === 'todos os segmentos') {
    return ['restaurante', 'barbearia', 'academia', 'clinica', 'salao-beleza', 'loja'];
  }
  const guessed = guessSegmentFromQuery(q);
  if (guessed) return [guessed.id];
  return [findSegment(undefined).id];
}

/**
 * Gera empresas fictícias, claramente marcadas como DEMONSTRAÇÃO, para que o
 * produto seja utilizável de ponta a ponta mesmo sem nenhuma chave de API
 * configurada. Nunca deve ser exibido como se fossem empresas reais.
 */
export function generateDemoCompanies(params: CompanySearchParams): Company[] {
  const { city, state } = parseLocation(params.location);
  const seed = hashString(`${params.location}|${params.segmentQuery}`.toLowerCase()) || 1;
  const rnd = mulberry32(seed);
  const segments = resolveSegments(params.segmentQuery);
  const total = Math.min(params.limit ?? 14, 18);

  const companies: Company[] = [];
  const usedNames = new Set<string>();

  let attempts = 0;
  while (companies.length < total && attempts < total * 6) {
    attempts++;
    const segmentId = segments[Math.floor(rnd() * segments.length)];
    const segmentInfo = findSegment(segmentId);
    const name = makeName(segmentId, rnd);
    if (usedNames.has(name)) continue;
    usedNames.add(name);

    const hasWebsite = rnd() < 0.16;
    const hasInstagram = rnd() < 0.62;
    const hasFacebook = rnd() < 0.38;
    const ratingCount = rnd() < 0.12 ? 0 : Math.floor(rnd() * 320);
    const rating = ratingCount === 0 ? undefined : Math.round((3.3 + rnd() * 1.7) * 10) / 10;
    const street = pick(STREETS, rnd);
    const neighborhood = pick(NEIGHBORHOODS, rnd);
    const number = 20 + Math.floor(rnd() * 2500);
    const phone = rnd() < 0.85 ? makePhone(state, rnd) : undefined;
    const slug = slugify(name);

    const websiteStatus: WebsiteStatus = hasWebsite ? 'com-site' : 'sem-site';

    const opportunity = calculateOpportunity({
      hasWebsite,
      rating,
      ratingCount,
      phone,
      instagram: hasInstagram ? `@${slug}` : undefined,
      facebook: hasFacebook ? `${name}` : undefined,
      address: `${street}, ${number}`,
      photos: [],
    });

    companies.push({
      id: newId('demo'),
      name,
      segment: segmentId,
      segmentLabel: segmentInfo.label,
      city,
      state,
      address: `${street}, ${number} - ${neighborhood}, ${city} - ${state}`,
      phone,
      whatsapp: phone,
      instagram: hasInstagram ? `@${slug}` : undefined,
      facebook: hasFacebook ? name : undefined,
      website: hasWebsite ? `www.${slug}.com.br` : undefined,
      hasWebsite,
      websiteStatus,
      rating,
      ratingCount,
      openingHours: rnd() < 0.7 ? defaultOpeningHours(segmentId) : undefined,
      photos: [],
      source: 'Demonstração',
      isDemo: true,
      digitalPresence: opportunity.digitalPresence,
      opportunityScore: opportunity.score,
      opportunityReason: opportunity.reason,
      createdAt: new Date().toISOString(),
    });
  }

  return companies.sort((a, b) => b.opportunityScore - a.opportunityScore);
}

function defaultOpeningHours(segmentId: SegmentId): string[] {
  if (segmentId === 'restaurante' || segmentId === 'pizzaria') {
    return ['Seg a Sáb: 11h30–15h e 18h30–23h', 'Dom: 11h30–16h'];
  }
  if (segmentId === 'academia') {
    return ['Seg a Sex: 6h–22h', 'Sáb: 8h–14h'];
  }
  if (segmentId === 'clinica' || segmentId === 'escritorio') {
    return ['Seg a Sex: 8h–18h'];
  }
  return ['Seg a Sex: 9h–18h', 'Sáb: 9h–13h'];
}
