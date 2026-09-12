/**
 * Monta um link do Google Maps a partir de um endereço real. Nunca inventa
 * um endereço — se não houver endereço, retorna null e a seção de
 * localização não deve ser exibida.
 */
export function buildMapsLink(address: string | undefined): string | null {
  if (!address || !address.trim()) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function buildMapsEmbedLink(address: string | undefined): string | null {
  if (!address || !address.trim()) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
