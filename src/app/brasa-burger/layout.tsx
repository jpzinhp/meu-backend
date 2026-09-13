import type { Metadata } from 'next';
import { Anton, Caveat, Inter } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

// Fonte manuscrita real (em vez de depender de fontes do sistema, que nem
// sempre existem em todo dispositivo) para os toques decorativos do hero.
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-script',
  display: 'swap',
});

const OG_IMAGE = '/brasa-burger/promo-banner.jpg';

export const metadata: Metadata = {
  title: 'Brasa Burger — Peça seu favorito',
  description:
    'Hambúrgueres artesanais grelhados na brasa, entregues quentes na sua região. Peça agora pelo WhatsApp.',
  openGraph: {
    title: 'Brasa Burger — Peça seu favorito',
    description:
      'Hambúrgueres artesanais grelhados na brasa, entregues quentes na sua região.',
    images: [{ url: OG_IMAGE, width: 1200, height: 1500, alt: 'Hambúrguer artesanal Brasa Burger' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brasa Burger — Peça seu favorito',
    description:
      'Hambúrgueres artesanais grelhados na brasa, entregues quentes na sua região.',
    images: [OG_IMAGE],
  },
};

/**
 * Layout isolado da landing page Brasa Burger: não herda a navegação do
 * app (Nav/sidebar do SitePro AI) e carrega as fontes de campanha
 * (Anton para display, Inter para o corpo, Caveat para os toques manuscritos).
 */
export default function BrasaBurgerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${anton.variable} ${inter.variable} ${caveat.variable}`}
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {children}
    </div>
  );
}
