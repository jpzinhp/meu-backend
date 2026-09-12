import type {
  Company,
  GeneratedSite,
  ServiceItem,
  SiteContent,
  SiteImage,
  SitePlan,
  SiteSection,
  SiteSectionType,
  TestimonialItem,
} from '../types';
import { newId } from '../id';
import { getSegmentImages } from '../images';
import { buildMapsLink } from '../maps';
import { buildWhatsAppLink, defaultWhatsAppMessage } from '../whatsapp';
import { SEGMENT_COPY } from './copy-data';
import { SEGMENT_SECTIONS, SECTION_LABELS } from './sections-map';
import { buildTheme } from './theme';

const GENERIC_TESTIMONIALS: TestimonialItem[] = [
  { author: 'Cliente satisfeito', text: 'Atendimento excelente e resultado acima do esperado. Recomendo!', rating: 5 },
  { author: 'Cliente fiel', text: 'Já uso os serviços há um tempo e sempre saio satisfeito(a).', rating: 5 },
  { author: 'Cliente recorrente', text: 'Profissionalismo do início ao fim. Voltarei sempre.', rating: 5 },
];

function itemsPerPlan(plan: SitePlan, base: ServiceItem[]): ServiceItem[] {
  if (plan === 'basico') return base.slice(0, Math.max(2, Math.ceil(base.length / 2)));
  return base;
}

function imageCountForPlan(plan: SitePlan): number {
  if (plan === 'basico') return 3;
  if (plan === 'profissional') return 6;
  return 8;
}

export interface GenerateSiteOptions {
  plan?: SitePlan;
  /** Muda a variação de cores/textos — usado por "Regenerar site". */
  variantSeed?: number;
  existingSiteId?: string;
  existingVersion?: number;
}

export async function generateSiteForCompany(
  company: Company,
  options: GenerateSiteOptions = {},
): Promise<GeneratedSite> {
  const plan = options.plan ?? 'profissional';
  const variantSeed = options.variantSeed ?? 0;

  const theme = buildTheme(company.segment, company.name, variantSeed);
  const copy = SEGMENT_COPY[company.segment];
  const tagline = copy.taglines[variantSeed % copy.taglines.length];
  const description = copy.descriptions[variantSeed % copy.descriptions.length];
  const whatsappMessage = defaultWhatsAppMessage(company.name);
  const whatsappLink = buildWhatsAppLink(company.whatsapp || company.phone, whatsappMessage);
  const mapsLink = buildMapsLink(company.address);

  const imagePool = await getSegmentImages(company.segment, imageCountForPlan(plan), theme.primaryColor);
  let imageCursor = 0;
  const nextImage = (): SiteImage => imagePool[imageCursor++ % imagePool.length];

  const sectionTypes = SEGMENT_SECTIONS[company.segment];
  const sections: SiteSection[] = [];

  for (const type of sectionTypes) {
    const section = buildSection(type, {
      company,
      plan,
      copy,
      tagline,
      description,
      nextImage,
      hasImages: imagePool.length > 0,
    });
    if (section) sections.push(section);
  }

  const content: SiteContent = {
    companyName: company.name,
    tagline,
    description,
    segment: company.segment,
    segmentLabel: company.segmentLabel,
    phone: company.phone,
    whatsapp: company.whatsapp || company.phone,
    whatsappMessage,
    whatsappLink: whatsappLink ?? undefined,
    address: company.address,
    mapsLink: mapsLink ?? undefined,
    instagram: company.instagram,
    facebook: company.facebook,
    openingHours: company.openingHours,
    rating: company.rating,
    ratingCount: company.ratingCount,
    sections,
  };

  const now = new Date().toISOString();

  return {
    id: options.existingSiteId ?? newId('site'),
    companyId: company.id,
    plan,
    theme,
    content,
    status: 'rascunho',
    version: (options.existingVersion ?? 0) + 1,
    createdAt: now,
    updatedAt: now,
  };
}

interface SectionBuildContext {
  company: Company;
  plan: SitePlan;
  copy: (typeof SEGMENT_COPY)[keyof typeof SEGMENT_COPY];
  tagline: string;
  description: string;
  nextImage: () => SiteImage;
  hasImages: boolean;
}

function buildSection(type: SiteSectionType, ctx: SectionBuildContext): SiteSection | null {
  const { company, plan, copy, tagline, description, nextImage } = ctx;
  const label = SECTION_LABELS[type];

  switch (type) {
    case 'hero':
      return {
        type,
        title: company.name,
        subtitle: tagline,
        body: description,
        images: [nextImage()],
      };

    case 'sobre':
      return {
        type,
        title: `Sobre a ${company.name}`,
        body: copy.aboutBody[0],
        images: [nextImage()],
      };

    case 'cardapio':
    case 'especialidades':
    case 'servicos':
      return {
        type,
        title: label,
        subtitle: type === 'servicos' ? 'Conheça o que preparamos para você' : undefined,
        items: itemsPerPlan(plan, copy.services).map((item) => ({ ...item, image: nextImage() })),
      };

    case 'equipe':
      return {
        type,
        title: 'Nossa equipe',
        body: 'Profissionais qualificados e comprometidos em oferecer o melhor atendimento em cada etapa.',
        images: [nextImage(), nextImage()],
      };

    case 'estrutura':
      return {
        type,
        title: 'Nossa estrutura',
        body: 'Um espaço pensado para o seu conforto, com estrutura completa para atender você da melhor forma.',
        images: [nextImage(), nextImage(), nextImage()],
      };

    case 'imoveis':
      return {
        type,
        title: 'Imóveis em destaque',
        subtitle: 'Exemplos de anúncio — substitua pelos imóveis reais disponíveis no editor.',
        items: [
          { name: 'Apartamento 2 quartos', description: 'Bairro central, próximo a comércio e transporte.', image: nextImage() },
          { name: 'Casa em condomínio', description: 'Área de lazer completa e segurança 24h.', image: nextImage() },
          { name: 'Sala comercial', description: 'Ótima localização para o seu negócio.', image: nextImage() },
        ],
      };

    case 'diferenciais':
      return {
        type,
        title: 'Por que nos escolher',
        items: copy.differentiators.map((d) => ({ name: d, description: '' })),
      };

    case 'galeria':
      return {
        type,
        title: 'Galeria',
        images: Array.from({ length: ctx.hasImages ? Math.min(6, 6) : 0 }, () => nextImage()),
      };

    case 'avaliacoes': {
      if (!company.rating) return null;
      return {
        type,
        title: 'Avaliações',
        subtitle: `${company.rating.toFixed(1)} de 5 · ${company.ratingCount ?? 0} avaliações públicas`,
        body: 'Nota calculada a partir de avaliações públicas dos clientes.',
      };
    }

    case 'depoimentos':
      return {
        type,
        title: 'O que dizem sobre nós',
        subtitle: 'Depoimentos de exemplo — substitua por avaliações reais dos seus clientes no editor.',
        testimonials: GENERIC_TESTIMONIALS,
      };

    case 'localizacao': {
      if (!company.address) return null;
      return {
        type,
        title: 'Onde estamos',
        body: company.address,
      };
    }

    case 'agendamento':
      return {
        type,
        title: 'Agende seu horário',
        body: 'Fale com a gente pelo WhatsApp e garanta o melhor horário para você.',
      };

    case 'contato':
      return {
        type,
        title: 'Contato',
        body: 'Estamos à disposição para atender você.',
      };

    default:
      return null;
  }
}
