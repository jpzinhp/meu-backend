import type { SegmentId, SiteImage } from '../types';
import { segmentIcon } from './icons';

function toDataUri(svg: string): string {
  const encoded = Buffer.from(svg, 'utf-8').toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}

function shade(hex: string, amount: number): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Gera, sem qualquer chamada externa, uma ilustração de referência (SVG em
 * data URI) para uma seção do site — usada sempre que não há uma foto real
 * da empresa nem um banco de imagens (Pexels) configurado. Nunca finge ser
 * uma fotografia real: é uma composição gráfica limpa no estilo/segmento e
 * nas cores do site.
 */
export function generatePlaceholderImage(
  segment: SegmentId,
  colorFrom: string,
  index = 0,
  width = 1200,
  height = 800,
): SiteImage {
  const angle = 135 + index * 12;
  const colorTo = shade(colorFrom, index % 2 === 0 ? -30 : 30);
  const icon = segmentIcon(segment);
  const gridId = `grid-${index}`;
  const gradId = `grad-${index}-${colorFrom.replace('#', '')}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="${gradId}" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${colorFrom}"/>
        <stop offset="100%" stop-color="${colorTo}"/>
      </linearGradient>
      <pattern id="${gridId}" width="56" height="56" patternUnits="userSpaceOnUse">
        <circle cx="28" cy="28" r="1.4" fill="#ffffff" fill-opacity="0.16"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#${gradId})"/>
    <rect width="${width}" height="${height}" fill="url(#${gridId})"/>
    <g transform="translate(${width / 2}, ${height / 2 - 10})">
      <circle r="92" fill="#ffffff" fill-opacity="0.14"/>
      <circle r="70" fill="#ffffff" fill-opacity="0.16"/>
      <g transform="translate(-36,-36) scale(3)" stroke="#ffffff" stroke-width="1.15" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="${icon}"/>
      </g>
    </g>
  </svg>`;

  return {
    url: toDataUri(svg),
    alt: 'Ilustração de referência gerada automaticamente',
    isReference: true,
    source: 'Ilustração gerada (sem banco de imagens configurado)',
  };
}
