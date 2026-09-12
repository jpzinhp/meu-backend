// Tipos de domínio compartilhados por toda a aplicação SitePro AI.

export type SegmentId =
  | 'restaurante'
  | 'pizzaria'
  | 'clinica'
  | 'academia'
  | 'salao-beleza'
  | 'barbearia'
  | 'oficina'
  | 'loja'
  | 'imobiliaria'
  | 'hotel'
  | 'pousada'
  | 'construcao'
  | 'escritorio'
  | 'escola'
  | 'eventos'
  | 'outro';

export interface SegmentInfo {
  id: SegmentId;
  label: string;
  searchTerms: string[];
}

export type DigitalPresenceLevel = 'muito-baixa' | 'baixa' | 'media' | 'boa';
export type WebsiteStatus = 'sem-site' | 'com-site' | 'desconhecido';

/** Resultado de busca — uma empresa encontrada nas fontes de descoberta. */
export interface Company {
  id: string;
  name: string;
  segment: SegmentId;
  segmentLabel: string;
  city: string;
  state: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  hasWebsite: boolean;
  websiteStatus: WebsiteStatus;
  rating?: number;
  ratingCount?: number;
  openingHours?: string[];
  photos: string[];
  source: string;
  sourceUrl?: string;
  lat?: number;
  lng?: number;
  /** true quando o registro veio de uma fonte real configurada pelo usuário. */
  isDemo: boolean;
  digitalPresence: DigitalPresenceLevel;
  opportunityScore: number;
  opportunityReason: string;
  createdAt: string;
}

export type OpportunityStatus =
  | 'encontrada'
  | 'analisada'
  | 'site-gerado'
  | 'proposta-criada'
  | 'enviada'
  | 'cliente-interessado'
  | 'site-publicado';

export interface OpportunityNote {
  id: string;
  text: string;
  createdAt: string;
}

/** Registro do CRM — uma empresa que entrou no funil de prospecção do usuário. */
export interface Opportunity {
  id: string;
  company: Company;
  status: OpportunityStatus;
  notes: OpportunityNote[];
  contactDate?: string;
  siteId?: string;
  proposalId?: string;
  createdAt: string;
  updatedAt: string;
}

export type SitePlan = 'basico' | 'profissional' | 'premium';

export interface SiteTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontHeading: string;
  fontBody: string;
  style: 'premium' | 'energetico' | 'clean' | 'sofisticado' | 'classico' | 'moderno';
  logoInitial: string;
  logoIsReal: boolean;
}

export interface SiteImage {
  url: string;
  alt: string;
  isReference: boolean;
  photographer?: string;
  sourceUrl?: string;
  source: string;
}

export type SiteSectionType =
  | 'hero'
  | 'sobre'
  | 'servicos'
  | 'cardapio'
  | 'especialidades'
  | 'equipe'
  | 'estrutura'
  | 'imoveis'
  | 'diferenciais'
  | 'galeria'
  | 'avaliacoes'
  | 'depoimentos'
  | 'localizacao'
  | 'agendamento'
  | 'contato';

export interface ServiceItem {
  name: string;
  description: string;
  price?: string;
  image?: SiteImage;
}

export interface TestimonialItem {
  author: string;
  text: string;
  rating: number;
}

export interface SiteSection {
  type: SiteSectionType;
  title: string;
  subtitle?: string;
  body?: string;
  items?: ServiceItem[];
  testimonials?: TestimonialItem[];
  images?: SiteImage[];
}

export interface SiteContent {
  companyName: string;
  tagline: string;
  description: string;
  segment: SegmentId;
  segmentLabel: string;
  phone?: string;
  whatsapp?: string;
  whatsappMessage?: string;
  whatsappLink?: string;
  address?: string;
  mapsLink?: string;
  instagram?: string;
  facebook?: string;
  openingHours?: string[];
  rating?: number;
  ratingCount?: number;
  sections: SiteSection[];
}

export interface GeneratedSite {
  id: string;
  companyId: string;
  opportunityId?: string;
  plan: SitePlan;
  theme: SiteTheme;
  content: SiteContent;
  status: 'rascunho' | 'publicado';
  publishedAt?: string;
  publicSlug?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  siteId: string;
  companyId: string;
  shareId: string;
  createdAt: string;
  viewCount: number;
}

export interface IntegrationStatus {
  discoveryConfigured: boolean;
  discoveryProvider: string;
  imagesConfigured: boolean;
  aiConfigured: boolean;
  databaseConfigured: boolean;
  databaseProvider: string;
}
