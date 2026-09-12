export function Stars({ rating, color }: { rating: number; color: string }) {
  const full = Math.round(rating);
  return (
    <div aria-label={`${rating} de 5 estrelas`} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" fill={i < full ? color : '#e2e8f0'}>
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
