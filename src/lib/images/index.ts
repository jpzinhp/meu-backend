import type { SegmentId, SiteImage } from '../types';
import { isPexelsConfigured, searchPexelsImages } from './pexels';
import { generatePlaceholderImage } from './placeholder';
import { queriesForSegment } from './queries';

export { isPexelsConfigured } from './pexels';

/**
 * Retorna uma galeria de imagens de referência apropriadas ao segmento do
 * negócio. Usa o Pexels quando configurado (fotos reais licenciadas, com
 * atribuição); caso contrário, gera ilustrações vetoriais no estilo/cor do
 * site — nunca fotos inventadas como se fossem da empresa.
 */
export async function getSegmentImages(
  segment: SegmentId,
  count: number,
  themeColor: string,
): Promise<SiteImage[]> {
  const queries = queriesForSegment(segment);

  if (isPexelsConfigured()) {
    const results: SiteImage[] = [];
    for (let i = 0; i < queries.length && results.length < count; i++) {
      const found = await searchPexelsImages(queries[i], 2);
      results.push(...found);
    }
    if (results.length > 0) {
      return results.slice(0, count);
    }
  }

  return Array.from({ length: count }, (_, i) => generatePlaceholderImage(segment, themeColor, i));
}

export async function getHeroImage(segment: SegmentId, themeColor: string): Promise<SiteImage> {
  const [image] = await getSegmentImages(segment, 1, themeColor);
  return image;
}
