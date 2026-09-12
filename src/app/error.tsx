'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <span className="text-4xl">⚠️</span>
      <h1 className="text-xl font-bold text-slate-900">Algo deu errado</h1>
      <p className="max-w-sm text-sm text-slate-500">
        Ocorreu um erro inesperado. Tente novamente — se o problema continuar, tente recarregar a página.
      </p>
      <button type="button" className="btn-primary mt-2" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
