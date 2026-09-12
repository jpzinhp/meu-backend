import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <span className="text-4xl">🔍</span>
      <h1 className="text-xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="max-w-sm text-sm text-slate-500">
        O conteúdo que você procura não existe mais ou o link está incorreto.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Voltar para o início
      </Link>
    </div>
  );
}
