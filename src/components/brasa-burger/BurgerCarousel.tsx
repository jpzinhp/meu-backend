import type { Burger } from '@/lib/brasa-burger/burgers';
import { BurgerCard } from './BurgerCard';

export type CarouselRole = 'center' | 'left' | 'right' | 'back';

interface BurgerCarouselProps {
  burgers: Burger[];
  activeIndex: number;
  isMobile: boolean;
}

function roleFor(index: number, activeIndex: number, length: number): CarouselRole {
  const left = (activeIndex + length - 1) % length;
  const right = (activeIndex + 1) % length;
  const back = (activeIndex + 2) % length;

  if (index === activeIndex) return 'center';
  if (index === left) return 'left';
  if (index === right) return 'right';
  if (index === back) return 'back';
  return 'back';
}

/**
 * Renderiza os 4 produtos simultaneamente, cada um assumindo um papel
 * (center/left/right/back) derivado do `activeIndex`. A key é o id do
 * produto — nunca o papel — para que o React mantenha o mesmo elemento no
 * DOM e a transição CSS anime a mudança de posição suavemente.
 */
export function BurgerCarousel({ burgers, activeIndex, isMobile }: BurgerCarouselProps) {
  return (
    <div className="absolute inset-0 z-[3]">
      {burgers.map((burger, index) => (
        <BurgerCard
          key={burger.id}
          burger={burger}
          role={roleFor(index, activeIndex, burgers.length)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
