import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';

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

export const metadata: Metadata = {
  title: 'Brasa Burger — Peça seu favorito',
  description:
    'Hambúrgueres artesanais grelhados na brasa, entregues quentes na sua região. Peça agora pelo WhatsApp.',
};

/**
 * Layout isolado da landing page Brasa Burger: não herda a navegação do
 * app (Nav/sidebar do SitePro AI) e carrega as fontes de campanha
 * (Anton para display, Inter para o corpo).
 */
export default function BrasaBurgerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${anton.variable} ${inter.variable}`} style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
      {children}
    </div>
  );
}
