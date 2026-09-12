import type { SiteContent, SiteSection, SiteTheme } from '@/lib/types';
import { buildMapsEmbedLink } from '@/lib/maps';
import { Stars } from './Stars';

function readableOn(hex: string): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#111111' : '#ffffff';
}

export function GeneratedSitePreview({
  content,
  theme,
  mode = 'site',
}: {
  content: SiteContent;
  theme: SiteTheme;
  mode?: 'site' | 'proposal';
}) {
  const navSections = content.sections.filter((s) => s.type !== 'hero');

  return (
    <div
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, fontFamily: theme.fontBody }}
      className="min-h-screen"
    >
      <SiteHeader content={content} theme={theme} sections={navSections} />

      {content.sections.map((section, i) => (
        <SectionBlock key={`${section.type}-${i}`} section={section} theme={theme} content={content} />
      ))}

      <SiteFooter content={content} theme={theme} />

      {mode === 'site' && content.whatsappLink && (
        <a
          href={content.whatsappLink}
          target="_blank"
          rel="noreferrer"
          style={{ backgroundColor: '#25D366' }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          💬 Falar pelo WhatsApp
        </a>
      )}
    </div>
  );
}

function SiteHeader({
  content,
  theme,
  sections,
}: {
  content: SiteContent;
  theme: SiteTheme;
  sections: SiteSection[];
}) {
  const fg = readableOn(theme.primaryColor);
  return (
    <header
      style={{ backgroundColor: theme.primaryColor, color: fg }}
      className="sticky top-0 z-30 flex items-center justify-between gap-3 px-5 py-3 sm:px-10"
    >
      <div className="flex items-center gap-2 font-semibold" style={{ fontFamily: theme.fontHeading }}>
        <span
          style={{ backgroundColor: theme.accentColor, color: readableOn(theme.accentColor) }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
        >
          {theme.logoInitial}
        </span>
        <span className="truncate">{content.companyName}</span>
      </div>
      <nav className="hidden gap-4 text-sm md:flex">
        {sections.slice(0, 5).map((s, i) => (
          <a key={i} href={`#s-${s.type}`} className="opacity-90 transition-opacity hover:opacity-100">
            {s.title}
          </a>
        ))}
      </nav>
      {content.whatsappLink && (
        <a
          href={content.whatsappLink}
          target="_blank"
          rel="noreferrer"
          style={{ backgroundColor: theme.accentColor, color: readableOn(theme.accentColor) }}
          className="hidden shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold sm:inline-block"
        >
          Falar agora
        </a>
      )}
    </header>
  );
}

function SiteFooter({ content, theme }: { content: SiteContent; theme: SiteTheme }) {
  const fg = readableOn(theme.primaryColor);
  return (
    <footer style={{ backgroundColor: theme.primaryColor, color: fg }} className="px-5 py-8 text-sm sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center opacity-90">
        <p className="font-semibold">{content.companyName}</p>
        {content.address && <p>{content.address}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {content.phone && <span>{content.phone}</span>}
          {content.instagram && <span>{content.instagram}</span>}
          {content.facebook && <span>{content.facebook}</span>}
        </div>
        <p className="mt-2 text-xs opacity-70">Site gerado com SitePro AI</p>
      </div>
    </footer>
  );
}

function SectionBlock({
  section,
  theme,
  content,
}: {
  section: SiteSection;
  theme: SiteTheme;
  content: SiteContent;
}) {
  const anchorId = `s-${section.type}`;

  if (section.type === 'hero') {
    const image = section.images?.[0];
    const fg = '#ffffff';
    return (
      <section
        id={anchorId}
        className="relative flex min-h-[68vh] items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-10"
        style={{ backgroundColor: theme.primaryColor }}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt={image.alt} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.primaryColor}66, ${theme.primaryColor}cc)` }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 style={{ fontFamily: theme.fontHeading, color: fg }} className="text-3xl font-bold sm:text-5xl">
            {section.title}
          </h1>
          {section.subtitle && (
            <p style={{ color: fg }} className="mt-3 text-lg font-medium opacity-95 sm:text-xl">
              {section.subtitle}
            </p>
          )}
          {section.body && (
            <p style={{ color: fg }} className="mx-auto mt-4 max-w-xl text-sm opacity-90 sm:text-base">
              {section.body}
            </p>
          )}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {content.whatsappLink && (
              <a
                href={content.whatsappLink}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: theme.accentColor, color: readableOn(theme.accentColor) }}
                className="rounded-full px-6 py-3 text-sm font-semibold shadow-lg"
              >
                💬 Falar pelo WhatsApp
              </a>
            )}
            <a
              href="#s-contato"
              style={{ borderColor: fg, color: fg }}
              className="rounded-full border px-6 py-3 text-sm font-semibold"
            >
              Saiba mais
            </a>
          </div>
        </div>
      </section>
    );
  }

  const isAlt = ['sobre', 'equipe', 'localizacao', 'contato'].includes(section.type);
  const bg = isAlt ? shade(theme.backgroundColor, -4) : theme.backgroundColor;

  return (
    <section id={anchorId} className="px-5 py-14 sm:px-10 sm:py-20" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading section={section} theme={theme} />
        <SectionBody section={section} theme={theme} content={content} />
      </div>
    </section>
  );
}

function SectionHeading({ section, theme }: { section: SiteSection; theme: SiteTheme }) {
  return (
    <div className="mb-8 text-center">
      <h2 style={{ fontFamily: theme.fontHeading }} className="text-2xl font-bold sm:text-3xl">
        {section.title}
      </h2>
      {section.subtitle && <p className="mx-auto mt-2 max-w-2xl text-sm opacity-70">{section.subtitle}</p>}
    </div>
  );
}

function SectionBody({ section, theme, content }: { section: SiteSection; theme: SiteTheme; content: SiteContent }) {
  switch (section.type) {
    case 'sobre':
    case 'equipe':
    case 'estrutura':
      return (
        <div className="grid items-center gap-8 sm:grid-cols-2">
          {section.body && <p className="text-sm leading-relaxed opacity-85 sm:text-base">{section.body}</p>}
          <div className="grid grid-cols-2 gap-3">
            {(section.images ?? []).slice(0, 4).map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img.url} alt={img.alt} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
        </div>
      );

    case 'servicos':
    case 'cardapio':
    case 'especialidades':
    case 'imoveis':
      return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(section.items ?? []).map((item, i) => (
            <div key={i} className="overflow-hidden rounded-xl border" style={{ borderColor: shade(theme.backgroundColor, -12) }}>
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image.url} alt={item.image.alt} className="h-40 w-full object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.price && (
                    <span style={{ color: theme.secondaryColor }} className="shrink-0 text-sm font-bold">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && <p className="mt-1 text-sm opacity-75">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      );

    case 'diferenciais':
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(section.items ?? []).map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: shade(theme.backgroundColor, -12) }}>
              <span style={{ color: theme.accentColor }} className="text-lg">✓</span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      );

    case 'galeria':
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(section.images ?? []).map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={img.url} alt={img.alt} className="aspect-[4/3] w-full rounded-xl object-cover" />
          ))}
        </div>
      );

    case 'avaliacoes':
      return (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-4xl font-bold">{content.rating?.toFixed(1)}</span>
          <Stars rating={content.rating ?? 0} color={theme.accentColor} />
          <p className="text-sm opacity-70">{section.body}</p>
        </div>
      );

    case 'depoimentos':
      return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {(section.testimonials ?? []).map((t, i) => (
            <div key={i} className="rounded-xl border p-5 text-sm" style={{ borderColor: shade(theme.backgroundColor, -12) }}>
              <Stars rating={t.rating} color={theme.accentColor} />
              <p className="mt-3 opacity-85">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-3 text-xs font-semibold opacity-60">{t.author}</p>
            </div>
          ))}
        </div>
      );

    case 'localizacao': {
      const embed = buildMapsEmbedLink(content.address);
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm opacity-85">{section.body}</p>
            {content.mapsLink && (
              <a
                href={content.mapsLink}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: theme.secondaryColor, color: readableOn(theme.secondaryColor) }}
                className="mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Ver no Google Maps
              </a>
            )}
          </div>
          {embed && (
            <iframe
              src={embed}
              className="h-56 w-full rounded-xl border-0 sm:h-full"
              loading="lazy"
              title="Mapa de localização"
            />
          )}
        </div>
      );
    }

    case 'agendamento':
    case 'contato':
      return (
        <div className="flex flex-col items-center gap-4 text-center">
          {section.body && <p className="max-w-xl text-sm opacity-85">{section.body}</p>}
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
            {content.phone && <span>📞 {content.phone}</span>}
            {content.instagram && <span>📷 {content.instagram}</span>}
            {content.facebook && <span>👍 {content.facebook}</span>}
          </div>
          {content.whatsappLink && (
            <a
              href={content.whatsappLink}
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: theme.accentColor, color: readableOn(theme.accentColor) }}
              className="rounded-full px-6 py-3 text-sm font-semibold shadow-lg"
            >
              💬 Falar pelo WhatsApp
            </a>
          )}
        </div>
      );

    default:
      return section.body ? <p className="text-center text-sm opacity-80">{section.body}</p> : null;
  }
}

function shade(hex: string, amount: number): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
