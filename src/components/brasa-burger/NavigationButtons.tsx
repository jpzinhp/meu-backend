'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disabled: boolean;
}

const baseButtonClass =
  'inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent text-white ' +
  'transition-[transform,background-color] duration-150 ease-out ' +
  'hover:scale-[1.08] hover:bg-white/[0.12] active:scale-100 ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-burger-focus ' +
  'disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-transparent ' +
  'w-12 h-12 sm:w-16 sm:h-16';

/** Setas circulares que giram os papéis do carrossel (section 20). */
export function NavigationButtons({ onPrev, onNext, disabled }: NavigationButtonsProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        aria-label="Hambúrguer anterior"
        className={baseButtonClass}
        onClick={onPrev}
        disabled={disabled}
      >
        <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.25} />
      </button>
      <button
        type="button"
        aria-label="Próximo hambúrguer"
        className={baseButtonClass}
        onClick={onNext}
        disabled={disabled}
      >
        <ArrowRight className="h-[26px] w-[26px]" strokeWidth={2.25} />
      </button>
    </div>
  );
}
