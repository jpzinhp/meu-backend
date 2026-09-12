import type { SegmentId, SiteTheme } from '../types';

type Style = SiteTheme['style'];

const SEGMENT_STYLE: Record<SegmentId, Style> = {
  restaurante: 'premium',
  pizzaria: 'classico',
  clinica: 'clean',
  academia: 'energetico',
  'salao-beleza': 'sofisticado',
  barbearia: 'sofisticado',
  oficina: 'moderno',
  loja: 'moderno',
  imobiliaria: 'classico',
  hotel: 'premium',
  pousada: 'classico',
  construcao: 'moderno',
  escritorio: 'clean',
  escola: 'clean',
  eventos: 'sofisticado',
  outro: 'moderno',
};

interface Palette {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

const PALETTES: Record<Style, Palette[]> = {
  premium: [
    { primaryColor: '#1c1710', secondaryColor: '#8a6d3b', accentColor: '#c9a24b', textColor: '#221c14', backgroundColor: '#fdfbf7' },
    { primaryColor: '#231519', secondaryColor: '#7a2e3b', accentColor: '#d4a373', textColor: '#241417', backgroundColor: '#fdf8f6' },
  ],
  energetico: [
    { primaryColor: '#0f172a', secondaryColor: '#ef4444', accentColor: '#f59e0b', textColor: '#0f172a', backgroundColor: '#ffffff' },
    { primaryColor: '#111827', secondaryColor: '#f97316', accentColor: '#22c55e', textColor: '#111827', backgroundColor: '#fafafa' },
  ],
  clean: [
    { primaryColor: '#0f4c5c', secondaryColor: '#0e7490', accentColor: '#14b8a6', textColor: '#0f172a', backgroundColor: '#ffffff' },
    { primaryColor: '#1e3a5f', secondaryColor: '#2563eb', accentColor: '#38bdf8', textColor: '#0f172a', backgroundColor: '#f8fafc' },
  ],
  sofisticado: [
    { primaryColor: '#141414', secondaryColor: '#3a3a3a', accentColor: '#b08d57', textColor: '#171717', backgroundColor: '#f7f5f2' },
    { primaryColor: '#191919', secondaryColor: '#5c4033', accentColor: '#c2a878', textColor: '#1a1a1a', backgroundColor: '#faf7f2' },
  ],
  classico: [
    { primaryColor: '#1e3a2f', secondaryColor: '#3f6b52', accentColor: '#c9a24b', textColor: '#1c1c1c', backgroundColor: '#fbfaf6' },
    { primaryColor: '#233b5e', secondaryColor: '#3b5b8c', accentColor: '#d4af37', textColor: '#1a1a1a', backgroundColor: '#f9f9f7' },
  ],
  moderno: [
    { primaryColor: '#111827', secondaryColor: '#3a56f5', accentColor: '#22d3ee', textColor: '#111827', backgroundColor: '#ffffff' },
    { primaryColor: '#0b1120', secondaryColor: '#4f46e5', accentColor: '#f97316', textColor: '#0b1120', backgroundColor: '#f8fafc' },
  ],
};

export function buildTheme(segment: SegmentId, companyName: string, variantSeed = 0): SiteTheme {
  const style = SEGMENT_STYLE[segment] ?? 'moderno';
  const palettes = PALETTES[style];
  const palette = palettes[variantSeed % palettes.length];
  const initial = companyName.trim().charAt(0).toUpperCase() || 'S';

  return {
    ...palette,
    fontHeading: style === 'premium' || style === 'sofisticado' || style === 'classico' ? 'Playfair Display, serif' : 'Inter, sans-serif',
    fontBody: 'Inter, system-ui, sans-serif',
    style,
    logoInitial: initial,
    logoIsReal: false,
  };
}
