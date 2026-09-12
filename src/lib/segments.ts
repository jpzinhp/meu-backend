import type { SegmentId, SegmentInfo } from './types';

export const SEGMENTS: SegmentInfo[] = [
  { id: 'restaurante', label: 'Restaurantes', searchTerms: ['restaurante', 'restaurantes'] },
  { id: 'pizzaria', label: 'Pizzarias', searchTerms: ['pizzaria', 'pizzarias'] },
  { id: 'clinica', label: 'Clínicas', searchTerms: ['clínica', 'clinicas', 'clínica médica'] },
  { id: 'academia', label: 'Academias', searchTerms: ['academia', 'academias', 'estúdio fitness'] },
  { id: 'salao-beleza', label: 'Salões de beleza', searchTerms: ['salão de beleza', 'salao de beleza'] },
  { id: 'barbearia', label: 'Barbearias', searchTerms: ['barbearia', 'barbearias'] },
  { id: 'oficina', label: 'Oficinas', searchTerms: ['oficina mecânica', 'oficina'] },
  { id: 'loja', label: 'Lojas', searchTerms: ['loja', 'lojas', 'comércio'] },
  { id: 'imobiliaria', label: 'Imobiliárias', searchTerms: ['imobiliária', 'imobiliaria'] },
  { id: 'hotel', label: 'Hotéis', searchTerms: ['hotel', 'hoteis'] },
  { id: 'pousada', label: 'Pousadas', searchTerms: ['pousada', 'pousadas'] },
  { id: 'construcao', label: 'Empresas de construção', searchTerms: ['construção civil', 'construtora'] },
  { id: 'escritorio', label: 'Escritórios', searchTerms: ['escritório', 'escritorio', 'consultoria'] },
  { id: 'escola', label: 'Escolas', searchTerms: ['escola', 'escolas', 'curso'] },
  { id: 'eventos', label: 'Empresas de eventos', searchTerms: ['eventos', 'buffet', 'cerimonial'] },
  { id: 'outro', label: 'Outro segmento', searchTerms: [] },
];

export const ALL_SEGMENTS_VALUE = 'todos';

export function findSegment(id: string | undefined | null): SegmentInfo {
  return SEGMENTS.find((s) => s.id === id) ?? SEGMENTS[SEGMENTS.length - 1];
}

export function guessSegmentFromQuery(query: string): SegmentInfo | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  for (const segment of SEGMENTS) {
    if (segment.id === q || segment.searchTerms.some((term) => q.includes(term))) {
      return segment;
    }
  }
  return null;
}

export const LOCATION_EXAMPLES = [
  'Salvador, BA',
  'São Paulo, SP',
  'Rio de Janeiro, RJ',
  'Feira de Santana, BA',
  'Campinas, SP',
];

export const SEGMENT_EXAMPLES: SegmentId[] = [
  'restaurante',
  'pizzaria',
  'clinica',
  'academia',
  'salao-beleza',
  'barbearia',
  'oficina',
  'loja',
  'imobiliaria',
  'hotel',
  'pousada',
  'construcao',
  'escritorio',
  'escola',
  'eventos',
];
