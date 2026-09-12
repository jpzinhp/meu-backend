import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  segment: z.string().min(1),
  segmentLabel: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  address: z.string().default(''),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  hasWebsite: z.boolean(),
  websiteStatus: z.enum(['sem-site', 'com-site', 'desconhecido']),
  rating: z.number().min(0).max(5).optional(),
  ratingCount: z.number().min(0).optional(),
  openingHours: z.array(z.string()).optional(),
  photos: z.array(z.string()).default([]),
  source: z.string().default('Desconhecido'),
  sourceUrl: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  isDemo: z.boolean().default(false),
  digitalPresence: z.enum(['muito-baixa', 'baixa', 'media', 'boa']),
  opportunityScore: z.number().min(0).max(100),
  opportunityReason: z.string().default(''),
  createdAt: z.string().default(() => new Date().toISOString()),
});

export const searchCompaniesSchema = z.object({
  location: z.string().trim().min(2, 'Informe uma cidade, estado ou região.').max(120),
  segmentQuery: z.string().trim().max(80).default(''),
  limit: z.number().int().min(1).max(30).optional(),
});

export const generateSiteSchema = z.object({
  company: companySchema,
  opportunityId: z.string().optional(),
  plan: z.enum(['basico', 'profissional', 'premium']).optional(),
});

export const regenerateSiteSchema = z.object({
  plan: z.enum(['basico', 'profissional', 'premium']).optional(),
});

const siteImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().default(''),
  isReference: z.boolean().default(true),
  photographer: z.string().optional(),
  sourceUrl: z.string().optional(),
  source: z.string().default(''),
});

const serviceItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string().optional(),
  image: siteImageSchema.optional(),
});

const testimonialSchema = z.object({
  author: z.string(),
  text: z.string(),
  rating: z.number().min(0).max(5),
});

const siteSectionSchema = z.object({
  type: z.enum([
    'hero',
    'sobre',
    'servicos',
    'cardapio',
    'especialidades',
    'equipe',
    'estrutura',
    'imoveis',
    'diferenciais',
    'galeria',
    'avaliacoes',
    'depoimentos',
    'localizacao',
    'agendamento',
    'contato',
  ]),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  items: z.array(serviceItemSchema).optional(),
  testimonials: z.array(testimonialSchema).optional(),
  images: z.array(siteImageSchema).optional(),
});

export const siteThemeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  textColor: z.string(),
  backgroundColor: z.string(),
  fontHeading: z.string(),
  fontBody: z.string(),
  style: z.enum(['premium', 'energetico', 'clean', 'sofisticado', 'classico', 'moderno']),
  logoInitial: z.string().max(2),
  logoIsReal: z.boolean(),
});

export const siteContentSchema = z.object({
  companyName: z.string().min(1).max(200),
  tagline: z.string().max(200),
  description: z.string().max(600),
  segment: z.string(),
  segmentLabel: z.string(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  whatsappMessage: z.string().optional(),
  whatsappLink: z.string().optional(),
  address: z.string().optional(),
  mapsLink: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  openingHours: z.array(z.string()).optional(),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
  sections: z.array(siteSectionSchema),
});

export const updateSiteSchema = z.object({
  theme: siteThemeSchema.partial().optional(),
  content: siteContentSchema.partial().optional(),
});

export const opportunityStatusSchema = z.enum([
  'encontrada',
  'analisada',
  'site-gerado',
  'proposta-criada',
  'enviada',
  'cliente-interessado',
  'site-publicado',
]);

export const updateOpportunitySchema = z.object({
  status: opportunityStatusSchema.optional(),
  contactDate: z.string().optional(),
  addNote: z.string().min(1).max(1000).optional(),
});

export const createProposalSchema = z.object({
  siteId: z.string().min(1),
  opportunityId: z.string().optional(),
});
