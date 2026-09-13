import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { buildWhatsappOrderLink, BURGERS } from '@/lib/brasa-burger/burgers';

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-burger-focus';

/**
 * Seção promocional logo abaixo do hero, usando a arte fotográfica real da
 * campanha (fornecida pela marca) em vez de um mockup genérico.
 */
export function PromoBanner() {
  const houseBurger = BURGERS[0];
  const orderLink = buildWhatsappOrderLink(houseBurger);

  return (
    <section id="cardapio" className="relative bg-burger-brown-dark py-14 sm:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 sm:grid-cols-2 sm:gap-12 sm:px-8">
        <div className="order-2 min-w-0 text-white sm:order-1">
          <p className="font-script text-xl leading-none text-burger-gold sm:text-2xl">
            direto da brasa
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
            O melhor
            <br /> hambúrguer da região
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
            Pão brioche, blend artesanal grelhado na brasa e ingredientes
            selecionados — montado na hora, do jeito que só a Brasa Burger faz.
          </p>
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex items-center gap-2 rounded-full bg-burger-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-burger-primary-light ${focusRing}`}
          >
            Pedir pelo WhatsApp
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        <div className="order-1 min-w-0 overflow-hidden rounded-3xl shadow-2xl sm:order-2">
          <Image
            src="/brasa-burger/promo-banner.jpg"
            alt="Campanha Brasa Burger: hambúrguer artesanal servido com o preço do combo da casa"
            width={1200}
            height={1500}
            className="h-full w-full object-cover"
            sizes="(min-width: 640px) 480px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
