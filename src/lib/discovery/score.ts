import type { Company, DigitalPresenceLevel } from '../types';

type ScoreInput = Pick<
  Company,
  'hasWebsite' | 'rating' | 'ratingCount' | 'phone' | 'instagram' | 'facebook' | 'address' | 'photos'
>;

/**
 * Calcula a "Oportunidade de site" (0-100) e o nível de presença digital de
 * uma empresa. Quanto mais presença comercial/social a empresa tem — mas sem
 * website próprio — maior a oportunidade de propor um site profissional.
 */
export function calculateOpportunity(input: ScoreInput): {
  score: number;
  digitalPresence: DigitalPresenceLevel;
  reason: string;
} {
  let presenceScore = 0;
  const strengths: string[] = [];

  if (input.address) {
    presenceScore += 15;
    strengths.push('endereço comercial completo');
  }
  if (input.phone) {
    presenceScore += 15;
    strengths.push('telefone de contato público');
  }
  if (input.instagram) {
    presenceScore += 15;
    strengths.push('Instagram ativo');
  }
  if (input.facebook) {
    presenceScore += 10;
    strengths.push('página no Facebook');
  }
  if (input.ratingCount && input.ratingCount > 0) {
    const reviewBoost = Math.min(20, Math.round(Math.log10(input.ratingCount + 1) * 12));
    presenceScore += reviewBoost;
    strengths.push(`${input.ratingCount} avaliações públicas`);
  }
  if (input.rating && input.rating >= 4) {
    presenceScore += 15;
    strengths.push(`nota ${input.rating.toFixed(1)} de avaliação`);
  } else if (input.rating && input.rating >= 3) {
    presenceScore += 8;
  }
  if (input.photos && input.photos.length > 0) {
    presenceScore += 10;
    strengths.push('fotos públicas disponíveis');
  }

  presenceScore = Math.min(100, presenceScore);

  let digitalPresence: DigitalPresenceLevel = 'muito-baixa';
  if (presenceScore >= 70) digitalPresence = 'boa';
  else if (presenceScore >= 45) digitalPresence = 'media';
  else if (presenceScore >= 20) digitalPresence = 'baixa';

  // A oportunidade é alta quando há boa presença COMERCIAL, mas nenhum site
  // próprio. Se a empresa já tem site, a oportunidade cai bastante (ainda
  // pode fazer sentido propor uma reforma, mas não é o foco do produto).
  let score = presenceScore;
  if (input.hasWebsite) {
    score = Math.round(score * 0.25);
  } else {
    score = Math.min(100, score + 10);
  }

  let reason: string;
  if (input.hasWebsite) {
    reason =
      'Esta empresa já possui um site. A oportunidade de uma nova proposta é baixa, mas pode valer uma reformulação caso o site atual esteja desatualizado.';
  } else if (strengths.length === 0) {
    reason =
      'Poucas informações públicas foram encontradas sobre esta empresa. Pode ser uma boa oportunidade, mas vale confirmar os dados antes de criar a proposta.';
  } else {
    const strengthsText = joinWithE(strengths.slice(0, 3));
    reason = `Esta empresa possui ${strengthsText}, mas não possui um website profissional próprio. Isso indica uma oportunidade de apresentar uma proposta de site.`;
  }

  return { score, digitalPresence, reason };
}

function joinWithE(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;
}

export function opportunityLabel(score: number): string {
  if (score >= 85) return 'Excelente oportunidade';
  if (score >= 65) return 'Boa oportunidade';
  if (score >= 40) return 'Oportunidade moderada';
  return 'Oportunidade baixa';
}
