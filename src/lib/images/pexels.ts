import type { SiteImage } from '../types';

const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search';

interface PexelsPhoto {
  src: { large: string; medium: string };
  photographer: string;
  url: string;
}

export function isPexelsConfigured(): boolean {
  return Boolean(process.env.PEXELS_API_KEY);
}

/**
 * Busca fotos de referência licenciadas no Pexels (banco de imagens
 * gratuito e com API oficial). Retorna sempre com atribuição de
 * fotógrafo/origem, marcadas como imagem de referência — nunca como foto
 * real da empresa.
 */
export async function searchPexelsImages(query: string, count = 4): Promise<SiteImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return [];

  const url = new URL(PEXELS_SEARCH_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(Math.min(20, Math.max(1, count))));
  url.searchParams.set('orientation', 'landscape');

  try {
    const response = await fetch(url, {
      headers: { Authorization: apiKey },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = (await response.json()) as { photos?: PexelsPhoto[] };
    return (data.photos ?? []).map((p) => ({
      url: p.src.large,
      alt: query,
      isReference: true,
      photographer: p.photographer,
      sourceUrl: p.url,
      source: 'Pexels',
    }));
  } catch {
    return [];
  }
}
