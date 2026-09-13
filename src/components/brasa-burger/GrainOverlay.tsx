const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
    <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`;

const NOISE_DATA_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/**
 * Textura de grão sutil por cima de toda a composição. Não deve interferir
 * na leitura nem nos cliques — por isso `pointer-events-none` e opacidade
 * bem baixa.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50"
      style={{
        backgroundImage: NOISE_DATA_URL,
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        opacity: 0.4,
      }}
    />
  );
}
