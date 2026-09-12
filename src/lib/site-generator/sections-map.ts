import type { SegmentId, SiteSectionType } from '../types';

/**
 * Estrutura de seções que a IA escolhe automaticamente para cada segmento.
 * O botão WhatsApp e o link do mapa não são "seções" — aparecem dentro das
 * seções de contato/localização e como botão flutuante.
 */
export const SEGMENT_SECTIONS: Record<SegmentId, SiteSectionType[]> = {
  restaurante: ['hero', 'sobre', 'cardapio', 'especialidades', 'galeria', 'avaliacoes', 'localizacao', 'contato'],
  pizzaria: ['hero', 'sobre', 'cardapio', 'especialidades', 'galeria', 'avaliacoes', 'localizacao', 'contato'],
  clinica: ['hero', 'especialidades', 'servicos', 'equipe', 'estrutura', 'depoimentos', 'localizacao', 'agendamento', 'contato'],
  academia: ['hero', 'servicos', 'especialidades', 'galeria', 'depoimentos', 'localizacao', 'contato'],
  'salao-beleza': ['hero', 'servicos', 'galeria', 'sobre', 'depoimentos', 'localizacao', 'agendamento', 'contato'],
  barbearia: ['hero', 'servicos', 'galeria', 'sobre', 'avaliacoes', 'localizacao', 'agendamento', 'contato'],
  oficina: ['hero', 'servicos', 'sobre', 'diferenciais', 'avaliacoes', 'localizacao', 'contato'],
  loja: ['hero', 'servicos', 'sobre', 'galeria', 'avaliacoes', 'localizacao', 'contato'],
  imobiliaria: ['hero', 'imoveis', 'servicos', 'sobre', 'diferenciais', 'depoimentos', 'contato'],
  hotel: ['hero', 'estrutura', 'servicos', 'galeria', 'depoimentos', 'localizacao', 'contato'],
  pousada: ['hero', 'estrutura', 'servicos', 'galeria', 'depoimentos', 'localizacao', 'contato'],
  construcao: ['hero', 'servicos', 'sobre', 'diferenciais', 'galeria', 'depoimentos', 'contato'],
  escritorio: ['hero', 'servicos', 'sobre', 'equipe', 'diferenciais', 'depoimentos', 'contato'],
  escola: ['hero', 'sobre', 'servicos', 'estrutura', 'depoimentos', 'localizacao', 'contato'],
  eventos: ['hero', 'servicos', 'galeria', 'diferenciais', 'depoimentos', 'localizacao', 'contato'],
  outro: ['hero', 'sobre', 'servicos', 'galeria', 'depoimentos', 'localizacao', 'contato'],
};

export const SECTION_LABELS: Record<SiteSectionType, string> = {
  hero: 'Início',
  sobre: 'Sobre',
  servicos: 'Serviços',
  cardapio: 'Cardápio',
  especialidades: 'Especialidades',
  equipe: 'Equipe',
  estrutura: 'Estrutura',
  imoveis: 'Imóveis',
  diferenciais: 'Diferenciais',
  galeria: 'Galeria',
  avaliacoes: 'Avaliações',
  depoimentos: 'Depoimentos',
  localizacao: 'Onde estamos',
  agendamento: 'Agendamento',
  contato: 'Contato',
};
