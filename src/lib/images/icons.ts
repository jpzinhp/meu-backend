import type { SegmentId } from '../types';

// Ícones minimalistas (estilo outline, viewBox 0 0 24 24) usados nas
// ilustrações de referência geradas para cada segmento quando não há banco
// de imagens configurado.
export const SEGMENT_ICON_PATHS: Record<SegmentId, string> = {
  restaurante:
    'M7 2v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2M7 2v20M11 2v8M17 2c-1.7 0-3 2.2-3 5s1.3 5 3 5v10',
  pizzaria: 'M2 8 12 2l10 6-10 14L2 8Zm5.5 4.5h.01M12 10h.01M15.5 13.5h.01',
  clinica: 'M12 3v6M9 6h6M6 10h12l-1 8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2l-1-8Z',
  academia: 'M4 8v8M2 10v4M20 8v8M22 10v4M7 12h10M7 9v6M17 9v6',
  'salao-beleza': 'M6 4 20 18M6 18 20 4M9 11a3 3 0 1 1-4-4M9 13a3 3 0 1 1-4 4',
  barbearia: 'M6 4 20 18M6 18 20 4M9 11a3 3 0 1 1-4-4M9 13a3 3 0 1 1-4 4M14 11h6',
  oficina:
    'M14.7 6.3a4 4 0 0 1-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 1 5.4-5.4L21.7 6l-3-3-4 3.3Z',
  loja: 'M4 8 5.5 3h13L20 8M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8M4 8h16M9 12a3 3 0 0 0 6 0',
  imobiliaria: 'M3 11 12 3l9 8M5 10v10h14V10M9 20v-6h6v6',
  hotel: 'M3 20V6M3 12h16a2 2 0 0 1 2 2v6M3 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M7 8v0',
  pousada: 'M4 21V10L12 3l8 7v11M9 21v-6h6v6',
  construcao: 'M3 21h18M5 21V10l7-6 7 6v11M9 9h6M9 13h6M9 17h6',
  escritorio: 'M4 7h16v13H4V7Zm4 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 12h16',
  escola: 'M2 9 12 4l10 5-10 5-10-5Zm4 2.5V17c0 1.1 2.7 2 6 2s6-.9 6-2v-5.5',
  eventos: 'M20 12a8 8 0 1 0-15.4 3L3 19l4-1.5A8 8 0 0 0 20 12Z M8 12h8M12 8v8',
  outro: 'M12 2l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 17l-6.2 3.4 1.6-6.8L2.2 9l6.9-.7L12 2Z',
};

export function segmentIcon(segment: SegmentId): string {
  return SEGMENT_ICON_PATHS[segment] ?? SEGMENT_ICON_PATHS.outro;
}
