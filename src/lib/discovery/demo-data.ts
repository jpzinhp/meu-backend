import type { SegmentId } from '../types';

export const NEIGHBORHOODS = [
  'Centro',
  'Jardim das Flores',
  'Vila Nova',
  'Boa Vista',
  'Santa Cruz',
  'Parque das Águas',
  'Alto da Serra',
  'Jardim América',
  'Bela Vista',
  'São José',
];

export const STREETS = [
  'Rua das Palmeiras',
  'Av. Brasil',
  'Rua Sete de Setembro',
  'Av. Getúlio Vargas',
  'Rua das Acácias',
  'Rua XV de Novembro',
  'Av. Beira Mar',
  'Rua do Comércio',
  'Rua Barão do Rio Branco',
  'Av. Paulista',
];

interface NameParts {
  prefixes: string[];
  cores: string[];
  suffixes: string[];
}

export const SEGMENT_NAME_PARTS: Record<SegmentId, NameParts> = {
  restaurante: {
    prefixes: ['Sabor', 'Recanto', 'Cantina', 'Point', 'Fogo de Chão', 'Casa'],
    cores: ['do Chef', 'da Vila', 'Mineiro', 'Caseiro', 'Gourmet', 'da Serra', 'Bom Sabor'],
    suffixes: ['Restaurante', ''],
  },
  pizzaria: {
    prefixes: ['Pizzaria', 'Forno', 'Cantina'],
    cores: ['Bella Napoli', 'do Zé', 'da Vila', 'Sabor Italiano', 'Fornalha', 'Toscana'],
    suffixes: ['', 'Pizzas'],
  },
  clinica: {
    prefixes: ['Clínica', 'Centro Médico', 'Instituto'],
    cores: ['Vida', 'Bem Estar', 'Saúde Total', 'São Lucas', 'Nova Saúde', 'Cuidar'],
    suffixes: ['', 'Saúde'],
  },
  academia: {
    prefixes: ['Academia', 'Studio Fit', 'Box'],
    cores: ['Fórmula', 'PowerFit', 'Evolution', 'Energia', 'Corpo em Forma', 'Top Fit'],
    suffixes: ['', 'Academia'],
  },
  'salao-beleza': {
    prefixes: ['Salão', 'Studio de Beleza', 'Espaço'],
    cores: ['Elegance', 'Charme', 'Bella', 'Estilo', 'Glamour', 'Divas'],
    suffixes: ['', 'Beleza'],
  },
  barbearia: {
    prefixes: ['Barbearia', 'Barber Shop'],
    cores: ['do Seu Zé', 'Old School', 'Vintage', 'Império', 'Navalha de Ouro', 'Estilo'],
    suffixes: ['', ''],
  },
  oficina: {
    prefixes: ['Oficina', 'Auto Center', 'Mecânica'],
    cores: ['do João', 'Confiança', 'Rápida', 'Central', 'Bom Motor', 'São Cristóvão'],
    suffixes: ['', 'Auto Peças'],
  },
  loja: {
    prefixes: ['Loja', 'Magazine', 'Comercial'],
    cores: ['Popular', 'do Povo', 'Bom Preço', 'Center', 'Variedades', 'Estilo'],
    suffixes: ['', ''],
  },
  imobiliaria: {
    prefixes: ['Imobiliária', 'Imóveis'],
    cores: ['Confiança', 'Prime', 'Nova Casa', 'Horizonte', 'Bela Vista', 'Central'],
    suffixes: ['', 'Imóveis'],
  },
  hotel: {
    prefixes: ['Hotel', 'Hotel Executivo'],
    cores: ['Central', 'Plaza', 'Bela Vista', 'Real', 'das Águas', 'Continental'],
    suffixes: ['', ''],
  },
  pousada: {
    prefixes: ['Pousada', 'Recanto'],
    cores: ['do Sol', 'Mar Azul', 'das Palmeiras', 'Tranquilidade', 'Vista Verde', 'do Vale'],
    suffixes: ['', ''],
  },
  construcao: {
    prefixes: ['Construtora', 'Engenharia'],
    cores: ['Sólida', 'Horizonte', 'Nova Era', 'Progresso', 'Alicerce', 'Vertical'],
    suffixes: ['', 'Construções'],
  },
  escritorio: {
    prefixes: ['Escritório', 'Consultoria'],
    cores: ['Associados', 'Contábil', 'Jurídica', 'Estratégia', 'Central', 'Premium'],
    suffixes: ['', ''],
  },
  escola: {
    prefixes: ['Escola', 'Colégio', 'Curso'],
    cores: ['Saber', 'Nova Geração', 'Aprender', 'Crescer', 'Horizonte', 'Educar'],
    suffixes: ['', ''],
  },
  eventos: {
    prefixes: ['Buffet', 'Cerimonial', 'Eventos'],
    cores: ['Elegance', 'Momento Especial', 'Sonho Real', 'Celebrar', 'Charme', 'Premium'],
    suffixes: ['', 'Eventos'],
  },
  outro: {
    prefixes: ['Empresa', 'Grupo'],
    cores: ['Central', 'Prime', 'Nova', 'Horizonte'],
    suffixes: ['', ''],
  },
};

export function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)];
}
