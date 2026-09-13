'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  BRAND_KICKER,
  BRAND_NAME,
  BRAND_TAGLINE,
  BRAND_TAGLINE_SHORT,
  BURGERS,
  HERO_HEADLINE,
  buildWhatsappOrderLink,
} from '@/lib/brasa-burger/burgers';
import { BurgerCarousel } from './BurgerCarousel';
import { DecorativeElements } from './DecorativeElements';
import { DeliveryStrip } from './DeliveryStrip';
import { GrainOverlay } from './GrainOverlay';
import { NavigationButtons } from './NavigationButtons';
import { OfferBadge } from './OfferBadge';

const ANIMATION_LOCK_MS = 650;
const MOBILE_BREAKPOINT = 640;

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-burger-focus';

// Sombra suave para manter o texto branco legível mesmo quando sobrepõe o
// hambúrguer/foto de fundo, sem precisar de uma faixa sólida atrás dele.
const textShadow = { textShadow: '0 2px 14px rgba(26,10,2,0.5)' };

/**
 * Hero de viewport completo da Brasa Burger: fundo dinâmico, tipografia
 * fantasma gigante, carrossel de 4 produtos com troca cinematográfica e
 * toda a interface de pedido/navegação por cima.
 */
export function BurgerHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Precarrega as 4 imagens do carrossel para evitar flashes na troca.
  useEffect(() => {
    BURGERS.forEach((burger) => {
      const img = new Image();
      img.src = burger.image;
    });
  }, []);

  // isMobile via largura da viewport, atualizado no resize.
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Limpa o timeout do lock de animação ao desmontar.
  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    setIsAnimating((currentlyAnimating) => {
      if (currentlyAnimating) return currentlyAnimating;

      setActiveIndex((prev) =>
        direction === 'next'
          ? (prev + 1) % BURGERS.length
          : (prev + BURGERS.length - 1) % BURGERS.length
      );

      lockTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_LOCK_MS);

      return true;
    });
  }, []);

  const activeBurger = BURGERS[activeIndex];
  const orderLink = buildWhatsappOrderLink(activeBurger);

  return (
    <section
      className="relative h-svh min-h-[600px] w-full overflow-hidden"
      style={{
        backgroundColor: activeBurger.bg,
        transition: `background-color ${ANIMATION_LOCK_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* z-1: fundo animado (cor dinâmica + textura fotográfica sutil + degradês) */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage: 'url(/brasa-burger/hero-texture.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            filter: 'blur(6px) saturate(0.85)',
            transform: 'scale(1.08)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 95% at 50% 100%, rgba(20,8,2,0.46), transparent 66%)',
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-[650ms]"
          style={{ background: `linear-gradient(180deg, ${activeBurger.panel}4D, transparent 42%)` }}
        />
      </div>

      {/* z-2: tipografia fantasma gigante, atrás dos hambúrgueres */}
      <div
        className="pointer-events-none absolute inset-x-0 z-[2] flex select-none justify-center"
        style={{ top: '13%' }}
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap font-display uppercase"
          style={{
            fontSize: 'clamp(100px, 28vw, 380px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#FFF9F0',
            opacity: 0.16,
          }}
        >
          BURGER
        </span>
      </div>

      {/* z-60: marca no canto superior esquerdo */}
      <div className="absolute left-4 top-5 z-[60] animate-rise-in sm:left-8 sm:top-6">
        <span
          className="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
          style={textShadow}
        >
          {BRAND_NAME}
        </span>
      </div>

      {/* z-60: navegação mínima + CTA no topo (desktop/tablet) */}
      <nav className="absolute right-4 top-5 z-[60] hidden items-center gap-5 sm:flex sm:right-8 sm:top-6 md:gap-7">
        <a
          href="#cardapio"
          className={`text-[11px] font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white md:text-xs ${focusRing}`}
        >
          Cardápio
        </a>
        <a
          href="#delivery"
          className={`text-[11px] font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white md:text-xs ${focusRing}`}
        >
          Contato
        </a>
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full border-2 border-white px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10 ${focusRing}`}
        >
          Pedir agora
        </a>
      </nav>

      {/* z-60: chamada principal (kicker + headline) — some no mobile para não poluir */}
      <div
        className="absolute left-4 top-24 z-[55] hidden max-w-[260px] animate-rise-in sm:block sm:left-8 sm:top-28 md:left-24 md:top-32 md:max-w-xs"
        style={{ animationDelay: '90ms' }}
      >
        <p
          className="font-script text-2xl leading-none text-burger-gold sm:text-3xl"
          style={textShadow}
        >
          {BRAND_KICKER}
        </p>
        <h1
          className="mt-1 font-display uppercase leading-[0.92] tracking-tight text-white"
          style={{ fontSize: 'clamp(28px, 4.2vw, 50px)', ...textShadow }}
        >
          {HERO_HEADLINE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
      </div>

      {/* z-3 a z-20: carrossel de hambúrgueres */}
      <BurgerCarousel burgers={BURGERS} activeIndex={activeIndex} isMobile={isMobile} />

      {/* z-40: grafismos decorativos */}
      <DecorativeElements />

      {/* z-60: card de oferta */}
      <OfferBadge burger={activeBurger} />

      {/* z-60: bloco inferior esquerdo — marca, descrição, entrega e navegação */}
      <div
        className="absolute bottom-5 left-4 z-[60] max-w-[240px] animate-rise-in sm:bottom-16 sm:left-8 sm:max-w-[320px] md:left-24"
        style={{ animationDelay: '180ms' }}
      >
        <p
          className="mb-4 text-sm leading-snug text-white/90 sm:hidden"
          style={textShadow}
        >
          {BRAND_TAGLINE_SHORT}
        </p>
        <p
          className="mb-5 hidden max-w-[280px] text-sm leading-relaxed text-white/85 sm:block"
          style={textShadow}
        >
          {BRAND_TAGLINE}
        </p>
        <div className="mb-3 hidden sm:block" id="delivery">
          <DeliveryStrip />
        </div>
        <NavigationButtons
          onPrev={() => navigate('prev')}
          onNext={() => navigate('next')}
          disabled={isAnimating}
        />
        <div className="mt-3 sm:hidden">
          <DeliveryStrip />
        </div>
      </div>

      {/* z-60: CTA "Pedir agora" no canto inferior direito */}
      <a
        href={orderLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`group absolute bottom-5 right-4 z-[60] flex animate-rise-in items-center gap-2 font-display uppercase text-white opacity-95 transition-opacity duration-200 hover:opacity-100 sm:bottom-16 sm:right-8 md:right-10 ${focusRing}`}
        style={{
          fontSize: 'clamp(20px, 4vw, 56px)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          animationDelay: '260ms',
          ...textShadow,
        }}
      >
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          Pedir agora
        </span>
        <ArrowRight
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 sm:h-8 sm:w-8"
          strokeWidth={2.25}
        />
      </a>

      {/* z-50: grain */}
      <GrainOverlay />
    </section>
  );
}
