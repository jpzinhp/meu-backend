import type { Burger } from '@/lib/brasa-burger/burgers';

interface OfferBadgeProps {
  burger: Burger;
}

/**
 * Card promocional escuro (marrom) inspirado no bloco de preço da
 * referência — o segundo maior elemento visual depois do hambúrguer.
 */
export function OfferBadge({ burger }: OfferBadgeProps) {
  return (
    <div
      className="absolute right-4 top-16 z-[60] max-w-[150px] animate-rise-in
        rounded-xl border-2 border-burger-brown-light/70 bg-burger-brown-dark/90
        px-3 py-2.5 shadow-2xl backdrop-blur-sm
        sm:right-8 sm:top-24 sm:max-w-none
        sm:rounded-3xl sm:px-8 sm:py-6 md:right-10"
      style={{ animationDelay: '40ms' }}
    >
      <p
        className="hidden font-script text-lg leading-none text-burger-gold sm:block sm:text-2xl"
        aria-hidden="true"
      >
        sabor de verdade
      </p>
      <p className="font-display text-[11px] uppercase leading-tight tracking-wide text-white sm:mt-1 sm:text-lg">
        Hambúrguer
        <br className="hidden sm:block" /> da casa
      </p>
      <p
        key={burger.id}
        className="mt-0.5 animate-fade-slide-in font-display text-xl leading-none text-white sm:mt-3 sm:text-5xl md:text-6xl"
      >
        {burger.price}
      </p>
    </div>
  );
}
