import type { CSSProperties } from 'react';
import type { Burger } from '@/lib/brasa-burger/burgers';
import type { CarouselRole } from './BurgerCarousel';

interface BurgerCardProps {
  burger: Burger;
  role: CarouselRole;
  isMobile: boolean;
}

const TRANSITION =
  'transform 650ms cubic-bezier(0.4,0,0.2,1), ' +
  'filter 650ms cubic-bezier(0.4,0,0.2,1), ' +
  'opacity 650ms cubic-bezier(0.4,0,0.2,1), ' +
  'left 650ms cubic-bezier(0.4,0,0.2,1), ' +
  'bottom 650ms cubic-bezier(0.4,0,0.2,1), ' +
  'height 650ms cubic-bezier(0.4,0,0.2,1)';

function getPositionStyle(role: CarouselRole, isMobile: boolean): CSSProperties {
  switch (role) {
    case 'center':
      return {
        left: '50%',
        height: isMobile ? '44%' : '60%',
        bottom: isMobile ? '20%' : '7%',
        transform: `translateX(-50%) scale(${isMobile ? 1.06 : 1.1})`,
        filter: 'drop-shadow(0 28px 34px rgba(26,10,2,0.45))',
        opacity: 1,
        zIndex: 20,
      };
    case 'left':
      return {
        left: isMobile ? '18%' : '28%',
        height: isMobile ? '17%' : '27%',
        bottom: isMobile ? '30%' : '11%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
      };
    case 'right':
      return {
        left: isMobile ? '82%' : '72%',
        height: isMobile ? '17%' : '27%',
        bottom: isMobile ? '30%' : '11%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
      };
    case 'back':
      return {
        left: '50%',
        height: isMobile ? '14%' : '22%',
        bottom: isMobile ? '30%' : '11%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
      };
    default:
      return {};
  }
}

/** Um único hambúrguer posicionado no carrossel, de acordo com seu papel atual. */
export function BurgerCard({ burger, role, isMobile }: BurgerCardProps) {
  const positionStyle = getPositionStyle(role, isMobile);

  // As fotos são recortes reais (sem canal alfa), então uma vinheta radial
  // funciona como máscara para elas "flutuarem" sobre o fundo dinâmico do
  // hero, em vez de aparecerem como um retângulo duro.
  const vignetteMask = 'radial-gradient(ellipse 60% 58% at 50% 48%, #000 52%, transparent 96%)';

  return (
    <div
      className="absolute"
      style={{
        ...positionStyle,
        aspectRatio: '5 / 4',
        transformOrigin: 'center bottom',
        transition: TRANSITION,
        willChange: 'transform, filter, opacity',
      }}
    >
      <img
        src={burger.image}
        alt={`${burger.name} — hambúrguer artesanal Brasa Burger`}
        width={600}
        height={480}
        draggable={false}
        className="h-full w-full object-cover"
        style={{
          WebkitMaskImage: vignetteMask,
          maskImage: vignetteMask,
        }}
      />
    </div>
  );
}
