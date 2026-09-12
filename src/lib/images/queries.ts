import type { SegmentId } from '../types';

// Termos em inglês tendem a trazer resultados melhores nos bancos de imagem
// internacionais (Pexels/Unsplash). Cada segmento tem algumas variações para
// montar uma galeria com fotos diferentes entre si.
export const SEGMENT_IMAGE_QUERIES: Record<SegmentId, string[]> = {
  restaurante: ['restaurant food plating', 'restaurant interior', 'chef cooking kitchen', 'people dining restaurant', 'gourmet dish'],
  pizzaria: ['pizza oven', 'pizza slice', 'pizzeria interior', 'italian food', 'pizza chef'],
  clinica: ['medical clinic', 'doctor patient care', 'modern clinic interior', 'healthcare professional', 'medical equipment'],
  academia: ['gym workout', 'weight training', 'fitness equipment', 'gym interior modern', 'personal trainer'],
  'salao-beleza': ['hair salon', 'beauty salon interior', 'hairstylist working', 'makeup studio', 'manicure spa'],
  barbearia: ['barbershop', 'barber cutting hair', 'modern barbershop interior', 'men haircut', 'barber tools'],
  oficina: ['car mechanic workshop', 'auto repair shop', 'mechanic working car', 'garage tools', 'car service'],
  loja: ['retail store interior', 'shop shelves', 'boutique store', 'shopping store front', 'small business shop'],
  imobiliaria: ['modern house exterior', 'luxury apartment interior', 'real estate architecture', 'house for sale', 'modern living room'],
  hotel: ['hotel lobby', 'hotel room interior', 'hotel exterior building', 'hotel reception', 'luxury hotel suite'],
  pousada: ['countryside inn', 'cozy guesthouse', 'garden lodge', 'bed and breakfast', 'nature retreat house'],
  construcao: ['construction site', 'building construction', 'architecture engineering', 'construction worker', 'building project'],
  escritorio: ['office workspace', 'business meeting office', 'modern office interior', 'consulting team', 'corporate office'],
  escola: ['classroom students', 'school building', 'teacher classroom', 'students studying', 'education learning'],
  eventos: ['event decoration', 'wedding party celebration', 'banquet hall event', 'party celebration', 'event catering table'],
  outro: ['modern business', 'professional team', 'office building', 'business meeting'],
};

export function queriesForSegment(segment: SegmentId): string[] {
  return SEGMENT_IMAGE_QUERIES[segment] ?? SEGMENT_IMAGE_QUERIES.outro;
}
