/**
 * Dados dos produtos exibidos no carrossel do hero.
 *
 * Mantido separado da lógica visual (ver `components/brasa-burger`) para que
 * o cardápio possa ser editado sem tocar em nenhum componente.
 *
 * As imagens ficam em `/public/burgers/*.jpg` — fotografias reais (recortadas
 * da campanha fornecida pela marca), exibidas com uma máscara de vinheta no
 * `BurgerCard` para se misturarem ao fundo dinâmico do hero. Para trocar um
 * produto, basta apontar `image` para um novo arquivo em `/public/burgers/`
 * — nenhum outro código precisa mudar. Uma versão ilustrada (vetor, fundo
 * transparente) fica em `/public/burgers/illustrated/` como alternativa.
 */

/** Nome da hamburgueria — troque aqui para reaproveitar o layout em outra marca. */
export const BRAND_NAME = 'BRASA BURGER';

export const BRAND_TAGLINE =
  'O sabor que chega quente, artesanal e do jeito que você gosta.';

/** Versão compacta da tagline para telas pequenas. */
export const BRAND_TAGLINE_SHORT = 'Artesanal, quente e na hora certa.';

export const BRAND_KICKER = '100% artesanal';
export const HERO_HEADLINE = ['Sabor que', 'vem da brasa'];

/** Número usado nos links de pedido via WhatsApp (formato E.164, só dígitos). */
export const WHATSAPP_NUMBER = '5599999999999';
export const WHATSAPP_DISPLAY = '(99) 99999-9999';

export interface Burger {
  id: string;
  name: string;
  price: string;
  /** Caminho público da fotografia (recorte real, sem fundo transparente). */
  image: string;
  /** Cor de fundo do hero quando este produto está ativo. */
  bg: string;
  /** Cor do painel/cartão de oferta quando este produto está ativo. */
  panel: string;
}

export const BURGERS: Burger[] = [
  {
    id: 'brasa-classico',
    name: 'BRASA CLÁSSICO',
    price: 'R$ 27,90',
    image: '/burgers/brasa-classico.jpg',
    bg: '#E77F20',
    panel: '#F4AE3E',
  },
  {
    id: 'bacon-supremo',
    name: 'BACON SUPREMO',
    price: 'R$ 31,90',
    image: '/burgers/bacon-supremo.jpg',
    bg: '#C96B20',
    panel: '#E98A3A',
  },
  {
    id: 'duplo-cheddar',
    name: 'DUPLO CHEDDAR',
    price: 'R$ 34,90',
    image: '/burgers/duplo-cheddar.jpg',
    bg: '#D9822B',
    panel: '#F0A348',
  },
  {
    id: 'bbq-crispy',
    name: 'BBQ CRISPY',
    price: 'R$ 29,90',
    image: '/burgers/bbq-crispy.jpg',
    bg: '#B95D16',
    panel: '#E27D29',
  },
];

export function buildWhatsappOrderLink(burger: Burger): string {
  const message = `Olá! Quero pedir o ${burger.name} (${burger.price}) 🍔`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
