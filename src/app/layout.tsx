import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SitePro AI — Encontre empresas sem site',
  description:
    'Encontre negócios em todo o Brasil sem presença digital e gere automaticamente uma proposta de site profissional para cada empresa.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
