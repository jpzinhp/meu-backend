import { MapPin, MessageCircle } from 'lucide-react';
import { BRAND_NAME, WHATSAPP_DISPLAY, buildWhatsappOrderLink, BURGERS } from '@/lib/brasa-burger/burgers';

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-burger-focus';

/** Rodapé simples: identidade, contato e crédito de ano — fecha a página. */
export function Footer() {
  const year = new Date().getFullYear();
  const orderLink = buildWhatsappOrderLink(BURGERS[0]);

  return (
    <footer className="border-t border-burger-brown-light/40 bg-burger-brown-dark px-4 py-10 text-white sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/95">
            {BRAND_NAME}
          </p>
          <p className="mt-1 text-xs text-white/60">
            Hambúrgueres artesanais grelhados na brasa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/75">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            Entrega em toda a região
          </span>
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 transition-colors hover:text-white ${focusRing}`}
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-5xl text-[11px] text-white/40">
        © {year} {BRAND_NAME}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
