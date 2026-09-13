import { MapPin, MessageCircle, ShoppingBag } from 'lucide-react';
import { WHATSAPP_DISPLAY } from '@/lib/brasa-burger/burgers';

/** Faixa fina de informações de entrega (section 23). */
export function DeliveryStrip() {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide text-white/90 sm:gap-5 sm:text-xs">
      <span className="flex items-center gap-1.5">
        <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.25} aria-hidden="true" />
        <span className="hidden sm:inline">Entrega na sua região</span>
        <span className="sm:hidden">Entrega local</span>
      </span>
      <span className="hidden items-center gap-1.5 sm:flex">
        <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden="true" />
        {WHATSAPP_DISPLAY}
      </span>
      <span className="flex items-center gap-1.5">
        <ShoppingBag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.25} aria-hidden="true" />
        <span className="hidden sm:inline">Peça pelo WhatsApp</span>
        <span className="sm:hidden">Pedir</span>
      </span>
    </div>
  );
}
