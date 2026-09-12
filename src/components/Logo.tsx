export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-slate-900 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-soft">
        S
      </span>
      <span className="text-base tracking-tight">
        SitePro <span className="text-brand-600">AI</span>
      </span>
    </span>
  );
}
