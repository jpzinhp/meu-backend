/**
 * Grafismos decorativos (linhas curvas, traços manuscritos, formas
 * geométricas) inspirados na referência. Ficam posicionados nas bordas para
 * nunca competir com o hambúrguer, que continua sendo o protagonista.
 */
export function DecorativeElements() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 select-none">
      {/* traço curvo superior direito */}
      <svg
        className="absolute right-[6%] top-[8%] h-16 w-16 opacity-40 sm:h-24 sm:w-24"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10 70 C 30 10, 70 10, 90 40"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* asterisco / estrela pequena */}
      <svg
        className="absolute left-[8%] top-[30%] h-6 w-6 animate-float opacity-60 sm:left-[10%] sm:h-9 sm:w-9"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z"
          fill="#F7C447"
        />
      </svg>

      {/* pontos geométricos */}
      <div className="absolute bottom-[30%] left-[4%] flex flex-col gap-2 opacity-50 sm:bottom-[26%]">
        <span className="h-2 w-2 rounded-full bg-white" />
        <span className="h-2 w-2 rounded-full bg-white" />
        <span className="h-2 w-2 rounded-full bg-burger-gold" />
      </div>

      {/* traço manuscrito inferior */}
      <svg
        className="absolute bottom-[6%] right-[26%] hidden h-10 w-24 opacity-40 md:block"
        viewBox="0 0 120 40"
        fill="none"
      >
        <path
          d="M2 30 C 20 5, 40 35, 60 15 C 80 -5, 100 25, 118 10"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* sombra suave central para dar profundidade sob o produto */}
      <div
        className="absolute bottom-0 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[100%] opacity-30 blur-2xl sm:h-40"
        style={{ background: 'radial-gradient(closest-side, #351003, transparent)' }}
      />
    </div>
  );
}
